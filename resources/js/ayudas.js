   // resources/js/ayuda.js

document.addEventListener("DOMContentLoaded", () => {
    console.log("JS de la página de ayuda cargado");
    // Aquí tu código original


   
   
   const sections = {
      inicio: `<h2>Inicio</h2><p>MuliPagos es una aplicación diseñada para llevar el control de ingresos y gastos de una manera práctica y fácil su uso está orientado a un grupo de personas o sociedad de amigos o a un conjunto de propiedad horizontal. Esto no es un sistema contable.</p>
<p>Para su uso de debe definir un conjunto de socios o de propietarios y de terceros, estos se pueden agrupar bajo un criterio. Por ejemplo, en mi empresa los empleados nos unimos para crear un fondo común para un paseo de fin de año, cada empleado debe aportar una cuota mensual hasta completar el monto que cada quien debe aportar para el viaje. </p>
<p>En un conjunto residencial o propiedad horizontal se puede usar para generar las cuentas de cobro y llevar el control de pago de las expensas comunes, tener el control de la cartera, así como de los gastos efectuados.
</p>`,
      menu: `<h2>Menú</h2><p>Presenta el nombre de la asociación y a la derecha de éste el nombre del usuario actual, entre paréntesis su rol y un acceso v para salir de este usuario e ingresar con otro .</p>
      <p>Cada opción del menú: Grupos, Terceros, Conceptos,Cuentas Cobro,Ingreso Gasto y Anticipos, Cuenta con botones que van a permitir crear un registro referente a esrta opción, regresar al menú principal, buscar en sus registros y en algnos casos generar un listado de los registros de esta opción </p>
      <p></p>
      <p></p>`,
      registro: `<h2>Registro</h2><p>Aquí se documenta cómo registrar nuevos usuarios o entidades.</p>`,
      reportes: `<h2>Reportes</h2><p>Aprende a generar y exportar reportes desde el sistema.</p>`,
      configuracion: `<h2>Configuración</h2><p>Guía para ajustar parámetros y preferencias.</p>`
    };

    function showContent(section) {
      document.getElementById('content').innerHTML = sections[section];
    }

  function toggleMenu(element) {
    // Cierra otros submenús si lo deseas
    document.querySelectorAll('nav ul li').forEach(li => {
      if (li !== element) li.classList.remove('active');
    });

    // Alterna el submenú actual
    element.classList.toggle('active');
  }

  });