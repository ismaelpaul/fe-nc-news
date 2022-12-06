import { createContext, useState } from 'react';

export const LoggedUserContext = createContext();

export const LoggedUserProvider = (props) => {
	const [loggedInUser, setLoggedInUser] = useState(
		JSON.parse(localStorage.getItem('loggedInUser')) || {}
	);

	return (
		<LoggedUserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
			{props.children}
		</LoggedUserContext.Provider>
	);
};
