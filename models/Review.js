import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    ratings: [{
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        min:1,
        max:5,
      },
    }],
    nameOfPiece: {
      type: String,
      required: true,
    },
    group: {
      type: String,
      required: true,
    },
    likes: [String],
    tags: [String],
    text: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: 'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg',
    },
    grade: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    comments: [{
      name: {
        type: String,
        required: true,
      },
      createDate: {
        type: {},
        required: true,
      },
      textComment: {
        type: String,
        required: true,
        minlength: 1,
      },
    }],    
    createDate: {
      type: {},
      required: true,
    },
  },
)

export default mongoose.model('Review', ReviewSchema);