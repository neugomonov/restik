import { Button, Stack, useToast } from "@chakra-ui/react";
import { collection } from "@firebase/firestore";
import { doc, DocumentData, onSnapshot, updateDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { AiFillPhone } from "react-icons/ai";
import { IoCash } from "react-icons/io5";
import { MdPlace } from "react-icons/md";
import { db } from "../firebase";

export default function ProfileButtons() {
	const { data: session } = useSession();
	const toast = useToast();
	const [users, setUsers] = useState([{ name: "Loading...", id: "initial" }]);
	useEffect(
		() =>
			onSnapshot(collection(db, "users"), (snapshot) =>
				setUsers(
					snapshot.docs.map((doc: DocumentData) => ({
						...doc.data(),
						id: doc.id,
					}))
				)
			),
		[]
	);
	const { t } = useTranslation("common");
	const handleEditAddress = async (id: string) => {
		const address = prompt(t("addressPrompt"));
		if (address != null && address != "") {
			const docRef = doc(db, "users", id);
			const payload = { address };
			updateDoc(docRef, payload);
			toast({
				title: t("addressToast"),
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};
	const handleEditPhone = async (id: string) => {
		const phone = prompt(t("phonePrompt"));
		const phonePattern = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/i;

		if (phonePattern.test(phone!)) {
			const docRef = doc(db, "users", id);
			const payload = { phone };
			updateDoc(docRef, payload);
			toast({
				title: t("phoneToast"),
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: t("phoneBadToast"),
				status: "warning",
				duration: 3000,
				isClosable: true,
			});
		}
	};
	//// After all the code modifications this function is pretty much useless. Stating you preferred payment is useless, your phone, your address - everything. I'll let the buttons be for now, anyway. But I gotta make use of it all some day.
	const handleEditPayment = async (id: string) => {
		const payment = prompt("Cash / Online? 💸");
		if (
			payment !== null &&
			(payment.toLowerCase() == "cash" || payment.toLowerCase() == "cash")
		) {
			const docRef = doc(db, "users", id);
			const payload = { payment };
			updateDoc(docRef, payload);
		} else {
			toast({
				title: t("paymentToast"),
				status: "warning",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	return (
		<>
			<Stack direction={{ base: "column", xl: "row" }}>
				{users
					?.filter((user: Record<string, string>) =>
						// eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
						user.email?.includes(session?.user?.email!)
					)
					.map((user: Record<string, string>) => (
						<Button
							key={user.id}
							size="md"
							leftIcon={<AiFillPhone />}
							onClick={() => handleEditPhone(user.id)}
						>
							{user.phone}
						</Button>
					))}

				{users
					?.filter((user: Record<string, string>) =>
						// eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
						user.email?.includes(session?.user?.email!)
					)
					.map((user: Record<string, string>) => (
						<Button
							key={user.id}
							size="md"
							leftIcon={<MdPlace />}
							onClick={() => handleEditAddress(user.id)}
						>
							{user.address}
						</Button>
					))}
				{users
					?.filter((user: Record<string, string>) =>
						// eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
						user.email?.includes(session?.user?.email!)
					)
					.map((user: Record<string, string>) => (
						<Button
							key={user.id}
							size="md"
							leftIcon={<IoCash />}
							onClick={() => handleEditPayment(user.id)}
						>
							{user.payment}
						</Button>
					))}
			</Stack>
		</>
	);
}
