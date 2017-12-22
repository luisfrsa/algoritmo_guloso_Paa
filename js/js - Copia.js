var entradas = [
	[
		[1,1,1,1],
		[1,1,1,1],
		[1,1,1,1],
		[1,1,1,1],
		[1,1,1,1],
		[1,1,1,1], 
		[1,1,1,1],
		[1,1,1,1],
		[1,9,9,1],
		[1,-9,-9,1]
	],
	[
		[1,1,1,1],
		[1,1,1,1],
		[1,1,1,1],
		[1,1,1,1],
		[1,1,1,1],
		[5,1,1,1], 
		[15,16,17,18],
		[3,8,-9,14],
		[2,-7,10,-13],
		[1,6,11,12]
	],
];
/*
PELA ALTURA DA PARA SABER QUAIS RANGES SÃO PERMITIDOS (ANTES DE CHEGAR NO FIM, ALTURAS >X TEM VALOR MAX)

*/
var entrada = entradas[0];

var valores = JSON.parse(JSON.stringify(entrada));
var config = {
	subir:60,
	manter:30,
	descer:20
}

var getMinMax = function(entrada){
	return {
		vert:{
			min:0,
			max:entrada.length-1
		},
		horiz:{
			min:0,
			max:entrada[0].length-1
		},
	};
}
var validarPosicao = function(entrada,distancia,altura){
	var ranges = getMinMax(entrada);

	if(distancia <= ranges.horiz.max && distancia >= ranges.horiz.min){
		if(altura <= ranges.vert.max && altura >= ranges.vert.min){
			return true;
		}
	}
	return false;
}
var subir= function(entrada,distancia,altura){
	if(validarPosicao(entrada,distancia,altura+1)){
		return parseInt(entrada[altura+1][distancia])*-1;
	}
	return Number.MAX_SAFE_INTEGER;
}
var manter= function(entrada,distancia,altura){
	return parseInt(entrada[altura][distancia])*-1;
}
var descer= function(entrada,distancia,altura){
	if(validarPosicao(entrada,distancia,altura-1)){
		return parseInt(entrada[altura-1][distancia])*-1;
	}
	return Number.MAX_SAFE_INTEGER;
}

var functionGulosa= function(total,entrada,distancia,altura,caminho){
	caminho = caminho || [];
	var ranges = getMinMax(entrada);
	var nova_altura;
	if(distancia>ranges.horiz.max){
		return {total:total,caminho:caminho};
	}
	valor_subir = subir(entrada,distancia,altura);
	valor_manter = manter(entrada,distancia,altura); 
	valor_descer = descer(entrada,distancia,altura);
	
	
	var melhores = getMelhor(altura,valor_subir+config.subir,valor_manter+config.manter,valor_descer+config.descer);
	total+= melhores.melhor;
	caminho.push(melhores.opcao);
	console.log("Atual: "+ entrada[distancia][altura]+", Distancia: "+ distancia+", Altura: "+altura);
	console.log("Subir : "+valor_subir+":"+(valor_subir+config.subir)+", Manter : "+valor_manter+":"+(valor_manter+config.manter)+", Descer : "+valor_descer+":"+(valor_descer+config.descer));
	console.log("Total: "+total);
	return functionGulosa(total,entrada,distancia+1,melhores.nova_altura,caminho);
}	
var getMelhor = function(altura,valor_subir,valor_manter,valor_descer){
	var melhor = Number.MAX_SAFE_INTEGER;
	var nova_altura;
	if(melhor > valor_subir){
		melhor = valor_subir;
		nova_altura = altura+1;
		opcao = "sobe";
	}
	if(melhor > valor_manter){
		melhor = valor_manter;
		nova_altura = altura;
		opcao = "mantem";
	}
	if(melhor > valor_descer){
		melhor = valor_descer;
		nova_altura = altura-1;
		opcao = "desce";
	}
	return {melhor:melhor,nova_altura:nova_altura,opcao:opcao};
}
var ready = function(){
//$('#entrada').html(entrada.join('\n'));
$('#entrada').html(entrada.join('<br>'));

	entrada.reverse();

	console.log(entrada);
	var resultado = functionGulosa(0,entrada,0,0,[]);
	console.log(resultado);
	var html = "<br>Total: "+resultado.total;
	html+="<br>";
	html+="Caminho: "+resultado.caminho.join(', ');
	$('#resultado').html(html);

	$('#entrada').on('change',function(){
		console.log($(this).val());
	});
}
$(document).ready(ready);
