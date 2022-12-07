import './AllUsers.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { LoggedUserContext } from '../../contexts/LoggedUser';
import { UsersContext } from '../../contexts/Users';

const Users = () => {
	const { setLoggedInUser } = useContext(LoggedUserContext);
	const { allUsers } = useContext(UsersContext);

	const handleLogin = (user) => {
		localStorage.setItem('loggedInUser', JSON.stringify(user));
		setLoggedInUser(user);
	};

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
