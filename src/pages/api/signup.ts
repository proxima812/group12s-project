import { lucia } from "@/auth"
import type { APIContext } from "astro"
import { db, User } from "astro:db"
import { generateId } from "lucia"
import { Argon2id } from "oslo/password"

export async function POST(context: APIContext): Promise<Response> {
	//Parse the form data
	const formData = await context.request.formData()
	const username = formData.get("username")
	const password = formData.get("password")

	// Заголовок с установкой кодировки UTF-8
	const headers = { "Content-Type": "text/html; charset=UTF-8" }

	//Validate the form data
	if (!username || !password) {
		return new Response(
			`<script>alert("Имя пользователя и пароль обязательны"); window.history.back();</script>`,
			{ status: 400, headers },
		)
	}

	if (typeof username !== "string" || username.length < 3) {
		return new Response(
			`<script>alert("Имя пользователя должно быть не менее 3 символов"); window.history.back();</script>`,
			{ status: 400, headers },
		)
	}

	if (typeof password !== "string" || password.length < 3) {
		return new Response(
			`<script>alert("Пароль должен быть не менее 3 символов"); window.history.back();</script>`,
			{ status: 400, headers },
		)
	}

	// Insert user into db
	const userId = generateId(15)
	const hashedPassword = await new Argon2id().hash(password)

	await db.insert(User).values([
		{
			id: userId,
			username,
			password: hashedPassword,
		},
	])

	// Generate session
	const session = await lucia.createSession(userId, {})
	const sessionCookie = lucia.createSessionCookie(session.id)
	context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

	return context.redirect("/admin")
}
