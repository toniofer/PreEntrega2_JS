
let salir = false;
let titulo = "ASISTENTE PARA ARMAR TU PC \n";
let terminar = "0 - SALIR \n\n";
let regresar = "0 - REGRESAR \n\n";
let respuesta = "";
let pc = [];

alert("Bienvenido al Asistente para armar tu PC");


menuPrincipal();

function menuPrincipal() {
    do {
        respuesta = prompt(titulo + "Seleccione marca de procesador: \n" + terminar + "1 - INTEL \n2 - AMD");
        if (respuesta == "0" || respuesta == null)
            salir = true;
        else if (verificaIngreso(respuesta)) {
            opcion = parseInt(respuesta);
            if (verificaCantOp(opcion, 2)) {
                let marca = "";
                if (respuesta == "1")
                    marca = "Intel";                   
                else if (respuesta == "2")
                    marca = "AMD";
                menuProcesadores(marca);
            }
        } else {
            alert("Debe ingresar una opción válida");
        }
    } while (!salir);
}


function menuProcesadores(marca) {
    let procPorMarca = getProcadores(marca);
    let listadoProcesadores = listarProcesadores(procPorMarca);
    do {        
        respuesta = prompt(titulo + "Procesadores " + marca + "\nSelecciones modelo: \n\n" + regresar + listadoProcesadores);        
        if (respuesta == "0" || respuesta == null){
            pc.pop();
            menuPrincipal();
        }            
        else if (verificaIngreso(respuesta)) {      // verifica que la entrada no sea vacía y que sea numérica
            opcion = parseInt(respuesta);                       
            if (verificaCantOp(opcion, procPorMarca.length)){        // verifica que la opción sea válida (un número en el rango dado como opciones)           
                let procSelec = getProcesador(procPorMarca[opcion - 1].id);
                pc.push(procSelec);
                menuPlacas(procSelec);
            } else
                alert("Debe ingresar una opción válida");
        } else
            alert("Debe ingresar una opción válida");
    } while (!salir);
}

function menuPlacas(procSelec) {
    let placasCompatibles = getPlacas(procSelec);               // en este array auxiliar se cargan las placas compatibles a ese procesador
    let listadoPlacas = listarPlacas(placasCompatibles);
    let presupuesto = "PRESUPUESTO ACTUAL = U$S " + calcularPresupuesto();
    do {        
        respuesta = prompt(titulo + "\n" + presupuesto +      
            "\nListado de placas compatibles con el procesador " + procSelec.marca + " " + procSelec.modelo + "\n\n" + regresar + listadoPlacas);
        if (respuesta == "0" || respuesta == null)            
            menuProcesadores(pc[0].marca);
        else if (verificaIngreso(respuesta)) {
            let id = parseInt(respuesta);
            if (verificaCantOp(id, placasCompatibles.length)) {         //validar opción ingresada                
                let placaSelec = placasCompatibles[id - 1];
                pc.push(placaSelec);                                         
                menuRAM(placaSelec);
            } else
                alert("Debe ingresar una opción válida");
        } else
            alert("Debe ingresar una opción válida");
    } while (!salir);
}


function menuRAM(placaSelec){    
    let memoriasCompatibles = getMemorias(placaSelec);          
    let listadoMemorias = listarMemorias(memoriasCompatibles);
    let presupuesto = "PRESUPUESTO ACTUAL = U$S " + calcularPresupuesto();      
    do {
        respuesta = prompt(titulo + "\n" + presupuesto + "\nListado de memorias compatibles con la placa " + placaSelec.marca + " " + placaSelec.modelo + "\n\n" + regresar + listadoMemorias);
        if (respuesta == "0" || respuesta == null){
            pc.pop();          
            menuPlacas(pc[0]);   
        }    
        else if (verificaIngreso(respuesta)) {
            let id = parseInt(respuesta);
            if (verificaCantOp(id, memoriasCompatibles.length)) {         //validar opción ingresada                
                let memoriaSelec = memoriasCompatibles[id - 1];
                pc.push(memoriaSelec);                
                menuAlmacenamiento()
            } else
                alert("Debe ingresar una opción válida");
        } else
            alert("Debe ingresar una opción válida");
    } while (!salir);    
}

