import './SingleArticle.css';
import { Oval } from 'react-loader-spinner';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GoComment } from 'react-icons/go';
import moment from 'moment';
import CommentsList from '../CommentsList/CommentsList';
import CommentAdder from '../CommentAdder/CommentAdder';
import { getArticleById } from '../../utils/api';
import ArticleVotes from '../ArticleVotes/ArticleVotes';
import { useContext } from 'react';
import { UsersContext } from '../../contexts/Users';

const SingleArticle = () => {
	const { article_id } = useParams();
	const [article, setArticle] = useState({});
	const [commentsList, setCommentsList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const { allUsers } = useContext(UsersContext);

	useEffect(() => {
		getArticleById(article_id)
			.then(({ article }) => {
				setArticle(article);
				setIsLoading(false);
			})
			.catch((err) => {
				setError(err.response.data.msg);
			});
	}, [article_id]);

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
			<section className="single-article">
				<ul>
					<li key={article.article_id} className="single-article-card">
						<div className="single-article-topic">
							<p>
								{article['topic'].charAt(0).toUpperCase() +
									article['topic'].slice(1)}
							</p>
						</div>
						<h1>{article.title}</h1>
						<div className="posted-by">
							{allUsers.map((user) => {
								return user.username === article.author ? (
									<div className="image-cropper">
										<img
											className="profile-img-avatar"
											src={user.avatar_url}
											alt={`avatar for ${user.username}`}
										/>
									</div>
								) : (
									<></>
								);
							})}
							<p>
								<strong>{article.author}</strong> •{' '}
								{moment(article.created_at).fromNow()}
							</p>
						</div>
						<p className="single-article-body">{article.body}</p>
						<div className="single-article-interaction">
							<div className="single-article-votes">
								{' '}
								<ArticleVotes
									article_id={article_id}
									article={article}
									setArticle={setArticle}
								/>
							</div>
							<div className="single-article-comments">
								<GoComment className="comment-icon" />

								<p>
									<strong>{article.comment_count}</strong> comments
								</p>
							</div>
						</div>
						<CommentAdder
							article_id={article_id}
							setCommentsList={setCommentsList}
						/>
						<CommentsList
							commentsList={commentsList}
							setCommentsList={setCommentsList}
							article_id={article_id}
						/>
					</li>
				</ul>
			</section>
		</main>
	);
};

export default SingleArticle;
