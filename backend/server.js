require('dotenv').config();
const express = require('express');
const session = require('express-session')
const cors = require('cors');
const Connection = require('./src/config/db');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();
const port = process.env.PORT;


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Passport config
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, (accessToken, refreshToken, profile, done) => {
    // Ở đây bạn có thể lưu user vào DB nếu muốn
    return done(null, profile);
}));


// Route bắt đầu login với Google
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback route Google trả về
app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login?error=google' }),
    (req, res) => {
        // Đăng nhập thành công, chuyển hướng về FE, có thể truyền thông tin user hoặc JWT
        const user = req.user;
        // Ví dụ: chỉ lấy tên và email, truyền về FE qua query (hoặc tạo JWT gửi kèm)
        res.redirect(`http://localhost:3000/oauth-callback?name=${encodeURIComponent(user.displayName)}&email=${encodeURIComponent(user.emails[0].value)}`);
    }
);

// Route test lấy user hiện tại (nếu muốn)
app.get('/api/me', (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.status(401).json({ error: "Not logged in" });
    }
});
const userRoutes = require('./src/routes/userRoutes');
const riceRoutes = require('./src/routes/riceRoutes');
const reviewRoutes = require('./src/routes/reviewRoutes');
const orderRouter = require('./src/routes/orderRouters');
const dashboardRoutes = require('./src/routes/dashboardRoutes');
const paymentRoutes = require('./src/routes/payment');

Connection(); // Kết nối MongoDB

app.use('/api/users', userRoutes);
app.use('/api/products', riceRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/orders', orderRouter);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});