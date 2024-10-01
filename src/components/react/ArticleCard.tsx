import { marked } from "marked"
import TG from "./icons/TG"
import ZOOM from "./icons/ZOOM"
import AA from "./icons/communities/AA"
import AIZ from "./icons/communities/AIZ"
import AN from "./icons/communities/AN"

const ArticleCard = ({ post, index }) => {
	const titleLower = post.title.toLowerCase()

	let group
	let icon

	if (titleLower.includes("аа")) {
		group = "АА"
		icon = <AA />
	} else if (titleLower.includes("ан")) {
		group = "АН"
		icon = <AN />
	} else if (titleLower.includes("аиз")) {
		group = "АИЗ"
		icon = <AIZ />
	}

	return (
		<article
			id={`${post.id}`}
			className={
				index === 0
					? "relative vcard border-2 rounded-xl border-amber-500"
					: index === 1
						? "relative vcard border-2 rounded-xl border-blue-500"
						: index === 2
							? "relative vcard border-2 rounded-xl border-red-500"
							: "relative vcard"
			}
		>
			<main className="bg-white rounded-xl border-gray-200 p-5 flex flex-col gap-3">
				{group && (
					<div className="absolute -top-[8px] -left-[8px]">
						{icon}
						{/* <span className="text-xs text-zinc-500">{group}</span> */}
					</div>
				)}
				<div className="flex justify-between items-center">
					<span className="font-medium text-zinc-400 text-xs fn">👤 {post.username}</span>
					<span className={index === 0 ? "text-sm text-amber-500 font-bold" : "hidden"}>
						новая 🔥
					</span>
					{index === 1 ? <span className="text-sm text-blue-500 font-bold">💎</span> : ""}
					{index === 2 ? <span className="text-sm text-red-500 font-bold">🪭</span> : ""}
				</div>
				<h2 className="text-xl font-bold org">{post.title}</h2>
				<div
					className="prose text-sm vevent"
					dangerouslySetInnerHTML={{ __html: marked(post.description) }}
				/>
				<a
					href={`https://${post.link}`}
					id="link"
					target="_blank"
					rel="noopener noreferrer"
					className={`description text-sm flex justify-center gap-3 items-center px-5 py-2.5 text-center rounded-md 
                ${
									post.link.startsWith("t.me")
										? "bg-sky-100 text-sky-700 ring-1 ring-sky-200 transition-colors duration-75 ease-linear hover:bg-sky-200"
										: post.link.startsWith("zoom")
											? "bg-blue-100 text-blue-700 ring-1 ring-blue-200 transition-colors duration-75 ease-linear hover:bg-blue-200"
											: "bg-green-100 text-green-700 ring-1 ring-green-200 transition-colors duration-75 ease-linear hover:bg-green-200"
								}`}
				>
					{post.link.startsWith("t.me") ? <TG /> : ""}
					{post.link.startsWith("zoom") ? <ZOOM /> : ""}
					Перейте по ссылке
				</a>
			</main>
		</article>
	)
}

export default ArticleCard
