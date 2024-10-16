import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

/** Here we can specify port and chat room as decorator's params */
@WebSocketGateway({ port: 3000 })
export class ChatGateway {
    @WebSocketServer()
    server: Server;
    
    @SubscribeMessage('message')
    handleMessage(client: any, payload: any): void {
        /** It broadcast's the message to all the connected clients */
        this.server.emit('message', payload);
    }
}