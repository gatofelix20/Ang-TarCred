export class TarjetaCredito{
    id?: string;
    titular: string;
    numTarjeta: string;
    fechaExp: string;
    cvv: number;
    fechaCreacion: Date;
    fechaActualizacion: Date;


    constructor(titular: string, numeroTarjeta: string,fechaExp: string, cvv: number) {
     
        this.titular = titular;
        this.numTarjeta = numeroTarjeta;
        this.fechaExp = fechaExp;
        this.cvv = cvv;
        this.fechaCreacion = new Date();
        this.fechaActualizacion = new Date();
        
    }

}