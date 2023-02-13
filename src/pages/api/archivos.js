import { conexion } from "../../../conexionMSQL/conexion";
export default async function archivos(req, res) {
  try {
    switch (req.method) {
      case 'POST':
        break;
      case 'GET':
        await conexion
          .query(
            'select * from archivos where id=(?)',
            [1],
          )
          .then((a) => {
            res.status(200).json(a);
          });
        break;
      default:
        break;
    }
  } catch (error) {
    res.send("error");
  } finally {
    if (conexion) {
      await conexion.release;
    } else {
      await conexion.end;
    }
  }
}
