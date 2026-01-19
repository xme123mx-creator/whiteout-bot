require('dotenv').config();
const { Client, GatewayIntentBits, Partials, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
    partials: [Partials.Message, Partials.Channel]
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName === 'mik') {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder().setCustomId('buildings').setLabel('Buildings | المباني').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('gear').setLabel('Gear | العتاد').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('heroes').setLabel('Heroes | الأبطال').setStyle(ButtonStyle.Success),
                new ButtonBuilder().setCustomId('experts').setLabel('Experts | الخبراء').setStyle(ButtonStyle.Success),
                new ButtonBuilder().setCustomId('events').setLabel('Events | التذكير').setStyle(ButtonStyle.Secondary)
            );
        await interaction.reply({ content: 'Select a feature | اختر خاصية:', components: [row] });
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;
    switch(interaction.customId) {
        case 'buildings': await interaction.reply('Buildings calculator | حاسبة المباني'); break;
        case 'gear': await interaction.reply('Gear calculator | حاسبة العتاد'); break;
        case 'heroes': await interaction.reply('Heroes info | معلومات الأبطال'); break;
        case 'experts': await interaction.reply('Experts calculator | حاسبة الخبراء'); break;
        case 'events': await interaction.reply('Event Reminder | تذكير الفعاليات'); break;
        default: await interaction.reply('Unknown button | زر غير معروف');
    }
});

client.login(process.env.DISCORD_TOKEN);
