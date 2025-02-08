import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Query } from 'mongoose';
import { Tour } from 'src/tours/schema/tour.schema';
import { User } from 'src/users/schema/user.schema';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Review extends Document {
  @Prop({
    required: true,
    trim: true,
    maxlength: 200,
    minlength: 20,
  })
  review: string;

  @Prop()
  image: string;

  @Prop({ required: true, min: 1, max: 5, default: 1 })
  rating: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Tour', required: true })
  tour: Tour;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  author: User;
}

// Generate Schema
export const ReviewSchema = SchemaFactory.createForClass(Review);

ReviewSchema.pre(/^find/, function (this: Query<Document<Tour>, Tour>, next) {
  this.populate({
    path: 'tour',
    select: { name: 1, description: 1, guides: 0 },
  }).populate({
    path: 'author',
    select: 'name',
  });
  next();
});
