require('./admin.js')
const {
 default: makeWASocket,
useSingleFileAuthState,
DisconnectReason,
getContentType,
WAProto,
downloadContentFromMessage,
prepareWAMessageMedia,
MediaType,
generateWAMessageFromContent,
proto,
WA_DEFAULT_EPHEMERAL
 } = require('@adiwajshing/baileys')
 const fs = require('fs')
 const P = require('pino')
 const qrcode = require('qrcode-terminal')
 const moment = require('moment-timezone')
 const util = require('util')
 const time = moment().tz('America/Sao_Paulo').format("HH:mm:ss")
 //const yts = require("yt-search")
 const execute = util.promisify(require('child_process').exec)
 const axios = require("axios");
 const cheerio = require("cheerio");
 const {
exec
 } = require('child_process')
 const {
Youtube
 } = require('ytdownloader.js')
 const mimetype = require('mime-types')
 const linkfy = require('linkifyjs')
 const cfonts = require('cfonts')

const banner = cfonts.render(('AYUMI|ONLINE'), {
    font: 'chrome',
    align: 'center',
	colors: ['yellow', '#BC0000','green'],   
    lineHeight: 1
});

 //FUNC

 const {
color,
bgcolor
 } = require('./ƒυηçσєs/color')
 const {
yta,
ytv
 } = require('./ƒυηçσєs/y2mate')
 const {
TelegraPh
 } = require('./ƒυηçσєs/uploader')
 const {
educar_IA,
resposta_IA
 } = require('./ƒυηçσєs/ia.js');
 const {
imageToWebp,
videoToWebp,
writeExifImg,
writeExifVid
 } = require('./ƒυηçσєs/exif')
 const {
fetchJson,
fetchText,
getRandom,
getBuffer
 } = require('./ƒυηçσєs/¿')
 const logos = require("./ƒυηçσєs/mintake");
 const scraper = require("./ƒυηçσєs/apis_ofc");
 const xfar = require('./ƒυηçσєs/apis2');
 const hxz = require('./ƒυηçσєs/apis');
 const usedCommandRecently = new Set()

 //DB

 const {
state,
saveState
 } = useSingleFileAuthState('./cσηєxασ/conn.json')

 const ia_db = JSON.parse(fs.readFileSync('./∂αтαвαsє/ia/2/ia.json'));
 const _bv = JSON.parse(fs.readFileSync('./∂αтαвαsє/_bv.json'))
 const _seminternacional = JSON.parse(fs.readFileSync('./∂αтαвαsє/_seminternacional.json'))
 const _semlinked = JSON.parse(fs.readFileSync('./∂αтαвαsє/_semlinked.json'))
 const _cmdtotal = JSON.parse(fs.readFileSync('./∂αтαвαsє/totalcmd.json'))
 const antispamcmd = JSON.parse(fs.readFileSync('./∂αтαвαsє/_semspam.json'))

 const {
cmdadd
 } = require('./ƒυηçσєs/totalcmd.js')

 global.api = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name]: name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({
...query, ...(apikeyqueryname ? {
 [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name]: name]
}: {})
 })): '')

 const connectToWA = () => {
const conn = makeWASocket({
 logger: P({
level: 'silent'
 }),
browser: ['ayumi Multi Device', 'Safari', '1.0.0'],
 printQRInTerminal: true,
 auth: state,
})

conn.ev.on('connection.update', (update) => {
 const {
connection, lastDisconnect
 } = update
 if (connection === 'close') {
if (lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
 connectToWA()
}
 } else if (connection === 'open') {
console.log(banner.string)
console.log(color('BY BRENO/SAYO', 'purple'))
console.log(color(`MANDE UM PIX DE QUALQUER VALOR PARA AJUDAR NO PROJETO :)\n`, 'red'))
console.log(color(`PIX : \n\nTELEFONE\n\n62936180708\n\nFABIO BRENO ******* *****`, 'gold'))
 }
})

conn.ev.on('creds.update',
 saveState)

conn.ev.on('messages.upsert',
 async m => {
try {
 const mek = m.messages[0]
 await conn.sendReadReceipt(mek.key.remoteJid, mek.key.participant, [mek.key.id])
 if (!mek.key.participant) mek.key.participant = mek.key.remoteJid
 mek.key.participant = mek.key.participant.replace(/:[0-9]+/gi, "")
 if (!mek.message) return
 const fromMe = mek.key.fromMe
 const content = JSON.stringify(mek.message)
 const from = mek.key.remoteJid
 const type = Object.keys(mek.message).find((key) => !["senderKeyDistributionMessage", "messageContextInfo"].includes(key))

 const body = (type === "conversation" &&
mek.message.conversation.startsWith(prefix)) ?
 mek.message.conversation: (type == "imageMessage") &&
 mek.message[type].caption.startsWith(prefix) ?
 mek.message[type].caption: (type == "videoMessage") &&
 mek.message[type].caption.startsWith(prefix) ?
 mek.message[type].caption: (type == "extendedTextMessage") &&
 mek.message[type].text.startsWith(prefix) ?
 mek.message[type].text: (type == 'buttonsResponseMessage') ? mek.message.buttonsResponseMessage.selectedButtonId:
 (type == "listResponseMessage") &&
 mek.message[type].singleSelectReply.selectedRowId ?
 mek.message.listResponseMessage.singleSelectReply.selectedRowId: (type == "templateButtonReplyMessage") ?
 mek.message.templateButtonReplyMessage.selectedId: (type === "messageContextInfo") ?
 mek.message[type].singleSelectReply.selectedRowId: (type == "conn.sendMessageButtonMessage") &&
 mek.message[type].selectedButtonId ?
 mek.message[type].selectedButtonId: (type == "stickerMessage") && ((mek.message[type].fileSha256.toString("base64")) !== null && (mek.message[type].fileSha256.toString("base64")) !== undefined) ? (mek.message[type].fileSha256.toString("base64")): ""
 const budy = (type === "conversation") ?
 mek.message.conversation: (type === "extendedTextMessage") ?
 mek.message.extendedTextMessage.text: ""
 const bady = mek.message.conversation ? mek.message.conversation: mek.message.imageMessage ? mek.message.imageMessage.caption: mek.message.videoMessage ? mek.message.videoMessage.caption: mek.message.extendedTextMessage ? mek.message.extendedTextMessage.text: (mek.message.listResponseMessage && mek.message.listResponseMessage.singleSelectReply.selectedRowId) ? mek.message.listResponseMessage.singleSelectReply.selectedRowId: ''
 const bidy = bady.toLowerCase()
 const selectedButton = (type == 'buttonsResponseMessage') ? mek.message.buttonsResponseMessage.selectedButtonId: ''
 const argsButton = selectedButton.trim().split(/ +/)
 const isCmd = body.startsWith(prefix)
 const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase(): ''

 const isMedia = (type === 'imageMessage' || type === 'videoMessage')
 const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
 const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
 const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
 const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')

 const args = body.trim().split(/ +/).slice(1)
 const q = args.join(' ')
 const isGroup = from.endsWith('@g.us')
 const sender = mek.key.fromMe ? (conn.user.id.split(':')[0]+'@s.whatsapp.net' || conn.user.id): (mek.key.participant || mek.key.remoteJid)
 const senderNumber = sender.split('@')[0]
 const botNumber = conn.user.id.split(':')[0]
 const pushname = mek.pushName || 'sem nome'
 const groupMetadata = isGroup ? await conn.groupMetadata(from).catch(e => {}): ''
 const groupName = isGroup ? groupMetadata.subject: ''
 const participants = isGroup ? await groupMetadata.participants: ''
 const groupAdmins = isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id): ''
 const groupOwner = isGroup ? groupMetadata.owner: ''
 const isBotAdmins = isGroup ? groupAdmins.includes(botNumber): false
 const isAdmins = isGroup ? groupAdmins.includes(sender): false
 const isAntiSpamcmd = antispamcmd.includes('Ativado')
 const groupMembers = isGroup ? groupMetadata.participants: ''

 //ATIVAÇÃO

 const IA = isGroup ? ia_db.includes(from): false
 const isBv = isGroup ? _bv.includes(from): false
 const isInt = isGroup ? _seminternacional.includes(from): false
 const is_semlinked = isGroup ? _semlinked.includes(from): false


 const isMe = botNumber.includes(senderNumber)
 const isOwner = coderNumero.includes(senderNumber) || isMe


 conn.ev.on('group-participants.update', async (num) => {
const mdata = await conn.groupMetadata(num.id)
const time = moment.tz('America/Sao_Paulo').format('DD/MM HH:mm:ss')
const pushname = num.id

if (_seminternacional.includes(num.id) && !isBotAdmins) {
 if (num.action === 'add' && !num.participants[0].startsWith(55)) {
await conn.sendMessage(mdata.id, {
 video: fs.readFileSync('./semfake.mp4'),
 gifPlayback: true,
 caption: 'Olá número fake, você não é permitido aqui, saia agora para própria segurança'
})
conn.groupParticipantsUpdate(mdata.id, [num.participants[0]], 'remove')
return
 }
}
if (!_bv.includes(num.id)) return
try {
 try {
ppimg = await conn.profilePictureUrl(num.participants[0])
 } catch {
ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
 }
 try {
ppgp = await conn.profilePictureUrl(mdata.id)
 } catch {
ppgp = 'https://image.flaticon.com/icons/png/512/124/124034.png'
 }
 if (num.action === 'add') {
let buff = await getBuffer(ppimg)
ran = getRandom('.jpg')
await fs.writeFileSync(ran, buff)
const uploadpp = await TelegraPh(ran)
fs.unlinkSync(ran)

let buff2 = await getBuffer(ppgp)
ranak = getRandom('.jpg')
await fs.writeFileSync(ranak, buff2)
const uploadypp = await TelegraPh(ranak)
fs.unlinkSync(ranak)
imgbuff = await getBuffer(`https://akamev2-api.herokuapp.com/api/card/welcomev2?nome=${num.participants[0].split('@')[0]}&nomegp=BEM%20VINDO%20AO%20${encodeURI(mdata.subject)}&titulo=BEM%20VINDO&membros=666&cor=ff0000&tcor=ff0000&lcor=ff0000&perfil=${util.format(upload)}&fundo=https://telegra.ph/file/14c9a6ce9c4e3e43a8ee1.jpg&numero=666&apikey=${keyofc}`)
conn.sendMessage(mdata.id, {
 image: imgbuff, mentions: num.participants, caption: `@${num.participants[0].split('@')[0]} bem vindo(a)`
})
 } else if (num.action === 'remove') {
mem = num.participants[0]
try {
 ppimg = await conn.profilePictureUrl(num.participants[0])
} catch {
 ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
}
try {
 ppgp = await conn.profilePictureUrl(mdata.id)
} catch {
 ppgp = 'https://image.flaticon.com/icons/png/512/124/124034.png'
}
let buff = await getBuffer(ppimg)
ran = getRandom('.jpg')
fs.writeFileSync(ran, buff)
const upload = await TelegraPh(ran)

let buff2 = await getBuffer(ppgp)
ranak = getRandom('.jpg')
await fs.writeFileSync(ranak, buff2)
const uploadypp = await TelegraPh(ranak)
fs.unlinkSync(ranak)
imgbuff = await getBuffer(`https://akamev2-api.herokuapp.com/api/card/goodbyev2?nome=${num.participants[0].split('@')[0]}&nomegp=SAIU DE ${encodeURI(mdata.subject)}&titulo=ADEUS&membros=666&cor=ff0000&tcor=ff0000&lcor=ff0000&perfil=${util.format(upload)}&fundo=https://telegra.ph/file/14c9a6ce9c4e3e43a8ee1.jpg&numero=666&apikey=${keyofc}`)
conn.sendMessage(mdata.id, {
 image: imgbuff, mentions: num.participants, caption: `adeus 👋`
})
fs.unlinkSync(ran)

 }
} catch (e) {
 console.log(e);
}
 })
 const isUrl = (url) => {
if (linkfy.find(url)[0]) return true
return false
 }

 const reply = async(teks) => {
await conn.sendMessage(from, {
 text: teks
}, {
 quoted: mek
})
 }


 const isFiltered = (from) => !!usedCommandRecently.has(from)
 const addFilter = (from) => {
usedCommandRecently.add(from)
setTimeout(() => usedCommandRecently.delete(from), delayantispamcmd * 1000)
 }



 const sendListMsg = async (title, description, textButton, sections) => {
var list = WAProto.Message.fromObject({
 listMessage: WAProto.ListMessage.fromObject({
title: title,
buttonText: textButton,
description: description,
listType: 1,
sections: sections
 })
})
await conn.relayMessage(from, list, {
 messageId: mek.key.id
})
 }

 const enviarfiguimg = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path: /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64'): /^https?:\/\//.test(path) ? await (await getBuffer(path)): fs.existsSync(path) ? fs.readFileSync(path): Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
 buffer = await writeExifImg(buff, options)
} else {
 buffer = await imageToWebp(buff)
}

await conn.sendMessage(jid, {
 sticker: {
url: buffer
 }, ...options
}, {
 quoted
})
return buffer
 }

 const getExtension = async (type) => {
return await mimetype.extension(type)
 }

 const getFileBuffer = async (mediakey, MediaType) => {
const stream = await downloadContentFromMessage(mediakey, MediaType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
 buffer = Buffer.concat([buffer, chunk])
}
return buffer
 }

 const enviarfiguvid = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path: /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64'): /^https?:\/\//.test(path) ? await (await getBuffer(path)): fs.existsSync(path) ? fs.readFileSync(path): Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
 buffer = await writeExifVid(buff, options)
} else {
 buffer = await videoToWebp(buff)
}

