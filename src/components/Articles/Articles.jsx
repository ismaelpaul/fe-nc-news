import './Articles.css';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { GoComment } from 'react-icons/go';
import { BsHandThumbsUp, BsHandThumbsDown } from 'react-icons/bs';
import { Oval } from 'react-loader-spinner';
import { getArticles } from '../../utils/api';
import moment from 'moment';

import DropdownQueries from '../DropdownQueries/DropdownQueries';
import UserAvatar from '../UserAvatar/UserAvatar';

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
									<div className="posted-by">
										<UserAvatar author={article.author} />
										<p className="article-author">
											{' '}
											<strong>{article.author}</strong> •{' '}
											{moment(article.created_at).fromNow()}
										</p>
									</div>

									<div className="article-interaction">
										<div className="article-votes">
											<BsHandThumbsUp className="icon" />
											<p>
												<strong>{article.votes}</strong>
											</p>
											<BsHandThumbsDown className="icon" />
										</div>
										<div className="article-comments">
											<GoComment className="icon" />{' '}
											<p>
												<strong>{article.comment_count}</strong> comments
											</p>
										</div>
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
