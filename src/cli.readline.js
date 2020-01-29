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
                this.cliAnswers[0] = Number( interaction.answer );
                if( typeof this.cliAnswers[0] === 'number' ){
                    this.cliAnswers[0] = this.cliAnswers[0];
                    this.currentQuestionIndex++;
                }
                break;
    
            case this.questions[2] :
                this.cliAnswers[1] = Number( interaction.answer );
                if( typeof this.cliAnswers[1] === 'number' ){
                    this.cliAnswers[1] = this.cliAnswers[1];
                    this.currentQuestionIndex++;
                }
                break;
    
            case this.questions[3] :
                this.cliAnswers[2] = Number( interaction.answer );
                if( typeof this.cliAnswers[2] === 'number' ){
                    this.cliAnswers[2] = this.cliAnswers[2];
                    this.currentQuestionIndex++;
                }
                break;
    
            case this.questions[4] :
                if( !interaction.answer ){
                    this.cliAnswers[3] = 6371;
                    // process.stdin.destroy();
                    this.currentQuestionIndex++;
                }
                else {
                    this.cliAnswers[3] = Number( interaction.answer );
                    this.cliAnswers[3] = this.cliAnswers[3]; //
                    // process.stdin.destroy();
                    this.currentQuestionIndex++;
                }
                break;
            
            default:
                break;
        }
    }

}

module.exports = CustomCLI;