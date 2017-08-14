class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        let user = {id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        // let user = this.users.filter((user) => user.id === id)[0];
        let user = this.getUser(id);

        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    }

    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    }

    getUserList(room) {
        let users = this.users.filter((user) => user.room === room);
        let namesArray = users.map((user) => user.name);
        return namesArray;
    }

    getRoomList() {
        let rooms = this.users.filter((user) => user.room);
        let roomsArray = rooms.map((user) => user.room);
        let resArray = Array.from(new Set(roomsArray));
        return resArray;
    }
}

module.exports = {Users};


// class Person {
//     constructor(name, age){
//         this.name = name;
//         this.age = age;
//     }
//     getUserDescription () {
//         return `${this.name} is ${this.age} year(s) old.`;
//     }
// }
//
// var me = new Person("Chris", 25);
// var description = me.getUserDescription();
//
// console.log(description);