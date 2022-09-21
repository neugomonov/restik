import { Box, Spinner } from "@chakra-ui/react";
import { forwardRef } from "react";

export const PizzaSpinner = () => (
	<Spinner
		size="xl"
		position="absolute"
		left="50%"
		top="50%"
		ml="calc(0px - var(--spinner-size) / 2)"
		mt="calc(0px - var(--spinner-size))"
	/>
);

export const PizzaContainer = forwardRef<HTMLDivElement>(
	({ children }, ref) => (
		<Box
			ref={ref}
			className="pizza"
			m="auto"
			mt={["-20px", "-60px", "-120px"]}
			mb={["-40px", "-140px", "-200px"]}
			w={[280, 480, 640]}
			h={[280, 480, 640]}
			position="relative"
		>
			{children}
		</Box>
	)
);

const Loader = () => {
	return (
		// @ts-expect-error
		<PizzaContainer>
			<PizzaSpinner />
		</PizzaContainer>
	);
};

export default Loader;
