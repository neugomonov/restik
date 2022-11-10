import React, { createContext, useState } from "react";
// TODO: use local storage
export const BlurContext = createContext(true);

export const BlurProvider = (props: {
	value?: {
		blurMode: boolean;
		setBlurMode: React.Dispatch<React.SetStateAction<boolean>>;
	};
	children: React.ReactNode;
}) => {
	const [blurMode, setBlurMode] = useState(true);

	return (
		// @ts-expect-error
		<BlurContext.Provider value={{ blurMode, setBlurMode }}>
			{props.children}
		</BlurContext.Provider>
	);
};