function menuAlmacenamiento(){
    let listadoAlmacenamientos = listarAlmacenamientos();
    let presupuesto = "PRESUPUESTO ACTUAL = U$S " + calcularPresupuesto(); 
    do {
        respuesta = prompt(titulo + "\n" + presupuesto + "\nListado de almacenamientos \n\n" + regresar + listadoAlmacenamientos);
        if (respuesta == "0" || respuesta == null){
            pc.pop();          
            menuRAM(pc[1]);   
        }    
        else if (verificaIngreso(respuesta)) {
            let id = parseInt(respuesta);
            if (verificaCantOp(id, almacenamientos.length)) {         //validar opción ingresada                
                let almacenamientoSelec = almacenamientos[id - 1];
                pc.push(almacenamientoSelec);                
                menuFuente()
            } else
                alert("Debe ingresar una opción válida");
        } else
            alert("Debe ingresar una opción válida");
    } while (!salir);
}


function menuFuente(){
    let listadoFuentes = listarFuentes();
    let presupuesto = "PRESUPUESTO ACTUAL = U$S " + calcularPresupuesto(); 
    do {
        respuesta = prompt(titulo + "\n" + presupuesto + "\nListado de fuentes \n\n" + regresar + listadoFuentes);
        if (respuesta == "0" || respuesta == null){
            pc.pop();          
            menuAlmacenamiento();   
        }    
        else if (verificaIngreso(respuesta)) {
            let id = parseInt(respuesta);
            if (verificaCantOp(id, fuentes.length)) {         //validar opción ingresada                
                let fuenteSelec = fuentes[id - 1];
                pc.push(fuenteSelec);                
                menuGabinete();
            } else
                alert("Debe ingresar una opción válida");
        } else
            alert("Debe ingresar una opción válida");
    } while (!salir);
}


function menuGabinete(){
    let listadoGabinetes = listarGabinetes();
    let presupuesto = "PRESUPUESTO ACTUAL = U$S " + calcularPresupuesto(); 
    do {
        respuesta = prompt(titulo  + "\n" + presupuesto + "\nListado de gabinetes \n\n" + regresar + listadoGabinetes);
        if (respuesta == "0" || respuesta == null){
            pc.pop();          
            menuFuente();   
        }    
        else if (verificaIngreso(respuesta)) {
            let id = parseInt(respuesta);
            if (verificaCantOp(id, gabinetes.length)) {         //validar opción ingresada                
                let gabineteSelec = gabinetes[id - 1];
                pc.push(gabineteSelec);                
                confirmarPresupuesto()
            } else
                alert("Debe ingresar una opción válida");
        } else
            alert("Debe ingresar una opción válida");
    } while (!salir);
}


function confirmarPresupuesto(){
    let presupuesto = "PRESUPUESTO ACTUAL = U$S " + calcularPresupuesto();
    let pcFinal = armarPC();
    do {
        respuesta = prompt(titulo +"\n" + presupuesto + "\n\n" + pcFinal + regresar + "1 - Realizar presupuesto nuevo \n2 - Salir \n\n");
        if (respuesta == "0" || respuesta == null){
            pc.pop();          
            menuGabinete();   
        }    
        else if (verificaIngreso(respuesta)) {
            if (respuesta == "1")
                menuPrincipal();
            else if (respuesta == "2")
                salir = true;
            else
                alert("Debe ingresar una opción válida");
        } else
            alert("Debe ingresar una opción válida");
    } while (!salir);
}


function armarPC(){
    let resp = "";
    resp += "Procesador:  " + pc[0].marca + "  " + pc[0].modelo + " - U$S " + pc[0].precio + "\n";
    resp += "Placa:  " + pc[1].marca + "  " + pc[1].modelo + " - U$S " + pc[1].precio + "\n";
    resp += "RAM:  " + pc[2].marca + "  " + pc[2].modelo + " - " + pc[2].capacidad + " - U$S " + pc[2].precio + "\n";
    resp += "Disco:  " + pc[3].marca + "  " + pc[3].modelo + " - " + pc[3].capacidad + " - U$S " + pc[3].precio + "\n";
    resp += "Fuente:  " + pc[4].marca + "  " + pc[4].modelo + " - " + pc[4].potencia + " - U$S " + pc[4].precio + "\n";
    resp += "Gabinete:  " + pc[5].marca + "  " + pc[5].modelo + " - U$S " + pc[5].precio + "\n\n";
    return resp;
}

