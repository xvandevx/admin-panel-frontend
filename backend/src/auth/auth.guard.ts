import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import * as process from "process";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);


        if (!token) {
            console.log('tokennnnn', token)
            throw new UnauthorizedException();
        }
        try {
            console.log('process.env.PRIVATE_KEY', process.env.PRIVATE_KEY, token)
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: process.env.PRIVATE_KEY || 'SECRET',
                }
            );
            request['user'] = payload;
        } catch(e) {
            console.log('testset', e)
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}