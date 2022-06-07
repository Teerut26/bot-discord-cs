import { Client } from "discord.js";

module.exports = {
    name: "ready",
    once: true,
    execute(client: Client) {
        type Status = "command" | "server";
        let type: Status = "command";
        console.log(`login as ${client.user?.username}`)
        setInterval(() => {
            switch (type) {
                case "command":
                    client.user?.setActivity({
                        type: "LISTENING",
                        name: "/help",
                    });
                    type = "server";
                    break;
                case "server":
                    client.user?.setActivity({
                        type: "LISTENING",
                        name: `${
                            client?.guilds.cache.map((item) => item).length
                        } servers`,
                    });
                    type = "command";
                    break;
            }
        }, 3000);
    },
};
