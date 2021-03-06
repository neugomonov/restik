import {ApolloServer} from 'apollo-server';
import {schema} from './schema';
import {createContext} from './context';

new ApolloServer({schema, context: createContext, tracing: true}).listen(
	{port: 4000},
	() => {
		console.log(
			'đ Server ready at: http://localhost:4000\nâ­ď¸ See sample queries: http://pris.ly/e/ts/graphql-apollo-server#using-the-graphql-api'
		);
	}
);

