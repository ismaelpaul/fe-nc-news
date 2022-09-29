import './SingleArticle.css';
import { Oval } from 'react-loader-spinner';
import { BsHandThumbsUp, BsHandThumbsDown } from 'react-icons/bs';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GoComment } from 'react-icons/go';
import moment from 'moment';

const SingleArticle = () => {
	const { article_id } = useParams();
	const [article, setArticle] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		axios
			.get(
				`https://news-backend-project.herokuapp.com/api/articles/${article_id}`
			)
			.then(({ data }) => {
				setArticle(data.article);
				setIsLoading(false);
			})
			.catch((err) => {
				setError(err.response.data.msg);
			});
	}, [article_id]);

	const articleVotesUp = () => {
		setArticle((currentArticle) => {
			return { ...currentArticle, votes: currentArticle.votes + 1 };
		});
		const reqBody = {
			inc_votes: 1,
		};

		axios
			.patch(
				`https://news-backend-project.herokuapp.com/api/articles/${article_id}`,
				reqBody
			)
			.then((data) => {})
			.catch((err) => {
				setArticle((currentArticle) => {
					return { ...currentArticle, votes: currentArticle.votes - 1 };
				});
			});
	};

	const articleVotesDown = () => {
		setArticle((currentArticle) => {
			return { ...currentArticle, votes: currentArticle.votes - 1 };
		});
		const reqBody = {
			inc_votes: -1,
		};

		axios
			.patch(
				`https://news-backend-project.herokuapp.com/api/articles/${article_id}`,
				reqBody
			)
			.then((data) => {})
			.catch((err) => {
				setArticle((currentArticle) => {
					return { ...currentArticle, votes: currentArticle.votes + 1 };
				});
			});
	};

	if (error) {
		return <h2>{error}</h2>;
	}
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
			<section className="single-article-body">
				<ul>
					<li key={article.article_id} className="single-article-card">
						<p className="single-article-topic">{article.topic}</p>
						<h1>{article.title}</h1>
						<p className="author">
							{' '}
							posted by <strong>{article.author}</strong> •{' '}
							{moment(article.created_at).fromNow()}
						</p>
						<p>{article.body}</p>
						<div className="single-article-interaction">
							<p>
								<BsHandThumbsUp
									aria-label="votes for this comment"
									onClick={articleVotesUp}
								/>{' '}
								<strong>{article.votes}</strong>{' '}
								<BsHandThumbsDown onClick={articleVotesDown} />
							</p>
							<p>
								<GoComment /> <strong>{article.comment_count}</strong> comments
							</p>
						</div>
					</li>
				</ul>
			</section>
		</main>
	);
};

export default SingleArticle;
