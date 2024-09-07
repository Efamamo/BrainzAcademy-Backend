import express from 'express';
import {
  changePassword,
  forgotPassword,
  getUserById,
  login,
  logout,
  refresh,
  resetPassword,
  signup,
  updatedeProfile,
  verifyToken,
  verify,
  hadleChapa,
} from '../controllers/auth_controller.mjs';
import { check } from 'express-validator';
import authenticateToken from '../../infrastructure/middlewares/authorize.mjs';
export const authRouter = express.Router();

authRouter.get('/verify/:token', verifyToken);
authRouter.post(
  '/verify',
  check('token').notEmpty().withMessage('token is required'),
  verify
);
authRouter.post(
  '/signup',
  [
    check('username').notEmpty().withMessage('username is required'),
    check('email').notEmpty().withMessage('email is required'),
    check('email').normalizeEmail().isEmail().withMessage('email is invalid'),
    check('password')
      .isLength({ min: 5 })
      .withMessage('minimum password length is 5'),
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

authRouter.patch(
  '/update-profile',
  authenticateToken,
  [
    check('email').notEmpty().withMessage('email is required'),
    check('email').normalizeEmail().isEmail().withMessage('email is invalid'),
    check('username').notEmpty().withMessage('username is required'),
  ],
  updatedeProfile
);

authRouter.patch(
  '/change-password',
  authenticateToken,
  [
    check('oldPassword').notEmpty().withMessage('oldPassword is required'),
    check('newPassword').notEmpty().withMessage('newPassword is required'),
    check('newPassword')
      .isLength({ min: 5 })
      .withMessage('minimum password length is 5'),
  ],
  changePassword
);

authRouter.patch(
  '/forgot-password',
  [
    check('email').notEmpty().withMessage('email cant be empty'),
    check('email').normalizeEmail().isEmail().withMessage('email is invalid'),
  ],
  forgotPassword
);

authRouter.patch(
  '/reset-password',
  check('newPassword').notEmpty().withMessage('newPassword cant be empty'),
  resetPassword
);

authRouter.get('/get-user', authenticateToken, getUserById);

authRouter.get('/chapa', hadleChapa);
