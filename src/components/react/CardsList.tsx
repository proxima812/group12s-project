import { useEffect, useState } from "react"
import ArticleCard from "./ArticleCard"
import PreloaderCard from "./PreloaderCard"

const CardsList = () => {
	const [posts, setPosts] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await fetch("/api/cards") // Replace with your API path
				if (!response.ok) {
					throw new Error("Ошибка при загрузке постов")
				}
				const data = await response.json()
				setPosts(data)
			} catch (err) {
				setError(err.message)
			} finally {
				setLoading(false)
			}
		}

		fetchPosts()
	}, [])

	if (loading) {
		return (
			<>
				<PreloaderCard />
				<PreloaderCard />
				<PreloaderCard />
			</>
		)
	}

	if (error) {
		return <p>Ошибка: {error}</p>
	}

	return (
		<>
			{posts
				.sort((a, b) => b.id - a.id)
				.map((post, index) => {
					return <ArticleCard key={post.id} post={post} index={index} />
				})}
		</>
	)
}

export default CardsList
