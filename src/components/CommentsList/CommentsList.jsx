import './CommentsList.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Oval } from 'react-loader-spinner';
import moment from 'moment';
import { BsHandThumbsUp, BsHandThumbsDown } from 'react-icons/bs';

const CommentsList = ({ article_id }) => {
	const [commentsList, setCommentsLits] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		axios
			.get(
				`https://news-backend-project.herokuapp.com/api/articles/${article_id}/comments`
			)
			.then(({ data }) => {
				setCommentsLits(data.comments);
				setIsLoading(false);
			});
	}, [article_id]);

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

							<p className="comments-author">
								{' '}
								posted by <strong>{comment.author}</strong> •{' '}
								{moment(comment.created_at).fromNow()}
							</p>
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
