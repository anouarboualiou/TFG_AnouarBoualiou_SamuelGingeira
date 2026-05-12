const path = window.location.pathname;

const id = path.split("/").pop();



async function cargarNoticia() {

    const res = await fetch(`/api/noticias/${id}`);

    const noticia = await res.json();



    document.getElementById("imagenNoticia").src =
        noticia.foto_noticia;

    document.getElementById("categoriaNoticia").innerText =
        noticia.nombre_equipo || "BALLHUB";

    document.getElementById("tituloNoticia").innerText =
        noticia.titulo;

    document.getElementById("subtituloNoticia").innerText =
        noticia.subtitulo || "";

    document.getElementById("fechaNoticia").innerText =
        new Date(noticia.fecha_pub)
            .toLocaleDateString("es-ES");

    document.getElementById("descripcionNoticia").innerText =
        noticia.descripcion;

}

cargarNoticia();