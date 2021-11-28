const fs = require('fs');
const path = require('path');

let projectDir = path.join(__dirname, 'project-dist');

function makeProjectDir() {
  fs.mkdir(toDir, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Folder 'project-dist' was created...");
    }
  });
}