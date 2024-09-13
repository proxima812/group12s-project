import type { APIRoute } from "astro";
import { asc, db, eq, Post, User } from "astro:db";

async function fetchPostsList() {
  return db
    .select()
    .from(Post)
    .innerJoin(User, eq(Post.userId, User.id))
    .orderBy(asc(Post.id));
}

export const GET: APIRoute = async () => {
  try {
    const postsList = await fetchPostsList();
    console.log('Posts fetched from database:', postsList); // Отладочная информация

    return new Response(
      JSON.stringify({ postsList }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new Response(
      JSON.stringify({
        message: "An error occurred while fetching posts.",
        success: false,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
