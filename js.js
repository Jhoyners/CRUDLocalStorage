//guardar_LocalStorage()

function obtener_LocalStorage() {

    if ( localStorage.getItem('nombre') ) {
        // Se sabe que existe el nombre en el localStorage
    let nombre = localStorage.getItem('nombre');
    let persona = JSON.parse( localStorage.getItem('persona'));
    console.log(nombre);
    console.log(persona);

    } else {
        //No hay entradas en el localStorage
    }
}

function guardar_LocalStorage(){

    let persona = {
        nombre: 'Fernando',
        edad: 30,
        correo: 'fernando@gmail.com',
        cords: {
            lat: 10,
            lng: -10
        }
    };

    let nombre = 'Juan ';

    localStorage.setItem('nombre', nombre );
    localStorage,setItem('persona', JSON.stringify(persona) );

}