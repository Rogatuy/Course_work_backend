import Review from "../models/Review.js";

export const addReview = async (req, res) => {
  try {
    const {title, name, nameOfPiece, group, tags, text, image, grade} = req.body;
    const createDate = new Date();
    const correctImage = image !== '' ? image : undefined;
    const review = new Review({
      title,
      name,
      nameOfPiece,
      ratings: [],
      group,
      likes: [],
      tags,
      text,
      image: correctImage,
      grade,
      comments: [],
      createDate: createDate
    })

    await review.save()

    const myReviews = await Review.find({name});

    res.json({
      myReviews,
      message: 'Review added',
    })
  } catch(error) {
    res.json({message: 'Error review added'})
  }
}

export const correctReview = async (req, res) => {
  try {
    const { name, title, nameOfPiece, tags, text, image, grade, group, _id} = req.body;
    const review = await Review.findOne({_id});
    if (!review) return res.json({message: 'There aren`t this review in system'});

    review.title = title;
    review.nameOfPiece = nameOfPiece;
    review.tags = tags;
    review.text = text;
    review.image = image;
    review.grade = grade;   
    review.group = group; 

    await review.save()

    const myReviews = await Review.find({name});

    res.json({
      myReviews,
      message: 'Review corrected',
    });

  } catch(error) {
    res.json({message: 'Something wrong with review correction'})
  }
}

export const getFullReview = async (req, res) => {
  try {
    const {_id} = req.body;
    const review = await Review.findOne({_id});
    if (!review) return res.json({message: 'There aren`t this review in system'});

    res.json({
      review,
      message: 'Getting review is correct',
    });

  } catch(error) {
    res.json({message: 'Something wrong with getting review'})
  }
}

export const removeReview = async (req,res) => {
  try {
    const {_id, name} = req.body;
    const review = await Review.findOneAndDelete({_id});
    if (!review) return res.json({message: 'There aren`t this review in system'});
    
    const myReviews = await Review.find({name});

    res.json({
      myReviews,
      message: 'Review is delete'
    })   

  } catch(error) {
    res.json({message: 'Something wrong with delete review'})
  }
}

export const getAllReviews = async (req, res) => {
  try {
    const allReviews = await Review.find();
    res.json({allReviews});
  } catch(error) {
    res.json({message: 'Something wrong with getting reviews'})
  }
}

export const getReviewsAuthor = async (req, res) => {
  try {
    const {name} = req.body;
    const myReviews = await Review.find({name});
     if (!myReviews) return res.json({message: 'There aren`t reviews with this parameter'});

    res.json({
      myReviews,
      message: `Getting ${name} reviews`,
    });

  } catch(error) {
    res.json({message: 'Something wrong with getting review'})
  }
}

export const addRating = async (req, res) => {
  try {
    const {name, rating, _id} = req.body;
    const review = await Review.findOne({_id});
    if(!review) {res.json({message: 'This review isn`t in data'})}

    const ratingName = await review.ratings.find((element) => element.name === name);
    
    if (!ratingName) {
      review.ratings.push({
        name: name,
        rating: rating
      })
      } else {
        ratingName.rating = rating;
      }

    await review.save()
         
    res.json({
      review,
      message: 'Rating added',
    });

  } catch(error) {
    res.json({message: 'Something wrong with rating adding'})
  }
}

export const addComment = async (req, res) => {
  try {
    const {name, textComment, _id} = req.body;
    const review = await Review.findOne({_id});
  
    if(!review) {res.json({message: 'This review isn`t in data'})}

    const date = new Date();
        
    review.comments.push({
        name: name,
        textComment: textComment,
        createDate: date,
    })
    
    review.comments.sort((element) => element.createDate);

    await review.save()
         
    res.json({
      review,
      message: 'Comment added',
    });

  } catch(error) {
    res.json({message: 'Something wrong with comment adding'})
  }
}

export const correctComment = async (req, res) => {
  try {
    const {textComment, userId, _id} = req.body;
    const review = await Review.findOne({_id:userId});  
    if(!review) {res.json({message: 'This review isn`t in data'})}

    const comment = review.comments.find((element) => String(`${element._id}`) === _id);
    comment.textComment = textComment
    
    review.comments.sort((element) => element.createDate);
    
    await review.save()
         
    res.json({
      review,
      message: 'Comment corrected',
    });

  } catch(error) {
    res.json({message: 'Something wrong with comment correction'})
  }
}

export const deleteComment = async (req, res) => {
  try {
    const {userId, _id} = req.body;
    const review = await Review.findOne({_id:userId});
     if(!review) {res.json({message: 'This review isn`t in data'})}
       
    const comments = review.comments.filter((element) => String(`${element._id}`) !== _id);
    review.comments = comments;

    review.comments.sort((element) => element.createDate);
    
    await review.save()
         
    res.json({
      review,
      message: 'Comment deleted',
    });

  } catch(error) {
    res.json({message: 'Something wrong with comment correction'})
  }
}

export const addLike = async (req, res) => {
  
  try {
    const {_id, nameLike, isLike} = req.body;
    const review = await Review.findOne({_id});
    
    if (!review) {
      return res.json({
        message: 'This review isn`t in data'
      })    
    }

    if(!isLike) {
      if (review.likes.includes(nameLike)) {
        const index = review.likes.indexOf(nameLike, 0);
        review.likes.splice(index, 1);
      }
    } else {
      if (!review.likes.includes(nameLike)) {
        review.likes.push(nameLike);
      }
    }
    
    await review.save()

    res.json({
      review,
    })

  } catch(error) {
    res.json({message: 'Access error'})
  }
}
