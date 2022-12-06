import './CommentsList.css';
import { useEffect, useState, useContext } from 'react';
import { Oval } from 'react-loader-spinner';
import moment from 'moment';
import { BsHandThumbsUp, BsHandThumbsDown } from 'react-icons/bs';
import { VscTrash } from 'react-icons/vsc';
import { deleteComment, getCommentsByArticle } from '../../utils/api';
import { LoggedUserContext } from '../../contexts/LoggedUser';
import { UsersContext } from '../../contexts/Users';

const CommentsList = ({ article_id, commentsList, setCommentsList }) => {
	const [isLoading, setIsLoading] = useState(false);

	const { loggedInUser } = useContext(LoggedUserContext);
	const { allUsers } = useContext(UsersContext);

	useEffect(() => {
		setIsLoading(true);
		getCommentsByArticle(article_id)
			.then(({ comments }) => {
				setCommentsList(comments);
				setIsLoading(false);
			})
			.catch((err) => {
				setIsLoading(false);
			});
	}, [article_id, setCommentsList]);

	const handleDeleteComment = (comment) => {
		setIsLoading(true);

		deleteComment(comment.comment_id)
			.then(() => {
				setCommentsList((currComments) => [...currComments]);
				setIsLoading(false);
			})
			.catch((err) => {
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
							<div className="comments-details-wrapper">
								<div className="comments-author">
									{allUsers.map((user) => {
										return user.username === comment.author ? (
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
									<strong>{comment.author}</strong> •{' '}
									{moment(comment.created_at).fromNow()}
									{loggedInUser.username === comment.author ? (
										<div className="delete-comment">
											<VscTrash
												className="delete-icon"
												onClick={() => handleDeleteComment(comment)}
											/>
										</div>
									) : (
										<span></span>
									)}
								</div>
							</div>
							<p className="comment-body">{comment.body}</p>
							<div className="comment-votes-wrapper">
								<p>
									<BsHandThumbsUp
										className="comment-votes-icon"
										aria-label="votes for this comment"
									/>{' '}
									<strong>{comment.votes}</strong>{' '}
									<BsHandThumbsDown className="comment-votes-icon" />
								</p>
							</div>
							<hr></hr>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default CommentsList;
