const { Sparky, isPublic, commands } = require("../lib");
const config = require("../config");

Sparky({
  name: "menu",
  fromMe: isPublic,
  category: "main",
  desc: "Displays the beautiful command menu."
}, async ({ m, client }) => {
  try {
    await m.react('📑');

    // 🕒 වෙලාව සහ දිනය හදාගමු
    const date = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Colombo' });
    const time = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Colombo' });

    // 📊 කැටගරි වෙන් කරගැනීම
    let menuText = `╭══════════════════════⊷\n`;
    menuText += `┃ 🧠 *${config.BOT_INFO.split(';')[0] || "SADEW-MD"}* 🧠\n`;
    menuText += `╰══════════════════════⊷\n\n`;

    menuText += `╭═══════ [ INFO ] ═══════⊷\n`;
    menuText += `┃ 👤 *Owner:* ${config.BOT_INFO.split(';')[1] || "Sadew"}\n`;
    menuText += `┃ 🛠️ *Prefix:* [ ${config.HANDLERS} ]\n`;
    menuText += `┃ 📅 *Date:* ${date}\n`;
    menuText += `┃ ⏰ *Time:* ${time}\n`;
    menuText += `┃ 📊 *Commands:* ${commands.length}\n`;
    menuText += `╰══════════════════════⊷\n\n`;

    // කමාන්ඩ්ස් ටික කැටගරි වලට ගෲප් කරමු
    const categories = {};
    commands.forEach(cmd => {
      if (!cmd.dontAddCommandList && cmd.name) {
        const cat = cmd.category ? cmd.category.toLowerCase() : "other";
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(cmd.name);
      }
    });

    // එක් එක් කැටගරි එක ලස්සනට ඩිසයින් කරමු
    Object.keys(categories).sort().forEach(category => {
      const emojiMap = {
        downloader: "📥",
        youtube: "🎥",
        main: "👑",
        other: "⚙️",
        owner: "🔒",
        group: "👥",
        logo: "🎨"
      };

      const emoji = emojiMap[category] || "✨";
      const capCategory = category.toUpperCase();

      menuText += `╭═══  ${emoji} *${capCategory}* ═══⊷\n`;
      categories[category].forEach(cmdName => {
        menuText += `┃ 📍 \`.${cmdName}\`\n`;
      });
      menuText += `╰══════════════════════⊷\n\n`;
    });

    menuText += `*💻 Created By Sadew Rashmika*`;

    // 🖼️ බොට්ගේ Image එකත් එක්කම මෙනු එක යවමු
    const botImg = config.BOT_INFO.split(';')[2] || "https://i.imgur.com/vrzBEoB.jpeg";
    
    await client.sendMessage(m.jid, {
      image: { url: botImg },
      caption: menuText
    }, { quoted: m });

    await m.react('✅');

  } catch (error) {
    await m.react('❌');
    m.reply(`❌ *Error:* ${error.message}`);
  }
});
