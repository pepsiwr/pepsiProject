import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'username', required: true },
    type: { type: String, default: 'expense' },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true },
    receiverName: { type: String }, // ชื่อคนรับเงิน (จากสลิป)
    transRef: { type: String, unique: true }, // รหัสอ้างอิงธนาคาร (กันบันทึกซ้ำ)
    note: { type: String }
}, { timestamps: true }, { collection: 'transactions' }); // timestamps จะช่วยเก็บวันที่สร้าง (createdAt) และแก้ไข (updatedAt) ให้อัตโนมัติ
const transactions = mongoose.model('transactions', transactionSchema);
export default transactions;