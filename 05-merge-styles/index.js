const fs = require('fs');
const path = require('path');


fs.readdir(path.resolve(__dirname, 'styles'), {withFileTypes: true}, (err,files)=> {
    if (err) {throw err}
   files.forEach(file => {
       if (file.isFile() && path.extname(file.name) === '.css') {
        

        const stream = new fs.ReadStream(`05-merge-styles/styles/${file.name}`, 'utf-8');
stream.on('readable', () => {
  const data = stream.read();
  if (data) {
    console.log(data);
  }
})
    
       }
   })

})