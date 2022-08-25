import mongoose from 'mongoose';
// db structure
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);
// if Product exist return Product else return a new mongoose.model
const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
