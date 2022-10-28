import React, { createContext, useState } from "react";

export const ThemeContext = createContext(false);

export const ThemeProvider = (props) => {
	const [darkMode, setDarkMode] = useState(false);

	return (
		<ThemeContext.Provider value={{ darkMode, setDarkMode }}>
			{props.children}
		</ThemeContext.Provider>
	);
};
