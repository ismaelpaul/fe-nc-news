import './Header.css';
import { HiUserCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/User';
import { useContext } from 'react';

export default function Header() {
	const { loggedInUser, setLoggedInUser } = useContext(UserContext);

	return loggedInUser.username ? (
		<header>
			<h1>NC News</h1>
			<div className="loggedin-container">
				<div className="image-cropper-login">
					<img
						className="profile-img"
						src={loggedInUser.avatar_url}
						alt={`avatar for ${loggedInUser.username}`}
					/>
				</div>

				<div className="user-details">
					<p>
						Hi, <strong>{loggedInUser.username}</strong>!
					</p>
					<p
						className="logout"
						onClick={() => {
							setLoggedInUser({});
						}}
					>
						Log out
					</p>
				</div>
			</div>
		</header>
	) : (
		<header>
			<h1>NC News</h1>
			<div className="login">
				<HiUserCircle className="profile-icon" />
				<Link to={'/users'}>
					<p>Log in</p>
				</Link>
			</div>
		</header>
	);
}
