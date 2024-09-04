import React from 'react';
import axios from 'axios';
import { Form, Input, Button, message, Card, Divider, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const ProductForm = () => {
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        try {
            const { types, ...formData } = values;
            formData.diseases = formData.diseases.split(',').map(disease => disease.trim());

            // Пример отправки данных, адаптируйте в соответствии с вашим API
            await axios.post('https://greenman.kz/api/products/add', { ...formData, types });

            message.success('Товар успешно добавлен!');
            form.resetFields();
        } catch (error) {
            message.error('Ошибка при добавлении товара');
        }
    };

    return (
        <Card title="Обновление товара" bordered={false} style={{ width: 600, margin: "20px auto" }}>
            <Form
                form={form}
                onFinish={handleSubmit}
                autoComplete="off"
            >
                <Form.Item label="Название" name="name" rules={[{ required: true, message: 'Введите название!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Описание" name="description">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item label="Способ применения для детей" name="applicationMethodChildren">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item label="Способ применения для взрослых" name="applicationMethodAdults">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item label="От каких болезней" name="diseases">
                    <Input placeholder="Введите болезни через запятую" />
                </Form.Item>
                <Form.Item label="Противопоказания" name="contraindications">
                    <Input />
                </Form.Item>
                <Form.List name="types">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(field => (
                                <Space key={field.key} align="baseline">
                                    <Form.Item
                                        {...field}
                                        name={[field.name, 'type']}
                                        fieldKey={[field.fieldKey, 'type']}
                                        rules={[{ required: true, message: 'Введите тип!' }]}
                                    >
                                        <Input placeholder="Тип" />
                                    </Form.Item>
                                    <Form.Item
                                        {...field}
                                        name={[field.name, 'price']}
                                        fieldKey={[field.fieldKey, 'price']}
                                        rules={[{ required: true, message: 'Введите цену!' }]}
                                    >
                                        <Input placeholder="Цена" type="number" />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                                </Space>
                            ))}
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Добавить тип и цену
                            </Button>
                        </>
                    )}
                </Form.List>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Обновить товар
                    </Button>
                </Form.Item>
            </Form>
            <Divider />
        </Card>
    );
};

export default ProductForm;
