import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

export default App;