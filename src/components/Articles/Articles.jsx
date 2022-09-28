import './Articles.css';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
import axios from 'axios';

const Articles = () => {
	const { topic } = useParams();
	const [articles, setArticles] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (topic) {
			axios
				.get(
					`https://news-backend-project.herokuapp.com/api/articles?topic=${topic}`
				)
				.then(({ data }) => {
					setArticles(data.articles);
					setIsLoading(false);
				});
		} else {
			axios
				.get('https://news-backend-project.herokuapp.com/api/articles')
				.then(({ data }) => {
					setArticles(data.articles);
					setIsLoading(false);
				});
		}
	}, [topic]);

	if (isLoading) {
		return (
			<div className="spinner-container">
				<Oval
					className="spinner"
					wrapperClass="spinner"
					height={50}
					width={50}
					color="red"
					secondaryColor="red"
					strokeWidth={5}
					strokeWidthSecondary={5}
				/>
			</div>
		);
	}
	return (
		<main>
			<section>
				<ul className="gallery">
					{articles.map((article) => {
						return (
							<li key={article.article_id} className="card">
								<Link to={`/articles/${article.article_id}`}>
									<h1>{article.title}</h1>
									<p>Topic: {article.topic}</p>
									<p>Author: {article.author}</p>
									<p>Votes: {article.votes}</p>
									<p>Comments: {article.comment_count}</p>
									<p>{article.created_at}</p>
								</Link>
							</li>
						);
					})}
				</ul>
			</section>
		</main>
	);
};

export default Articles;
