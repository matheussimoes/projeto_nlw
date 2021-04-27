import { request, Router } from "express"
import { getCustomRepository } from "typeorm";
import { MessagesController } from "./controller/messages.controller";
import { SettingsController } from "./controller/settings.controller";
import { UsersController } from "./controller/users.controller";

const routes = Router();

const settingsController = new SettingsController();
const usersController = new UsersController();
const messagesController = new MessagesController();

routes.post("/settings", settingsController.create);
routes.get("/settings/:username", settingsController.findByUsername);
routes.put("/settings/:username", settingsController.update);

routes.post("/users", usersController.create);

routes.post("/messages", messagesController.create);
routes.get("/messages/:id", messagesController.showByUser);



export { routes };