import { useEffect, useState } from 'react';
import { getUserByUsername } from '../../utils/api';
import './UserAvatar.css';

const UserAvatar = ({ author }) => {
	const [userAvatar, setUserAvatar] = useState({});

	useEffect(() => {
		getUserByUsername(author).then(({ user }) => {
			setUserAvatar(user[0]);
		});
	}, [author]);

	return (
		<div className="image-cropper">
			<img
				className="profile-img-avatar"
				src={userAvatar.avatar_url}
				alt={`avatar for ${userAvatar.username}`}
			/>
		</div>
	);
};

export default UserAvatar;
