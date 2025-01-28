import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'receptionist', 'staff'], default: 'staff' },
});

const User = mongoose.model('User', UserSchema);
export default User;