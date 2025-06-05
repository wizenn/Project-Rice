import React from 'react'

const Banner = () => {
    return (
        <div className=''>
            <section className="bg-white lg:grid  lg:place-content-center">
                <div
                    className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:px-8 lg:py-32"
                >
                    <div className="max-w-prose text-left">
                        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                            Gạo sạch, chất lượng –
                            <strong className="text-indigo-600"> lựa chọn hoàn hảo </strong>
                            cho mọi gia đình Việt
                        </h1>

                        <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
                            Chuyên cung cấp các loại gạo thơm ngon, an toàn, giá tốt. Cam kết 100% gạo sạch, không hóa chất, giao hàng tận nơi nhanh chóng. Hãy để bữa cơm gia đình bạn luôn tròn vị và an tâm với nguồn gạo chất lượng từ chúng tôi!
                        </p>

                        <div className="mt-4 flex gap-4 sm:mt-6">
                            <a
                                className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
                                href="/listproduct"
                            >
                                Mua ngay
                            </a>

                            <a
                                className="inline-block rounded border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
                                href="/listproduct"
                            >
                                Xem thêm sản phẩm
                            </a>
                        </div>
                    </div>


                    <svg
                        viewBox="0 0 400 300"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-auto hidden max-w-md text-gray-900 md:block"
                    >
                        {/* Mặt trời */}
                        <circle cx="340" cy="60" r="30" fill="#FFD700" opacity="0.7" />
                        {/* Cánh đồng lúa */}
                        <ellipse cx="200" cy="250" rx="180" ry="40" fill="#F5E9C6" />
                        <ellipse cx="200" cy="260" rx="160" ry="30" fill="#E2C275" opacity="0.4" />
                        {/* Bông lúa hai bên */}
                        <g>
                            <path d="M60 220 Q100 180 160 170" stroke="#C9A14A" strokeWidth="5" fill="none" />
                            <ellipse cx="90" cy="200" rx="8" ry="4" fill="#E2C275" />
                            <ellipse cx="120" cy="185" rx="7" ry="3.5" fill="#E2C275" />
                            <ellipse cx="150" cy="175" rx="6" ry="3" fill="#E2C275" />
                        </g>
                        <g>
                            <path d="M340 220 Q300 180 240 170" stroke="#C9A14A" strokeWidth="5" fill="none" />
                            <ellipse cx="310" cy="200" rx="8" ry="4" fill="#E2C275" />
                            <ellipse cx="280" cy="185" rx="7" ry="3.5" fill="#E2C275" />
                            <ellipse cx="250" cy="175" rx="6" ry="3" fill="#E2C275" />
                        </g>
                        {/* Người cầm chén cơm */}
                        {/* Thân người */}
                        <ellipse cx="200" cy="170" rx="32" ry="45" fill="#F9D7B5" />
                        {/* Đầu */}
                        <circle cx="200" cy="120" r="22" fill="#F9E0BB" stroke="#E2C275" strokeWidth="2" />
                        {/* Tay trái */}
                        <rect x="170" y="150" width="12" height="38" rx="6" fill="#F9E0BB" transform="rotate(-20 170 150)" />
                        {/* Tay phải */}
                        <rect x="218" y="150" width="12" height="38" rx="6" fill="#F9E0BB" transform="rotate(20 218 150)" />
                        {/* Chén cơm */}
                        <ellipse cx="200" cy="170" rx="22" ry="10" fill="#FFF" stroke="#E2C275" strokeWidth="2" />
                        <ellipse cx="200" cy="167" rx="16" ry="6" fill="#FFF" opacity="0.7" />
                        {/* Mặt cười đơn giản */}
                        <path d="M192 125 Q200 135 208 125" stroke="#C9A14A" strokeWidth="2" fill="none" />
                        <circle cx="193" cy="120" r="2" fill="#C9A14A" />
                        <circle cx="207" cy="120" r="2" fill="#C9A14A" />
                    </svg>

                </div>
            </section>
        </div>
    )
}

export default Banner;
