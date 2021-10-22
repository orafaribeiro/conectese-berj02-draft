import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { AuthCredentialsDto } from './dto/auth-credentials';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
        private jwtService: JwtService
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {

        return await this.usersRepository.createUser(authCredentialsDto);

    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }> {

        const { username, password } = authCredentialsDto;

        const user = await this.usersRepository.findOne({ username });

        if (user && (await compare(password, user.password))) {

            const payload: JwtPayload = { username };
            
            const accessToken: string = this.jwtService.sign(payload);

            return { accessToken };

        } else {
            throw new UnauthorizedException("Usuário ou senha inválidos!");
        }

    }

}
