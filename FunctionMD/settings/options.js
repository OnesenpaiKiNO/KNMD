 const { color } = require('../function.js')
 const packM = require('../../package.json')
 const fs = require('fs')

 module.exports = {
 info: {
   owner: ["6289602518223@s.whatsapp.net"], //ubah owner disini
   ownerName: packM.author,
   botName: packM.name,
   footerText_: packM.description, 
   version: packM.version
   },
  }
  
  const LordThunder = require.resolve(__filename)
  fs.watchFile(LordThunder, () => {
  fs.unwatchFile(LordThunder)
  console.log(color(`New! >`, 'yellow'), color(`${__filename}`, 'orange'))
  delete require.cache[LordThunder]
  require(LordThunder)
  } )