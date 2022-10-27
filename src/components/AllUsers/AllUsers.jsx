import './AllUsers.css';
import { Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { getUsers } from '../../utils/api';
import { UserContext } from '../../contexts/User';
import { Oval } from 'react-loader-spinner';

const Users = () => {
	const [allUsers, setAllUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { setLoggedInUser } = useContext(UserContext);

	useEffect(() => {
		setIsLoading(true);
		getUsers().then(({ user }) => {
			setAllUsers(user);
			setIsLoading(false);
		});
	}, []);

	const handleLogin = (user) => {
		localStorage.setItem('loggedInUser', JSON.stringify(user));
		setLoggedInUser(user);
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
		<section>
			<p>Choose one character to log in</p>
			<ul className="user-container">
				{allUsers.map((user) => {
					return (
						<Link className="user-card" to={'/articles'}>
							<li key={user.username} onClick={() => handleLogin(user)}>
								<img
									src={user.avatar_url}
									alt={`avatar for ${user.username}`}
								/>
								<p>@{user.username}</p>
							</li>
						</Link>
					);
				})}
			</ul>
		</section>
	);
};

export default Users;
