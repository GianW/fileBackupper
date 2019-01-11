'use strict'
const config = require('./config.js');
const fn = require('./functions.js');

exports.exec = function(){

    return new Promise ((res, rej) => {
        let configList = config.get();

        configList.then(configInfo => {

            JSON.parse(configInfo).map(function(obj){
                fn.getDir(obj.dirEntrada, obj.extensoes).then(dirList => {
                    dirList.map(function(arq){

                        let arqEntrada = obj.dirEntrada + "\\" + arq;
                        let arqSaida = obj.dirSaida + "\\" + arq;
                        let data = new Date();
                        let pastaBkp = obj.dirSaida + "\\" + (data.getDate() + "_" + (data.getMonth() + 1) + "_" + data.getUTCFullYear());

                        fn.fileExists(arqSaida).then(exist =>{
                            //Se existir arqvo no dir de bkp, verificar data para gerar novo bkp
                            if(exist){
                                console.log('Existe ' + arqSaida);
                                fn.archCompare(arqEntrada, arqSaida).then(result => {
                                    if(result == "diff"){
                                        console.log('Diff');
                                        fn.fileExists(pastaBkp).then(pastaBkpExist =>{
                                            if(pastaBkpExist){
                                                // move arquivo dirBkp para pasta do dia
                                                fn.archCopy(arqSaida, pastaBkp).then( _ =>{
                                                    fn.archCopy(arqEntrada, obj.dirSaida).then( _ =>{
                                                        console.log('Copiado');
                                                    })
                                                })
                                            }else{
                                                // cria pasta com data
                                                fn.makeDir(pastaBkp).then(criaBkp =>{
                                                    if(criaBkp == "ok"){
                                                        // move arquivo dirBkp para pasta do dia
                                                        fn.archCopy(arqSaida, pastaBkp).then( _ =>{
                                                            fn.archCopy(arqEntrada, obj.dirSaida).then( _ =>{
                                                                console.log('Copiado');
                                                            })
                                                        })
                                                    }
                                                })
                                            }
                                        });


                                        // copia dirOrigm para dirBkp
                                    }
                                });
                            }else{
                                fn.archCopy(arqEntrada, obj.dirSaida).then(result => {
                                    // salvar histórico
                                    console.log(result);
                                });
                            };

                        });
                    });
                });

            });
        });

        res("");
    });

};

exports.execSingle = function(dir){


};