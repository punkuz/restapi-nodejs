import {
  Controller,
  UseGuards,
  Post,
  Body,
  Request,
  Get,
  Query,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/types/role.enum';
import { RolesGuard } from 'src/guards/role.guard';
import { AuthGuard, AuthRequest } from 'src/guards/auth.guard';
import { Review } from './schema/review.schema';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewService: ReviewsService) {}

  @Post()
  @Roles(Role.User)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  createReview(@Body() review: Review, @Request() req: AuthRequest) {
    return this.reviewService.createReview(review, req);
  }

  @Get()
  @Roles(Role.User)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  getAllReviews(
    @Query() query: Record<string, any>,
    @Request() req?: AuthRequest,
  ) {
    return this.reviewService.getAllReviews(query);
  }
}
