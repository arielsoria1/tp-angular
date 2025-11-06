import { Injectable } from "@angular/core"; // convierte a la clase en servicio + inyección
import { HttpClient, HttpRequest } from "@angular/common/http"; // habilita las peticiones web
import { Observable } from "rxjs"; // para trabajar con flujos de datos de forma asíncrona
import { map } from "rxjs"; // permite transformar los datos de un Obsevable
import { User } from "../models/user.class"; // el modelo User.class.ts

@Injectable ({

    providedIn: 'root' // 'providedIn' apuntando a 'root' vuelve inyectable a este servicio en todo el proyecto

})

export class UserService {

    private url = "https://jsonplaceholder.typicode.com/users"; // enpoint 'users' de JsonPlaceHolder

    constructor (private http: HttpClient) {}

    getAll(): Observable<User[]> {
    return this.http.get<any[]>(this.url).pipe(
      map(apiUsers => {
        // transforma cada usuario de la API al modelo 'User'
        return apiUsers.map(apiUser => {
          let user = new User();
          user.id = apiUser.id;
          user.name = apiUser.name;
          user.username = apiUser.username;
          user.email = apiUser.email;
          user.phone = apiUser.phone;
          // aplanamiento de dato city anidado (objeto address)
          user.city = apiUser.address.city; 
          return user;
        });
      })
    );
  }

  // save agrega nuevo usuario
  save(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }

  // edit actualiza usuario existente por id

  edit(user: User): Observable<User> {
    const editUrl = `${this.url}/${user.id}`;
    return this.http.put<User>(editUrl, user);
  }

  
  // delete borra usuarios por id

  delete(id: number): Observable<any> {
    const deleteUrl = `${this.url}/${id}`;
    return this.http.delete(deleteUrl);
  }
}