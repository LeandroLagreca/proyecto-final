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
	'pk_test_51LufTBJFaEjO8LKN7nRBtmqKYj68WceXrgvn25J1vq7CdkiP3W6fVrFWvFsQ1AnWgvUfqF9ZCSeP6vtFWNEHMAk000XeUTK9Fn'
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
