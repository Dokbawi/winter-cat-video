import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { VideoModule } from './video/video.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `env/development.env`,
    }),
    VideoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
