import { db, Post, User } from "astro:db"

export default async function seed() {
	await db.insert(User).values([
		{
			id: "user_id_1",
			username: "user1",
			password:
				"$argon2id$v=19$m=19456,t=2,p=1$AC5gMGrqxRKrco6ITV7PiQ$zjiUdOTviT0EtitFcgIrOLOye2W5/yYgyoVNMla3PH4",
		},
	])
	await db.insert(Post).values([
		{
			userId: "user_id_1",
			title: "Google1",
			description:
				"I found this cool site that can let you say anything you want without accountability!",
		},
		{
			userId: "user_id_1",
			title: "Google2",
			description:
				"I found this cool site that can let you say anything you want without accountability!",
		},
		{
			userId: "user_id_1",
			title: "Google3",
			description:
				"I found this cool site that can let you say anything you want without accountability!",
		},
	])
}
