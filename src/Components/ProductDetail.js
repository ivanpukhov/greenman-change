import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, message, List, Typography, Divider } from 'antd';
import { HeartOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const ProductDetail = () => {
    const [product, setProduct] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://greenman.kz/api/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                message.error('Ошибка при получении информации о товаре');
            }
        };

        fetchProduct();
    }, [id]);

    return (
        <div style={{ padding: '20px' }}>
            {product && (
                <Card
                    hoverable
                    style={{ width: '100%' }}
                    cover={<img alt={product.name} src={product.imageUrl || 'default_image.jpg'} />}
                    actions={[
                        <HeartOutlined key="like" />,
                        // Другие действия, если необходимо
                    ]}
                >
                    <Title level={2}>{product.name}</Title>
                    <Paragraph><b>Описание:</b> {product.description}</Paragraph>
                    <Paragraph><b>Способ применения для детей:</b> {product.applicationMethodChildren}</Paragraph>
                    <Paragraph><b>Способ применения для взрослых:</b> {product.applicationMethodAdults}</Paragraph>
                    <Paragraph><b>Болезни:</b> {product.diseases.join(', ')}</Paragraph>
                    <Paragraph><b>Противопоказания:</b> {product.contraindications}</Paragraph>
                    {product.types && (
                        <>
                            <Divider />
                            <Title level={4}>Типы и цены</Title>
                            <List
                                dataSource={product.types}
                                renderItem={type => (
                                    <List.Item key={type.id}>
                                        {type.type}: <b>{type.price}</b>
                                    </List.Item>
                                )}
                            />
                        </>
                    )}
                </Card>
            )}
        </div>
    );
};

export default ProductDetail;
