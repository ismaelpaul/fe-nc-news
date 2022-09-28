import './Topics.css';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Topics = () => {
	const [topics, setTopics] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		axios
			.get('https://news-backend-project.herokuapp.com/api/topics')
			.then(({ data }) => {
				setTopics(data.topic);
				setIsLoading(false);
			});
	}, []);

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
		<section className="topic-body">
			<ul className="topic-gallery">
				{topics.map((topic) => {
					return (
						<li key={topic.slug} className="topic-card">
							<Link
								className="topic-links"
								to={`/articles/topic/${topic.slug}`}
							>
								<h2>{topic.description}</h2>
								<p>{topic.slug}</p>
							</Link>
						</li>
					);
				})}
			</ul>
		</section>
	);
};

export default Topics;
