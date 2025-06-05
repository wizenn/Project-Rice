import React from 'react'
import Image from 'next/image'
import st25 from '../../public/assets/st25.jpg'
const Product = () => {
    return (
        <div>
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Danh sách các sản phẩm</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="group relative">
                            <Image
                                src="/assets/st25.jpg"
                                alt="Related product"
                                width={300}
                                height={300}
                                className="aspect-square w-full rounded-md object-cover group-hover:opacity-80 transition"
                            />
                            <div className="mt-4 flex justify-between items-center">
                                <div>
                                    <h3 className="text-sm text-gray-800 font-medium"><a href="/product">ST 25</a></h3>
                                    <p className="text-sm text-gray-500">Mô tả</p>
                                    <span className="text-sm text-gray-500">Gạo ST25 là một loại gạo đặc sản của Việt Nam, được biết đến với chất lượng cao và hương vị thơm ngon...</span>
                                </div>
                                <p className="text-sm font-semibold text-gray-900">Giá: 300.000đ</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Product;

