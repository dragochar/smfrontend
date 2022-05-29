import Discord from 'discord.js';
require('dotenv').config();
const axios = require('axios');



const DiscordAlert = async (mint, giveawayData) => {

    let formatSpots = giveawayData.numSpots;
    if (formatSpots=='') {formatSpots='0'}
    let formatDescription = giveawayData.description;
    if (formatDescription=='') {formatDescription='Enter Giveaway'}

    axios.post('https://discord.com/api/webhooks/979803617416597604/Mn82ZldZghiPDYja97yQw0dyqqtksEEQkN_mKnR0kOpC735CZCr4yHWYfnXMK4j0lb1k',
        {
            "embeds": [
                {
                    "title": `WHITELIST SPOTS GIVEAWAY :tada:`,
                    "description": `${formatSpots} spots for **${mint.name}** \n *${formatDescription}*`,
                    "fields": [
                        {
                            "name": ":eagle: **Twitter**",
                            "value": `${mint.twitter}`,
                            "inline": true
                        },
                        {
                            "name": ":desktop: **Discord**",
                            "value": `${mint.discord}`,
                            "inline": true
                        },
                        {
                            "name": ":tickets: **Enter Raffle:**",
                            "value": `https://solmints.io/ggsg/`
                        },
                    ],
            
                }
            ],
            "content": "<@&935914877447458926>"
        }
    )




}

export default DiscordAlert;