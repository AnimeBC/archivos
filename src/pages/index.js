import Layouts from 'layouts/Layouts';
import { useState } from 'react';
import estilos from './index.module.css';
import Formulario from './_formulario/Formulario';
export default function Home() {
  const [contenido,Fcontenido]=useState([])
  /**/
  const handleDragEnter = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  // onDragLeave sets inDropZone to false
  const handleDragLeave = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  // onDragOver sets inDropZone to true
  const handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
    // set dropEffect to copy i.e copy of the source item
    e.dataTransfer.dropEffect = 'copy';
  };

  // onDrop sets inDropZone to false and adds files to fileList
  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    // get files from event on the dataTransfer object as an array
    let files = [...e.dataTransfer.files];
    Fcontenido([files])
  };
  return (
    <>
      <Layouts>
        <div className={estilos.ingresar}>Ingrese su documento</div>
        <div className={estilos.contenido}>
          <div className={estilos.contenedor}>
            <label
              htmlFor="Archivo"
              onDragEnter={e => handleDragEnter(e)}
              onDragOver={e => handleDragOver(e)}
              onDragLeave={e => handleDragLeave(e)}
              onDrop={e => handleDrop(e)}>
              <div className={estilos.extra}>
                <div className={estilos.extraOne}>
                  <ion-icon name="document-outline"></ion-icon>
                </div>
                <div className={estilos.extraTwo}>Añadir documento</div>
              </div>
            </label>
            <input
              multiple
              className={estilos.input}
              type="file"
              id="Archivo"
              onChange={a=>a.target.files.length===0?{}:Fcontenido([a.target.files])}
            />
          </div>
        </div>
        <div>
          <Formulario contenido={contenido}></Formulario>
        </div>
      </Layouts>
    </>
  );
}
