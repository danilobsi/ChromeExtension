(function() {
	var url = "";
	
	var cpf = gerarCPF();
	var cnpj = gerarCNPJ();
	
	chrome.runtime.sendMessage({redirect: "http://google.com.br"});
	
	chrome.runtime.onMessage.addListener(function(request, sender) {
		chrome.tabs.update(sender.tab.id, {url: request.redirect});
	});
	
	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
		//url = tabs[0].url;
		//document.getElementById("nome").innerText = url;
		//tabs.forEach(function(item){
		//	document.getElementById("nome").innerHTML += "<br>" + item.url;
		//});
		document.getElementById("cpf").innerHTML = cpf;
		document.getElementById("cnpj").innerHTML = cnpj;
	});
	
	//chrome.browserAction.onClicked.addListener(function(tab) {
		chrome.tabs.executeScript({
			code: "document.getElementsByName('usuario').forEach(function (item){" +
			"	item.value = '" + cpf + "';" +
			"});"
			
			//document.getElementById("cpf").innerHTML = cpf;
			//document.getElementById("cnpj").innerHTML = cnpj;
			
			//document.getElementByName("cpf").innerHTML = cpf;
			//document.getElementByName("cnpj").innerHTML = cnpj;
		});
	//});
})();

// funções gerais
function randomiza(n) {
	var ranNum = Math.round(Math.random()*n);
	return ranNum;
}

function mod(dividendo,divisor) {
	return Math.round(dividendo - (Math.floor(dividendo/divisor)*divisor));
}

function somenteNumeros(obj, ev){
	
	ek = ev.keyCode;
     if (ek != 8 && ek != 37 && ek != 38 && ek != 39 && ek != 40 && ek != 16 && ek != 46){
     if (!(ek >= 48 && ek <= 57) && !(ek >= 96 && ek <= 105) ){
          var aux = obj.value;
               aux = aux.replace(/\D/g,"");
               obj.value = aux;
          }
     }
}


// funções CPF
//function gerarCPF(field) {
function gerarCPF() {
   
    var comPontos = false;
    //if (document.getElementById("so_num_cpf").checked==false)
    //comPontos = true;
  
	var n = 9;
	var n1 = randomiza(n);
	var n2 = randomiza(n);
	var n3 = randomiza(n);
	var n4 = randomiza(n);
	var n5 = randomiza(n);
	var n6 = randomiza(n);
	var n7 = randomiza(n);
	var n8 = randomiza(n);
	var n9 = randomiza(n);
	var d1 = n9*2+n8*3+n7*4+n6*5+n5*6+n4*7+n3*8+n2*9+n1*10;
	d1 = 11 - ( mod(d1,11) );
	if (d1>=10) d1 = 0;
	var d2 = d1*2+n9*3+n8*4+n7*5+n6*6+n5*7+n4*8+n3*9+n2*10+n1*11;
	d2 = 11 - ( mod(d2,11) );
	if (d2>=10) d2 = 0;
	retorno = '';
	if (comPontos) cpf = ''+n1+n2+n3+'.'+n4+n5+n6+'.'+n7+n8+n9+'-'+d1+d2;
	else cpf = ''+n1+n2+n3+n4+n5+n6+n7+n8+n9+d1+d2;

	return cpf;
}

function VerificaCPF() {
	obj = document.getElementById("campo_cpf2").value
	if (vercpf(obj))
		document.getElementById('bot_cpf').src = 'images/bot-verdadeiro.jpg';
	else
		document.getElementById('bot_cpf').src = 'images/bot-falso.jpg';
}

