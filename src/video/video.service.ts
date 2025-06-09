import { Inject, Injectable } from '@nestjs/common';
import { VideoUploadDto } from './dto/video-upload.dto';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video } from 'libs/mongo-schemas/video';

@Injectable()
export class VideoService {
  constructor(
    @Inject('RABBITMQ_SERVICE') private client: ClientProxy,
    @InjectModel(Video.name) private videoModel: Model<Video>,
  ) {}

  async processVideo(videoUploadDto: VideoUploadDto) {
    this.client.emit('video.processing', videoUploadDto);
    return { message: '영상 처리 요청 전송 완료' };
  }

  async getVideo(serverId: string) {
    return this.videoModel.find({ serverId });
  }
}
