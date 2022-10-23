import './Articles.css';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { GoComment } from 'react-icons/go';
import { Oval } from 'react-loader-spinner';
import { getArticles } from '../../utils/api';
import moment from 'moment';
import Topics from '../Topics/Topics';
import DropdownQueries from '../DropdownQueries/DropdownQueries';

const Articles = () => {
	const { topic } = useParams();
	const [articles, setArticles] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [sortBy, setSortBy] = useState('created_at');
	const [order, setOrder] = useState('DESC');

	useEffect(() => {
		setIsLoading(true);

		getArticles(topic, sortBy, order).then(({ articles }) => {
			setArticles(articles);
			setIsLoading(false);
		});
	}, [topic, sortBy, order]);

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
			<DropdownQueries
				sortBy={sortBy}
				setSortBy={setSortBy}
				order={order}
				setOrder={setOrder}
			/>
			<section>
				<ul className="gallery">
					{articles.map((article) => {
						return (
							<li key={article.article_id} className="card">
								<Link to={`/articles/${article.article_id}`}>
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
