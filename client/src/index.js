import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import {ThemeProvider} from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';
import theme from './components/Theme/Theme';


import { store } from './redux/store';

import App from './App';

// const theme = createTheme({
// 	palette: {
// 		primary: {
// 		  main: purple[500],
// 		},
// 		secondary: {
// 		  main: green[500],
// 		},
// 	  },
// })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store} >
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</Provider>
	</React.StrictMode>
);
