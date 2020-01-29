const EventEmitter = require('events').EventEmitter;
const readline = require('readline');
const fs = require('fs');


// Read file one line at a time
class ReadFile extends EventEmitter{

    constructor(){
        super();
        this.fileDataArray = [];
        this.readFileLineByLine = this.readFileLineByLine.bind( this );

    }

    readFileLineByLine( filePath ){

        if( !this.fileCheck( filePath ) ){
            console.log("****************** Something went wrong with the file path or file  ******************");
            console.log("Filepath : ", filePath );
            return false;
        }
        // create readline interface
        const readInterface = readline.createInterface({
            input: fs.createReadStream( filePath ),
            outpur: process.stdout,
            console: false
        })
    
        readInterface.addListener('line', this.handleEachLineRead.bind( this ) );
        readInterface.addListener('close', this.handleReadlineClose.bind( this ) );

    }

    fileCheck( filePath ){
        console.log( fs.existsSync( filePath, filePath) );
        if( fs.existsSync( filePath) ){ 
            try{
                fs.accessSync( filePath, fs.constants.R_OK )
                return true;
            }catch( err ){
                return false;
            }
        }

        return false;
    }
    
    // convert degrees to radians
    handleEachLineRead( event ){
        try{
            this.fileDataArray.push( 
                JSON.parse( event )
            );
        }catch( err ){
            console.log( err );
        }
        
    }
    
    handleReadlineClose(){
        console.log("****************  File read is completed  *****************");
        this.emit('fileReadComplete', this.fileDataArray )
    };

}


module.exports = ReadFile;