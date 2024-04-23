async function listarArticulos() {
  const conexion = await fetch("http://localhost:3001/articulos");
  const conexionConvertida = await conexion.json();
  return conexionConvertida;
}

async function enviarArticulo(nombre,precio,imagen) {
    const conexion = await fetch("http://localhost:3001/articulos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: nombre,
            precio: precio,
            imagen: imagen
        })
    });
    const conexionConvertida = conexion.json();
    if(!conexion.ok){
        throw new Error("Ha ocurrido un error al enviar el articulo");
    }
    return conexionConvertida;
}

async function eliminarArticulo(id) {
    try {
      const response = await fetch(`http://localhost:3001/articulos/${id}`, {
        method: "DELETE"
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Error al eliminar el artículo");
      }
      const data = await response.json();
      return data;
    } catch (error) {
     console.error(error);
    }
  }

export const conexionAPI = {
  listarArticulos, enviarArticulo, eliminarArticulo
};
