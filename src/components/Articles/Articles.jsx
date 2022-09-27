import './Articles.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Articles = () => {
	const { topic } = useParams();
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		if (topic) {
			axios
				.get(
					`https://news-backend-project.herokuapp.com/api/articles?topic=${topic}`
				)
				.then(({ data }) => {
					setArticles(data.articles);
				});
		} else {
			axios
				.get('https://news-backend-project.herokuapp.com/api/articles')
				.then(({ data }) => {
					setArticles(data.articles);
				});
		}
	}, [topic]);

	return (
		<main>
			<section>
				<ul className="gallery">
					{articles.map((article) => {
						return (
							<li key={article.article_id} className="card">
								<h1>{article.title}</h1>
								<p>Topic: {article.topic}</p>
								<p>Author: {article.author}</p>
								<p>Votes: {article.votes}</p>
								<p>Comments: {article.comment_count}</p>
								<p>{article.created_at}</p>
							</li>
						);
					})}
				</ul>
			</section>
		</main>
	);
};

export default Articles;
