"use strict"
var assert = require('chai').assert;
var expect = require('chai').expect;
var sinon = require('sinon');

var playerController = require('../../controllers/players');

describe('Controller for the player model', function () {
    describe('player validation', function () {

        it('should check a player for missing values', function () {
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
    it.skip('should get all the players', function () {
        var response = sinon.spy();
        playerController.getAllPlayers(response);

        assert(response.called)
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