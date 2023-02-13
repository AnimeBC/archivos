import Layouts from 'layouts/Layouts';
import axios from 'axios';
import { useEffect, useState } from 'react';
export default function Documentos() {
  const [datos, Fdatos] = useState([]);
  useEffect(() => {
    async function info() {
      await axios
        .get(`${process.env.NEXT_PUBLIC_URL_SQL}/api/archivos`)
        .then(a => Fdatos(a.data))
        .catch(Fdatos([]));
    }
    info();
  }, []);
  return (
    <Layouts>
      <div>
        {datos.length !== 0 ? (
          datos.map((a, b) => <div key={b}>{a.ruta}</div>)
        ) : (
          <></>
        )}
      </div>
    </Layouts>
  );
}
