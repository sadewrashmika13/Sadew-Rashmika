const { cmd, commands } = require('../command');
const { readEnv } = require('../lib/database');
const config = require('../config');
const os = require('os');
const { runtime } = require('../lib/functions');

//-----------------------------------------------ALive-----------------------------------------------
cmd({
    pattern: "alive",
    desc: "Check bot online or not.",
    category: "main",
    react: "🍬",
    filename: __filename
},
async (conn, mek, m, { from, prefix, pushname, reply }) => {
    try {
        // Fetch the configuration/environment settings
        const config = await readEnv();  // Ensure readEnv returns a promise if needed

        // Determine the host platform
        let hostname = os.hostname();
        if (hostname.length == 12) hostname = 'replit';
        else if (hostname.length == 36) hostname = 'heroku';
        else if (hostname.length == 8) hostname = 'koyeb';

        // Create the text response with system details
        const monspace = '```';
        const sssf = `${monspace}👋 Hello ${pushname}, I'm alive now${monspace}

*👾 Im Queen-X MD whatsapp bot*

> *Version:* ${require("../package.json").version}
> *Memory:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
> *Runtime:* ${runtime(process.uptime())}
> *Platform:* ${hostname}

*🐼 Have A Nice Day 🐼*

🔢 Reply Below Number,
*1 | BOT'S SPEED*

*2 | CONTACT BOT'S OWNER*

©ＳＬ ＮＥＴＨＵ - ＭＡＸ - ＹＴ
`;

        // Send the audio message
        await conn.sendMessage(from, {
            audio: { url: 'https://github.com/sl-nethu-max/QUEEN-X-MD-DATABASE/raw/refs/heads/main/media/alive%20.mp3' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });

        // Sending the message with an image (thumbnail)
        const sentMsg = await conn.sendMessage(from, {
            image: { url: 'https://pomf2.lain.la/f/hxp64475.jpg' },  // Sending an image (URL)
            caption: sssf,  // Send the description as the caption
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterName: 'View Channel',
                    newsletterJid: "120363322195409882@newsletter",
                },
                externalAdReply: {
                    title: '𝗤𝘂𝗲𝗲𝗻-𝗫 𝗠𝗗 🍭',
                    body: 'ᴀ ꜱɪᴍᴘʟᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ',
                    mediaType: 1,
                    sourceUrl: "https://www.youtube.com/@SlNethuMax",
                    thumbnailUrl: 'https://github.com/sl-nethu-max/QUEEN-X-MD-DATABASE/blob/main/media/queen.png', // Corrected thumbnail URL
                    renderLargerThumbnail: false,
                    showAdAttribution: true
                }
            }
        }, { quoted: mek });

        // Listen for User Response
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const userMsg = msgUpdate.messages[0];
            if (!userMsg.message || !userMsg.message.extendedTextMessage) return;

            const selectedOption = userMsg.message.extendedTextMessage.text.trim();

            // Validate if the response matches the `.alive` message
            if (
                userMsg.message.extendedTextMessage.contextInfo &&
                userMsg.message.extendedTextMessage.contextInfo.stanzaId === sentMsg.key.id
            ) {
                try {
                    switch (selectedOption) {
                        case '1': {
                            const startTime = Date.now();
                            const message = await conn.sendMessage(from, { text: '```SPEED TEST```' });
                            const endTime = Date.now();
                            const ping = endTime - startTime;

                            // Send the ping response without buttons
                            await conn.sendMessage(from, { text: `*Pong*\n*${ping}ms*` }, { quoted: mek });
                            break;
                        }
                        case '2': {
                            try {
                                const vcard = 'BEGIN:VCARD\n' 
                                    + 'VERSION:3.0\n' 
                                    + `FN: NETHIKA\n` 
                                    + `ORG: Web Developer;\n` 
                                    + `TEL;type=CELL;type=VOICE;waid=94704227534:+94704227534\n` 
                                    + 'END:VCARD';

                                await conn.sendMessage(from, { 
                                    contacts: { 
                                        displayName: `NETHMIKA`, 
                                        contacts: [{ vcard }] 
                                    }, 
                                    quoted: mek 
                                });
                                break;
                            } catch (e) {
                                console.error(e);
                                await conn.sendMessage(from, { text: "*❌ Error processing your request.*" }, { quoted: mek });
                            }
                            break;
                        }
                        default:
                            await conn.sendMessage(from, { text: "*❌ Invalid option selected.*" }, { quoted: mek });
                            break;
                    }
                } catch (e) {
                    console.error(e);
                    await conn.sendMessage(from, { text: "*❌ Error processing your request.*" }, { quoted: mek });
                }
            }
        });
    } catch (err) {
        console.error(err);
        await reply('*ERROR*');
    }
});


