import { Module } from '@nestjs/common';
import { MongoDbModule } from './mongodb/mongodb.module';

@Module({
  imports: [MongoDbModule],
})
export class ProviderModule {}
