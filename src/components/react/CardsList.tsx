import useSWR from "swr"
import { useState, useEffect } from "react"
import ArticleCard from "./ArticleCard"
import PreloaderCard from "./PreloaderCard"

// Функция для запроса данных
const fetcher = url =>
	fetch(url).then(res => {
		if (!res.ok) {
			throw new Error("Ошибка при загрузке постов")
		}
		return res.json()
	})

const CardsList = () => {
	// Используем SWR для получения всех данных
	const { data: allPosts, error } = useSWR("/api/cards", fetcher)

	// Стейт для порционной загрузки карточек
	const [displayedPosts, setDisplayedPosts] = useState([])
	const [visibleCount, setVisibleCount] = useState(3) // Количество отображаемых карточек

	// Обновляем отображаемые посты при изменении видимого количества
	useEffect(() => {
		if (allPosts) {
			setDisplayedPosts(allPosts.slice(0, visibleCount))
		}
	}, [allPosts, visibleCount])

	// Добавляем слушатель прокрутки
	useEffect(() => {
		const handleScroll = () => {
			// Проверяем, дошел ли пользователь до конца страницы
			if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
				// Увеличиваем количество видимых карточек на 10
				setVisibleCount(prevCount => prevCount + 10)
			}
		}

		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	// Обработка состояния ошибки
	if (error) {
		return <p>Ошибка: {error.message}</p>
	}

	// Показываем прелоадеры, пока данные загружаются
	if (!allPosts) {
		return (
			<>
				<PreloaderCard />
				<PreloaderCard />
				<PreloaderCard />
			</>
		)
	}

	return (
		<>
			{displayedPosts.map((post, index) => (
				<ArticleCard key={post.id} post={post} index={index} />
			))}

			{/* Если есть ещё посты для отображения и идет загрузка (больше данных, чем отображено) */}
			{visibleCount < allPosts.length && (
				<>
					<PreloaderCard />
					<PreloaderCard />
					<PreloaderCard />
				</>
			)}
		</>
	)
}

export default CardsList
