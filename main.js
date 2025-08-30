let carrito = [];

function agregarAlCarrito(nombre, precio) {
    const producto = carrito.find(item => item.nombre === nombre);
    if (producto) {
        producto.cantidad++;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }
    actualizarCarrito();
}

function quitarDelCarrito(nombre) {
    carrito = carrito.filter(item => item.nombre !== nombre);
    actualizarCarrito();
}

function actualizarCarrito() {
    const lista = document.getElementById('lista-carrito');
    lista.innerHTML = '';
    let total = 0;

    carrito.forEach(item => {
        total += item.precio * item.cantidad;

        const li = document.createElement('li');
        li.textContent = `${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}`;

        const btnQuitar = document.createElement('button');
        btnQuitar.textContent = 'Quitar';
        btnQuitar.onclick = () => quitarDelCarrito(item.nombre);

        li.appendChild(btnQuitar);
        lista.appendChild(li);
    });

    document.getElementById('total').textContent = `Total: $${total}`;
}

function confirmarCompra() {
    if (carrito.length === 0) {
        alert('El carrito está vacío.');
        return;
    }

    let mensaje = "¡Hola! Me gustaría hacer el siguiente pedido:\n\n";

    carrito.forEach(item => {
        mensaje += `${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}\n`;
    });

    let total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    mensaje += `\nTotal: $${total}\n\nGracias por la atención.`;

    // Codificar el mensaje para usarlo en una URL
    mensaje = encodeURIComponent(mensaje);

    // Reemplazar [NúmeroDeTeléfono] con el número de teléfono de WhatsApp al que quieres redirigir
    const numeroTelefono = '5493516531341'; // Asegúrate de poner el número de WhatsApp correcto (con código de país).
    const urlWhatsApp = `https://wa.me/${numeroTelefono}?text=${mensaje}`;

    // Redirigir al usuario a WhatsApp
    window.open(urlWhatsApp, '_blank');
    
    // Limpiar el carrito después de la compra
    carrito = [];
    actualizarCarrito();
}
