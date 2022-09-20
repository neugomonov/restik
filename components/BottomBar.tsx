import { useState } from "react";
import {
	FormControl,
	Input,
	useColorMode,
	IconButton,
	HStack,
} from "@chakra-ui/react";
import { serverTimestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useSession } from "next-auth/react";
import { MdOutlineSend } from "react-icons/md";

export default function BottomBar({ id, user }: { id: string; user: object }) {
	const [input, setInput] = useState("");
	const { data: session } = useSession();
	const { colorMode } = useColorMode();

	const sendMessage = async (event: React.FormEvent<HTMLDivElement>) => {
		event.preventDefault();
		if (input !== "") {
			await addDoc(collection(db, `chats/${id}/messages`), {
				text: input,
				sender:
					session?.user?.email !== undefined ? session?.user?.email : "anonym",
				timestamp: serverTimestamp(),
			});
		}
		setInput("");
	};
	// * debugger;
	return (
		<FormControl p={3} onSubmit={sendMessage} as="form">
			<HStack>
				<Input
					placeholder={"Ваше сообщение"}
					bg={colorMode === "dark" ? "whiteAlpha.100" : "blackAlpha.100"}
					border={0}
					_focus={{
						bg: "whiteAlpha.300",
					}}
					autoComplete="off"
					onChange={(event) => setInput(event.target.value)}
					value={input}
				/>
				<IconButton
					type="submit"
					colorScheme="orange"
					aria-label="Send"
					icon={<MdOutlineSend />}
				/>
			</HStack>
		</FormControl>
	);
}
