# PokéAPI Testing

API REST de Pokémon construida con Node.js y Express. Incluye una interfaz web para consultar, crear, editar y eliminar Pokémon.

## Requisitos

- Node.js 18 o superior
- npm

## Instalación

```bash
npm install
```

## Ejecución

```bash
npm start
```

La aplicación queda disponible en `http://localhost:3000`.

Para usar otro puerto en PowerShell:

```powershell
$env:PORT=3001; npm start
```

La interfaz web está disponible en la raíz (`/`) y la API en `/api/pokemon`.

## Endpoints

| Método | Endpoint | Descripción |
| --- | --- | --- |
| `GET` | `/api/pokemon` | Obtener todos los Pokémon |
| `GET` | `/api/pokemon/:id` | Obtener un Pokémon por ID |
| `POST` | `/api/pokemon` | Crear un Pokémon |
| `PUT` | `/api/pokemon/:id` | Actualizar un Pokémon |
| `DELETE` | `/api/pokemon/:id` | Eliminar un Pokémon |

## Ejemplo de creación

```json
{
  "id": 152,
  "nombre": "Chikorita",
  "foto": "https://example.com/chikorita.png",
  "estadisticas": {
    "ps": 45,
    "ataque": 49,
    "defensa": 65,
    "ataque_especial": 49,
    "defensa_especial": 65,
    "velocidad": 45
  }
}
```

Ejemplo con `curl`:

```bash
curl -X POST http://localhost:3000/api/pokemon \
  -H "Content-Type: application/json" \
  -d '{"id":152,"nombre":"Chikorita","foto":"https://example.com/chikorita.png","estadisticas":{"ps":45,"ataque":49,"defensa":65,"ataque_especial":49,"defensa_especial":65,"velocidad":45}}'
```

## Datos

La API inicia con los 151 Pokémon de la primera generación. Los cambios se almacenan en memoria y se pierden al reiniciar el servidor.

## Scripts

- `npm start`: inicia el servidor.
- `npm run dev`: inicia el servidor usando el modo watch de Node.js.
