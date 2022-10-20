import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'


import { store } from './redux/store';

import App from './App';
import {ColorContextProvider} from './components/Theme/Theme';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store} >
			<ColorContextProvider>
					<App />
			</ColorContextProvider>
		</Provider>
	</React.StrictMode>
);
