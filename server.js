import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js'; // นำเข้า Router ที่แยกไว้

const app = express();
app.use(cors());
app.use(express.json());

const uri = 'mongodb+srv://wiwadrudchad_db_user:2azM9K69mYL75t4g@pepsi001.u1ry6l7.mongodb.net/myApp?retryWrites=true&w=majority&appName=pepsi001';
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
// ------------------------------------------------------------------------------
// 2. สร้าง Schema ให้ตรงกับ Collection 'For_Test'
// mongoose จะมองหา collection ชื่อ 'for_tests' (เติม s และเป็นตัวเล็ก)
// ถ้าชื่อไม่ตรงให้ระบุชื่อ collection ให้ชัดเจนในบรรทัดที่ 3
// const itemSchema = new mongoose.Schema({
//     name: String
// }, { collection: 'For_Test' }); // ระบุชื่อ Collection ให้ตรงกับที่คุณสร้าง

// const Item = mongoose.model('Item', itemSchema);

// // 3. สร้าง API Endpoint สำหรับดึงข้อมูลทั้งหมด
// app.get('/api/items', async (req, res) => {
//     try {
//         console.log("ได้รับคำขอดึงข้อมูลทั้งหมด");
//         const items = await Item.find(); // ดึงข้อมูลทั้งหมด
//         res.json(items);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: err.message });
//     }
// });

// import bcrypt from 'bcryptjs';
// const userSchema = new mongoose.Schema({
//     username: { type: String, required: true, unique: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true }
// }, { collection: 'Username' });
// const Username = mongoose.model('Username', userSchema);
// app.post('/api/register', async (req, res) => {
//     try {
//         const { username, email, password } = req.body;

//         // 1. เช็คว่ามี User นี้หรือยัง
//         const userExists = await Username.findOne({ email });
//         if (userExists) return res.status(400).json({ message: "อีเมลนี้ถูกใช้ไปแล้ว" });
//         const usernameExists = await Username.findOne({ username });
//         if (usernameExists) return res.status(400).json({ message: "ชื่อผู้ใช้นี้ถูกใช้ไปแล้ว" });

//         // 2. เข้ารหัส Password (Hashing)
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // 3. บันทึกลงฐานข้อมูล
//         const newUser = new Username({
//             username,
//             email,
//             password: hashedPassword
//             // password: password
//         });

//         await newUser.save();
//         res.status(201).json({ message: "สมัครสมาชิกสำเร็จ! ✅" });

//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });
// // API สำหรับ Login
// app.post('/api/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // 1. ค้นหาผู้ใช้ด้วยอีเมล
//         const user = await Username.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: "ไม่พบอีเมลนี้ในระบบ" });
//         }

//         // 2. ตรวจสอบรหัสผ่าน (เปรียบเทียบรหัสที่พิมพ์มา กับตัวที่ Hash ใน DB)
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: "รหัสผ่านไม่ถูกต้อง" });
//         }

//         // 3. ถ้าถูกต้อง (ในอนาคตเราจะสร้าง Token ที่นี่)
//         res.status(200).json({
//             message: "เข้าสู่ระบบสำเร็จ! 🎉",
//             user: {
//                 id: user._id,
//                 username: user.username,
//                 email: user.email
//             }
//         });

//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// app.listen(3000, () => console.log('Server running on port 3000'));