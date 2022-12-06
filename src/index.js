import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { LoggedUserProvider } from './contexts/LoggedUser';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<LoggedUserProvider>
		<React.StrictMode>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</React.StrictMode>
	</LoggedUserProvider>
);
