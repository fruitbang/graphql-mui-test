import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'graphql',
    cache: new InMemoryCache(),
});

export default client;
