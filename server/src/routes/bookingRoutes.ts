import { Router } from 'express';
import {
  createBooking,
  getAllBookings,
  getBookingById,
  cancelBooking,
  updateBookingStatus,
} from '../controllers/bookingController';
import { authenticate, authorizeRole } from '../middlewares/validateAuthenticated';

const router = Router();

router.post('/create',authenticate, createBooking); 
router.get('/',authenticate ,getAllBookings); 
router.get('/:id',authenticate, getBookingById); 
router.patch('/:id/decision', authenticate, updateBookingStatus);
router.delete('/:id/cancel',authenticate, cancelBooking); 

export default router;