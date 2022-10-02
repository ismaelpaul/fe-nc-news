import './Articles.css';
import { useEffect, useState } from 'react';
import { useSearchParams, useParams, Link } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
import axios from 'axios';
import DropDownSortBy from '../DropDownSortBy/DropDownSortBy';
import { getArticles } from '../../utils/api';

const Articles = () => {
	const { topic } = useParams();
	const [articles, setArticles] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [searchParams, setSearchParams] = useSearchParams({});

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
			getArticles().then(({ articles }) => {
				setArticles(articles);
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
				<DropDownSortBy setSearchParams={setSearchParams} />
				<ul className="gallery">
					{articles.map((article) => {
						return (
							<li key={article.article_id} className="card">
								<Link to={`/articles/${article.article_id}`}>
									<h1>{article.title}</h1>
									<p className="author">
										by <strong>{article.author}</strong>
									</p>
									<p>Topic: {article.topic}</p>

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
