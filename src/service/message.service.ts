import { getCustomRepository } from "typeorm"
import { MessagesRepository } from "../repository/messages.repository"

interface IMessagesCreate {
    admin_id?: string;
    text: string;
    user_id: string;
}

class MessagesService {
    private messagesRepository = getCustomRepository(MessagesRepository);

    async create({ admin_id, text, user_id }: IMessagesCreate) {

        const message = this.messagesRepository.create({
            admin_id,
            text,
            user_id
        });

        await this.messagesRepository.save(message);

        return message;
    }

    async listByUser(user_id: string) {


        const list = await this.messagesRepository.find({
            where: { user_id },
            relations: ["user"]
        })

        return list;
    }
}

export { MessagesService }