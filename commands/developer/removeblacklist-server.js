module.exports.run = async(client, message, args) => {
    const Discord = require('discord.js');
    const schema = require(`${process.cwd()}/models/guild-schema`);
    const { version, author } = require(`${process.cwd()}/package.json`);
    const ownerid = process.env.OWNER
    
// ======================================== Limit code here ======================================= \\

    if (message.author.id !== ownerid) return;

    const id = args[0];
    if (!id) return message.reply('Please provide a server id.').then(msg => msg.delete({ timeout: 6000 }));
    if (!client.guilds.cache.has(id)) return message.reply(`I can't find the server with the id \`${id}\``).then(msg => msg.delete({ timeout: 6000 }));
    let data;
    try {
        data = await schema.findOne({
            guildId: id
        })
        if(!data) {
            data = await schema.create({
                guildId: user.id
            })
        }
    } catch (err) {
        console.log(`[ERROR] ${err}`);
        return message.reply(`An error occured while trying to add the user to the blacklist.`).then(msg => msg.delete({ timeout: 6000 }));
    }

    data.blacklisted = false
    await data.save()

    const SuccessEmbed = new Discord.MessageEmbed()
    .setColor('#00ff00')
    .setTitle(`✅ Successfully remove blacklisted ${message.guild.name}`)
    .setDescription(`\`\`\`js\n${JSON.stringify(data, null, 2)}\`\`\``)
    .setImage(message.guild.iconURL({ dynamic: true, size: 2048 }))
    .addField('Date:', `<t:${parseInt(client.readyTimestamp / 1000)}:R>`)
    .setFooter(`Status Users: [ ${data.blacklisted} ] | Siesta v${version}`)

    return message.channel.send(SuccessEmbed)
    }

    module.exports.config = {
      name: 'removeblacklist-server',
      aliases: ['rbl-server', 'rblsserver', 'removeblacklistserver'],
      usage: 'removeblacklist-server <server> true/false'
    }


/**
/////////////////////////////////////////////////////////////////////
////                                                             ////
\\\\                  Bot Coded by GalaXd#9165                   \\\\
////                                                             ////
\\\\   Work for MGalaCyber Development | https://galacyber.xyz   \\\\
////                                                             ////
\\\\                    All Right Reserved!                      \\\\
////                                                             ////
/////////////////////////////////////////////////////////////////////
 */