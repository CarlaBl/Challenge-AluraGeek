function crearCards(datos) {
    return `
              <div class="card">
            <img src="${datos.img}" />
            <div class="card-container--info">
              <p>${datos.name}</p>
              <div class="card-container--value">
                <p>$ ${datos.price}</p>
                <i class="material-icons delete" onclick="eliminarProducto('${datos.id}')">delete</i>
              </div>
            </div>
          </div>
    `
}
function traerProductos() {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
      fetch("http://localhost:3000/products", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            let products = document.getElementById('products')
            products.innerHTML = '';
            if (Object.keys(result).length === 0) {
                products.innerHTML += '<p>NO SE HAN AGREGADO PRODUCTOS</p>';
            }else{
                for (const datos in result) {
                    if (result.hasOwnProperty(datos)) {
                        products.innerHTML += crearCards(result[datos])
                    }
                }
            }
        })
        .catch((error) => console.error(error));
}
async function crearProductos() {
    const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: document.getElementById('name').value,
          price: document.getElementById('price').value,
          img: document.getElementById('img').value
        })
      })
    const data = await response.json();
    borrarFormulario();
    traerProductos();
}
function borrarFormulario() {
    document.getElementById('name').value = '';
    document.getElementById('price').value = '';
    document.getElementById('img').value = '';
}
function eliminarProducto(id){

    fetch(`http://localhost:3000/products/${id}`, {
        method: 'DELETE'
      })
      .then(response => response.json())
      .then((data) => {traerProductos();});
}

traerProductos()
document.getElementById('btnSend').addEventListener('click', crearProductos);
