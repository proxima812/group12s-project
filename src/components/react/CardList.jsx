import { Suspense, lazy, useEffect, useState } from 'react';

// Ленивый импорт компонента, который будет загружаться при необходимости
const CardItem = lazy(() => import('./CardItem'));

const CardList = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				// Измените URL на реальный путь к вашему API
				const response = await fetch('/api/db.json'); 
				if (!response.ok) throw new Error('Network response was not ok');
				const data = await response.json();
				console.log('Fetched posts:', data); // Отладочная информация
				setPosts(data.postsList || data); // Проверьте структуру данных
			} catch (error) {
				console.error('Error fetching posts:', error);
				setError('Failed to load posts.');
			} finally {
				setLoading(false);
			}
		};

		fetchPosts();
	}, []);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;

	return (
		<div>
			<h1>Posts</h1>
			<Suspense fallback={<div>Loading post...</div>}>
				<ul>
					{posts.length > 0 ? (
						posts.map(post => (
							<CardItem key={post.id} post={post} />
						))
					) : (
						<div>No posts available</div>
					)}
				</ul>
			</Suspense>
		</div>
	);
};

export default CardList;
