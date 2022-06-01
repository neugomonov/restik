// import "@testing-library/jest-dom/extend-expect";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SessionProvider } from "next-auth/react";

import LoginSidebar from "./LoginSidebar";

it("renders lol", () => {
	render(
		<SessionProvider>
			<LoginSidebar />
		</SessionProvider>
	);
});
