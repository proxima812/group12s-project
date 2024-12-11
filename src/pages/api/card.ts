// src/pages/api/card.ts (например)
export const prerender = false
import type { APIRoute } from "astro"
import { asc, db, eq, Post, User } from "astro:db"

export const POST: APIRoute = async ({ request }) => {
	try {
		const { message, userId } = await request.json()
		if (!message) {
			return new Response(JSON.stringify({ error: "Message is required" }), {
				status: 400,
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*", // Разрешаем все домены
				},
			})
		}
		// Сохраняем новый пост в базу данных
		await db.insert(Post).values({
			description: message, // Сохраняем сообщение в поле description
			userId, // Сохраняем userId
		})

		// Получаем список постов и соединяем с данными пользователей
		const postsList = await db
			.select()
			.from(Post)
			.innerJoin(User, eq(Post.userId, User.id)) // Соединяем таблицы Post и User по userId
			.orderBy(asc(Post.id)) // Сортируем по ID поста

		// Формируем результат
		const result = postsList.map(post => ({
			postId: post.Post.id,
			description: post.Post.description,
			userId: post.User.id,
			username: post.User.username,
		}))

		console.log("Добавление карточки с сообщением:", message)

		// Возвращаем результат в формате JSON
		return new Response(JSON.stringify(result), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			},
		})

		// return new Response(
		// 	JSON.stringify({ success: true, message: "Карточка добавлена!" }),
		// 	{
		// 		status: 200,
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 			"Access-Control-Allow-Origin": "*", // Разрешаем все домены
		// 		},
		// 	},
		// )
	} catch (error) {
		console.error("Ошибка при добавлении карточки:", error)
		return new Response(JSON.stringify({ error: "Error adding card" }), {
			status: 500,
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*", // Разрешаем все домены
			},
		})
	}
}
