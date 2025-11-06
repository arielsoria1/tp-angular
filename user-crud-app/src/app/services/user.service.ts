import { Injectable } from "@angular/core"; // convierte a la clase en servicio + inyección
import { HttpClient } from "@angular/common/http"; // para hacer peticiones web
import { Observable } from "rxjs"; // para flujos de datos asíncronos
// al usar mockapi {map} deja de ser necesario
import { User } from "../models/user.class"; // el modelo User.class.ts

@Injectable ({
    providedIn: 'root' // 'providedIn' hace que el servicio esté disponible en toda la app
})

export class UserService {

    private url = "https://690d23e2a6d92d83e85098d6.mockapi.io/api/users"; // endpoint 'users' de mockapi

    constructor (private http: HttpClient) {} // siempre que se instancie UserService, se ejecuta la petición de parametros del método 'constructor'

    // 'getAll' ahora es más simple
    getAll(): Observable<User[]> {
     
        return this.http.get<User[]>(this.url);
  }

  // save: agrega un nuevo usuario
  save(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }

  // edit: actualiza un usuario existente por id
  edit(user: User): Observable<User> {
    const editUrl = `${this.url}/${user.id}`;
    return this.http.put<User>(editUrl, user);
  }

  
 // delete: borra un usuario por id
  delete(id: string): Observable<any> { // Acepta un 'id' de tipo string
    const deleteUrl = `${this.url}/${id}`;
    return this.http.delete(deleteUrl);
  }
}