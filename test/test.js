"use strict";
var assert = require('assert');
var fn = require('../app/functions.js');
const fs = require('fs');

describe('Leitura e escrita de arquivos', function(){

    it('Criar arquivo', function(){
        fn.writeFile('test/testeFile.json', '["teste": "teste"]').then(result => assert.strictEqual("OK", result))
    });

    it('Ler arquivo', function(){
        fn.readFile('test/testeFile.json').then(result => assert.strictEqual('["teste": "teste"]', result))
    });

});

describe('Leitura de diretórios', function(){

    it('Ler arquivos de um diretório', function(done){

        fn.getDir('test/fakeDir/teste', [".p"])
        .then(result => {
            if(result.toString() == ['doc.p','doc1.p','doc2.p'].toString()){
                done();
            }
        });
    });
});

describe('Transporte de arquivos', function(){

    it('Copiar arquivo entre diretórios', function(done){

        if(!fs.existsSync('test/fakeDir/testeBkp/doc.txt')){

            fn.archCopy('test/fakeDir/teste/doc.txt', 'test/fakeDir/testeBkp/')
            .then(retorno => {
                if(fs.existsSync('test/fakeDir/testeBkp/doc.txt')){
                    done();
                }
            });

            done();
        }



    });

});