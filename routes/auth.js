import { Router } from 'express';
import { register, login, getMe} from '../controllers/auth.js';
import { checkAuth } from '../utils/checkAuth.js';
import { check } from 'express-validator';

const router = new Router();

//Register
router.post('/register', [
  check('name','Username can`t be empty').notEmpty(),
  check('email','Incorrect type of email').isEmail(),
  check('password','Password can`t be empty').notEmpty(),
], register);

//Login
router.post('/login', [
  check('email','Incorrect type of email').isEmail(),
  check('password','Password can`t be empty').notEmpty(),
],login);

//Get me
router.get('/me', getMe);

export default router;