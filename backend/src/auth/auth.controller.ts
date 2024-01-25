import {Body, Controller, Post, Request, Response} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LoginDto} from "./dto/login.dto";
import {SetPasswordDto} from "./dto/set-password.dto";
import {Public} from "../common";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Public()
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.login(loginDto);

       /* if (token) {
            res.cookie('token', token, {});
        }
        return res.send({ status });*/
    }

    @Post('logout')
    async logout(@Request() req, @Response() res, @Body() loginDto: LoginDto) {
        res.clearCookie('token');
        return res.send({ message: 'success' });
    }

    @Post('check')
    async checkIsAuth() {
        return {
            statusCode: 200,
            message: 'Authorized'
        };
    }

    @Public()
    @Post('setPassword')
    setPassword(@Body() setPasswordDto: SetPasswordDto) {
        return this.authService.setPassword(setPasswordDto);
    }
}
