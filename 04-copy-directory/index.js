

const fs = require('fs');
const path = require('path');

pathSource = path.join(__dirname, 'files');
pathCopy = path.join(__dirname, 'files-copy')

fs.mkdir(pathCopy, { recursive: true }, err => {
    if (err) throw err;
    
});

fs.readdir(pathCopy, (err, data) => {
    data.forEach(itemDest => {
        
            fs.promises.unlink(path.join(pathCopy,itemDest))
        
    })
})
 
async function readFile() {

   await fs.readdir(pathSource, (err, data) => {
    
    data.forEach(file => {
        copyFile(file)
    })

    console.log('Папка была копирована');
})
}

async function copyFile(file) {
    await fs.promises.copyFile(path.join(pathSource,file), path.join(pathCopy,file))
}

readFile() 