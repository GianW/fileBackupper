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
});



function trocaAba(tab){
  console.log(tab, tab.id)
};

async function saveConfig(){

  lerConfigsTela()
    .then(result => {
      let data = gravarConfig(result);

      data.then(saida => {

        if(saida == "OK"){
          var toastHTML = '<span>CONFIGURA��O SALVA COM SUCESSO</span>';
          M.toast({html: toastHTML, classes: 'teal'});
        }else{
          var toastHTML = '<span>HOUVE UM ERRO AO SALVAR SUA CONFIGURA��O</span>';
          M.toast({html: toastHTML, classes: 'red'});
        };

      });
    });
};

async function getConfig(){
  let data = buscarConfig();

  data.then(saida => {
    exibirConfigsTela(JSON.parse(saida));
  })
};

function addConfig(){

  let qtdConfig = $(".descConfig").length;

  let novoCard = ` <div class="card blue-grey darken-2 descConfig" id="config_${qtdConfig}">` +
                 `  <div class="card-content white-text">` +
                 `    <div class="row">` +
                 `      <div class="input-field col s8">` +
                 `        <input type="text" id="diretorioOrigem_${qtdConfig}" name="diretorioOrigem" >` +
                 `        <label for="diretorioOrigem_${qtdConfig}">Diret�rio a ser copiado</label>` +
                 `      </div>` +
                 `    </div>` +
                 `    <div class="row">` +
                 `      <div class="input-field col s8">` +
                 `        <input type="text" id="diretorioDestino_${qtdConfig}" >` +
                 `        <label for="diretorioDestino_${qtdConfig}">Diret�rio para guardar a c�pia</label>` +
                 `      </div>` +
                 `      <div class="input-field col s1">` +
                 `        </div>` +
                 `          <div class="input-field col s3">` +
                 `            <select name="extensoes_${qtdConfig}" multiple>` +
                 `              <option value="p">.p</option>` +
                 `              <option value="i">.i</option>` +
                 `              <option value="html">.html</option>` +
                 `            </select>` +
                 `            <label>Extens�es a verificar</label>` +
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

    let novoCard = ` <div class="card blue-grey darken-2 descConfig" id="config_${qtdConfig}">` +
                   `  <div class="card-content white-text">` +
                   `    <div class="row">` +
                   `      <div class="input-field col s8">` +
                   `        <input type="text" id="diretorioOrigem_${qtdConfig}" name="diretorioOrigem" value="${obj.dirEntrada}" >` +
                   `        <label for="diretorioOrigem_${qtdConfig}">Diret�rio a ser copiado</label>` +
                   `      </div>` +
                   `    </div>` +
                   `    <div class="row">` +
                   `      <div class="input-field col s8">` +
                   `        <input type="text" id="diretorioDestino_${qtdConfig}" value=${obj.dirSaida}>` +
                   `        <label for="diretorioDestino_${qtdConfig}">Diret�rio para guardar a c�pia</label>` +
                   `      </div>` +
                   `      <div class="input-field col s1">` +
                   `        </div>` +
                   `          <div class="input-field col s3">` +
                   `            <select name="extensoes_${qtdConfig}" multiple>` +
                   `              <option value="p">.p</option>` +
                   `              <option value="i">.i</option>` +
                   `              <option value="html">.html</option>` +
                   `            </select>` +
                   `            <label>Extens�es a verificar</label>` +
                   `          </div>` +
                   `      </div>` +
                   `    </div>` +
                   `    <div class="card-action">` +
                   `      <a class="waves-effect red btn-small" onclick="deleteCongif('config_${qtdConfig}')"><i class="material-icons right">delete</i>Deletar</a>` +
                   `    </div>` +
                   `</div>` ;

    $('#listagemConfigs').append(novoCard);
    $('select').formSelect();
    qtdConfig++;
  });
};