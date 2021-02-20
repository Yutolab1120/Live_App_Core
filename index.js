const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let port = process.env.PORT || 8000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/about', (req, res) => {
    res.render('about.ejs');
});

app.get('/front/login', (req, res) => {
    res.render('front/login.ejs');
});

app.get('/front/lives', (req, res) => {
    res.render('front/lives.ejs'); 
});

app.get('/front/user', (req, res) => {
    res.render('front/user.ejs');
});

app.get('/chat', (req, res) => {
    res.render('front/chat.ejs');
});

io.on('connection', (socket) => {
    socket.on('chat message', msg => {
        io.emit('chat message', msg);
    });
});


http.listen(port, function () {
    console.log('Funny_Prott > localhost:8000 で接続を開始しました。');
});
