import {
    Client,
    CommandInteraction,
    GuildMember,
    MessageEmbed,
} from "discord.js";
import _ from "lodash";

const randomNumber = (max: number) => {
    return Math.floor(Math.random() * max);
};

const groupController = async (
    interaction: CommandInteraction,
    client: Client
) => {
    let result = await interaction.guild?.members.fetch();
    let list_member = result
        ?.filter((member) => !member.user.bot)
        .map((member) => member);

    let groupAmout = interaction.options.getInteger("group-amout");
    let memberAmoutInGroup = interaction.options.getInteger(
        "member-amout-in-group"
    );

    let list_group: GuildMember[][] = [];

    let list_number_random_past: number[] = [];
    let membar_value = list_member?.length!;

    for (let i = 0; i < groupAmout!; i++) {
        if (membar_value < memberAmoutInGroup!) {
            break;
        }

        let list_member_random: GuildMember[] = [];
        for (let j = 0; j < memberAmoutInGroup!; j++) {
            while (true) {
                let number_random = randomNumber(list_member?.length!);
                if (!list_number_random_past.includes(number_random)) {
                    list_number_random_past.push(number_random);
                    list_member_random.push(list_member![number_random]);
                    break;
                } else {
                    continue;
                }
            }
        }
        list_group.push(list_member_random);
        membar_value -= memberAmoutInGroup!;
    }

    let messageEmbed = new MessageEmbed().setTitle("สุ่มแบบกลุ่ม");

    list_group.map((group, id) => {
        let member_list_text = "";
        group.map((membar) => {
            member_list_text += `<@${membar.user.id}> `;
        });
        messageEmbed.addField(`กลุ่มที่ ${id + 1}`, member_list_text);
    });

    interaction.reply({ embeds: [messageEmbed] });
};

export default groupController;
