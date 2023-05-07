import { Component, OnInit } from '@angular/core';
import { TarjetaService } from '../../services/tarjeta.service';

import { TarjetaCredito } from 'src/app/models/TarjetaCredito';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-listar-tarjeta',
  templateUrl: './listar-tarjeta.component.html',
  styleUrls: ['./listar-tarjeta.component.css']
})
export class ListarTarjetaComponent implements OnInit {

  listarTarjetas: TarjetaCredito[] = [];

  constructor(private tarjetaSvc: TarjetaService, private Tostr: ToastrService) {}

  ngOnInit(): void {
    this.obtenerTarjeta();
  }
  

   obtenerTarjeta() {

   this.tarjetaSvc.obtenerTarjeta().subscribe(res=> {

    this.listarTarjetas = [];

    res.forEach((element: any) => {

      this.listarTarjetas.push({

       id: element.payload.doc.id,
       ...element.payload.doc.data()
      })
    })
   })

   }

    
   eliminarTarjeta(id: any) {

     Swal.fire({

       icon: 'question',
       title: 'Desea eliminar la tarjeta',
       showCancelButton: true,
       confirmButtonText: 'Eliminar'

     }).then((Result)=>{

      if (Result.isConfirmed) {
        
        this.tarjetaSvc.eliminarTarjeta(id).then(() =>{

          this.Tostr.error('La tarjeta fue eliminada correctamente', 'Registro Eliminado');
    
        }, err =>{
    
          this.Tostr.error('Opss ocurrio un error', 'ERROR');
    
        })
      }
     })
   }

    editarTarjeta(tarjeta: TarjetaCredito) {

    this.tarjetaSvc.addTarjetaEdit(tarjeta);

    }

  }
