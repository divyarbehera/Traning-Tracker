﻿$(document).ready(function () {

    my.allProfileVm = function () {
        var users = ko.observableArray([]),
            fullName = function (item) {
                return item.FirstName + " " + item.LastName;
            },
            photoUrl = function (item) {
                return my.rootUrl + "/Uploads/ProfilePicture/" + item.ProfilePictureName;
            },
            getUsersCallback = function (userList) {
                ko.utils.arrayForEach(userList, function (item) {
                    item.FullName = my.allProfileVm.fullName(item);
                    item.PhotoUrl = my.allProfileVm.photoUrl(item);
                    my.allProfileVm.users.push(item);
                });
            },
            getUsers = function () {
                my.userService.getAllUsers(my.allProfileVm.getUsersCallback);
            },
            displayUsers = users,
            showTrainers = function () {//REVIEW THIS
                displayUsers = ko.utils.arrayFilter(my.allProfileVm.users(), function (profile) {
                    return profile.IsTrainer == true;
                });
            };

        return {
            users: users,
            getUsersCallback: getUsersCallback,
            getUsers: getUsers,
            fullName: fullName,
            photoUrl: photoUrl
        };
    }();

    my.allProfileVm.getUsers();
    ko.applyBindings(my.allProfileVm);
});