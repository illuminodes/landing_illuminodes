# Illuminodes Landing Page

El [sitio web](https://www.illuminodes.com/) web landing de Illuminodes.

## Tecnologías

Este proyecto esta desarollado en [Rust]() y construido con las siguientes tecnologías:

- [HTMX](https://htmx.org/docs/) - para interactividad en el frontend
- [Axum](https://github.com/tokio-rs/axum) - como servidor de HTML
- [Tailwind CSS](https://tailwindcss.com/) - para estilos

## Uso del proyecto

Para correr el proyecto en tu máquina local, neceitas tener instalado [Rust](https://www.rust-lang.org/tools/install) 
y Tailwind CSS, ya sea nativo o usando un runtime de JS.

Clona el repositorio y corre el siguiente comando:

```bash
cargo run
```

Esto iniciará el servidor definido en la constante `TCP_ADDRESS`.

Corre el siguiente comando para compilar los estilos de Tailwind CSS:

```bash
tailwindcss -i src/frontend/tailwind.css -o public/styles/main.css 
```

El archivo 'deploy.sh' contiene los comandos necesarios para compilar y copiar el proyecto a un servidor.
En el servidor debe hacer publico el directorio 'public' para que el servidor pueda servir 
los archivos estáticos, y corre el binario generado por cargo.

## Contribuir

Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

- Si quieres sugerir un tema de discusión, puedes abrir un [issue](https://github.com/illuminodes/nostr-devs/issues/new)
- Si deseas contribuir con código, puedes hacer un [fork](https://github.com/illuminodes/nostr-devs/fork) de este repositorio y envia un [pull request](https://github.com/illuminodes/nostr-devs/pulls)
