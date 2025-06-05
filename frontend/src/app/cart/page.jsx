import Image from 'next/image'


const CartPage = () => {
    const products = [
        {
            id: 1,
            name: 'ST 25',
            size: '10',
            price: '300000',
            quantity: 1,
            description: 'Gạo ST25 là một loại gạo đặc sản của Việt Nam, được biết đến với chất lượng cao và hương vị thơm ngon...'
        },
        {
            id: 2,
            name: 'ST 25',
            size: '10',
            price: '300000',
            quantity: 1,
            description: 'Gạo ST25 là một loại gạo đặc sản của Việt Nam, được biết đến với chất lượng cao và hương vị thơm ngon...'

        },
        {
            id: 3,
            name: 'ST 25',
            size: '10',
            price: '300000',
            quantity: 1,
            description: 'Gạo ST25 là một loại gạo đặc sản của Việt Nam, được biết đến với chất lượng cao và hương vị thơm ngon...'

        },
    ]

    const subtotal = products.reduce((sum, p) => sum + Number(p.price) * p.quantity, 0)
    const shipping = 50000
    const tax = 8320
    const total = subtotal + shipping + tax

    const formatCurrency = (value) =>

        value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })

    return (
        <div className="mx-auto max-w-7xl p-8">
            <h1 className="text-2xl font-bold mb-5 mt-10 ">Giỏ hàng</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-10 gap-10">
                    {products.map((product) => (
                        <div key={product.id} className="flex shadow border border-gray-600 items-center  gap-4  pb-6">
                            <div className="w-24 h-28 relative">
                                <Image
                                    src="/assets/st25.jpg"
                                    alt={product.name}
                                    fill
                                    className="object-contain rounded"
                                />
                            </div>
                            <div className="flex-1">
                                <h2 className="font-semibold">{product.name}</h2>

                                <p className="mt-1 font-medium">{formatCurrency(Number(product.price))}</p>

                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-gray-600">{product.description}</p>
                            </div>
                            <div className='items-center'>
                                <p className="text-sm text-gray-600">
                                    {product.size ? `Số Ký: ${product.size}` : ''}
                                </p>
                            </div>
                            <div className="flex  gap-2 mb-2">
                                <select className="border rounded px-2 py-1 text-sm text-gray-600" defaultValue={product.quantity}>
                                    {[1, 2, 3, 4].map((q) => (
                                        <option key={q} value={q}>
                                            {q}
                                        </option>
                                    ))}
                                </select>
                                <button className="text-3xl mb-2 text-gray-400 hover:text-red-500">×</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-gray-50 p-6 rounded shadow">
                    <h2 className="text-lg font-semibold mb-4">Tóm tắt đơn hàng</h2>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span>Tạm tính</span>
                            <span>{formatCurrency(subtotal)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Phí vận chuyển</span>
                            <span>{formatCurrency(shipping)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Thuế</span>
                            <span>{formatCurrency(tax)}</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between font-semibold text-base">
                            <span>Tổng cộng</span>
                            <span>{formatCurrency(total)}</span>
                        </div>
                    </div>
                    <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded font-medium">
                        Thanh toán
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CartPage
