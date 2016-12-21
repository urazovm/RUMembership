var Promise = require('bluebird');
var chai = require('chai');
var chaiPromised = require('chai-as-promised');
chai.use(chaiPromised);
var expect = chai.expect;
var sinon = require('sinon');
var sinonStubPromise = require('sinon-stub-promise');
sinonStubPromise(sinon);
var Player = require('../../models').Player;
var EmergencyContact = require('../../models').EmergencyContact;
var playerController = require('../../controllers/players');

var testPlayer1 = {
    firstName: "Test 1 First Name",
    nickName: "",
    lastName: "Test 1 Last Name",
    dob: "01/01/1970",
    gender: "Male",
    student: "false",
    emailAddress: "test@fake.com",
    contactNumber: "07285176294",
    area: "Small Town2",
    postCode: "TT15 8TT"
}

var testPlayer2 = {
    firstName: "Test 2 First Name",
    nickName: "Test Nick",
    lastName: "Test 2 Last Name",
    dob: "01/01/1970",
    gender: "Male",
    student: "false",
    emailAddress: "test@fake.com",
    contactNumber: "07285176294",
    area: "Small Town",
    postCode: "TT15 8TT"
}

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
            expect(playerController.getRequiredValues()).to.deep.equal(["firstName", "nickName cannot be null, but can be empty", "lastName", "dob",
                "gender", "student", "emailAddress", "contactNumber", "area", "postCode", "emergency contact (name, contactNumber, relationship)"]);
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
                emergencyContact: {
                    name: "TestContactName",
                    contactNumber: "07928153234",
                    relationship: "TestContactRelationship"
                }
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
                emergencyContact: {
                    name: "TestContactName",
                    contactNumber: "07928153234",
                    relationship: "TestContactRelationship"
                }
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
                emergencyContact: {
                    name: "TestContactName",
                    contactNumber: "07928153234",
                    relationship: "TestContactRelationship"
                }
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
                emergencyContact: {
                    name: "TestContactName",
                    //contactNumber: "07928153234",
                    relationship: "TestContactRelationship"
                }
            }
            var missingValues = playerController.playerGetMissingValues(newPlayer);
            expect(missingValues).to.deep.equal(["lastName", "student", "area", "emergencyContact.contactNumber"]);
        });
    });
    it('should get all the players', function (done) {
        var playerFindAllStubb = sandbox.stub(Player, 'findAll');
        playerFindAllStubb.returnsPromise().resolves([testPlayer1, testPlayer2]);

        expect(playerController.getAllPlayers()).to.eventually.deep.equal([testPlayer1, testPlayer2]).notify(done);
    });
    it('should get a player by ID', function (done) {
        var playerFindStubb = sandbox.stub(Player, 'find');
        playerFindStubb.returnsPromise().resolves(testPlayer1);

        var getPlayerProm = playerController.getPlayer(17);
        expect(playerFindStubb.calledWith({ where: { id: 17 } })).to.be.true;
        expect(getPlayerProm).to.eventually.deep.equal(testPlayer1).notify(done);
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
        var templayer = Player.build(newPlayer);
        var tempEmergencyContact = EmergencyContact.build({
            name: "TestContactName",
            contactNumber: "07928153234",
            relationship: "TestContactRelationship"
        });
        var playerCreateStub = sandbox.stub(Player, 'create');
        var emergencyCreateStub = sandbox.stub(EmergencyContact, 'create');

        playerCreateStub.returnsPromise().resolves(templayer);
        emergencyCreateStub.returnsPromise().resolves(tempEmergencyContact);

        var playerSpy = sinon.spy(templayer, "addEmergencyContact");

        playerController.createPlayer(newPlayer).then(function (player) {
            //  console.log('in createPlayer then');
            expect(playerSpy.calledWith(tempEmergencyContact)).to.be.true;
            expect(player).to.equal(templayer);
            done();
        })
    });
    it('should add an emergency contact to a player', function (done) {
        var ecd = {
            name: "John Test Smith",
            contactNumber: "0783726372",
            relationship: "There is no relationship"
        }
        var tempPlayer = Player.build(testPlayer1);
        var tempEC = EmergencyContact.build(ecd);

        var playerSpy = sinon.spy(tempPlayer, "addEmergencyContact");
        var emergencyCreateStub = sandbox.stub(EmergencyContact, 'create');

        emergencyCreateStub.returnsPromise().resolves(tempEC)

        playerController.addEmergencyContactToPlayer(tempPlayer, ecd).then(function (player) {
            expect(playerSpy.calledWith(tempEC)).to.be.true;
            expect(player).to.deep.equal(tempPlayer);
            done();
        });
    });
    it('should add an emergency contact to a player found by ID', function (done) {
        var ecd = {
            name: "John Test Smith",
            contactNumber: "0783726372",
            relationship: "There is no relationship"
        }
        var tempPlayer = Player.build(testPlayer1);
        var tempEC = EmergencyContact.build(ecd);

        var playerStub = sandbox.stub(Player, 'find');
        var emergencyCreateStub = sandbox.stub(EmergencyContact, 'create');

        playerStub.returnsPromise().resolves(tempPlayer);
        emergencyCreateStub.returnsPromise().resolves(tempEC);

        var playerSpy = sinon.spy(tempPlayer, "addEmergencyContact");

        playerController.addEmergencyContactToPlayerByID(83, ecd).then(function (player) {
            expect(playerSpy.calledWith(tempEC)).to.be.true;
            expect(player).to.deep.equal(tempPlayer);
            done();
        });
    });
    it.skip('should remove an old emergency contact, but not if it\'s the only one left', function () {

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
    it.skip('should update the players area', function () {

    });
});
