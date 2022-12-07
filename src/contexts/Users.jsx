import { createContext, useState } from 'react';

export const UsersContext = createContext();

export const UserProvider = (props) => {
	const [allUsers, setAllUsers] = useState([]);

	return (
		<UsersContext.Provider value={{ allUsers, setAllUsers }}>
			{props.children}
		</UsersContext.Provider>
	);
};
