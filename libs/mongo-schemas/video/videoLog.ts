import { Prop } from '@nestjs/mongoose';
import { Video } from './video.schema';

export class VideoLog {
  @Prop({ required: true, ref: Video.name })
  videoId: string;

  @Prop({ required: true })
  step: string;

  @Prop()
  message?: string;

  @Prop()
  durationMs?: number;

  @Prop({ default: 'info' })
  level: 'info' | 'warn' | 'error';

  @Prop({ default: () => new Date() })
  timestamp: Date;
}
