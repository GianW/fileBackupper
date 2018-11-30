'use strict'
const fn = require('./functions.js');

exports.set = function(config){
  return fn.writeFile('./app/config.json', JSON.stringify(config));
};

exports.get = function(){
  return fn.readFile('./app/config.json');
};