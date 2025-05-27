import { Inject, Injectable } from '@nestjs/common';
import { VideoUploadDto } from './dto/video-upload.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class VideoService {
  constructor(@Inject('RABBITMQ_SERVICE') private client: ClientProxy) {}

  async processVideo(videoUploadDto: VideoUploadDto) {
    this.client.emit('video.processing', videoUploadDto);
    return { message: '영상 처리 요청 전송 완료' };
  }
}
