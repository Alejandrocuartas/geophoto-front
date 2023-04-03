import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import 'bootstrap/dist/css/bootstrap.min.css';

import App from "./App";
import { Context } from "./context";

const client = new ApolloClient({
    uri: `/graphql`,
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <Context>
            <App />
        </Context>
    </ApolloProvider>,
    document.getElementById("root")
);