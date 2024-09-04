import mongoose from 'mongoose';

const refreshSchema = new mongoose.Schema({
  token: String,
});

const Refresh = mongoose.model('Refresh-Token', refreshSchema);

export default Refresh;
