
//FORMAT: brandLogo, pageName, dao, AdminUsers
import ggsgBL from '../assets/ggsg.gif';
import ggsgAU from '../wallets/ggsgwallets';
import bbaBL from '../assets/bitbearalpha.png';
import bbaAU from '../wallets/bitbearadminwallets';
import tdBL from '../assets/tD.png'
import tdAU from '../wallets/tdwallets';
import mdBL from '../assets/monkedao.png'
import mdAU from '../wallets/mdwallets';



const ggsg = {
    brandLogo: ggsgBL, pageName: 'ggsg', dao: 'ggsgDAO', AdminUsers: ggsgAU, textName: 'Gecko'
}

const bitbearalpha = {
    brandLogo: bbaBL, pageName: 'bitbearalpha', dao: 'bbaDAO', AdminUsers: bbaAU, textName: 'BBA'
}

const tD = {
    brandLogo: tdBL, pageName: 'tD', dao: 'tDAO', AdminUsers: tdAU, textName: 'Trust'
}

const monkedao = {
    brandLogo: mdBL, pageName: 'monkedao', dao: 'monkeDAO', AdminUsers: mdAU, textName: 'Monke'
}


const Master = {
    ggsg: ggsg, bitbearalpha: bitbearalpha, tD: tD, monkedao: monkedao
};


export default Master;
