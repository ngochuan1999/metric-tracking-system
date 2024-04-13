// import * as dotenv from 'dotenv';
// dotenv.config();
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.MONGODB_URI,
      }),
    }),
  ],
  exports: [MongooseModule],
})
export class MongoDbModule {}
