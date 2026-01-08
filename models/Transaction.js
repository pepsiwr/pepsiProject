import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    // ส่วนสำคัญ: เก็บ ID ของ User ที่เป็นเจ้าของรายการนี้
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'username', // ชื่อ Model ต้องตรงกับที่คุณตั้งไว้ใน User.js
        required: true
    },
    type: {
        type: String,
        enum: ['income', 'expense'], // บังคับว่าต้องเป็น 'รายรับ' หรือ 'รายจ่าย' เท่านั้น
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    note: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now // ถ้าไม่ระบุ จะเอาวันที่ปัจจุบัน
    },
    slipData: {
        type: Object // สำหรับเก็บข้อมูลดิบที่ได้จาก SlipOk (ถ้ามี)
    }
}, { timestamps: true }, { collection: 'transactions' }); // timestamps จะช่วยเก็บวันที่สร้าง (createdAt) และแก้ไข (updatedAt) ให้อัตโนมัติ
const transactions = mongoose.model('transactions', transactionSchema);
export default transactions;