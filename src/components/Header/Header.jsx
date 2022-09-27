import './Header.css';

import { HiUserCircle } from 'react-icons/hi';

const Header = () => {
	return (
		<header>
			<h1>NC News</h1>
			<HiUserCircle className="profile-icon" />
		</header>
	);
};

export default Header;
