import React from 'react';
import { Modal, Form, Input, Button, Space, InputNumber } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

const ProductModal = ({ product, visible, onCancel }) => {
    const [form] = Form.useForm();

    React.useEffect(() => {
        // Здесь предполагается, что продукт имеет свойство diseases как массив строк
        form.setFieldsValue({
            ...product,
            diseases: product.diseases.join(', '),
            types: product.types || []
        });
    }, [product, form]);

    const handleSubmit = async (values) => {
        // Подготовка данных перед отправкой
        const updatedProduct = {
            ...values,
            diseases: values.diseases.split(',').map(disease => disease.trim()),
            videoUrl: product.videoUrl  // сохраняем старый URL, если не обновляется
        };

        try {
            const response = await axios.put(`https://greenman.kz/api/products/${product.id}`, updatedProduct);
            console.log('Продукт успешно обновлен:', response.data);
            onCancel(); // Закрыть модальное окно после успешного обновления
        } catch (error) {
            console.error('Ошибка при обновлении продукта:', error);
        }
    };

    return (
        <Modal
            title="Обновление товара"
            visible={visible}
            onCancel={onCancel}
            footer={null}
            centered
        >
            <Form
                form={form}
                onFinish={handleSubmit}
                layout="vertical"
                autoComplete="off"
            >
                <Form.Item
                    label="Название"
                    name="name"
                    rules={[{ required: true, message: 'Введите название!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Описание"
                    name="description"
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="Способ применения для детей"
                    name="applicationMethodChildren"
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="Способ применения для взрослых"
                    name="applicationMethodAdults"
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="От каких болезней"
                    name="diseases"
                >
                    <Input placeholder="Введите болезни через запятую" />
                </Form.Item>
                <Form.Item
                    label="Противопоказания"
                    name="contraindications"
                    rules={[{ required: true, message: 'Введите противопоказания!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.List
                    name="types"
                    initialValue={[]}
                >
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(field => (
                                <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
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
                                        <InputNumber placeholder="Цена" min={0} />
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
        </Modal>
    );
};

export default ProductModal;
