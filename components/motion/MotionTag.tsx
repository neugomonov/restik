import { Tag } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function MotionTag({ children }: { children: ReactNode }) {
	return (
		<Tag
			as={motion.div}
			cursor="pointer"
			drag
			dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
			whileDrag={{ scale: 1.2, rotate: 10 }}
			dragTransition={{ bounceStiffness: 1399, bounceDamping: 10 }}
			whileTap={{
				scale: 0.9,
			}}
			whileHover={{
				scale: 1.2,
				transition: { type: "spring", bounce: 0.8, duration: 1 },
			}}
			textTransform="uppercase"
			colorScheme="orange"
			variant="solid"
			mb="1rem"
		>
			{children}
		</Tag>
	);
}
