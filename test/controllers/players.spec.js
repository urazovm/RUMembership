var expect = require('chai').expect;
var playerController = require('../../controllers/players');

describe('Controller for the player model v2', function () {
    describe('player validation', function () {
        it('should provide a list of required values', function () {
            expect(playerController.getRequiredValues()).to.have.members(["firstName", "lastName", "dob",
                "gender", "student", "emailAddress", "contactNumber", "area", "postCode", "at least one emergency contact (name, contactNumber, relationship)"]);
        });
        it('should approve a player with no missing values', function () {
            var newPlayer = {
                firstName: "TestName",
                nickName: "",
                lastName: "TestLastName",
                dob: "01/01/1970",
                gender: "Male",
                student: "false",
                emailAddress: "test@fake.com",
                contactNumber: "07285176294",
                area: "Small Town",
                postCode: "TT15 8TT",
                emergencyContacts: [{
                    name: "TestContactName",
                    contactNumber: "07928153234",
                    relationship: "TestContactRelationship"
                }]
            }
            expect(playerController.playerHasRequiredValues(newPlayer)).to.be.true;
        });
        it('should reject a player with missing required values', function () {
            var newPlayer = {
                firstName: "TestName",
                //nickName: "",
                // lastName: "TestLastName",
                dob: "01/01/1970",
                gender: "Male",
                student: "false",
                emailAddress: "test@fake.com",
                contactNumber: "07285176294",
                area: "Small Town",
                postCode: "TT15 8TT",
                emergencyContacts: [{
                    name: "TestContactName",
                    contactNumber: "07928153234",
                    relationship: "TestContactRelationship"
                }]
            }
            expect(playerController.playerHasRequiredValues(newPlayer)).to.be.false;
        });
        it('should return an empty list if no values are missing', function () {
            var newPlayer = {
                firstName: "TestName",
                nickName: "",
                lastName: "TestLastName",
                dob: "01/01/1970",
                gender: "Male",
                student: "false",
                emailAddress: "test@fake.com",
                contactNumber: "07285176294",
                area: "Small Town",
                postCode: "TT15 8TT",
                emergencyContacts: [{
                    name: "TestContactName",
                    contactNumber: "07928153234",
                    relationship: "TestContactRelationship"
                }]
            }
            expect(playerController.playerGetMissingValues(newPlayer)).to.be.empty;
        });
        it('should return a list of empty values', function () {
            var newPlayer = {
                firstName: "TestName",
                nickName: "",
                //lastName: "TestLastName",
                dob: "01/01/1970",
                gender: "Male",
                //student: "false",
                emailAddress: "test@fake.com",
                contactNumber: "07285176294",
                //area: "Small Town",
                postCode: "TT15 8TT",
                emergencyContacts: [{
                    name: "TestContactName",
                    //contactNumber: "07928153234",
                    relationship: "TestContactRelationship"
                }]
            }
            var missingValues = playerController.playerGetMissingValues(newPlayer);
            expect(missingValues).to.have.members(["lastName", "student", "area", "emergencyContacts[0].contactNumber"]);
        });
    });
    it('should get all the players', function () {
        playerController.getAllPlayers().then(function (players) {
            expect(players).to.be.empty;
        });
    });
    it.skip('should create a new player if all required values are provided', function () {
        assert.fail('NYI');
    });
    it.skip('should update the players email address', function () {

    });
    it.skip('should update the players contact number', function () {

    });
    it.skip('should update the players student status', function () {

    });
    it.skip('should update the players UKU Username', function () {

    });
    it.skip('should update the players WFDF Username', function () {

    });
});
