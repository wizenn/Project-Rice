import React from 'react';
import axios from 'axios';
import API from '@/configs/endpoint';

export const useInvoicePrint = () => {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const generateInvoiceHTML = (orderDetail) => {
        const orderDate = new Date(orderDetail.createdAt).toLocaleDateString('vi-VN');

        const statusStyles = {
            pending: { bg: '#FEF3C7', color: '#92400E', label: 'Chờ xử lý' },
            processing: { bg: '#DBEAFE', color: '#1D4ED8', label: 'Đang xử lý' },
            shipping: { bg: '#EDE9FE', color: '#7C3AED', label: 'Đang giao' },
            delivered: { bg: '#DCFCE7', color: '#166534', label: 'Đã giao' },
            cancelled: { bg: '#FECACA', color: '#991B1B', label: 'Đã hủy' }
        };

        const statusStyle = statusStyles[orderDetail.status] ||
            { bg: '#E5E7EB', color: '#374151', label: orderDetail.status };

        const customerAddress = orderDetail.shippingAddress
            ? `${orderDetail.shippingAddress.street || ''}, ${orderDetail.shippingAddress.city || ''}, ${orderDetail.shippingAddress.country || ''}`
            : '';

        const itemsHtml = orderDetail.orderItems && orderDetail.orderItems.length > 0
            ? orderDetail.orderItems.map(item => `
                <tr>
                    <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; color: #374151; font-size: 14px;">${item.product?.name || ''}</td>
                    <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 14px;">${item.quantity}</td>
                    <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; text-align: right; color: #374151; font-size: 14px;">${formatCurrency(item.price)}</td>
                    <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 600; color: #111827; font-size: 14px;">${formatCurrency(item.price * item.quantity)}</td>
                </tr>
            `).join('')
            : `<tr><td colspan="4" style="padding: 20px; text-align: center; color: #6b7280; font-style: italic;">Không có sản phẩm</td></tr>`;

        return `
        <!DOCTYPE html>
        <html lang="vi">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Hóa đơn - ${orderDetail._id}</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { 
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                    line-height: 1.4; 
                    color: #333;
                    background: white;
                    font-size: 14px;
                }
                @page { 
                    margin: 15mm; 
                    size: A4; 
                }
                @media print {
                    body { -webkit-print-color-adjust: exact; color-adjust: exact; }
                    .no-print { display: none !important; }
                }
                
                /* CONTAINER - LOẠI BỎ HEIGHT 100VH */
                .container { 
                    max-width: 100%; 
                    padding: 0;
                    /* Bỏ height: 100vh và flex-direction */
                }
                
                /* Header - Compact */
                .header { 
                    margin-bottom: 20px; 
                    border-bottom: 2px solid #2563eb; 
                    padding-bottom: 15px; 
                }
                .header-content { 
                    display: flex; 
                    justify-content: space-between; 
                    align-items: flex-start; 
                }
                .company-info h1 { 
                    font-size: 20px; 
                    font-weight: bold; 
                    color: #111827; 
                    margin-bottom: 5px; 
                }
                .company-info p { 
                    color: #6b7280; 
                    margin-bottom: 2px; 
                    font-size: 12px;
                }
                .order-info { 
                    background: #eff6ff; 
                    padding: 10px; 
                    border-radius: 6px; 
                    border: 1px solid #dbeafe; 
                    text-align: right;
                    min-width: 180px;
                }
                .order-info .order-id { 
                    font-size: 16px; 
                    font-weight: bold; 
                    color: #1d4ed8; 
                }
                
                /* Info Grid - Compact */
                .info-grid { 
                    display: grid; 
                    grid-template-columns: 1fr 1fr; 
                    gap: 20px; 
                    margin-bottom: 20px; 
                }
                .info-card { 
                    background: #f9fafb; 
                    padding: 15px; 
                    border-radius: 6px; 
                    border: 1px solid #e5e7eb; 
                }
                .info-card h3 { 
                    font-size: 14px; 
                    font-weight: 600; 
                    color: #111827; 
                    margin-bottom: 10px; 
                    display: flex; 
                    align-items: center; 
                }
                .info-card .icon { 
                    width: 16px; 
                    height: 16px; 
                    margin-right: 6px; 
                }
                .info-row { 
                    display: flex; 
                    margin-bottom: 4px; 
                    font-size: 12px; 
                }
                .info-row .label { 
                    color: #6b7280; 
                    width: 80px; 
                    flex-shrink: 0;
                }
                .info-row .value { 
                    color: #111827; 
                    font-weight: 500; 
                }
                .status-badge { 
                    display: inline-flex; 
                    align-items: center; 
                    padding: 4px 8px; 
                    border-radius: 12px; 
                    font-size: 10px; 
                    font-weight: 500;
                    background-color: ${statusStyle.bg}; 
                    color: ${statusStyle.color};
                }
                
                /* Products Section - BỎ FLEX: 1 */
                .products-section { 
                    margin-bottom: 15px; 
                    /* Bỏ flex: 1 */
                }
                .products-section h3 { 
                    font-size: 14px; 
                    font-weight: 600; 
                    color: #111827; 
                    margin-bottom: 10px; 
                }
                .products-table { 
                    width: 100%; 
                    border-collapse: collapse; 
                    border: 1px solid #e5e7eb; 
                    border-radius: 6px; 
                    overflow: hidden; 
                }
                .products-table th { 
                    background: #f3f4f6; 
                    padding: 10px 12px; 
                    text-align: left; 
                    font-size: 11px; 
                    font-weight: 600; 
                    color: #374151; 
                    text-transform: uppercase; 
                    letter-spacing: 0.05em; 
                }
                .products-table th:nth-child(2), 
                .products-table td:nth-child(2) { text-align: center; }
                .products-table th:nth-child(3), 
                .products-table td:nth-child(3),
                .products-table th:nth-child(4), 
                .products-table td:nth-child(4) { text-align: right; }
                
                /* Total Section - GIẢM MARGIN */
                .total-section { 
                    display: flex; 
                    justify-content: flex-end; 
                    margin-bottom: 15px; 
                    /* Giảm từ 20px xuống 15px */
                }
                .total-card { 
                    background: #eff6ff; 
                    border: 1px solid #dbeafe; 
                    border-radius: 6px; 
                    padding: 15px; 
                    min-width: 250px; 
                }
                .total-row { 
                    display: flex; 
                    justify-content: space-between; 
                    margin-bottom: 5px; 
                    font-size: 12px; 
                }
                .total-row.final { 
                    border-top: 1px solid #d1d5db; 
                    padding-top: 5px; 
                    font-size: 14px; 
                    font-weight: bold; 
                }
                .total-row .label { color: #6b7280; }
                .total-row .value { color: #111827; }
                .total-row.final .value { color: #1d4ed8; }
                
                /* Footer - GIẢM MARGIN */
                .footer { 
                    border-top: 1px solid #e5e7eb; 
                    padding-top: 15px; 
                    /* Giữ nguyên padding */
                }
                .footer-grid { 
                    display: grid; 
                    grid-template-columns: 1fr auto; 
                    gap: 20px; 
                }
                .footer h4 { 
                    font-weight: 600; 
                    color: #111827; 
                    margin-bottom: 5px; 
                    font-size: 12px;
                }
                .footer p { 
                    font-size: 11px; 
                    color: #6b7280; 
                }
                .signature { 
                    text-align: right; 
                }
                .signature-line { 
                    border-top: 1px solid #6b7280; 
                    width: 120px; 
                    margin-left: auto; 
                    margin-top: 25px; 
                    /* Giảm từ 30px xuống 25px */
                }
                
                /* Print Button */
                .print-btn { 
                    text-align: center; 
                    margin-top: 10px; 
                    /* Giảm từ 15px xuống 10px */
                }
                .print-btn button { 
                    background: #2563eb; 
                    color: white; 
                    padding: 8px 16px; 
                    border: none; 
                    border-radius: 6px; 
                    cursor: pointer; 
                    font-size: 14px;
                }
                .print-btn button:hover { background: #1d4ed8; }
                
                /* Responsive adjustments */
                @media screen and (max-width: 768px) {
                    .header-content, .info-grid, .footer-grid {
                        grid-template-columns: 1fr;
                        gap: 15px;
                    }
                    .order-info, .info-card, .total-card {
                        min-width: auto;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <!-- Header -->
                <div class="header">
                    <div class="header-content">
                        <div class="company-info">
                            <h1>HÓA ĐƠN BÁN HÀNG</h1>
                            <p>Công ty TNHH Gạo Sạch Việt Nam</p>
                            <p>Địa chỉ: 123 Đường ABC, Quận 1, TP.HCM</p>
                            <p>Điện thoại: (028) 1234-5678</p>
                        </div>
                        <div class="order-info">
                            <p style="font-size: 11px; color: #6b7280; margin-bottom: 3px;">Mã đơn hàng</p>
                            <p class="order-id">#${orderDetail._id.slice(-8).toUpperCase()}</p>
                            <p style="font-size: 11px; color: #6b7280; margin-top: 5px;">Ngày: ${orderDate}</p>
                        </div>
                    </div>
                </div>

                <!-- Customer & Order Info -->
                <div class="info-grid">
                    <div class="info-card">
                        <h3>
                            <svg class="icon" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                            </svg>
                            Thông Tin Khách Hàng
                        </h3>
                        <div class="info-row">
                            <span class="label">Tên:</span>
                            <span class="value">${orderDetail.user?.name || 'N/A'}</span>
                        </div>
                        <div class="info-row">
                            <span class="label">Email:</span>
                            <span class="value">${orderDetail.user?.email || 'N/A'}</span>
                        </div>
                        <div class="info-row">
                            <span class="label">SĐT:</span>
                            <span class="value">${orderDetail.user?.phone || 'N/A'}</span>
                        </div>
                        <div class="info-row">
                            <span class="label">Địa chỉ:</span>
                            <span class="value">${customerAddress || 'N/A'}</span>
                        </div>
                    </div>

                    <div class="info-card">
                        <h3>
                            <svg class="icon" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                            </svg>
                            Thông Tin Đơn Hàng
                        </h3>
                        <div class="info-row">
                            <span class="label">Ngày đặt:</span>
                            <span class="value">${orderDate}</span>
                        </div>
                        <div class="info-row">
                            <span class="label">Thanh toán:</span>
                            <span class="value">${orderDetail.paymentMethod || 'N/A'}</span>
                        </div>
                        <div class="info-row">
                            <span class="label">Trạng thái:</span>
                            <span class="status-badge">${statusStyle.label}</span>
                        </div>
                    </div>
                </div>

                <!-- Products -->
                <div class="products-section">
                    <h3>Chi Tiết Sản Phẩm</h3>
                    <table class="products-table">
                        <thead>
                            <tr>
                                <th>Sản phẩm</th>
                                <th>SL</th>
                                <th>Đơn giá</th>
                                <th>Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itemsHtml}
                        </tbody>
                    </table>
                </div>

                <!-- Total -->
                <div class="total-section">
                    <div class="total-card">
                        <div class="total-row">
                            <span class="label">Tạm tính:</span>
                            <span class="value">${formatCurrency(orderDetail.itemsPrice || orderDetail.totalPrice)}</span>
                        </div>
                        <div class="total-row">
                            <span class="label">Phí ship:</span>
                            <span class="value">${formatCurrency(orderDetail.shippingPrice || 0)}</span>
                        </div>
                        <div class="total-row">
                            <span class="label">Thuế:</span>
                            <span class="value">${formatCurrency(orderDetail.taxPrice || 0)}</span>
                        </div>
                        <div class="total-row final">
                            <span class="label">Tổng cộng:</span>
                            <span class="value">${formatCurrency(orderDetail.totalPrice)}</span>
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div class="footer">
                    <div class="footer-grid">
                        <div>
                            <h4>Ghi chú:</h4>
                            <p>${orderDetail.notes || 'Cảm ơn quý khách đã tin tưởng sản phẩm của chúng tôi!'}</p>
                        </div>
                        <div class="signature">
                            <p style="margin-bottom: 5px;">Người lập hóa đơn</p>
                            <div class="signature-line"></div>
                            <p style="margin-top: 3px;">Chữ ký & Họ tên</p>
                        </div>
                    </div>
                </div>

                <!-- Print button -->
                <div class="print-btn no-print">
                    <button onclick="window.print()">In hóa đơn</button>
                </div>
            </div>

            <script>
                window.onload = function() {
                    setTimeout(() => {
                        window.print();
                    }, 300);
                    
                    window.onafterprint = function() {
                        window.close();
                    };
                }
            </script>
        </body>
        </html>
        `;
    };

    const printInvoice = async (orderId, token) => {
        try {
            // Lấy chi tiết đơn hàng từ API
            const res = await axios.get(`${API}/orders/getOneOrder/${orderId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.data.EC !== 0 || !res.data.order) {
                throw new Error('Không thể lấy thông tin đơn hàng');
            }

            const orderDetail = res.data.order;

            // Tạo HTML thuần (NHANH)
            const htmlContent = generateInvoiceHTML(orderDetail);

            // Mở cửa sổ mới và in hóa đơn
            const invoiceWindow = window.open('', '_blank', 'width=800,height=600');
            invoiceWindow.document.write(htmlContent);
            invoiceWindow.document.close();

            return { success: true, message: 'Hóa đơn đã được tạo thành công!' };
        } catch (error) {
            console.error('Lỗi khi in hóa đơn:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Không thể tải chi tiết đơn hàng để in hóa đơn!'
            };
        }
    };

    return { printInvoice };
};