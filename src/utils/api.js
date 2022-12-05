import axios from 'axios';

const newsApi = axios.create({
	baseURL: 'https://be-ncnews.cyclic.app/api',
});

export const getArticles = (topic, sort_by, order) => {
	return newsApi
		.get('/articles', { params: { topic, sort_by, order } })
		.then((res) => {
			return res.data;
		});
};

export const getArticleById = (article_id) => {
	return newsApi.get(`/articles/${article_id}`).then((res) => {
		return res.data;
	});
};

export const updateArticle = (article_id, reqBody) => {
	return newsApi.patch(`/articles/${article_id}`, reqBody).then((res) => {
		return res.data;
	});
};

export const getTopics = () => {
	return newsApi.get('/topics').then((res) => {
		return res.data;
	});
};

export const postComment = (article_id, newComment) => {
	return newsApi
		.post(`/articles/${article_id}/comments`, newComment)
		.then((res) => {
			return res.data;
		});
};

export const getCommentsByArticle = (article_id, reqBody) => {
	return newsApi
		.get(`/articles/${article_id}/comments`, reqBody)
		.then((res) => {
			return res.data;
		});
};

export const deleteComment = (comment_id) => {
	return newsApi.delete(`/comments/${comment_id}`).then((res) => {
		return res.data;
	});
};
export const updateCommentVotes = (comment_id) => {
	return newsApi.patch(`/comments/${comment_id}`).then((res) => {
		return res.data;
	});
};

export const getUsers = () => {
	return newsApi.get('/users').then((res) => {
		return res.data;
	});
};

export const getUserByUsername = (username) => {
	return newsApi.get(`/users/${username}`).then((res) => {
		return res.data;
	});
};
