import { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../contexts/User';

const CommentAdder = ({ article_id, setCommentsList }) => {
	const { loggedInUser, setLoggedInUser } = useContext(UserContext);
	const [newComment, setNewComment] = useState({
		username: loggedInUser.username,
		body: '',
	});

	const handleChange = (e) => {
		setNewComment({ ...newComment, body: e.target.value });
	};
	const handleSubmit = (event) => {
		event.preventDefault();

		axios
			.post(
				`https://news-backend-project.herokuapp.com/api/articles/${article_id}/comments`,
				newComment
			)
			.then(({ data }) => {
				setCommentsList((currentComments) => {
					return [data.comment, ...currentComments];
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
