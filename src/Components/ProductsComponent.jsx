import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Modal, Button, List } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import ProductModal from './ProductModal';

const ProductsComponent = () => {
    const [products, setProducts] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    useEffect(() => {
        axios.get('https://greenman.kz/api/products')
            .then(res => setProducts(res.data))
            .catch(err => console.error('Ошибка при загрузке товаров:', err));
    }, []);

    const showModal = (product) => {
        setCurrentProduct(product);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setCurrentProduct(null);
    };

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {products.map(product => (
                <Card
                    key={product.id}
                    title={product.name}
                    extra={<Button icon={<EditOutlined />} onClick={() => showModal(product)}>Редактировать</Button>}
                    style={{ width: '100%', maxWidth: 500, margin: 10 }}
                >
                    <List
                        size="small"
                        header={<div>Типы продукта</div>}
                        bordered
                        dataSource={product.types}
                        renderItem={item => <List.Item>{item.type}: {item.price} тг</List.Item>}
                    />
                </Card>
            ))}
            {currentProduct && (
                <ProductModal
                    product={currentProduct}
                    visible={isModalVisible}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
};

export default ProductsComponent;
