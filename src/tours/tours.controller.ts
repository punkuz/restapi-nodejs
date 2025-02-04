import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ToursService } from './tours.service';
// import { CreateTourDto } from './dto/create-tour.dto';
import { Tour } from './schema/tour.schema';

@Controller('api/v1/tours')
export class ToursController {
  constructor(private readonly tourService: ToursService) {}

  @Post()
  createTour(@Body() tour: Tour) {
    return this.tourService.createTour(tour);
  }

  @Get()
  getAllTours(@Query() query: Record<string, any>) {
    return this.tourService.getAllTours(query);
  }

  @Get(':id')
  getTour(@Param('id') id: string) {
    return this.tourService.getTour(id);
  }

  @Patch(':id')
  updateTour(@Param('id') id: string, @Body() tour: Tour) {
    return this.tourService.updateTour(id, tour);
  }

  @Delete(':id')
  deleteTour(@Param('id') id: string) {
    return this.tourService.deleteTour(id);
  }
}
