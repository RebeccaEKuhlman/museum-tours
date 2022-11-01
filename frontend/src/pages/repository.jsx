import axios from 'axios';

export class Repository {
    url = "localhost";

    getLogin(username, password) {
        return new Promise((resolve, reject) => {
            console.log("repo");
            console.log(username);
            axios.get( `http://${ this.url }:8000/login`, {
                params: {
                    username: username,
                    password: password
                }
            } )
                .then(x => {
                    console.log("resolve");
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
            axios.get( `http://${ this.url }:8000/login`, { 
            } )
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