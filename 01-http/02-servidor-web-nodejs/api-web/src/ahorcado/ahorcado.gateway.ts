import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Client } from 'socket.io';


//ws://localhost:3001/websockets
@WebSocketGateway(3001,{
  namespace:'/game'
})
export class AhorcadoGateway{

  @WebSocketServer() server;
  constructor(){
    console.log(this.server);
  }

  @SubscribeMessage('empezar')
  empezar(client:Client | any, data:any){
    const palabra="acolite inge por fa";
    return palabra.length;
  }

  @SubscribeMessage('respuesta')
  mensaje(client:Client | any, data:any){
    const palabra="acolite inge por fa";
    var respuesta={
      mensaje:false,
      letra:data.letra,
      indices:[]
    };
    if(data.letra==palabra){
      respuesta.mensaje=true;
      respuesta.letra=palabra;
    }else if(palabra.includes(data.letra) && data.letra!=""){
      respuesta.mensaje=false;
      respuesta.letra=data.letra;
      var i = palabra.indexOf(data.letra);
      respuesta.indices.push(i);
      while(i!=-1){
        respuesta.indices.push(i);
        i = palabra.indexOf(data.letra,i+1);
        if(i==palabra.length)
          i=-1;
      }
      console.log("salimos");
    }else{
      console.log("tas pendejo");
      respuesta.mensaje=false;
    }
    this.server.emit("respuesta",respuesta);
  }
}
