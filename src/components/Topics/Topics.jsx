import './Topics.css';
import { Oval } from 'react-loader-spinner';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTopics } from '../../utils/api';

const Topics = () => {
	const [topics, setTopics] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getTopics().then(({ topic }) => {
			setTopics(topic);
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
			<Link to={`/articles/`}>
				<button className="topic-buttons-all">All Articles</button>
			</Link>

			<ul className="topic-gallery">
				{topics.map((topic) => {
					return (
						<li key={topic.slug}>
							<Link to={`/articles/topic/${topic.slug}`}>
								<button className="topic-buttons">
									{topic['slug'].charAt(0).toUpperCase() +
										topic['slug'].slice(1)}
								</button>
							</Link>
						</li>
					);
				})}
			</ul>
		</section>
	);
};

export default Topics;
