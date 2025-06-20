const axios = require('axios');
const crypto = require('crypto');

const partnerCode = process.env.MOMO_PARTNER_CODE;
const accessKey = process.env.MOMO_ACCESS_KEY;
const secretKey = process.env.MOMO_SECRET_KEY;
const redirectUrl = process.env.MOMO_REDIRECT_URL;
const ipnUrl = process.env.MOMO_IPN_URL;

exports.createMomoPayment = async (req, res) => {
    const orderId = Date.now().toString();
    const requestId = orderId;
    const amount = req.body.amount?.toString() || '10000';
    const orderInfo = req.body.orderInfo || 'Thanh toán đơn hàng test';
    const extraData = "";

    const rawSignature =
        `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}` +
        `&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}` +
        `&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=captureWallet`;

    const signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');

    const requestBody = {
        partnerCode,
        accessKey,
        requestId,
        amount,
        orderId,
        orderInfo,
        redirectUrl,
        ipnUrl,
        extraData,
        requestType: "captureWallet",
        signature,
        lang: "vi"
    };

    try {
        const response = await axios.post(
            "https://test-payment.momo.vn/v2/gateway/api/create",
            requestBody,
            { headers: { 'Content-Type': 'application/json' } }
        );
        res.status(200).json({ EC: 0, payUrl: response.data.payUrl });
    } catch (error) {
        // Log lỗi chi tiết từ MoMo
        console.error('Lỗi tạo thanh toán:', error.response?.data || error.message || error);
        res.status(500).json({
            EC: -1,
            message: 'Lỗi khi gọi API MoMo',
            momoError: error.response?.data || error.message || error
        });
    }
};