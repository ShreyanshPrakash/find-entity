const path = require('path');
const { searchElementsWithinDistance } = require('geographic-item-search');

const ReaadFile = require('./readFile');
const CustomCLI = require('./cli.readline');
const { generateReferencePoint, degreesToRadians, bubbleSort, printResult } = require('./utility');


let latitude, longitude, EARTH_RADIUS, distanceToSearch;
let sortedEntitiessData = [];

// *******************************  For demo, using initial values  ***********************************
latitude = 53.339428;
longitude = -6.257664; 
distanceToSearch = 100;
EARTH_RADIUS = 6371;
// ------------------------------------------
[ 
    latitude, 
    longitude, 
    distanceToSearch, 
    EARTH_RADIUS 
] = generateReferencePoint( latitude, longitude, distanceToSearch, EARTH_RADIUS );

// *****************************************************************************************************


// questions to be asked on cli.
// can get this from DB or from the parent module
const questions = [
    "Do you want to search entity( customer, shop ,etc ) near your area ? (Y/N) : ",
    "Enter reference point\'s latitude in degree : ",
    "Enter reference point\'s longitude in degree : ",
    "Max distance in Kms from reference point to search : ", 
    "Radius of Earth ( default: 6371 ) :"
];
currentQuestionIndex = 0;

/*
 Initialize the readline to read the entity( customer, shop ,etc ) from file
 On read complete, convert degrees to radians and add them as properties to each entity object
 Sort the whole data --> For subsequent request to search the area wont require to sort the search result again.
*/
function init( filePath ){
    
    let readfile = new ReaadFile();
    filePath = filePath ? filePath : path.join(
        __dirname, '..', 'assets', 'Customers _Assignment_Coding Challenge.txt'
    );
    readfile.addListener( 'fileReadComplete', handleFileReadComplete );
    readfile.readFileLineByLine( filePath );
    
}

/*
 Once read from file is completed, start the cli
 Initialize the CLI with question, question Number To Start from and a array map to recieve the answers in order of thier questions
 Once all the answer is received from terminal, endOfInteraction event is emitted with the answers in the same order.
 */
function initCli(){

    let cli = new CustomCLI(
        questions,
        currentQuestionIndex,
        [ 
            latitude, 
            longitude, 
            distanceToSearch, 
            EARTH_RADIUS 
        ]
    )
    cli.addListener( 'endOfInteraction', handleCliAnswers );
    cli.createTerminalRead();

}





function handleFileReadComplete( entities ){
    entities.forEach( entity => {
        entity.radianLatitude = degreesToRadians( entity.latitude );
        entity.radianLongitude = degreesToRadians( entity.longitude );
        return entity;
    });
    sortedEntitiessData = bubbleSort( entities, 'user_id' );

    // doing initial search for demo values
    let searchResult = searchElementsWithinDistance( sortedEntitiessData, latitude, longitude, distanceToSearch, EARTH_RADIUS );
    console.log("\n***********************  Demo case  ************************");
    console.log("FOR Input ---> latitude : 53.339428, longitude : -6.257664, distanceToSearch : 100, EARTH_RADIUS : 6371 \n")
    printResult( searchResult, '\n' , 'name', 'user_id' );
    initCli();

}

function handleCliAnswers( event ){
    [ 
        latitude, 
        longitude, 
        distanceToSearch, 
        EARTH_RADIUS 
    ] = generateReferencePoint( event[0], event[1], event[2], event[3] );
    let searchResult = searchElementsWithinDistance( sortedEntitiessData, latitude, longitude, distanceToSearch, EARTH_RADIUS );
    printResult( searchResult, '\n' , 'name', 'user_id' );
}

process.addListener('uncaughtException', event => console.log("Something broke. Try again", event) );

if( process.argv[2] === '--init')
    init();

module.exports = {
    init,
    initCli
}