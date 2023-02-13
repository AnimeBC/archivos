
/*import nextConnect from 'next-connect';
import multer from 'multer';
import { conexion } from 'conexionMSQL/conexion';
export default async function copias(){
    try {
        const ruta = req.files[0].path;
        const nombre = req.files[0].filename;
        const id = 1;
        const [comprobar] = await conexion.query(
          'SELECT * FROM archivos WHERE id=(?) AND nombre=(?)',
          [id, nombre],
        );
        if (comprobar === undefined) {
          return await conexion
            .query(
              'INSERT INTO archivos(id,ruta,nombre) VALUE (?,?,?)',
              [id, ruta, nombre],
            )
            .then(() => res.status(200).end());
        } else {
          return res.status(500).json({mensaje:"copia"}).end();
        }
      } catch (error) {
        res.send('');
      } finally {
        if (conexion) {
          await conexion.release;
        } else {
          await conexion.end;
        }
      }
}*/