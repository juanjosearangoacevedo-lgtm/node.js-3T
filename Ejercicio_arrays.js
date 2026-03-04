// <!-- Ejercicio: Procesar pedidos (array de objetos) con validaciones y cálculos

// Tienes este arreglo de pedidos:

// const pedidos = [
//   { id: 1, cliente: "Ana", items: [{ sku: "A1", precio: 12000, cantidad: 2 }, { sku: "B1", precio: 8000, cantidad: 1 }], cupon: "DESC10" },
//   { id: 2, cliente: "Luis", items: [{ sku: "A1", precio: 12000, cantidad: 1 }, { sku: "C1", precio: 20000, cantidad: 3 }], cupon: null },
//   { id: 3, cliente: "Sofi", items: [{ sku: "D1", precio: 5000, cantidad: 0 }], cupon: "DESC20" }, // inválido (cantidad 0)
//   { id: 4, cliente: "Juan", items: [], cupon: "DESC10" }, // inválido (sin items)
// ];

// Y este objeto de cupones:

// const cupones = {
//   DESC10: 0.10,
//   DESC20: 0.20,
// };
// Tu objetivo

// Implementa 3 funciones que devuelvan Promesas y luego arma un pipeline con .then():

// validarPedido(pedido)

// Rechaza (reject) si:

// items está vacío

// algún item.cantidad <= 0

// algún item.precio <= 0

// Si pasa, resuelve (resolve) el pedido.

// calcularSubtotal(pedido)

// Resuelve el pedido con un nuevo campo:

// subtotal = suma(precio * cantidad) de todos los items

// aplicarDescuento(pedido, cupones)

// Si el pedido tiene cupon y existe en cupones, calcula:

// descuento = subtotal * porcentaje

// Si no hay cupón válido, descuento = 0

// Agrega:

// total = subtotal - descuento

// Resuelve el pedido final.

// Reglas extra (para que tenga “múltiples operaciones”)

// Al final debes obtener un reporte con:

// pedidosOK: array de pedidos válidos procesados (con subtotal, descuento, total)

// pedidosError: array con { id, cliente, error } de los pedidos inválidos

// resumenClientes: objeto donde la llave es el cliente y el valor es el total gastado

// ejemplo: { Ana: 28800, Luis: 72000 }

// totalGeneral: suma de todos los totales válidos -->


const pedidos = [
  { id: 1, cliente: "Ana", items: [{ sku: "A1", precio: 12000, cantidad: 2 }, { sku: "B1", precio: 8000, cantidad: 1 }], cupon: "DESC10" },
  { id: 2, cliente: "Luis", items: [{ sku: "A1", precio: 12000, cantidad: 1 }, { sku: "C1", precio: 20000, cantidad: 3 }], cupon: null },
  { id: 3, cliente: "Sofi", items: [{ sku: "D1", precio: 5000, cantidad: 0 }], cupon: "DESC20" },
  { id: 4, cliente: "Juan", items: [], cupon: "DESC10" },
];

const cupones = {
  DESC10: 0.10,
  DESC20: 0.20,
};

function validarPedido(pedido) {
  return new Promise((resolve, reject) => {
    if (!pedido.items || pedido.items.length === 0) {
      reject("Pedido sin items");
      return;
    }

    const itemInvalido = pedido.items.some(
      item => item.cantidad <= 0 || item.precio <= 0
    );

    if (itemInvalido) {
      reject("Item con cantidad o precio inválido");
      return;
    }

    resolve(pedido);
  });
}


function calcularSubtotal(pedido) {
  return new Promise((resolve) => {
    const subtotal = pedido.items.reduce(
      (acc, item) => acc + item.precio * item.cantidad,
      0
    );

    resolve({ ...pedido, subtotal });
  });
}


function aplicarDescuento(pedido, cupones) {
  return new Promise((resolve) => {
    const porcentaje = cupones[pedido.cupon] || 0;
    const descuento = pedido.subtotal * porcentaje;
    const total = pedido.subtotal - descuento;

    resolve({ ...pedido, descuento, total });
  });
}