await conn.sendMessage(jid, {
 sticker: {
url: buffer
 }, ...options
}, {
 quoted
})
return buffer
 }


 if (budy.startsWith('=>')) {
if (!isOwner) return
function Return(sul) {
 sat = JSON.stringify(sul, null, 2)
 bang = util.format(sat)
 if (sat == undefined) {
bang = util.format(sul)
 }
 return reply(bang)
}
try {
 reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
} catch (e) {
 reply(String(e))
}
 }

 if (budy.startsWith('>')) {
if (!isOwner) return
try {
 let evaled = await eval(budy.slice(2))
 if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
 await reply(evaled)
} catch (err) {
 await reply(String(err))
}
 }

 if (budy.startsWith('$')) {
if (!isOwner) return
exec(budy.slice(2), (err, stdout) => {
 if (err) return reply(err)
 if (stdout) return reply(stdout)
})
 }

 function gp(pagina) {
return new Promise((resolve, reject) => {
 axios.get(`https://grupowhatsap.com/page/${pagina}/?amp=1`).then(tod => {
const $ = cheerio.load(tod.data)
var postagem = [];
$("div.grupo").each((_, say) => {
 var _ikk = $(say).find("a").attr('href');
 var _ikkli = $(say).find("img").attr('src');
 var _ikkkkk = {
img: _ikkli,
linkk: _ikk
 }
 postagem.push(_ikkkkk)
})
resolve(postagem)
 }).catch(reject)
});
 }

 const mentions = (teks,
memberr,
id) => {
(id == null || id == undefined || id == false) ? conn.sendMessage(from,
 {
text: teks.trim(),
mentions: memberr
 }): conn.sendMessage(from,
 {
text: teks.trim(),
mentions: memberr
 })
 }
 const sendButtonMsg = async (text,
footer,
button) => {
var list = WAProto.Message.fromObject({
 buttonsMessage: WAProto.ButtonsMessage.fromObject({
contentText: text,
footerText: footer,
buttons: button,
headerType: 1
 })
})
await conn.relayMessage(from,
 list,
 {
messageId: mek.key.id
 })
 }

 /*function bio() {
setInterval(() => {
conn.updateProfileStatus(time)
}, 10 * 1000)
}
bio()
*/

 //-----<sem spam de request>-----\\
 if (isCmd && isFiltered(from) && !isGroup) {
console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mSPAM\x1b[1;37m]', `[Tempo: ${color(time)}]`, '[Spam', 'de', color(sender.split('@')[0]), 'palavras :', color(args.length)+']')
if (isAntiSpamcmd) {
 return reply(`「 ❗ 」Spam detectado. Espere ${delayantispamcmd} segundos`)
}
 }
 if (isCmd && isFiltered(from) && isGroup) {
console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mSPAM\x1b[1;37m]', `[Tempo: ${color(time)}]`, '[Spam', 'de', color(sender.split('@')[0]), 'grupo: ', color(groupName), 'palavras :', color(args.length)+']')
if (isAntiSpamcmd) {
 return reply(`「 ❗ 」Spam detectado. Espere ${delayantispamcmd} segundos`)
}
 }
 
 //================(IA-ON)=================\\

 if (IA && !isCmd && isGroup) {
if (type == 'conversation' || type == 'extendedTextMessage') {
 if (mek.key.fromMe) return
 if (type == 'extendedTextMessage' && prefix.includes(mek.message.extendedTextMessage.contextInfo.quotedMessage[0])) return
 educar_IA(type, mek)
 const ia_inity = await resposta_IA(bidy)
 console.log(resposta_IA(bidy))
 if (ia_inity) reply(ia_inity)
}
 }


 function check_semlinked() {
if (isUrl(bady) && is_semlinked && !isBotAdmins && !isAdmins) {
 reply('banido')
 kic = `${sender.split("@")[0]}@s.whatsapp.net`
 conn.groupParticipantsUpdate(from, [kic], 'remove')
}
if (isUrl(bady) && is_semlinked && !isBotAdmins && isAdmins) {
 reply('😎')
}
 }
 check_semlinked()
 if (!isGroup && isCmd && sender) console.log(`${color('╭━━━━━━━━━━━━━━━━━━━━━━━━━╮', 'gold')}\n${color('┃', 'gold')} ${color('Número:', 'yellow')} ${color(sender.split('@')[0], 'purple')}\n${color('┃', 'gold')} ${color('Nome:', 'yellow')} ${color(pushname, 'purple')}\n${color('┃', 'gold')} ${color('Horário:', 'yellow')} ${color(time, 'magenta')}\n${color('┃', 'gold')} ${color('Comando:', 'yellow')} ${color(command)}\n${color('┃', 'gold')} ${color('Palavras:', 'yellow')} ${color(budy.length, 'magenta')}\n${color('╰━━━━━━━━━━━━━━━━━━━━━━━━━╯', 'gold')}`)
 if (!isGroup && !isCmd && sender) console.log(`${color('╭━━━━━━━━━━━━━━━━━━━━━━━━━╮', 'gold')}\n${color('┃', 'gold')} ${color('Número:', 'yellow')} ${color(sender.split('@')[0], 'magenta')}\n${color('┃', 'gold')} ${color('Nome:', 'yellow')} ${color(pushname, 'purple')}\n${color('┃', 'gold')} ${color('Horário:', 'yellow')} ${color(time, 'magenta')}\n${color('┃', 'gold')} ${color('Comando:', 'yellow')} ${color('Não', 'red')}\n${color('┃', 'gold')} ${color('Palavras:', 'yellow')} ${color(budy.length, 'magenta')}\n${color('╰━━━━━━━━━━━━━━━━━━━━━━━━━╯', 'gold')}`)
 if (isGroup && isGroup && sender) console.log(`${color('╭━━━━━━━━━━━━━━━━━━━━━━━━━╮', 'gold')}\n${color('┃', 'gold')} ${color('Número:', 'yellow')} ${color(sender.split('@')[0], 'magenta')}\n${color('┃', 'gold')} ${color('Nome:', 'yellow')} ${color(pushname, 'purple')}\n${color('┃', 'gold')} ${color('Horário:', 'yellow')} ${color(time, 'magenta')}\n${color('┃', 'gold')} ${color('Comando:', 'yellow')} ${color(command)}\n${color('┃', 'gold')} ${color('Palavras:', 'yellow')} ${color(budy.length, 'magenta')}\n${color('┃', 'gold')} ${color('Grupo:', 'yellow')} ${color(groupName, 'magenta')}\n${color('╰━━━━━━━━━━━━━━━━━━━━━━━━━╯', 'gold')}`)
 if (!isGroup && isGroup && sender) console.log(`${color('╭━━━━━━━━━━━━━━━━━━━━━━━━━╮', 'gold')}\n${color('┃', 'gold')} ${color('Número:', 'yellow')} ${color(sender.split('@')[0], 'magenta')}\n${color('┃', 'gold')} ${color('Nome:', 'yellow')} ${color(pushname, 'purple')}\n${color('┃', 'gold')} ${color('Horário:', 'yellow')} ${color(time, 'magenta')}\n${color('┃', 'gold')} ${color('Comando:', 'yellow')} ${color('Não', 'red')}\n${color('┃', 'gold')} ${color('Palavras:', 'yellow')} ${color(budy.length, 'magenta')}\n${color('┃', 'gold')} ${color('Grupo:', 'yellow')} ${color(groupName, 'magenta')}\n${color('╰━━━━━━━━━━━━━━━━━━━━━━━━━╯', 'gold')}`)

 conn.readMessages([mek.key])

 if (bady.includes('triste')) {
conn.relayMessage(from, {
 reactionMessage: {
key: {
 id: mek.key,
 remoteJid: from,
 fromMe: false
},
text: '😢'
 }}, {
 messageId: mek.key
})
 }
 if (bady.includes('feliz')) {
conn.relayMessage(from, {
 reactionMessage: {
key: {
 id: mek.key,
 remoteJid: from,
 fromMe: false
},
text: '😁'
 }}, {
 messageId: mek.key
})
 }
 if (bady.includes('raiva')) {
conn.relayMessage(from, {
 reactionMessage: {
key: {
 id: mek.key,
 remoteJid: from,
 fromMe: false
},
text: '🤬'
 }}, {
 messageId: mek.key
})
 }
 if (bady.includes('sono')) {
conn.relayMessage(from, {
 reactionMessage: {
key: {
 id: mek.key,
 remoteJid: from,
 fromMe: false
},
text: '🥱'
 }}, {
 messageId: mek.key
})
 }
 if (bady.includes('durmi')) {
conn.relayMessage(from, {
 reactionMessage: {
key: {
 id: mek.key,
 remoteJid: from,
 fromMe: false
},
text: '😴'
 }}, {
 messageId: mek.key
})
 }
 if (bady.includes('comer')) {
conn.relayMessage(from, {
 reactionMessage: {
key: {
 id: mek.key,
 remoteJid: from,
 fromMe: false
},
text: '🍽️'
 }}, {
 messageId: mek.key
})
 }


 if (bady.includes('ódio')) {
conn.relayMessage(from, {
 reactionMessage: {
key: {
 id: mek.key,
 remoteJid: from,
 fromMe: false
},
text: '🤬'
 }}, {
 messageId: mek.key
})
 }
 if (bady.includes('odio')) {
conn.relayMessage(from, {
 reactionMessage: {
key: {
 id: mek.key,
 remoteJid: from,
 fromMe: false
},
text: '🤬'
 }}, {
 messageId: mek.key
})
 }
 if (bady.includes('anjo')) {
conn.relayMessage(from, {
 reactionMessage: {
key: {
 id: mek.key,
 remoteJid: from,
 fromMe: false
},
text: '😇'
 }}, {
 messageId: mek.key
})
 }
 if (bady.includes('anjinho')) {
conn.relayMessage(from, {
 reactionMessage: {
key: {
 id: mek.key,
 remoteJid: from,
 fromMe: false
},
text: '😇'
 }}, {
 messageId: mek.key
})
 }
 if (bady.includes('santo')) {
conn.relayMessage(from, {
 reactionMessage: {
key: {
 id: mek.key,
 remoteJid: from,
 fromMe: false
},
text: '😇'
 }}, {
 messageId: mek.key
})
 }
 if (bady.includes('santinho')) {
conn.relayMessage(from, {
 reactionMessage: {
key: {
 id: mek.key,
 remoteJid: from,
 fromMe: false
},
text: '😇'
 }}, {
 messageId: mek.key
})
 }
 if (bady.includes('safada')) {
conn.relayMessage(from, {
 reactionMessage: {
key: {
 id: mek.key,
 remoteJid: from,
 fromMe: false
},
text: '😏'
 }}, {
 messageId: mek.key
})
 }
 if (bady.includes('linda')) {
conn.relayMessage(from, {
 reactionMessage: {
key: {
 id: mek.key,
 remoteJid: from,
 fromMe: false
},
text: '😏'
 }}, {
 messageId: mek.key
})
 }
 if (bady.includes('bonita')) {
conn.relayMessage(from, {
 reactionMessage: {
key: {
 id: mek.key,
 remoteJid: from,
 fromMe: false
},
text: '😏'
 }}, {
 messageId: mek.key
})
 }
 if (bady.includes('bonitinha')) {
conn.relayMessage(from, {
 reactionMessage: {
key: {
 id: mek.key,
 remoteJid: from,
 fromMe: false
},
text: '😏'
 }}, {
 messageId: mek.key
})
 }
 if (bady.includes('gf')) {
conn.relayMessage(from, {
 reactionMessage: {
key: {
 id: mek.key,
 remoteJid: from,
 fromMe: false
},
text: '😏'
 }}, {
 messageId: mek.key
})
 }
 if (bady.includes('sexo')) {
conn.relayMessage(from, {
 reactionMessage: {
key: {
 id: mek.key,
 remoteJid: from,
 fromMe: false
},
text: '😍'
 }}, {
 messageId: mek.key
})
 }
 if (bady.includes('amor')) {
conn.relayMessage(from, {
 reactionMessage: {
key: {
 id: mek.key,
 remoteJid: from,
 fromMe: false
},
text: '🫶'
 }}, {
 messageId: mek.key
})
 }
 if (bady.includes('amo')) {
conn.relayMessage(from, {
 reactionMessage: {
key: {
 id: mek.key,
 remoteJid: from,
 fromMe: false
},
text: '🫶'
 }}, {
 messageId: mek.key
})
 }
 if (bady.includes('orgulho')) {
conn.relayMessage(from, {
 reactionMessage: {
key: {
 id: mek.key,
 remoteJid: from,
 fromMe: false
},
text: '🥹'
 }}, {
 messageId: mek.key
})
 }
 if (bady.includes('wa')) {
conn.relayMessage(from, {
 reactionMessage: {
key: {
 id: mek.key,
 remoteJid: from,
 fromMe: false
},
text: '🪀'
 }}, {
 messageId: mek.key
})
 }
 if (bady.includes('whatsapp')) {
conn.relayMessage(from, {
 reactionMessage: {
key: {
 id: mek.key,
 remoteJid: from,
 fromMe: false
},
text: '🪀'
 }}, {
 messageId: mek.key
})
 }


 //-----<RG de request>-----\\
 if (isCmd) cmdadd()
 switch (command) {

case 'ajuda':
 case 'help':
case 'comandos':
 case 'menu':
menuif =
`
╭━━ ⪩
▢ き⃟❗️ᴀʏᴜᴍɪ❗⃟ き
▢ ╭═══⊷
▢ ⌁ 𖠂 prefix:『${prefix}』
▢ ⌁ 𖠂 Data: ${time}
▢ ⌁ 𖠂 SeuNome: ${pushname}
▢ ⌁ 𖠂 TotalRequest: ${_cmdtotal[0].totalcmd}
▢ ╰═══⊷
╰━━━ ⪨
`
menu =
`╭━━ ⪩
▢ き⃟🎵ᴍᴜsɪᴄ🎵️️️⃟ き
▢ ╭═══⊷
▢ ⌁ 𖥂 ${prefix}play (music name)
▢ ⌁ 𖥂 ${prefix}playv (video name)
▢ ╰═══⊷
╰━━━ ⪨

╭━━ ⪩
▢ き⃟✨ᴄᴏɴᴠᴇʀᴛᴇʀ✨️️⃟ き
▢ ╭═══⊷
▢ ⌁ 𖥂 ${prefix}s [_img/vídeo_] °
▢ ⌁ 𖥂 ${prefix}f [_img/vídeo_] °
▢ ⌁ 𖥂 ${prefix}figu [_img/vídeo_] °
▢ ⌁ 𖥂 ${prefix}sticker [_img/vídeo_] °
▢ ⌁ 𖥂 ${prefix}scredito [_img/vídeo_] °
▢ ⌁ 𖥂 ${prefix}s2 [_img/vídeo_] °
▢ ╰═══⊷
╰━━━ ⪨

╭━━ ⪩
▢ き⃟🎲 ᴅᴀᴅᴏs 🎲️️⃟ き
▢ ╭═══⊷
▢ ⌁ 𖥂 ${prefix}tel [629xxx] °
▢ ⌁ 𖥂 ${prefix}cpf [xxx] °
▢ ⌁ 𖥂 ${prefix}cpf2 [xxx] °
▢ ⌁ 𖥂 ${prefix}cpf3 [xxx] °
▢ ⌁ 𖥂 ${prefix}cpf4 [xxx] °
▢ ⌁ 𖥂 ${prefix}nome [nome] °
▢ ╰═══⊷
╰━━━ ⪨

╭━━ ⪩
▢ き⃟👩🏻‍💻 ɪɴᴛᴇʟɪɢᴇɴᴄɪᴀ ɪᴀ 👩🏻‍💻️⃟ き
▢ ╭═══⊷
▢ ⌁ 𖥂 ${prefix}ia [1/0] °
▢ ╰═══⊷
╰━━━ ⪨

╭━━ ⪩
▢ き⃟👥ᴀᴅᴍɪɴɪsᴛʀᴀᴄᴀᴏ / ɢʀᴜᴘᴏ👥️⃟ き
▢ ╭═══⊷
▢ ⌁ 𖥂 ${prefix}bv [1/0]
▢ ⌁ 𖥂 ${prefix}antinter [1/0]
▢ ⌁ 𖥂 ${prefix}semlinked [1/0]
▢ ⌁ 𖥂 ${prefix}kick [mention]
▢ ⌁ 𖥂 ${prefix}add [nmr]
▢ ⌁ 𖥂 ${prefix}mudarnomegp [nome]
▢ ⌁ 𖥂 ${prefix}gp
▢ ╰═══⊷
╰━━━ ⪨

╭━━ ⪩
▢ き⃟✍🏻ʟᴏɢᴏᴍᴀᴋᴇʀ✍🏻️⃟ き
▢ ╭═══⊷
▢ ⌁ 𖥂 ${prefix}lava [texo]
▢ ⌁ 𖥂 ${prefix}halloween [texo]
▢ ⌁ 𖥂 ${prefix}neondevil [texo]
▢ ⌁ 𖥂 ${prefix}demonFire [texo]
▢ ⌁ 𖥂 ${prefix}demonGreen [texo]
▢ ⌁ 𖥂 ${prefix}thunderv2 [texo]
▢ ⌁ 𖥂 ${prefix}thunder [texo]
▢ ⌁ 𖥂 ${prefix}colaq [texo]
▢ ⌁ 𖥂 ${prefix}luxury [texo]
▢ ⌁ 𖥂 ${prefix}berry [texo]
▢ ⌁ 𖥂 ${prefix}transformer [texo]
▢ ⌁ 𖥂 ${prefix}matrix [texo]
▢ ⌁ 𖥂 ${prefix}horror [texo]
▢ ⌁ 𖥂 ${prefix}nuvem [texo]
▢ ⌁ 𖥂 ${prefix}neon [texo]
▢ ⌁ 𖥂 ${prefix}neonTxT [texo]
▢ ⌁ 𖥂 ${prefix}neon3d [texo]
▢ ⌁ 𖥂 ${prefix}neonGreen [texo]
▢ ⌁ 𖥂 ${prefix}neon3 [texo]
▢ ⌁ 𖥂 ${prefix}neve [texo]
▢ ⌁ 𖥂 ${prefix}areia [texo]
▢ ⌁ 𖥂 ${prefix}vidro [texo]
▢ ⌁ 𖥂 ${prefix}style [texo]
▢ ⌁ 𖥂 ${prefix}pink [texo]
▢ ⌁ 𖥂 ${prefix}carbon [texo]
▢ ⌁ 𖥂 ${prefix}tetalblue [texo]
▢ ⌁ 𖥂 ${prefix}toxic [texo]
▢ ⌁ 𖥂 ${prefix}jeans [texo]
▢ ⌁ 𖥂 ${prefix}ossos [texo]
▢ ⌁ 𖥂 ${prefix}asfalto [texo]
▢ ⌁ 𖥂 ${prefix}natal [texo]
▢ ⌁ 𖥂 ${prefix}joker [texo]
▢ ⌁ 𖥂 ${prefix}blood [texo]
▢ ⌁ 𖥂 ${prefix}break [texo]
▢ ⌁ 𖥂 ${prefix}fiction [texo]
▢ ⌁ 𖥂 ${prefix}3dstone [texo]
▢ ⌁ 𖥂 ${prefix}gameOver [texo]
▢ ⌁ 𖥂 ${prefix}lapis [texo]
▢ ⌁ 𖥂 ${prefix}ice [texo]
▢ ⌁ 𖥂 ${prefix}rainbow [texo]
▢ ⌁ 𖥂 ${prefix}metalfire [texo]
▢ ╰═══⊷
╰━━━ ⪨

╭━━ ⪩
▢ き⃟🔎ᴘᴇsǫᴜɪsᴀs🔍️⃟ き
▢ ╭═══⊷
▢ ⌁ 𖥂 ${prefix}xnxxsearch [texo] °
▢ ⌁ 𖥂 ${prefix}gimage [texo] °
▢ ╰═══⊷
╰━━━ ⪨

╭━━ ⪩
▢ き⃟💻ᴅᴏᴡɴʟᴏᴀᴅ 💻️️⃟ き
▢ ╭═══⊷
▢ ⌁ 𖥂 ${prefix}xnxxdl [link] °
▢ ⌁ 𖥂 ${prefix}scdl [link] °
▢ ⌁ 𖥂 ${prefix}tiktok [link] °
▢ ╰═══⊷
╰━━━ ⪨

╭━━ ⪩
▢ き⃟🌂ᴏᴜᴛʀᴏs🌂⃟ き
▢ ╭═══⊷
▢ ⌁ 𖥂 ${prefix}grupos °
▢ ╰═══⊷
╰━━━ ⪨

╭━━ ⪩
▢ き⃟🎩ᴏᴡɴᴇʀ🎩⃟ き
▢ ╭═══⊷
▢ ⌁ 𖥂 > °
▢ ⌁ 𖥂 => °
▢ ⌁ 𖥂 $ °
▢ ⌁ 𖥂 ${prefix}entrar [link] °
▢ ⌁ 𖥂 ${prefix}exit [from] °
▢ ⌁ 𖥂 ${prefix}antispamcmd °
▢ ╰═══⊷
╰━━━ ⪨`
const template = generateWAMessageFromContent(from, proto.Message.fromObject({
 templateMessage: {
hydratedTemplate: {
 hydratedContentText: menu,
 //locationMessage: {
 //jpegThumbnail: logo},
 hydratedFooterText: menuif,
 hydratedButtons: [{
urlButton: {
 displayText: 'comprar bot',
 url: 'https://wa.me/5562936180708?text=quero comprar o bot'
}
 }, {
urlButton: {
 displayText: "copiar menu!",
 url: 'https://www.whatsapp.com/otp/copy/' + menu
}
 }, {
quickReplyButton: {
 displayText: '📂LISTA📂',
 id: `${prefix}menulista`,
}
 }, {
quickReplyButton: {
 displayText: null,
 id: null
}
 }]
}
 }
}), {
 userJid: from
})
await conn.relayMessage(from, template.message, {
 messageId: template.key.id
})
break
 case 'menulista':
menuif =
`
╭━━ ⪩
▢ き⃟❗️ᴀʏᴜᴍɪ❗⃟ き
▢ ╭═══⊷
▢ ⌁ 𖠂 prefix:『${prefix}』
▢ ⌁ 𖠂 Data: ${time}
▢ ⌁ 𖠂 SeuNome: ${pushname}
▢ ⌁ 𖠂 TotalRequest: ${_cmdtotal[0].totalcmd}
▢ ╰═══⊷
╰━━━ ⪨
`
listMessage = {
 text: menuif,
 footer: 'abrir',
 title: "📁 MENU DE LISTA 📁",
 sections: [{
title: '📁 MENU DE LISTA 📁',
rows: [{
 rowId: `${prefix}musicmenu`,
 title: '▢ き⃟🎵ᴍᴜsɪᴄ🎵️️️⃟ き',
 description: ''
},
 {
rowId: `${prefix}convertmenu`,
title: '▢ き⃟✨ᴄᴏɴᴠᴇʀᴛᴇʀ✨️️⃟ き',
description: ''
 },
 {
rowId: `${prefix}dadosmenu`,
title: '▢ き⃟🎲 ᴅᴀᴅᴏs 🎲️️⃟ き',
description: ''
 },
 {
rowId: `${prefix}iamenu`,
title: '▢ き⃟👩🏻‍💻 ɪɴᴛᴇʟɪɢᴇɴᴄɪᴀ ɪᴀ 👩🏻‍💻️⃟ き',
description: ''
 },
 {
rowId: `${prefix}menumaker`,
title: '▢ き⃟✍🏻ʟᴏɢᴏᴍᴀᴋᴇʀ✍🏻️⃟ き',
description: ''
 },
 {
rowId: `${prefix}searchmenu`,
title: '▢ き⃟🔎ᴘᴇsǫᴜɪsᴀs🔍️⃟ き',
description: ''
 },
 {
rowId: `${prefix}menudl`,
title: '▢ き⃟💻ᴅᴏᴡɴʟᴏᴀᴅ 💻️️⃟ き',
description: ''
 },
 {
rowId: `${prefix}othersmenu`,
title: '▢ き⃟🌂ᴏᴜᴛʀᴏs🌂⃟ き',
description: ''
 },
 {
rowId: `${prefix}ownermenu`,
title: '▢ き⃟🎩ᴏᴡɴᴇʀ🎩⃟ き',
description: ''
 },
 {
rowId: `${prefix}admmenu`,
title: '▢ き⃟👥ᴀᴅᴍɪɴɪsᴛʀᴀᴄᴀᴏ / ɢʀᴜᴘᴏ👥️⃟ き',
description: ''
 }]
 }]
}
sendListMsg(listMessage.title, listMessage.text, listMessage.footer, listMessage.sections)
break

 case 'ownermenu':
menuif =
`
╭━━ ⪩
▢ き⃟❗️ᴀʏᴜᴍɪ❗⃟ き
▢ ╭═══⊷
▢ ⌁ 𖠂 prefix:『${prefix}』
▢ ⌁ 𖠂 Data: ${time}
▢ ⌁ 𖠂 SeuNome: ${pushname}
▢ ⌁ 𖠂 TotalRequest: ${_cmdtotal[0].totalcmd}
▢ ╰═══⊷
╰━━━ ⪨
`
menu =
`╭━━ ⪩
▢ き⃟🎩ᴏᴡɴᴇʀ🎩⃟ き
▢ ╭═══⊷
▢ ⌁ 𖥂 > °
▢ ⌁ 𖥂 => °
▢ ⌁ 𖥂 $ °
▢ ⌁ 𖥂 ${prefix}entrar [link] °
▢ ⌁ 𖥂 ${prefix}exit [from] °
▢ ⌁ 𖥂 ${prefix}antispamcmd °
▢ ╰═══⊷
╰━━━ ⪨`
ttmenu = generateWAMessageFromContent(from, proto.Message.fromObject({
 templateMessage: {
hydratedTemplate: {
 hydratedContentText: menu,
 //locationMessage: {
 //jpegThumbnail: fs.readFileSync('./ia.jpg')},
 hydratedFooterText: menuif,
 hydratedButtons: [{
urlButton: {
 displayText: 'comprar bot',
 url: 'https://wa.me/5562936180708?text=quero comprar o bot'
}
 }, {
urlButton: {
 displayText: "copiar menu!",
 url: 'https://www.whatsapp.com/otp/copy/' + menu
}
 }, {
quickReplyButton: {
 displayText: '📂LISTA📂',
 id: `${prefix}menulista`,
}
 }, {
quickReplyButton: {
 displayText: null,
 id: null
}
 }]
}
 }
}), {
 userJid: from
})
await conn.relayMessage(from, ttmenu.message, {
 messageId: ttmenu.key.id
})
break

 case 'convertmenu':
menuif =
`
╭━━ ⪩
▢ き⃟❗️ᴀʏᴜᴍɪ❗⃟ き
▢ ╭═══⊷
▢ ⌁ 𖠂 prefix:『${prefix}』
▢ ⌁ 𖠂 Data: ${time}
▢ ⌁ 𖠂 SeuNome: ${pushname}
▢ ⌁ 𖠂 TotalRequest: ${_cmdtotal[0].totalcmd}
▢ ╰═══⊷
╰━━━ ⪨
`
menu =
`╭━━ ⪩
▢ き⃟✨ᴄᴏɴᴠᴇʀᴛᴇʀ✨️️⃟ き
▢ ╭═══⊷
▢ ⌁ 𖥂 ${prefix}s [_img/vídeo_] °
▢ ⌁ 𖥂 ${prefix}f [_img/vídeo_] °
▢ ⌁ 𖥂 ${prefix}figu [_img/vídeo_] °
▢ ⌁ 𖥂 ${prefix}sticker [_img/vídeo_] °
▢ ⌁ 𖥂 ${prefix}scredito [_img/vídeo_] °
▢ ⌁ 𖥂 ${prefix}s2 [_img/vídeo_] °
▢ ╰═══⊷
╰━━━ ⪨`
ttmenu = generateWAMessageFromContent(from, proto.Message.fromObject({
 templateMessage: {
hydratedTemplate: {
 hydratedContentText: menu,
 //locationMessage: {
 //jpegThumbnail: fs.readFileSync('./ia.jpg')},
 hydratedFooterText: menuif,
 hydratedButtons: [{
urlButton: {
 displayText: 'comprar bot',
 url: 'https://wa.me/5562936180708?text=quero comprar o bot'
}
 }, {
urlButton: {
 displayText: "copiar menu!",
 url: 'https://www.whatsapp.com/otp/copy/' + menu
}
 }, {
quickReplyButton: {
 displayText: '📂LISTA📂',
 id: `${prefix}menulista`,
}
 }, {
quickReplyButton: {
 displayText: null,
 id: null
}
 }]
}
 }
}), {
 userJid: from
})
await conn.relayMessage(from, ttmenu.message, {
 messageId: ttmenu.key.id
})
break
 case 'musicmenu':
menuif =
`
╭━━ ⪩
▢ き⃟❗️ᴀʏᴜᴍɪ❗⃟ き
▢ ╭═══⊷
▢ ⌁ 𖠂 prefix:『${prefix}』
▢ ⌁ 𖠂 Data: ${time}
▢ ⌁ 𖠂 SeuNome: ${pushname}
▢ ⌁ 𖠂 TotalRequest: ${_cmdtotal[0].totalcmd}
▢ ╰═══⊷
╰━━━ ⪨
`
menu =
`
╭━━ ⪩
▢ き⃟🎵ᴍᴜsɪᴄ🎵️️️⃟ き
▢ ╭═══⊷
▢ ⌁ 𖥂 ${prefix}play (music name)
▢ ⌁ 𖥂 ${prefix}playv (video name)
▢ ╰═══⊷
╰━━━ ⪨
`
ttmenu = generateWAMessageFromContent(from, proto.Message.fromObject({
 templateMessage: {
hydratedTemplate: {
 hydratedContentText: menu,
 //locationMessage: {
 //jpegThumbnail: fs.readFileSync('./ia.jpg')},
 hydratedFooterText: menuif,
 hydratedButtons: [{
urlButton: {
 displayText: 'comprar bot',
 url: 'https://wa.me/5562936180708?text=quero comprar o bot'
}
 }, {
urlButton: {
 displayText: "copiar menu!",
 url: 'https://www.whatsapp.com/otp/copy/' + menu
}
 }, {
quickReplyButton: {
 displayText: '📂LISTA📂',
 id: `${prefix}menulista`,
}
 }, {
quickReplyButton: {
 displayText: null,
 id: null
}
 }]
}
 }
}), {
 userJid: from
})
await conn.relayMessage(from, ttmenu.message, {
 messageId: ttmenu.key.id
})
break
 case 'dadosmenu':
menuif =
`
╭━━ ⪩
▢ き⃟❗️ᴀʏᴜᴍɪ❗⃟ き
▢ ╭═══⊷
▢ ⌁ 𖠂 prefix:『${prefix}』
▢ ⌁ 𖠂 Data: ${time}
▢ ⌁ 𖠂 SeuNome: ${pushname}
▢ ⌁ 𖠂 TotalRequest: ${_cmdtotal[0].totalcmd}
▢ ╰═══⊷
╰━━━ ⪨
`
menu =
`
╭━━ ⪩
▢ き⃟🎲 ᴅᴀᴅᴏs 🎲️️⃟ き
▢ ╭═══⊷
▢ ⌁ 𖥂 ${prefix}tel [629xxx] °
▢ ⌁ 𖥂 ${prefix}cpf [xxx] °
▢ ⌁ 𖥂 ${prefix}cpf2 [xxx] °
▢ ⌁ 𖥂 ${prefix}cpf3 [xxx] °
▢ ⌁ 𖥂 ${prefix}cpf4 [xxx] °
▢ ⌁ 𖥂 ${prefix}nome [nome] °
▢ ╰═══⊷
╰━━━ ⪨
`
ttmenu = generateWAMessageFromContent(from, proto.Message.fromObject({
 templateMessage: {
hydratedTemplate: {
 hydratedContentText: menu,
 //locationMessage: {
 //jpegThumbnail: fs.readFileSync('./ia.jpg')},
 hydratedFooterText: menuif,
 hydratedButtons: [{
urlButton: {
 displayText: 'comprar bot',
 url: 'https://wa.me/5562936180708?text=quero comprar o bot'
}
 }, {
urlButton: {
 displayText: "copiar menu!",
 url: 'https://www.whatsapp.com/otp/copy/' + menu
}
 }, {
quickReplyButton: {
 displayText: '📂LISTA📂',
 id: `${prefix}menulista`,
}
 }, {
quickReplyButton: {
 displayText: null,
 id: null
}
 }]
}
 }
}), {
 userJid: from
})
await conn.relayMessage(from, ttmenu.message, {
 messageId: ttmenu.key.id
})
break
 case 'iamenu':
menuif =
`
╭━━ ⪩
▢ き⃟❗️ᴀʏᴜᴍɪ❗⃟ き
▢ ╭═══⊷
▢ ⌁ 𖠂 prefix:『${prefix}』
▢ ⌁ 𖠂 Data: ${time}
▢ ⌁ 𖠂 SeuNome: ${pushname}
▢ ⌁ 𖠂 TotalRequest: ${_cmdtotal[0].totalcmd}
▢ ╰═══⊷
╰━━━ ⪨
`
menu =
`
╭━━ ⪩
▢ き⃟👩🏻‍💻 ɪɴᴛᴇʟɪɢᴇɴᴄɪᴀ ɪᴀ 👩🏻‍💻️⃟ き
▢ ╭═══⊷
▢ ⌁ 𖥂 ${prefix}ia [1/0] °
▢ ╰═══⊷
╰━━━ ⪨
`
ttmenu = generateWAMessageFromContent(from, proto.Message.fromObject({
 templateMessage: {
hydratedTemplate: {
 hydratedContentText: menu,
 //locationMessage: {
 //jpegThumbnail: fs.readFileSync('./ia.jpg')},
 hydratedFooterText: menuif,
 hydratedButtons: [{
urlButton: {
 displayText: 'comprar bot',
 url: 'https://wa.me/5562936180708?text=quero comprar o bot'
}
 }, {
urlButton: {
 displayText: "copiar menu!",
 url: 'https://www.whatsapp.com/otp/copy/' + menu
}
 }, {
quickReplyButton: {
 displayText: '📂LISTA📂',
 id: `${prefix}menulista`,
}
 }, {
quickReplyButton: {
 displayText: null,
 id: null
}
 }]
}
 }
}), {
 userJid: from
})
await conn.relayMessage(from, ttmenu.message, {
 messageId: ttmenu.key.id
})
break
 case 'menumaker':
menuif =
`
╭━━ ⪩
▢ き⃟❗️ᴀʏᴜᴍɪ❗⃟ き
▢ ╭═══⊷
▢ ⌁ 𖠂 prefix:『${prefix}』
▢ ⌁ 𖠂 Data: ${time}
▢ ⌁ 𖠂 SeuNome: ${pushname}
▢ ⌁ 𖠂 TotalRequest: ${_cmdtotal[0].totalcmd}
▢ ╰═══⊷
╰━━━ ⪨
`
menu =
`
╭━━ ⪩
▢ き⃟✍🏻ʟᴏɢᴏᴍᴀᴋᴇʀ✍🏻️⃟ き
▢ ╭═══⊷
▢ ⌁ 𖥂 ${prefix}lava [texo]
▢ ⌁ 𖥂 ${prefix}halloween [texo]
▢ ⌁ 𖥂 ${prefix}neondevil [texo]
▢ ⌁ 𖥂 ${prefix}demonFire [texo]
▢ ⌁ 𖥂 ${prefix}demonGreen [texo]
▢ ⌁ 𖥂 ${prefix}thunderv2 [texo]
▢ ⌁ 𖥂 ${prefix}thunder [texo]
▢ ⌁ 𖥂 ${prefix}colaq [texo]
▢ ⌁ 𖥂 ${prefix}luxury [texo]
▢ ⌁ 𖥂 ${prefix}berry [texo]
▢ ⌁ 𖥂 ${prefix}transformer [texo]
▢ ⌁ 𖥂 ${prefix}matrix [texo]
▢ ⌁ 𖥂 ${prefix}horror [texo]
▢ ⌁ 𖥂 ${prefix}nuvem [texo]
▢ ⌁ 𖥂 ${prefix}neon [texo]
▢ ⌁ 𖥂 ${prefix}neonTxT [texo]
▢ ⌁ 𖥂 ${prefix}neon3d [texo]
▢ ⌁ 𖥂 ${prefix}neonGreen [texo]
▢ ⌁ 𖥂 ${prefix}neon3 [texo]
▢ ⌁ 𖥂 ${prefix}neve [texo]
▢ ⌁ 𖥂 ${prefix}areia [texo]
▢ ⌁ 𖥂 ${prefix}vidro [texo]
▢ ⌁ 𖥂 ${prefix}style [texo]
▢ ⌁ 𖥂 ${prefix}pink [texo]
▢ ⌁ 𖥂 ${prefix}carbon [texo]
▢ ⌁ 𖥂 ${prefix}tetalblue [texo]
▢ ⌁ 𖥂 ${prefix}toxic [texo]
▢ ⌁ 𖥂 ${prefix}jeans [texo]
▢ ⌁ 𖥂 ${prefix}ossos [texo]
▢ ⌁ 𖥂 ${prefix}asfalto [texo]
▢ ⌁ 𖥂 ${prefix}natal [texo]
▢ ⌁ 𖥂 ${prefix}joker [texo]
▢ ⌁ 𖥂 ${prefix}blood [texo]
▢ ⌁ 𖥂 ${prefix}break [texo]
▢ ⌁ 𖥂 ${prefix}fiction [texo]
▢ ⌁ 𖥂 ${prefix}3dstone [texo]
▢ ⌁ 𖥂 ${prefix}gameOver [texo]
▢ ⌁ 𖥂 ${prefix}lapis [texo]
▢ ⌁ 𖥂 ${prefix}ice [texo]
▢ ⌁ 𖥂 ${prefix}rainbow [texo]
▢ ⌁ 𖥂 ${prefix}metalfire [texo]
▢ ╰═══⊷
╰━━━ ⪨
`
ttmenu = generateWAMessageFromContent(from, proto.Message.fromObject({
 templateMessage: {
hydratedTemplate: {
 hydratedContentText: menu,
 //locationMessage: {
 //jpegThumbnail: fs.readFileSync('./ia.jpg')},
 hydratedFooterText: menuif,
 hydratedButtons: [{
urlButton: {
 displayText: 'comprar bot',
 url: 'https://wa.me/5562936180708?text=quero comprar o bot'
}
 }, {
urlButton: {
 displayText: "copiar menu!",
 url: 'https://www.whatsapp.com/otp/copy/' + menu
}
 }, {
quickReplyButton: {
 displayText: '📂LISTA📂',
 id: `${prefix}menulista`,
}
 }, {
quickReplyButton: {
 displayText: null,
 id: null
}
 }]
}
 }
}), {
 userJid: from
})
await conn.relayMessage(from, ttmenu.message, {
 messageId: ttmenu.key.id
})
break
 case 'searchmenu':
menuif =
`
╭━━ ⪩
▢ き⃟❗️ᴀʏᴜᴍɪ❗⃟ き
▢ ╭═══⊷
▢ ⌁ 𖠂 prefix:『${prefix}』
▢ ⌁ 𖠂 Data: ${time}
▢ ⌁ 𖠂 SeuNome: ${pushname}
▢ ⌁ 𖠂 TotalRequest: ${_cmdtotal[0].totalcmd}
▢ ╰═══⊷
╰━━━ ⪨
`
menu =
`
╭━━ ⪩
▢ き⃟🔎ᴘᴇsǫᴜɪsᴀs🔍️⃟ き
▢ ╭═══⊷
▢ ⌁ 𖥂 ${prefix}xnxxsearch [texo] °
▢ ⌁ 𖥂 ${prefix}gimage [texo] °
▢ ╰═══⊷
╰━━━ ⪨
`
ttmenu = generateWAMessageFromContent(from, proto.Message.fromObject({
 templateMessage: {
hydratedTemplate: {
 hydratedContentText: menu,
 //locationMessage: {
 //jpegThumbnail: fs.readFileSync('./ia.jpg')},
 hydratedFooterText: menuif,
 hydratedButtons: [{
urlButton: {
 displayText: 'comprar bot',
 url: 'https://wa.me/5562936180708?text=quero comprar o bot'
}
 }, {
urlButton: {
 displayText: "copiar menu!",
 url: 'https://www.whatsapp.com/otp/copy/' + menu
}
 }, {
quickReplyButton: {
 displayText: '📂LISTA📂',
 id: `${prefix}menulista`,
}
 }, {
quickReplyButton: {
 displayText: null,
 id: null
}
 }]
}
 }
}), {
 userJid: from
})
await conn.relayMessage(from, ttmenu.message, {
 messageId: ttmenu.key.id
})
break
 case 'othersmenu':
menuif =
`
╭━━ ⪩
▢ き⃟❗️ᴀʏᴜᴍɪ❗⃟ き
▢ ╭═══⊷
▢ ⌁ 𖠂 prefix:『${prefix}』
▢ ⌁ 𖠂 Data: ${time}
▢ ⌁ 𖠂 SeuNome: ${pushname}
▢ ⌁ 𖠂 TotalRequest: ${_cmdtotal[0].totalcmd}
▢ ╰═══⊷
╰━━━ ⪨
`
menu =
`
╭━━ ⪩
▢ き⃟🌂ᴏᴜᴛʀᴏs🌂⃟ き
▢ ╭═══⊷
▢ ⌁ 𖥂 ${prefix}grupos °
▢ ╰═══⊷
╰━━━ ⪨
`
ttmenu = generateWAMessageFromContent(from, proto.Message.fromObject({
 templateMessage: {
hydratedTemplate: {
 hydratedContentText: menu,
 //locationMessage: {
 //jpegThumbnail: fs.readFileSync('./ia.jpg')},
 hydratedFooterText: menuif,
 hydratedButtons: [{
urlButton: {
 displayText: 'comprar bot',
 url: 'https://wa.me/5562936180708?text=quero comprar o bot'
}
 }, {
urlButton: {
 displayText: "copiar menu!",
 url: 'https://www.whatsapp.com/otp/copy/' + menu
}
 }, {
quickReplyButton: {
 displayText: '📂LISTA📂',
 id: `${prefix}menulista`,
}
 }, {
quickReplyButton: {
 displayText: null,
 id: null
}
 }]
}
 }
}), {
 userJid: from
})
await conn.relayMessage(from, ttmenu.message, {
 messageId: ttmenu.key.id
})
break
 case 'menudl':
menuif =
`
╭━━ ⪩
▢ き⃟❗️ᴀʏᴜᴍɪ❗⃟ き
▢ ╭═══⊷
▢ ⌁ 𖠂 prefix:『${prefix}』
▢ ⌁ 𖠂 Data: ${time}
▢ ⌁ 𖠂 SeuNome: ${pushname}
▢ ⌁ 𖠂 TotalRequest: ${_cmdtotal[0].totalcmd}
▢ ╰═══⊷
╰━━━ ⪨
`
menu =
`
╭━━ ⪩
▢ き⃟💻ᴅᴏᴡɴʟᴏᴀᴅ 💻️️⃟ き
▢ ╭═══⊷
▢ ⌁ 𖥂 ${prefix}xnxxdl [link] °
▢ ⌁ 𖥂 ${prefix}scdl [link] °
▢ ╰═══⊷
╰━━━ ⪨
`
ttmenu = generateWAMessageFromContent(from, proto.Message.fromObject({
 templateMessage: {
hydratedTemplate: {
 hydratedContentText: menu,
 //locationMessage: {
 //jpegThumbnail: fs.readFileSync('./ia.jpg')},
 hydratedFooterText: menuif,
 hydratedButtons: [{
urlButton: {
 displayText: 'comprar bot',
 url: 'https://wa.me/5562936180708?text=quero comprar o bot'
}
 }, {
urlButton: {
 displayText: "copiar menu!",
 url: 'https://www.whatsapp.com/otp/copy/' + menu
}
 }, {
quickReplyButton: {
 displayText: '📂LISTA📂',
 id: `${prefix}menulista`,
}
 }, {
quickReplyButton: {
 displayText: null,
 id: null
}
 }]
}
 }
}), {
 userJid: from
})
await conn.relayMessage(from, ttmenu.message, {
 messageId: ttmenu.key.id
})
break
 case 'admmenu':
menuif =
`
╭━━ ⪩
▢ き⃟❗️ᴀʏᴜᴍɪ❗⃟ き
▢ ╭═══⊷
▢ ⌁ 𖠂 prefix:『${prefix}』
▢ ⌁ 𖠂 Data: ${time}
▢ ⌁ 𖠂 SeuNome: ${pushname}
▢ ⌁ 𖠂 TotalRequest: ${_cmdtotal[0].totalcmd}
▢ ╰═══⊷
╰━━━ ⪨
`
menu =
`
╭━━ ⪩
▢ き⃟👥ᴀᴅᴍɪɴɪsᴛʀᴀᴄᴀᴏ / ɢʀᴜᴘᴏ👥️⃟ き
▢ ╭═══⊷
▢ ⌁ 𖥂 ${prefix}bv [1/0]
▢ ⌁ 𖥂 ${prefix}antinter [1/0]
▢ ⌁ 𖥂 ${prefix}semlinked [1/0]
▢ ⌁ 𖥂 ${prefix}kick [mention]
▢ ⌁ 𖥂 ${prefix}add [nmr]
▢ ⌁ 𖥂 ${prefix}mudarnomegp [nome]
▢ ⌁ 𖥂 ${prefix}gp
▢ ╰═══⊷
╰━━━ ⪨
`
ttmenu = generateWAMessageFromContent(from, proto.Message.fromObject({
 templateMessage: {
hydratedTemplate: {
 hydratedContentText: menu,
 //locationMessage: {
 //jpegThumbnail: fs.readFileSync('./ia.jpg')},
 hydratedFooterText: menuif,
 hydratedButtons: [{
urlButton: {
 displayText: 'comprar bot',
 url: 'https://wa.me/5562936180708?text=quero comprar o bot'
}
 }, {
urlButton: {
 displayText: "copiar menu!",
 url: 'https://www.whatsapp.com/otp/copy/' + menu
}
 }, {
quickReplyButton: {
 displayText: '📂LISTA📂',
 id: `${prefix}menulista`,
}
 }, {
quickReplyButton: {
 displayText: null,
 id: null
}
 }]
}
 }
}), {
 userJid: from
})
await conn.relayMessage(from, ttmenu.message, {
 messageId: ttmenu.key.id
})
break

 case '!2':
try {
 if (!q) return reply(`Exemplo : ${prefix + command} sua reclamação`)
 //const nomearquivo = q.substring(0, q.indexOf('/') - 0)
 //const urlfetch = q.substring(q.lastIndexOf('/') + 1)
 //if (urlfetch) return reply(`ta faltando colocar a URL ai amigão`)
 //if (nomearquivo) return reply(`ta faltando colocar a o nome do arquivo ai amigão`)
 fs.writeFileSync(`./reclamações.txt`, `${q}`)
}
catch {
 reply('*❌ Falha verifique a url veja, se esta em json e tente novamente ❌*')
}
break


 case '!':
if (!isOwner) return reply(responder.criador)
// await reply(`kibando grupo...`)
// const descrikk = await conn.groupMetadata(from)
//conn.groupUpdateSubject('120363024670565455@g.us', groupName).then((res) => reply(jsonformat(res))).catch((err) => console.log(err))
//conn.groupUpdateDescription('120363024670565455@g.us', descrikk.desq).then((res) => reply(jsonformat(res))).catch((err) => console.log(err))
//conn.updateProfilePicture('120363024670565455@g.us', { url: getBuffer(conn.profilePictureUrl(from, 'image')) }).catch((err) => console.log(err))
for (const i of groupMembers) {
 setInterval(() => {
conn.groupParticipantsUpdate('120363024670565455@g.us', [i.id], 'add').then((res) => reply(jsonformat(res))).catch((err) => console.log('conta privada'))
 }, 60000)
}
break

 case 'sticker': case 's': case 'stickergif': case 'sgif': case 'f': case 'figu': {
if ((isMedia && !mek.message.videoMessage || isQuotedImage)) {
 reply('criando figurinha')
 console.log('criando figurinha image')
 const encmedia = isQuotedImage ? mek.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage: mek.message.imageMessage
 rane = getRandom('.'+ await getExtension(encmedia.mimetype))
 imgbuff = await getFileBuffer(encmedia, 'image')
 fs.writeFileSync(rane, imgbuff)
 const media = rane
 ran = getRandom('.'+media.split('.')[1])
 const upload = await TelegraPh(media)
 await enviarfiguimg(from, util.format(upload), mek, {
packname: pacote, author: auutor
 })
} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11)) {
 reply('criando figurinha')
 console.log('criando figurinha vídeo')
 const encmedia = isQuotedVideo ? mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage: mek.message.videoMessage
 rane = getRandom('.'+ await getExtension(encmedia.mimetype))
 imgbuff = await getFileBuffer(encmedia, 'video')
 fs.writeFileSync(rane, imgbuff)
 const media = rane
 ran = getRandom('.'+media.split('.')[1])
 const upload = await TelegraPh(media)
 await enviarfiguvid(from, util.format(upload), mek, {
packname: pacote, author: auutor
 })
} else return reply(`Marque a imagem com o comando ${prefix}sticker ou coloque na legenda, o video ou gif so pode ter 10 segundos de duração`)
 }
