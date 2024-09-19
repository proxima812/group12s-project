import Fuse from "fuse.js"
import { useState } from "react"
// Configs fuse.js
// https://fusejs.io/api/options.html
const options = {
	keys: ["Post.title", "Post.description", "Post.link"],
	includeMatches: true,
	minMatchCharLength: 2,
	threshold: 0.5,
}
function Search({ searchList }) {
	// User's input
	const [query, setQuery] = useState("")
	const fuse = new Fuse(searchList, options)
	// Set a limit to the posts: 5
	const posts = fuse
		.search(query)
		.map(result => result.item)
		.slice(0, 4)

	function handleOnSearch({ target = {} }) {
		const { value } = target
		setQuery(value)
	}
	return (
		<aside className="relative z-10">
			<input
				type="text"
				className="w-full p-5 text-zinc-600  rounded-xl border"
				value={query}
				onChange={handleOnSearch}
				placeholder="Искать по сообществам, информации..."
			/>

			<div
				className={`absolute top-[66px] rounded-xl border bg-white left-0 w-full ${query.length > 0 ? "p-5 border" : "p-0 border-none"}`}
			>
				{query.length > 1 && (
					<p className="text-sm pb-3 text-zinc-400 py-2">
						Найдено <b>{posts.length}</b>{" "}
						{posts.length === 1 ? "Результат" : "Результатов"}
						по{" "}
						<i>
							<b>"{query}"</b>
						</i>
					</p>
				)}
				<ul className="flex flex-col gap-3">
					{posts &&
						posts.map(post => (
							<li className={`flex flex-col gap-1 p-3 border rounded-lg `}>
								<h3 className="font-bold">{post?.Post?.title}</h3>
								<p className="text-sm text-zinc-400 line-clamp-2">
									{post?.Post?.description}
								</p>
								<a
									target="_blank"
									className="text-blue-500 underline"
									href={`https://${post?.Post?.link}`}
								>
									{post?.Post?.link}
								</a>
							</li>
						))}
				</ul>
			</div>
		</aside>
	)
}
export default Search
