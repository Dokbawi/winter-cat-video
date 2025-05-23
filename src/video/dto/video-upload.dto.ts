import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class VideoUploadDto {
  @IsString()
  serverId: string;

  @IsString()
  senderId: string;

  @IsString()
  videoUrl: string;

  @IsString()
  callbackQueue: string;
}

export class VideoProcessRequestDto {
  @IsString()
  videoId: string;

  file: Express.Multer.File;

  @IsString()
  callbackQueue: string;
}

export class VideoProcessResponseDto {
  @IsString()
  videoId: string;

  @IsBoolean()
  success: boolean;

  @IsString()
  processedFilePath?: string;

  @IsString()
  thumbnailFilePath?: string;

  @IsString()
  error?: string;
}
