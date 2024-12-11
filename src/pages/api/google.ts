// src/pages/api/oauth/google/index.ts
import { google } from "@/auth"
import { generateCodeVerifier, generateState } from "arctic"
import type { APIContext } from "astro"

export async function GET(context: APIContext): Promise<Response> {
	// Генерируем состояние для защиты от CSRF атак
	const state = generateState()
	const codeVerifier = generateCodeVerifier()
	// Генерируем URL для редиректа на страницу авторизации Google
	const url = await google.createAuthorizationURL(state)

	// Сохраняем состояние в cookies для проверки в callback
	context.cookies.set("google_oauth_state", state, {
		path: "/",
		httpOnly: import.meta.env.PROD ? true : false, // Только PROD, в dev можно делать false для отладки
		secure: import.meta.env.PROD ? true : false, // Только в PROD, в dev - false
		maxAge: 60 * 10, // Время жизни cookie — 10 минут
		sameSite: "lax", // sameSite: 'lax' для OAuth
	})

	context.cookies.set("google_code_verifier", codeVerifier, {
		path: "/",
		httpOnly: import.meta.env.PROD ? true : false, // Только PROD
		secure: import.meta.env.PROD ? true : false, // Только в PROD
		maxAge: 60 * 10, // Время жизни cookie — 10 минут
		sameSite: "lax", // sameSite: 'lax' для OAuth
	})
	// Редиректим пользователя на страницу Google для авторизации
	return context.redirect(url.toString())
}
