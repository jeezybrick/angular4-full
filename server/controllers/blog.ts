import Blog from '../models/blog';
import BaseCtrl from './base';

export default class BlogCtrl extends BaseCtrl {
  model = Blog;
}
