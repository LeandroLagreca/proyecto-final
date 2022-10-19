import { ThemeProvider, createTheme } from "@mui/material";

import { createContext, useState, useMemo } from "react";



export const ColorModeContext = createContext({
	toggleMode : () => {},
	mode: "light"
})


export const ColorContextProvider = ({children}) => {
	const [mode, setMode] = useState("light");

	const colorMode = useMemo (() => ({
		toggleMode: () => setMode(prevMode => prevMode === "light" ? "dark" : "light" ),
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


