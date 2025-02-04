import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Tour extends Document {
  @Prop({
    required: true,
    trim: true,
    unique: true,
    maxlength: 40,
    minlength: 10,
  })
  name: string;

  @Prop()
  image: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  price: number;

  @Prop()
  duration: number;

  @Prop()
  maxGroupSize: number;

  @Prop({ required: true, enum: ['easy', 'medium', 'difficult'] })
  difficulty: string;

  @Prop()
  ratingsAverage: number;

  @Prop()
  ratingsQuantity: number;

  @Prop({ trim: true })
  summary: string;

  @Prop({ trim: true })
  description: string;

  @Prop({ required: true })
  imageCover: string;

  @Prop([String])
  images: string[];

  @Prop([Date])
  startDates: Date[];

  // Virtual field (not stored in DB)
  get durationWeeks(): number {
    return this.duration ? this.duration / 7 : 0;
  }
}

// Generate Schema
export const TourSchema = SchemaFactory.createForClass(Tour);
