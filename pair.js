const { makeid } = require('./gen-id');
const express = require('express');
const fs = require('fs');
let router = express.Router();
const pino = require("pino");
const { default: makeWASocket, useMultiFileAuthState, delay, Browsers, makeCacheableSignalKeyStore } = require('@whiskeysockets/baileys')

const { upload } = require('./mega');

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;
    
    async function GIFTED_MD_PAIR_CODE() {
        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);
        
        try {
            var items = ["Safari"];
            function selectRandomItem(array) {
                var randomIndex = Math.floor(Math.random() * array.length);
                return array[randomIndex];
            }
            var randomItem = selectRandomItem(items);
            
            let sock = makeWASocket({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
                },
                printQRInTerminal: false,
                generateHighQualityLinkPreview: true,
                logger: pino({ level: "fatal" }).child({ level: "fatal" }),
                syncFullHistory: false,
                browser: Browsers.macOS(randomItem)
            });
            
            if (!sock.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
                const code = await sock.requestPairingCode(num);
                if (!res.headersSent) {
                    await res.send({ code });
                }
            }
            
            sock.ev.on('creds.update', saveCreds);
            sock.ev.on("connection.update", async (s) => {
                const { connection, lastDisconnect } = s;
                
                if (connection == "open") {
                    await delay(5000);
                    let rf = __dirname + `/temp/${id}/creds.json`;
                    
                    try {
                        // Use the simplified upload function
                        const sessionId = await upload(fs.createReadStream(rf), `${sock.user.id}.json`);
                        let md = "JINWOO~" + sessionId;
                        let code = await sock.sendMessage(sock.user.id, { text: md });
                        
                        let desc = `*Hello there JINWOO-XMD User! 👋🏻* 

> Do not share your session id with anyone.

 *Thanks for using JINWOO-XMD* 

> Join WhatsApp Channel :- ⤵️
 
 https://whatsapp.com/channel/0029Vb6FtUCIiRoldfIYio19

Dont forget to fork the repo ⬇️

https://github.com/JaydenJava/JINWOO-XMD

> *© Pᴏᴡᴇʀᴇᴅ ʙʏ Jᴀʏᴅᴇɴ Jᴀᴠᴀ ❄*`;
                        
                        await sock.sendMessage(sock.user.id, {
                            text: desc,
                            contextInfo: {
                                externalAdReply: {
                                    title: "Jᴀʏᴅᴇɴ Jᴀᴠᴀ",
                                    thumbnailUrl: "https://files.catbox.moe/x1onpj.jpg",
                                    sourceUrl: "https://whatsapp.com/channel/0029Vb6FtUCIiRoldfIYio19",
                                    mediaType: 1,
                                    renderLargerThumbnail: true
                                }  
                            }
                        }, { quoted: code });
                        
                    } catch (e) {
                        console.error("Error in session handling:", e);
                        let ddd = await sock.sendMessage(sock.user.id, { text: "Error: " + e.message });
                        let desc = `*Don't Share with anyone this code use for deploy JINWOO-XMD*\n\n ◦ *Github:* https://github.com/JaydenJava/JINWOO-XMD`;
                        await sock.sendMessage(sock.user.id, {
                            text: desc,
                            contextInfo: {
                                externalAdReply: {
                                    title: "JINWOO-XMD",
                                    thumbnailUrl: "https://files.catbox.moe/x1onpj.jpg",
                                    sourceUrl: "https://whatsapp.com/channel/0029Vb6FtUCIiRoldfIYio19",
                                    mediaType: 2,
                                    renderLargerThumbnail: true,
                                    showAdAttribution: true
                                }  
                            }
                        }, { quoted: ddd });
                    }
                    
                    await delay(10);
                    await sock.ws.close();
                    await removeFile('./temp/' + id);
                    console.log(`👤 ${sock.user.id} 𝗖𝗼𝗻𝗻𝗲𝗰𝘁𝗲𝗱 ✅ 𝗥𝗲𝘀𝘁𝗮𝗿𝘁𝗶𝗻𝗴 𝗽𝗿𝗼𝗰𝗲𝘀𝘀...`);
                    await delay(10);
                    process.exit();
                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10);
                    GIFTED_MD_PAIR_CODE();
                }
            });
        } catch (err) {
            console.log("Service restart error:", err);
            await removeFile('./temp/' + id);
            if (!res.headersSent) {
                await res.send({ code: "❗ Service Unavailable" });
            }
        }
    }
    
    return await GIFTED_MD_PAIR_CODE();
});

module.exports = router;