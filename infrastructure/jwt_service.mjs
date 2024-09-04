import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function generateToken(username) {
  return jwt.sign({ name: username }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '20m',
  });
}

export function generateRefreshToken(username) {
  return jwt.sign({ name: username }, process.env.REFRESH_TOKEN_SECRET);
}
