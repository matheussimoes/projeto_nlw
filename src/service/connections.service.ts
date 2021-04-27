import { getCustomRepository } from "typeorm"
import { ConnectionsRepository } from "../repository/connections.repository"


interface IConnectionCreate {
    socket_id: string;
    user_id: string;
    admin_id?: string;
    id?: string;
}

class ConnectionsService {
    private connectionsRepository = getCustomRepository(ConnectionsRepository)

    async create({ socket_id, user_id, admin_id, id }: IConnectionCreate) {
        const connection = this.connectionsRepository.create({
            socket_id,
            user_id,
            admin_id,
            id
        })

        await this.connectionsRepository.save(connection);

        return connection;
    }

    async findByUserId(user_id: string) {
        const connection = await this.connectionsRepository.findOne({
            user_id
        });

        return connection;
    }

    async findAllWithoutAdmin() {
        const connections = await this.connectionsRepository.find({
            where: { admin_id: null },
            relations: ["user"]
        });

        return connections;
    }

    async findBySocketId(socket_id: string) {
        const connection = await this.connectionsRepository.findOne({
            socket_id
        });

        return connection;
    }
}

export { ConnectionsService }