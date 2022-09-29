import './App.css';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import { Route, Routes } from 'react-router-dom';
import Articles from './components/Articles/Articles';
import Topics from './components/Topics/Topics';
import SingleArticle from './components/SingleArticle/SingleArticle';
import CommentsList from './components/CommentsList/CommentsList';

function App() {
	return (
		<div className="App">
			<Header />
			<NavBar />
			<Routes>
				<Route path="/articles" element={<Articles />}></Route>
				<Route path="/topics" element={<Topics />}></Route>
				<Route path="/articles/topic/:topic" element={<Articles />}></Route>
				<Route path="/articles/:article_id" element={<SingleArticle />}></Route>
				<Route
					path="/articles/:article_id/comments"
					element={<SingleArticle />}
				></Route>
			</Routes>
		</div>
	);
}

export default App;
