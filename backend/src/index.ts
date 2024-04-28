import express from 'express';
import { WebSocketServer } from 'ws';

const app = express();

app.get('/',(req,res) =>{
    res.send('Hello world')
})

const httpServer = app.listen(8080);

const wss = new WebSocketServer({server : httpServer})

wss.on('connection',(ws) =>{
    ws.on('message',(data) =>{
        console.log(data.toString());
        
    })
})