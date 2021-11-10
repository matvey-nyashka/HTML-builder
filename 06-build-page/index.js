const fs = require('fs');
const path = require('path');
const arr = [];

fs.readFile(path.join(__dirname, 'template.html'), function (err, data) {
   if (err) throw err;

  function create() {
    fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, function (err) {
       if (err) throw err;
    });
  }

  function joinStyle() {
    fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '', function (err) {
       if (err) throw err;
    });

    fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, function (err, files) {
       if (err) throw err;
       for (let i = 0; i < files.length; i++) {
        if (path.extname(files[i].name) === '.css') {
          arr.push(files[i]);
        }
      };
      for (let i = 0; i < arr.length; i++) {
        let readable = fs.createReadStream(path.join(__dirname, 'styles', arr[i].name));
        readable.on('data', function (data) {
          fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), data, function (err) {
           if (err) throw err;
          });
        });
      };
    });
  }; 

   function copy(writePath) {
    fs.mkdir(path.join(__dirname, 'project-dist', writePath), { recursive: true }, function (err) {
       if (err) throw err;
    });
    fs.readdir(path.join(__dirname, writePath), { withFileTypes: true }, function (err, files) {
       if (err) throw err;
       for (let i=0; i<files.length; i++){
        if (files[i].isFile()) {
          fs.copyFile(path.join(__dirname, writePath, files[i].name), path.join(__dirname, 'project-dist', writePath, files[i].name), function (err) {
               if (err) throw err;
          });  
        } else {
          copy(writePath + '/' + files[i].name);
        }
      }
    });
   };

    
 
  function template() {
    fs.readdir(path.join(__dirname, 'components'), { withFileTypes: true }, function (err, files) {
       if (err) throw err;
       for (let i=0; i<files.length; i++){
        if (files[i].isFile()) {
          if (path.extname(files[i].name) === '.html') {
            tempHTML(files[i].name.split('.').slice(0, -1).join('.'));
          }
        }
      };
    });
  };

  function tempHTML(variable) {
    const readable = fs.createReadStream(path.join(__dirname, 'components', `${variable}.html`));
    readable.on('data', function (chunk) {
    let variableDate = chunk.toString();
      data = data.toString().replace(`{{${variable}}}`, variableDate);
       fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), data, function (err) {
           if (err) throw err;
       });
    });
  };

  create();
  joinStyle();
  copy('assets');
  template();
});