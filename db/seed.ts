import { db, Post, User } from "astro:db"

export default async function seed() {
	await db.insert(User).values([
		{
			id: "user_id_1",
			username: "admin",
			password: "root",
		},
	])
	await db.insert(Post).values([
		{
			id: 1,
			userId: "user_id_1",
			title: "mat",
			description: "nat",
			link: "https://asda.com/",
		},
	])
	// const queries = []

	// for (let i = 0; i < 25; i++) {
	// 	queries.push(
	// 		db.insert(Post).values({
	// 			title: `Test title ${i}`,
	// 			description: `Test description ${i}`,
	// 			link: `https://test.com/${i}`,
	// 		}),
	// 	)
	// }
	// await db.batch(queries)
}
