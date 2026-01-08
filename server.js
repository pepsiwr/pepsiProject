import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js'; // นำเข้า Router ที่แยกไว้

const app = express();
app.use(cors());
app.use(express.json());

const uri = 'mongodb+srv://wiwadrudchad_db_user:jr7UqVI2YVvkpG2w@pepsi001.u1ry6l7.mongodb.net/myApp?retryWrites=true&w=majority&appName=pepsi001';;

mongoose.connect(uri)
    .then(() => console.log("เชื่อมต่อ MongoDB สำเร็จ! ✅"))
    .catch((err) => console.error("เชื่อมต่อผิดพลาด: ❌", err));

// ใช้งาน Routes
// ทุกอย่างใน authRoutes จะขึ้นต้นด้วย /api
app.use('/api', authRoutes);
// app.listen(3000, () => console.log('Server running on port 3000'));
export default app;

// ส่วน app.listen ให้ครอบด้วยเงื่อนไข เพื่อไม่ให้รันซ้ำซ้อนบน Vercel
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}