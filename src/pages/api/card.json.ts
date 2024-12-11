import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ request }) => {
	try {
		// Получаем данные из POST-запроса (например, сообщение от бота)
		const { message, userId } = await request.json()

		if (!message) {
			return new Response(JSON.stringify({ error: "Message is required" }), {
				status: 400,
				headers: {
					"Content-Type": "application/json",
				},
			})
		}

		// Здесь можно добавить логику для обработки карточки
		// Например, сохранение данных в базу данных или рендеринг карточки

		console.log("Добавление карточки с сообщением:", message)

		// Возвращаем успешный ответ
		return new Response(
			JSON.stringify({ success: true, message: "Карточка добавлена!" }),
			{
				status: 200,
				headers: {
					"Content-Type": "application/json",
				},
			},
		)
	} catch (error) {
		console.error("Ошибка при добавлении карточки:", error)

		// Возвращаем ошибку, если что-то пошло не так
		return new Response(JSON.stringify({ error: "Error adding card" }), {
			status: 500,
			headers: {
				"Content-Type": "application/json",
			},
		})
	}
}
