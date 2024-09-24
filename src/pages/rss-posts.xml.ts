import rss from "@astrojs/rss"
import { getCollection } from "astro:content"

export async function GET(context) {
	const blog = await getCollection("posts")
	return rss({
		title: "12 шагов посты",
		description: "Все посты 12 шагов",
		site: context.site,
		items: blog.map(post => ({
			title: post.data.title,
			pubDate: post.data.publishedDate,
			description: post.data.description,
			// customData: post.data.customData,
			link: `/posts/${post.slug}/`,
		})),
	})
}
