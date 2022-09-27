import './Topics.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Topics = () => {
	const [topics, setTopics] = useState([]);

	useEffect(() => {
		axios
			.get('https://news-backend-project.herokuapp.com/api/topics')
			.then(({ data }) => {
				setTopics(data.topic);
			});
	}, []);

	return (
		<section className="topic-body">
			<ul className="topic-gallery">
				{topics.map((topic) => {
					return (
						<li key={topic.slug} className="topic-card">
							<Link className="topic-links" to={`/articles/${topic.slug}`}>
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
