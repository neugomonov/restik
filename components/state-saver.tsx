import React from "react";
import { useRecoilTransactionObserver_UNSTABLE } from "recoil";

import { _blur, _cart } from "../lib/recoil-atoms";

interface Props {
	children: React.ReactNode;
}

const StateSaver = ({ children }: Props): JSX.Element => {
	useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
		const cart = snapshot.getLoadable(_cart).contents;
		const blur = snapshot.getLoadable(_blur).contents;

		localStorage.setItem("cart", JSON.stringify(cart));
		localStorage.setItem("blur", JSON.stringify(blur));
	});

	// @ts-expect-error - Type 'ReactNode' is not assignable to type 'Element'.
	return children;
};

export default StateSaver;
