
function generateReferencePoint( lat1, long1, distanceToSearch, EARTH_RADIUS ){
    latitude = degreesToRadians( lat1 );
    longitude = degreesToRadians( long1 ); 
    EARTH_RADIUS = EARTH_RADIUS ? Number( EARTH_RADIUS ) : 6371;
    distanceToSearch = distanceToSearch ? Number( distanceToSearch ) : 100;

    return [
        latitude,
        longitude,
        distanceToSearch,
        EARTH_RADIUS
    ]
}


function degreesToRadians( degree ){
    return Number( degree ) * Math.PI / 180;
}


function bubbleSort( data, key ){

    for( let i = 0; i < data.length; i++ ){
        for( let j = 0; j < data.length - 1; j++ ){
            if( data[j][key] > data[ j + 1 ][ key ] ){
                let temp = data[ j ];
                data[ j ] = data[ j +1 ];
                data[ j + 1 ] = temp;
            }
        }
    }

    return data;
}

/*  Takes in an array of object and prints the result as per the custom parameters paased.
    data : array of objects
    delimeter : how to separate each property for each object
    propertiesToPrint : array of property that needs to be printed among all the object properties.
*/
function printResult( data, delimeter, ...propertiesToPrint ){

    if( data.length === 0 ){
        console.log("\nEmpty data : ", data );
        return;
    }

    console.log("\n***********************  Result Start  ***********************\n");
    data.forEach( ( item, index ) => {

        let str = '';
        propertiesToPrint.forEach( property => {
            str = str + property + ": " + item[ property ] + delimeter;
        });
        
        console.log(
            `${ index + 1 }. ${ str }`
        )

    });
    console.log("\n***********************  Result End  ***********************\n");

}


module.exports = {
    degreesToRadians,
    generateReferencePoint,
    bubbleSort,
    printResult
}