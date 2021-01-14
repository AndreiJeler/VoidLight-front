import { DiscordUser } from "./discord-user";

export class LobbyGame {
    id: number;
    gameId: number;
    gameName: string;
    participantsNr: number;
    users: DiscordUser[];
    initializer: DiscordUser;
    hasStarted: boolean;
}