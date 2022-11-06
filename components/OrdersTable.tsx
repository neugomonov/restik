import { EditIcon } from "@chakra-ui/icons";
import {
	Button,
	IconButton,
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td,
	Tfoot,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import { addDoc, collection } from "@firebase/firestore";
import {
	doc,
	DocumentData,
	getDoc,
	onSnapshot,
	serverTimestamp,
	updateDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";

export default function OrdersTable() {
	const { data: session } = useSession();

	const [orders, setOrders] = useState([{ name: "Loading...", id: "initial" }]);
	const [users, setUsers] = useState([{ name: "Loading...", id: "initial" }]);

	useEffect(
		() =>
			onSnapshot(collection(db, "orders"), (snapshot) =>
				setOrders(
					snapshot.docs.map((doc: DocumentData) => ({
						...doc.data(),
						id: doc.id,
					}))
				)
			),
		[]
	);
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

	const { t, lang } = useTranslation("common");
	const handleNew = async () => {
		const products = prompt("Введите что хотите заказать 🍕");
		if (products != null && products != "") {
			const phone = prompt("Введите ваш телефон 🤙");
			const address = prompt("Введите адрес доставки 🏠");
			const payment = prompt("Наличные или Онлайн? 💸");
			const total = prompt("Введите сумму оплаты 💵");
			const email = prompt("Введите ваш email 📧");
			const timestamp = serverTimestamp();
			const status = t("accepted");

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
	const handleEditStatus = async (id: string) => {
		const status = prompt(
			"Готовится/in cooking/Доставляется/in delivery/Выполнен/completed? 🤔"
		);
		if (
			status == "Готовится" ||
			status == "in cooking" ||
			status == "Доставляется" ||
			status == "in delivery" ||
			status == "Выполнен" ||
			status == "completed"
		) {
			const docRef = doc(db, "orders", id);
			const docSnap = await getDoc(docRef);
			const payload = { status };
			updateDoc(docRef, payload);
			await addDoc(collection(db, `notifications`), {
				recipient: docSnap.data()!.email,
				text: t("yourOrder") + status + "!",
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

	// TODO: Sort by date
	return (
		<>
			{
				// @ts-expect-error
				session?.user?.role == "Админ" && (
					<Button m={5} p={4} onClick={handleNew}>
						Новый заказ 🍕
					</Button>
				)
			}
			<TableContainer>
				<Table variant="striped" colorScheme="gray">
					<TableCaption>{t("OrdersTable1")}</TableCaption>
					<Thead>
						<Tr>
							<Th>{t("OrdersTable2")}</Th>
							<Th>{t("OrdersTable3")}</Th>
							<Th>{t("OrdersTable4")}</Th>
							<Th>{t("OrdersTable5")}</Th>
							<Th>{t("OrdersTable6")}</Th>
							<Th>{t("OrdersTable7")}</Th>
							<Th>{t("OrdersTable8")}</Th>
						</Tr>
					</Thead>
					<Tbody>
						{
							// @ts-expect-error
							session?.user?.role == "Админ"
								? orders.map((order: Record<string, string>) => (
										<Tr key={order.id}>
											<Td>
												{order.status}
												<IconButton
													aria-label="Edit"
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
										?.filter((order: Record<string, string>) =>
											order.email?.includes(session?.user?.email!)
										)
										.map((order: Record<string, string>) => (
											<Tr key={order.id}>
												<Td>{order.status}</Td>
												<Td>{order.products}</Td>
												<Td>{order.phone}</Td>
												<Td>{order.address}</Td>
												<Td>{order.payment}</Td>
												<Td>{order.total}</Td>
												<Td>{order.email}</Td>
											</Tr>
										))
						}
					</Tbody>
					<Tfoot>
						<Tr>
							<Th>{t("OrdersTable2")}</Th>
							<Th>{t("OrdersTable3")}</Th>
							<Th>{t("OrdersTable4")}</Th>
							<Th>{t("OrdersTable5")}</Th>
							<Th>{t("OrdersTable6")}</Th>
							<Th>{t("OrdersTable7")}</Th>
							<Th>{t("OrdersTable8")}</Th>
						</Tr>
					</Tfoot>
				</Table>
			</TableContainer>
		</>
	);
}