//-----------------------------------------------Owner-----------------------------------------------

cmd({
    pattern: "owner",
    desc: "im owner",
    react: "👩‍💻",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const config = await readEnv();

let vcard = 'BEGIN:VCARD\n' 
            + 'VERSION:3.0\n' 
            + `FN: NETHIKA\n` 
            + `ORG: Web Developer;\n` 
            + `TEL;type=CELL;type=VOICE;waid=94704227534:+94704227534\n` 
            + 'END:VCARD'

await conn.sendMessage(from, { 
    contacts: { 
        displayName: `NETHMIKA`, 
        contacts: [{ vcard }] 
    },  quoted: mek})
}catch(e){
console.log(e)
reply(`${e}`)
}
});

//-----------------------------------------------Pong-----------------------------------------------

cmd({
    pattern: "ping",
    desc: "Check bot's response time.",
    category: "main",
    react: "🪄",
    filename: __filename
}, async (conn, mek, m, { from, quoted, reply }) => {
    try {
         
        const startTime = Date.now();
        const message = await conn.sendMessage(from, { text: '```SPEED TEST```' });
        const endTime = Date.now();
        const ping = endTime - startTime;

        // Send the ping response without buttons
        await conn.sendMessage(from, { text: `*Pong*\n*${ping}ms*` }, { quoted: message })
    } catch (e) {
        console.error(e);
        reply(`${e}`);
  }
});
//-----------------------------------------------System-----------------------------------------------

cmd({
    pattern: "system",
    desc: "Check runtime, owner & more...",
    category: "main",
    react: "📟",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let status = `
*⏱️ Run :-* ${runtime(process.uptime())}
*🗃️ Memory :-* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*📍 Platform :-* ${os.hostname()}
*👥 Owners :-* ɴᴇᴛʜᴍɪᴋᴀ ᴋᴀᴜꜱʜᴀʟᴀʏᴀ
*🎉 Version :-* 1.0.0
`

return reply(`${status}`)

}catch(e){
console.log(e)
reply(`${e}`)

}
});
//-----------------------------------------------Repo-----------------------------------------------

cmd({
    pattern: "repo",
    alias: ["sc","script"],
    desc: "Check Bot Sc",
    category: "main",
    react: "🌟",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Create a status message to be sent
        const monspace = '```';
        const desc = `*🌐 𝗤𝘂𝗲𝗲𝗻 𝗫-𝗠𝗗 _𝗢𝗙𝗙𝗜𝗖𝗜𝗔𝗟 ♦️*

${monspace}🔮 The main hope of creating this bot is to take full advantage of the WhatsApp app and make its work easier.${monspace}

${monspace}💡 Various things can be downloaded from this bot.  Also, managing groups, making logos & edit-images in different ways, searching for different things and getting information and more futures included.${monspace}


${monspace}⚠️ Also, if your Whatsapp account gets damaged or banned by using this, we are not responsible and you should take responsibility for it.${monspace}


${monspace}🪀 You can create the bot and see the deploy methods from the website below.👇${monspace}

🌏 *Website:* ${monspace}https://www.queen-x-md-official-web.com${monspace}

💃 *Owner :* ${monspace}Nethmika Kaushalya${monspace}

🎡 *Github :* ${monspace}https://github.com/${monspace}

🧿 *Yt channel :* ${monspace}https://www.youtube.com/@SlNethuMax${monspace}

*🎗️ *Our group :* ${monspace}https://chat.whatsapp.com/LK2q0FuPSZZADOqLtPw8IR${monspace} 

🪄 *Our channel :* ${monspace}https://whatsapp.com/channel/0029VagCogPGufJ3kZWjsW3A${monspace}

©ＳＬ ＮＥＴＨＵ - ＭＡＸ - ＹＴ`;

        // Sending the message with an image (thumbnail)
        const sentMsg = await conn.sendMessage(from, {
            image: { url: 'https://pomf2.lain.la/f/hxp64475.jpg' },  // Sending an image (URL)
            caption: desc,  // Send the description as the caption
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                },
                externalAdReply: {
                    title: '𝗤𝘂𝗲𝗲𝗻-𝗫 𝗠𝗗 🍭',
                    body: 'ᴀ ꜱɪᴍᴘʟᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ',
                    mediaType: 1,
                    sourceUrl: "https://www.youtube.com/@SlNethuMax",
                    thumbnailUrl: 'https://pomf2.lain.la/f/gpdzqbq6.jpg', // Corrected thumbnail URL
                    renderLargerThumbnail: false,
                    showAdAttribution: true
                }
            }
        }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply(`*Error:* ${e.message}`);
    }
});
