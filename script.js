
/* =====================================
   FOLIO AUTOINCREMENTAL
===================================== */

window.onload = function(){

    let folio = localStorage.getItem('folioActual');

    if(!folio){

        folio = 1;
    }else{

        folio = parseInt(folio) + 1;
    }

    // GUARDAR NUEVO FOLIO
    localStorage.setItem(

        'folioActual',
        folio

    );

    // MOSTRAR FORMATO
    document.getElementById('folio').value =
        folio.toString().padStart(4,'0');

    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2,'0');
    const dia = String(hoy.getDate()).padStart(2,'0');
    document.getElementById('fecha').value = `${anio}-${mes}-${dia}`;

}



async function generarPDF() {

    const { jsPDF } = window.jspdf;

    /* =========================
       CREAR PDF
    ========================= */

    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    /* =========================
       IMAGEN FONDO
    ========================= */

    const fondo = new Image();
    fondo.src = "orden.png";

    fondo.onload = function () {

        pdf.addImage(
            fondo,
            'PNG',
            0,
            0,
            210,
            297,
            '',
            'FAST'
        );

        /* =========================
           OBTENER DATOS
        ========================= */

        const folio = document.getElementById('folio').value || '';
        const fechaInput = document.getElementById('fecha').value || ''; 
        let diaFecha = ''; 
        let mesFecha = ''; 
        let anioFecha = ''; 
        if(fechaInput){ 
        const partes = fechaInput.split('-'); 
        anioFecha = partes[0]; 
        mesFecha = partes[1];
        diaFecha = partes[2]; 
        }
        //const fecha = document.getElementById('fecha').value || '';
        const cliente = document.getElementById('cliente').value || '';
        const telefono = document.getElementById('telefono').value || '';
        const direccion = document.getElementById('direccion').value || '';
        const marca = document.getElementById('marca').value || '';
        const modelo = document.getElementById('modelo').value || '';
        const anio = document.getElementById('anio').value || '';
        const placas = document.getElementById('placas').value || '';
        const km = document.getElementById('km').value || '';
        const falla = document.getElementById('falla').value || '';
        const subtotal = document.getElementById('subtotal').value || '';
        const iva = document.getElementById('iva').value || '';
        const total = document.getElementById('total').value || '';
        const observaciones = document.getElementById('observaciones').value || '';
        const tipoServicio = document.getElementById('tipoServicio').value || '';
        const tipoDocumento = document.getElementById('tipoDocumento').value || '';


        /* =========================
           Tipo Documento
        ========================= */
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(25);
        pdf.text(tipoDocumento.toString(), 87, 15.72);
        

        /* =========================
           CONFIGURACION TEXTO
        ========================= */

        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(15);

    
        /* =========================
           DATOS GENERALES
        ========================= */
        pdf.setTextColor(255,0,0);
        pdf.text(folio.toString(), 108.10, 29.99);
        pdf.setTextColor(0, 0, 0);

       if (fechaInput) {

        pdf.text(diaFecha.toString(), 120.26, 42.32);
        pdf.text(mesFecha.toString(), 149.63, 42.32);
        pdf.text(anioFecha.toString(), 176.26, 42.32);

       }

        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(12);
        pdf.text(cliente.toString(), 26.54, 75.90);
        pdf.text(telefono.toString(), 153.54, 75.90);

        pdf.text(direccion.toString(), 29.46, 84.44);

        pdf.text(marca.toString(), 23.66, 92.40);
        pdf.text(modelo.toString(),95.57, 92.40);
        pdf.text(anio.toString(), 162.26, 92.40);

        pdf.text(placas.toString(), 24.21, 100.94);
        pdf.text(km.toString(), 119.10, 100.94);

        /* =========================
           FALLA REPORTADA
        ========================= */

        pdf.setFontSize(7);

        const fallaTexto = pdf.splitTextToSize(
            falla.toString(),
            170
        );

        pdf.text(fallaTexto, 11.96, 123.46);

        /* =========================
           TRABAJOS
        ========================= */

        let yTrabajos = 149.34;

        document.querySelectorAll('.trabajo').forEach((input, index) => {

            const descripcion = input.value || '';
            const precio = document.querySelectorAll('.precio')[index].value || '';
            const importe = document.querySelectorAll('.importe')[index].value || '';

            pdf.text(descripcion.toString(), 14, yTrabajos);
            pdf.text(precio.toString(), 147, yTrabajos);
            pdf.text(importe.toString(), 183, yTrabajos);

            yTrabajos += 6;
        });

        /* =========================
           REFACCIONES
        ========================= */

        let yRefacciones = 195.79;

        document.querySelectorAll('.refaccion').forEach((input, index) => {

            const descripcion = input.value || '';
            const precio = document.querySelectorAll('.refprecio')[index].value || '';
            const importe = document.querySelectorAll('.refimporte')[index].value || '';

            pdf.text(descripcion.toString(), 14, yRefacciones);
            pdf.text(precio.toString(), 147, yRefacciones);
            pdf.text(importe.toString(), 183, yRefacciones);

            yRefacciones += 6;
        });

        /* =========================
           TOTALES
        ========================= */

        pdf.setFontSize(10);

        pdf.text(subtotal.toString(), 182, 227.60);
        pdf.text(iva.toString(), 182, 234.60);

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(10);

        pdf.text(total.toString(), 182, 243.60);
        pdf.text("Ivan Salinas Morales".toString(), 152.93, 286.32);


        /* =========================
           OBSERVACIONES
        ========================= */

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(7);

        const obsTexto = pdf.splitTextToSize(
            observaciones.toString(),
            50
        );

        pdf.text(obsTexto, 10, 268);

        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(12);
        pdf.text(tipoServicio.toString(), 11.76, 237.21);

        /* =========================
           EXPORTAR PDF
        ========================= */

        pdf.save('orden_trabajo.pdf');
    };
}

 /* =====================================
        CALCULAR SUBTOTAL AUTOMATICO
        ===================================== */

        function calcularSubtotal(){

            let subtotal = 0;

            /* =========================
            SUMAR TRABAJOS
            ========================= */

            document.querySelectorAll('.importe').forEach((input)=>{

                const valor = parseFloat(input.value) || 0;

                subtotal += valor;

            });

            /* =========================
            SUMAR REFACCIONES
            ========================= */

            document.querySelectorAll('.refimporte').forEach((input)=>{

                const valor = parseFloat(input.value) || 0;

                subtotal += valor;

            });

            /* =========================
            MOSTRAR SUBTOTAL
            ========================= */

            document.getElementById('subtotal').value =

                subtotal.toFixed(2);

        }

        /* =====================================
        EVENTOS AUTOMATICOS
        ===================================== */

        document.querySelectorAll(

            '.importe, .refimporte'

        ).forEach((input)=>{

            input.addEventListener(

                'input',
                calcularSubtotal

            );

        });
       
        
        function calcularTotales(){

            let subtotal = 0;

            /* =========================
            TRABAJOS
            ========================= */

            document.querySelectorAll('.importe').forEach((input)=>{

                subtotal += parseFloat(input.value) || 0;

            });

            /* =========================
            REFACCIONES
            ========================= */

            document.querySelectorAll('.refimporte').forEach((input)=>{

                subtotal += parseFloat(input.value) || 0;

            });

            /* =========================
            IVA 16%
            ========================= */

            const iva = subtotal * 0.16;

            const total = subtotal + iva;

            /* =========================
            MOSTRAR
            ========================= */

            document.getElementById('subtotal').value =

                subtotal.toFixed(2);

            document.getElementById('iva').value =

                iva.toFixed(2);

            document.getElementById('total').value =

                total.toFixed(2);

        }

        /* =====================================
        EVENTOS
        ===================================== */

        document.querySelectorAll(

            '.importe, .refimporte'

        ).forEach((input)=>{

            input.addEventListener(

                'input',
                calcularTotales

            );

        });
