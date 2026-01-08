import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';

const app = express();
app.use(cors());
app.use(express.json());

const uri = 'mongodb+srv://wiwadrudchad_db_user:2azM9K69mYL75t4g@pepsi001.u1ry6l7.mongodb.net/myApp?retryWrites=true&w=majority&appName=pepsi001';
mongoose.connect(uri)
    .then(() => console.log("เชื่อมต่อ MongoDB สำเร็จ! ✅"))
    .catch((err) => console.error("เชื่อมต่อผิดพลาด: ❌", err));

// 1. สร้างฟังก์ชันสำหรับเชื่อมต่อแบบเช็คสถานะ
// const connectDB = async () => {
//     console.log("กำลังเชื่อมต่อ MongoDB...");
//     if (mongoose.connection.readyState >= 1) return; // ถ้าเชื่อมอยู่แล้วไม่ต้องทำอะไร
//     console.log("ยังไม่เชื่อมต่อ ต้องเชื่อมต่อใหม่...");
//     try {
//         await mongoose.connect(uri, {
//             serverSelectionTimeoutMS: 5000 // ให้รอแค่ 5 วินาทีถ้าเชื่อมไม่ได้ให้ Error เลย
//         });
//         console.log("เชื่อมต่อ MongoDB สำเร็จ! ✅");
//     } catch (err) {
//         console.error("เชื่อมต่อผิดพลาด: ❌", err);
//     }
// };

// 2. ใช้ Middleware เพื่อบังคับให้รอการเชื่อมต่อก่อนไปรัน Route (สำคัญมากสำหรับ Vercel)
// app.use(async (req, res, next) => {
//     await connectDB();
//     next();
// });

app.use('/api', authRoutes);

// app.get('/', (req, res) => res.send('API is running... 🚀'));

export default app;

// ส่วน app.listen ให้ครอบด้วยเงื่อนไข เพื่อไม่ให้รันซ้ำซ้อนบน Vercel
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
