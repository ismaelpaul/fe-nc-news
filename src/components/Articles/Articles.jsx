import './Articles.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Articles = () => {
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		axios
			.get('https://news-backend-project.herokuapp.com/api/articles')
			.then(({ data }) => {
				setArticles(data.articles);
			});
	}, []);

	return (
		<main>
			<section>
				<ul className="articles-gallery">
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
