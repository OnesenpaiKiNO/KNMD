 "use strict";
 const fs = require('fs')
 const uptime = process.uptime();
 const { exec } = require('child_process')
 const axios = require("axios")
 const Exif = require('../sticker/exif.js');
 const il = require('../../package.json');
 const exif = new Exif();
 const moment = require("moment-timezone")
 const ffmpeg = require('fluent-ffmpeg')
 const {
downloadContentFromMessage } = require('@adiwajshing/baileys');
 const { 
  color, 
  runtime,
  fetchJson, 
  getRandom 
 } = require('../function.js')
 const { 
  yta, 
  ytv, 
  searchResult 
 } = require('../scrape/ytdl')
 const Options = require('../settings/options.js')
 const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
 
 let thumb = fs.readFileSync('./storage/image/thumb.jpg')
 
 module.exports = async (
    sock,
    m    
    ) => { 
   
   try{            
   const from = m.key.remoteJid
    
   const CMD = (m.xtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.xtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.xtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.xtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : ''.slice(1).trim().split(/ +/).shift().toLowerCase()
   const prefix = /^[#!.,®©¥€¢£/\∆✓]/.test(CMD) ? CMD.match(/^[#!.,®©¥€¢£/\∆✓]/gi) : '#'	  

    
   const chatmessage = (m.xtype === 'conversation') ? m.message.conversation : (m.xtype === 'extendedTextMessage') ? m.message.extendedTextMessage.text : ''
   const ordermessage = (m.xtype === 'conversation' && m.message.conversation.startsWith(prefix)) ? m.message.conversation : (m.xtype == 'imageMessage') && m.message[m.xtype].caption.startsWith(prefix) ? m.message[m.xtype].caption : (m.xtype == 'videoMessage') && m.message[m.xtype].caption.startsWith(prefix) ? m.message[m.xtype].caption : (m.xtype == 'extendedTextMessage') && m.message[m.xtype].text.startsWith(prefix) ? m.message[m.xtype].text : (m.xtype == 'listResponseMessage') && m.message[m.xtype].singleSelectReply.selectedRowId ? m.message[m.xtype].singleSelectReply.selectedRowId : (m.xtype == 'buttonsResponseMessage') && m.message[m.xtype].selectedButtonId ? m.message[m.xtype].selectedButtonId : ''
   const args = ordermessage.trim().split(/ +/).slice(1)
    
      
   const order = ordermessage.slice(1).trim().split(/ +/).shift().toLowerCase()
   const q = args.join(' ')       
   const isCmd = ordermessage.startsWith(prefix)   
   const isGroup = from.endsWith('@g.us') 
   const groupMetdata = isGroup ? await sock.groupMetadata(from) : ''
   const groupName = isGroup ? await groupMetdata.subject : ''   
   
   let LETT = 1;    
   let MenuList = `• *INFO ${Options.info.botName}*\n\n`
   MenuList += `Tag : @${m.sender.split("@")[0]}\n` 
   MenuList += ` 👋🏻 *Hello:* ${m.pushName} ${m.sayingtime + m.timoji}\n`
   MenuList += ` 🕒 *Time:* ${time}\n`
   MenuList += ` 🩸 *Version:* ${Options.info.version}\n`
   MenuList += ` 💻 *Type:* Baileys-md\n`
   MenuList += ` 🪧 *Bot Name:* ${Options.info.botName}\n\n`
   MenuList += `• *DATA SHOPPING KAMU*\n\n`
   MenuList += ` ☕ *Pendapatan Hari Ini:* 30.000\n`
   MenuList += ` 📝 *Item Yang Kamu Jual:* 1\n`
   MenuList += ` 🛒 *Total belanja:* 0\n`
   MenuList += ` 🛍️ *Total Pengeluaran:* 0\n`
   MenuList += ` 💳 *Total Pemasukan:* 30.000\n\n`
   MenuList += `   *_Go To Ramadhan 🌙_*\n`
   MenuList += `*${m.harinye} Hari*, *${m.jamnye} Jam*, *${m.menitnye} Menit*, *${m.detiknye} Detik*\n\n`
   MenuList += `• *ALL MENU & SCRAPER DATA*\n\n`
   MenuList += `_DEFAULT_\n`
   MenuList += `${LETT++}. ${prefix}menu\n`
   MenuList += `${LETT++}. ${prefix}test\n`
   MenuList += `${LETT++}. ${prefix}temp\n`
   MenuList += `${LETT++}. ${prefix}listsection1\n`
   MenuList += `${LETT++}. ${prefix}listsection2\n`
   MenuList += `${LETT++}. ${prefix}p\n`
   MenuList += `${LETT++}. ${prefix}credits\n`
   MenuList += `${LETT++}. ${prefix}thankto\n`
   MenuList += `${LETT++}. ${prefix}tqto\n\n`
   MenuList += `_INFO_\n`
   MenuList += `${LETT++}. ${prefix}runtime\n\n`
   MenuList += `_DOWNLOADER_\n`
   MenuList += `${LETT++}. ${prefix}play query\n`
   MenuList += `${LETT++}. ${prefix}lagu query\n`
   MenuList += `${LETT++}. ${prefix}musik query\n`
   MenuList += `${LETT++}. ${prefix}youtubemusicmp3\n`
   MenuList += `${LETT++}. ${prefix}youtubemusicmp4\n\n`
   MenuList += `_CONVERTER_\n`
   MenuList += `${LETT++}. ${prefix}sticker\n`
   MenuList += `${LETT++}. ${prefix}stiker\n`
   MenuList += `${LETT++}. ${prefix}s\n`
   MenuList += `${LETT++}. ${prefix}stickergif\n`
   MenuList += `${LETT++}. ${prefix}sgif\n`
   MenuList += `${LETT++}. ${prefix}stikergif\n`
   MenuList += `${LETT++}. ${prefix}stikgif\n\n`
   MenuList += `_BAILEYS DOCS_\n`
   MenuList += `${LETT++}. ${prefix}delete\n`
   MenuList += `${LETT++}. ${prefix}del\n\n`
   MenuList += `_GROUP_\n`
   MenuList += `${LETT++}. ${prefix}promote\n`
   MenuList += `${LETT++}. ${prefix}demote\n\n`
   MenuList += `_SOUND_\n`
   MenuList += `${LETT++}. ${prefix}sound1\n\n` 
   MenuList += `_ANIME_\n`
   MenuList += `${LETT++}. ${prefix}waifu\n`
   MenuList += `${LETT++}. ${prefix}megumin\n`
   MenuList += `${LETT++}. ${prefix}awoo\n`
   MenuList += `${LETT++}. ${prefix}shinobu\n`
   MenuList += `${LETT++}. ${prefix}neko\n\n`
    
   //Participant Mention
   const mentionByTag = m.xtype == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.mentionedJid : []
   const mentionByreply = m.xtype == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.participant || "" : ""
       
   const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
   mention != undefined ? mention.push(mentionByreply) : []
   const mentionUser = mention != undefined ? mention.filter(n => n) : []    
    
   let fkontak = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: '6289602518223-1604595598@g.us' } : {})}, message: { "contactMessage":{"displayName": `KN-BOT-MD`,"vcard":`BEGIN:VCARD\nVERSION:3.0\nN:2;kino;;;\nFN:kino\nitem1.TEL;waid=6281361057300:6281361057300\nitem1.X-ABLabel:Mobile\nEND:VCARD` }}}               
   
   if (chatmessage.includes(`assalamualaikum`) || chatmessage.includes(`Asalamu'alaikum`) || chatmessage.includes(`Assalamualaikum`) || chatmessage.includes(`Asalamualaikum`) || chatmessage.includes(`asalamu'alaikum`) || chatmessage.includes(`assalamu'alaikum`) || chatmessage.includes(`Assalamu'alaikum`) || chatmessage.includes(`Assalamu'alaikum`) || chatmessage.includes(`asalamualaikum`) || chatmessage.includes(`asalamu'alaikum`)) {
   if (m.key.fromMe) {
       await sock.sendMessage(from, 
        { text: 'Waalaikumsalam' }, 
        { quoted : m })  
       }    
     }
    if (chatmessage.includes(`kontol`) || chatmessage.includes(`Kontol`)){
      await sock.sendMessage(from, 
        { text: 'Astagfirullah' }, 
        { quoted : m })  
       } 
    if (chatmessage.includes(`pepek`) || chatmessage.includes(`Pepek`)){
      await sock.sendMessage(from, 
        { text: 'Astagfirullah' }, 
        { quoted : m })  
       } 
   
  if (isCmd && !isGroup)
     console.log(color('[ CMD ]', 'gray'), color(time, 'yellow'), color(`${order} [${args.length}]`, 'purple'), 'from', color(m.pushName))
   
  if (isCmd && isGroup)
     console.log(color('[ CMD ]', 'yellow'), color(time, 'yellow'), color(`${order} [${args.length}]`, 'purple'), 'from', color(m.pushName), 'in', color(groupName, 'orange'))


  switch (order) {
  
   case 'menu2':{  
   let button = [{
     index: 1, 
      urlButton: {
       displayText: 'Instagram Developers', 
       url: 'https://instagram.com/its_mekino'
       } 
     },     
     {
     index: 2, 
      quickReplyButton: {
       displayText: 'Click', 
       id: '#tes'
      } 
    },
    { 
     index: 3, 
      quickReplyButton: {
       displayText: 'Click2', 
       id: '#tes'
        } 
     },
     {
     index: 4, 
      quickReplyButton: {
       displayText: 'Click', 
       id: '#tes'
        } 
      },]
     await m.templateButon5IMG(
       from, 
       MenuList, 
       il.description, 
       thumb, 
       button, 
       m, 
     await m.createMsg(
       from, {
       mentions: [ m.sender]
       })
       )
     }
       break
   case 'menu':
   let buttons = [{
     index: 1, 
      urlButton: {
       displayText: 'Instagram Developers', 
       url: 'https://instagram.com/its_mekino'
       } 
     },     
     {
     index: 2, 
      quickReplyButton: {
       displayText: 'Click', 
       id: '#tes'
      } 
    },
    { 
     index: 3, 
      quickReplyButton: {
       displayText: 'Click2', 
       id: '#tes'
        } 
     },
     {
     index: 4, 
      quickReplyButton: {
       displayText: 'Click', 
       id: '#tes'
        } 
      },]
   await m.sendButton(
    from, 
    MenuList,
    il.description,
    buttons,
    thumb, 
   await m.createMsg(
     from, 
     {
     video: {
      url: './storage/video/menu1.mp4', 
      caption: "Not detected"
      }, 
      gifPlayback: true, mentions: [m.sender]
     },
     { quoted : fkontak }
     )
    )
   break
   case 'tes':{
    await m.reply(from, 'hallo', { quoted : m } )
   }
   break
   case 'temp':{
   const templateMessage = {
    text: "Hi it's a template message",
    footer: 'Hello World',
    templateButtons: [
     {
     index: 1, 
      urlButton: {
       displayText: 'Instagram Developers', 
       url: 'https://instagram.com/its_mekino'
      } },
     {
     index: 2, 
     callButton: {
      displayText: 'Owner', 
       phoneNumber: '6289602518223'
      } },
     {
     index: 3, 
      quickReplyButton: {
       displayText: 'Click', 
       id: '#tes'
       } },
    { 
     index: 4, 
      quickReplyButton: {
       displayText: 'Click2', 
       id: '#tes'
       } },
     {
     index: 5, 
      quickReplyButton: {
       displayText: 'Click', 
       id: '#tes'
       } },
     ],
    }
  const sendm = await sock.sendMessage(
    from, 
    templateMessage
    )
   }
   break  
  case 'runtime':{
    const templateMessage = {
    text: "ACTIVE FOR",
    footer: `${runtime(process.uptime())}`,
    templateButtons: [
     {
     index: 1, 
      urlButton: {
       displayText: 'Instagram Developers', 
       url: 'https://instagram.com/its_mekino'
       } }
      ]
     }
     const sendm = await sock.sendMessage(
       from, 
       templateMessage
      )
    }
  break
case 'credits':
case 'thankto':
case 'tqto':{
    const templateMessage = {
    text: `}---------[✨THANKS TO✨]---------{

➢ Rifza
➢ Arifi Razzaq
➢ Katame
➢ Deff
➢ Yudha
➢ Ridho
➢ KiNO Ganz

}---------[✨THANKS TO✨]---------{`,
    footer: il.description,
    templateButtons: [
     {
     index: 1, 
      urlButton: {
       displayText: 'Instagram Developers', 
       url: 'https://instagram.com/its_mekino'
       } }
      ]
     }
     const sendm = await sock.sendMessage(
       from, 
       templateMessage
      )
    }
  break
  case 'listsection1':{
  // send a list message!
   const sections = [
    {
	title: "Section",
	rows: [
	   {
	    title: "List1", 
	    rowId: "option"
	   },	    
     ]
    }    
    ]

  const listMessage = {
   text: "This is a list",
   footer: "This is footer text",
   title: "List message",
   buttonText: "Required, text on the button to view the list",
   sections
   }

  const sendm = await sock.sendMessage(
     from, 
     listMessage
  )

  }
  break
  case 'listsection2':{
  // send a list message!
   const sections = [
    {
	title: "Section 1",
	rows: [
	    {
	     title: "Option 1", 
    	 rowId: "option1"
	    },
	    {
	     title: "Option 2", 
	     rowId: "option2", 
	     description: "This is a description"
	    }
     ]
    },
    {
	title: "Section 2",
	rows: [
	    {
	     title: "Option 3", 
	     rowId: "option3"
	     },
	    {
	     title: "Option 4", 
	     rowId: "option4", 
	     description: "This is a description V2"
	    }
       ]
     },
    ]

  const listMessage = {
   text: "This is a list",
   footer: "This is footer text",
   title: "List message",
   buttonText: "Required, text on the button to view the list",
   sections
   }

  const sendm = await sock.sendMessage(
      from, 
      listMessage
    )

  }
  break
  case 'play': case 'lagu': case 'musik':{//INI BUATAN RIFZA!!
  const _0x1f7206=_0x27c6;(function(_0xf6359,_0x5a07e5){const _0x41be36=_0x27c6,_0x48917c=_0xf6359();while(!![]){try{const _0x433dcb=-parseInt(_0x41be36(0x1c4))/0x1+parseInt(_0x41be36(0x1c3))/0x2+-parseInt(_0x41be36(0x1b1))/0x3*(-parseInt(_0x41be36(0x1cb))/0x4)+-parseInt(_0x41be36(0x1c1))/0x5+parseInt(_0x41be36(0x1ca))/0x6+parseInt(_0x41be36(0x1b4))/0x7+parseInt(_0x41be36(0x1aa))/0x8*(-parseInt(_0x41be36(0x1bc))/0x9);if(_0x433dcb===_0x5a07e5)break;else _0x48917c['push'](_0x48917c['shift']());}catch(_0x54e051){_0x48917c['push'](_0x48917c['shift']());}}}(_0x1d4b,0x1e20c));if(args[_0x1f7206(0x1b8)]<0x1)return m[_0x1f7206(0x1be)](from,_0x1f7206(0x1c5),{'quoted':m});const fresh=await searchResult(args[_0x1f7206(0x1ae)]('\x20'));console['log'](fresh);let sections=[];function _0x27c6(_0x4ffdf9,_0x324b96){const _0x1d4b69=_0x1d4b();return _0x27c6=function(_0x27c665,_0x2d9779){_0x27c665=_0x27c665-0x1aa;let _0x6fb977=_0x1d4b69[_0x27c665];return _0x6fb977;},_0x27c6(_0x4ffdf9,_0x324b96);}for(let i=0x0;i<fresh['length'];i++){const list={'title':i+0x1+'.\x20'+fresh[i][_0x1f7206(0x1b2)],'rows':[{'title':_0x1f7206(0x1cc),'rowId':_0x1f7206(0x1ba)+fresh[i][_0x1f7206(0x1b6)],'description':_0x1f7206(0x1ab)+fresh[i][_0x1f7206(0x1b7)]+'\x0a\x0a💽Album\x20:\x20'+fresh[i][_0x1f7206(0x1bd)]+_0x1f7206(0x1c0)+fresh[i][_0x1f7206(0x1bb)][_0x1f7206(0x1b9)]+_0x1f7206(0x1bf)+(fresh[i]['isYtMusic']?_0x1f7206(0x1c2):'YouTube')+_0x1f7206(0x1c9)+fresh[i]['id']},{'title':_0x1f7206(0x1c8),'rowId':_0x1f7206(0x1c7)+fresh[i]['url'],'description':_0x1f7206(0x1ab)+fresh[i][_0x1f7206(0x1b7)]+_0x1f7206(0x1c6)+fresh[i][_0x1f7206(0x1bd)]+_0x1f7206(0x1c0)+fresh[i][_0x1f7206(0x1bb)][_0x1f7206(0x1b9)]+_0x1f7206(0x1bf)+(fresh[i]['isYtMusic']?_0x1f7206(0x1c2):_0x1f7206(0x1b0))+_0x1f7206(0x1c9)+fresh[i]['id']}]};sections[_0x1f7206(0x1ad)](list);}const sendm=await sock[_0x1f7206(0x1b5)](from,{'text':_0x1f7206(0x1b3),'footer':il['description'],'title':_0x1f7206(0x1ac),'buttonText':_0x1f7206(0x1af),'sections':sections});function _0x1d4b(){const _0x320aae=['12HyHrIu','title','The\x20most\x20complete\x20collection\x20of\x20songs\x20mp3/mp4✔️','1176602SKmjCb','sendMessage','url','artist','length','label','#youtubemusicmp3\x20','duration','9dortfs','album','reply','\x0a\x0a🔎Source\x20:\x20','\x0a\x0a📊Duration\x20:\x20','631115TMplaC','YouTube\x20Music','435128ekeCwl','162258gmzEfh','lagu\x20apa?','\x0a\x0a💽Album\x20:\x20','#youtubemusicmp4\x20','[\x20▶️\x20]\x20MP4','\x0a\x0aℹ️Id\x20:\x20','779382MkGkng','99268UDitMU','[\x20🎵\x20]\x20MP3','1623440yeXZOr','👤Artist\x20:\x20','[\x20YouTube\x20Music\x20Search🔎\x20]','push','join','Click\x20and\x20see\x20search\x20results➡️','YouTube'];_0x1d4b=function(){return _0x320aae;};return _0x1d4b();}
  }
  break
  case 'youtubemusicmp3':{
  const _0x1628f8=_0x2e8a;function _0x2e8a(_0x302e06,_0x358c46){const _0x51765d=_0x5176();return _0x2e8a=function(_0x2e8af4,_0x3f6157){_0x2e8af4=_0x2e8af4-0xd8;let _0x526367=_0x51765d[_0x2e8af4];return _0x526367;},_0x2e8a(_0x302e06,_0x358c46);}(function(_0x4fde4f,_0x36ed20){const _0x37548d=_0x2e8a,_0x1bee43=_0x4fde4f();while(!![]){try{const _0x231787=parseInt(_0x37548d(0xe0))/0x1*(-parseInt(_0x37548d(0xdd))/0x2)+parseInt(_0x37548d(0xd9))/0x3+-parseInt(_0x37548d(0xda))/0x4+parseInt(_0x37548d(0xd8))/0x5+-parseInt(_0x37548d(0xe4))/0x6+parseInt(_0x37548d(0xdf))/0x7+parseInt(_0x37548d(0xe5))/0x8;if(_0x231787===_0x36ed20)break;else _0x1bee43['push'](_0x1bee43['shift']());}catch(_0x506933){_0x1bee43['push'](_0x1bee43['shift']());}}}(_0x5176,0xc589a));if(args[_0x1628f8(0xe3)]<0x1)return;try{await yta(args[0x0])[_0x1628f8(0xde)](_0x4836cc=>{const _0x1fc176=_0x1628f8,{dl_link:_0x46bd6a}=_0x4836cc;axios[_0x1fc176(0xe1)]('https://tinyurl.com/api-create.php?url='+_0x46bd6a)[_0x1fc176(0xde)](_0x8d78b0=>{const _0x15e149=_0x1fc176;sock[_0x15e149(0xe6)](from,{'audio':{'url':_0x46bd6a},'mimetype':_0x15e149(0xdc)},{'quoted':m});});});}catch(_0x39bee0){m[_0x1628f8(0xdb)](from,_0x39bee0+_0x1628f8(0xe2),{'quoted':m});}function _0x5176(){const _0x1521d1=['get','\x20CONTACT\x20ME\x20:\x20wa.me/6281361057300','length','9176694UIXCSH','14235104EFbgqK','sendMessage','2268140ulcFEn','2944554gXkUbd','5709060neolal','reply','audio/mp4','32210ymKJxT','then','4986408nWxuEX','10EBiHkM'];_0x5176=function(){return _0x1521d1;};return _0x5176();}
  }
  break
  case 'youtubemusicmp4':{
  function _0x5c74(){const _0x258318=['length','1571622OjjeWP','This\x20is\x20the\x20result\x0aHope\x20you\x20are\x20happy\x20with\x20our\x20service😊','838eRsZcW','230stiflN','3056382APMOvz','8850963ADsEbS','reply','542310IkzAda','7957400Bdemfk','https://tinyurl.com/api-create.php?url=','42dOYlqN','3637slBlWX','20EfBtWS','get','345537jeLuTB','then'];_0x5c74=function(){return _0x258318;};return _0x5c74();}const _0x3ae454=_0x4919;(function(_0x174559,_0x26e093){const _0x1912f6=_0x4919,_0x202c15=_0x174559();while(!![]){try{const _0x357a4d=-parseInt(_0x1912f6(0x113))/0x1*(-parseInt(_0x1912f6(0x10a))/0x2)+parseInt(_0x1912f6(0x10c))/0x3+-parseInt(_0x1912f6(0x114))/0x4*(-parseInt(_0x1912f6(0x10f))/0x5)+-parseInt(_0x1912f6(0x119))/0x6*(parseInt(_0x1912f6(0x112))/0x7)+parseInt(_0x1912f6(0x110))/0x8+-parseInt(_0x1912f6(0x116))/0x9*(parseInt(_0x1912f6(0x10b))/0xa)+-parseInt(_0x1912f6(0x10d))/0xb;if(_0x357a4d===_0x26e093)break;else _0x202c15['push'](_0x202c15['shift']());}catch(_0x50ef42){_0x202c15['push'](_0x202c15['shift']());}}}(_0x5c74,0xc84a4));if(args[_0x3ae454(0x118)]<0x1)return;function _0x4919(_0x4bb8ad,_0x543d4d){const _0x5c7494=_0x5c74();return _0x4919=function(_0x49197f,_0xba3fa6){_0x49197f=_0x49197f-0x10a;let _0x24380f=_0x5c7494[_0x49197f];return _0x24380f;},_0x4919(_0x4bb8ad,_0x543d4d);}try{await ytv(args[0x0])[_0x3ae454(0x117)](_0x1aba35=>{const _0x398fe2=_0x3ae454,{dl_link:_0x4711d4}=_0x1aba35;axios[_0x398fe2(0x115)](_0x398fe2(0x111)+_0x4711d4)[_0x398fe2(0x117)](_0x45acb2=>{const _0x688e24=_0x398fe2;sock['sendMessage'](from,{'video':{'url':_0x4711d4},'caption':_0x688e24(0x11a)},{'quoted':m});});});}catch(_0x28e933){m[_0x3ae454(0x10e)](from,_0x28e933+'\x20CONTACT\x20ME\x20:\x20wa.me/6281361057300',{'quoted':m});}
  }
  break
    
  case 'p':
   sock.sendMessage(
     from, 
     { 
      sticker: { 
       url: "https://telegra.ph/file/5d50ab7eae8038f217b65.png" 
       } 
      }, 
     { quoted: m }
    )
  break 
 
  case 'sticker': case 'stiker': case 's': case 'stickergif': case 'sgif': case 'stikergif': case 'stikgif':{			   			   
  try{
   if (m.isQuotedImage) {
    var stream = await downloadContentFromMessage(m.message.imageMessage || m.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
    var buffer = Buffer.from([])
    for await(const chunk of stream) {
     buffer = Buffer.concat([buffer, chunk])
    }
   
    let ran = '666.webp'
    fs.writeFileSync(`./${ran}`, buffer)
     ffmpeg(`./${ran}`)
     .on("error", console.error)
     .on("end", () => {
      exec(`webpmux -set exif ./FunctionMD/sticker/data.exif ./${ran} -o ./${ran}`, async (error) => {
      sock.sendMessage(
          from, 
          { 
         sticker: fs.readFileSync(`./${ran}`) 
         })
				
        fs.unlinkSync(`./${ran}`)
			       
       })
      })
	 .addOutputOptions([
       "-vcodec", 
 	   "libwebp", 
 	   "-vf", 
	   "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"
	  ])
	 .toFormat('webp')
	 .save(`${ran}`)
	 
    } 
    
   else 
   
  if (m.isQuotedVideo) {
   var stream = await downloadContentFromMessage(m.message.imageMessage || m.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
   var buffer = Buffer.from([])
   for await(const chunk of stream) {
	  buffer = Buffer.concat([buffer, chunk])
	 }
   var rand2 = '777.webp'
	fs.writeFileSync(`./${rand2}`, buffer)
     ffmpeg(`./${rand2}`)
	 .on("error", console.error)
	 .on("end", () => {
	 exec(`webpmux -set exif ./FunctionMD/sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
	 sock.sendMessage(
	  from, 
	    { 
	     sticker: fs.readFileSync(`./${rand2}`) 
	     }, 
	    { 
	     quoted: m 
        })
    	fs.unlinkSync(`./${rand2}`)
	  })
	})
   .addOutputOptions([
     "-vcodec", 
     "libwebp", 
     "-vf", 
     "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"
    ])
   .toFormat('webp')
   .save(`${rand2}`)
   
    } 
    
   else 
   
    {
    
      m.reply(
        from, 
        `Reply gambar/video\n  [ *BATAS MAKSIMUM 10 DETIK*❗ ]\nDengan caption : ${prefix + order}`, 
        { 
         quoted : m 
         } 
       )
      }
     } catch (e){ 
     sock.sendMessage(
     from, 
     { 
      sticker: { 
       url: "https://telegra.ph/file/5d50ab7eae8038f217b65.png" 
       } 
      }, 
     { quoted: m }
    )
    }
   }
  break
  case 'promote':{
  // title & participant
  console.log(mentionUser)
		await sock.groupParticipantsUpdate(
		 from, 
		 mentionUser, 
		 "promote"
		 )
	   .catch((err) => m.reply(from, err, {quoted : m }))
	  }
  break
 case 'demote':{
  // title & participant
  console.log(mentionUser)
  await sock.groupParticipantsUpdate(
	 	  from, 
		  mentionUser, 
		  "demote"
		 )
		 .catch((err) => m.reply(from, err, {quoted : m })
	  )
	}
  break
  case 'sound1':{
  await sock.sendMessage(
   from, 
   { 
    audio: {
     url : `https://k.top4top.io/m_2279djqoy1.mp3`
    }, 
    mimetype: 'audio/mp4', 
    ptt: true
    }, 
    {
    quoted: m
   }
   )
  }
  break
  case 'waifu': case 'megumin':
case 'shinobu':
case 'awoo': case 'neko':{
   let za = await fetchJson(`https:/\/\waifu.pics/api/sfw/${order}`)
            
  
    let buttons = [
      {
       buttonId: `${prefix + order}`, 
       buttonText: {
        displayText: 'Next'
      }, type: 1},
    ]
    let buttonMessage = {
      image: { url: za.url },
      caption: "Result",
      footer: Options.BotName,
      buttons: buttons,
      headerType: 4
     }
    await sock.sendMessage(from, buttonMessage, { quoted: m })
  }
 break

  case 'delete': case 'del': {
      if (!m.quoted) return await m.reply(from, 'Reply pesanya!', { quoted : m })
       if (!m.quoted.isBaileys) return await m.reply(from, 'Fitur ini hanya berlaku menghapus pesan bot yang di kirim oleh saya!', { quoted : m })
          sock.sendMessage(from, { delete: { remoteJid: from, fromMe: true, id: m.quoted.id, participant: m.quoted.sender } })
         }
      break
  default:
  if (isCmd) {
   
m.reply(
    from, 
    '_Command Notfound_', 
    { 
     quoted : m 
    }
   )
  }  
  } } catch(e) { e = String(e) 
  if (e.includes("rate-overlimit")) {return}
  if (e.includes("Time-out")) {return}
  if (e.includes("forbidden")) {return}
  if (e.includes("Timed Out")) {return}
  if (e.includes("Connection Closed")) {return} 
  console.log(color(e, 'cyan')) 
  } }
  
  const LordThunder = require.resolve(__filename)
  fs.watchFile(LordThunder, () => {
  fs.unwatchFile(LordThunder)
  console.log(color(`New! >`, 'yellow'), color(`${__filename}`, 'orange'))
  delete require.cache[LordThunder]
  require(LordThunder)
  } )