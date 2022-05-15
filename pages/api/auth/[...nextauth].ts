import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { FirebaseAdapter } from "../../../vendor_mods/@next-auth/firebase-adapter/dist/index.js";
import { initializeApp, getApp, getApps } from "firebase/app";
import {
	getFirestore,
	collection,
	query,
	getDocs,
	where,
	limit,
	doc,
	getDoc,
	addDoc,
	updateDoc,
	deleteDoc,
	runTransaction,
} from "firebase/firestore";
const firebaseConfig = {
	apiKey: "AIzaSyDYG1n4icPQf1yTldmmtYcsztk5P85mLy8",
	authDomain: "restik-9f98e.firebaseapp.com",
	databaseURL: "https://restik-9f98e.firebaseio.com",
	projectId: "restik-9f98e",
	storageBucket: "restik-9f98e.appspot.com",
	messagingSenderId: "815960515831",
	appId: "1:815960515831:web:515d7c5c323e37c5421ff2",
};
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
export default NextAuth({
	adapter: FirebaseAdapter({
		db,
		collection,
		query,
		getDocs,
		where,
		limit,
		doc,
		getDoc,
		addDoc,
		updateDoc,
		deleteDoc,
		runTransaction,
	}),
	// Configure one or more authentication providers
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),

		// ...add more providers here
	],
	// database: process.env.DATABASE_URL!,
});
// export { db };