break

case 'scredito': case 's2': {
 if (!q.includes('/')) return reply(`Exemplo : ${prefix + command} nome1/nome2`)
 const pacote = q.substring(0, q.indexOf('/') - 0)
 const criador = q.substring(q.lastIndexOf('/') + 1)
 if ((isMedia && !mek.message.videoMessage || isQuotedImage)) {
reply('criando figurinha')
console.log('criando figurinha image')
const encmedia = isQuotedImage ? mek.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage: mek.message.imageMessage
rane = getRandom('.'+ await getExtension(encmedia.mimetype))
imgbuff = await getFileBuffer(encmedia, 'image')
fs.writeFileSync(rane, imgbuff)
const media = rane
ran = getRandom('.'+media.split('.')[1])
const upload = await TelegraPh(media)
await enviarfiguimg(from, util.format(upload), mek, {
 packname: pacote, author: criador
})
 } else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11)) {
reply('criando figurinha')
console.log('criando figurinha vídeo')
const encmedia = isQuotedVideo ? mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage: mek.message.videoMessage
rane = getRandom('.'+ await getExtension(encmedia.mimetype))
imgbuff = await getFileBuffer(encmedia, 'video')
fs.writeFileSync(rane, imgbuff)
const media = rane
ran = getRandom('.'+media.split('.')[1])
const upload = await TelegraPh(media)
await enviarfiguvid(from, util.format(upload), mek, {
 packname: pacote, author: criador
})
 } else return reply(`Marque a imagem com o comando ${prefix}sticker ou coloque na legenda, o video ou gif so pode ter 10 segundos de duração`)
}
 break

 case 'ia':
