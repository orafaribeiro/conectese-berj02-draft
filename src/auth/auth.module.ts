import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { UsersRepository } from './auth.repository';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
