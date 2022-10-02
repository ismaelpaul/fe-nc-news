import { useState } from 'react';
import { BsHandThumbsUp, BsHandThumbsDown } from 'react-icons/bs';
import { updateArticle } from '../../utils/api';

const ArticleVotes = ({ article_id, article, setArticle }) => {
	const [hasVoted, setHasVoted] = useState(false);
	const [error, setError] = useState(null);

	const articleVotesUp = () => {
		if (!hasVoted) {
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
			setHasVoted(true);
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
			setHasVoted(false);
		}
	};

	const articleVotesDown = () => {
		if (!hasVoted) {
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
			setHasVoted(true);
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
			setHasVoted(false);
		}
	};

	if (error) {
		return <h2>{error}</h2>;
	}
	return (
		<>
			<BsHandThumbsUp onClick={articleVotesUp} />
			<p>
				<strong>{article.votes}</strong>
			</p>
			<BsHandThumbsDown onClick={articleVotesDown} />
		</>
	);
};

export default ArticleVotes;
