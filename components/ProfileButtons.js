import React, { useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { Button, Stack, useColorMode } from "@chakra-ui/react";
import { AiFillPhone, AiOutlinePhone, AiTwotoneMail } from "react-icons/ai";
import { MdPassword, MdPlace } from "react-icons/md";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, addDoc } from "@firebase/firestore";
import { db } from "../firebase";
import { useRouter } from "next/router";
import { doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { IoCash } from "react-icons/io5";

export default function ProfileButtons() {
	const { data: session } = useSession();
	const auth = getAuth();
	const user = auth.currentUser;

	const { t, lang } = useTranslation("home");
	const { colorMode } = useColorMode();
	const [snapshot] = useCollection(collection(db, "users"));
	const router = useRouter();
	const [users, setUsers] = useState([{ name: "Loading...", id: "initial" }]);
	useEffect(
		() =>
			onSnapshot(collection(db, "users"), (snapshot) =>
				setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
			),
		[]
	);
	const handleEditAddress = async (id) => {
		const address = prompt("Введите адрес доставки 🏠");
		if (address != null && address != "") {
			const docRef = doc(db, "users", id);
			const payload = { address };
			updateDoc(docRef, payload);
		}
	};
	const handleEditPhone = async (id) => {
		const phone = prompt("Введите ваш телефон 🤙");
		if (phone != null && phone != "") {
			const docRef = doc(db, "users", id);
			const payload = { phone };
			updateDoc(docRef, payload);
		}
	};
	const handleEditPayment = async (id) => {
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
					?.filter((user) => user.email?.includes(session?.user?.email))
					.map((user) => (
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
					?.filter((user) => user.email?.includes(session?.user?.email))
					.map((user) => (
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
					?.filter((user) => user.email?.includes(session?.user?.email))
					.map((user) => (
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
