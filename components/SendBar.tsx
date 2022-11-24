import { useColorMode } from "@chakra-ui/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import { useState } from "react";
import { MdOutlineSend } from "react-icons/md";
import { db } from "../firebase";

const FormControl = dynamic(
	async () => (await import("@chakra-ui/react")).FormControl
);
const HStack = dynamic(async () => (await import("@chakra-ui/react")).HStack);
const IconButton = dynamic(
	async () => (await import("@chakra-ui/react")).IconButton
);
const Input = dynamic(async () => (await import("@chakra-ui/react")).Input);

export default function SendBar({
	id,
	user,
}: {
	id: string | string[] | undefined;
	user:
		| {
				name?: string | null | undefined;
				email?: string | null | undefined;
				image?: string | null | undefined;
				// eslint-disable-next-line no-mixed-spaces-and-tabs
		  }
		| undefined;
}) {
	const [input, setInput] = useState("");
	const { data: session } = useSession();
	const { colorMode } = useColorMode();
	const { t } = useTranslation("common");
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
					placeholder={t("bottomBarPlaceholder")}
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
