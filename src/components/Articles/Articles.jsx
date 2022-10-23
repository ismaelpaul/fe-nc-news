import './Articles.css';
import { useEffect, useState } from 'react';
import { useSearchParams, useParams, Link } from 'react-router-dom';

import { GoComment } from 'react-icons/go';
import { Oval } from 'react-loader-spinner';
import axios from 'axios';
import DropDownSortBy from '../DropDownSortBy/DropDownSortBy';
import { getArticles } from '../../utils/api';
import moment from 'moment';
import ArticleVotes from '../ArticleVotes/ArticleVotes';
import Topics from '../Topics/Topics';

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
			<Topics />
			<section>
				<ul className="gallery">
					{articles.map((article) => {
						return (
							<li key={article.article_id} className="card">
								<Link to={`/articles/${article.article_id}`}>
									<p>{article.topic}</p>
									<h1>{article.title}</h1>
									<p className="author">
										{' '}
										posted by <strong>{article.author}</strong> •{' '}
										{moment(article.created_at).fromNow()}
									</p>

									<div className="article-interaction">
										<p>
											<GoComment /> <strong>{article.comment_count}</strong>{' '}
											comments
										</p>
									</div>
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
