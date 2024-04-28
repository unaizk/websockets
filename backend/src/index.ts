import express from 'express';
import { WebSocketServer , WebSocket} from 'ws';

const app = express();

app.get('/',(req,res) =>{
    res.send('Hello world')
})

const httpServer = app.listen(8080);

const wss = new WebSocketServer({server : httpServer})

wss.on('connection',(ws) =>{
    ws.on('message',(data) =>{
        wss.clients.forEach((client) =>{
            if(client.readyState === WebSocket.OPEN){
                client.send(data.toString())
            }
        })
        
    })
})