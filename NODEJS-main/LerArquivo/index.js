const http = require('node:http')
const fs = require('node:fs')

const PORT = 3333

const server = http.createServer((request, response) => {
    fs.readFile('mensagem.html', (err, data)=>{
        if (err) {
            response.writeHead(500, {'Content-Type': 'text/html'});
            response.end(JSON.stringify({message : "Erro ao ler o arquivo"}));
            return;
        }
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
    response.end();
    });
});

server.listen(PORT, () => {
    console.log(`Servidor on PORT ${PORT}`)
})