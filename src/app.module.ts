import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { PowerballService } from './services/powerballService';
import { BaseRepository } from './repositories/baseRepository';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), HttpModule],
  controllers: [AppController],
  providers: [PowerballService, BaseRepository],
})
export class AppModule {}