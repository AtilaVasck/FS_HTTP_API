import http from 'node:http'

const PORT = 3333;
const usuarios = [];

const server = http.createServer((request, response) => {
    const { method, url } = request;

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (method === 'GET' && url === '/participants') {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(usuarios));
    } else if (method === 'POST' && url === '/participants/acont') {
        let body = '';
        request.on('data', (chunk) => {
            body += chunk.toString();
        });
        request.on('end', () => {
            const novoUsuario = JSON.parse(body);
            if (novoUsuario.idade < 16) {
                response.writeHead(403, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ message: 'Usuário não é maior que 16' }));
                return;
            }
            novoUsuario.id = usuarios.length + 1;
            usuarios.push(novoUsuario);
            response.writeHead(201, { "Content-Type": "application/json" });
            response.end(JSON.stringify(novoUsuario));
        });
    } else if (method === 'PUT' && url.startsWith('/participants/')) {
        const id = parseInt(url.split('/')[2], 10);
        let body = '';
        request.on('data', (chunk) => {
            body += chunk.toString();
        });
        request.on('end', () => {
            const usuarioAtualizado = JSON.parse(body);
            const indexUsuario = usuarios.findIndex((usuario) => usuario.id === id);
            if (indexUsuario === -1) {
                response.writeHead(404, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ message: 'Usuário não existe' }));
                return;
            }
            usuarios[indexUsuario] = { ...usuarios[indexUsuario], ...usuarioAtualizado };
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(usuarios[indexUsuario]));
        });
    } else if (method === 'DELETE' && url.startsWith('/participants/')) {
        const id = parseInt(url.split('/')[2], 10);
        const indexUsuario = usuarios.findIndex((usuario) => usuario.id === id);
        if (indexUsuario === -1) {
            response.writeHead(404, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ message: 'Usuário não encontrado' }));
            return;
        }
        usuarios.splice(indexUsuario, 1);
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ message: 'Usuário deletado' }));
    // 6. GET /participants/count: Rota para contar o número total de participantes cadastrados.
server.on('request', (request, response) => {
    if (request.method === 'GET' && request.url === '/participants/count') {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ count: usuarios.length }));
    }
});

// 7. GET /participants/count/over18: Rota para contar quantos participantes são maiores de 18 anos.
server.on('request', (request, response) => {
    if (request.method === 'GET' && request.url === '/participants/count/over18') {
        const maiores18 = usuarios.filter(usuario => usuario.idade >= 18);
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ count: maiores18.length }));
    }
});

// 8. GET /participants/city/most: Rota para identificar a cidade com o maior número de participantes.
server.on('request', (request, response) => {
    if (request.method === 'GET' && request.url === '/participants/city/most') {
        const contagemCidades = usuarios.reduce((acc, usuario) => {
            acc[usuario.cidade] = (acc[usuario.cidade] || 0) + 1;
            return acc;
        }, {});
        
        const cidadeMaisParticipantes = Object.keys(contagemCidades).reduce((a, b) => contagemCidades[a] > contagemCidades[b] ? a : b);
        
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ city: cidadeMaisParticipantes, count: contagemCidades[cidadeMaisParticipantes] }));
    }
});

    } else {
        response.writeHead(404, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: 'Rota NÃO EXISTE' }));
    }
});

server.listen(PORT, () => {
    console.log(`Servidor on PORT: ${PORT} 🚀`);
});
