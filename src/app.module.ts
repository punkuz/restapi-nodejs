import { Module } from '@nestjs/common';
import { ToursModule } from './tours/tours.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://shahpunkuz95:${process.env.DB_PASSWORD}@cluster0.655qv.mongodb.net/natours?retryWrites=true&w=majority&appName=Cluster0`,
    ),
    ToursModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
