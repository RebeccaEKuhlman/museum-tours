import axios from "axios";

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
                    console.log("xxxxxx", x);
                    resolve(x.data);
                })
                .catch(err => {
                    console.log("catch");
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

    postRegistration(email, username, password, director) {
        return new Promise((resolve, reject) => {
            console.log("Post Registration");
            axios.post( `http://${ this.url }:8000/users/registration`, {
                email: email,
                username: username,
                password: password,
                director: director
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
      axios
        .put(`http://${this.url}:8000/users/updatePassword`, {
          email: email,
          password: newPass,
        })
        .then((x) => {
          console.log("x.data", x.data);
          resolve(x.data);
        })
        .catch((err) => {
          console.log("catch");
          reject(err);
        });
    });
  }

  getUser(email) {
    return new Promise((resolve, reject) => {
        console.log("Update User");
        axios.get(`http://${this.url}:8000/users`, { 
            params: {
                email: email
            },
        })
        .then((x) => {
          console.log("x.data", x.data);
          resolve(x.data);
        })
        .catch((err) => {
          console.log("catch");
          reject(err);
        });
    });
  }

  updateUser(email, photo, uni, bio) {
    return new Promise((resolve, reject) => {
        console.log("Update User");
        axios.put(`http://${this.url}:8000/users/updateInfo`, { 
            email: email,
            photo: photo,
            uni: uni,
            bio: bio
        })
        .then((x) => {
          console.log("x.data", x.data);
          resolve(x.data);
        })
        .catch((err) => {
          console.log("catch");
          reject(err);
        });
    });
  }

  deleteUser(email) {
    return new Promise((resolve, reject) => {
        console.log("Delete User");
        axios.delete(`http://${this.url}:8000/users`, { 
            params: {
                email: email
            },
        })
        .then((x) => {
          console.log("x.data", x.data);
          resolve(x.data);
        })
        .catch((err) => {
          console.log("catch");
          reject(err);
        });
    });
  }

  getMuseums() {
    return new Promise((resolve, reject) => {
      console.log("Get Museums");
      axios
        .get(`http://${this.url}:8000/museums/`)
        .then((x) => {
          resolve(x.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  putMuseumWhatsNew(museum_name, whatsNew) {
    return new Promise((resolve, reject) => {
      console.log("Put Museum Whats New");
      axios
        .put(`http://${this.url}:8000/museums`, {
            museum_name: museum_name,
            whatsNew: whatsNew,
        })
        .then((x) => {
          console.log("x.data", x.data);
          resolve(x.data);
        })
        .catch((err) => {
          console.log("catch");
          reject(err);
        });
    });
  }

  getPhotos() {
    return new Promise((resolve, reject) => {
      console.log("Get Photos");
      axios
        .get(`http://${this.url}:8000/photos`)
        .then((x) => {
          resolve(x.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getTours() {
    return new Promise((resolve, reject) => {
      console.log("Get Tours");
      axios
        .get(`http://${this.url}:8000/tours`)
        .then((x) => {
          resolve(x.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getPhoto() {
    return new Promise((resolve, reject) => {
      console.log("Get Photo");
      axios
        .get(`http://${this.url}:8000/photos/`)
        .then((x) => {
          resolve(x.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getPhotoByMuseum(museum_name) {
    return new Promise((resolve, reject) => {
      console.log("Get Photo by Museum");
      axios.get(`http://${this.url}:8000/photos/museums`, {
            params: {
                museum_name: museum_name,
            },
        })
        .then((x) => {
          resolve(x.data);
          console.log("x.data", x.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getToursByMuseum(museum_name) {
    return new Promise((resolve, reject) => {
      console.log("Get Tours by Museum");
      axios.get(`http://${this.url}:8000/tours`, {
          params: {
            museum_name: museum_name,
          },
        })
        .then((x) => {
          resolve(x.data);
          console.log("x.data", x.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

}
