import { ThemeProvider, createTheme } from "@mui/material";

import { createContext, useState, useMemo } from "react";

const savedMode = window.localStorage.getItem('themeMode')
		? window.localStorage.getItem('themeMode')
		: 'light'

export const ColorModeContext = createContext({
	toggleMode : () => {},
	mode: savedMode
})


export const ColorContextProvider = ({children}) => {
	
	const [mode, setMode] = useState(savedMode);

	const colorMode = useMemo (() => ({
		
		toggleMode: () => {
			const newMode = mode === "light" ? "dark" : "light"
			setMode(newMode)
			window.localStorage.setItem('themeMode', newMode)
		} ,
		mode
	}), [mode]);
	
	const theme = createTheme({
		palette: {
			mode:mode,
			primary:{
				main:"#171a21",
			
			},
			secondary:{
				main: "#66c0f4"
			}
		}
	})

	return (
		<ColorModeContext.Provider value={colorMode}>
		<ThemeProvider theme={theme}>
			{children}
		</ThemeProvider>
		
		</ColorModeContext.Provider>
		)
}


