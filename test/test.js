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
            fn.archCopy(__dirname + '\\fakeDir\\teste\\doc.txt', __dirname + '\\fakeDir\\testeBkp')
            .then(retorno => {
                if(fs.existsSync('test/fakeDir/testeBkp/doc.txt')){
                    fs.unlinkSync('test/fakeDir/testeBkp/doc.txt');
                    done();
                }
            });
        }else{
            done('err');
        };
    });

});

describe('Comparação de arquivos', function(){
    it('Compara arquivos com data de modificação diferente', function(done){
        fn.archCompare('test/fakeDir/teste/doc2.p', 'test/fakeDir/testeBkp/doc2.p')
        .then(result => {
            if(result == "diff"){
                done();
            }
        });
    });

    it('Compara arquivos com data de modificação iguais', function(done){
        fn.archCompare('test/fakeDir/teste/doc1.p', 'test/fakeDir/testeBkp/doc1.p')
        .then(result => {
            if(result == "equal"){
                done();
            }
        });

    });

});

describe('Criação de diretórios', function(){

    it('Criar um novo diretório', function(done){
        fn.makeDir('test/fakeDir/novoDir').then(result => {
            if(result == "ok" && fs.existsSync('test/fakeDir/novoDir') ){
                fs.rmdirSync('test/fakeDir/novoDir');
                done();
            }
        });
    });

});