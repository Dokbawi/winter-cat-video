import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { VideoServer } from './videoServer.schema';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Video extends Document {
  @Prop({ required: true })
  serverId: string;

  @Prop({ ref: VideoServer.name })
  serverObjectId?: Types.ObjectId;

  @Prop({ required: true })
  uploaderId: string;

  @Prop({ required: true })
  url: string;

  @Prop({ default: 'pending' }) status:
    | 'pending'
    | 'processing'
    | 'done'
    | 'failed';
}

export const VideoSchema = SchemaFactory.createForClass(Video);
