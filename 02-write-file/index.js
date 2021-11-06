const fs = require('fs');
const path = require('path');


const readline = require('readline');
const { stdin: input, stdout: output } = require('process');


const rl = readline.createInterface({ input, output });
const way = path.resolve('02-write-file', 'text.txt')


rl.question('Enter your text:', (answer) => {
    if (answer.includes('exit')) { 
      exit()} else {
        fs.open (way, 'w', (err) => 
        {if (err) 
            {throw err}})
        fs.appendFile(way, answer +'\n', function(){})
    }
});

rl.on('line', (answer) =>{
    if (answer.includes('exit'))  exit();
    else{
        fs.appendFile(way, answer +'\n', function(){})
    }
})

rl.on('SIGINT', exit) 

function exit (){
    console.log('All was saved')
    rl.close()
}