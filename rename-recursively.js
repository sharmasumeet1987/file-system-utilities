var path = require('path'),
  fs = require('fs');
const { rename } = require('fs');
// let fileNames = [];

let fileNameCounter = 0;
const renameFiles = (startPath, filter) => {
  //console.log('Starting from dir '+startPath+'/');

  if (!fs.existsSync(startPath)) {
    console.log('no dir ', startPath);
    return;
  }

  var files = fs.readdirSync(startPath);
  for (var i = 0; i < files.length; i++) {
    var filename = path.join(startPath, files[i]);
    var stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      renameFiles(filename, filter); //recurse
    } else if (filename.endsWith(filter)) {
      rename(
        filename,
        `${startPath}/svaksh-img-${fileNameCounter++}.jpeg`,
        (err) => console.log(err)
      );
      //   console.log('-- found: ', filename);
    }
  }

  //   return fileNames;
};

// const renameAllFiles = (files) => {
//   files.forEach((file, i) =>
//     rename(file, file + `/svaksh-img-${i}`, (err) => console.log(err))
//   );
// };

// renameFiles('D:\\backup\\Users\\Desktop\\New folder\\img1', '');
renameFiles('D:', '');
