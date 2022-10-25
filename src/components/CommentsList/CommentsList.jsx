import './CommentsList.css';
import { useEffect, useState, useContext } from 'react';
import { Oval } from 'react-loader-spinner';
import moment from 'moment';
import { BsHandThumbsUp, BsHandThumbsDown } from 'react-icons/bs';
import { deleteComment, getCommentsByArticle } from '../../utils/api';
import { UserContext } from '../../contexts/User';

const CommentsList = ({ article_id, commentsList, setCommentsList }) => {
	const [isLoading, setIsLoading] = useState(true);

	const { loggedInUser } = useContext(UserContext);

	useEffect(() => {
		getCommentsByArticle(article_id).then(({ comments }) => {
			setCommentsList(comments);
			setIsLoading(false);
		});
	}, [article_id, setCommentsList]);

	const handleDeleteComment = (comment) => {
		setIsLoading(true);
		deleteComment(comment.comment_id).then(() => {
			setIsLoading(false);
		});
	};

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
		<div className="comments-card">
			<ul>
				{commentsList.map((comment) => {
					return (
						<li key={comment.comment_id}>
							<hr></hr>
							<div className="comments-details-wrapper">
								<p className="comments-author">
									{' '}
									posted by <strong>{comment.author}</strong> •{' '}
									{moment(comment.created_at).fromNow()}
									{loggedInUser.username === comment.author ? (
										<button onClick={() => handleDeleteComment(comment)}>
											Delete comment
										</button>
									) : (
										<p></p>
									)}
								</p>
							</div>
							<p>{comment.body}</p>
							<p>
								<BsHandThumbsUp aria-label="votes for this comment" />{' '}
								<strong>{comment.votes}</strong> <BsHandThumbsDown />
							</p>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default CommentsList;
