import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './modules/core.module';
import { ProviderModule } from './provider/provider.module';
import { ConfigsModule } from './configs/config.module';

@Module({
  imports: [ConfigsModule, ProviderModule, CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
