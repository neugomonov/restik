import { ApolloServer } from "apollo-server";
import { schema } from "./schema";
import { createContext } from "./context";

new ApolloServer({ schema, context: createContext, tracing: true }).listen(
	{ port: 4000 },
	() => {
		console.log(
			"🚀 Server ready at: http://localhost:4000\n⭐️ See sample queries: https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql"
		);
	}
);
