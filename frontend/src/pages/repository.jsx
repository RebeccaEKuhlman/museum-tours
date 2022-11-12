import axios from 'axios';

export class Repository {
    url = "localhost";

    postLogin(email, password) {
        return new Promise((resolve, reject) => {
            console.log("Post Login");
            axios.post( `http://${ this.url }:8000/users/login`, {
                    email: email,
                    password: password
                
            })
                .then(x => {
                    console.log("x", x.data);
                    resolve(x.data);
                })
                .catch(err => {
                    console.log("catch");
                    alert(err);
                    reject(err);
                })
        });
        //         // Save JWT in localStorage form the memory
        //         localStorage.setItem("token", token);
        //         // Send the request with JWT
        //         const headers = {
        //             Authorization: `JWT ${token}`
        //         }
        //         const updateProfileRes = await axios.post('/api/profile/', {
        //             body: data
        //         },{
        //             headers: headers
        // });
    }

    postRegristration(email, username, password) {
        return new Promise((resolve, reject) => {
            console.log("Post Registration");
            axios.post( `http://${ this.url }:8000/users/registration`, {
                email: email,
                username: username,
                password: password
            })
                .then(x => {
                    console.log("x.data", x.data);
                    resolve(x.data);
                })
                .catch(err => {
                    console.log("catch");
                    reject(err);
                })
        });
    }

    putPassword(email, newPass) {
        return new Promise((resolve, reject) => {
            console.log("Put Password");
            axios.post( `http://${ this.url }:8000/users/updatePassword`, {
                data: {
                    email: email,
                    newPass: newPass
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
            axios.get( `http://${ this.url }:8000/museums/`)
                .then(x => {
                    resolve(x.data);
                })
                .catch(err => {
                    alert(err);
                    reject(err);
                })
        });
    }

    getPhotos() {
        return new Promise((resolve, reject) => {
            console.log("Get Photos");
            axios.get( `http://${ this.url }:8000/photos`)
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

    getPhoto() {
        return new Promise((resolve, reject) => {
            console.log("Get Photo");
            axios.get( `http://${ this.url }:8000/photos/`)
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