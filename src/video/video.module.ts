import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { rabbitMQConfig } from 'src/settings/dotenv-options';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, VideoSchema } from 'libs/mongo-schemas/video';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),

    ClientsModule.registerAsync([
      {
        name: 'RABBITMQ_SERVICE',
        useFactory: () => ({
          transport: Transport.RMQ,
          options: {
            urls: [rabbitMQConfig.url],
            queue: 'video.processing.queue',
            exchange: 'video_exchange',
            queueOptions: {
              durable: true,
            },
          },
        }),
      },
    ]),
  ],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
