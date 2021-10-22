import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { genSalt, hash } from "bcrypt";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials";
import { User } from "./user.entity";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {

        const { username, password } = authCredentialsDto;

        const salt = await genSalt();
        const hashedPassword = await hash(password, salt);

        // console.log("salt", salt);
        // console.log("pass", hashedPassword);

        const user = this.create({
            username,
            password: hashedPassword
        });

        try {
            await this.save(user);

            return user;
        } catch (error) {
            // Usar o console.log() antes para mostrar o erro
            // console.log(error);
            if (error.sqlState === '23000') {
                throw new ConflictException("Este nome de usuário já está sendo usado.");
            } else {
                throw new InternalServerErrorException();
            }
        }

    }

}