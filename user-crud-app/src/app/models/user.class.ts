export class User { // 'export' para que la variable sea visible e utilizable desde fuera del archivo

    id: string; // al pasarse a 'mockapi' , el id debe ser tratado como string 
    name: string;
    username: string;
    email: string;
    city: string; 
    phone: string;
    
    constructor () { // valores default de las variables User

        this.id = '';
        this.name = '';
        this.username = '';
        this.email = '';
        this.city = '';
        this.phone = '';

    }
}