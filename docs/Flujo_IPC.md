
# Flujo IPC

Desde el frontend al backend

1. En el frontend la comunicación se logra a travez del objeto window, sin embargo, al usar typescript debe actualizarse y agregar las interfaces de los tipos de datos que se van a enviar y recibir. En este caso el archivo es vite-env.d.ts
2. En la vista, componente o en un hook se hace la llamada a la funcion del ipc expuesto por el objeto window, por ejemplo window.cv.findAll()
3. Los ipc realizados se encuentran en el archivo src/electron/ipc/index.ts, un archivo barril para centralizar o desacoplar alguno facilmente.
4. Los handlers se encuentran en el archivo src/electron/ipc/cv.ipc-handler.ts, este archivo maneja la funcionalidades de los ipc. Pudiendo haber varios archivos y luego registrarlos en el archivo index.ts
5. Por último, el archivo preload, src/electron/preload.ts, expone las funciones de los ipc al frontend.

Fujo desde el backend al frontend

handlers -> ipc (index.ts) -> preload -> vite-env.d.ts -> frontend