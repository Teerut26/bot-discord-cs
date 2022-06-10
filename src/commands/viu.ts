import { SlashCommandBuilder } from "@discordjs/builders";
import { Client, CommandInteraction, MessageEmbed } from "discord.js";
import Viu from "../modules/Viu";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("viu")
        .setDescription("Viu top series"),
    async execute(interaction: CommandInteraction, client: Client) {
        let viu = await new Viu();
        await viu.excute();
        let viuResult = viu.getRanking();

        let messageEmbed = new MessageEmbed()
            .setTitle(viuResult.name)
            .setImage(viuResult.product[0].cover_image_url)
            .setColor(16758784);
        let description = "";
        viuResult.product.map((item, id) => {
            description += `\`\`\`${id + 1}. ${item.series_name} >>  ${
                item.series_category_name
            }\`\`\``;
        });

        messageEmbed.setDescription(description);
        messageEmbed.setFooter({
            text:"Viu",
            iconURL:"https://play-lh.googleusercontent.com/y38XVJky8EEJbhG784ANEYuWYh0zWvCM8SYQ9HlMBpSQUmkk4HImFvc0H6VrtXEJ1sLu"
        })

        return interaction.reply({ embeds: [messageEmbed] });
    },
};
