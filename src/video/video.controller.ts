import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoUploadDto } from './dto/video-upload.dto';
import { DiscordServerGuard } from 'src/guard/discord-auth.guard';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  async processVideo(@Body() videoUploadDto: VideoUploadDto) {
    const result = await this.videoService.processVideo(videoUploadDto);
    return result;
  }

  @Get(':serverId')
  @UseGuards(DiscordServerGuard)
  async getVideo(@Param('serverId') serverId: string) {
    return this.videoService.getVideo(serverId);
  }
}
