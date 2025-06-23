import React from 'react';
import { useInvoicePrint } from './InvoicePrint';

const SomeComponent = () => {
    const { printInvoice } = useInvoicePrint();

    const handlePrintFromAnywhere = async (orderId, token) => {
        const result = await printInvoice(orderId, token);
        if (result.success) {
            console.log('In hóa đơn thành công!');
        } else {
            alert(result.message);
        }
    };

    return (
        <button
            onClick={() => handlePrintFromAnywhere('123456', 'token_here')}
            className="bg-blue-500 text-white px-4 py-2 rounded"
        >
            In hóa đơn từ đây
        </button>
    );
};

export default SomeComponent;