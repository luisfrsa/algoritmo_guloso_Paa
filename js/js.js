
var entrada = [
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
	];
var config = {
	subir:-60,
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
		return entrada[distancia+1][altura+1];
	}
	return Number.MAX_SAFE_INTEGER;
}
var manter= function(entrada,distancia,altura){
	return entrada[distancia+1][altura];
}
var descer= function(entrada,distancia,altura){
	if(validarPosicao(entrada,distancia,altura-1)){
		return entrada[distancia+1][altura-1];
	}
	return Number.MAX_SAFE_INTEGER;
}
var getMelhor = function(altura,valor_subir,valor_manter,valor_descer){
	var melhor = Number.MAX_SAFE_INTEGER;
	var nova_altura;
	if(melhor > valor_subir){
		melhor = valor_subir;
		nova_altura = altura+1;
		opcao = "++";
	}
	if(melhor > valor_manter){
		melhor = valor_manter;
		nova_altura = altura;
		opcao = "==";
	}
	if(melhor > valor_descer){
		melhor = valor_descer;
		nova_altura = altura-1;
		opcao = "--";
	}
	return {melhor:melhor,nova_altura:nova_altura,opcao:opcao};
}
var functionGulosa= function(total,entrada,distancia,altura,caminho){
	caminho = caminho || [];
	var ranges = getMinMax(entrada);
	if(distancia>ranges.horiz.max){
		return {total:total,caminho:caminho};
	}
	var nova_altura;
	valor_subir = subir(entrada,distancia,altura);
	valor_manter = manter(entrada,distancia,altura);
	valor_descer = descer(entrada,distancia,altura);
	
	var melhores = getMelhor(altura,valor_subir,valor_manter,valor_descer);
	total+= melhores.melhor;
	caminho.push(melhores.opcao);
	return functionGulosa(total,entrada,distancia+1,melhores.nova_altura,caminho);


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