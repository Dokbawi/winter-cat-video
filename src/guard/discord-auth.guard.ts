// guards/discord-server.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import axios from 'axios';
import { Request } from 'express';

@Injectable()
export class DiscordServerGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No access token provided');
    }

    const accessToken = authHeader.replace('Bearer ', '');
    const serverId =
      request.params.serverId ||
      request.query.serverId ||
      request.body.serverId;
    if (!serverId) {
      throw new ForbiddenException('No serverId provided');
    }

    try {
      const response = await axios.get(
        'https://discord.com/api/users/@me/guilds',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const guilds: any[] = response.data;
      const found = guilds.some((guild) => guild.id === serverId);

      if (!found) {
        throw new ForbiddenException('User does not belong to this server');
      }

      return true;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new UnauthorizedException('Invalid or expired Discord token');
      }
      throw new ForbiddenException(
        'Failed to verify Discord server membership',
      );
    }
  }
}
