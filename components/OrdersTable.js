import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import SidebarWithHeader from "../components/SidebarWithHeader";
import MenuBox from "../components/MenuBox";
import VideoBox from "../components/VideoBox";
import NewsBox from "../components/NewsBox";
import Cart from "../components/Cart";
import LargeWithNewsletter from "../components/Footer";
import {
	Avatar,
	Box,
	Button,
	ButtonGroup,
	Flex,
	Heading,
	IconButton,
	Image,
	Input,
	Stack,
	HStack,
	VStack,
	Table,
	TableCaption,
	TableContainer,
	Tag,
	Tbody,
	Td,
	Text,
	Tfoot,
	Th,
	Thead,
	Tr,
	useColorMode,
	useColorModeValue,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	MenuDivider,
	Editable,
	EditablePreview,
	EditableInput,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";

import info from "../lib/info";
import { CgProfile } from "react-icons/cg";
import { AiOutlinePhone, AiTwotoneMail } from "react-icons/ai";
import { MdPassword, MdPlace } from "react-icons/md";
import { BiRename } from "react-icons/bi";
import { ArrowBackIcon, EditIcon } from "@chakra-ui/icons";
import { MdOutlineMessage, MdOutlineSend } from "react-icons/md";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, addDoc } from "@firebase/firestore";
import { db } from "../firebase";
import { useRouter } from "next/router";
import {
	doc,
	onSnapshot,
	setDoc,
	updateDoc,
	serverTimestamp,
	getDoc,
} from "firebase/firestore";

export default function OrdersTable() {
	const { data: session } = useSession();

	const { t, lang } = useTranslation("home");
	const { colorMode } = useColorMode();
	const [snapshot] = useCollection(collection(db, "orders"));
	const router = useRouter();
	const [orders, setOrders] = useState([{ name: "Loading...", id: "initial" }]);
	const [users, setUsers] = useState([{ name: "Loading...", id: "initial" }]);
	const alovelaceDocumentRef = doc(db, "admins", "neugomonovv@gmail.com");
	const usersCollectionRef = collection(db, "admins");

	useEffect(
		() =>
			onSnapshot(collection(db, "orders"), (snapshot) =>
				setOrders(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
			),
		[]
	);
	useEffect(
		() =>
			onSnapshot(collection(db, "users"), (snapshot) =>
				setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
			),
		[]
	);

	const handleEditAddress = async (id) => {
		const email = prompt("Введите ваш email");
		const address = prompt("Введите ваш адрес");
		if ((email = session?.user?.email)) {
			const docRef = doc(db, "orders", id);
			const payload = { email, address };
			updateDoc(docRef, payload);
		}
	};

	const handleNew = async () => {
		const products = prompt("Введите что хотите заказать 🍕");
		if (products != null && products != "") {
			const phone = prompt("Введите ваш телефон 🤙");
			const address = prompt("Введите адрес доставки 🏠");
			const payment = prompt("Наличные или Онлайн? 💸");
			const total = prompt("Введите сумму оплаты 💵");
			const email = prompt("Введите ваш email 📧");
			const timestamp = serverTimestamp();
			const status = "Принят";

			const collectionRef = collection(db, "orders");
			const payload = {
				products,
				phone,
				address,
				payment,
				total,
				email,
				timestamp,
				status,
			};
			const docRef = await addDoc(collectionRef, payload);
		}
	};

	const handleEditStatus = async (id) => {
		const status = prompt("Готовится/Доставляется/Выполнен? 🤔");
		// const email = prompt("Введите email заказчика 📧");
		if (
			status == "Готовится" ||
			status == "Доставляется" ||
			status == "Выполнен"
			// 	&&
			// email !== null &&
			// email !== ""
		) {
			const docRef = doc(db, "orders", id);
			const docSnap = await getDoc(docRef);

			const payload = { status };
			updateDoc(docRef, payload);
			await addDoc(collection(db, `notifications`), {
				recipient: docSnap.data().email,
				text: "🍕 Ваш заказ " + status + "!",
				timestamp: serverTimestamp(),
				read: false,
			});
		}
	};
	const [snapshotAdmins] = useCollection(collection(db, "admins"));

	const admins = snapshotAdmins?.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));

	return (
		<>
			<Button m={5} p={4} onClick={handleNew}>
				Новый заказ 🍕
			</Button>

			<TableContainer>
				<Table variant="striped" colorScheme="gray">
					<TableCaption>Таблица заказов</TableCaption>
					<Thead>
						<Tr>
							<Th>Статус</Th>
							<Th>Состав</Th>
							<Th>Телефон</Th>
							<Th>Адрес</Th>
							<Th>Вид оплаты</Th>
							<Th>Сумма ₽</Th>
							<Th>Почта</Th>
						</Tr>
					</Thead>
					<Tbody>
						{session?.user?.role == "Админ"
							? orders.map((order) => (
									<Tr key={order.id}>
										<Td>
											{order.status}
											<IconButton
												size="sm"
												icon={<EditIcon />}
												onClick={() => handleEditStatus(order.id)}
											/>
										</Td>
										<Td>{order.products}</Td>
										<Td>{order.phone}</Td>
										<Td>{order.address}</Td>
										<Td>{order.payment}</Td>
										<Td>{order.total}</Td>
										<Td>{order.email}</Td>
									</Tr>
							  ))
							: orders
									?.filter((order) =>
										order.email?.includes(session?.user?.email)
									)
									.map((order) => (
										<Tr key={order.id}>
											<Td>{order.status}</Td>
											<Td>{order.products}</Td>
											<Td>{order.phone}</Td>
											<Td>{order.address}</Td>
											<Td>{order.payment}</Td>
											<Td>{order.total}</Td>
											<Td>{order.email}</Td>
										</Tr>
									))}
					</Tbody>
					<Tfoot>
						<Tr>
							<Th>Статус</Th>
							<Th>Состав</Th>
							<Th>Телефон</Th>
							<Th>Адрес</Th>
							<Th>Вид оплаты</Th>
							<Th>Сумма ₽</Th>
							<Th>Почта</Th>
						</Tr>
					</Tfoot>
				</Table>
			</TableContainer>
		</>
	);
}
