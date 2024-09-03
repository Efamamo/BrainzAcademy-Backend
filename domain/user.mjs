import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  verificationToken: { type: String },
  tokenExpiration: { type: Date },
  isVerified: Boolean,
});

const User = mongoose.model('User', UserSchema);
export default User;
