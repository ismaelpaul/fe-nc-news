import './SingleArticle.css';
import { Oval } from 'react-loader-spinner';
import { FaRegCommentDots } from 'react-icons/fa';
import { TbArrowBigTop, TbArrowBigDown } from 'react-icons/tb';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SingleArticle = () => {
	const { article_id } = useParams();
	const [article, setArticle] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		axios
			.get(
				`https://news-backend-project.herokuapp.com/api/articles/${article_id}`
			)
			.then(({ data }) => {
				setArticle(data.article);
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
		<main>
			<section className="single-article-body">
				<ul>
					<li key={article.article_id} className="single-article">
						<h1>{article.title}</h1>
						<p className="author">
							by <strong>{article.author}</strong>
						</p>
						<p>{article.body}</p>
						<p>Topic: {article.topic}</p>
						<p>
							<FaRegCommentDots /> <strong>{article.comment_count}</strong>{' '}
							comments
						</p>
						<p>
							<TbArrowBigTop /> <strong>{article.votes}</strong>{' '}
							<TbArrowBigDown />
						</p>
						<p>Created at: {article.created_at}</p>
					</li>
				</ul>
			</section>
		</main>
	);
};

export default SingleArticle;
