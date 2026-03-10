Esto es el borrador inicial del proyecto, sujeto a cambios.


## Proyecto
Aplicación de escritorio para construir tu curriculum vitae,

## Requerimientos iniciales

- A partir de formularios se ingresara la información en el Curriculum.
- Ingresar fotografia.
- Exportar en PDF

## Alcances

- Los campos del formulario estarán relacionados con la información solicitada para el curriculum.
- La aplicación sera portable.
- Personalizar la fuente de texto.
- Será posible crear varios proyectos de curriculums. pudiendo el usuario crear más curriculums sin borrar los anteriores.

## Fuera de alcance

- No se contemplan varios diseños de curriculums vitae, al menos en un comienzo.
- No es necesaria la conexión a internet para el funcionamiento de la aplicación.
- No se contempla autenticacion y autentificacion de usuarios.

## Resultado final

La aplicación será un portable.  
El usuario al ingresar la información en el formulario, podrá tener una previsualización y descargarlo en formato PDF.

## Estructura de carpetas

docs/                        # Documentación de la aplicación.   
images/                      # Imágenes   
src/                         # Código fuente de la aplicación.  

### Carpeta src

- /frontend: Lógica y vistas de la aplicación.
- /backend: Lógica de la aplicación.
- /electron: Código de electron (ejemplo: main.ts).
- /types: Interfaces y tipos de datos (ejemplo: curriculum.ts).

```
// types/curriculum.ts (Borrador)
interface CurriculumProject {
  id: string;
  name: string;           // "Mi CV para Google"
  createdAt: string;
  updatedAt: string;

  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    portfolio?: string;
  };

  summary?: string;

  experience: {
    id: string;
    company: string;
    role: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description: string;
  }[];

  education: {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate?: string;
  }[];

  skills: {
    id: string;
    name: string;
    level?: 'básico' | 'intermedio' | 'avanzado';
  }[];

  languages: {
    id: string;
    name: string;
    level: string;
  }[];

  certifications?: {
    id: string;
    name: string;
    issuer: string;
    date: string;
    url?: string;
  }[];
}
```
### Carpeta electron

- /config: Configuraciones de electronjs. 
- main.ts: entrada a la aplicación.
- preload.cjs

#### Carpeta src/frontend

- /features: Las vistas estarán separadas en modulos. Ejemplo -> Vista formulario (/page; /components; /hooks; /services)
- /shared: /components; /layouts; /hooks; /types; /utils; /services; /icons
- /store: Manejador de estados globales.
- routes.tsx
- App.tsx
- index.tsx

#### Carpeta src/frontend/features/[modulo]/hooks
Almacena los hooks personalizados del modulo o vista. Es decir la lógica reutilizable entre componentes o vistas.

#### Carpeta src/frontend/features/[modulo]/components
Almacena los componentes personalizados del modulo o vista.

#### Carpeta src/frontend/features
features
   cv-builder
      components
         PersonalInfoForm.tsx
         EducationForm.tsx
         ExperienceForm.tsx
         SkillsForm.tsx
         ProjectsForm.tsx
         LanguagesForm.tsx

### Carpeta src/backend

store/
   projectStore.ts          # Leer/escribir JSON en disco

  
## Herramientas

- Electronjs 40.8.0
- Reactjs
- React-router
- jspdf, html2canvas
- Nodejs 24.14.0
- Tailwind
- Typescript
- Zustand
- react-hook-form
- zod @hookform/resolvers (Validación de formularios)
- shadcn/ui (librería de estilos)
- file system para lectura/escritura de archivos JSON

## Casos de uso

Actor: usuario
- Crud información personal.
- Previsualizar resultado.
- Exportar en PDF.
- Crear proyectos (curriculums)


## Vistas

- Inicio: se listan cards de los proyectos de curriculums ya hechos, pudiendo ingresar a ellos para editarlos o eliminarlos. Tambien cada card de proyecto tendra un pequeño boton icono para descargarlo directmente a pdf.
- CV builder: Se presenta la información guardada por el usuario en el formulario, si no hay nada aún se ve un mensaje para comenzar a contruir.
- CV preview: Se ve la información de manera ordenada y limpia mas una previsualización de como quedará el pdf mas el boton de descargarlo.

Secuencia: 
Inicio -> CV builder -> CV preview

## Consideraciones 

- Los formularios deben ser dinámicos, pudiendo agregarse o repetirse campos. Por ejemplo, el campo experiencia: el usuario puede tener varias trabajos u ocupaciones, donde se debe ingresar el lugar de trabajo, periodo y descripcion.

- Posibilidad de tener campos configurables (que se pueda subrayar, negrita, etc)

## Diseño del curriculum
- A definir.
