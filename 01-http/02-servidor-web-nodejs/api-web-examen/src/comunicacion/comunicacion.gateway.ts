import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Client } from 'socket.io';

@WebSocketGateway(3001,{
  namespace:'/pedidos'
})
export class  ComunicacionGateway{

  @WebSocketServer() server;
  constructor(){
    console.log(this.server);
  }

  @SubscribeMessage('avisar')
  avisar(client:Client | any, data:any){
    console.log("AVISANDO");
    this.server.emit('actualizar');
  }

}
