"use strict";

var expect = require("expect");

var _require = require("./users"),
    Users = _require.Users;

describe("Users", function () {
    var users = void 0;

    beforeEach(function () {
        users = new Users();
        users.users = [{
            id: "1",
            name: "Mike",
            room: "Node Course"
        }, {
            id: "2",
            name: "Jen",
            room: "React Course"
        }, {
            id: "3",
            name: "Julie",
            room: "Node Course"
        }];
    });

    it("should add new user", function () {
        var users = new Users();
        var user = {
            id: "123",
            name: "Chris",
            room: "AFK"
        };
        users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it("should remove a user", function () {
        var user = {
            id: "1",
            name: "Mike",
            room: "Node Course"
        };
        users.removeUser(user.id);
        expect(users.users.length).toBe(2);
    });

    it("should not remove user", function () {
        users.removeUser(5);
        expect(users.users.length).toBe(3);
    });

    it("should find user", function () {
        var userID = "2";
        var user = users.getUser(userID);

        expect(user.id).toBe(userID);
    });

    it("should not find user", function () {
        var userID = "99";
        var user = users.getUser(userID);

        expect(user).toNotExist();
    });

    it("should return names for node course", function () {
        var userList = users.getUserList("Node Course");

        expect(userList).toEqual(["Mike", "Julie"]);
    });

    it("should return names for react course", function () {
        var userList = users.getUserList("React Course");

        expect(userList).toEqual(["Jen"]);
    });

    it("should return room names", function () {
        var userList = users.getRoomList();

        expect(userList).toEqual(["Node Course", "React Course"]);
    });
});
//# sourceMappingURL=users.test.js.map