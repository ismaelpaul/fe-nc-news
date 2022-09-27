import './NavBar.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
	return (
		<nav>
			<ul>
				<li>
					<Link to="/articles">Articles</Link>
					<Link to="/topics">Topics</Link>
					<Link to="/users">Users</Link>
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;
