import axios from 'axios';

const newsApi = axios.create({
	baseURL: 'https://news-backend-project.herokuapp.com/api',
});

export const getArticles = () => {
	return newsApi.get('/articles').then((res) => {
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
export const getCommentsByArticle = (article_id) => {
	return newsApi.get(`/articles/${article_id}/comments`).then((res) => {
		return res.data;
	});
};