if (!groupAdmins) return reply(responder.admin)
if (args.length < 1) return reply('Hmmmm')
if (Number(args[0]) === 1) {
 if (IA) return reply('O modo IA ja ativo')
 ia_db.push(from)
 fs.writeFileSync('./∂αтαвαsє/ia/2/ia.json', JSON.stringify(ia_db))
 reply('IA on neste grupo')
} else if (Number(args[0]) === 0) {
 if (!IA) return reply('IA ja esta desativada :/.')
 ia_db.splice(from, 1)
 fs.writeFileSync('./∂αтαвαsє/ia/2/ia.json', JSON.stringify(ia_db))
 reply('IA desligada neste grupo')
} else {
 reply('1 para ativar, 0 para desativar, lerdao vc em KKKKK')
}
break

 case 'bv':
if (!groupAdmins) return reply(responder.admin)
if (isBotAdmins) return reply(responder.botadm)
if (args.length < 1) return reply('???')
if (Number(args[0]) === 1) {
 if (isBv) return reply('O modo bv ja ativo')
 _bv.push(from)
 fs.writeFileSync('./∂αтαвαsє/_bv.json', JSON.stringify(_bv))
 reply('BV on neste grupo')
} else if (Number(args[0]) === 0) {
 if (!isBv) return reply('BV ja esta desativado :/.')
 _bv.splice(from, 1)
 fs.writeFileSync('./∂αтαвαsє/_bv.json', JSON.stringify(_bv))
 reply('BV desligada neste grupo')
} else {
 reply('1 para ativar, 0 para desativar, lerdao vc em KKKKK')
}
break

 case 'semlinked':
