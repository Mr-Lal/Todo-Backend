import express from 'express'
const router = express.Router();
import multer from 'multer';
import { registerUser,login ,Logout,Profile} from '../controllers/user.controller.js';
import { body } from 'express-validator';
import { verifyUser } from '../middlewares/user.middleware.js';

const storage = multer.memoryStorage();

const upload = multer({storage});

router.post('/register',upload.single('profileImage'), [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),

  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email address'),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
],registerUser)


router.post('/login',
  [ body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email address'),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')],
login
)

router.get('/logout',Logout)

router.get('/profile',verifyUser,Profile)
export default router;