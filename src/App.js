import './App.css';
import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Articles from './components/Articles/Articles';
import Topics from './components/Topics/Topics';
import SingleArticle from './components/SingleArticle/SingleArticle';
import AllUsers from './components/AllUsers/AllUsers';

function App() {
	return (
		<div className="App">
			<Header />
			<Topics />
			<Routes>
				<Route path="/" element={<Articles />}></Route>
				<Route path="/articles" element={<Articles />}></Route>
				<Route path="/users" element={<AllUsers />}></Route>
				<Route path="/topics" element={<Topics />}></Route>
				<Route path="/articles/topic/:topic" element={<Articles />}></Route>
				<Route path="/articles/:article_id" element={<SingleArticle />}></Route>
			</Routes>
		</div>
	);
}

export default App;
