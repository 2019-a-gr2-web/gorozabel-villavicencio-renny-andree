export interface Ingredientes{
  idIngrediente?:number
  nombreIngrediente:string
  descripcionPreparacion:string
  cantidad:number
  opcional:boolean
  tipoIngrediente:'Vegetal'|'Fruta'|'Carne'
  necesitaRefrigeracion:boolean
  comidaId:number
}
