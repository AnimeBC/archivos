import Arriba from './arriba/Arriba';
import Script from 'next/script';
export default function Layouts({ children }) {
  return (
    <>
      <Script
        type="module"
        rel="preconnect"
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></Script>
      <Script
        noModule
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></Script>
      <Arriba />
      <div>{children}</div>
    </>
  );
}
