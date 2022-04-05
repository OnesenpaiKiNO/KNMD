 "use strict";
 const proces = require('process') 
 proces.on('uncaughtException', console.error)
 
 const { 
 default: 
   makeWASocket,
   useSingleFileAuthState,
   DisconnectReason,
   fetchLatestBaileysVersion,
   makeInMemoryStore,
   jidDecode
 } = require('@adiwajshing/baileys');

 const { Boom } = require('@hapi/boom')   
 const fs = require('fs')      
 const pino = require ('pino'); 
 const CFonts = require('cfonts');
 const Options = require('./FunctionMD/settings/options.js')
 const { info } = Options
 const { color, bgcolor, ConsoleLog, getBuffer } = require('./FunctionMD/function.js')
 const { state, saveState } = useSingleFileAuthState('./storage/database/session/session.json');    
 const { groupResponse } = require('./FunctionMD/response/group.js')
 const { move } = require('./FunctionMD/base/mybase')
 const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
 

 
 try{
 async function connectToWhatsApp () {
 function _0x5e2a(){
 const _0x5f07f2=[
 'chrome',
 '3153035BxQyma',
 '18yPFPWD',
 'black',
 '9618256ozefzf',
 '190338armWzD',
 '83382yMoBRU',
 'botName',
 '3997224klekBU',
 'ownerName',
 '7voRRCw',
 'blackBright',
 '714260FAdPZQ',
 '8ydroAD',
 'Arifi\x20Razzaq',
 '490zKKGXY',
 '5.4',
 'Safari',
 '371096beNZON',
 'console'];
 _0x5e2a=function(){
 return _0x5f07f2;
 };
 return _0x5e2a();
 }
 const _0x2534d0=_0x1623;
 function _0x1623(_0x1b9ba0,_0x37b2b9){
 const _0x5e2ab=_0x5e2a();
 return _0x1623=function(_0x162392,_0x43b8ba){
 _0x162392=_0x162392-0x81;
 let _0x24c36e=_0x5e2ab[_0x162392];
 return _0x24c36e;
 },_0x1623(_0x1b9ba0,_0x37b2b9);
 }(function(_0x4917c8,_0xd53e8f){
 const _0xbb9238=_0x1623,_0x1254d2=_0x4917c8();
 while(!![]){
 try {
 const _0x4c180b=-parseInt(_0xbb9238(0x88))/0x1+-parseInt(_0xbb9238(0x81))/0x2*(parseInt(_0xbb9238(0x92))/0x3)+parseInt(_0xbb9238(0x89))/0x4*(-parseInt(_0xbb9238(0x91))/0x5)+-parseInt(_0xbb9238(0x82))/0x6*(parseInt(_0xbb9238(0x86))/0x7)+parseInt(_0xbb9238(0x94))/0x8+parseInt(_0xbb9238(0x84))/0x9+-parseInt(_0xbb9238(0x8b))/0xa*(-parseInt(_0xbb9238(0x8e))/0xb);
 if(_0x4c180b===_0xd53e8f)
 break;
 else _0x1254d2['push'](_0x1254d2['shift']());
 } catch(_0x2b04bd){
 _0x1254d2['push'](_0x1254d2['shift']());
 }
   }
     } (_0x5e2a,0xb4719),setTimeout(()=>{
 const _0x54e8bb=_0x1623;
 CFonts['say'](info[_0x54e8bb(0x83)],{
 'font':_0x54e8bb(0x90),
 'align':'center',
 'colors':[_0x54e8bb(0x93)],
 'background':_0x54e8bb(0x87),
 'letterSpacing':0x1,
 'space':!![]}),
 CFonts['say'](info[_0x54e8bb(0x85)],{
 'font':_0x54e8bb(0x8f),
 'align':'center',
 'colors':['white'],
 'background':'transparent',
 'letterSpacing':0x1,
 'space':!![]
 });
 },0x1388));
 const {version}=await fetchLatestBaileysVersion(),sock=makeWASocket({
 'logger':pino({
 'level':'silent'}),
 'printQRInTerminal':!![],
 'browser':[_0x2534d0(0x8a),_0x2534d0(0x8d),_0x2534d0(0x8c)],
 'auth':state,
 'version':version
 });
 store.bind(sock.ev) 
 sock.decodeJid = (jid) => {
    if (!jid) return jid
    if (/:\d+@/gi.test(jid)) {
        let decode = jidDecode(jid) || {}
          return decode.user && decode.server && decode.user + '@' + decode.server || jid
        } else return jid
    }
 sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect } = update

      if (connection === 'connecting'){
             console.log('[ INF ]', update) 
             }                         	             
       if (connection === 'close') {
         let messageconnect = new Boom(lastDisconnect?.error)?.output.statusCode
            if (messageconnect === DisconnectReason.badSession) { 
               console.log(`Sorry, it looks like the session file is disabled. Please re-scan🙏`)      
               sock.logout();         
              } else if (messageconnect === DisconnectReason.connectionClosed) { 
               console.log("Connection lost, trying to reconnect🔄"); 
               connectToWhatsApp(); 
              } else if (messageconnect === DisconnectReason.connectionReplaced) { 
               console.log("Another connection is replaced, please close this connection first");    
               sock.logout();           
              } else if (messageconnect === DisconnectReason.restartRequired) { 
               console.log("An error occurred, reconnecting🔄"); 
               connectToWhatsApp();
              } else if (messageconnect === DisconnectReason.connectionLost) { 
               console.log("Connection lost from the web, trying to reconnect🔄"); 
               connectToWhatsApp();               
              } else if (messageconnect === DisconnectReason.loggedOut) { 
              console.log(`Device is out, please re-scan🔄`);    
              sock.logout();               
              } else if (messageconnect === DisconnectReason.timedOut) { 
               console.log("Connection reached the limit, please reload🔄"); 
               connectToWhatsApp(); 
             } else sock.end(`Reason : ${messageconnect}|${connection}`)
           }                         
        })
        
 sock.ev.on('creds.update', saveState);  
 
 store.bind(sock.ev)  
 
  sock.ev.on('messages.upsert', async ({ messages }) => {
  
    const m = messages[0];        
    const from = m.key.remoteJid

    await move(sock, m, store)
    require('./FunctionMD/message/Thunder-XM_Multi-Device.js')(sock, m)           
    
      await sock.sendPresenceUpdate('composing', from)    
  })
  
  sock.ev.on('group-participants.update', async (update) =>{
   groupResponse(sock, update)
   console.log(update)
   })         
 /*
 * Run main file;
 */
  }
 connectToWhatsApp()
 
 } catch(e) { 
  e = String(e) 
  console.log(e)
 }
 const LordThunder = require.resolve(__filename)
 fs.watchFile(LordThunder, () => {
 fs.unwatchFile(LordThunder)
 console.log(color(`New! >`, 'yellow'), color(`${__filename}`, 'orange'))
 delete require.cache[LordThunder]
 require(LordThunder)
 } )