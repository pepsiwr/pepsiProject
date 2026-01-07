import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { collection: 'Username' });

const Username = mongoose.model('Username', userSchema);
export default Username; // ส่งออกเป็นค่าเริ่มต้น