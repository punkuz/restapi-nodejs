import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ToursModule } from './tours/tours.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://shahpunkuz95:6Qv4huF0fBlOd5K3@cluster0.655qv.mongodb.net/natours?retryWrites=true&w=majority&appName=Cluster0',
    ),
    ToursModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
