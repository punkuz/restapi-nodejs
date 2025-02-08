import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Review } from './schema/review.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import SearchFilter from 'src/util/search.filter';
import { AuthRequest } from 'src/guards/auth.guard';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private readonly reviewModel: Model<Review>,
  ) {}

  async createReview(
    @Body() review: Review,
    req: AuthRequest,
  ): Promise<Review> {
    try {
      return await this.reviewModel.create({
        ...review,
        author: req.user?._id,
      });
    } catch (error) {
      throw new HttpException(
        {
          // status: HttpStatus.INTERNAL_SERVER_ERROR,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllReviews(query: Record<string, any>): Promise<Review[]> {
    const searchQuery = new SearchFilter(this.reviewModel.find(), query)
      .filter()
      .sort()
      .fields()
      .paginate();
    return searchQuery.mongooseQuery;
  }
}
