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
	
];
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
function dinamica(entrada,distancia,altura){
	var ranges = getMinMax(entrada);
	console.log(arguments);
	if(distancia>ranges.horiz.max){
		console.log('{total:0,altura:altura,opcao:[],alturas:[],valores:[],numeros:[]}');
		return {total:0,altura:altura,opcao:[],alturas:[],valores:[],numeros:[]};
	}

	if(distancia==ranges.horiz.max){
		console.log('{total:0,altura:altura,opcao:[],alturas:[],valores:[],numeros:[]}');
		return {total:0,altura:altura,opcao:[],alturas:[],valores:[],numeros:[]};
	}
	var melhor_subir  = dinamica(entrada,distancia+1,altura+1);
	var melhor_manter = dinamica(entrada,distancia+1,altura);
	if(altura > 0){
		var melhor_descer = dinamica(entrada,distancia+1,altura-1);
	}

	valor_subir = subir(entrada,distancia,altura);
	valor_manter = manter(entrada,distancia,altura); 
	valor_descer = descer(entrada,distancia,altura);

	var melhor_recursivo = melhor_subir;
	var melhor_altura;
	var maior = Number.MAX_SAFE_INTEGER;
	if(typeof(melhor_subir)!=='undefined'){
		if(maior > melhor_subir.total){
			maior =melhor_subir.total; 
			melhor_altura = altura+1;
			melhor_recursivo = melhor_subir;
		}
	}
	if(typeof(melhor_manter)!=='undefined'){
		if(maior > melhor_manter.total){
			maior =melhor_manter.total;
			melhor_altura = altura;
			melhor_recursivo = melhor_manter;
		}
	}
	if(typeof(melhor_descer)!=='undefined'){
		if(maior > melhor_descer.total){
			maior =melhor_descer.total;
			melhor_altura = altura-1;
			melhor_recursivo = melhor_descer;
		}
	}
	var melhores_locais = getMelhor(melhor_recursivo.altura,
							  valor_subir,
							  valor_manter,
							  valor_descer);
	
	melhor_recursivo.opcao.push(melhores_locais.opcao);
	melhor_recursivo.alturas.push(melhor_recursivo.altura);
	melhor_recursivo.valores.push(melhores_locais.melhor);
	melhor_recursivo.numeros.push(melhores_locais.numero);
	var ret =  {
		total:(melhores_locais.melhor+melhor_recursivo.total),
		altura:melhores_locais.nova_altura,
		opcao:melhor_recursivo.opcao,
		alturas:melhor_recursivo.alturas,
		valores:melhor_recursivo.valores,
		numeros:melhor_recursivo.numeros
	};
	console.log("Retorno->");
	console.log(ret);
	return ret;
}
var functionGulosa= function(entrada,distancia,altura,caminho){
	caminho = caminho || [];
	var ranges = getMinMax(entrada);
	var nova_altura;
	if(distancia>ranges.horiz.max){
		return {total:total,caminho:caminho};
	}
	valor_subir = subir(entrada,distancia,altura);
	valor_manter = manter(entrada,distancia,altura); 
	valor_descer = descer(entrada,distancia,altura);
}/*
var functionGulosa(entrada,distancia+1,altura+1,caminho);
	
	var melhores = getMelhor(altura,valor_subir+config.subir,valor_manter+config.manter,valor_descer+config.descer);
	total+= melhores.melhor;
	caminho.push(melhores.opcao);
	console.log("Atual: "+ entrada[distancia][altura]+", Distancia: "+ distancia+", Altura: "+altura);
	console.log("Subir : "+valor_subir+":"+(valor_subir+config.subir)+", Manter : "+valor_manter+":"+(valor_manter+config.manter)+", Descer : "+valor_descer+":"+(valor_descer+config.descer));
	console.log("Total: "+total);

	return functionGulosa(total,entrada,distancia+1,melhores.nova_altura,caminho);
}	
*/
var getMelhor = function(altura,valor_subir,valor_manter,valor_descer){
	var melhor = Number.MAX_SAFE_INTEGER;
	var nova_altura;
	var numero;
	if(melhor > valor_subir+config.subir){
		numero = valor_subir*-1;
		melhor = valor_subir+config.subir;
		nova_altura = altura+1;
		opcao = "sobe";
	}
	if(melhor > valor_manter+config.manter){
		numero = valor_manter*-1;
		melhor = valor_manter+config.manter;
		nova_altura = altura;
		opcao = "mantem";
	}
	if(melhor > valor_descer+config.descer){
		numero = valor_descer*-1;
		melhor = valor_descer+config.descer;
		nova_altura = altura-1;
		opcao = "desce";
	}
	return {melhor:melhor,nova_altura:nova_altura,opcao:opcao,numero:numero};
}
var func_reduce = function(el){
	if(typeof(el)==='object'){
		return func_reduce(el)+"<br>";
	}
	return el+", ";
}
var ready = function(){
//$('#entrada').html(entrada.join('\n'));
$('#entrada').html(entrada.join('<br>'));

	entrada.reverse();

	console.log(entrada);
	var resultado = dinamica(entrada,0,0);
	console.log(resultado);
	return;
	var html = "<br>Total: "+resultado.total;
	html+="<br>";
	html+="Caminho: "+resultado.reduce(func_reduce);
	$('#resultado').html(html);

	$('#entrada').on('change',function(){
		console.log($(this).val());
	});
}
$(document).ready(ready);
