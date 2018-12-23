const http = require("http");
const path = require("path");
const fs = require("fs");
const pug = require("pug");
const DOMAIN_NAME = process.env.DOMAIN_NAME || "localhost";
const PORT = process.env.PORT || 5555;
const fieldSchemes = require("./message-fields");

const mimetypes = {
  ".js": "text/javascript",
  ".css": "text/css",
  ".png": "image/png"
};

http
  .createServer((req, res) => {
    console.log(`${req.method.toUpperCase()} - ${req.url}`);
    if (req.url === "/") {
      res.end(
        pug.compileFile("./src/views/index.pug")({ fieldSchemes }),
        "utf-8"
      );

      return;
    }

    const ext = getFileExtension(req.url);

    if (Object.keys(mimetypes).some(type => type === ext)) {
      fs.readFile("./public" + req.url, (err, content) => {
        if (err) {
          if (err.code === "ENONENT") {
            res.end(pug.compileFile("./src/views/404.pug"), "utf-8");
          }
        }

        res.writeHead(200, {
          "Content-Type": mimetypes[ext] || "application/octet-stream"
        });
        res.end(content, "utf-8");
      });

      return;
    }

    res.writeHead(404);
    res.end("File not found ;(");
  })
  .listen(PORT);

const getFileExtension = url => path.extname(url).toLowerCase();

console.log(`Server running at ${DOMAIN_NAME}:${PORT}`);
