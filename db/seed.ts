import { db, Post, User } from "astro:db"

export default async function () {
	await db.insert(User).values([
		{
			id: "suka_1", // Преобразуйте id в строку, так как в таблице тип text
			username: "suka",
			password: "1234",
		},
	])
	await db.insert(Post).values([
		{
			id: 1,
			userId: "suka_1", // userId должен совпадать с id пользователя, который строка
			title: "title",
			description: "Hope you like Astro DB!",
			link: "https://github.com/withastro/astro",
		},
  ])

}

