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
                    <div>
                        <img
                            className=" w-100 h-100  sm:mt-0"
                            src="/assets/rice.png"
                            alt="Gạo sạch, chất lượng – lựa chọn hoàn hảo cho mọi gia đình Việt"
                        />
                    </div>



                </div>
            </section>
        </div>
    )
}

export default Banner;
