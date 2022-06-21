const axios = require('axios');



const DiscordAlert = async (mint, giveawayData) => {

    let formatSpots = giveawayData.numSpots;
    if (formatSpots=='') {formatSpots='0'}
    let formatDescription = giveawayData.description;
    if (formatDescription=='') {formatDescription='Enter Giveaway'}

    axios.post('https://discord.com/api/webhooks/986079763179401236/yfhl9JPS6Wm064YZ5M5sxc96oDSgw6Fe6mIMK2kCMG1su-9j2Wg85lvdaYflL-FPjNou',
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
                            "value": `https://solmints.io/monkedao?view=giveaways`
                        },
                        {
                            "name": ":microphone2: Hosted by:",
                            "value": `<@${giveawayData.creator}>`
                        },
                    ],
            
                }
            ],
            "content": "<@&986080066742140928>"
        }
    )




}

export default DiscordAlert;