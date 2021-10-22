import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('signup')
    async signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<User> {

        return await this.authService.signUp(authCredentialsDto);

    }

    @Post('signin')
    async signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ 
        accessToken: string;
     }> {

        return await this.authService.signIn(authCredentialsDto);

    }

    @Post('/secure')
    @UseGuards(AuthGuard())
    secure(@Req() req): boolean {
        console.log('Rota segura', req);
        return true;
    }

}
