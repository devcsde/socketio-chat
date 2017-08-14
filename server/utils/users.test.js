const expect = require("expect");
const {Users} = require("./users");


describe("Users", () => {
    let users;

    beforeEach(() => {
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

    it("should add new user", () => {
        let users = new Users();
        let user = {
            id: "123",
            name: "Chris",
            room: "AFK"
        };
        users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it("should remove a user", () => {
        let user = {
            id: "1",
            name: "Mike",
            room: "Node Course"
        };
        users.removeUser(user.id);
        expect(users.users.length).toBe(2);

    });

    it("should not remove user", () => {
        users.removeUser(5);
        expect(users.users.length).toBe(3);
    });

    it("should find user", () => {
        let userID = "2";
        var user = users.getUser(userID);

        expect(user.id).toBe(userID);
    });

    it("should not find user", () => {
        let userID = "99";
        var user = users.getUser(userID);

        expect(user).toNotExist();

    });

    it("should return names for node course", () => {
        let userList = users.getUserList("Node Course");

        expect(userList).toEqual(["Mike", "Julie"]);
    });

    it("should return names for react course", () => {
        let userList = users.getUserList("React Course");

        expect(userList).toEqual(["Jen"]);
    });

    it("should return room names", () => {
        let userList = users.getRoomList();

        expect(userList).toEqual(["Node Course", "React Course"]);
    });

});