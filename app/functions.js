'use strict'
const fs = require('fs');
const exec = require('child_process').exec;

exports.writeFile = function(file, content){
    return new Promise ((res, rej) => {
        fs.writeFile(file, content, (err) => {
            if (err) res(err);
            res('OK');
        });
    });
};

exports.readFile = function(file){
    return new Promise ((res, rej) => {
        fs.readFile(file, (err, data) => {
          if (err) res(err);
          res(data.toString());
        });
    });
};

exports.getDir = function(dir, extensoes){
    return new Promise ((res, rej) => {

        checkValidDir(dir).then(result => {

            if(!result){
                res(result)
            };

            fs.readdir(dir, (err, data) => {
                if (err) res(err);
                filtraExtensoes(data, extensoes).then(retorno => res(retorno));
            });
        });

    });
};

exports.archCopy = function(orig, dest){

    console.log(fs.existsSync(orig));

    if (process.platform == "win32" || process.platform == "win64") {
        exec('COPY "' + orig + '" "' + dest + '" ');
        return Promise.resolve('done');
    }else{
        exec("cp -p '" + orig + "' '" + dest + "'");
        return Promise.resolve('done');
    }
};

function checkValidDir(dir){
    return new Promise ((res, rej) => {

        if(typeof dir !== "string"){
            res('Formato do diretório ' +  typeof dir + ' inválido')
        }else if (!fs.existsSync(dir)){
            res("Diretório não localizado")
        }else{
            res(true);
        }
    });
};

function filtraExtensoes(lista, extensoes){

    return new Promise ((res, rej) => {
        let nvLista = lista.filter(function(elem, i, array){
            let aux = elem.lastIndexOf(".");
            let ext = elem.slice(aux, elem.length);
            if(extensoes.indexOf(ext) > -1){return elem}
        });

        res(nvLista);
    });
};