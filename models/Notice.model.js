import mongoose from 'mongoose';
const { Schema } = mongoose;

const NoticeSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Notice= mongoose.model('Notice', NoticeSchema);
export default Notice;