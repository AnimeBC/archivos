import estilos from "./arriba.module.css"
import Link from "next/link"
export default function Arriba(){
    return(
        <div className={estilos.todo}>
            <div><img src="" alt="" /></div>
            <div>Bloque de Encabezado</div>
            <Link href={"/documentos/Documentos"}>Documentos</Link>
        </div>
    )
}