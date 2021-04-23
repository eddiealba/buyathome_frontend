import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor() {
        console.log("Servicio Listo para usar");
    }

    private user: any[] = [1]

    getUsers() {
        return this.user
    }
}