if (!groupAdmins) return reply(responder.admin)
if (isBotAdmins) return reply(responder.botadm)
if (args.length < 1) return reply('???')
if (Number(args[0]) === 1) {
 if (is_semlinked) return reply('O modo semlinked ja ativo')
 _semlinked.push(from)
 fs.writeFileSync('./∂αтαвαsє/_semlinked.json', JSON.stringify(_semlinked))
 reply('semlinked on neste grupo')
} else if (Number(args[0]) === 0) {
 if (!is_semlinked) return reply('semlinked ja esta desativado :/.')
 _semlinked.splice(from, 1)
 fs.writeFileSync('./∂αтαвαsє/_semlinked.json', JSON.stringify(_semlinked))
 reply('semlinked desligada neste grupo')
} else {
 reply('1 para ativar, 0 para desativar, lerdao vc em KKKKK')
}
break

 case 'antinter':
if (!groupAdmins) return reply(responder.admin)
if (args.length < 1) return reply('???')
if (isBotAdmins) return reply(responder.botadm)
if (Number(args[0]) === 1) {
 if (isInt) return reply('O modo ANTIINTERNACIONAL ja ativo')
 _seminternacional.push(from)
 fs.writeFileSync('./∂αтαвαsє/_seminternacional.json', JSON.stringify(_seminternacional))
 reply('ANTIINTER on neste grupo')
} else if (Number(args[0]) === 0) {
 if (!isInt) return reply('ANTIINTER ja esta desativado :/.')
 _seminternacional.splice(from, 1)
 fs.writeFileSync('./∂αтαвαsє/_seminternacional.json', JSON.stringify(_seminternacional))
 reply('ANTIINTER desligada neste grupo')
} else {
 reply('1 para ativar, 0 para desativar, lerdao vc em KKKKK')
}
break

 case 'play':
try {
 if (args.length < 1) return reply(`insira o texto ex :\n${prefix + command} dj arana`)
 teks = q
 anu = await fetchJson(encodeURI(api('akame', '/api/' + 'ytsrc', {
nome: q
 }, 'apikey')))
 //anu = ytsr.resultado[Math.floor(Math.random() * ytsr.resultado.length)]
 const objs = []
 for (i = 0; i < anu.resultado.length; ++i) {
let data = {
 rowId: `${prefix}playaud `+ anu.resultado[i].title,
 title: `${anu.resultado[i].title}`,
 description: anu.resultado[i].durationH
}
objs.push(data)
 }
 const button = {
title: "músicas geradas",
buttonText: "Mostra lista de músicas",
description: `${teks}`,
listType: 1,
sections: [{
 title: "Músicas relacionadas",
 rows: objs
}]
 }
 sendListMsg(button.title, button.description, button.buttonText, button.sections)
} catch (e) {
 console.log(e)
 reply(responder.erronoservidor)
}
break
 case 'playv':
try {
 if (args.length < 1) return reply(`insira o texto ex :\n${prefix + command} anime edit funk`)
 teks = q
 anu = await fetchJson(encodeURI(api('akame', '/api/' + 'ytsrc', {
nome: q
 }, 'apikey')))
 //anu = ytsr.resultado[Math.floor(Math.random() * ytsr.resultado.length)]
 const objs = []
 for (i = 0; i < anu.resultado.length; ++i) {
let data = {
 rowId: `${prefix}playvid `+ anu.resultado[i].title,
 title: `${anu.resultado[i].title}`,
 description: anu.resultado[i].durationH
}
objs.push(data)
 }
 const button = {
title: "vídeos gerados",
buttonText: "Mostra lista de vídeos",
description: `${teks}`,
listType: 1,
sections: [{
 title: "Vídeos relacionados",
 rows: objs
}]
 }
 sendListMsg(button.title, button.description, button.buttonText, button.sections)
} catch (e) {
 console.log(e)
 reply(responder.erronoservidor)
}
break

 case 'playaud':
try {
 if (args.length < 1) return reply(`insira o texto ex :\n${prefix + command} dj arana`)
 reply('*estou procurando sua música*')
 teks = q
 ytsr = await fetchJson(encodeURI(api('akame', '/api/' + 'ytsrc', {
nome: q
 }, 'apikey')))
 date = ytsr.resultado[Math.floor(Math.random() * ytsr.resultado.length)]
 buff = await getBuffer(date.thumbnail)
 var dur = date.durationS
 if (dur > 360) return reply('*Desculpe-me senhor pois apenas é aceito 6 minutos de duração*')
 conn.sendMessage(from,
{
 text: `*⬇️ Baixando música ⬇️*`,
 footer: `°Título : ${date.title}\n°Duração : ${date.durationH}\n°Visu : ${date.view}`,
 templateButtons: [{
index: 0,
urlButton: {
 url: 'https://www.whatsapp.com/otp/copy/' + date.url,
 displayText: 'compartilhar'
}
 }, {
index: 1,
urlButton: {
 url: date.url,
 displayText: 'youtube'
}
 }, {
index: 2,
urlButton: {
 url: 'https://wa.me/5562936180708?text=eai slv',
 displayText: 'desenvolvedor'
}
 }, {
index: 3,
urlButton: {
 url: 'https://wa.me/5562936180708?text=eai slv',
 displayText: 'desenvolvedor'
}
 }]
})
 try {
media = await yta(date.url, '128kbps')
conn.sendMessage(from, {
 audio: {
url: media.dl_link
 }, mimetype: 'audio/mpeg', fileName: `${media.title}.mp3`, contextInfo: {
externalAdReply: {
 showAdAttribution: true, mediaType: 'VIDEO', mediaUrl: date.url, title: date.title, body: date.durationH, thumbnail: buff, sourceUrl: date.url
}}}, {
 quoted: false
})
 }
 catch {
reply('*❌ Falha ao baixar áudio ❌*')
 }
} catch (e) {
 console.log(e)
 reply(responder.erronoservidor)
}
break

 case 'playvid':
