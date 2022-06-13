
//FORMAT: brandLogo, pageName, dao, AdminUsers
import ggsgBL from '../assets/ggsg.gif';
import ggsgAU from '../wallets/ggsgwallets';
import bbaBL from '../assets/bitbearalpha.png';
import bbaAU from '../wallets/bitbearadminwallets';
import tdBL from '../assets/tD.png'
import tdAU from '../wallets/tdwallets';



const ggsg = {
    brandLogo: ggsgBL, pageName: 'ggsg', dao: 'ggsgDAO', AdminUsers: ggsgAU
}

const bitbearalpha = {
    brandLogo: bbaBL, pageName: 'bitbearalpha', dao: 'bbaDAO', AdminUsers: bbaAU
}

const tD = {
    brandLogo: tdBL, pageName: 'tD', dao: 'tDAO', AdminUsers: tdAU
}


const Master = {
    ggsg: ggsg, bitbearalpha: bitbearalpha, tD: tD
};


export default Master;
