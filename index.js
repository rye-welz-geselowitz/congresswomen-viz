const yaml = require('js-yaml');
const fs   = require('fs');

function main(){
    try {
      const legislators = yaml.safeLoad(fs.readFileSync('legislators-current.yaml', 'utf8'));
      const femaleLegislators = getFemaleLegislators(legislators);
      const yearToNumFemaleReps = groupByYearAsRep(femaleLegislators);
      displayHistogram(yearToNumFemaleReps);

    } catch (e) {
      console.log(e);
    }
}
//TODO: fill in gaps between years


function getCountViz(n){
    let str = '';
    for(var i =0; i<n;i++){ str+='#'}
    return str;
}



function displayHistogram(countsDictionary){
    Object.keys(countsDictionary).sort().forEach((key)=>{
        const count = countsDictionary[key];
        console.log(key, getCountViz(count));
    })
}

function getYear(dateString){
    return parseInt(dateString.substring(0, 4));
}

function getMonth(dateString){
    return parseInt(dateString.substring(5, 7));
}

function initializeYearDictionaryInRange(startYear, endYear){
    const dict = {};
    for(var i =startYear; i <= endYear; i++){
        dict[i] = 0;
    }
    return dict;
}

function groupByYearAsRep(legislators){
    // Reduce through the legislators
    // Keep a dictionary of year to legislator count {2015: 0, 2016: 1}
    // At each step, iterate through her terms.
    //For each term, IF it is type 'rep', then parse dates. Start date and end date.
    //Go through every year between the start date and the end date, and increment the
    //count of female legislators in the overall dictionary.
    const yearDict = initializeYearDictionaryInRange(1789, 2018); //TODO: sensible min and max? work next year?
    legislators.forEach((legislator)=> {
        legislator.terms.forEach( (term) => {
            if(term.type === 'rep'){
                const start = getYear(term.start);
                const formalEnd = getYear(term.end);
                const end = getMonth(term.end) === 1 ? formalEnd - 1 : formalEnd;
                for(var year = start; year <= end; year++){
                    if(year in yearDict){
                        yearDict[year]++;
                    }
                }
            }
        })
    })
    return yearDict;
}

function getFemaleLegislators(legislators){
    return legislators.filter( (legislator) => {
        return legislator.bio.gender === 'F';
    })
}

main();

module.exports = { //Exported for testing purposes
    getYear: getYear,
    getMonth: getMonth
}
