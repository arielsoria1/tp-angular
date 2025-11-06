export class User { // 'export' para que la variable sea visible e utilizable desde fuera del archivo

    id: number;
    name: string;
    username: string;
    email: string;
    city: string; // 'city' especificamente, no todo el objeto 'address'
    phone: string;
    
    constructor () { // valores default de las variables User

        this.id = 0;
        this.name = '';
        this.username = '';
        this.email = '';
        this.city = '';
        this.phone = '';

    }
}