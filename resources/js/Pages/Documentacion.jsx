import { React } from 'react';
import AyudasLayout from '@/Layouts/AyudasLayout';
import { Link } from '@inertiajs/react';
import { Button } from 'bootstrap';

export default function AyudaPage() {

    const showContent = (section) => {
        // Ocultar todos los contenidos
        document.querySelectorAll('#default, #pagina, #principal, #inicio, #comunicados, #clasificados, #avisos, #tramites, #contactos, #conjunto, #docs').forEach(el => {
            el.style.display = 'none';
        });

        // Mostrar el contenido seleccionado
        const content = document.getElementById(section);
        if (content) {
            content.style.display = 'block';
        }
    };


    function toggleMenu(element) {
        // Cierra otros submenús si lo deseas
        document.querySelectorAll('nav ul li').forEach(li => {
        if (li !== element) li.classList.remove('active');
        });

        // Alterna el submenú actual
        element.classList.toggle('active');
    }

  return (
    <AyudasLayout>
    <div className="">
         <header>
     
        {/* <div className="col-4">
            <button type="button" href='/mimenu'>Regreso</button>     
        </div> */}
        <div className="header-documentacion">
       
           <span>Documentación, Guia de seguimiento</span>
            </div>
        </header>
       
        <div className="container">
            <nav className="d-flex justify-content-start align-items-start">
                <ul>
                    <li onClick={(e) => toggleMenu(e.currentTarget)}> 
                        <a href="#" onClick={() => showContent('inicio')}>Inicio</a> 
                    </li>
                    <li onClick={(e) => toggleMenu(e.currentTarget)}> 
                        <a href="#" onClick={() => showContent('principal')}>Página principal</a> 
                    </li>
                    <li onClick={(e) => toggleMenu(e.currentTarget)}>
                        <a href="#">Actividades Adm</a>
                        <ul>
                            <li><a href="#" onClick={() => showContent('comunicados')}>comunicados</a></li>
                            <li><a href="#" onClick={() => showContent('clasificados')}>clasificados</a></li>
                            <li><a href="#" onClick={() => showContent('avisos')}>Avisos</a></li>
                            <li><a href="#" onClick={() => showContent('tramites')}>Trámites</a></li>
                            <li><a href="#" onClick={() => showContent('contactos')}>Contactos</a></li>                            
                        </ul>
                    </li>

                    <li onClick={(e) => toggleMenu(e.currentTarget)}>
                        <a href="#">Configuración</a>
                        <ul>
                            <li><a href="#" onClick={() => showContent('conjunto')}>Parámetros</a></li>
                            <li><a href="#" onClick={() => showContent('docs')}>Documentación</a></li>
                        </ul>
                    </li>
                    <div>           
                        <a href="mimenu">
                            <button className="btn btn-success btn-sm mt-3" type="button">
                            Regreso
                            </button>
                        </a>
                    </div>
               </ul>
            </nav>


            <main id="content">
                <div id="pagina" style={{display: 'none'}}>
                    <h2>Página Principal</h2>
                    <p>Se presenta cuando inghresa a la aplicación.</p>
                </div>
                <div id="default">
                    <h2>Bienvenido</h2>
                    <p>Selecciona una opción del menú para ver la documentación.</p>
                </div>
                <div id="inicio" style={{display: 'none'}}>
                    <h2>Inicio</h2>
                    <span>
Aplicación para un conjunto residencial. En su página principal cuenta con tres secciones: <strong> Mostrar los avisos generales </strong>de la administración hacia los residentes tal como la invitación a la fiesta de los niños o el día de la madre, avisos sobre mantenimiento de servicios públicos, recomendaciones sobre cuidado de zonas comunes o el cuidado de mascotas, etc.  <strong>comunicados de la administración </strong> donde se publican la invitación a contratar o los contratos adjudicados, las actas de reuniones, la invitación a participar en trabajos de comunidad etc. y <strong>avisos </strong>que publican los residentes hacia la comunidad como por ejemplo quien dona una mascota o quien ofrece un servicio somo enfermera o abogado o quien vende algún producto o servicio. Además, la página tiene una sección para solicitar los <strong>trámites </strong>como solicitar el un parqueadero (cuando estos son comunales), solicitar el paz y salvo de deuda del propietario a la administración, un  permiso para hacer trasteos o solicitar el alquiler de un salón comunal y una opción de <strong>contáctenos o PQRS </strong>donde el residente puede colocar sus peticiones, quejas reclamos, solicitudes o hacer comentarios de interés. <br></br>

La aplicación también cuenta con un sistema de administración de la página, para ingresar a éste se solicita un usuario y su contraseña, al ingresar se ven estas opciones: <br></br>
Comunicados donde el administrador administra los comunicados a publicar. <br></br> 
Clasificados acá el administrador de la página aprueba el aviso clasificado del residente para ser publicado. <br></br>
Avisos donde el administrador administra los avisos a publicar en la pagina <br></br>
Trámites, acá el administrador gestiona las solicitudes de trámites hechas por los residentes. <br></br>
Contáctenos, el administrador atiene los PQRS de los residentes<br></br>
La página de <strong> parámetros</strong> define valores propios del conjunto como el nombre e identificación del conjunto, la hora de atención de la administración, y otros datos. <br></br>
También hay acceso a una página de documentación de esta aplicación.


                    </span>
                </div>
                <div id="principal" style={{display: 'none'}}>
                    <h2>Página Principal</h2>
                    <span>Es la página que se muestra la ingresar a la aplicación, es la página del usuario en general. En esta se aprecia en primer lugar el nombre del conjunto, se muestra en primer lugar la sección de avisos generales publicados por la administración. Hay un menú que lleva al usuario a la sección de comunicaciones de la administración y a la sección de avisos clasificados publicados por los residentes. Hay tres opciones más: Una para publicar avisos clasificados, otra para realizar trámites en la administración del conjunto y otra para contactos con ésta.<br></br>
En la sección de <strong>Avisos Generales</strong> se visualizan los avisos de la administración hacia la comunidad, estos son gestionados por la administración únicamente.
En la sección de <strong>Comunicados Varios</strong> se aprecian los anuncios publicados por la administración sobre sus actividades y comunicados a los residentes, estos son gestionados por la administración.
La tercera sección muestra los <strong>Avisos Clasificados</strong> publicados por los residentes y aprobados por la administración
</span>
                    </div>

                <div id="comunicados" style={{display: 'none'}}>
                     <h2>Comunicados de la Administración</h2>
                    <span>Los comunicados de la adms esta.....</span>
                </div>
                <div id="clasificados" style={{display: 'none'}}>  
                        <h2>Avisos Clasificados</h2>
                        <span>Los avisos clasificados son publicados por los residentes del conjunto, estos avisos son revisados y aprobados por la administración antes de ser publicados en la página principal</span>
                </div>
                <div id="avisos" style={{display: 'none'}}>
                        <h2>Avisos Generales</h2>
                        <span>Los avisos generales son publicados por la administración del conjunto hacia los residentes, estos avisos pueden ser sobre mantenimiento de servicios públicos, recomendaciones sobre cuidado de zonas comunes o el cuidado de mascotas, etc.</span>
                </div>
                <div id="tramites" style={{display: 'none'}}>
                    <h2>Trámites Administrativos</h2>
                    <span>Los trámites administrativos son procesos formales que se realizan ante la administración del conjunto, estos pueden ser sobre solicitudes de servicios, cambios en datos personales o cualquier otro trámite que requiera intervención de la administración.</span>
                </div>
                <div id="contactos" style={{display: 'none'}}>
                    <h2>Contáctenos - PQRS</h2>
                    <span>La sección de contáctenos o PQRS permite a los residentes enviar peticiones, quejas, reclamos, solicitudes o comentarios a la administración del conjunto.</span>
                </div>
                <div id="conjunto" style={{display: 'none'}}>
                        <h2>Parámetros del Conjunto Residencial</h2>
                        <span>En esta sección se configuran los parámetros propios del conjunto residencial, como el nombre del conjunto, la identificación, la dirección, el horario de atención de la administración, entre otros datos relevantes.</span>
                </div>
                
                <div id="docs" style={{display: 'none'}}>
                     <h2>Documentación y Guía de seguimiento</h2>
                    <span>Este documento presenta la documentación y guía de seguimiento de la aplicación.
                        <br /> accédalo desde la aplicación.
                    </span>
                </div>


                {/* , #grupos, principal #terceros, #conceptos, #cxc, #abonos, #reporteGeneral, #reporteDetallado, #configSistema, #configUsuarios' */}
            </main>
        </div>

        <footer className="footer row">
            <div className="col-4">
                <span> <strong>Nuestro</strong>Conjunto </span>
            </div>
            <div className="col-8">                
                     <span>
                  &copy;  desarrollo de : aortizc  - 2025  v-1.0.1  &nbsp;  &nbsp;Laravel&nbsp;+ React + Inertia + Tailwind  &nbsp; <a className='text-blue-600 dark:text-sky-400' href="https://www.aortizc.com.co/">www.aortizc.com.co </a>
            </span>
            </div>
            
        </footer>

      </div>
    </AyudasLayout>
  );
}