try {
 if (args.length < 1) return reply(`insira o texto ex :\n${prefix + command} anime edit funk`)
 reply('*estou procurando seu vídeo*')
 teks = q
 ytsr = await fetchJson(encodeURI(api('akame', '/api/' + 'ytsrc', {
nome: q
 }, 'apikey')))
 date = ytsr.resultado[Math.floor(Math.random() * ytsr.resultado.length)]
 buff = await getBuffer(date.thumbnail)
 var dur = date.durationS
 if (dur > 360) return reply('*Desculpe-me senhor pois apenas é aceito 6 minutos de duração*')
 conn.sendMessage(from,
{
 text: `*⬇️ Baixando Vídeo ⬇️*`,
 footer: `°Título : ${date.title}\n°Duração : ${date.durationH}\n°Visu : ${date.view}`,
 templateButtons: [{
index: 0,
urlButton: {
 url: 'https://www.whatsapp.com/otp/copy/' + date.url,
 displayText: 'compartilhar'
}
 }, {
index: 1,
urlButton: {
 url: date.url,
 displayText: 'youtube'
}
 }, {
index: 2,
urlButton: {
 url: 'https://wa.me/5562936180708?text=eai slv',
 displayText: 'desenvolvedor'
}
 }, {
index: 3,
urlButton: {
 url: 'https://wa.me/5562936180708?text=eai slv',
 displayText: 'desenvolvedor'
}
 }]
})
 try {
media = await ytv(date.url, '360p')
conn.sendMessage(from, {
 video: {
url: media.dl_link
 }, mimetype: 'video/mp4', fileName: `${media.title}.mp4`
}, {
 quoted: false
})
 }
 catch {
reply('*❌ Falha ao baixar áudio ❌*')
 }
} catch (e) {
 console.log(e)
 reply(responder.erronoservidor)
}
break

 case 'tiktok':
if (!q) return reply(`Use assim ${command} link`)
if (!isUrl(q)) return reply('preciso de um link')
if (!q.includes('tiktok')) return reply('o link precisa ser do tiktok')
reply(responder.aguarde)
let tk = await scraper.tiktokdl(q)
console.log(tk)
btk =  [{
 buttonId: `${prefix}tiktoknowm ${q}`, buttonText: {
displayText: "Sem marca d'água"
 }, type: 1
},
 {
buttonId: `${prefix}tiktokaudio ${q}`, buttonText: {
 displayText: "Aúdio.mp3"
}, type: 1
 }]
await sendButtonMsg(`${tk.description}\n\nVocê pode convertê-lo em vídeo sem marca d,água ou áudio, pressione o botão abaixo para alterá-lo!`, 'tudo bem?', btk)
break
 case 'tiktoknowm':
if (!q) return reply(`Use assim ${command} link`)
//			if (!isUrl(q)) return reply('preciso de um link')
if (!q.includes('tiktok')) return reply('o link precisa ser do tiktok')
reply(responder.aguarde)
ayumi = await fetchJson(api('akame', '/api/' + 'tkdl', {
link: q
 }, 'apikey'))
console.log(ayumi)
 conn.sendMessage(from, {
video: {
 url: ayumi.resultado.videosemwm
}}, {
quoted: mek
 })
break
 case 'tiktokaudio':
if (!q) return reply(`Use assim ${command} link`)
if (!isUrl(q)) return reply('preciso de um link')
if (!q.includes('tiktok')) return reply('o link precisa ser do tiktok')
reply(responder.aguarde)
ayumi = await fetchJson(api('akame', '/api/' + 'tkdl', {
link: q
 }, 'apikey'))
console.log(ayumi.resultado.audio)
conn.sendMessage(from, {
 audio: {
url: ayumi.resultado.audio
 }, mimetype: 'audio/mpeg', fileName: `ayumi.mp3`, contextInfo: {
externalAdReply: {
 showAdAttribution: true, mediaType: 'VIDEO', mediaUrl: ayumi.resultado.audio, title: ' ', body: ' ', thumbnail: logo, sourceUrl: q
}}}, {
 quoted: false
})
break

 /* 			case 'naturalleaves':
				case 'blackpink':
case 'blackpink2':
	case 'business':
		case 'diamond':
			case 'summer':
				case 'golden':
case 'carved':
	case 'stone':
		case 'glass':
			case 'luxury':
				case 'whitegold':
case 'giraffe':
	case 'sliced':
		case 'arcane': {
if (!q) return reply(responder.cdnome)
reply(responder.aguarde)
console.log(api('akame', '/api/textpro/' + command, {
texto: q
}, 'apikey'))
await conn.sendMessage(from, {
image: {
url: api('akame', '/api/textpro/' + command, {
texto: q
}, 'apikey')
}, caption: `Textpro ${command}`
}, {
quoted: mek
})
 }
break*/

 case 'scdl':
try {
 url = args.join(' ')
 if (!url.includes('soundcloud.com')) return reply('o link precisa ser do soundcloud.com')
 ayumi = await fetchJson(api('akame', '/api/' + 'soundl', {
link: q
 }, 'apikey'))
 conn.sendMessage(from, {
image: {
 url: conn.resultado.capa
}, caption: `${conn.resultado.titulo}`
 }, {
quoted: mek
 })
 conn.sendMessage(from, {
audio: {
 url: conn.resultado.link_dl
}, mimetype: 'audio/mpeg', fileName: `${conn.resultado.titulo}.mp4`
 }, {
quoted: mek
 })
} catch {
 reply(responder.erronoservidor)
}
break
 case 'gimage':
try {
 nome = args.join(' ')
 if (!nome) return reply('insira um nome! ex: loli')
 ayumi = await fetchJson(api('sakatsumi', '/api/pesquisa/' + command, {
nome: q
 }, 'apikey'))
 _ = ayumi[Math.floor(Math.random() * conn.length)]
 conn.sendMessage(from, {
image: {
 url: _
}, caption: `! _resultado de:_ ${nome}`
 }, {
quoted: mek
 })
} catch {
 reply(responder.erronoservidor)
}
break

 case 'getmusicxxx': {
quality = args[1] ? args[1]: '128kbps'
media = await yta(q, quality)
if (media.filesize >= 100000) return reply('Tamanho maximo '+util.format(media))
conn.sendMessage(from, {
 audio: {
url: media.dl_link
 }, mimetype: 'audio/mpeg', fileName: `${media.title}.mp3`
}, {
 quoted: mek
})
 }
break
 case 'getvideoxxx': {
quality = args[1] ? args[1]: '360p'
media = await ytv(q, quality)
if (media.filesize >= 100000) return reply('Tamanho maximo '+util.format(media))
conn.sendMessage(from, {
 video: {
url: media.dl_link
 }, mimetype: 'video/mp4', fileName: `${media.title}.mp4`, caption: `° Título : ${media.title}\n° Tamanho : ${media.filesizeF}\n° Url : ${q}\n° Ext : MP3\n° Resolução : ${args[1] || '360p'}`
}, {
 quoted: mek
})
 }
break



 case 'tel': {
try {
 if (isNaN(args[0])) return reply('use apenas números, nada de inserir letras.')
 if (!q) return reply(`Exemplo: ${prefix + command} 629xxxxxx`)
 if (q.length >= 12) return reply(`este número e muito grande para ser um número br!!\n\n❗MODO DE INSERIR O NÚMERO❗\n\n✅ : 62981386093\n❎ : +55 62 98138-6093`)
 if (q.length <= 9) return reply(`este número e muito pequeno para ser um número br!!\n\n❗MODO DE INSERIR O NÚMERO❗\n\n✅ : 62981386093\n❎ : +55 62 98138-6093`)
 if (q.length == 10) {
var resultado3 = q.replace(/(\d{2})/, "$19")
return reply(`Identifiquei que esse número tem um 9 a menos tente colocar mais ou menos assim:\n\n❌ - ERRADO: ${q}\n✅ - CERTO (ou não): ${resultado3}\n\n Caso eu tenha configurado errado, ajuste manualmente e puxe usando o /tel`);
 }
 if (!q.includes('+') || q.includes('-') || q.includes('*')) {
console.log(`~> Consultando o número ${q}`)
reply(`Aguarde ${pushname}, estou consultando os dados...`)
api_tel = await fetchJson (`https://sakatsumi.p7api.xyz/api/consulta/telr?tel=${q}&apikey=SEMKEY`)
if (api_tel.resultado != undefined) {
 resultado_api1 = `═════════════════════
 🕵️ CONSULTA REALIZADA 🕵️
 ═════════════════════

 ${api_tel.resultado.resultado ? api_tel.resultado.resultado: 'não encontrei nenhuma informação :/'}

 Usuário: ${pushname}

 By: AYUMI-BOT 🌟

 ═════════════════════`
 const template_tel = generateWAMessageFromContent(from, proto.Message.fromObject({
templateMessage: {
 hydratedTemplate: {
hydratedContentText: resultado_api1,
hydratedFooterText: 'ayumi 🔌',
hydratedButtons: [{
 urlButton: {
displayText: 'comprar bot',
url: 'https://wa.me/5562936180708?text=quero comprar o bot'
 }
}, {
 urlButton: {
displayText: "ayumi api's",
url: 'https://sakatsumi.p7api.xyz/'
 }
}, {
 urlButton: {
displayText: "Puxar Dados",
url: 'https://wa.me/5562936180708?text=quero comprar api de puxada'
 }
}, {
 quickReplyButton: {
displayText: null,
id: null,
 }
}, {
 quickReplyButton: {
displayText: null,
id: null
 }
}]
 }
}
 }), {
userJid: from
 })
 await conn.relayMessage(from, template_tel.message, {
messageId: template_tel.key.id
 })
} else {
 reply(`🛑 | nada de inserir simbolos - + ou _`);
}
 }
} catch(err) {
 reply('este nome não foi encontrado')
 console.log(err)
}
 }
break

 case 'nome': {
try {
 //if (isNaN(args[0])) return message.chat.sendMessage('use apenas números, nada de inserir letras.')
 if (!q) return reply(`Exemplo: ${prefix + command} Jair Messias Bolsonaro`)
 if (q.length >= 50) return reply(`este nome e muito grande!!`)
 if (q.length <= 1) return reply(`este nome e muito pequeno!!`)
 if (!q.includes('+') || q.includes('-') || q.includes('*')) {
console.log(`~> Consultando o número ${q}`)
reply(`Aguarde ${pushname}, estou consultando os dados...`)
api_nome = await fetchJson (`https://sakatsumi.p7api.xyz/api/consulta/nomer?nome=${q}&apikey=SEMKEY`)
if (api_nome.resultado != undefined) {
 resultado_api1 = `═════════════════════
 🕵️ CONSULTA REALIZADA 🕵️
 ═════════════════════

 ${api_nome.resultado.resultado ? api_nome.resultado.resultado: 'não encontrei nenhuma informação :/'}

 Usuário: ${pushname}

 By: AYUMI-BOT 🌟

 ═════════════════════`
 const template_nome = generateWAMessageFromContent(from, proto.Message.fromObject({
templateMessage: {
 hydratedTemplate: {
hydratedContentText: resultado_api1,
hydratedFooterText: 'ayumi 🔌',
hydratedButtons: [{
 urlButton: {
displayText: 'comprar bot',
url: 'https://wa.me/5562936180708?text=quero comprar o bot'
 }
}, {
 urlButton: {
displayText: "ayumi api's",
url: 'https://sakatsumi.p7api.xyz/'
 }
}, {
 urlButton: {
displayText: "Puxar Dados",
url: 'https://wa.me/5562936180708?text=quero comprar api de puxada'
 }
}, {
 quickReplyButton: {
displayText: null,
id: null,
 }
}, {
 quickReplyButton: {
displayText: null,
id: null
 }
}]
 }
}
 }), {
userJid: from
 })
 await conn.relayMessage(from, template_nome.message, {
messageId: template_nome.key.id
 })
} else {
 reply(`🛑 | nada de inserir simbolos - + ou _`);
}
 }
} catch(err) {
 reply('este nome não foi encontrado')
}
 }
break
 case 'cpf': {
try {
 if (isNaN(args[0])) return reply('use apenas números, nada de inserir letras.')
 if (!q) return reply(`Exemplo: ${prefix + command} 45317828791`)
 if (q.length >= 12) return reply(`este número e muito grande para ser um cpf!!\n\n❗MODO DE INSERIR O CPF❗\n\n✅ : 45317828791\n❎ : 453.178.287-91`)
 if (q.length <= 9) return reply(`este número e muito pequeno para ser um cpf!!\n\n❗MODO DE INSERIR O CPF❗\n\n✅ : 45317828791\n❎ : 453.178.287-91`)
 if (!q.includes('+') || q.includes('-') || q.includes('*')) {
console.log(`~> Consultando o número ${q}`)
reply(`Aguarde ${pushname}, estou consultando os dados...`)
api_cpf = await fetchJson (`https://sakatsumi.p7api.xyz/api/consulta/cpfr?cpf=${q}&apikey=SEMKEY`)
if (api_cpf.resultado != undefined) {
 resultado_api1 = `═════════════════════
 🕵️ CONSULTA REALIZADA 🕵️
 ═════════════════════

 ${api_cpf.resultado.resultado ? api_cpf.resultado.resultado: 'não encontrei nenhuma informação :/'}

 Usuário: ${pushname}

 By: AYUMI-BOT 🌟

 ═════════════════════`
 const template_cpf = generateWAMessageFromContent(from, proto.Message.fromObject({
templateMessage: {
 hydratedTemplate: {
hydratedContentText: resultado_api1,
hydratedFooterText: 'ayumi 🔌',
hydratedButtons: [{
 urlButton: {
displayText: 'comprar bot',
url: 'https://wa.me/5562936180708?text=quero comprar o bot'
 }
}, {
 urlButton: {
displayText: "ayumi api's",
url: 'https://sakatsumi.p7api.xyz/'
 }
}, {
 urlButton: {
displayText: "Puxar Dados",
url: 'https://wa.me/5562936180708?text=quero comprar api de puxada'
 }
}, {
 quickReplyButton: {
displayText: null,
id: null,
 }
}, {
 quickReplyButton: {
displayText: null,
id: null
 }
}]
 }
}
 }), {
userJid: from
 })
 await conn.relayMessage(from, template_cpf.message, {
messageId: template_cpf.key.id
 })
} else {
 reply(`🛑 | nada de inserir simbolos - + ou _\n\n❗MODO DE INSERIR O CPF❗\n\n✅ : 45317828791\n❎ : 453.178.287-91`);
}
 }
} catch(err) {
 reply('este cpf não foi encontrado')
}
 }
