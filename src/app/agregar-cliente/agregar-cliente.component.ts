import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.css']
})
export class AgregarClienteComponent implements OnInit {

  formularioCliente:FormGroup; 
  porcentajeSubida:number = 0;

  constructor(private fb:FormBuilder,private storage:AngularFireStorage) { }

  ngOnInit(): void {

    this.formularioCliente = this.fb.group({
      nombre:['',Validators.required],
      apellido:['',Validators.required],
      correo:['',Validators.compose([
        Validators.required,Validators.email
      ])],
      cedula:['',Validators.maxLength(8)],
      fechaNacimiento:['',Validators.required],
      telefono:[''],
      imgUrl:['',Validators.required]
    })
  }

  agregar(){
    console.log(this.formularioCliente.value)
  }

  subirImagen(evento){
    // console.log(evento);
    let archivo = evento.target.files[0];
    let archivoName = new Date().getTime().toString();
    let extension = archivo.name.toString().substr(archivo.name.toString().lastIndexOf('.'));
    let ruta = 'clientes/'+archivoName+extension;
    const referencia = this.storage.ref(ruta);
    const tarea = referencia.put(archivo);
    // console.log(archivo);
    tarea.then((object)=>{
      console.log('imagen subida');
      referencia.getDownloadURL().subscribe((url)=>{
        console.log(url);
      });
    })
    tarea.percentageChanges().subscribe((percentaje)=>{
      // console.log(percentaje);
      this.porcentajeSubida = parseInt(percentaje.toString());
    })
  }

}