function vercpf (cpf){if (cpf.length != 11 || cpf == "00000000000" || cpf == "11111111111" || cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" || cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf == "99999999999")
	return false;
	add = 0;
	for (i=0; i < 9; i ++)
	add += parseInt(cpf.charAt(i)) * (10 - i);
	rev = 11 - (add % 11);
	if (rev == 10 || rev == 11)
	rev = 0;
	if (rev != parseInt(cpf.charAt(9)))
	return false;
	add = 0;
	for (i = 0; i < 10; i ++)
	add += parseInt(cpf.charAt(i)) * (11 - i);
	rev = 11 - (add % 11);
	if (rev == 10 || rev == 11)
	rev = 0;
	if (rev != parseInt(cpf.charAt(10)))
	return false;
	return true;
}




// funções CNPJ
//function gerarCNPJ(field) {
function gerarCNPJ() {
	
   	var comPontos = false;
    //if (document.getElementById("so_num_cnpj").checked==false)
    //comPontos = true;
   
    var n = 9;
	var n1 = randomiza(n);
	var n2 = randomiza(n);
	var n3 = randomiza(n);
	var n4 = randomiza(n);
	var n5 = randomiza(n);
	var n6 = randomiza(n);
	var n7 = randomiza(n);
	var n8 = randomiza(n);
	var n9 = 0; //randomiza(n);
	var n10 = 0; //randomiza(n);
	var n11 = 0; //randomiza(n);
	var n12 = 1; //randomiza(n);
	var d1 = n12*2+n11*3+n10*4+n9*5+n8*6+n7*7+n6*8+n5*9+n4*2+n3*3+n2*4+n1*5;
	d1 = 11 - ( mod(d1,11) );
	if (d1>=10) d1 = 0;
	var d2 = d1*2+n12*3+n11*4+n10*5+n9*6+n8*7+n7*8+n6*9+n5*2+n4*3+n3*4+n2*5+n1*6;
	d2 = 11 - ( mod(d2,11) );
	if (d2>=10) d2 = 0;
	retorno = '';
	if (comPontos) cnpj = ''+n1+n2+'.'+n3+n4+n5+'.'+n6+n7+n8+'/'+n9+n10+n11+n12+'-'+d1+d2;
	else cnpj = ''+n1+n2+n3+n4+n5+n6+n7+n8+n9+n10+n11+n12+d1+d2;

 	//field.value = cnpj;
	return cnpj;
}

function VerificaCNPJ() {
	obj = document.getElementById("campo_cnpj2").value
	if (valida_cnpj(obj))
		document.getElementById('bot_cpf').src = 'images/bot-verdadeiro.jpg';
	else
		document.getElementById('bot_cpf').src = 'images/bot-falso.jpg';
}

function valida_cnpj(cnpj){
      var numeros, digitos, soma, i, resultado, pos, tamanho, digitos_iguais;
      digitos_iguais = 1;
      if (cnpj.length < 14 && cnpj.length < 15)
            return false;
      for (i = 0; i < cnpj.length - 1; i++)
            if (cnpj.charAt(i) != cnpj.charAt(i + 1))
                  {
                  digitos_iguais = 0;
                  break;
                  }
      if (!digitos_iguais)
            {
            tamanho = cnpj.length - 2
            numeros = cnpj.substring(0,tamanho);
            digitos = cnpj.substring(tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (i = tamanho; i >= 1; i--)
                  {
                  soma += numeros.charAt(tamanho - i) * pos--;
                  if (pos < 2)
                        pos = 9;
                  }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(0))
                  return false;
            tamanho = tamanho + 1;
            numeros = cnpj.substring(0,tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (i = tamanho; i >= 1; i--)
                  {
                  soma += numeros.charAt(tamanho - i) * pos--;
                  if (pos < 2)
                        pos = 9;
                  }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(1))
                  return false;
            return true;
            }
      else
            return false;
			

} 



// funções RG
function gerarRG(obj){
	
	num_rg = 4;
	rg1 = new Array (num_rg);
	rg2 = new Array (num_rg);
	
	rg1[0]  = '911225341';rg2[0]  = '91.122.534-1';
	rg1[1]  = '403289440';rg2[1]  = '4.032.894-40';
	rg1[2]  = '418757896';rg2[2]  = '41.875.789-6';
	rg1[3]  = '2977269';rg2[3]  = '2.977.269';
	rg1[4] = '429434121';rg2[4] = '42.943.412-1';

	if (document.getElementById('so_num_rg').checked==true)
	obj.value = rg1[randomiza(num_rg)];
	else
	obj.value = rg2[randomiza(num_rg)];

}

function VerificaRG(numero){
	 var numero = numero.split("");
	 tamanho = numero.length;
	 vetor = new Array(tamanho);
	
	if(tamanho>=1)
	{
	 vetor[0] = parseInt(numero[0]) * 2; 
	}
	if(tamanho>=2){
	 vetor[1] = parseInt(numero[1]) * 3; 
	}
	if(tamanho>=3){
	 vetor[2] = parseInt(numero[2]) * 4; 
	}
	if(tamanho>=4){
	 vetor[3] = parseInt(numero[3]) * 5; 
	}
	if(tamanho>=5){
	 vetor[4] = parseInt(numero[4]) * 6; 
	}
	if(tamanho>=6){
	 vetor[5] = parseInt(numero[5]) * 7; 
	}
	if(tamanho>=7){
	 vetor[6] = parseInt(numero[6]) * 8; 
	}
	if(tamanho>=8){
	 vetor[7] = parseInt(numero[7]) * 9; 
	}
	if(tamanho>=9){
	 vetor[8] = parseInt(numero[8]) * 100; 
	}
	
	 total = 0;
	
	if(tamanho>=1){
	 total += vetor[0];
	}
	if(tamanho>=2){
	 total += vetor[1]; 
	}
	if(tamanho>=3){
	 total += vetor[2]; 
	}
	if(tamanho>=4){
	 total += vetor[3]; 
	}
	if(tamanho>=5){
	 total += vetor[4]; 
	}
	if(tamanho>=6){
	 total += vetor[5]; 
	}
	if(tamanho>=7){
	 total += vetor[6];
	}
	if(tamanho>=8){
	 total += vetor[7]; 
	}
	if(tamanho>=9){
	 total += vetor[8]; 
	}
	
	
	 resto = total % 11;
	 
	obj = document.getElementById("campo_rg2").value;

	if (resto!=0 || obj=='')
		document.getElementById('bot_rg').src = 'images/bot-falso.jpg';
	else
		document.getElementById('bot_rg').src = 'images/bot-verdadeiro.jpg';

	
}


// funções CEP

function gerarCEP(obj){
	
	num_cep = 20;
	cep1 = new Array (num_cep);
	cep2 = new Array (num_cep);
	
	cep1[0] = '78994000';cep2[0] = '78994-000';
	cep1[1] = '78994800';cep2[1] = '78994-800';
	cep1[2] = '78956000';cep2[2] = '78956-000';
	cep1[3] = '13500110';cep2[3] = '13500-110';
	cep1[4] = '78931000';cep2[4] = '78931-000';
	cep1[5] = '78967800';cep2[5] = '78967-800';
	cep1[6] = '13092150';cep2[6] = '13092-150';
	cep1[7] = '78968000';cep2[7] = '78968-000';
	cep1[8] = '13537000';cep2[8] = '13537-000';
	cep1[9] = '78993000';cep2[9] = '78993-000';
	cep1[10] = '78973000';cep2[10] = '78973-000';
	cep1[11] = '78990000';cep2[11] = '78990-000';
	cep1[12] = '13500000';cep2[12] = '13500-000';
	cep1[13] = '20521110';cep2[13] = '20521-110';
	cep1[14] = '20530350';cep2[14] = '20530-350';
	cep1[15] = '20260160';cep2[15] = '20260-160';
	cep1[16] = '20511170';cep2[16] = '20511-170';
	cep1[17] = '13500313';cep2[17] = '13500-313';
	cep1[18] = '20511330';cep2[18] = '20511-330';
	cep1[19] = '13506555';cep2[19] = '13506-555';
	cep1[20] = '20530350';cep2[20] = '20530-350';

	if (document.getElementById('so_num_cep').checked==true)
	obj.value = cep1[randomiza(num_cep)];
	else
	obj.value = cep2[randomiza(num_cep)];

}


// funções SENHA

function getRandomNum(lbound, ubound) {
	return (Math.floor(Math.random() * (ubound - lbound)) + lbound);
}
function getRandomChar(number, lower, upper, other, extra) {
	var numberChars = "0123456789";
	var lowerChars = "abcdefghijklmnopqrstuvwxyz";
	var upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var otherChars = "`~!@#$%^&*()-_=+[{]}\\|;:'\",<.>/? ";
	var charSet = extra;
	if (number == true)
		charSet += numberChars;
	if (lower == true)
		charSet += lowerChars;
	if (upper == true)
		charSet += upperChars;
	if (other == true)
		charSet += otherChars;
		return charSet.charAt(getRandomNum(0, charSet.length));
	}
	
function getPassword(length, extraChars, firstNumber, firstLower, firstUpper, firstOther,
	latterNumber, latterLower, latterUpper, latterOther) {
	var rc = "";
	if (length > 0)
		rc = rc + getRandomChar(firstNumber, firstLower, firstUpper, firstOther, extraChars);
	for (var idx = 1; idx < length; ++idx) {
		rc = rc + getRandomChar(latterNumber, latterLower, latterUpper, latterOther, extraChars);
	}
	return rc;
}


// funções NICK

function seleciona(campo) {
campo.focus();
campo.select();
}
 
function geradordenicks_fonte(input) {
base = input;
tipo1 = document.getElementById('tipo1');
tipo2 = document.getElementById('tipo2');
tipo3 = document.getElementById('tipo3');
tipo4 = document.getElementById('tipo4');
tipo5 = document.getElementById('tipo5');
tipo6 = document.getElementById('tipo6');
tipo7 = document.getElementById('tipo7');
tipo8 = document.getElementById('tipo8');
tipo9 = document.getElementById('tipo9');
tipo10 = document.getElementById('tipo10');
tipo11 = document.getElementById('tipo11');
tipo12 = document.getElementById('tipo12');
tipo13 = document.getElementById('tipo13');
tipo14 = document.getElementById('tipo14');
tipo15 = document.getElementById('tipo15');
tipo16 = document.getElementById('tipo16');
tipo17 = document.getElementById('tipo17');
tipo18 = document.getElementById('tipo18');
tipo19 = document.getElementById('tipo19');
tipo20 = document.getElementById('tipo20');
 
tipo1.value = base.value
.replace(/a/gi, "ล")
.replace(/b/gi, "в")
.replace(/c/gi, "¢")
.replace(/d/gi, "∂")
.replace(/e/gi, "э")
.replace(/f/gi, "ƒ")
.replace(/g/gi, "φ")
.replace(/h/gi, "ђ")
.replace(/i/gi, "เ")
.replace(/j/gi, "נ")
.replace(/k/gi, "к")
.replace(/l/gi, "ℓ")
.replace(/m/gi, "м")
.replace(/n/gi, "и")
.replace(/o/gi, "๏")
.replace(/p/gi, "ק")
.replace(/q/gi, "ợ")
.replace(/r/gi, "я")
.replace(/s/gi, "ร")
.replace(/t/gi, "†")
.replace(/u/gi, "µ")
.replace(/v/gi, "√")
.replace(/x/gi, "җ")
.replace(/w/gi, "ω")
.replace(/y/gi, "ý")
.replace(/z/gi, "ž")
;
tipo2.value = base.value
.replace(/a/gi, "α")
.replace(/e/gi, "є")
.replace(/h/gi, "н")
.replace(/m/gi, "м")
.replace(/n/gi, "и")
.replace(/o/gi, "σ")
.replace(/p/gi, "ρ")
.replace(/r/gi, "я")
.replace(/s/gi, "ร")
.replace(/t/gi, "т")
.replace(/u/gi, "υ")
;
tipo3.value = base.value
.replace(/a/gi, "α")
.replace(/e/gi, "є")
.replace(/h/gi, "Ћ")
.replace(/l/gi, "ł")
.replace(/m/gi, "м")
.replace(/n/gi, "η")
.replace(/o/gi, "ø")
.replace(/p/gi, "ρ")
.replace(/s/gi, "s")
.replace(/t/gi, "ŧ")
;
nova_palavra = "";
for(i = 0; i < base.value.length; i++) {
texto = base.value.substr(i, 1);
if(i % 2 == 0) {
nova_palavra+= texto.toUpperCase();
} else {
nova_palavra+= texto.toLowerCase();
}
}
tipo4.value = nova_palavra;
 
tipo5.value = base.value
.replace(/a/gi, "ɑ")
.replace(/b/gi, "ɓ")
.replace(/d/gi, "ɗ")
.replace(/e/gi, "ɛ")
.replace(/f/gi, "Բ")
.replace(/h/gi, "ɦ")
.replace(/j/gi, "ʝ")
.replace(/l/gi, "ʆ")
.replace(/m/gi, "ɱ")
.replace(/n/gi, "ɳ")
.replace(/o/gi, "ѳ")
.replace(/r/gi, "ʀ")
.replace(/s/gi, "ร")
.replace(/v/gi, "ѵ")
;
tipo6.value = base.value
.replace(/a/gi, "آ")
.replace(/b/gi, "أ")
.replace(/c/gi, "ؤ")
.replace(/d/gi, "إ")
.replace(/e/gi, "ئ")
.replace(/f/gi, "ئ")
.replace(/g/gi, "ا")
.replace(/h/gi, "ب")
.replace(/i/gi, "ة")
.replace(/j/gi, "ت")
.replace(/k/gi, "ث")
.replace(/l/gi, "ج")
.replace(/m/gi, "خ")
.replace(/n/gi, "د")
.replace(/o/gi, "ذ")
.replace(/p/gi, "ر")
.replace(/q/gi, "ز")
.replace(/r/gi, "س")
.replace(/s/gi, "آ")
.replace(/t/gi, "ص")
.replace(/u/gi, "ض")
.replace(/v/gi, "ط")
.replace(/x/gi, "ع")
.replace(/w/gi, "ظ")
.replace(/y/gi, "غ")
.replace(/z/gi, "ב")
;
tipo7.value = base.value
.replace(/a/gi, "α")
.replace(/b/gi, "в")
.replace(/c/gi, "૮")
.replace(/d/gi, "đ")
.replace(/e/gi, "૯")
.replace(/f/gi, "Բ")
.replace(/h/gi, "ђ")
.replace(/k/gi, "ઝ")
.replace(/l/gi, "ℓ")
.replace(/m/gi, "ʍ")
.replace(/n/gi, "ท")
.replace(/o/gi, "ѳ")
.replace(/p/gi, "ρ")
.replace(/q/gi, "૧")
.replace(/r/gi, "૨")
.replace(/s/gi, "ઽ")
.replace(/t/gi, "Ƭ")
.replace(/u/gi, "ષ")
.replace(/v/gi, "√")
.replace(/x/gi, "×")
.replace(/w/gi, "ખ")
;
tipo8.value = base.value
.replace(/a/gi, "α")
;
tipo9.value = "[" + base.value.replace(/|/g, "̲̅")
.replace(/a/gi,"α")
.replace(/p/gi,"ρ")
.replace(/n/gi,"и")
.replace(/t/gi,"т")
.replace(/e/gi,"є")
.replace(/u/gi,"υ")
.replace(/h/gi,"н")
.replace(/s/gi,"ร")
.replace(/o/gi,"σ")
.replace(/m/gi,"м")
.replace(/r/gi,"я") + "]"
;
 
tipo10.value = base.value
.replace(/a/gi, "Α")
.replace(/e/gi, "э")
.replace(/h/gi, "н")
.replace(/m/gi, "м")
.replace(/n/gi, "И")
.replace(/o/gi, "Ø")
.replace(/p/gi, "p")
.replace(/r/gi, "Я")
.replace(/t/gi, "Ŧ")
.replace(/u/gi, "u")
;
tipo11.value = base.value
.replace(/a/gi, "ค")
.replace(/b/gi, "๒")
.replace(/d/gi, "๔")
.replace(/e/gi, "є")
.replace(/f/gi, "Ŧ")
.replace(/h/gi, "ђ")
.replace(/i/gi, "เ")
.replace(/j/gi, "ן")
.replace(/k/gi, "к")
.replace(/l/gi, "l")
.replace(/m/gi, "м")
.replace(/n/gi, "ภ")
.replace(/o/gi, "๏")
.replace(/r/gi, "ภ")
.replace(/s/gi, "ร")
.replace(/t/gi, "т")
.replace(/u/gi, "ย")
;
tipo12.value = base.value
.replace(/a/gi, "Ǻ")
.replace(/e/gi, "€")
.replace(/h/gi, "Ћ")
.replace(/m/gi, "м")
.replace(/n/gi, "п")
.replace(/o/gi, "Ø")
.replace(/p/gi, "ρ")
.replace(/r/gi, "Я")
.replace(/s/gi, "ک")
.replace(/t/gi, "T")
.replace(/u/gi, "Ü")
;
tipo13.value = base.value
.replace(/a/gi, "ɐ")
.replace(/d/gi, "p")
.replace(/e/gi, "ǝ")
.replace(/h/gi, "ɥ")
.replace(/m/gi, "ɯ")
.replace(/n/gi, "u")
.replace(/o/gi, "o")
.replace(/p/gi, "d")
.replace(/r/gi, "ɹ")
.replace(/s/gi, "s")
.replace(/t/gi, "ʇ")
.replace(/u/gi, "n")
.replace(/w/gi, "m")
;
tipo14.value = "‮" + base.value;
 
tipo15.value = base.value
.replace(/a/gi, "Δ")
.replace(/b/gi, "β")
.replace(/c/gi, "Ć")
.replace(/d/gi, "Đ")
.replace(/e/gi, "€")
.replace(/f/gi, "₣")
.replace(/g/gi, "Ǥ")
.replace(/h/gi, "Ħ")
.replace(/i/gi, "Ξ")
.replace(/j/gi, "Ĵ")
.replace(/k/gi, "Ҝ")
.replace(/l/gi, "Ł")
.replace(/m/gi, "Μ")
.replace(/n/gi, "Ň")
.replace(/o/gi, "Ø")
.replace(/p/gi, "Р")
.replace(/q/gi, "Ω")
.replace(/r/gi, "Ř")
.replace(/s/gi, "Ş")
.replace(/t/gi, "Ŧ")
.replace(/u/gi, "Ữ")
.replace(/v/gi, "V")
.replace(/x/gi, "Ж")
.replace(/w/gi, "Ŵ")
.replace(/y/gi, "¥")
.replace(/z/gi, "Ž")
;
tipo16.value = base.value
.replace(/a/gi, "4")
.replace(/e/gi, "3")
.replace(/i/gi, "1")
.replace(/o/gi, "0")
.replace(/s/gi, "5")
.replace(/t/gi, "7")
;
tipo17.value = base.value
.replace(/a/gi, "ⓐ")
.replace(/b/gi, "ⓑ")
.replace(/c/gi, "ⓒ")
.replace(/d/gi, "ⓓ")
.replace(/e/gi, "ⓔ")
.replace(/f/gi, "ⓕ")
.replace(/g/gi, "ⓖ")
.replace(/h/gi, "ⓗ")
.replace(/i/gi, "ⓘ")
.replace(/j/gi, "ⓙ")
.replace(/k/gi, "ⓚ")
.replace(/l/gi, "ⓛ")
.replace(/m/gi, "ⓜ")
.replace(/n/gi, "ⓝ")
.replace(/o/gi, "ⓞ")
.replace(/p/gi, "ⓟ")
.replace(/q/gi, "ⓠ")
.replace(/r/gi, "ⓡ")
.replace(/s/gi, "ⓢ")
.replace(/t/gi, "ⓣ")
.replace(/u/gi, "ⓤ")
.replace(/v/gi, "ⓥ")
.replace(/x/gi, "ⓧ")
.replace(/w/gi, "ⓦ")
.replace(/y/gi, "ⓨ")
.replace(/z/gi, "ⓩ")
;
tipo18.value = base.value
.replace(/a/gi, "á")
.replace(/e/gi, "è")
.replace(/h/gi, "H")
.replace(/i/gi, "í")
.replace(/o/gi, "Ô")
.replace(/s/gi, "S")
.replace(/u/gi, "Ù")
;
tipo19.value = base.value
.replace(/a/gi, "Ǻ")
.replace(/b/gi, "в")
.replace(/d/gi, "Ð")
.replace(/e/gi, "€")
.replace(/f/gi, "ƒ")
.replace(/g/gi, "ǥ")
.replace(/h/gi, "Ћ")
.replace(/l/gi, "Ł")
.replace(/m/gi, "м")
.replace(/n/gi, "и")
.replace(/o/gi, "Ø")
.replace(/p/gi, "ρ")
.replace(/r/gi, "я")
.replace(/s/gi, "ร")
.replace(/t/gi, "т")
.replace(/u/gi, "Ü")
.replace(/x/gi, "×")
.replace(/w/gi, "ω")
.replace(/y/gi, "¥")
.replace(/z/gi, "ƶ")
;
tipo20.value=" " + base.value.replace(/|/g,"̶") + " ";
 
}