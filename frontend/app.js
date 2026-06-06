const API_BASE = "/api/productos";

// Renderizar la tabla con las columnas correctas de tu diseño
async function obtenerProductos() {
    try {
        const response = await fetch(API_BASE);
        const productos = await response.json();
        const lista = document.getElementById("lista-productos");
        if (!lista) return;
        
        lista.innerHTML = "";
        productos.forEach(prod => {
            lista.innerHTML += `
                <tr>
                    <td>${prod.id}</td>
                    <td>${prod.nombre}</td>
                    <td>${prod.descripcion || ''}</td>
                    <td>$${prod.precio}</td>
                    <td>${prod.stock}</td>
                    <td>
                        <button class="btn-edit" onclick="prepararEditar(${prod.id}, '${prod.nombre}', '${prod.descripcion || ''}', ${prod.precio}, ${prod.stock})">Editar</button>
                        <button class="btn-delete" onclick="eliminarProducto(${prod.id})">Eliminar</button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error("Error al obtener productos:", error);
    }
}

// Escuchar el envío del formulario cubriendo todos los campos
document.getElementById("form-producto")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("producto-id")?.value;
    const nombre = document.getElementById("nombre").value;
    const descripcion = document.getElementById("descripcion").value;
    const precio = document.getElementById("precio").value;
    const stock = document.getElementById("stock").value;

    const datos = { nombre, descripcion, precio, stock };

    try {
        if (id) {
            await fetch(`${API_BASE}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos)
            });
        } else {
            await fetch(API_BASE, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos)
            });
        }
        document.getElementById("form-producto").reset();
        if(document.getElementById("producto-id")) document.getElementById("producto-id").value = "";
        obtenerProductos();
    } catch (error) {
        console.error("Error al guardar producto:", error);
    }
});

function prepararEditar(id, nombre, descripcion, precio, stock) {
    const inputId = document.getElementById("producto-id");
    if (inputId) inputId.value = id;
    document.getElementById("nombre").value = nombre;
    document.getElementById("descripcion").value = descripcion;
    document.getElementById("precio").value = precio;
    document.getElementById("stock").value = stock;
}

async function eliminarProducto(id) {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
        try {
            await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
            obtenerProductos();
        } catch (error) {
            console.error("Error al eliminar producto:", error);
        }
    }
}

document.addEventListener("DOMContentLoaded", obtenerProductos);