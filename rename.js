const { readdirSync, rename } = require('fs');
// const { resolve } = require('path');

// Get path to image directory
// const imageDirPath = resolve(__dirname, '[imgs_folder_name]');

// Get an array of the files inside the folder

// Loop through each file that was retrieved
// files.forEach(file => rename(
//   imageDirPath + `/${file}`,
//   imageDirPath + `/${file.toLowerCase()}`,
//   err => console.log(err)
// ));

const printAllFiles = (path) => {
  const files = readdirSync(path);
  files.forEach((file) => {
    console.log(file);
  });
};

const renameAllFiles = (path) => {
  const files = readdirSync(path);
  files.forEach((file, i) =>
    rename(path + `/${file}`, path + `/svaksh-${i}`, (err) => console.log(err))
  );
};

printAllFiles('D:\\backup\\Users\\Desktop\\New folder\\img1');
