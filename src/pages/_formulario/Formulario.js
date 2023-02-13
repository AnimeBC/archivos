import { useEffect, useState, useRef } from 'react';
import estilos from './formulario.module.css';
import Image from 'react-cool-img';
import axios from 'axios';
import { modularizeImports } from 'next.config';
export default function Formulario({ contenido }) {
  const [nuevo, Fnuevo] = useState([]);
  const [casillas, Fcasillas] = useState(20);
  const [error, Ferror] = useState(false);
  const [errorN, FerrorN] = useState(String);
  const imagen = useRef();
  useEffect(() => {
    Fnuevo([]);
    contenido.map(a => {
      try {
        if ({ ...a }[0]) {
          const obje = Object.values({ ...a }).map(b => b);
          Fnuevo([...nuevo, obje].flat(Infinity));
        } else {
          Fnuevo([...nuevo, a].flat(Infinity));
        }
      } catch (error) {
        Fnuevo(['error']);
      }
    });
  }, [contenido]);
  function evaluar(a) {
    const dato = String(
      a.split('').reverse().join('').split('.')[0].split('').reverse().join(''),
    ).toLowerCase();
    try {
      switch (dato) {
        case 'img':
          return 'a';
        case 'mp3':
          return 'd';
        case 'png':
          return 'a';
        case 'jpg':
          return 'a';
        case 'jpeg':
          return 'a';
        case 'mp4':
          return 'b';
        case 'flv':
          return 'b';
        case 'webm':
          return 'b';
        case 'doc':
          return 'c';
        case 'docx':
          return 'c';
        case 'pdf':
          return 'c';
        case 'xlmm':
          return 'c';
        default:
          return 'e';
      }
    } catch (error) {
      return 'e';
    }
  }
  function readImage(file) {
    const lectura = new FileReader();
    lectura.addEventListener('load', a => {
      imagen.current.src = '';
      imagen.current.src = a.target.result;
    });
    lectura.addEventListener('progress', () => {
      console.log('cargando');
      return 'espera';
    });
    lectura.readAsDataURL(file);
  }
  function borrar(a, b) {
    Fnuevo(nuevo.filter((c, d) => d !== b));
  }
  /** */
  function envio() {
    const enviar = async () => {
      const formData = new FormData();
      const config = {
        headers: { 'content-type': 'multipart/form-data' },
        onUploadProgress: event => {
          console.log(
            `Current progress:`,
            Math.round((event.loaded * 100) / event.total),
          );
        },
      };
      for (let i = 0; i < nuevo.length; i++) {
        formData.append('archivos', nuevo[i]);
        await axios
          .post(
            `${process.env.NEXT_PUBLIC_URL_SQL}api/subida/subida`,
            formData,
            config,
          )
          .catch(() => Ferror(true));
      }
    };
    enviar().then(() => Fnuevo([]));
  }
  return (
    <div>
      <div className={estilos.enviar}>
        <div>
          {nuevo.length >= 21 ? (
            <div className={estilos.flechas}>
              <div
                className={estilos.flechasA}
                onClick={() =>
                  casillas / 20 > 1
                    ? Fcasillas(casillas - 20)
                    : Fcasillas(casillas)
                }>
                <ion-icon name="arrow-back-outline"></ion-icon>
              </div>
              <div className={estilos.flechasB}>{casillas / 20}</div>
              <div
                className={estilos.flechasC}
                onClick={() =>
                  nuevo.length > casillas
                    ? Fcasillas(casillas + 20)
                    : Fcasillas(casillas)
                }>
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </div>
            </div>
          ) : (
            <div></div>
          )}
          <div>
            Contenido de Hoja: {nuevo.slice(casillas - 20, casillas).length}
          </div>
        </div>
        {nuevo.length !== 0 ? (
          <button onClick={() => envio()}>Enviar</button>
        ) : (
          <></>
        )}
      </div>
      {error === true ? (
        <div className={estilos.error}>
          Error en el envio, algunos archivos ya existen verifique sus
          documentos
        </div>
      ) : (
        <div></div>
      )}
      <div className={estilos.lista}>
        {nuevo.slice(casillas - 20, casillas).map((a, b) => (
          <div key={b}>
            <div>
              {evaluar(a.name) === 'a' ? (
                <div className={estilos.imagen}>
                  <Image src="/2.webp" ref={imagen} alt="nada aun" />
                </div>
              ) : evaluar(a.name) === 'b' ? (
                <div className={estilos.imagen}>
                  <img src="/1.png" alt="" />
                </div>
              ) : evaluar(a.name) === 'c' ? (
                <div className={estilos.imagen}>
                  <img src="/3.png" alt="" />
                </div>
              ) : evaluar(a.name) === 'd' ? (
                <div className={estilos.imagen}>
                  <img src="/4.jpg" alt="" />
                </div>
              ) : evaluar(a.name) === 'e' ? (
                <div className={estilos.imagen}>
                  <img src="/5.webp" alt="" />
                </div>
              ) : (
                <div>Desconocido</div>
              )}
            </div>
            <div className={estilos.extras}>
              <div className={estilos.extraUno}>{a.name}</div>
              <div className={estilos.extraDos} onClick={() => borrar(a, b)}>
                <ion-icon name="close-circle-outline"></ion-icon>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
