import type { APIRoute } from "astro"
import { asc, db, eq, Post, User } from 'astro:db'


export const GET: APIRoute = async () => {
	try {
		// Выполняем запрос к базе данных для получения постов и имен пользователей
		const postsList = await db
			.select()
			.from(Post)
			.innerJoin(User, eq(Post.userId, User.id)) // Соединяем таблицы Post и User по userId
			.orderBy(asc(Post.id)) // Сортируем по ID поста

		// Формируем список постов с именами пользователей
		const result = postsList.map(post => ({
      postId: post.Post.id,
      id:post.Post.id,
			title: post.Post.title,
			description: post.Post.description,
			link: post.Post.link,
			userId: post.User.id,
			username: post.User.username,
		}))

		// Возвращаем результат в формате JSON
		return new Response(JSON.stringify(result), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		})
	} catch (error) {
		return new Response(JSON.stringify({ error: "Error fetching posts" }), {
			status: 500,
			headers: {
				"Content-Type": "application/json",
			},
		})
	}
}
