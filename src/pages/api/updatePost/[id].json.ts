import type { APIRoute } from "astro"
import { Post, db, eq } from "astro:db"

export const PATCH: APIRoute = async ({ params, request }) => {
	const { title, description } = await request.json()
	const id = Number(params.id)

	if (!id || !title || !description) {
		return new Response(
			JSON.stringify({
				message: "Please provide all required fields.",
				success: false,
			}),
			{
				status: 404,
			},
		)
	}

	try {
		const res = await db.update(Post).set({ title, description }).where(eq(Post.id, id))

		if (res) {
			return new Response(
				JSON.stringify({
					message: "success",
					success: true,
				}),
			)
		} else {
			throw new Error("Update failed")
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
