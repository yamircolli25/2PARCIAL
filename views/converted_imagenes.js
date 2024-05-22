- var htmlDocument = document.implementation.createHTMLDocument("Imagen Convertida");
- var htmlLang = document.createAttribute("lang");
- htmlLang.value = "en";
- htmlDocument.documentElement.setAttributeNode(htmlLang);

- var head = htmlDocument.createElement("head");
- var metaCharset = htmlDocument.createElement("meta");
- metaCharset.setAttribute("charset", "UTF-8");
- head.appendChild(metaCharset);

- var metaViewport = htmlDocument.createElement("meta");
- metaViewport.setAttribute("name", "viewport");
- metaViewport.setAttribute("content", "width=device-width, initial-scale=1.0");
- head.appendChild(metaViewport);

- var title = htmlDocument.createElement("title");
- title.textContent = "Imagen Convertida";
