const fs = require('fs');
const path = require('path');
const mas = ['header', 'articles', 'about', 'footer']
let data = '';






fs.readdir("06-build-page/project-dist", (err, items) => {
    if (!err) {
        updateDir()
    } else {
        createDir()
        copyAssets()
        mergeStyle()
        fixHtml()
    }
})


async function updateDir() {
    await fs.rm("06-build-page/project-dist", {force: true, recursive: true}, (err) => {
        if (err) {
            console.log('Не удалось обновить папку')
        } else {
            createDir()
            copyAssets()
            mergeStyle()
            fixHtml()
        }
    })
}



function createDir(){
    fs.mkdir("06-build-page/project-dist", { recursive: true }, (err) => {
        if (err) throw err;
    });
}


async function writed(element) {
   await fs.createWriteStream("06-build-page/project-dist/index.html").write(element);
}



 function fixHtml() {
    const stream = fs.createReadStream('06-build-page/template.html', 'utf-8');
    stream.on('data', chunk => data += chunk);
    stream.on('error', error => console.log('Error', error.message));
     stream.on('end', () => 
      mas.forEach(element => {
            
            fs.readFile(`06-build-page/components/${element}.html`, 'utf-8', (err, part) => {
               
                data = data.replace(`{{${element}}}`,  part)
                writed(data)
            });   
            
            
        })
     )}




//merge styles
function mergeStyle(){
    fs.readdir(path.resolve(__dirname, 'styles'), {withFileTypes: true}, (err,files)=> {
        if (err) {throw err}
    files.forEach(file => {
        if (file.isFile() && path.extname(file.name) === '.css') {
            

            const stream = new fs.ReadStream(`06-build-page/styles/${file.name}`, 'utf-8');
    stream.on('readable', () => {
    const data = stream.read();
    if (data) {
        fs.promises.appendFile(path.join(__dirname, 'project-dist/style.css'), data);
    }
    })
        
        }
    })

    })
}

//copy assets

pathSource = path.join(__dirname, 'assets');
pathCopy = path.join(__dirname, 'project-dist/assets')


 
async function copyAssets() {

    await fs.mkdir(pathCopy, (err) => {
        if (err) console.log();
    });


    await fs.readdir(pathSource, (err, files) => {
        for (const file of files) {
            fs.mkdir(path.join(pathCopy, file), {recursive: true}, (err) => {
                if (err) throw err;
            });

        const assets = path.join(pathSource, file);
        const assetsCopy = path.join(pathCopy, file);

            fs.readdir(assets, (err, items) => {
            for (const item of items) {
                
                fs.copyFile(path.join(assets, item), path.join(assetsCopy, item), fs.constants.COPYFILE_EXCL, (err) => {
                if (err) {
                            process.exit();
                        }
                    });
                }});
        }
    })
}


  


