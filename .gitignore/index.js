const Discord = require('discord.js');
const bot = new Discord.Client();

const prefix = '!';

bot.on('message', message => {

    let msg = message.content.toUpperCase();
    let sender = message.author;
    let cont = message.content.slice(prefix.length).split(" ");
    let args = cont.slice(1);

    if (msg.startsWith(prefix + 'ICLEAR')) {
        async function purge() {
            message.delete();

            if (!message.member.roles.find("name", "bot-commander")) {
                message.channel.send("Tu n'as pas la permission !");
                message.delete(5000);
                return;
            }

            if (isNaN(args[0])) {
                message.channel.send('Usage: ' + prefix + 'clear <amount>');
                return;
            }

            const fetched = await message.channel.fetchMessages({limit: args[0]});
            console.log(fetched.size + ' messages trouvés, deleting...');
            message.channel.bulkDelete(fetched)
            .catch(error => message.channel.send(`Error: ${error}`));

        }
        purge(); 

    }

    if(msg.startsWith(prefix + 'IMOTD')){
        bot.user.setActivity(args[0]);
    }

    if(msg.startsWith(prefix + 'IHELP')){
        var embed = new Discord.RichEmbed()
            .setDescription('Help commandes: \n !ihelp \n !iclear !')
        message.channel.sendEmbed(embed);
    }
});

bot.on('ready', () => {

    console.log('Bot started.');

});

bot.login('NDYxNjM4NzMwMDIxNzMyMzk0.DhZkyA.5daDAUPN3ft17ZdgtJwDKkFeOKI');
