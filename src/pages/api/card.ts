export const prerender = false

import { createClient } from "@supabase/supabase-js"
// Импортируем клиент Supabase
import type { APIRoute } from "astro"

// Создаем экземпляр клиента Supabase (используя свои URL и ключ)
const supabase = createClient(
	"https://fkwivycaacgpuwfvozlp.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZrd2l2eWNhYWNncHV3ZnZvemxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5MDc4MTEsImV4cCI6MjA0OTQ4MzgxMX0.44dYay0RWos4tqwuj6H-ylqN4TrAIabeQLNzBn6Xuy0",
)


export const POST: APIRoute = async ({ request }) => {
	try {
		// Чтение данных из запроса
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

		// Добавление записи в таблицу posts в Supabase
		const { data, error } = await supabase
			.from("posts")
			.insert([{ id: userId, desc: message }])

		// Обработка ошибок, если они возникнут
		if (error) {
			return new Response(JSON.stringify({ error: error.message }), {
				status: 500,
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
			})
		}

		// Если все прошло успешно
		console.log("Карточка добавлена с сообщением:", message)

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
