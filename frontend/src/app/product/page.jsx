import React from 'react';
import Image from 'next/image';
import Product from '@/components/product';

const Products = () => {
    return (
        <div>

            <div className="mx-auto max-w-7xl mt-10 px-4 py-16 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-10">

                    <div className="flex flex-col items-center gap-4 lg:w-1/2">
                        <Image
                            src="/assets/st25.jpg"
                            alt="Gạo ST25"
                            width={320}
                            height={320}
                            className="rounded-lg object-cover w-full h-80"
                        />
                        <div className="flex gap-2">
                            {[1, 2, 3].map((i) => (
                                <Image
                                    key={i}
                                    src="/assets/st25.jpg"
                                    alt={`Thumbnail ${i}`}
                                    width={128}
                                    height={128}
                                    className="rounded object-cover"
                                />
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-1/2 flex flex-col gap-4">
                        <h1 className="text-3xl font-semibold">Gạo ST25</h1>
                        <p className="text-lg font-medium text-red-500">Giá: 300.000đ</p>
                        <div>
                            <h3 className="text-base font-medium">Số Lượng</h3>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-2">
                                {[10, 25, 50, 100, 200].map((qty) => (
                                    <button key={qty} className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300">
                                        {qty}
                                    </button>
                                ))}
                                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                                    Order
                                </button>
                            </div>
                        </div>
                        <button className="bg-blue-500 text-white py-3 rounded-md mt-4 hover:bg-blue-600">
                            Add to Cart
                        </button>

                        <div>
                            <h3 className="text-lg font-semibold mt-6">Mô tả</h3>
                            <p className="text-gray-700 mt-2">
                                Gạo ST25 là một loại gạo đặc sản của Việt Nam, được biết đến với chất lượng cao và
                                hương vị thơm ngon...
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mt-6">Thông tin chi tiết</h3>
                            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                                <li>Xuất xứ: Việt Nam</li>
                                <li>Loại gạo: Gạo ST25</li>
                                <li>Trọng lượng: 1kg, 5kg, 10kg</li>
                                <li>Hạn sử dụng: 12 tháng</li>
                                <li>Bảo quản: Nơi khô ráo, tránh ánh nắng</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mt-6">Hướng dẫn sử dụng</h3>
                            <p className="text-gray-700 mt-2">
                                Gạo ST25 có thể được nấu cơm, làm bánh, hoặc sử dụng trong các món ăn khác...
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            <div>
                <Product />
            </div>
        </div>
    );
};

export default Products;
