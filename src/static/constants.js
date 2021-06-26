export const INFO = {
    emission_date: {
        title: `<strong>Fecha de Emisión</strong>`,
        message: `Fecha de Emisión es aquella fecha, en la que se origina el Recibo por
        honorarios Profesionales, y que para efectos del cálculo sólo tiene carácter histórico
        pues no afecta al resultado de la operación.

        Para ingresar la fecha de emisión, proceda como sigue:
        
        1. Haga clic sobre el campo y aparecerá un calendario.
        2. Seleccione el mes y el año del giro del Recibo por Honorarios.
        3. Haga clic sobre el día en que se genera el Recibo por Honorarios.
        
        Por ejemplo, si la fecha del Recibo por Honorarios es el 10 de marzo de 2011,
        entonces deberá elegir el mes de marzo, el año 2011 y hacer clic sobre el día
        10 en el calendario.`,
    },
    payment_date: {
        title: `<strong>Fecha de Pago</strong>`,
        message: `Fecha de Pago es aquella fecha en la que vencerá el compromiso
        originado por el Recibo y el cliente procederá a su cancelación.

        Para ingresar la fecha de pago, proceda como sigue:
        
        1. Haga clic sobre el campo y aparecerá un calendario.
        2. Seleccione el mes y el año de la fecha de pago de la factura.
        3. Haga clic sobre el día en que se producirá el pago.
        
        Por ejemplo, si la fecha de pago de la factura es el 10 de junio de 2011,
        entonces deberá elegir el mes de junio, el año 2011 y hacer clic sobre
        el día 10 en el calendario.`,
    },
    nominal_value: {
        title: `<strong>Total a Recibir</strong>`,
        message: `Total Recibo, es el valor por el cual se ha girado el Recibo por
        Honorarios y cuyo compromiso vence en la fecha de pago, y que usualmente
        debe imprimirse/escribirse sobre el mismo. Este deberá estar expresado
        en unidades monetarias (u.m.)

        En este campo deberá ingresar un número sin formatos, es decir, sin comas,
        espacios ni símbolos monetarios y que a lo más tenga dos (2) decimales.
        
        Por ejemplo: Si el Total Recibo es de US$ 5,250.50, entonces deberá
        digitar: 5250.50`,
    },
    retention: {
        title: `<strong>Retención</strong>`,
        message: `Retención, es un valor expresado en unidades monetarias (u.m.)
        que es retenido por el acreedor al momento del descuento, y que usualmente
        sirve como garantía colateral de la operación. El acreedor devolverá el
        monto de dinero retenido al deudor, en el momento que este honre su palabra
        y cancele el documento.

        En este campo deberá ingresar un número sin formatos, es decir, sin comas,
        espacios ni símbolos monetarios y que a lo más tenga dos (2) decimales.
        
        Por ejemplo: Si al momento de descontar una Letra, se retiene US$ 1,125.85,
        entonces deberá digitar: 1125.85`,
    },
}

export const INITIAL_COSTS = {
    reason: {
        title: `<strong>Costos/Gastos Iniciales</strong>`,
        message: `Estos corresponden a los costes o gastos 
        que deben pagarse al acreedor para realizar la operación, y que se descontarán
        del Valor Neto (diferencia entre el Valor Nominal y Descuento); estos montos
        afectarán al cálculo de la Tasa de Coste Efectivo Anual (T.C.E.A.).
        De acuerdo a las normas legales, será obligatorio ingresar los costes o gastos 
        que pasan por la pasarela de pago del Banco (acreedor); sin embargo, sugerimos 
        ingresar todos los gastos que usted realizará como consecuencia del descuento,
        de este modo la T.C.E.A. que resulte de dicho cálculo, será la vista desde su
        punto de vista y no la del acreedor.
        Por ejemplo, si debe pagar US$ 100.00 por Comisión de desembolso, entonces deberá seleccionar la opción:
        Gastos`,
    },
    cost: {
        title: `<strong>Valor de costo</strong>`,
        message: `Esta información constituye un complemento del campo Motivo, y corresponde
        a la forma de enfrentar el pago de los costes o gastos que se producen para realizar
        la operación, que se encuentran en función del Valor Nominal y afectan al Valor Neto.
        Por ejemplo, si como condición del descuento debe pagar un Seguro equivalente al 0.05%
        del Valor Nominal, entonces deberá seleccionar la opción:
        En Porcentaje
        Y digitar en el campo que se encuentra a su derecha:
        0.05
        Para luego presionar el botón Agregar para agregarlo a la lista.`,
    },
}

