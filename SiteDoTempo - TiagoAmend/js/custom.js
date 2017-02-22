function mostraTemp(cidade){
  $.ajax({
    method: "GET",
    url: "http://api.openweathermap.org/data/2.5/weather",
    data: {
      q: cidade,
      lang: "pt",
      units: "metric",
      APPID: "cf0f2b64bb699829dacf3f882cef5ba4"
    },
    dataType: "json",
      success: function(response) {
        console.log(response);
        icon = response.weather[0].icon;
        $("#cidade").html("Previsão do tempo para <b>" + response.name +"</b>");
        $("#momento").html(response.main.temp+" ºC");
        $("#maxima").html(response.main.temp_max+" ºC");
        $("#minima").html(response.main.temp_min+" ºC");
        $("#umidade").html(response.main.humidity+"%");
        $("#pressao").html(response.main.pressure+" hPa");
        $("#condicao").html(response.weather[0].description);
        $("#vento").html(response.wind.speed+" m/s");
        $("#icone").attr("src", "http://openweathermap.org/img/w/"+icon+".png");
      },
      failure: function(response) {console.error(response);}
    });
  }

function mostraTempCinco(cidade){
  $.ajax({
    method: "GET",
    url: "http://api.openweathermap.org/data/2.5/forecast",
    data: {
      q: cidade,
      lang: "pt",
      units: "metric",
      APPID: "cf0f2b64bb699829dacf3f882cef5ba4"
    },
    dataType: "json",
    success: function(response){
      console.log(response);
      icones = [];
      horas = [];
      momentos = [];
      maximas = [];
      minimas = [];
      umidades = [];
      pressoes = [];
      condicoes = [];
      ventos = [];
      ind = 0;
      while (ind < response.list.length){
        icones.push(response.list[ind].weather[0].icon);
        horas.push(response.list[ind].dt_txt);
        momentos.push(response.list[ind].main.temp);
        maximas.push(response.list[ind].main.temp_max);
        minimas.push(response.list[ind].main.temp_min);
        umidades.push(response.list[ind].main.humidity);
        pressoes.push(response.list[ind].main.pressure);
        condicoes.push(response.list[ind].weather[0].description);
        ventos.push(response.list[ind].wind.speed);
        ind += 1
        }
      indice = 0;
      while (indice < response.list.length){
        $("#colap").append("<li><div class='collapsible-header'><i class='material-icons'>filter_drama</i><p><b>Previsão do tempo para o dia/hora: </b>" + horas[indice].substring(8, 10) + " de " + meses[horas[indice].substring(5, 7) -1] + " de " + horas[indice].substring(0, 4) + " às " + horas[indice].substring(11, 16) + "</p></div><div class='collapsible-body'><table class='bordered'><tr><td id='esp'>Temperatura no momento:</td><td class='center'><p id='esp'>" + momentos[indice] + " ºC</p></td></tr><tr><td>Temperatura máxima:</td><td class='center'><p>" + maximas[indice] + " ºC</p></td></tr><tr><td>Temperatura mínima:</td><td class='center'><p>" + minimas[indice] + " ºC</p></td></tr><tr><td>Porcentagem de umidade:</td><td class='center'><p>" + umidades[indice] + "%</p></td></tr><tr><td>Velocidade do vento:</td><td class='center'><p>" + ventos[indice] + " m/s</p></td></tr><tr><td>Condição climática:</td><td class='center'><p>" + condicoes[indice] + "</p></td></tr><tr><td>Pressão:</td><td class='center'><p>" + pressoes[indice] + " hPa</p></td></tr><tr><td>Tempo:</td><td class='center'><img src='http://openweathermap.org/img/w/" + icones[indice] + ".png'></td></tr></table></div></li>");
        indice += 1
        }
    },
    failure: function(response){console.error(response);}
  });
}

$(document).ready(function(){
    dias = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
    $(document).keypress(function(elemento){if(elemento.keyCode == 13){document.getElementById("clique").click();}});
    $("#atual").append("<table class='bordered'><tr><td>Temperatura máxima:</td><td class='center'><p id='maxima'></p></td></tr><tr><td>Temperatura mínima:</td><td class='center'><p id='minima'></p></td></tr><tr><td>Porcentagem de umidade:</td><td class='center'><p id='umidade'></p></td></tr><tr><td>Velocidade do vento:</td><td class='center'><p id='vento'></p></td></tr><tr><td>Condição climática:</td><td class='center'><p id='condicao'></p></td></tr><tr><td>Pressão:</td><td class='center'><p id='pressao'></p></td></tr></table>");
    $('input.autocomplete').autocomplete({data: {"Rio de Janeiro, BR": null, "Chapecó, BR": null, "São Paulo, BR": null, "Recife, BR": null,"Florianópolis, BR": null,}});

    $("#colap").slideUp("fast");
    desce = true;
    $("#descri").click(function(){
      if (desce === true){$("#colap").slideDown(); desce = false;}
      else {$("#colap").slideUp(); desce = true;}
    });

    now = new Date
    $("#data").html(dias[now.getDay()] + ", " + now.getDate() + " de " + meses[now.getMonth()] + " de " + now.getFullYear());
    mostraTemp("Concórdia, BR");
    mostraTempCinco("Concórdia, BR");
    $("#clique").click(function(){
      mostraTemp(($("#pesquisa").val()));
      mostraTempCinco(($("#pesquisa").val()));
    });


  });
