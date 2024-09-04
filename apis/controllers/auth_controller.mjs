import User from '../../domain/user.mjs';
import Refresh from '../../domain/refresh.mjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import hashPassword, {
  comparePassword,
} from '../../infrastructure/password_service.mjs';
import crypto from 'crypto';
import sendVerification from '../../infrastructure/email/send-verification.mjs';
import { validationResult } from 'express-validator';
import {
  generateRefreshToken,
  generateToken,
} from '../../infrastructure/jwt_service.mjs';
import sendPasswordResetLink from '../../infrastructure/email/send-reset-link.mjs';

dotenv.config();

export async function signup(req, res) {
  const err = validationResult(req);

  if (!err.isEmpty()) {
    const formatedError = {};
    err.array().forEach((e) => {
      formatedError[e.path] = e.msg;
    });

    return res.status(400).send({ errors: formatedError });
  }

  try {
    const { username, email, password } = req.body;
    const u = await User.findOne({ email });

    if (u) {
      return res.status(409).send({ error: `email ${email} is taken` });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      verificationToken: crypto.randomBytes(32).toString('hex'),
      tokenExpiration: Date.now() + 3600000,
    });

    await sendVerification(newUser);

    await newUser.save();
    return res.status(201).send({ message: 'verify your email' });
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: 'server error' });
  }
}
export async function login(req, res) {
  const err = validationResult(req);

  if (!err.isEmpty()) {
    const formatedError = {};
    err.array().forEach((e) => {
      formatedError[e.path] = e.msg;
    });

    return res.status(400).send({ errors: formatedError });
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send({ error: 'invald credentials' });
  }

  if (!user.isVerified) {
    return res.status(400).send({ error: 'account not verified' });
  }
  const match = await comparePassword(password, user.password);

  if (!match) {
    return res.status(400).send({ error: 'invald credentials' });
  }

  const accessToken = generateToken(user._id);
  const refreshToken = generateRefreshToken(user._id);
  const newRefresh = new Refresh({
    token: refreshToken,
  });

  await newRefresh.save();

  return res.status(201).json({ accessToken, refreshToken });
}

export async function refresh(req, res) {
  const err = validationResult(req);

  if (!err.isEmpty()) {
    const formatedError = {};
    err.array().forEach((e) => {
      formatedError[e.path] = e.msg;
    });

    return res.status(400).send({ errors: formatedError });
  }
  const token = req.body.token;
  try {
    const t = await Refresh.findOne({ token });
    if (!t) {
      return res.status(403).send();
    }
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).send();

      const accessToken = generateToken(user.name);
      res.json({ accessToken: accessToken });
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
}

export async function verifyToken(req, res) {
  try {
    const user = await User.findOne({
      verificationToken: req.params.token,
      tokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).send('Invalid or expired token');
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.tokenExpiration = undefined;
    await user.save();

    res.send(`
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  padding: 20px;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  padding: 30px;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }"email" : "ephrem.mamo@a2sv.org",
  "username": "efa",
                .header {
                  text-align: center;
                  padding-bottom: 20px;
                }
                .header h1 {
                  color: #333;
                }
                .content {
                  text-align: center;
                  color: #555;
                  line-height: 1.6;
                }
                .content p {
                  margin: 20px 0;
                }
                .footer {
                  text-align: center;
                  margin-top: 30px;
                  color: #888;
                  font-size: 12px;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Email Verification Successful!</h1>
                </div>
                <div class="content">
                  <p>Congratulations! Your email has been successfully verified.</p>
                  <p>Thank you for confirming your email address. You can now enjoy all the features and benefits of our service.</p>
                  <p>If you have any questions, feel free to contact our support team.</p>
                </div>
                <div class="footer">
                  <p>&copy; 2024 BrainzAcademy. All rights reserved.</p>
                </div>
              </div>
            </body>
          </html>
        `);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
}

export async function logout(req, res) {
  const err = validationResult(req);

  if (!err.isEmpty()) {
    const formatedError = {};
    err.array().forEach((e) => {
      formatedError[e.path] = e.msg;
    });

    return res.status(400).send({ errors: formatedError });
  }
  const token = req.body.token;

  try {
    const t = await Refresh.findOneAndDelete({ token });
    if (!t) {
      return res.status(404).send({ error: 'token not found' });
    }

    return res.status(204).send();
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function updatedeProfile(req, res) {
  const err = validationResult(req);

  if (!err.isEmpty()) {
    const formatedError = {};
    err.array().forEach((e) => {
      formatedError[e.path] = e.msg;
    });

    return res.status(400).send({ errors: formatedError });
  }

  const { username, email } = req.body;
  

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).send({ error: 'user not found' });
    }

    user.email = email;
    user.username = username;
    await user.save();

    return res.status(204).send();
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: 'Server Error' });
  }
}

export async function changePassword(req, res) {
  const err = validationResult(req);

  if (!err.isEmpty()) {
    const formatedError = {};
    err.array().forEach((e) => {
      formatedError[e.path] = e.msg;
    });

    return res.status(400).send({ errors: formatedError });
  }

  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).send({ error: 'user not found' });
    }
    const match = await comparePassword(oldPassword, user.password);

    if (!match) {
      return res.status(400).send({ error: 'old password is incorrect' });
    }
    const hashedPassword = await hashPassword(newPassword);

    user.password = hashedPassword;
    await user.save();

    return res.status(204).send();
  } catch (e) {
    res.status(500).send({ error: 'Server Error' });
  }
}

export async function forgotPassword(req, res) {
  const err = validationResult(req);

  if (!err.isEmpty()) {
    const formatedError = {};
    err.array().forEach((e) => {
      formatedError[e.path] = e.msg;
    });

    return res.status(400).send({ errors: formatedError });
  }

  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .send({ error: 'user with provided email not found' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;

    await user.save();

    await sendPasswordResetLink(user);

    res.send('Password reset email sent');
  } catch (e) {
    res.status(500).send({ error: 'Server Error' });
  }
}

export async function resetPassword(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = {};
    errors.array().forEach((error) => {
      formattedErrors[error.path] = error.msg;
    });

    return res.status(400).send({ errors: formattedErrors });
  }
  const token = req.query.token;
  const { newPassword } = req.body;

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).send('Invalid or expired token');
  }

  // Hash the new password and save it
  user.password = await hashPassword(newPassword)
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  res.send('Password has been reset');
}
