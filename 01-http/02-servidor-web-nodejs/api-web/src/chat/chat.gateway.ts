import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Client } from 'socket.io';



//ws://localhost:3001/websockets
@WebSocketGateway(3001,{
  namespace:'/websockets'
})
export class ChatGateway{
  @WebSocketServer() server;
  constructor(){
    console.log(this.server);
  }

  @SubscribeMessage('holaMundo')
  holaMundo(client:Client | any,data:any){
    client.broadcast.emit('saludaron',data);
    return data.nombre;
  }
}
