const path = require('path');
const fs = require('fs');

let writePath = path.join(__dirname, 'secret-folder');
fs.readdir(writePath, (err, files) => {
    if (err) throw err;
    for (let i=0; i<files.length; i++){
      fs.stat(path.join(writePath, files[i]), (err, stats) => {
        if (err) throw err;
        if (stats.isFile()) {
          console.log(files[i].replace(".", " - ") + " - " + (stats.size / 1024) + " kb")
        }
      });
   }
  }); 