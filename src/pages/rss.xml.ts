import rss from "@astrojs/rss"
import { asc, db, eq, Post, User } from "astro:db"


export async function GET(context) {
	try {
		// Выполняем запрос к базе данных для получения постов и имен пользователей
		const postsList = await db
			.select()
			.from(Post)
			.innerJoin(User, eq(Post.userId, User.id)) // Соединяем таблицы Post и User по userId
			.orderBy(asc(Post.id)) // Сортируем по ID поста

		// Формируем список постов с именами пользователей
		const items = postsList.map(post => ({
			title: post.Post.title,
			pubDate: new Date().toUTCString(), // Замените на поле с датой
			description: post.Post.description,
			link: `${post.Post.id}`,
			customData: `<author>${post.User.username}</author>`, // Данные об авторе
		}))

		// Генерируем RSS
		return rss({
			title: "Карты групп",
			description: "12 шагов",
			site: context.site,
			items: items,
		})
	} catch (error) {
		console.error("Ошибка при генерации RSS:", error)
		return new Response(JSON.stringify({ error: "Error fetching posts for RSS" }), {
			status: 500,
			headers: {
				"Content-Type": "application/json",
			},
		})
	}
}
