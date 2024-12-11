// src/pages/api/callbacks/google.ts
import { google, lucia } from "@/auth"
import { OAuth2RequestError } from "arctic"
import { db, eq, User } from "astro:db"
import { generateId } from "lucia"

import type { APIContext } from "astro"

export async function GET(context: APIContext): Promise<Response> {
	const code = context.url.searchParams.get("code")
	const state = context.url.searchParams.get("state")
	const storedState = context.cookies.get("google_oauth_state")?.value ?? null

	// Проверка наличия необходимых параметров и совпадения состояния
	if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, {
			status: 400,
		})
	}

	try {
		// Получаем токены от Google
		const tokens = await google.validateAuthorizationCode(code)

		// Получаем информацию о пользователе от Google
		const googleUserResponse = await fetch(
			"https://www.googleapis.com/oauth2/v3/userinfo",
			{
				headers: {
					Authorization: `Bearer ${tokens.accessToken}`,
				},
			},
		)
		const googleUser: GoogleUser = await googleUserResponse.json()

		// Ищем существующего пользователя в базе данных
		const existingUser = (
			await db.select().from(User).where(eq(User.google_id, googleUser.sub))
		).at(0)

		if (existingUser) {
			// Если пользователь существует, создаем сессию
			const session = await lucia.createSession(existingUser.id, {})
			const sessionCookie = lucia.createSessionCookie(session.id)
			context.cookies.set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes,
			)
			return context.redirect("/")
		}

		// Если пользователь новый, создаем нового пользователя
		const userId = generateId(15)
		await db.insert(User).values([
			{
				id: userId,
				google_id: googleUser.sub,
				username: googleUser.name,
			},
		])

		// Создаем сессию для нового пользователя
		const session = await lucia.createSession(userId, {})
		const sessionCookie = lucia.createSessionCookie(session.id)
		context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

		return context.redirect("/admin")
	} catch (e) {
		// Обрабатываем ошибки авторизации
		if (e instanceof OAuth2RequestError) {
			return new Response(null, {
				status: 400,
			})
		}
		return new Response(null, {
			status: 500,
		})
	}
}

interface GoogleUser {
	sub: string // Уникальный идентификатор пользователя
	name: string // Имя пользователя
}
