import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { rabbitMQConfig } from 'src/settings/dotenv-options';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [rabbitMQConfig.url],
          queue: 'video.queue',
          exchange: 'video_exchange',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
