'use strict';

describe('Profile Model', function() {
    //Clean up after each test.
    afterEach(function() {
        simple.restore();
    });

    describe('Instance Methods', function() {
        describe('Clear', function() {
            it('should clear all the data', function() {
                var profile = new Profile();
                profile.playerName(ProfileFixture.playerName);
                profile.playerName().should.equal(ProfileFixture.playerName);
                profile.clear();
                profile.playerName().should.equal('');
            });
        });

        describe('Import', function() {
            it('should import an object with all the info supplied.', function() {
                var profile = new Profile();
                profile.importValues(ProfileFixture);
                profile.playerName().should.equal(ProfileFixture.playerName);
                profile.characterId().should.equal(ProfileFixture.characterId);
            });
        });

        describe('Export', function() {
            it('should yield an object with all the info supplied.', function() {
                var profile = new Profile();
                profile.importValues(ProfileFixture);
                var values = profile.exportValues();

                profile.characterId().should.equal(values.characterId);
                profile.playerName().should.equal(values.playerName);
            });
        });

        describe('Character Summary', function() {
            it('should return a a brief summary of the character.', function() {
                var profile = new Profile();

                //Empty
                profile.characterSummary().should.equal('A unique character, handcrafted from the finest bits the internet can provide.');

                //Full
                profile.importValues(ProfileFixture);
                profile.characterSummary().should.equal('A level 2 Dragonborn Wizard by Joe Blow');
            });
        });

        describe('Save', function() {
            it('should call the token save.', function() {
                var profile = new Profile();
                var spy = simple.mock(profile.ps, 'save');
                profile.save();
                spy.called.should.equal(true);
            });
        });
    });
    describe('Find By', function() {
        it('Should return a list of image models matching the given id.', function() {
            //Empty
            simple.mock(PersistenceService, 'findBy').returnWith([new Profile()]);
            Profile.findBy('someid').length.should.equal(0);

            //Filled
            simple.mock(PersistenceService, 'findAll').returnWith([new Profile(), new Profile()].map(function(e, i, _) {
                e.characterId('someid');
                return e;
            }));
            Profile.findBy('someid').length.should.equal(2);

        });
    });
});
