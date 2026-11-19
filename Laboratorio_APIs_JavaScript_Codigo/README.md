# La pecera de Nemo y Dory

Laboratorio de Gestión de Servicios de TICs sobre DOM, Web Storage y HTML Drag and Drop. La implementación usa HTML, CSS y JavaScript nativo.

## Ejecutar

Desde esta carpeta, inicia un servidor local. Usa `python -m http.server 8000` en Windows o `python3 -m http.server 8000` en macOS o Linux. Abre <http://localhost:8000> en un navegador de escritorio. Para comparar pestañas, usa siempre la misma dirección y el mismo perfil del navegador.

## Comprobar los ejercicios

1. **DOM.** Cambia el lado de 6 a 8 y pulsa **Aplicar**. El resultado debe indicar 8 × 8 y 64 celdas. El campo acepta enteros del 1 al 24.
2. **Web Storage.** En un perfil con datos iniciales vacíos, pulsa **Vi un pez** dos veces en Nemo y una vez en Dory. A los 12 segundos, el agua llega a verde. Pulsa **Limpiar pecera** para recargar y verifica agua azul y conteos 2 y 1. Usa **Abrir otro acuario** y verifica que la nueva pestaña muestre 2 y 0. Si aumentas el conteo de Nemo allí, también se actualiza el de la primera pestaña.
3. **Drag and Drop.** Espera la aparición de las primeras dos burbujas. Suelta la naranja en la zona azul y luego fuera del tablero. En ambos casos debe seguir arriba sin cambiar los conteos. Suéltala en la zona de Nemo y verifica que desaparezca y que Nemo gane un punto. Repite con la burbuja azul y la zona de Dory.

## Archivos

- `index.html` contiene los controles y las zonas de los peces.
- `estilos.css` presenta la cuadrícula, los colores y las zonas.
- `pecera.js` implementa los tres ejercicios, con comentarios que explican las decisiones principales.

## Referencias

- [Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- [Web Storage API](https://developer.mozilla.org/es/docs/Web/API/Web_Storage_API)
- [HTML Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)
