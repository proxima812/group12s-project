import type { APIRoute } from "astro"
import { Post, db } from "astro:db"
import sanitize from "sanitize-html"

export const POST: APIRoute = async ({ request }) => {
	const data = await request.json()

	try {
		const { title, description } = data

		if (!title || !description) {
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

		const res = await db.insert(Post).values({
			title: sanitize(title),
			description: sanitize(description),
		})

		if (res) {
			return new Response(
				JSON.stringify({
					message: "success",
					data: res,
					success: true,
				}),
				{
					status: 200,
				},
			)
		} else {
			throw new Error("There was a problem with the db response.")
		}
	} catch (e) {
		console.error(e)
		return new Response(
			JSON.stringify({
				message: e,
				success: false,
			}),
			{
				status: 404,
			},
		)
	}
}
