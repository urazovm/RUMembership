var Promise = require('bluebird');
var chai = require('chai');
var chaiPromised = require('chai-as-promised');
chai.use(chaiPromised);
var expect = chai.expect;
var sinon = require('sinon');
var sinonStubPromise = require('sinon-stub-promise');
sinonStubPromise(sinon);
var Player = require('../../models').Player;
var playerController = require('../../controllers/players');

var sandbox;
beforeEach(function () {
    sandbox = sinon.sandbox.create();
});

afterEach(function () {
    sandbox.restore();
});

describe('Controller for the player model', function () {
    describe('player validation', function () {
        it('should provide a list of required values', function () {
            expect(playerController.getRequiredValues()).to.have.members(["firstName", "nickName cannot be null, but can be empty", "lastName", "dob",
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
            var missing = playerController.playerGetMissingValues(newPlayer);
            expect(missing).to.be.empty;
        });
        it('should return a list of missing values', function () {
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
            expect(missingValues).to.deep.equal(["lastName", "student", "area", "emergencyContacts[0].contactNumber"]);
        });
    });
    it('should get all the players', function (done) {
        var playerFindAllStubb = sandbox.stub(Player, 'findAll');
        playerFindAllStubb.returnsPromise().resolves([]);

        expect(playerController.getAllPlayers()).to.eventually.be.empty.notify(done);
    });
    it('should propogate errors when getting all players', function (done) {
        var playerFindAllStubb = sandbox.stub(Player, 'findAll');
        playerFindAllStubb.returnsPromise().rejects(new Error('Development Error for test. Pretend it\'s a connection thing'));

        expect(playerController.getAllPlayers()).to.eventually.be.rejected.notify(done);
    });
    it('should create a new player if all required values are provided', function (done) {
        var newPlayer = {
            firstName: "TestFirstName",
            nickName: new Date().toLocaleString(),
            lastName: "TestLastName",
            dob: "01/01/1970",
            gender: "Male",
            student: "false",
            emailAddress: "test@fake.com",
            contactNumber: "07285176294",
            area: "Small Town",
            postCode: "TT15 8TT",
            emergencyContactName: "TestContactName",
            emergencyContactNumber: "07928153234",
            emergencyContactRelationship: "TestContactRelationship"

        }
        // var playerCreateStub = sandbox.stub(Player, 'create');

        //   playerCreateStub.returnsPromise().resolves({ "Magic player": "OK" });
        expect(playerController.createPlayer(newPlayer)).to.eventually.deep.equal(newPlayer).notify(done);
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
