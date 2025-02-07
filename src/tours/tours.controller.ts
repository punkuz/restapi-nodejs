import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ToursService } from './tours.service';
import { Tour } from './schema/tour.schema';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/types/role.enum';

@Controller('tours')
export class ToursController {
  constructor(private readonly tourService: ToursService) {}

  @Post()
  createTour(@Body() tour: Tour) {
    return this.tourService.createTour(tour);
  }

  @Get()
  @Roles(Role.User, Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
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