export const FINAL_COSTS = {
    reason: {
        title: `<strong>Costes/Gastos al Final</strong>`,
        message: `Estos corresponden a los costes o gastos que deben pagarse al acreedor al finalizar
        la operación, y que se agregarán al Valor Nominal. Estos montos afectarán al cálculo de la
        Tasa de Coste Efectivo Anual (T.C.E.A.).
        De acuerdo a las normas legales, será obligatorio ingresar los costes o gastos que pasan por
        la pasarela de pago del Banco (acreedor); sin embargo, sugerimos ingresar todos los gastos
        que usted realizará como consecuencia del descuento, de este modo la T.C.E.A. que resulte
        de dicho cálculo, será la vista desde su punto de vista y no la del acreedor.
        
        Por ejemplo, si debe pagar US$ 5.00 por Gastos de Administración a la finalización de la
        operación, entonces deberá seleccionar la opción: Gastos`,
    },
    cost: {
        title: `<strong>Costes/Gastos al Final</strong>`,
        message: `Esta información constituye un complemento del campo Motivo, y corresponde
        a la forma de enfrentar el pago de los costes o gastos que se producen para realizar
        la operación, que se encuentran en función del Valor Nominal y afectan al Valor Neto.
        Por ejemplo, si como condición del descuento debe pagar un Seguro equivalente al 0.05%
        del Valor Nominal, entonces deberá seleccionar la opción:
        En Porcentaje
        Y digitar en el campo que se encuentra a su derecha:
        0.05
        Para luego presionar el botón Agregar para agregarlo a la lista.`,
    },
}

export const RATE_TYPE = {
    rate_type: {
        title: `<strong>Tipo de Tasa</strong>`,
        message: `Se selecciona el tipo de tasa con la que se trabajará entre
        Tasa Nominal o Tasa Efectiva.`,
    },
}

export const NOMINAL_RATE_TERM = {
    year_type: {
        title: `<strong>Días por Año</strong>`,
        message: `Aquí deberá ser muy cauteloso y elegir el número de
        días con los que la Legislación del Estado donde se descuento
        el instrumento, idealiza al año, pudiendo ser un año de 360
        o de 365 días. En algunos estados esta característica se deja
        al acuerdo de las partes y se debe especificar en el contrato.

        Por ejemplo, si actualmente usted descuenta una Letra en un
        Banco Peruano, deberá obligatoriamente utilizar un año de 360 días,
        puesto que así lo establece la legislación vigente, entonces
        deberá seleccionar la opción: 360 días`,
    }, //junto con year_days
    rate_term: {
        title: `<strong>Plazo de Tasa</strong>`,
        message: `El plazo o periodo de la tasa nominal representa al
        tiempo en el que se expresa el plazo de la tasa de interés dada
        como dato.

        Por ejemplo, si le informan que se utilizará en su contrato una
        Tasa Nominal Anual (T.N.A.), entonces deberá seleccionar la
        opción: Anual
        
        Por el contrario, si le informan que se utilizará en su contrato
        una Tasa Nominal a 75 días (T.N.75d.), se tratará de un plazo
        especial, entonces deberá seleccionar la opción: Especial
        
        Y digitar en el campo de lado derecho: 75`,
    }, //junto con rate_days
    rate_value: {
        title: `<strong>Tasa Nominal</strong>`,
        message: `Es la tasa de interés nominal con la que se compensará
        al acreedor. Será un número mayor a CERO (0) expresado
        necesariamente como valor porcentual, y que permite el uso de decimales.

        Por ejemplo, si le informan que se utilizará en su contrato una
        Tasa Nominal Anual (T.N.A.) de 10.25%, entonces deberá digitar: 10.25`,
    },
    capitalization_term: {
        title: `<strong>Período de Capitalización</strong>`,
        message: `Número de períodos de capitalización que existen en el tiempo
        que está expresada la Tasa de Interés Nominal (TN).
        Matemáticamente se calcula como el número de días en el que se expresa
        la tasa de Interés Compuesta o Nominal (TN) entre el número de días
        en que se expresa el período de capitalización`,
    },
    capitalization_days: {
        title: `<strong>Días del Período</strong>`,
        message: `Número de períodos de capitalización que existen en el tiempo
        transcurrido (t) de la inversión.
        Matemáticamente se calucla como el tiempo transcurrido (t) expresado
        en días entre el número de días en que se expresa el período de capitalización`,
    },
    discount_date: {
        title: `<strong>Fecha de Descuento</strong>`,
        message: `Fecha de Descuento es aquella fecha en la que se
        descontará el instrumento financiero. En ese momento el acreedor
        calculará los intereses que se producirán en el tiempo comprendido
        entre la fecha de descuento y la fecha de vencimiento y procederá
        a cobrar por adelantado dichos intereses

        Para ingresar la fecha de descuento, proceda como sigue:
        
        1. Haga clic sobre el campo y aparecerá un calendario.
        
        2. Seleccione el mes y el año del descuento.
        
        3. Haga clic sobre el día en que se realizará el descuento.
        
        Por ejemplo, si la fecha es el 10 de abril de 2011, entonces deberá
        elegir el mes de abril, el año 2011 y hacer clic sobre el día 10
        en el calendario.`,
    },
}

