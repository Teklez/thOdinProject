const http = require("http");
const fs = require("fs");
const url = require("url");

http.createServer((req, res) => {
    let q = url.parse(req.url, true);
    let pathname = q.pathname;
    console.log(`pathname is ${pathname}`);
    let filename =   pathname === "/"? "../views" + "/index.html":"../views" + pathname;
    let errFile = "../views/404.html";
    console.log(filename);

    fs.readFile(filename, (err, data) => {
        if (err) {
            res.writeHead(404, {"Content-Type": "text/html"});
            fs.readFile(errFile, (err, data) => {
                if (err) {
                    return res.end("404 Page Not Found");
                }
                return res.end(data);
            });
        } else {
            res.writeHead(200, {"Content-Type": "text/html"});
            return res.end(data);
        }
    });
}).listen(8000);

