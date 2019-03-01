
// DATA ATUAL
function DataAtual() {    
    // Data Atual
    momentoAtual = new Date();
    hora = momentoAtual.getHours();
    minuto = momentoAtual.getMinutes();
    segundo = momentoAtual.getSeconds();
        
    // Se tiver menos que 2 digitos, acrescenta o 0
    // Horas
    if (String(hora).length < 2)
        hora = "0" + String(hora);
    // Minutos
    if (String(minuto).length < 2)
        minuto = "0" + String(minuto);            
    // Segundos
    if (String(segundo).length < 2)
        segundo = "0" + String(segundo);            
        
    horaImprimivel = hora + ":" + minuto + ":" + segundo                       
        
    document.getElementById("data_geral").innerHTML = 'Data: ' + horaImprimivel;    
}

// FORMATAR VALOR
function formatarValor(numero) {
    var valor;
    valor = numero; //string que representa o número
    valor = parseFloat(valor); // converto em número
    valor = valor.toFixed(2).replace(".",","); //troca . por ,
    valor = adicionarPonto(valor); //adiciona ponto 
    
    return valor;
}

// ADICIONA PONTO
function adicionarPonto(valor) {    
    valor += '';
    x = valor.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
	
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
	
    return x1 + x2;    
}

// BITCOINTRADE
function GetBitcoinTrade() {
    axios.get('https://api.bitcointrade.com.br/v2/public/BRLXRP/ticker')
    .then(function(response){

        // Mostra opções da API
        //console.log(response.data.data);

        // Valores
        document.getElementById("nome_bitcointrade").innerHTML = 'BITCOINTRADE';
        document.getElementById("atual_bitcointrade").innerHTML = 'Atual: ' + response.data.data.last;
        document.getElementById("compra_bitcointrade").innerHTML = 'Compra: ' + response.data.data.buy;
        document.getElementById("venda_bitcointrade").innerHTML = 'Venda: ' + response.data.data.sell;
        document.getElementById("volume_bitcointrade").innerHTML = 'Volume: ' + formatarValor(response.data.data.volume);
        document.getElementById("qtd_bitcointrade").innerHTML = 'Quantidade: ' + response.data.data.trades_quantity;
    })
    .catch(function(error){
        console.warn(error);
    });
}

/*
// BRAZILIEX
function GetBraziliex() {    
    //var client = new XMLHttpRequest()
    //client.open("GET", 'https://braziliex.com/api/v1/public/ticker/xrp_brl');
    //client.withCredentials = true;
    //axios.get(client)

    //axios.get('https://braziliex.com/api/v1/public/ticker/xrp_brl')
    //axios.get('https://api.bitcointrade.com.br/v2/public/BRLXRP/ticker')
    
    .then(function(response){

        // Mostra opções da API
        //console.log(response);

        // Valores
        document.getElementById("nome_braziliex").innerHTML = 'BRAZILIEX';
        document.getElementById("atual_braziliex").innerHTML = 'Atual: ' + response.data.data.last;
        document.getElementById("compra_braziliex").innerHTML = 'Compra: ' + response.data.data.buy;
        document.getElementById("venda_braziliex").innerHTML = 'Venda: ' + response.data.data.sell;

        document.getElementById("volume_braziliex").innerHTML = 'Volume: ' + formatarValor(response.data.data.volume);
        
   })
    .catch(function(error){
        console.warn(error);
    });
}
*/

// POLONIEX
function GetPoloniex() {       
    axios.get('https://poloniex.com/public?command=returnTicker') 
    .then(function(response){

        // Mostra opções da API
        //console.log(response.data.BTC_XRP);
        //console.log(response.data.BTC_XRP.last);

        // Valores
        document.getElementById("nome_poloniex").innerHTML = 'POLONIEX';
        document.getElementById("atual_poloniex").innerHTML = 'Atual: ' + response.data.BTC_XRP.last + ' BTC';
        document.getElementById("compra_poloniex").innerHTML = 'Compra: ' + response.data.BTC_XRP.highestBid + ' BTC';
        document.getElementById("venda_poloniex").innerHTML = 'Venda: ' + response.data.BTC_XRP.lowestAsk + ' BTC';
        //document.getElementById("volume_poloniex").innerHTML = 'Volume: ' + formatarValor(response.data.BTC_XRP.baseVolume) + ' BTC';
        document.getElementById("maior_poloniex").innerHTML = 'Menor: ' + response.data.BTC_XRP.low24hr + ' BTC';
        document.getElementById("menor_poloniex").innerHTML = 'Maior: ' + response.data.BTC_XRP.high24hr + ' BTC';        
        document.getElementById("percent_poloniex").innerHTML = 'Percentual: ' + formatarValor(response.data.BTC_XRP.percentChange) + ' %';

   })
    .catch(function(error){
        console.warn(error);
    });
}

setInterval(function(){ GetBitcoinTrade(); GetPoloniex(); DataAtual(); }, 100000);