export const EFFECTIVE_RATE_TERM = {
    year_type: {
        title: `<strong>Días por Año</strong>`,
        message: `Aquí deberá ser muy cauteloso y elegir el número de
        días con los que la Legislación del Estado donde se descuento
        el instrumento, idealiza al año, pudiendo ser un año de 360
        o de 365 días. En algunos estados esta característica se deja
        al acuerdo de las partes y se debe especificar en el contrato.

        Por ejemplo, si actualmente usted descuenta una Letra en un
        Banco Peruano, deberá obligatoriamente utilizar un año de 360 días,
        puesto que así lo establece la legislación vigente, entonces
        deberá seleccionar la opción: 360 días`,
    },
    rate_term: {
        title: `<strong>Plazo de Tasa</strong>`,
        message: `El plazo o periodo de la tasa efectiva representa al
        tiempo en el que se expresa el plazo de la tasa de interés dada
        como dato.

        Por ejemplo, si le informan que se utilizará en su contrato una
        Tasa Efectiva Anual (T.E.A.), entonces deberá seleccionar la
        opción: Anual
        
        Por el contrario, si le informan que se utilizará en su contrato
        una Tasa Efectiva a 75 días (T.E.75d.), se tratará de un plazo
        especial, entonces deberá seleccionar la opción: Especial
        
        Y digitar en el campo de lado derecho: 75`,
    },
    rate_value: {
        title: `<strong>Tasa Efectiva</strong>`,
        message: `Es la tasa de interés efectiva con la que se compensará
        al acreedor. Será un número mayor a CERO (0) expresado
        necesariamente como valor porcentual, y que permite el uso de decimales.

        Por ejemplo, si le informan que se utilizará en su contrato una
        Tasa Efectiva Anual (T.E.A.) de 10.25%, entonces deberá digitar: 10.25`,
    },
    discount_date: {
        title: `<strong>Fecha de Descuento</strong>`,
        message: `Fecha de Descuento es aquella fecha en la que se
        descontará el instrumento financiero. En ese momento el acreedor
        calculará los intereses que se producirán en el tiempo comprendido
        entre la fecha de descuento y la fecha de vencimiento y procederá
        a cobrar por adelantado dichos intereses

        Para ingresar la fecha de descuento, proceda como sigue:
        
        1. Haga clic sobre el campo y aparecerá un calendario.
        
        2. Seleccione el mes y el año del descuento.
        
        3. Haga clic sobre el día en que se realizará el descuento.
        
        Por ejemplo, si la fecha es el 10 de abril de 2011, entonces deberá
        elegir el mes de abril, el año 2011 y hacer clic sobre el día 10
        en el calendario.`,
    },
}