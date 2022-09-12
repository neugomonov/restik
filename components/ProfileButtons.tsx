import React, { useEffect, useState } from "react";
import { Button, Stack, useToast } from "@chakra-ui/react";
import { AiFillPhone } from "react-icons/ai";
import { MdPlace } from "react-icons/md";
import { useSession } from "next-auth/react";
import { collection } from "@firebase/firestore";
import { db } from "../firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { IoCash } from "react-icons/io5";

export default function ProfileButtons() {
	const { data: session } = useSession();
	const toast = useToast();
	const auth = getAuth();
	const [users, setUsers] = useState([{ name: "Loading...", id: "initial" }]);
	useEffect(
		() =>
			onSnapshot(collection(db, "users"), (snapshot: any) =>
				setUsers(
					snapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
				)
			),
		[]
	);
	const handleEditAddress = async (id: string) => {
		const address = prompt("Введите адрес доставки 🏠");
		if (address != null && address != "") {
			const docRef = doc(db, "users", id);
			const payload = { address };
			updateDoc(docRef, payload);
		}
	};
	const handleEditPhone = async (id: string) => {
		const phone = prompt("Введите ваш телефон 🤙");
		const phonePattern =
			/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/i;

		if (phonePattern.test(phone!)) {
			const docRef = doc(db, "users", id);
			const payload = { phone };
			updateDoc(docRef, payload);
			toast({
				title: "Номер изменён",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Пожалуйста, введите номер телефона корректно",
				status: "warning",
				duration: 3000,
				isClosable: true,
			});
		}
	};
	const handleEditPayment = async (id: string) => {
		const payment = prompt("Наличные или Онлайн? 💸");
		if (
			payment !== null &&
			(payment.toLowerCase() == "наличные" || payment.toLowerCase() == "онлайн")
		) {
			const docRef = doc(db, "users", id);
			const payload = { payment };
			updateDoc(docRef, payload);
		}
	};

	return (
		<>
			<Stack direction={{ base: "column", xl: "row" }}>
				{users
					?.filter((user: any) => user.email?.includes(session?.user?.email))
					.map((user: any) => (
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
					?.filter((user: any) => user.email?.includes(session?.user?.email))
					.map((user: any) => (
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
					?.filter((user: any) => user.email?.includes(session?.user?.email))
					.map((user: any) => (
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
