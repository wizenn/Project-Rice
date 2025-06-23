import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full border-t bg-rice-teal-dark">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-8 py-14 max-w-xs mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-full">
                    <div className="col-span-full mb-10 lg:col-span-2 lg:mb-0">
                        <a href="/" className="flex justify-center lg:justify-start">
                            <h1 className="text-rice-white text-2xl font-bold">
                                <span className="text-rice-gray-medium">KHO GẠO</span> CHƯỞNG VÂN
                            </h1>
                        </a>
                        <p className="py-7 text-sm text-rice-teal-light lg:max-w-xs text-center lg:text-left">
                            Được tin dùng tại hơn 100 quốc gia & 5 triệu khách hàng. Theo dõi chúng tôi trên mạng xã hội.
                        </p>
                        <p className="text-sm text-rice-teal-light lg:max-w-xs text-center lg:text-left">MST: 123456789.</p>
                        <p className="py-2 text-sm text-rice-teal-light lg:max-w-xs text-center lg:text-left">Địa chỉ: Tiền Giang</p>
                        <p className="py-2 text-sm text-rice-teal-light lg:max-w-xs text-center lg:text-left">SDT: 0123456789</p>
                        <div className="flex mt-4 space-x-4 justify-center lg:justify-start sm:mt-0">
                            <a href="/" className="w-9 h-9 rounded-full bg-rice-teal flex justify-center items-center hover:scale-110 transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="text-black w-4 h-4" viewBox="0 0 320 512">
                                    <path d="M279.14 288l14.22-92.66h-88.91V127.53c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S293.3 0 262.63 0c-73.22 0-121.17 44.38-121.17 124.72v70.62H89.09V288h52.37v224h100.2V288z" />
                                </svg>
                            </a>
                            <a href="/" className="w-9 h-9 rounded-full bg-rice-teal flex justify-center items-center hover:scale-110 transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="text-black w-4 h-4" viewBox="0 0 448 512">
                                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9S160.5 370.9 224.1 370.9 339 319.6 339 256 287.7 141 224.1 141zm0 189.6c-41.3 0-74.7-33.4-74.7-74.7s33.4-74.7 74.7-74.7 74.7 33.4 74.7 74.7-33.4 74.7-74.7 74.7zm146.4-194.3c0 14.9-12.1 27-27 27s-27-12.1-27-27 12.1-27 27-27 27 12.1 27 27zm76.1 27.2c-.2-54.4-4.9-102.5-55.6-153.1S382.5.3 328.1.1C273.4-.1 174.6-.1 119.9.1 65.5.3 17.4 5 0 55.6-17.4 106.3-17.4 205.1 0 259.7s4.9 102.5 55.6 153.1c50.7 50.7 98.8 55.4 153.2 55.6 54.7.2 153.5.2 208.2 0 54.4-.2 102.5-4.9 153.1-55.6 50.7-50.7 55.4-98.8 55.6-153.2.2-54.7.2-153.5 0-208.2zM398.8 388c-8.1 20.3-23.9 36.1-44.2 44.2-30.6 12.2-103.3 9.4-137.6 9.4s-107 .8-137.6-9.4c-20.3-8.1-36.1-23.9-44.2-44.2-12.2-30.6-9.4-103.3-9.4-137.6s-.8-107 9.4-137.6c8.1-20.3 23.9-36.1 44.2-44.2 30.6-12.2 103.3-9.4 137.6-9.4s107-.8 137.6 9.4c20.3 8.1 36.1 23.9 44.2 44.2 12.2 30.6 9.4 103.3 9.4 137.6s.8 107-9.4 137.6z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="lg:mx-auto text-center sm:text-left">
                        <h4 className="text-lg text-rice-gray-medium font-medium mb-7">Tổng Quan</h4>
                        <ul className="text-sm transition-all duration-500">
                            <li className="mb-6">
                                <a href="/" className="text-rice-teal-light hover:text-rice-gray-medium transition-colors">Trang chủ</a>
                            </li>
                            <li className="mb-6">
                                <a href="/" className="text-rice-teal-light hover:text-rice-gray-medium transition-colors">Giới thiệu</a>
                            </li>
                            <li className="mb-6">
                                <a href="/" className="text-rice-teal-light hover:text-rice-gray-medium transition-colors">Bảng giá</a>
                            </li>
                            <li>
                                <a href="/" className="text-rice-teal-light hover:text-rice-gray-medium transition-colors">Tính năng</a>
                            </li>
                        </ul>
                    </div>
                    <div className="lg:mx-auto text-center sm:text-left">
                        <h4 className="text-lg text-rice-gray-medium font-medium mb-7">Liên hệ</h4>
                        <ul className="text-sm transition-all duration-500">
                            <li className="mb-6">
                                <a href="/" className="text-rice-teal-light hover:text-rice-gray-medium transition-colors">Số điện thoại: 039919913</a>
                            </li>
                            <li className="mb-6">
                                <a href="/" className="text-rice-teal-light hover:text-rice-gray-medium transition-colors">Email: minhqui2003tg@gmail.com</a>
                            </li>
                            <li className="mb-6">
                                <a href="/" className="text-rice-teal-light hover:text-rice-gray-medium transition-colors">Địa chỉ: ấp Phú Thạnh, xã Phú Mỹ, huyện Tân Phước, tỉnh Tiền Giang, Việt Nam</a>
                            </li>
                        </ul>
                    </div>
                    <div className="lg:mx-auto text-center sm:text-left">
                        <div style={{ width: "130%", height: "350px", width: "450px", maxWidth: "200%", margin: "0 auto" }}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3922.535111479642!2d106.3323717759447!3d10.537234189597402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310ab8055729e5d9%3A0x55b9adac88935bfc!2zS2hvIEfhuqFvIENoxrDhu5tuZyBWw6Ju!5e0!3m2!1svi!2s!4v1750603979443!5m2!1svi!2s"
                                width="100%"
                                height="100%"
                                className="border-2 border-rice-teal rounded-lg"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Google Map"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;