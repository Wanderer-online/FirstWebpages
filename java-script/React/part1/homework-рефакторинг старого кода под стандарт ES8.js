"use strict";
const employers = ['Alex', '', 'ludmila', 'Viktor', '', 'oleg', 'iNna', 'Ivan', 'Alex', 'Olga', ' Ann'];

const employersNames = employers.filter((name)=>{
    if(name!=""){
        return name;
    }
}).map((name)=>{
    return name.toLowerCase().trim();
});

// let employersNames = [];

// for (let i = 0; i < employers.length; i++) {
// 	if (employers[i].length > 0 && employers[i].length != '') {
// 		employersNames.push(employers[i]);
// 	}
// }
// for (let i = 0; i < employersNames.length; i++) {
// 	employersNames[i] = employersNames[i].toLowerCase().trim();
// }

const sponsors = {
    cash: [40000, 5000, 30400, 12000],
    eu: ['SRL', 'PLO', 'J&K'],
    rus: ['RusAuto', 'SBO']
};



//согласно логике - здесь только задаваемое по умолчанию own + массив, если передается больше 2 аргументов - остальные игнорируются
function calcCash(own=0, everyCash) {
    let total = own;
    everyCash.forEach((elem=>{
        total+=elem;
    }));
    return total;
}
// function calcCash(own) {
//     own = own || 0;
//     const everyCash = Array.prototype.slice.call(arguments);
//     console.log(everyCash);
//     let total = own;
//     for (let i = 0; i < everyCash[1].length; i++) {
//         total += +everyCash[1][i];
//     }
//     return total;
// }

const money = calcCash(null, sponsors.cash);

function makeBusiness(owner, director='Victor', cash, emp) {
    // const sumSponsors = sponsors.eu.concat(sponsors.rus, 'unexpected sponsor');//[ 'SRL', 'PLO', 'J&K', 'RusAuto', 'SBO', 'unexpected sponsor' ]
    // console.log('We have a business. Owner: ' + owner + ', director: ' + director + '. Our budget: ' + cash + '. And our employers: ' +
    // emp);
    const {eu:[risk]}=sponsors;
    console.log(`We have a business. Owner: ${owner}, director: ${director}. Our budget: ${cash}. And our employers: ${emp}`);
    console.log('And we have a sponsors: ');
    // console.log.apply(null, sumSponsors);//SRL PLO J&K RusAuto SBO unexpected sponsor
    console.log(...sponsors.eu, ...sponsors.rus,"unexpected sponsor");
    console.log(`Note. Be careful with ${risk}. It's a huge risk.`);
}
makeBusiness.apply(null, ['Sam', null, money, employersNames]);


