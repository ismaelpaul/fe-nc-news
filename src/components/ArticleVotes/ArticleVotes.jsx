import './ArticleVotes.css';
import { useState } from 'react';
import { BsHandThumbsUp, BsHandThumbsDown } from 'react-icons/bs';
import { updateArticle } from '../../utils/api';

const ArticleVotes = ({ article_id, article, setArticle }) => {
	const [hasVotedUp, setHasVotedUp] = useState(false);
	const [hasVotedDown, setHasVotedDown] = useState(false);
	const [error, setError] = useState(null);

	const articleVotesUp = () => {
		if (!hasVotedUp) {
			setArticle((currentArticle) => {
				return { ...currentArticle, votes: currentArticle.votes + 1 };
			});
			const reqBody = {
				inc_votes: 1,
			};

			updateArticle(article_id, reqBody)
				.then(() => {})
				.catch((err) => {
					setError(err.response.data.msg);
					setArticle((currentArticle) => {
						return { ...currentArticle, votes: currentArticle.votes - 1 };
					});
				});
			setHasVotedUp(true);
			setHasVotedDown(false);
		} else {
			setArticle((currentArticle) => {
				return { ...currentArticle, votes: currentArticle.votes - 1 };
			});
			const reqBody = {
				inc_votes: -1,
			};

			updateArticle(article_id, reqBody)
				.then(() => {})
				.catch((err) => {
					setError(err.response.data.msg);
					setArticle((currentArticle) => {
						return { ...currentArticle, votes: currentArticle.votes + 1 };
					});
				});
			setHasVotedUp(false);
		}
	};

	const articleVotesDown = () => {
		if (!hasVotedDown) {
			setArticle((currentArticle) => {
				return { ...currentArticle, votes: currentArticle.votes - 1 };
			});
			const reqBody = {
				inc_votes: -1,
			};

			updateArticle(article_id, reqBody)
				.then(() => {})
				.catch((err) => {
					setError(err.response.data.msg);
					setArticle((currentArticle) => {
						return { ...currentArticle, votes: currentArticle.votes + 1 };
					});
				});
			setHasVotedDown(true);
			setHasVotedUp(false);
		} else {
			setArticle((currentArticle) => {
				return { ...currentArticle, votes: currentArticle.votes + 1 };
			});
			const reqBody = {
				inc_votes: 1,
			};

			updateArticle(article_id, reqBody)
				.then(() => {})
				.catch((err) => {
					setError(err.response.data.msg);
					setArticle((currentArticle) => {
						return { ...currentArticle, votes: currentArticle.votes - 1 };
					});
				});
			setHasVotedDown(false);
		}
	};

	if (error) {
		return <h2>{error}</h2>;
	}
	return (
		<div className="votes">
			<BsHandThumbsUp
				onClick={articleVotesUp}
				className={hasVotedUp ? 'thumb-voted' : 'thumb-unvoted'}
			/>
			<p>
				<strong>{article.votes}</strong>
			</p>
			<BsHandThumbsDown
				onClick={articleVotesDown}
				className={hasVotedDown ? 'thumb-voted' : 'thumb-unvoted'}
			/>
		</div>
	);
};

export default ArticleVotes;
