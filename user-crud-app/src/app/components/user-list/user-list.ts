import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../models/user.class';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  standalone: false // explicito para que 'app-module.ts' no dude
})
export class UserListComponent implements OnInit {

  // array para la lista principal de usuarios
  userList: User[] = [];
  
  // objeto para el formulario de 'Add'
  newUser: User = new User();

  // objeto para guardar el usuario seleccionado en el modal 
  
  selectedUser: any = null; // 'any' para poder inicializarlo en null

  constructor(
    private userService: UserService, // inyecta el servicio de datos
    private modalService: NgbModal   // inyecta el servicio de modal
  ) { }

  ngOnInit(): void {
    // carga la lista de usuarios al iniciar el componente
    this.getAllUsers();
  }

  
  // carga/recarga la lista de usuarios desde el servicio 
  getAllUsers() {
    this.userService.getAll().subscribe(
      (response: User[]) => {
        this.userList = response;
      },
      (error) => {
        console.error('Error fetching users:', error);
        alert('Error fetching users. Check console.');
      }
    );
  }

  // guarda nuevo usuario
  save() {
    this.userService.save(this.newUser).subscribe(
      (response: User) => {
        this.userList.push(response);
        
        // limpia el formulario 'Add'
        this.newUser = new User();
      },
      (error) => {
        console.error('Error saving user:', error);
        alert('Error saving user. Check console.');
      }
    );
  }

  // borra un usuario

  delete(user: User) {
    // confirma antes de borrar
    if (!confirm(`Are you sure you want to delete ${user.name}?`)) {
      return;
    }

    this.userService.delete(user.id).subscribe(
      () => {
        // filtra la lista local para quitar el usuario borrado
        this.userList = this.userList.filter(u => u.id !== user.id);
      },
      (error) => {
        console.error('Error deleting user:', error);
        alert('Error deleting user. Check console.');
      }
    );
  }

  // abre el modal
  view(modal: any, user: User) {
    // crea una copia para el modal, importante en caso de cancelar 
    this.selectedUser = Object.assign({}, user);

    this.modalService.open(modal).result.then(
      // caso 1, el usuario guarda
      () => {
        this.edit(); // se llama a edit
      },
      // casi 2, el usuario cancela
      () => {
        this.selectedUser = null; // limpia la selección
      }
    );
  }

  // lógica de edición
  edit() {
    this.userService.edit(this.selectedUser).subscribe(
      (response: User) => {
        // busca el índice del usuario original
        const index = this.userList.findIndex(u => u.id === response.id);
        
        // actualiza el objeto en la lista local con la respuesta
        if (index !== -1) {
          this.userList[index] = response;
        }

        // limpia la selección
        this.selectedUser = null;
      },
      (error) => {
        console.error('Error editing user:', error);
        alert('Error editing user. Check console.');
      }
    );
  }
}