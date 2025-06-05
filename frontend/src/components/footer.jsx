import React from 'react'


const Footer = () => {
    return (

        <footer class="w-full items-center justify-center">
            <div class="mx-auto max-w-7xl px-6 lg:px-8">

                <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-8 py-14 max-w-xs mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-full">

                    <div class="col-span-full mb-10 lg:col-span-2 lg:mb-0">
                        <a href="https://pagedone.io/" class="flex justify-center lg:justify-start">
                            <h1 className='text-gray-500 text-2xl'>Rice</h1>
                        </a>

                        <p class="py-8 text-sm text-gray-500 lg:max-w-xs text-center lg:text-left">
                            Được tin dùng tại hơn 100 quốc gia & 5 triệu khách hàng. Theo dõi chúng tôi trên mạng xã hội.
                        </p>


                        <div class="flex mt-4 space-x-4 justify-center lg:justify-start sm:mt-0 ">


                            <a href="/" class="w-9 h-9 rounded-full bg-indigo-600 flex justify-center items-center hover:bg-indigo-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="text-white w-4 h-4" viewBox="0 0 16 16">
                                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.008-.422A6.68 6.68 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.084.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.381A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045 9.344 9.344 0 0 0 5.026 1.465" />
                                </svg>
                            </a>

                            <a href="/" class="w-9 h-9 rounded-full bg-indigo-600 flex justify-center items-center hover:bg-indigo-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="text-white w-4 h-4" viewBox="0 0 320 512">
                                    <path d="M279.14 288l14.22-92.66h-88.91V127.53c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S293.3 0 262.63 0c-73.22 0-121.17 44.38-121.17 124.72v70.62H89.09V288h52.37v224h100.2V288z" />
                                </svg>
                            </a>


                            <a href="/" class="w-9 h-9 rounded-full bg-indigo-600 flex justify-center items-center hover:bg-indigo-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="text-white w-4 h-4" viewBox="0 0 448 512">
                                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9S160.5 370.9 224.1 370.9 339 319.6 339 256 287.7 141 224.1 141zm0 189.6c-41.3 0-74.7-33.4-74.7-74.7s33.4-74.7 74.7-74.7 74.7 33.4 74.7 74.7-33.4 74.7-74.7 74.7zm146.4-194.3c0 14.9-12.1 27-27 27s-27-12.1-27-27 12.1-27 27-27 27 12.1 27 27zm76.1 27.2c-.2-54.4-4.9-102.5-55.6-153.1S382.5.3 328.1.1C273.4-.1 174.6-.1 119.9.1 65.5.3 17.4 5 0 55.6-17.4 106.3-17.4 205.1 0 259.7s4.9 102.5 55.6 153.1c50.7 50.7 98.8 55.4 153.2 55.6 54.7.2 153.5.2 208.2 0 54.4-.2 102.5-4.9 153.1-55.6 50.7-50.7 55.4-98.8 55.6-153.2.2-54.7.2-153.5 0-208.2zM398.8 388c-8.1 20.3-23.9 36.1-44.2 44.2-30.6 12.2-103.3 9.4-137.6 9.4s-107 .8-137.6-9.4c-20.3-8.1-36.1-23.9-44.2-44.2-12.2-30.6-9.4-103.3-9.4-137.6s-.8-107 9.4-137.6c8.1-20.3 23.9-36.1 44.2-44.2 30.6-12.2 103.3-9.4 137.6-9.4s107-.8 137.6 9.4c20.3 8.1 36.1 23.9 44.2 44.2 12.2 30.6 9.4 103.3 9.4 137.6s.8 107-9.4 137.6z" />
                                </svg>
                            </a>

                            <a href="/" class="w-9 h-9 rounded-full bg-indigo-600 flex justify-center items-center hover:bg-indigo-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="text-white w-4 h-4" viewBox="0 0 448 512">
                                    <path d="M100.28 448H7.4V148.9h92.88zm-46.44-338C24.4 110 0 85.6 0 56.7 0 25.5 25.5 0 56.6 0c31.1 0 56.6 25.5 56.6 56.6 0 29-25.4 53.4-56.6 53.4zM447.9 448h-92.4V302.4c0-34.7-.7-79.3-48.3-79.3-48.3 0-55.7 37.7-55.7 76.7V448H159.1V148.9h88.7v40.8h1.3c12.4-23.5 42.6-48.3 87.8-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                                </svg>
                            </a>
                        </div>
                    </div>


                    <div class="lg:mx-auto text-center sm:text-left">
                        <h4 class="text-lg text-gray-900 font-medium mb-7">Pagedone</h4>
                        <ul class="text-sm transition-all duration-500">
                            <li class="mb-6"><a href="/" class="text-gray-600 hover:text-gray-900">Trang chủ</a></li>
                            <li class="mb-6"><a href="/" class="text-gray-600 hover:text-gray-900">Giới thiệu</a></li>
                            <li class="mb-6"><a href="/" class="text-gray-600 hover:text-gray-900">Bảng giá</a></li>
                            <li><a href="/" class="text-gray-600 hover:text-gray-900">Tính năng</a></li>
                        </ul>
                    </div>


                    <div class="lg:mx-auto text-center sm:text-left">
                        <h4 class="text-lg text-gray-900 font-medium mb-7">Sản phẩm</h4>
                        <ul class="text-sm transition-all duration-500">
                            <li class="mb-6"><a href="/" class="text-gray-600 hover:text-gray-900">Figma UI System</a></li>
                            <li class="mb-6"><a href="/" class="text-gray-600 hover:text-gray-900">Biểu tượng</a></li>
                            <li class="mb-6"><a href="/" class="text-gray-600 hover:text-gray-900">Khối responsive</a></li>
                            <li><a href="/" class="text-gray-600 hover:text-gray-900">Thư viện component</a></li>
                        </ul>
                    </div>

                    <div class="lg:mx-auto text-center sm:text-left">
                        <h4 class="text-lg text-gray-900 font-medium mb-7">Tài nguyên</h4>
                        <ul class="text-sm transition-all duration-500">
                            <li class="mb-6"><a href="/" class="text-gray-600 hover:text-gray-900">Câu hỏi thường gặp</a></li>
                        </ul>
                    </div>

                </div>
            </div>
        </footer>
    )
}

export default Footer
