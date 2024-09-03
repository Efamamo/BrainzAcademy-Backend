import bcrypt from 'bcrypt';
async function hashPassword(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (e) {
    throw e;
  }
}

export async function comparePassword(enteredPassword, actualPassword) {
  try {
    const match = await bcrypt.compare(enteredPassword, actualPassword);
    return match;
  } catch (error) {
    console.error('Error comparing passwords:', error);
    throw error;
  }
}

export default hashPassword;
