import React from 'react'

const Banner = () => {
    return (
        <div className=''>
            <section className="bg-rice-white lg:grid lg:place-content-center">
                <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:px-8 lg:py-32">
                    <div className="max-w-prose text-left">
                        <h1 className="text-4xl font-bold text-rice-teal sm:text-5xl">
                            Gạo sạch, chất lượng –
                            <strong className="text-rice-teal-dark"> lựa chọn hoàn hảo </strong>
                            cho mọi gia đình Việt
                        </h1>

                        <p className="mt-4 text-base text-pretty text-rice-teal-light sm:text-lg/relaxed">
                            Chuyên cung cấp các loại gạo thơm ngon, an toàn, giá tốt. Cam kết 100% gạo sạch, không hóa chất, giao hàng tận nơi nhanh chóng. Hãy để bữa cơm gia đình bạn luôn tròn vị và an tâm với nguồn gạo chất lượng từ chúng tôi!
                        </p>

                        <div className="mt-4 flex gap-4 sm:mt-6">
                            <a
                                className="inline-block rounded-lg bg-rice-teal-dark px-6 py-3 font-semibold text-rice-teal shadow-lg transition-all duration-300 hover:bg-rice-teal-darker hover:shadow-xl hover:-translate-y-1"
                                href="/listproduct"
                            >
                                🛒 Mua ngay
                            </a>

                            <a
                                className="inline-block rounded-lg bg-rice-gray-light border-2 border-rice-gray-medium px-6 py-3 font-medium text-rice-teal shadow-sm transition-all duration-300 hover:bg-rice-gray-medium hover:text-rice-teal-dark hover:shadow-md hover:-translate-y-1"
                                href="/listproduct"
                            >
                                📋 Xem thêm sản phẩm
                            </a>
                        </div>
                    </div>
                    <div>
                        <img
                            className="w-100 h-100 sm:mt-0 drop-shadow-2xl rounded-2xl filter drop-shadow-[0_20px_40px_rgba(67,101,90,0.2)]"
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