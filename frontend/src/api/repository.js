import axios from "axios";

export class Repository {
  url = "http://localhost:8000";

    postLogin(email, password) {
        return new Promise((resolve, reject) => {
            console.log("Post Login");
            axios.post( `${ this.url }/users/login`, {
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
            axios.post( `${ this.url }/users/registration`, {
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
        .put(`${ this.url }/users/updatePassword`, {
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
        axios.get(`${ this.url }/users`, { 
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
        axios.put(`${ this.url }/users/updateInfo`, { 
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
        axios.delete(`${ this.url }/users`, { 
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
        .get(`${ this.url }/museums/`)
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
        .put(`${ this.url }/museums`, {
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
        .get(`${ this.url }/photos`)
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
        .get(`${ this.url }/tours`)
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
        .get(`${ this.url }/photos/`)
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
      axios.get(`${ this.url }/photos/museums`, {
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
      axios.get(`${ this.url }/tours`, {
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

  getBookingsByUser(username) {
    return new Promise((resolve, reject) => {
      console.log("Get Bookings By User");
      axios.get(`${ this.url }/bookings`, {
          params: {
            username: username
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

  getBookingInfo(tourName) {
    return new Promise((resolve, reject) => {
      console.log("Get Bookings Info");
      console.log(tourName);
      axios.get(`${ this.url }/tours`, {
          params: {
            tour_Name: tourName
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


  postBooking(username, tour) {
    return new Promise((resolve, reject) => {
        console.log("Post Booking");
        console.log(username, tour);
        axios.post( `${ this.url }/bookings`, {
            username: username,
            tourName: tour
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




}
