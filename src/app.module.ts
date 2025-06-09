import { Module } from '@nestjs/common';
import { VideoModule } from './video/video.module';
import { MongooseModule } from '@nestjs/mongoose';
import { mognoDBConfig } from './settings/dotenv-options';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${mognoDBConfig.user}:${mognoDBConfig.password}@localhost:27017`,
      {
        dbName: mognoDBConfig.dbName,
      },
    ),
    VideoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
