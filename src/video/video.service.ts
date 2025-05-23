import { Inject, Injectable, Logger } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { v4 as uuidv4 } from 'uuid';
import { firstValueFrom, Subject } from 'rxjs';
import { filter, timeout } from 'rxjs/operators';
import {
  VideoProcessRequestDto,
  VideoProcessResponseDto,
  VideoUploadDto,
} from './dto/video-upload.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class VideoService {
  private readonly logger = new Logger(VideoService.name);
  private readonly videoResponses = new Subject<VideoProcessResponseDto>();

  constructor(@Inject('RABBITMQ_SERVICE') private client: ClientProxy) {}

  async processVideo(videoUploadDto: VideoUploadDto) {
    this.client.emit('video.processing', videoUploadDto);
    return { message: '영상 처리 요청 전송 완료' };
  }
}
