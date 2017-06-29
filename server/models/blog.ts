import * as mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title:  String,
  author: String,
  body:   String,
  comments: [{ body: String, date: { type: Date, default: Date.now } }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  image: String
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
