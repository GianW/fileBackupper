'use strict'
const config = require('./config.js');
const fn = require('./functions.js');

exports.exec = function(){

    return new Promise ((res, rej) => {
        let configList = config.get();

        configList.then( configInfo => {
            JSON.parse(configInfo).map(function(obj){
                fn.getDir(obj.dirEntrada).then(dirList => console.log(dirList));
            });
        });

        res("");
    });

};