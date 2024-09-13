import React from 'react';
import ProductForm from './Components/ProductForm';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import ProductList from "./Components/ProductList";
import ProductDetail from "./Components/ProductDetail";
import ProductsComponent from "./Components/ProductsComponent";
import {Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";

const App = () => {
    return (
        <div className="app">

            <Router>

                <Routes>

                    <Route path="/" element={<ProductsComponent />}/>
                    <Route path="/add" element={<ProductForm />}/>
                    <Route path="/products/:id" element={<ProductDetail />}/>
                </Routes>
            </Router>
        </div>
    );
};

export default App;
