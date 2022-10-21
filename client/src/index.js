import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './redux/store';

import App from './App';
import { ColorContextProvider } from './components/Theme/Theme';

import { loadStripe } from '@stripe/stripe-js';
import {
	Elements
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(
	'pk_test_51Luf96F1iznuqvKCn3b3BzDIpjrpf84WaSgemO1meObzaZ4EW6xHONZKUbFGMpp10DMq95TyaSGOob5hVq5FJ8HH00yqQ8eCs4'
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<ColorContextProvider>
				<Elements stripe={stripePromise}>
					<App />
				</Elements>
			</ColorContextProvider>
		</Provider>
	</React.StrictMode>
);
