import { EntityRepository, Repository } from "typeorm";
import { User } from "./auth.entity";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {

    

}