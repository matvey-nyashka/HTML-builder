const fs = require('fs');
const path = require('path');
let writePath = path.join(__dirname, 'styles');

fs.readdir(writePath, (err, files) => {
    if (err) throw err;
    let bundle = path.join(__dirname, 'project-dist', 'bundle.css');

    for (let i = 0; i < files.length; i++) {
        fs.stat(path.join(writePath, files[i]), (err, stats) => {
          if (err) throw err;
          if (stats.isFile() && path.extname(files[i]) == '.css') {
            let stream = fs.createReadStream(path.join(writePath, files[i]))

            stream.on('data', (chunk) => {
                fs.appendFile(bundle, chunk, (err) => {
                    if (err) throw err;
                  })
            }) 
        
        };
    })
};
})