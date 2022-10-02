import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/User';
import { postComment } from '../../utils/api';

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
		<form onSubmit={handleSubmit}>
			<label htmlFor="newComment">Add a comment</label>
			<textarea
				type="text"
				name="body"
				id="newComment"
				placeholder="Write your comment here..."
				value={newComment.body}
				onChange={handleChange}
				required
			></textarea>
			<button>Post a comment</button>
		</form>
	);
};

export default CommentAdder;
