import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.css']
})
export class ListadoClientesComponent implements OnInit {

  clientes:any[] = new Array<any>();

  constructor(private db:AngularFirestore) { }

  ngOnInit(): void {
    // this.db.collection('usuarios').valueChanges().subscribe((resultado)=>{
    //   this.clientes = resultado;
    // })
    this.clientes.length = 0;

    this.db.collection('usuarios').get().subscribe((resultado)=>{
      resultado.docs.forEach((items)=>{
        let cliente = items.data();
        cliente.id = items.id;
        cliente.ref = items.ref;
        this.clientes.push(cliente);
      })
    })
  }

}
