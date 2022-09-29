import './Header.css';

import { HiUserCircle } from 'react-icons/hi';

const Header = () => {
	return (
		<header>
			<h1>NC News</h1>
			<div className="login">
				<HiUserCircle className="profile-icon" />
				<p>Login</p>
			</div>
		</header>
	);
};

export default Header;
