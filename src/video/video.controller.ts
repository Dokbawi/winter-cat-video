import { Controller, Post, Body } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoUploadDto } from './dto/video-upload.dto';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  async processVideo(@Body() videoUploadDto: VideoUploadDto) {
    const result = await this.videoService.processVideo(videoUploadDto);
  }
}
