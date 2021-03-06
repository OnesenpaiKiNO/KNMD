const { getBuffer } = require('../function.js')
const groupResponse = async (sock, update) => {
/**
@ { Masih polos, jadi tolong bagusin }
**/
const metadata = await sock.groupMetadata(update.id)   
   for (let participant of update.participants) {
    let fkontak = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(update.jid ? { remoteJid: '6283136505591-1604595598@g.us' } : {})}, message: { "contactMessage":{"displayName": `${metadata.subject}`,"vcard":`BEGIN:VCARD\nVERSION:3.0\nN:2;rifza;;;\nFN:rifza\nitem1.TEL;waid=6287708357324:6287708357324\nitem1.X-ABLabel:Mobile\nEND:VCARD` }}}
    try{
            let metadata = await sock.groupMetadata(update.id)
            let participants = update.participants
            for (let num of participants) {
                // Get Profile Picture User
                try {
                    ppuser = await sock.profilePictureUrl(num, 'image')
                } catch {
                    ppuser = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
                }

                // Get Profile Picture Group
                try {
                    ppgroup = await sock.profilePictureUrl(update.id, 'image')
                } catch {
                    ppgroup = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
                }

                if (update.action == 'add') {
                var button = [{ buttonId: `#menu`, buttonText: { displayText: `LIST MENU` }, type: 1 }, { buttonId: `#owner`, buttonText: { displayText: `OWNER BOT` }, type: 1 }]
                sock.sendMessage(update.id, { caption: `*Welcome to ${metadata.subject} @${num.split("@")[0]}*\n\n*Jangan lupa baca deskripsi grup yaa*`, location: { jpegThumbnail: await getBuffer(ppuser) }, buttons: button, footer: 'KN-BOT', mentions: [num] })
                } else if (update.action == 'remove') {
                var button = [{ buttonId: `#menu`, buttonText: { displayText: `LIST MENU` }, type: 1 }, { buttonId: `#owner`, buttonText: { displayText: `OWNER BOT` }, type: 1 }]
                sock.sendMessage(update.id, { caption: `*@${num.split("@")[0]} Keluar Dari Group ${metadata.subject}*`, location: { jpegThumbnail: await getBuffer(ppuser) }, buttons: button, footer: 'KN-BOT', mentions: [num] })
                }
            }
        } catch (err) {
            console.log(err)
        }
        }
   
}
module.exports = { groupResponse }  
