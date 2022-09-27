import './App.css';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import { Route, Routes } from 'react-router-dom';
import Articles from './components/Articles/Articles';

function App() {
	return (
		<div className="App">
			<Header />
			<NavBar />
			<Routes>
				<Route path="/articles" element={<Articles />}></Route>
			</Routes>
		</div>
	);
}

export default App;
