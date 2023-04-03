import * as React from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Main from "./pages/Main";
const App = () => {
    return (
        <Layout>
            <Main></Main>
        </Layout>
    );
};

export default App;