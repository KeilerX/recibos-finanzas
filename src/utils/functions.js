

export const newDate = () => {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export const calcularDiasTranscurridos = (discount_date,payment_date) => { //yyyy-mm-dd

    let fecha_de_descuento = new Date(discount_date);
    let fecha_de_pago = new Date(payment_date);
    let diff = ((fecha_de_pago-fecha_de_descuento)/(24 * 60 * 60 * 1000));
    console.log(`FDCTO: ${fecha_de_descuento} - FPAGO: ${fecha_de_pago} = DIFF: ${diff}`);
    return diff;
}

const calcularTasaEfectivaANDiasDeEfectiva = (rate_term,dias_transcurridos,rate_value) => {
    
    rate_value /= 100;
    let res =Math.pow(1+rate_value,dias_transcurridos/rate_term);
    res = (res-1)*100;
    console.log(`TE de E: ${res}`);
    return res;
}

const calcularTasaEfectivaANDiasDeNominal = (rate_term,capitalization_term,dias_transcurridos,rate_value) => {
    
    rate_value /= 100;
    let m = rate_term/capitalization_term;
    let n = dias_transcurridos/capitalization_term;
    let res = Math.pow(1+(rate_value/m),n)-1;
    res *= 100;
    console.log(`TE de N: ${res}`);
    return res;
}

export const calcularTasaEfectivaANDias = (rate_term,dias_transcurridos,rate_value,capitalization_term) => {
    if (localStorage.getItem("rate_type") === "Tasa Efectiva"){
        return calcularTasaEfectivaANDiasDeEfectiva(rate_term,dias_transcurridos,rate_value);
    }else{
        return calcularTasaEfectivaANDiasDeNominal(rate_term,capitalization_term,dias_transcurridos,rate_value);
    }
}
export const calcularTEA = (dias_por_anio,rate_term,rate_value,capitalization_term) => {
    if (localStorage.getItem("rate_type") === "Tasa Efectiva"){
        return calcularTasaEfectivaANDiasDeEfectiva(rate_term,dias_por_anio,rate_value);
    }else{
        return calcularTasaEfectivaANDiasDeNominal(rate_term,capitalization_term,dias_por_anio,rate_value);
    }
}


export const calcularTasaEfectivaDescuentoANDias = (tasa_efectiva_a_n_dias) => {
    tasa_efectiva_a_n_dias /= 100;
    return (tasa_efectiva_a_n_dias/(1+tasa_efectiva_a_n_dias))*100;
}

export const calcularDescuentoANDias = (tasa_efectiva_descuento_a_n_dias,nominal_value) =>{
    tasa_efectiva_descuento_a_n_dias /= 100;
    return tasa_efectiva_descuento_a_n_dias*nominal_value;
}

export const calcularValorNeto = (nominal_value,descuento_a_n_dias) =>{
    return nominal_value-descuento_a_n_dias
}

export const calcularSumaCostos= (costos, nominal_value) => {
    let suma_costos = 0;
    costos.forEach((value) => {
        if(value.cost_type === 'moneda'){
            suma_costos += value.cost;
        }else{
            suma_costos += value.cost*nominal_value;
        }
    });
    return suma_costos;
}

export const calcularValorRecibido = (valor_neto,suma_costos_iniciales,retention) =>{
    return valor_neto-suma_costos_iniciales-retention;
}

export const calcularValorEntregado = (valor_nominal,suma_costos_finales,retention) =>{
    return valor_nominal+suma_costos_finales-retention;
}

export const calcularTCEA = (valor_entregado,valor_recibido,dias_transcurridos,dias_por_anio) =>{
    let rate = Math.pow(valor_entregado/valor_recibido,dias_por_anio/dias_transcurridos)-1;
    return rate*100;
}

export const walletGetRow = (infoWallet, rateTermWallet, initialCostsWallet, finalCostsWallet) => {
    
    console.log(infoWallet, rateTermWallet, initialCostsWallet, finalCostsWallet);
    let last = infoWallet.length-1;
    let n=last+1;
    let discount_date = rateTermWallet.discount_date;
    let nominal_value = infoWallet[last].nominal_value;
    let ND = calcularDiasTranscurridos(discount_date,infoWallet[last].payment_date);
    let TE = calcularTasaEfectivaANDias(rateTermWallet.rate_term,ND,rateTermWallet.rate_value,rateTermWallet.capitalization_term);
    let d = calcularTasaEfectivaDescuentoANDias(TE);
    let D = calcularDescuentoANDias(d,nominal_value);
    let Rt = infoWallet[last].retention;
    let CI = calcularSumaCostos(initialCostsWallet, nominal_value);
    let VNet=calcularValorNeto(nominal_value,D);
    let VR = calcularValorRecibido(VNet,CI,Rt);
    let CF=calcularSumaCostos(finalCostsWallet, nominal_value);
    let VE=calcularValorEntregado(nominal_value,CF,Rt);
    let TCEA=calcularTCEA(VE,VR,ND,rateTermWallet.year_days);
    
    let receipt = {
        n:n,
        discount_date:discount_date,
        nominal_value:nominal_value,
        ND:ND,
        TE:TE.toFixed(7),
        d:d.toFixed(7),
        D:D.toFixed(2),
        Rt:Rt.toFixed(2),
        CI:CI.toFixed(2),
        VNet:VNet.toFixed(2),
        VR:VR.toFixed(2),
        CF:CF.toFixed(2),
        VE:VE.toFixed(2),
        TCEA:TCEA.toFixed(7)
    }
    console.log("receipt", receipt);
    return receipt;
}

export const walletGetValorRecibido = (wallet) => {

    let sum = 0;
    wallet.forEach((receipt) => {sum+=receipt.VR});
    console.log(`sum: ${sum}`);
    return sum;
}


export const walletGetTCEA = (wallet, sumVR) => {
    let receipts = [];
    wallet.forEach((receipt) => {receipts.push([receipt.VE,receipt.ND])});
    console.log(receipts);

    let valorTotalRecibir = sumVR;

    let F = 1;
    let a = 0;
    let b = 2*F/360;
    let tir_p = 0;
    let tcea = 0;
    let tir_a = 0;
    let c;
    let valc;

    for (let i=0; i<1000; i++){
        valc = 0;
        c = (a+b)/2;
        for (let j=0; j<receipts.length; j++)
            valc += receipts[j][0]/((1+c)**receipts[j][1]);

        if(valc < valorTotalRecibir){
            b = c;
        }else{
            a = c;
        }

        if(Math.abs(valc-valorTotalRecibir) < 0.001) {
            tir_p = c;
            tir_a = tir_p*360/F;
            tcea = (1+(tir_a*F)/360)**360 - 1;
            break;
        }
    }

    return tcea*100;
}