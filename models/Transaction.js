import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'username', required: true },
    type: { type: String, enum: ['income', 'expense'], required: true },
    type: { type: String, enum: ['income', 'expense'], required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    note: { type: String },
    date: { type: Date, default: Date.now }, // เพิ่มเพื่อเก็บวันที่จากสลิป
    transRef: { type: String, unique: true, sparse: true } // เพิ่มเพื่อป้องกันการบันทึกสลิปซ้ำ
}, {
    timestamps: true,
    collection: 'transactions' // รวม options ไว้ใน object ตัวที่สองตัวเดียว
}); // timestamps จะช่วยเก็บวันที่สร้าง (createdAt) และแก้ไข (updatedAt) ให้อัตโนมัติ
const transactions = mongoose.model('transactions', transactionSchema);
export default transactions;