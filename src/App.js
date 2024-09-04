import React from 'react';
import ProductForm from './Components/ProductForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from "./Components/ProductList";
import ProductDetail from "./Components/ProductDetail";
import ProductsComponent from "./Components/ProductsComponent";

const App = () => {
    return (
        <div className="app">
            <Router>
                <Routes>
                    <Route path="/" element={<ProductsComponent />}/>
                    <Route path="/products/:id" element={<ProductDetail />}/>
                </Routes>
            </Router>
        </div>
    );
};

export default App;
