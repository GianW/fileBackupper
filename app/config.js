'use strict'
const fs = require('fs');

exports.set = function(config){

  return new Promise ((res, rej) => {
    fs.writeFile('./app/config.json', JSON.stringify(config), (err) => {
      if (err) rej(err);
      res('OK');
    });
  });
};

exports.get = function(){
  return new Promise ((res, rej) => {
    fs.readFile('./app/config.json', (err, data) => {
      if (err) rej(err);
      res(data.toString());
    });
  });
};