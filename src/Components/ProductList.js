import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row, Col, message } from 'antd';
import { Link } from 'react-router-dom';

const ProductsList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://greenman.kz/api/products');
                setProducts(response.data);
            } catch (error) {
                message.error('Ошибка при получении списка товаров');
            }
        };

        fetchProducts();
    }, []);

    return (
        <Row gutter={16}>
            {products.map(product => (
                <Col span={6} key={product.id}>
                    <Link to={`/products/${product.id}`}>
                        <Card
                            hoverable

                        >
                            <Card.Meta title={product.name} description={`Цена: ${product.price}`} />
                        </Card>
                    </Link>
                </Col>
            ))}
        </Row>
    );
};

export default ProductsList;