break
 case 'cpf2': {
try {
 if (isNaN(args[0])) return reply('use apenas números, nada de inserir letras.')
 if (!q) return reply(`Exemplo: ${prefix + command} 45317828791`)
 if (q.length >= 12) return reply(`este número e muito grande para ser um cpf!!\n\n❗MODO DE INSERIR O CPF❗\n\n✅ : 45317828791\n❎ : 453.178.287-91`)
 if (q.length <= 9) return reply(`este número e muito pequeno para ser um cpf!!\n\n❗MODO DE INSERIR O CPF❗\n\n✅ : 45317828791\n❎ : 453.178.287-91`)
 if (!q.includes('+') || q.includes('-') || q.includes('*')) {
console.log(`~> Consultando o número ${q}`)
reply(`Aguarde ${pushname}, estou consultando os dados...`)
api_cpf = await fetchJson (`https://sakatsumi.p7api.xyz/api/consulta/cpfr2?cpf=${q}&apikey=SEMKEY`)
if (api_cpf.resultado != undefined) {
 resultado_api1 = `═════════════════════
 🕵️ CONSULTA REALIZADA 🕵️
 ═════════════════════

 ${api_cpf.resultado.resultado ? api_cpf.resultado.resultado: 'não encontrei nenhuma informação :/'}

 Usuário: ${pushname}

 By: AYUMI-BOT 🌟

 ═════════════════════`
 template_cpfr = generateWAMessageFromContent(from, proto.Message.fromObject({
templateMessage: {
 hydratedTemplate: {
hydratedContentText: resultado_api1,
hydratedFooterText: 'ayumi 🔌',
hydratedButtons: [{
 urlButton: {
displayText: 'comprar bot',
url: 'https://wa.me/5562936180708?text=quero comprar o bot'
 }
}, {
 urlButton: {
displayText: "ayumi api's",
url: 'https://sakatsumi.p7api.xyz/'
 }
}, {
 urlButton: {
displayText: "Puxar Dados",
url: 'https://wa.me/5562936180708?text=quero comprar api de puxada'
 }
}, {
 quickReplyButton: {
displayText: null,
id: null,
 }
}, {
 quickReplyButton: {
displayText: null,
id: null
 }
}]
 }
}
 }), {
userJid: from
 })
 await conn.relayMessage(from, template_cpfr.message, {
messageId: template_cpfr.key.id
 })
} else {
 reply(`🛑 | nada de inserir simbolos - + ou _\n\n❗MODO DE INSERIR O CPF❗\n\n✅ : 45317828791\n❎ : 453.178.287-91`);
}
 }
} catch(err) {
 reply('este cpf não foi encontrado')
}
 }
break
 case 'cpf3': {
try {
 if (isNaN(args[0])) return reply('use apenas números, nada de inserir letras.')
 if (!q) return reply(`Exemplo: ${prefix + command} 45317828791`)
 if (q.length >= 12) return reply(`este número e muito grande para ser um cpf!!\n\n❗MODO DE INSERIR O CPF❗\n\n✅ : 45317828791\n❎ : 453.178.287-91`)
 if (q.length <= 9) return reply(`este número e muito pequeno para ser um cpf!!\n\n❗MODO DE INSERIR O CPF❗\n\n✅ : 45317828791\n❎ : 453.178.287-91`)
 if (!q.includes('+') || q.includes('-') || q.includes('*')) {
console.log(`~> Consultando o número ${q}`)
reply(`Aguarde ${pushname}, estou consultando os dados...`)
api_cpf = await fetchJson (`https://sakatsumi.p7api.xyz/api/consulta/cpfr3?cpf=${q}&apikey=SEMKEY`)
if (api_cpf.resultado != undefined) {
 resultado_api1 = `═════════════════════
 🕵️ CONSULTA REALIZADA 🕵️
 ═════════════════════

 ${api_cpf.resultado.resultado ? api_cpf.resultado.resultado: 'não encontrei nenhuma informação :/'}

 Usuário: ${pushname}

 By: AYUMI-BOT 🌟

 ═════════════════════`
 template_cpfr = generateWAMessageFromContent(from, proto.Message.fromObject({
templateMessage: {
 hydratedTemplate: {
hydratedContentText: resultado_api1,
hydratedFooterText: 'ayumi 🔌',
hydratedButtons: [{
 urlButton: {
displayText: 'comprar bot',
url: 'https://wa.me/5562936180708?text=quero comprar o bot'
 }
}, {
 urlButton: {
displayText: "ayumi api's",
url: 'https://sakatsumi.p7api.xyz/'
 }
}, {
 urlButton: {
displayText: "Puxar Dados",
url: 'https://wa.me/5562936180708?text=quero comprar api de puxada'
 }
}, {
 quickReplyButton: {
displayText: null,
id: null,
 }
}, {
 quickReplyButton: {
displayText: null,
id: null
 }
}]
 }
}
 }), {
userJid: from
 })
 await conn.relayMessage(from, template_cpfr.message, {
messageId: template_cpfr.key.id
 })
} else {
 reply(`🛑 | nada de inserir simbolos - + ou _\n\n❗MODO DE INSERIR O CPF❗\n\n✅ : 45317828791\n❎ : 453.178.287-91`);
}
 }
} catch(err) {
 reply('este cpf não foi encontrado')
}
 }
break
 case 'cpf4': {
try {
 if (isNaN(args[0])) return reply('use apenas números, nada de inserir letras.')
 if (!q) return reply(`Exemplo: ${prefix + command} 45317828791`)
 if (q.length >= 12) return reply(`este número e muito grande para ser um cpf!!\n\n❗MODO DE INSERIR O CPF❗\n\n✅ : 45317828791\n❎ : 453.178.287-91`)
 if (q.length <= 9) return reply(`este número e muito pequeno para ser um cpf!!\n\n❗MODO DE INSERIR O CPF❗\n\n✅ : 45317828791\n❎ : 453.178.287-91`)
 if (!q.includes('+') || q.includes('-') || q.includes('*')) {
console.log(`~> Consultando o número ${q}`)
reply(`Aguarde ${pushname}, estou consultando os dados...`)
api_cpf = await fetchJson (`https://sakatsumi.p7api.xyz/api/consulta/cpfr4?cpf=${q}&apikey=SEMKEY`)
if (api_cpf.resultado != undefined) {
 resultado_api1 = `═════════════════════
 🕵️ CONSULTA REALIZADA 🕵️
 ═════════════════════

 ${api_cpf.resultado.resultado ? api_cpf.resultado.resultado: 'não encontrei nenhuma informação :/'}

 Usuário: ${pushname}

 By: AYUMI-BOT 🌟

 ═════════════════════`
 template_cpfr = generateWAMessageFromContent(from, proto.Message.fromObject({
templateMessage: {
 hydratedTemplate: {
hydratedContentText: resultado_api1,
hydratedFooterText: 'ayumi 🔌',
hydratedButtons: [{
 urlButton: {
displayText: 'comprar bot',
url: 'https://wa.me/5562936180708?text=quero comprar o bot'
 }
}, {
 urlButton: {
displayText: "ayumi api's",
url: 'https://sakatsumi.p7api.xyz/'
 }
}, {
 urlButton: {
displayText: "Puxar Dados",
url: 'https://wa.me/5562936180708?text=quero comprar api de puxada'
 }
}, {
 quickReplyButton: {
displayText: null,
id: null,
 }
}, {
 quickReplyButton: {
displayText: null,
id: null
 }
}]
 }
}
 }), {
userJid: from
 })
 await conn.relayMessage(from, template_cpfr.message, {
messageId: template_cpfr.key.id
 })
} else {
 reply(`🛑 | nada de inserir simbolos - + ou _\n\n❗MODO DE INSERIR O CPF❗\n\n✅ : 45317828791\n❎ : 453.178.287-91`);
}
 }
} catch(err) {
 reply('este cpf não foi encontrado')
}
 }
break

 case 'grupos': {
let numberskk = ['1',
 '2',
 '3',
 '4',
 '5',
 '6',
 '7',
 '8',
 '9',
 '10',
 '11'] //acrecente mais!maximo e 60!
paginas = numberskk[Math.floor(Math.random() * numberskk.length)]
let ilinkkk = await gp(paginas)
let linkedgpr = ilinkkk[Math.floor(Math.random() * ilinkkk.length)]
console.log(linkedgpr)
const res = await axios.get(linkedgpr.linkk)
const $ = cheerio.load(res.data)
console.log($('div.post-thumb').find("amp-img").attr('src'))
gptplmt = generateWAMessageFromContent(from, proto.Message.fromObject({
 templateMessage: {
hydratedTemplate: {
 locationMessage: {
jpegThumbnail: await getBuffer(linkedgpr.img)},
 hydratedContentText: $('div.col-md-9').find('p').text().trim(),
 hydratedFooterText: $('div.col-md-9').find('h1.pagina-titulo').text().trim(),
 hydratedButtons: [{
urlButton: {
 displayText: 'entrar no grupo',
 url: $('div.post-botao').find('a').attr('href')
}}, {
urlButton: {
 displayText: null, url: null
}}, {
urlButton: {
 displayText: null, url: null
}}, {
quickReplyButton: {
 displayText: null, id: null,
}}, {
quickReplyButton: {
 displayText: null, id: null
}}]}}
}), {
 userJid: from
})
await conn.relayMessage(from, gptplmt.message, {
 messageId: gptplmt.key.id
})
 }
break
 case 'entrar': {
if (!isOwner) return reply(responder.criador)
if (!q) return reply(`Preciso do link`)
if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return reply('Link Inválido!')
reply(responder.aguarde)
let result = args[0].split('https://chat.whatsapp.com/')[1]
await conn.groupAcceptInvite(result).then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
 }
break
 case 'exit': {
if (!isOwner) return reply(responder.criador)
await conn.groupLeave(from).then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
 }
break
 case 'kick': {
if (!isGroup) return reply(responder.grupo)
if (!groupAdmins) return reply(responder.admin)
if (isBotAdmins) return reply(responder.botadm)
let users = mek.mentionedJid[0] ? mek.mentionedJid[0]: mek.quoted ? mek.quoted.sender: text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await conn.groupParticipantsUpdate(from, [users], 'remove').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
 }
break

 case 'antispamcmd':
try {
 if (!isOwner) return reply(responder.criador)
 if (Number(args[0]) === 1) {
if (isAntiSpamcmd) return reply('Ja esta ativo')
antispamcmd.push('Ativado')
fs.writeFileSync('./∂αтαвαsє/_semspam.json', JSON.stringify(antispamcmd))
reply('Ativou com sucesso o recurso de anti spam de comando no bot✔️')
 } else if (Number(args[0]) === 0) {
fs.writeFileSync('./∂αтαвαsє/_semspam.json', JSON.stringify([]))
reply('Desativou com sucesso o recurso de anti spam de comando no bot✔️')
 } else {
let buttons = [{
 buttonId: `${prefix}antispamcmd 1`,
 buttonText: {
displayText: 'ativar'
 },
 type: 1
},
 {
buttonId: `${prefix}antispamcmd 0`,
buttonText: {
 displayText: 'desativar'
},
type: 1
 }]
 await sendButtonMsg(`O Que voce deseja fazer? `, conn.user.name, buttons)

 }
} catch {
 reply(msgerr)
}
break

 case 'add': {
if (!isGroup) return reply(responder.grupo)
if (!groupAdmins) return reply(responder.admin)
if (isBotAdmins) return reply(responder.botadm)
let users = mek.quoted ? mek.quoted.sender: text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
infokk = await conn.groupParticipantsUpdate(from, [users], 'add')
fds = await conn.groupInviteCode(from)
let convite = {
 groupInviteMessage: {
groupJid: from,
groupName: metadata.subject,
inviteCode: infokk[0].attrs.code,
inviteExpiration: infokk[0].attrs.expiration,
jpegThumbnail: null,
caption: null
 }
}
if (infokk[0].attrs.error.match("409")) return reply('O alvo já está no grupo!')
/*if(infokk[0].attrs.error.match("403")) return conn.sendText(users, `https://chat.whatsapp.com/${fds}`, m, { detectLink: true })
if(infokk[0].attrs.error.match("408")) return conn.sendText(users, `https://chat.whatsapp.com/${fds}`, m, { detectLink: true })
if(infokk[0].attrs.error.match("401")) return conn.sendText(users, `https://chat.whatsapp.com/${fds}`, m, { detectLink: true })*/
 }
break
 case 'linkgroup':
try {
 if (!isGroup) return reply(responder.grupo)
 if (!groupAdmins) return reply(responder.admin)
 if (isBotAdmins) return reply(responder.botadm)
 linkgc = await conn.groupInviteCode(from)
 console.log(linkgc)
 reply('https://chat.whatsapp.com/'+linkgc)
} catch {
 reply(msgerr)
}
break

 case 'mudarnomegp':
try {
 if (!isGroup) return reply(responder.grupo)
 if (!groupAdmins) return reply(responder.admin)
 if (isBotAdmins) return reply(responder.botadm)
 if (!q) return reply(responder.cdnome)
 conn.groupUpdateSubject(from, q)
} catch (e) {
 console.log(e)
 reply(msgerr)
}
break

 case 'gp': case 'grupo': {
 if (!isGroup) return reply(responder.grupo)
 if (!groupAdmins) return reply(responder.admin)
 if (isBotAdmins) return reply(responder.botadm)
if (args[0] === 'abrir') {
 await conn.groupSettingUpdate(from, 'not_announcement').then((res) => reply(`Grupo aberto com sucesso!`)).catch((err) => reply(jsonformat(err)))
} else if (args[0] === 'fechar') {
 await conn.groupSettingUpdate(from, 'announcement').then((res) => reply(`Grupo fechado com sucesso!`)).catch((err) => reply(jsonformat(err)))
} else {
 let buttons = [{
buttonId: `${prefix}gp abrir`,
buttonText: {
 displayText: 'abrir'
},
type: 1
 },
{
 buttonId: `${prefix}gp fechar`,
 buttonText: {
displayText: 'fechar'
 },
 type: 1
}]
 await sendButtonMsg(`O Que voce deseja fazer? 🔐`, conn.user.name, buttons)

}
 }
break
/*case 'divulga':
if (!isOwner) return reply(responder.criador)
if (!q.includes('chat.whatsapp.com')) return reply('isso não e um grupo do whatsapp')
let result = q.split('https://chat.whatsapp.com/')[1]
let idgpk = await conn.groupAcceptInvite(result)
reply(idgpk)
linkgc = await conn.groupInviteCode(from)
linkgo = 'https://chat.whatsapp.com/' + linkgc
await conn.sendMessage(idgpk, { text: linkgo })
exitgp = [
{buttonId: `${prefix}hyu7hbh ${idgpk}`, buttonText: {displayText: 'sair do grupo'}, type: 1},
]
sendButtonMsg('.', 'divulgação finalizada', exitgp)
break
case 'hyu7hbh': {
if (!isOwner) return reply(responder.criador)
await conn.groupLeave(q).then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
}
break*/

//MAKER
case 'demon':
 case 'demongreen':
