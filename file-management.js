const fs = require('fs');
const { existsSync, readdirSync, rename, lstatSync } = require('fs');
const readline = require('readline');
var path = require('path');
// let fileNames = [];

// let fileArray = [];

const operateAllFilesOfType = (startPath, filter, fx) => {
  if (!existsSync(startPath)) {
    console.log('no dir ', startPath);
    return;
  }

  var files = readdirSync(startPath);
  for (var i = 0; i < files.length; i++) {
    var filename = path.join(startPath, files[i]);
    var stat = lstatSync(filename);
    if (stat.isDirectory()) {
      operateAllFilesOfType(filename, filter, fx); //recurse
    } else if (
      filename.toLocaleLowerCase().endsWith(filter.toLocaleLowerCase())
    ) {
      //   fileNames.push(filename);
      // arr.push({ path: startPath, name: files[i] });
      fx(startPath, files[i]);
      //   console.log('-- found: ', filename);
    }
  }
};

const getAllFilesOfType = (startPath, filter, fileArray = []) => {
  //console.log('Starting from dir '+startPath+'/');
  // let fileArray = [];
  const fx = (startPath, name) => {
    fileArray.push({ path: startPath, name: name });
  };
  operateAllFilesOfType(startPath, filter, fx);

  console.log(
    `Total files of type ${filter} from all folders is ${fileArray.length}`
  );
  console.log(fileArray);
  return fileArray;
  //   return fileNames;
};
console.log(getAllFilesOfType('D:\\', 'pdf'));
// const renameAllFiles = (files) => {
//   files.forEach((file, i) =>
//     rename(file, file + `/svaksh-img-${i}`, (err) => console.log(err))
//   );
// };

// const fileArr = getAllFilesOfType(
//   'D:\\backup\\Users\\Desktop\\New folder\\img1',
//   'jpeg'
// );

const getAllDistinctFilepaths = (path, type) => {
  const fileArr = getAllFilesOfType(path, type);
  // console.log(fileArr);

  // Creates an array of objects with unique "name" property values.
  let distinctPaths = [
    ...new Map(fileArr.map((item) => [item['path'], item['path']])).values(),
  ];
  return distinctPaths;
};
// console.log(getAllDistinctFilepaths('D:\\', 'jpg'));

const writeAllDistinctFilePaths = (file, path, type) => {
  fs.writeFile(
    file,
    getAllDistinctFilepaths(path, type).join('\r\n'),
    (err) => {
      if (err) console.log(err);
      else {
        console.log('File written successfully\n');
        console.log('The written has the following contents:');
        // console.log(fs.readFileSync('books.txt', 'utf8'));
      }
    }
  );
};

// console.log(writeAllDistinctFilePaths('all-png.txt', 'D:\\', 'png'));

const moveAllFilesOfType = (startPath, toPath, filter) => {
  //console.log('Starting from dir '+startPath+'/');
  // let fileArray = [];

  if (!fs.existsSync(toPath)) {
    fs.mkdirSync(toPath, { recursive: true });
  }
  const fx = (filepath, name) => {
    var oldFile = path.join(filepath, name);
    var newFile = path.join(toPath, name);
    fs.rename(oldFile, newFile, (err) => {
      if (err) console.log(err);
      else {
        console.log('Moved file \n' + name);
        // console.log(fs.readFileSync('books.txt', 'utf8'));
      }
    });
  };
  operateAllFilesOfType(startPath, filter, fx);

  //   return fileNames;
};
// console.log(
//   moveAllFilesOfType(
//     'D:\\backup\\A5 2016',
//     'D:\\sumeet\\media\\music\\a5-2016',
//     'mp3'
//   )
// );
// console.log(
//   moveAllFilesOfType(
//     'D:\\sumeet\\media\\images\\group\\a5-2016',
//     'D:\\backup\\A5 2016\\Card\\DCIM\\Camera',
//     'jpg'
//   )
// );

const readFile = async (file) => {
  const fileStream = fs.createReadStream(file);
  let paths = [];
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    let fromAndTo = line.split(',');
    paths.push({ from: fromAndTo[0], to: fromAndTo[1] });
  }
  // console.log(paths);
  return paths;
};
// readFile('.\\input\\move-paths.txt');

const moveFiles = async (dataFile, filter) => {
  const paths = await readFile(dataFile);
  for (const path of paths) {
    moveAllFilesOfType(path['from'], path['to'], filter);
  }
  // console.log(paths);
};
// moveFiles('.\\input\\move-paths.txt', 'jpg');
