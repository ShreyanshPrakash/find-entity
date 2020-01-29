const readline = require('readline');
const EventEmitter = require('events').EventEmitter;


class CustomCLI extends EventEmitter{

    constructor( questions, currentQuestionIndex, cliAnswers ){
        super();
        this.questions = questions;
        this.currentQuestionIndex = currentQuestionIndex; 
        this.cliAnswers = cliAnswers;

        this.createTerminalRead = this.createTerminalRead.bind( this );
    }

    // Initialize cli interface
    createTerminalRead(){
        console.log("****************  Starting Cli interface  ******************");
        const readFromTerminal = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        console.log("\n****************  CLI does not cover all the use cases. Experimentation is pohibited :-)  ********************\n");
        this.terminalQuestions( readFromTerminal, this.questions[0] );
    
    }
    
    
    // Handle CLI interaction recursively
    terminalQuestions( readFromTerminal, question, interaction ){
    
        if( interaction ){
    
            this.handleCliAnswers( interaction );
            if( this.currentQuestionIndex <= this.questions.length - 1 ){

                if( interaction.query === this.questions[0] && interaction.answer === 'N' ){
                    question = null;
                }else{
                    question = this.questions[ this.currentQuestionIndex ];
                    this.terminalQuestions( readFromTerminal, question )
                }

            }else{
                this.emit( 'endOfInteraction', this.cliAnswers );
                this.currentQuestionIndex = 0;
                question = this.questions[ this.currentQuestionIndex ];
                this.terminalQuestions( readFromTerminal, question )
            }
    
        }else if( question ){
    
            readFromTerminal.question( 
                `\n${question}` , 
                answer => this.terminalQuestions( 
                                readFromTerminal, 
                                question , 
                                { query: question, answer: answer }
                            )
            );
        }
    
    
    }
    
    
    // Handle usecase for cli answers
    handleCliAnswers( interaction ){
    
        switch ( interaction.query ) {
    
            case this.questions[0] :

                if( interaction.answer === 'N' ){
                    process.stdin.destroy();
                }else if( interaction.answer === 'Y' ){
                    this.currentQuestionIndex++;
                }else{
                    console.log("***********  Please enter either Y or N  ************\n");
                }

                break;
    
            case this.questions[1] :
                this.handleCase( 0, interaction );
                break;
    
            case this.questions[2] :
                this.handleCase( 1, interaction );
                break;
    
            case this.questions[3] :
                this.handleCase( 2, interaction );
                break;
    
            case this.questions[4] : 

                if( !interaction.answer ){
                    this.cliAnswers[3] = interaction.answer;
                    this.currentQuestionIndex++;
                }
                else {
                    this.handleCase( 3, interaction );
                }

                break;
            
            default:
                console.log("Default case");
                break;
        }
    }

    handleCase( index, interaction ){
        this.cliAnswers[ index ] = Number( interaction.answer );
        if( !Number.isNaN( this.cliAnswers[ index ] ) && interaction.answer ){
            this.currentQuestionIndex++;
        }
    }

}

module.exports = CustomCLI;