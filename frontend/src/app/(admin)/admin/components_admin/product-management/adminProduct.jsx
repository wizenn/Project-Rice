'use client';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import API from '@/configs/endpoint';
import Header from './header';
import SearchFilter from './searchFilter';
import ProductGrid from './productGrid';
import ProductModal from './productModal';
export default function ProductManagement() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const yourToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        images: [],
        origin: 'Việt Nam',
        type: '',
        size: '',
        expiry: '12 tháng',
        storage: 'Nơi khô ráo, tránh ánh nắng',
        usage: 'Nấu cơm, làm bánh, hoặc sử dụng trong các món ăn khác...',
    });

    const riceTypes = [
        'Gạo tẻ', 'Gạo nàng hương', 'Gạo thơm', 'Gạo nàng thơm', 'Gạo jasmine',
        'Gạo ST25', 'Gạo tám xoan', 'Gạo nàng hoa', 'Gạo thơm Đài Loan',
    ];

    const riceSizes = ['1kg', '2kg', '5kg', '10kg', '20kg', '25kg', '50kg'];

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${API}/products/getAllRice`);
            const data = await response.json();
            setProducts(data.rice || []);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('name', formData.name);
        form.append('price', formData.price);
        form.append('description', formData.description);
        form.append('origin', formData.origin);
        form.append('type', formData.type);
        form.append('size', formData.size);
        form.append('expiry', formData.expiry);
        form.append('storage', formData.storage);
        form.append('usage', formData.usage);
        for (const img of formData.images) {
            if (typeof img === 'string') {
                form.append('oldImages', img);
            } else {
                form.append('images', img);
            }
        }

        const url = editingProduct
            ? `${API}/products/updateRice/${editingProduct._id}`
            : `${API}/products/createRice`;
        const method = editingProduct ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method,
            body: form,
            headers: { Authorization: `Bearer ${yourToken}` },
        });

        if (response.ok) {
            await fetchProducts();
            resetForm();
            setShowModal(false);
        } else {
            console.error('Failed to save product');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            try {
                const response = await fetch(`${API}/products/deleteRice/${id}`, {
                    method: 'DELETE',
                    headers: { Authorization: `Bearer ${yourToken}` },
                });
                if (response.ok) {
                    await fetchProducts();
                } else {
                    console.error('Failed to delete product');
                }
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price.toString(),
            images: product.images || [],
            origin: product.origin,
            type: product.type,
            size: product.size,
            expiry: product.expiry,
            storage: product.storage,
            usage: product.usage,
        });
        setShowModal(true);
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            price: '',
            images: [],
            origin: 'Việt Nam',
            type: '',
            size: '',
            expiry: '12 tháng',
            storage: 'Nơi khô ráo, tránh ánh nắng',
            usage: 'Nấu cơm, làm bánh, hoặc sử dụng trong các món ăn khác...',
        });
        setEditingProduct(null);
    };

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files || []);
        setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
    };

    const removeImage = (index) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'all' || product.type === filterType;
        return matchesSearch && matchesType;
    });

    return (
        <>
            <Head>
                <title>Quản lý sản phẩm gạo</title>
                <meta name="description" content="Quản lý sản phẩm gạo - Thêm, sửa, xóa" />
            </Head>
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-10xl mx-auto">
                    <Header onAddProduct={() => { resetForm(); setShowModal(true); }} />
                    <SearchFilter
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        filterType={filterType}
                        setFilterType={setFilterType}
                        riceTypes={riceTypes}
                    />
                    <ProductGrid
                        products={filteredProducts}
                        loading={loading}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        formatPrice={formatPrice}
                    />
                    <ProductModal
                        showModal={showModal}
                        setShowModal={setShowModal}
                        editingProduct={editingProduct}
                        formData={formData}
                        handleSubmit={handleSubmit}
                        handleInputChange={handleInputChange}
                        handleImageUpload={handleImageUpload}
                        removeImage={removeImage}
                        riceTypes={riceTypes}
                        riceSizes={riceSizes}
                    />
                </div>
            </div>
        </>
    );
}