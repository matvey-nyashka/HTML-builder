const path = require('path');
const fs = require('fs');
let writePath= path.join(__dirname, 'files');
let copyPath= path.join(__dirname, 'files-copy');

fs.mkdir(copyPath, { recursive: true }, (err) => {
    if (err) throw err;
  });

fs.readdir(copyPath, (err, files) => {
    if (err) throw err;
    for (let i=0; i<files.length; i++){
      fs.unlink(path.join(copyPath, files[i]), (err) => {
        if (err) throw err;
      });
    };
  });  

fs.readdir(writePath, (err, files) => {
    if (err) throw err;
    for (let i=0; i<files.length; i++){
      fs.copyFile(path.join(writePath,files[i]), path.join(copyPath, files[i]), (err) => {
        if (err) throw err;
      });
    };
  });