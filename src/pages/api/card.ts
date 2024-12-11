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
		const { desc, id } = await request.json()

		console.log("Полученные данные:", { desc, id }) // Логируем данные

		if (!desc) {
			return new Response(JSON.stringify({ error: "Message is required" }), {
				status: 400,
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
			})
		}

		// Преобразуем id в INT8 (64-битное целое число)
		const intId = typeof id === "string" ? BigInt(id) : id

		// Добавление записи в таблицу posts в Supabase
		const { data, error } = await supabase
			.from("posts")
			.insert([{ id: intId, desc: desc }])

		// Обработка ошибок, если они возникнут
		if (error) {
			console.error("Ошибка при добавлении в базу данных:", error.message)
			return new Response(JSON.stringify({ error: error.message }), {
				status: 500,
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
			})
		}

		// Логирование успешного добавления
		console.log("Карточка добавлена с сообщением:", desc)

		return new Response(
			JSON.stringify({ success: true, message: "Карточка добавлена!" }),
			{
				status: 200,
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
			},
		)
	} catch (error) {
		console.error("Ошибка при добавлении карточки:", error)
		return new Response(JSON.stringify({ error: "Error adding card" }), {
			status: 500,
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			},
		})
	}
}
