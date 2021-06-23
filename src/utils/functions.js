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

export const calcularTasaEfectivaANDiasDeEfectiva = (dias_tasa,dias_transcurridos,rate_value) => {

    rate_value /= 100;
    return (Math.pow(1+rate_value,dias_transcurridos/dias_tasa)-1)*100;
}

//ToDo:
export const calcularTasaEfectivaANDiasDeNominal = (dias_tasa,dias_capitalizacion,dias_transcurridos,valor_de_tasa) => {
    var m = dias_tasa/dias_capitalizacion;
    var n = dias_transcurridos/dias_capitalizacion;
    return Math.pow(1+(valor_de_tasa/(m*100)),n)-1;
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

//ToDo:
export const calcularSumaCostosIniciales = (costos_iniciales) => {
    var suma_costos_iniciales = 0;
    costos_iniciales.forEach((value) => {
        suma_costos_iniciales += value["cost"];
    });
    return suma_costos_iniciales;
}

export const calcularSumaCostosFinales = (costos_finales) => {
    var suma_costos_finales = 0;
    costos_finales.forEach((value) => {
        suma_costos_finales += value["cost"];
    });
    return suma_costos_finales;
}

export const calcularValorRecibido = (valor_neto,suma_costos_iniciales,retention) =>{
    return valor_neto-suma_costos_iniciales-retention;
}

export const calcularValorEntregado = (valor_nominal,suma_costos_finales,retention) =>{
    return valor_nominal+suma_costos_finales-retention;
}

export const calcularTCEA = (valor_entregado,valor_recibido,dias_transcurridos,dias_por_anio) =>{
    return Math.pow(valor_entregado/valor_recibido,dias_por_anio/dias_transcurridos)-1;
}