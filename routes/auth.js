import express from 'express';
// import bcrypt from 'bcryptjs';
import Username from '../models/User.js'; // ดึง Model มาใช้
import Transaction from '../models/Transaction.js';

const router = express.Router();
// เพิ่มไว้เหนือ router.post('/register', ...)
router.get('/test', (req, res) => res.send("Router is working!"));
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // 1. เช็คว่ามี User นี้หรือยัง
        const userExists = await Username.findOne({ email });
        if (userExists) return res.status(400).json({ message: "อีเมลนี้ถูกใช้ไปแล้ว" });
        const usernameExists = await Username.findOne({ username });
        if (usernameExists) return res.status(400).json({ message: "ชื่อผู้ใช้นี้ถูกใช้ไปแล้ว" });

        // 2. เข้ารหัส Password (Hashing)
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);

        // 3. บันทึกลงฐานข้อมูล
        const newUser = new Username({
            username,
            email,
            // password: hashedPassword
            password: password
        });

        await newUser.save();
        res.status(201).json({ message: "สมัครสมาชิกสำเร็จ! ✅" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// API สำหรับ Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // 1. ค้นหาผู้ใช้ด้วยอีเมล
        const user = await Username.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "ไม่พบอีเมลนี้ในระบบ" });
        }

        // 2. ตรวจสอบรหัสผ่าน (เปรียบเทียบรหัสที่พิมพ์มา กับตัวที่ Hash ใน DB)
        if (user.password !== password) {
            return res.status(400).json({ message: "รหัสผ่านไม่ถูกต้อง" });
        }

        // 3. ถ้าถูกต้อง (ในอนาคตเราจะสร้าง Token ที่นี่)
        res.status(200).json({
            message: "เข้าสู่ระบบสำเร็จ! 🎉",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// API สำหรับเพิ่มรายการรายรับ-รายจ่าย
router.post('/add-transaction', async (req, res) => {
    try {
        const { userId, type, amount, category, note, slipData } = req.body;

        const newTransaction = new Transaction({
            userId,      // ID ของคนที่ Login อยู่
            type,        // 'income' หรือ 'expense'
            amount,
            category,
            note,
            slipData
        });

        await newTransaction.save();
        res.status(201).json({ message: "บันทึกข้อมูลสำเร็จ! ✅" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// API สำหรับดึงรายการรายรับ-รายจ่าย ของผู้ใช้คนที่ล็อกอิน
router.get('/my-transactions/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        // ค้นหารายการทั้งหมดที่มี userId ตรงกับคนที่ส่งมา
        // .sort({ date: -1 }) คือให้เรียงจากใหม่ไปเก่า
        const transactions = await Transaction.find({ userId }).sort({ date: -1 });

        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;