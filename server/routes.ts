import * as express from 'express';
import * as multer from 'multer';
import * as path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'client/assets/images')
  },
  filename: function (req, file, cb) {
    cb(null, (Math.random().toString(36) + '00000000000000000').slice(2, 10) + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ dest: 'uploads/', storage: storage });

import CatCtrl from './controllers/cat';
import UserCtrl from './controllers/user';
import BlogCtrl from './controllers/blog';
import Cat from './models/cat';
import User from './models/user';

export default function setRoutes(app) {

  const router = express.Router();

  const catCtrl = new CatCtrl();
  const userCtrl = new UserCtrl();
  const blogCtrl = new BlogCtrl();

  // Cats
  router.route('/cats').get(catCtrl.getAll);
  router.route('/cats/count').get(catCtrl.count);
  router.route('/cat').post(catCtrl.insert);
  router.route('/cat/:id').get(catCtrl.get);
  router.route('/cat/:id').put(catCtrl.update);
  router.route('/cat/:id').delete(catCtrl.delete);

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  // Blogs
  router.route('/blogs').get(blogCtrl.getAll);
  router.route('/blogs/count').get(blogCtrl.count);
  router.route('/blog').post(blogCtrl.insert);
  router.route('/blog/:id').get(blogCtrl.get);
  router.route('/blog/:id').put(blogCtrl.update);
  router.route('/blog/:id/image').put(upload.single('file'), blogCtrl.uploadImage);
  router.route('/blog/:id').delete(blogCtrl.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
