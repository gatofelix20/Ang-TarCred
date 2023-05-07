import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/TarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';



@Component({
  selector: 'app-crear-tarjeta',
  templateUrl: './crear-tarjeta.component.html',
  styleUrls: ['./crear-tarjeta.component.css']
})
export class CrearTarjetaComponent  implements OnInit{

  forma: FormGroup;

  titulo = 'Crear Tarjeta';
  
  id: string | undefined

  loading: boolean = false;  //ojo pelao

  constructor(private fb: FormBuilder,
    private tarjetaSvc: TarjetaService, private toastr: ToastrService) {

  this.forma = this.fb.group({

    titular:['', Validators.required],
    numTarjeta:['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
    fechaExp:['',  [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
    cvv:['',  [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
    

  })

  }

  ngOnInit(): void {

   this.tarjetaSvc.getTarjetaEdit().subscribe(res=>{

   console.log(res);
   this.titulo = 'Editar Tarjeta'; 
   this.id = res.id;
   this.forma.patchValue({

     titular: res.titular,
     numTarjeta: res.numTarjeta,
     fechaExp: res.fechaExp,
     cvv: res.cvv

   })

   })

  }


  get titular(){
    return this.forma.get('titular')?.dirty && this.forma.get('titular')?.touched && this.forma.get('titular')?.valid;
  }

  get titularNoValido(){
    return this.forma.get('titular')?.invalid && this.forma.get('titular')?.touched 
  }


  get numTarjeta(){
    return this.forma.get('numTarjeta')?.dirty && this.forma.get('numTarjeta')?.touched && this.forma.get('numTarjeta')?.valid;
  }

  get numTarjetaNoValido(){
    return this.forma.get('numTarjeta')?.invalid && this.forma.get('numTarjeta')?.touched 
  }


  get fechaExp(){
    return this.forma.get('fechaExp')?.dirty && this.forma.get('fechaExp')?.touched && this.forma.get('fechaExp')?.valid;
  }

  get fechaExpNoValido(){
    return this.forma.get('fechaExp')?.invalid && this.forma.get('fechaExp')?.touched 
  }



get cvv(){
    return this.forma.get('cvv')?.dirty && this.forma.get('cvv')?.touched && this.forma.get('cvv')?.valid;
  }

  get cvvNoValido(){
    return this.forma.get('cvv')?.invalid && this.forma.get('cvv')?.touched 
  }


  guardarTarjeta() {
   
  if (this.id === undefined) {
   //Creamos una nueva Tarjeta
    this.agregarTarjeta();

  }else{

    //Editamos una Tarjeta
     this.editarTarjeta(this.id);
  }
  }

  editarTarjeta(id: string) {

    const tarjeta: any = {

      titular: this.forma.value.titular,
      numTarjeta: this.forma.value.numTarjeta,
      fechaExp: this.forma.value.fechaExp,
      cvv: this.forma.value.cvv,
      fechaActualizacion: new Date()
    }

    this.loading = true;

    this.tarjetaSvc.editarTarjeta(id, tarjeta).then(() => {

      this.loading = false;
      this.titulo = 'Agregar Tarjeta';
      this.forma.reset(); //Vaciar los input
      this.id = undefined;
      this.toastr.info('La Tarjeta fue Actualizada!!!', 'REGISTRO ACTUALIZADO');
    },err=> {

      console.log(err);
    })

  }

  agregarTarjeta() {

    const tarjeta: TarjetaCredito = {

      titular: this.forma.value.titular,
      numTarjeta: this.forma.value.numTarjeta,
      fechaExp: this.forma.value.fechaExp,
      cvv: this.forma.value.cvv,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
 
    this.loading = true;
 
    this.tarjetaSvc.guardarTarjeta(tarjeta).then(() =>{
     
     this.loading = false;
     this.toastr.success('La Tarjeta fue registrada!!!', 'TARJETA REGISTRADA')
 
     this.forma.reset();
    }, err =>{
 
     this.loading = false;
     this.toastr.error('Opss ocurrio un error', 'ERROR');
    })
 
  }

}
