'use strict'
const fn = require('./functions.js');

exports.set = function(config){
  return fn.writeFile('./app/data/config.json', JSON.stringify(config));
};

exports.get = function(){
  return fn.readFile('./app/data/config.json');
};