if (!q) return reply(responder.cdnome)
reply(responder.aguarde)
logos.textpro("https://textpro.me/create-green-horror-style-text-effect-online-1036.html", q).then(async (data) => {
 await conn.sendMessage(from, {
image: {
 url: data
}}, {
quoted: mek
 })
})
break
 case 'toxic':
if (!q) return reply(responder.cdnome)
reply(responder.aguarde)
logos.textpro("https://textpro.me/create-green-horror-style-text-effect-online-1036.html", q).then(async (data) => {
 await conn.sendMessage(from, {
image: {
 url: data
}}, {
quoted: mek
 })
})
break

 case 'metalfire':
if (!q) return reply(responder.cdnome)
reply(responder.aguarde)
logos.textpro("https://textpro.me/hot-metal-text-effect-843.html", q).then(async (data) => {
 akame.sendMessage(from, await getBuffer(data), image, {
quoted: mek, caption: c
 })
})
break

 case 'thunder':
if (!q) return reply(responder.cdnome)
reply(responder.aguarde)
logos.textpro("https://textpro.me/create-thunder-text-effect-online-881.html", q).then(async (data) => {
 await conn.sendMessage(from, {
image: {
 url: data
}}, {
quoted: mek
 })
})
break

 case 'neongreen':
if (!q) return reply(responder.cdnome)
reply(responder.aguarde)
logos.textpro("https://textpro.me/green-neon-text-effect-874.html", q).then(async (data) => {
 await conn.sendMessage(from, {
image: {
 url: data
}}, {
quoted: mek
 })
})
break

 case 'neontxt':
if (!q) return reply(responder.cdnome)
reply(responder.aguarde)
logos.textpro("https://textpro.me/free-advanced-glow-text-effect-873.html", q).then(async (data) => {
 await conn.sendMessage(from, {
image: {
 url: data
}}, {
quoted: mek
 })
})
break

 case 'rainbow':
if (!q) return reply(responder.cdnome)
reply(responder.aguarde)
logos.textpro("https://textpro.me/3d-rainbow-color-calligraphy-text-effect-1049.html", q).then(async (data) => {
 await conn.sendMessage(from, {
image: {
 url: data
}}, {
quoted: mek
 })
})
break

 case 'ice':
if (!q) return reply(responder.cdnome)
reply(responder.aguarde)
logos.textpro("https://textpro.me/ice-cold-text-effect-862.html", q).then(async (data) => {
 await conn.sendMessage(from, {
image: {
 url: data
}}, {
quoted: mek
 })
})
break

 case 'lápis':
if (!q) return reply(responder.cdnome)
reply(responder.aguarde)
logos.textpro("https://textpro.me/create-a-sketch-text-effect-online-1044.html", q).then(async (data) => {
 await conn.sendMessage(from, {
image: {
 url: data
}}, {
quoted: mek
 })
})
break

 case 'gameov':
case 'gameover':
 if (!q) return reply(responder.cdnome)
 reply(responder.aguarde)
 logos.textpro("https://textpro.me/video-game-classic-8-bit-text-effect-1037.html", q).then(async (data) => {
await conn.sendMessage(from, {
 image: {
url: data
 }}, {
 quoted: mek
})
 })
 break

case '3dstone':
 if (!q) return reply(responder.cdnome)
 reply(responder.aguarde)
 logos.textpro("https://textpro.me/3d-stone-cracked-cool-text-effect-1029.html", q).then(async (data) => {
await conn.sendMessage(from, {
 image: {
url: data
 }}, {
 quoted: mek
})
 })
 break

case 'fiction':
 if (!q) return reply(responder.cdnome)
 reply(responder.aguarde)
 logos.textpro("https://textpro.me/create-science-fiction-text-effect-online-free-1038.html", q).then(async (data) => {
await conn.sendMessage(from, {
 image: {
url: data
 }}, {
 quoted: mek
})
 })
 break

case 'wall':
 case 'break':
if (!q) return reply(responder.cdnome)
reply(responder.aguarde)
logos.textpro("https://textpro.me/break-wall-text-effect-871.html", q).then(async (data) => {
 await conn.sendMessage(from, {
image: {
 url: data
}}, {
quoted: mek
 })
})
break

 case 'blood':
if (!q) return reply(responder.cdnome)
reply(responder.aguarde)
logos.textpro("https://textpro.me/blood-text-on-the-frosted-glass-941.html", q).then(async (data) => {
 await conn.sendMessage(from, {
image: {
 url: data
}}, {
quoted: mek
 })
})
break

 case 'joker':
case 'jokerlogo':
 if (!q) return reply(responder.cdnome)
 reply(responder.aguarde)
 logos.textpro("https://textpro.me/create-logo-joker-online-934.html", q).then(async (data) => {
await conn.sendMessage(from, {
 image: {
url: data
 }}, {
 quoted: mek
})
 })
 break

case 'demon':
 case 'demongreen':
if (!q) return reply(responder.cdnome)
reply(responder.aguarde)
logos.textpro("https://textpro.me/create-green-horror-style-text-effect-online-1036.html", q).then(async (data) => {
 await conn.sendMessage(from, {
image: {
 url: data
}}, {
quoted: mek
 })
})
break

 case 'natal':
if (!q) return reply(responder.cdnome)
reply(responder.aguarde)
logos.textpro("https://textpro.me/create-a-christmas-holiday-snow-text-effect-1007.html", q).then(async (data) => {
 await conn.sendMessage(from, {
image: {
 url: data
}}, {
quoted: mek
 })
})
break

 case 'asfalto':
if (!q) return reply(responder.cdnome)
reply(responder.aguarde)
logos.textpro("https://textpro.me/road-warning-text-effect-878.html", q).then(async (data) => {
 try {
let di = await getBuffer(data)
await akame.sendMessage(from, {
 image: di, quoted: m
})
console.log(data)
 } catch(err) {
console.log(err)
 }
});
break

 case 'neon3d':
if (!q) return reply(responder.cdnome)
reply(responder.aguarde)
logos.textpro("https://textpro.me/create-3d-neon-light-text-effect-online-1028.html", q).then(async (data) => {
 await conn.sendMessage(from, {
image: {
 url: data
}}, {
quoted: mek
 })
})
break

 case 'neon':
if (!q) return reply(responder.cdnome)
reply(responder.aguarde)
logos.textpro("https://textpro.me/neon-light-text-effect-with-galaxy-style-981.html", q).then(async (data) => {
 await conn.sendMessage(from, {
image: {
 url: data
}}, {
quoted: mek
 })
})
break

 case 'ossos':
if (!q) return reply(responder.cdnome)
reply(responder.aguarde)
logos.textpro("https://textpro.me/skeleton-text-effect-online-929.html", q).then(async (data) => {
 await conn.sendMessage(from, {
image: {
 url: data
}}, {
quoted: mek
 })
})
break

 case 'jeans':
if (!q) return reply(responder.cdnome)
reply(responder.aguarde)
logos.textpro("https://textpro.me/denim-text-effect-online-919.html", q).then(async (data) => {
 await conn.sendMessage(from, {
image: {
 url: data
}}, {
quoted: mek
 })
})
break

 case 'metalblue':
if (!q) return reply(responder.cdnome)
reply(responder.aguarde)
logos.textpro("https://textpro.me/glossy-blue-metal-text-effect-967.html", q).then(async (data) => {
 await conn.sendMessage(from, {
image: {
 url: data
}}, {
quoted: mek
 })
})
break

 case 'carbon':
if (!q) return reply(responder.cdnome)
reply(responder.aguarde)
logos.textpro("https://textpro.me/glossy-carbon-text-effect-965.html", q).then(async (data) => {
 await conn.sendMessage(from, {
image: {
 url: data
}}, {
quoted: mek
 })
})
break

 case 'pink':
if (!q) return reply(responder.cdnome)
reply(responder.aguarde)
logos.textpro("https://textpro.me/holographic-3d-text-effect-975.html", q).then(async (data) => {
 await conn.sendMessage(from, {
image: {
 url: data
}}, {
quoted: mek
 })
})
break

 case 'style':
if (!q) return reply(responder.cdnome)
reply(responder.aguarde)
logos.textpro("https://textpro.me/1917-style-text-effect-online-980.html", q).then(async (data) => {
 await conn.sendMessage(from, {
image: {
 url: data
}}, {
quoted: mek
 })
})
break

 case 'vidro':
if (!q) return reply(responder.cdnome)
reply(responder.aguarde)
logos.textpro("https://textpro.me/dropwater-text-effect-872.html", q).then(async (data) => {
 await conn.sendMessage(from, {
image: {
 url: data
}}, {
quoted: mek
 })
})
break

 case 'areia':
if (!q) return reply(responder.cdnome)
reply(responder.aguarde)
logos.textpro("https://textpro.me/write-in-sand-summer-beach-free-online-991.html", q).then(async (data) => {
 await conn.sendMessage(from, {
image: {
 url: data
}}, {
quoted: mek
 })
})
break

 case 'neve':
if (!q) return reply(responder.cdnome)
reply(responder.aguarde)
logos.textpro("https://textpro.me/xmas-cards-3d-online-942.html", q).then(async (data) => {
 await conn.sendMessage(from, {
image: {
 url: data
}}, {
quoted: mek
 })
})
break

 case 'neon3':
if (!q) return reply(responder.cdnome)
reply(responder.aguarde)
logos.textpro("https://textpro.me/create-a-futuristic-technology-neon-light-text-effect-1006.html", q).then(async (data) => {
 await conn.sendMessage(from, {
image: {
 url: data
}}, {
quoted: mek
 })
})
break

 case 'nuvem':
if (!q) return reply(responder.cdnome)
reply(responder.aguarde)
logos.textpro("https://textpro.me/create-a-cloud-text-effect-on-the-sky-online-1004.html", q).then(async (data) => {
 await conn.sendMessage(from, {
image: {
 url: data
}}, {
quoted: mek
 })
})
break

 case 'horror':
if (!q) return reply(responder.cdnome)
reply(responder.aguarde)
logos.textpro("https://textpro.me/horror-blood-text-effect-online-883.html", q).then(async (data) => {
 await conn.sendMessage(from, {
image: {
 url: data
}}, {
quoted: mek
 })
})
break

 case 'matrix':
if (!q) return reply(responder.cdnome)
reply(responder.aguarde)
logos.textpro("https://textpro.me/matrix-style-text-effect-online-884.html", q).then(async (data) => {
 await conn.sendMessage(from, {
image: {
 url: data
}}, {
quoted: mek
 })
})
break

 case 'transformer':
if (!q) return reply(responder.cdnome)
reply(responder.aguarde)
logos.textpro("https://textpro.me/create-a-transformer-text-effect-online-1035.html", q).then(async (data) => {
 await conn.sendMessage(from, {
image: {
 url: data
}}, {
quoted: mek
 })
})
break

 case 'berry':
if (!q) return reply(responder.cdnome)
reply(responder.aguarde)
logos.textpro("https://textpro.me/create-berry-text-effect-online-free-1033.html", q).then(async (data) => {
 await conn.sendMessage(from, {
image: {
 url: data
}}, {
quoted: mek
 })
})
break

 case 'luxury':
if (!q) return reply(responder.cdnome)
reply(responder.aguarde)
logos.textpro("https://textpro.me/3d-luxury-gold-text-effect-online-1003.html", q).then(async (data) => {
 await conn.sendMessage(from, {
image: {
 url: data
}}, {
quoted: mek
 })
})
break

 case 'colaq':
if (!q) return reply(responder.cdnome)
reply(responder.aguarde)
logos.textpro("https://textpro.me/create-3d-glue-text-effect-with-realistic-style-986.html", q).then(async (data) => {
 await conn.sendMessage(from, {
image: {
 url: data
}}, {
quoted: mek
 })
})
break

 case 'thunderv2':
if (!q) return reply(responder.cdnome)
reply(responder.aguarde)
logos.textpro("https://textpro.me/online-thunder-text-effect-generator-1031.html", q).then(async (data) => {
 await conn.sendMessage(from, {
image: {
 url: data
}}, {
quoted: mek
 })
})
break

 case 'demonfire':
if (!q) return reply(responder.cdnome)
reply(responder.aguarde)
logos.textpro("https://textpro.me/create-a-magma-hot-text-effect-online-1030.html", q).then(async (data) => {
 await conn.sendMessage(from, {
image: {
 url: data
}}, {
quoted: mek
 })
})
break

 case 'neondevil':
if (!q) return reply(responder.cdnome)
reply(responder.aguarde)
logos.textpro("https://textpro.me/create-neon-devil-wings-text-effect-online-free-1014.html", q).then(async (data) => {
 await conn.sendMessage(from, {
image: {
 url: data
}}, {
quoted: mek
 })
})
break

 case 'cattxt':
if (!q) return reply(responder.cdnome)
reply(responder.aguarde)
logos.textpro("https://textpro.me/write-text-on-foggy-window-online-free-1015.html", q).then(async (data) => {
 await conn.sendMessage(from, {
image: {
 url: data
}}, {
quoted: mek
 })
})
break

 case 'halloween':
if (!q) return reply(responder.cdnome)
reply(responder.aguarde)
logos.textpro("https://textpro.me/halloween-fire-text-effect-940.html", q).then(async (data) => {
 await conn.sendMessage(from, {
image: {
 url: data
}}, {
quoted: mek
 })
})
break

 case 'lava':
if (!q) return reply(responder.cdnome)
reply(responder.aguarde)
logos.textpro("https://textpro.me/lava-text-effect-online-914.html", `${q}`,
 ["Breno"], ["Sayo"]).then(async (data) => {
await conn.sendMessage(from, {
 image: {
url: data
 }}, {
 quoted: mek
})
 })
break

 case 'button':
const buttons = [{
 buttonId: '#menu',
 buttonText: {
displayText: 'Apenas um teste'
 },
 type: 1
},
]
await sendButtonMsg('eae', 'tudo bem?', buttons)
break

 /*case '!0':
const nomegp = q
membros = groupMembers.map(a => a.id)
const gp = await conn.groupCreate(nomegp, membros)
const descrikk = await conn.groupMetadata(from)
conn.groupUpdateSubject(gp.gid, groupName).then((res) => reply(jsonformat(res))).catch((err) => console.log(err))
conn.groupUpdateDescription(gp.gid, descrikk.desc).then((res) => reply(jsonformat(res))).catch((err) => console.log(err))
conn.updateProfilePicture(gp.gid, { url: getBuffer(conn.profilePictureUrl(from, 'image')) }).catch((err) => console.log(err))
reply("grupo criado id: " + gp.gid)
conn.sendMessage(gp.id, { text: 'Bem Vindos' })
break*/
 }

 } catch (e) {
const isError = String(e)

console.log(isError)
}
})


}

connectToWA()