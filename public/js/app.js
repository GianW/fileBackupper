$(document).ready(function(){
  $('.tabs').tabs();
  $('.tabs').tabs({'onShow': function(tab){trocaAba(tab);}});

  $('.fixed-action-btn').floatingActionButton({direction: 'top'});

  $('#addConfig').click(function(){
    addConfig();
  });

  $('#saveConfig').click(function(){
    saveConfig();
  });

  $('select').formSelect();
  $('.tooltipped').tooltip();

  getConfig();

  $("#btExecTodos").click(function(){
    execTodos();
  });
});

function trocaAba(tab){
  // console.log(tab, tab.id);
    getConfig();
};

async function saveConfig(){

  lerConfigsTela()
    .then(result => {
      let data = gravarConfig(result);

      data.then(saida => {

        if(saida == "OK"){
          var toastHTML = '<span>CONFIGURAÇÃO SALVA COM SUCESSO</span>';
          M.toast({html: toastHTML, classes: 'teal'});
        }else{
          var toastHTML = '<span>HOUVE UM ERRO AO SALVAR SUA CONFIGURAÇÃO</span>';
          M.toast({html: toastHTML, classes: 'red'});
        };

      });
    });
};

async function getConfig(){
  let data = buscarConfig();

  data.then(saida => {
    exibirConfigsTela(JSON.parse(saida));
    listaBackups(JSON.parse(saida));
  })
};

async function execTodos(){
 let data = backupTodos();
};

function addConfig(){

  let qtdConfig = $(".descConfig").length;

  let novoCard = ` <div class="card blue-grey darken-2 descConfig" id="config_${qtdConfig}">` +
                 `  <div class="card-content white-text">` +
                 `    <div class="row">` +
                 `      <div class="input-field col s8">` +
                 `        <input type="text" id="diretorioOrigem_${qtdConfig}" name="diretorioOrigem" >` +
                 `        <label for="diretorioOrigem_${qtdConfig}">Diretório a ser copiado</label>` +
                 `      </div>` +
                 `    </div>` +
                 `    <div class="row">` +
                 `      <div class="input-field col s8">` +
                 `        <input type="text" id="diretorioDestino_${qtdConfig}" >` +
                 `        <label for="diretorioDestino_${qtdConfig}">Diretório para guardar a cópia</label>` +
                 `      </div>` +
                 `      <div class="input-field col s1">` +
                 `        </div>` +
                 `          <div class="input-field col s3">` +
                 `            <select name="extensoes_${qtdConfig}" multiple>` +
                 `              <option value="p">.p</option>` +
                 `              <option value="i">.i</option>` +
                 `              <option value="html">.html</option>` +
                 `            </select>` +
                 `            <label>Extensões a verificar</label>` +
                 `          </div>` +
                 `      </div>` +
                 `    </div>` +
                 `    <div class="card-action">` +
                 `      <a class="waves-effect red btn-small" onclick="deleteCongif('config_${qtdConfig}')"><i class="material-icons right">delete</i>Deletar</a>` +
                 `    </div>` +
                 `</div>` ;

  $('#listagemConfigs').append(novoCard);
  $('select').formSelect();
};

function lerConfigsTela(){
  return new Promise ((res, rej) => {
    let configs = $(".descConfig");
    let listaConfigs = [];

    configs.map(function(obj, ind){

      let entradas    = ind.getElementsByTagName('input');
      let dirEntrada  = entradas[0].value;
      let dirSaida    = entradas[1].value;
      let extensoes   = entradas[2].value.split(',');

      listaConfigs.push({dirEntrada, dirSaida, extensoes});
    });

    res(listaConfigs);
  });
};

function exibirConfigsTela(configs){

  let qtdConfig = $(".descConfig").length;

  configs.map(function(obj){

    let extensoes = obj.extensoes.map(function(a){ return a.replace(".","") })

    let novoCard = ` <div class="card blue-grey darken-2 descConfig" id="config_${qtdConfig}">` +
                   `  <div class="card-content white-text">` +
                   `    <div class="row">` +
                   `      <div class="input-field col s8">` +
                   `        <input type="text" id="diretorioOrigem_${qtdConfig}" name="diretorioOrigem" value="${obj.dirEntrada}" >` +
                   `        <label for="diretorioOrigem_${qtdConfig}">Diretório a ser copiado</label>` +
                   `      </div>` +
                   `    </div>` +
                   `    <div class="row">` +
                   `      <div class="input-field col s8">` +
                   `        <input type="text" id="diretorioDestino_${qtdConfig}" value=${obj.dirSaida}>` +
                   `        <label for="diretorioDestino_${qtdConfig}">Diretório para guardar a cópia</label>` +
                   `      </div>` +
                   `      <div class="input-field col s1">` +
                   `        </div>` +
                   `          <div class="input-field col s3">` +
                   `            <select id="extensoes_${qtdConfig}" name="extensoes_${qtdConfig}" multiple>` +
                   `              <option value="p">.p</option>` +
                   `              <option value="i">.i</option>` +
                   `              <option value="html">.html</option>` +
                   `            </select>` +
                   `            <label>Extensões a verificar</label>` +
                   `          </div>` +
                   `      </div>` +
                   `    </div>` +
                   `    <div class="card-action">` +
                   `      <a class="waves-effect red btn-small" onclick="deleteCongif('config_${qtdConfig}')"><i class="material-icons right">delete</i>Deletar</a>` +
                   `    </div>` +
                   `</div>` ;

    $('#listagemConfigs').html(novoCard);
    $("#" + `extensoes_${qtdConfig}`).val(extensoes);
    $('select').formSelect();
    qtdConfig++;
    M.updateTextFields();
  });
};

function deleteCongif(config){
  $("#" + config).remove();
};

function listaBackups(backups){

  backups.map(function(obj){

    let backup = `<li class="collection-item blue-grey lighten-1"><p><b>Diretório: </b> ${obj.dirEntrada} </p><p><b>Último Backup:</b> 28/11/2018 <a style="margin-left: 60%;" class="waves-effect waves-light btn">Executar</a></p></li>`


    $('#lista_backups').html(backup);

  });
};

