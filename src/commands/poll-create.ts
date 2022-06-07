import { SlashCommandBuilder } from "@discordjs/builders";
import {
    Client,
    CommandInteraction,
    GuildMember,
    MessageActionRow,
    MessageButton,
    MessageEmbed,
} from "discord.js";
import { v4 as uuidv4 } from "uuid";
import db from "../config/firestore";
import moment from "moment-timezone";
import { Choice, MemberVote, Poll } from "../interface/Poll";
import { CustomId } from "../interface/CustomId";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("poll-create")
        .setDescription("create poll")
        .addStringOption((option) =>
            option
                .setName("topic")
                .setDescription("poll topic")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("choices-vote")
                .setDescription("example : ได้,ไม่ได้")
                .setRequired(true)
        )
        .addNumberOption((option) =>
            option
                .setName("timeout")
                .setDescription("เวลาที่ใช้ในการโหวต")
                .setRequired(false)
                .addChoice("5 วินาที", 5 * 1000)
                .addChoice("10 วินาที", 10 * 1000)
                .addChoice("15 วินาที", 15 * 1000)
                .addChoice("30 วินาที", 30 * 1000)
                .addChoice("1 นาที", 1 * 60 * 1000)
                .addChoice("2 นาที", 2 * 60 * 1000)
                .addChoice("3 นาที", 3 * 60 * 1000)
                .addChoice("4 นาที", 4 * 60 * 1000)
                .addChoice("5 นาที", 5 * 60 * 1000)
                .addChoice("10 นาที", 10 * 60 * 1000)
                .addChoice("20 นาที", 20 * 60 * 1000)
                .addChoice("30 นาที", 30 * 60 * 1000)
        )
        .addStringOption((option) =>
            option
                .setName("description")
                .setDescription("poll description")
                .setRequired(false)
        ),
    async execute(interaction: CommandInteraction, client: Client) {
        const choices = interaction.options
            .getString("choices-vote")
            ?.replace(" ", "")
            .split(",")
            .map((choice) => ({
                name: choice,
                vote_value: 0,
                id: uuidv4(),
            }));
        const topic = interaction.options.getString("topic") as string;
        const description = interaction.options.getString(
            "description"
        ) as string;

        const timeout = interaction.options.getNumber("timeout")
            ? interaction.options.getNumber("timeout")
            : 1 * 60 * 1000;

        const time_expire = moment()
            .tz("Asia/Bangkok")
            .add(timeout, "milliseconds");

        let data: Poll = {
            topic,
            description,
            choice: choices!,
            guildID: interaction.guildId as string,
            owner: interaction.member as GuildMember,
        };
        const res = await db
            .collection("poll")
            .add(JSON.parse(JSON.stringify(data)));

        const messageEmbed = new MessageEmbed();

        messageEmbed
            .setTitle("คุณต้องการโหวตอันไหน ?")
            .setDescription(
                `*${topic} ${description ? " - " + description : ""}*`
            );
        messageEmbed.setFooter({
            text: `Poll By ${
                interaction.user.username
            } || หมดเวลา : ${time_expire.tz("Asia/Bangkok").format("LTS")}`,
            iconURL: interaction.user.avatarURL() as string,
        });

        const row = new MessageActionRow();

        choices?.map((item) => {
            row.addComponents(
                new MessageButton()
                    .setCustomId(
                        JSON.stringify({
                            pollID: res.id,
                            id: item.id,
                            name: item.name,
                        } as CustomId)
                    )
                    .setLabel(item.name)
                    .setStyle("PRIMARY")
                    .setDisabled(false)
            );
        });

        let resSendMessage = await interaction.channel?.send({
            embeds: [messageEmbed],
            components: [row],
        });

        const collector = interaction.channel?.createMessageComponentCollector({
            time: timeout as number,
        });

        collector?.on("collect", async (buttonInteraction) => {
            const customId = JSON.parse(buttonInteraction.customId) as CustomId;

            const resVoteDoc = await db.collection("poll").doc(customId.pollID);
            const resMemberVoteDoc = await resVoteDoc.collection("member_vote");

            let check_exite = await resMemberVoteDoc
                .where("memberID", "==", buttonInteraction.user.id)
                .get();

            if (check_exite.size > 0) {
                return;
            }

            resMemberVoteDoc.add(
                JSON.parse(
                    JSON.stringify({
                        memberID: buttonInteraction.user.id,
                        user: buttonInteraction.member,
                        voteChoiceId: customId.id,
                        voteChoiceName: customId.name,
                    } as MemberVote)
                )
            );

            await buttonInteraction.user.send({
                embeds: [
                    new MessageEmbed().setTitle("ในเสร็จการโหวต")
                        .setDescription(`\`topic : ${topic}\`
\`description : ${description}\`
\`your vote : ${customId.name}\``),
                ],
            });
            console.log(buttonInteraction.id)
            return 
        });

        collector?.on("end", async () => {
            let pollCollection = db.collection("poll");
            let pollDoc = pollCollection.doc(res.id);
            let memberVoteCollection = pollDoc.collection("member_vote");

            let choiceFromDoc = [] as Choice[];

            let resultData = await pollDoc.get();
            choiceFromDoc = resultData.data()?.choice;

            const snapshot = await memberVoteCollection.get();
            snapshot.forEach((doc) => {
                choiceFromDoc = choiceFromDoc.map((item) => ({
                    ...item,
                    vote_value:
                        item.id === doc.data().voteChoiceId
                            ? item.vote_value + 1
                            : item.vote_value,
                }));
            });

            let messageEmbedResult = new MessageEmbed()
                .setTitle("ผลการโหวต")
                .setDescription(
                    `*${topic} ${description ? " - " + description : ""}*`
                );

            choiceFromDoc.map((item) => {
                messageEmbedResult.addField(item.name, String(item.vote_value));
            });

            await resSendMessage?.edit({
                embeds: [messageEmbedResult],
                components: [],
            });
            return
        });
    },
};
