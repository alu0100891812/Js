var estadistica = [0,0,0,0,0,0];

function lanzar() {
  var numero = Math.random();
  var dado = document.getElementById("dado");
  if(numero<(1/6))
      numero = 1;
  else if(numero<(2/6))
      numero = 2;
  else if(numero<(3/6))
      numero = 3;
  else if(numero<(4/6))
      numero = 4;
  else if(numero<(5/6))
      numero = 5;
  else if(numero<1)
      numero = 6;
  estadistica[numero-1]++;
  dado.innerHTML = "El resultado es " + numero;
}

function mostrarEst() {
  var max = 0;
  for(var i=0; i<6; i++){
    if(estadistica[i]>max){
      max=estadistica[i];
    }
  }

  document.getElementById("bars").style.height = "210px";
  document.getElementById("estadistica").style.height = "295px";



  for(var j=0; j<6; j++){
    document.getElementById((j+1) + "bar").style.width = ((270/max)*estadistica[j])+ "px";
    document.getElementById((j+1) + "bar").innerHTML = estadistica[j];
  }
}
