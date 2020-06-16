import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage} from '@angular/fire/storage';
import { AngularFirestoreCollection,AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.css']
})
export class AgregarClienteComponent implements OnInit {

  formularioCliente:FormGroup; 
  porcentajeSubida:number = 0;
  urlImagen:string = '';

  constructor(private fb:FormBuilder,private storage:AngularFireStorage,private db: AngularFirestore,private activeRoute:ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.activeRoute.params);
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
    console.log(this.formularioCliente.value);
    this.formularioCliente.value.imgUrl = this.urlImagen;
    this.formularioCliente.value.fechaNacimiento = new Date(this.formularioCliente.value.fechaNacimiento);
    this.db.collection('usuarios').add(this.formularioCliente.value)
    .then((termino)=>{
      console.log('registro insertado')
    });
  }

  subirImagen(evento){
    // console.log(evento);

    if(evento.target.files.length > 0){
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
          // console.log(url);
          this.urlImagen = url;
        });
      })
      tarea.percentageChanges().subscribe((percentaje)=>{
        // console.log(percentaje);
        this.porcentajeSubida = parseInt(percentaje.toString());
      })
    }
  }
}
