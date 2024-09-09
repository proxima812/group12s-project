import type { APIRoute } from "astro"
import { Post, db, eq } from "astro:db"

export const PATCH: APIRoute = async ({ params, request }) => {
	const { title, description, link } = await request.json()
	const id = Number(params.id)

	if (!id || !title || !description || !link) {
		return new Response(
			JSON.stringify({
				message: "Please provide all required fields.",
				success: false,
			}),
			{
				status: 400, // Используйте 400 для ошибок клиента
			},
		)
	}

	try {
		// Выполните обновление поста в базе данных
		const updateResult = await db
			.update(Post)
			.set({ title, description, link })
			.where(eq(Post.id, id))

		// Проверьте, что обновление прошло успешно
		if (updateResult) {
			return new Response(
				JSON.stringify({
					message: "Post updated successfully",
					success: true,
				}),
			)
		} else {
			throw new Error("Update failed, no rows affected")
		}
	} catch (e) {
		console.error(e)
		return new Response(
			JSON.stringify({
				message: e.message || "An error occurred",
				success: false,
			}),
			{
				status: 500,
			},
		)
	}
}
