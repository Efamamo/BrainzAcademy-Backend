import express from 'express';
import {
  login,
  logout,
  refresh,
  signup,
  verifyToken,
} from '../controllers/auth_controller.mjs';
import { check } from 'express-validator';
export const authRouter = express.Router();

authRouter.get('/verify/:token', verifyToken);
authRouter.post(
  '/signup',
  [
    check('username').notEmpty().withMessage('username is required'),
    check('email').notEmpty().withMessage('email is required'),
    check('email').normalizeEmail().isEmail().withMessage('email is invalid'),
    check('password').notEmpty().withMessage('password is required'),
  ],
  signup
);
authRouter.post(
  '/login',
  [
    check('email').notEmpty().withMessage('email is required'),
    check('email').normalizeEmail().isEmail().withMessage('email is invalid'),
    check('password').notEmpty().withMessage('password is required'),
  ],
  login
);
authRouter.post(
  '/refresh',
  check('token').notEmpty().withMessage('token is required'),
  refresh
);

authRouter.delete(
  '/logout',
  check('token').notEmpty().withMessage('token is required'),
  logout
);
