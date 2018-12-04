'use strict'
const fs = require('fs');
const exec = require('child_process').exec;
const execSync = require('child_process').execSync;

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
          if(data != null){
            res(data.toString());
          }else{
            res('');
          }
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

    if (process.platform == "win32" || process.platform == "win64") {
        execSync(`COPY "${orig}" "${dest}"`);
        return Promise.resolve('done');
    }else{
        execSync(`cp -p "${orig}" "${dest}"`);
        return Promise.resolve('done');
    }
};

exports.archCompare = function(arq1, arq2){
    return new Promise ((res, rej) => {

        let arquiv1 = fs.statSync(arq1);
        let arquiv2 = fs.statSync(arq2);

        if(arquiv1.mtime.toString() != arquiv2.mtime.toString()){
            res('diff');
        }else{
            res('equal');
        }
    });
};

exports.makeDir = function(dir){
    return new Promise ((res, rej) => {
        fs.mkdir(dir, { recursive: true }, (err) => {
            if (err) throw err;
            res('ok');
        });
    });
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