import { getCustomRepository } from "typeorm"
import { UsersRepository } from "../repository/users.repository"


class UsersService {
    private usersRepository = getCustomRepository(UsersRepository);
    async create(email: string) {
        const userExists = await this.usersRepository.findOne({ email })

        if (userExists) {
            return userExists
        }

        const user = this.usersRepository.create({
            email
        });

        await this.usersRepository.save(user);

        return user;
    }

    async findByEmail(email: string) {
        const user = await this.usersRepository.findOne({ email });

        return user;
    }
}

export { UsersService }