import axios from 'axios';

export class Repository {
    url = "localhost";

    getLogin(username, password) {
        return new Promise((resolve, reject) => {
            console.log("Get Login");
            // TODO: username should actually be an email, see user stories
            axios.post( `http://${ this.url }:8000/users/login`, {
                data: {
                    email: username,
                    password: password
                }
            })
                .then(x => {
                    console.log("x.data", x.data);
                    resolve(x.data);
                })
                .catch(err => {
                    console.log("catch");
                    alert(err);
                    reject(err);
                })
        });
    }
    
    getMuseums() {
        return new Promise((resolve, reject) => {
            console.log("Get Museums");
            axios.get( `http://${ this.url }:8000/museums`)
                .then(x => {
                    resolve(x.data);
                })
                .catch(err => {
                    alert(err);
                    reject(err);
                })
        });
    }

    getTours() {
        return new Promise((resolve, reject) => {
            console.log("Get Tours");
            axios.get( `http://${ this.url }:8000/tours`)
                .then(x => {
                    resolve(x.data);
                })
                .catch(err => {
                    alert(err);
                    reject(err);
                })
        });
    }

}