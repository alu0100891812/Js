var estadistica = [0,0,0,0,0,0];
var showing = false;

function lanzar() {
  var numero = Math.random();
  var dado = document.getElementById("dado");

  if(numero<(1/6)){
      numero = 1;
  }else if(numero<(2/6)){
      numero = 2;
  }else if(numero<(3/6)){
      numero = 3;
  }else if(numero<(4/6)){
      numero = 4;
  }else if(numero<(5/6)){
      numero = 5;
  }else if(numero<1){
      numero = 6;
  }
  estadistica[numero-1]++;
  dado.style.backgroundImage = 'url("dice' + numero + '.png")';

  actEst();
}

function mostrarEst() {
  if(!showing) {
    document.getElementById("bars").style.height = "210px";
    document.getElementById("estadistica").style.height = "240px";
    document.getElementById('showEst').innerHTML = "Ocultar estadistica";
    showing = true;
  }else{
    document.getElementById("bars").style.height = "0px";
    document.getElementById("estadistica").style.height = "80px";
    document.getElementById('showEst').innerHTML = "Mostrar estadistica";
    showing = false;
  }

  actEst();
}

function actEst() {
  var max = 0;
  for(var i=0; i<6; i++){
    if(estadistica[i]>max){
      max=estadistica[i];
    }
  }

  for(var j=0; j<6; j++){
    document.getElementById((j+1) + "bar").style.width = ((270/max)*estadistica[j])+ "px";
    document.getElementById((j+1) + "bar").innerHTML = estadistica[j];
  }
}
