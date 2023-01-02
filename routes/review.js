import { Router } from 'express';
import { addReview, getAllReviews, correctReview, addRating, addComment, correctComment, deleteComment, removeReview, getFullReview, getReviewsAuthor, addLike } from '../controllers/review.js';

const router = new Router();

//Add review
router.post('/add-review', addReview);

//Correct review
router.post('/correct-review', correctReview);

//Delete review
router.post('/delete-review', removeReview )

//Get all reviews
router.get('/get-all-review', getAllReviews);

//Get reviews with filter
router.post('/get-review-author', getReviewsAuthor);

//Get full review
router.post('/get-review', getFullReview);

//Add rating
router.post('/add-rating', addRating);

//Add comment
router.post('/add-comment', addComment);

//Correct comment
router.post('/correct-comment', correctComment);

// Delete comment
router.post('/delete-comment', deleteComment);

// Add like
router.post('/add-like', addLike)


export default router;