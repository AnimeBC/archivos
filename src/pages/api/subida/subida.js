import nextConnect from 'next-connect';
import multer from 'multer';
import { conexion } from 'conexionMSQL/conexion';
const subida = multer({
  storage: multer.diskStorage({
    destination: 'imagenes/mas',
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});
const ruta = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});
ruta.use(subida.array('archivos'));
ruta.post((req, res) => {
  async function envio() {
    /** */
    try {
      const id = 1;
      req.files.map(async a => {
        const [comprobar] = await conexion.query(
          'SELECT * FROM archivos WHERE id=(?) AND nombre=(?)',
          [id, a.filename],
        );
        if (comprobar === undefined) {
          return await conexion
            .query('INSERT INTO archivos(id,ruta,nombre) VALUE (?,?,?)', [
              id,
              a.path,
              a.filename,
            ])
            .then(() => res.status(200).end());
        } else {
          console.log("hola");
        }
      });
    } catch (error) {
      res.send('');
    } finally {
      if (conexion) {
        await conexion.release;
      } else {
        await conexion.end;
      }
    }
  }
  envio();
});

export default ruta;
export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
