function ajax() {
  let number = 0;
  const btn = document.getElementById('btn');
  btn.addEventListener('click', e => {
      const req = new XMLHttpRequest();
      req.onreadystatechange = function() {
          if (req.readyState == 4) {
              if(req.status == 200) {
                  const videoArea = document.getElementById("video");
                  const titleArea = document.getElementById("title");
                  const contentArea = document.getElementById("content");
                  // Actualiza el contenido de los elementos HTML con la información del video actual
                  titleArea.textContent = req.response[number].title;
                  contentArea.textContent = req.response[number].content;
                  // Crea un nuevo elemento <iframe> y establece su atributo src con la URL del video
                  const iframe = document.createElement('iframe');
                  iframe.setAttribute('width', '560');
                  iframe.setAttribute('height', '315');
                  iframe.setAttribute('src', req.response[number].url);
                  iframe.setAttribute('frameborder', '0');
                  iframe.setAttribute('allowfullscreen', '');
                  // Elimina cualquier contenido previo en el área del video y agrega el nuevo elemento <iframe>
                  videoArea.innerHTML = '';
                  videoArea.appendChild(iframe);
                  // Actualiza el número para mostrar el siguiente video en la lista (ciclo)
                  number = (number + 1) % req.response.length;
              }
          }
      }
      req.open("GET", "url.json");
      req.responseType = "json"
      req.send(null);
  });
}

window.onload = ajax;

