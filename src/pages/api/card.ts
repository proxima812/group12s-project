// src/pages/api/card.ts (например)
export const prerender = false
import type { APIRoute } from "astro"

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

		console.log("Добавление карточки с сообщением:", message)
		return new Response(
			JSON.stringify({ success: true, message: "Карточка добавлена!" }),
			{
				status: 200,
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*", // Разрешаем все домены
				},
			},
		)
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
