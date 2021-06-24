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
    //console.log(`FDCTO: ${fecha_de_descuento} - FPAGO: ${fecha_de_pago} = DIFF: ${diff}`);
    return diff;
}

export const calcularTasaEfectivaANDiasDeEfectiva = (rate_term,dias_transcurridos,rate_value) => {
    rate_value /= 100;
    return (Math.pow(1+rate_value,dias_transcurridos/rate_term)-1)*100;
}

//ToDo:
export const calcularTasaEfectivaANDiasDeNominal = (rate_term,capitalization_term,dias_transcurridos,rate_value) => {
    rate_value /= 100;
    let m = rate_term/capitalization_term;
    let n = dias_transcurridos/capitalization_term;
    let rate = Math.pow(1+(rate_value/m),n)-1;
    console.log("te%:",rate*100);
    return rate*100;
}

export const calcularTasaEfectivaANDias = (rate_term,dias_transcurridos,rate_value,capitalization_term) => {
    if (localStorage.getItem("rate_type") === "Tasa Efectiva"){
        return calcularTasaEfectivaANDiasDeEfectiva(rate_term,dias_transcurridos,rate_value);
    }else{
        return calcularTasaEfectivaANDiasDeNominal(rate_term,capitalization_term,dias_transcurridos,rate_value);
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

//localStorage.getItem(“rate_type”)
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