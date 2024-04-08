import { db, Post } from "astro:db"

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Post).values([
    {
      title: "Google",
      description:
        "I found this cool site that can let you say anything you want without accountability!",
    },
  ])
  
}
