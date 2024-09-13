


const CardItem = ({ post }) => {
	return (
		<div>
			<h2>{post.title}</h2>
			<p>{post.description}</p>
			<a href={post.link} target="_blank" rel="noopener noreferrer">Read more</a>
		</div>
	);
};

export default CardItem;
