"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Users = function () {
    function Users() {
        _classCallCheck(this, Users);

        this.users = [];
    }

    _createClass(Users, [{
        key: "addUser",
        value: function addUser(id, name, room) {
            var user = { id: id, name: name, room: room };
            this.users.push(user);
            return user;
        }
    }, {
        key: "removeUser",
        value: function removeUser(id) {
            // let user = this.users.filter((user) => user.id === id)[0];
            var user = this.getUser(id);

            if (user) {
                this.users = this.users.filter(function (user) {
                    return user.id !== id;
                });
            }
            return user;
        }
    }, {
        key: "getUser",
        value: function getUser(id) {
            return this.users.filter(function (user) {
                return user.id === id;
            })[0];
        }
    }, {
        key: "getUserList",
        value: function getUserList(room) {
            var users = this.users.filter(function (user) {
                return user.room === room;
            });
            var namesArray = users.map(function (user) {
                return user.name;
            });
            return namesArray;
        }
    }, {
        key: "getRoomList",
        value: function getRoomList() {
            var rooms = this.users.filter(function (user) {
                return user.room;
            });
            var roomsArray = rooms.map(function (user) {
                return user.room;
            });
            var resArray = Array.from(new Set(roomsArray));
            return resArray;
        }
    }]);

    return Users;
}();

module.exports = { Users: Users };

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
//# sourceMappingURL=users.js.map