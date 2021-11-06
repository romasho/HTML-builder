const fs = require('fs');
const path = require('path');


fs.readdir(path.resolve(__dirname, 'secret-folder'), {withFileTypes: true}, (err,files)=> {
    if (err) {throw err}
   files.forEach(file => {
       if (file.isFile()) {
        fs.promises.stat(path.join(__dirname, 'secret-folder', file.name)).then(stats => 
            {console.log(file.name.slice(0, file.name.lastIndexOf('.')), '-', path.extname(file.name).slice(1), '-', `${stats.size / 1024}kb`)})
    
       }
   })

})