function getPlacas(procSelec) {
    let placasComp = [];
    for (const p of placas) {
        if (p.socketProc == procSelec.socketProc)
            for (let i = 0; i < p.generacionProc.length; i++)
                if (p.generacionProc[i] == procSelec.generacion)
                    placasComp.push(p);
    }
    return placasComp;
}

function getProcadores(marca){
    let procPorMarca = [];
    for (const p of procesadores){
        if (p.marca == marca)
            procPorMarca.push(p);
    }
    return procPorMarca;
}

function getMemorias(placaSelec){
    let memoriasCompatibles = [];
    for (const m of rams){
        if (m.socketRAM == placaSelec.RAM)
            memoriasCompatibles.push(m);
    }
    return memoriasCompatibles;
}


// En el listado se incluye un índice que no es el id de la placa para luego poder ser usado como opción válida para elegir

function listarPlacas(placasComp) {
    let resp = "";
    let ind = 1;
    for (const p of placasComp) {
        resp += ind + " - " + p.marca + " - " + p.modelo + " - " + p.socketProc + " - " + p.RAM + " - U$S " + p.precio + "\n";       
        ind++;
    }
    return resp;
}

function listarProcesadores(procComp) {
    let resp = "";
    let ind = 1;
    for (const p of procComp) {
        resp += ind + " - " + p.modelo + " - " + p.socketProc + " - U$S " + p.precio + "\n";
        ind++;
    }
    return resp;
}

function listarMemorias(memoriasCompatibles){
    let resp = "";
    let ind = 1;
    for (const m of memoriasCompatibles) {
        resp += ind + " - " + m.marca + " - " + m.modelo + " - " + m.socketRAM + " - " + m.capacidad + " - U$S " + m.precio + "\n";
        ind++;
    }
    return resp; 
}

function listarAlmacenamientos(){
    let resp = "";
    let ind = 1;
    for (const a of almacenamientos) {
        resp += ind + " - " + a.marca + " - " + a.modelo + " - " + a.tipo + " - " + a.capacidad + " - U$S " + a.precio + "\n";
        ind++;
    }
    return resp; 
}

function listarFuentes(){
    let resp = "";
    let ind = 1;
    for (const f of fuentes){
        resp += ind + " - " + f.marca + " - " + f.modelo + " - " + f.potencia + " - U$S " + f.precio + "\n";
        ind++;
    }
    return resp;
}


function listarGabinetes(){
    let resp = "";
    let ind = 1;
    for (const g of gabinetes){
        resp += ind + " - " + g.marca + " - " + g.modelo + " - " + " - U$S " + g.precio + "\n";
        ind++;
    }
    return resp;
}

function verificaIngreso(entrada) {             // verifica que la entrada no sea vacía y que sea numérica
    if (entrada != "")
        if (!isNaN(entrada))
            return true;
    return false;
}

function verificaCantOp(opcion, cantOp) {
    return opcion > 0 && opcion <= cantOp;
}

function listarProcIntel() {
    let resp = "";
    for (const p of procesadores) {
        if (p.marca == "Intel")
            resp += p.id + " - " + p.modelo + " - " + p.socketProc + " - U$S " + p.precio + "\n";
    }
    return resp;
}

function listarProcAMD() {
    let resp = "";
    let ind = 1;
    for (const p of procesadores) {
        if (p.marca == "AMD")
            resp += p.id + " - " + p.modelo + " - " + p.socketProc + " - U$S " + p.precio + "\n";
    }
    return resp;
}

function opValida(opcion, marca) {          // verifica que la opción sea válida (existe ese id de procesador con esa marca)
    let existe = false;
    let ind = 0;
    while (!existe && ind < procesadores.length) {
        if (procesadores[ind].id == opcion && procesadores[ind].marca == marca)
            existe = true;
        else ind++;
    }
    return existe;
}


function getProcesador(idProc) {
    let procSelec = procesadores.find(p => p.id == idProc);
    return procSelec;
}

function calcularPresupuesto(){
    let total = 0;
    for (const e of pc) {
        total += e.precio;
    }
    return total;    
}