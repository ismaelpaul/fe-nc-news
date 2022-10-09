import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/User';
import { postComment } from '../../utils/api';
import './CommentAdder.css';

const CommentAdder = ({ article_id, setCommentsList }) => {
	const { loggedInUser } = useContext(UserContext);
	const [newComment, setNewComment] = useState({
		username: loggedInUser.username,
		body: '',
	});

	const handleChange = (e) => {
		setNewComment({ ...newComment, body: e.target.value });
	};
	const handleSubmit = (event) => {
		event.preventDefault();

		postComment(article_id, newComment).then(({ comment }) => {
			setCommentsList((currentComments) => {
				return [comment, ...currentComments];
			});
		});
		setNewComment({ username: loggedInUser.username, body: '' });
	};
	return (
		<form className="comment-adder-form" onSubmit={handleSubmit}>
			<textarea
				className="comment-adder-text"
				type="text"
				name="body"
				id="newComment"
				placeholder=" Add a comment..."
				value={newComment.body}
				onChange={handleChange}
				required
			></textarea>
			<button
				className={
					newComment.body === ''
						? 'comment-adder-btn-inactive'
						: 'comment-adder-btn-active'
				}
			>
				Add a comment
			</button>
		</form>
	);
};

export default CommentAdder;
