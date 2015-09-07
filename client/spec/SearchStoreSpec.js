var rewire = require('rewire');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

beforeEach(function () {
  const AppDispatcher = require('../src/dispatcher/AppDispatcher');
  spyOn(AppDispatcher, 'register');
  this.SearchStore = rewire('../src/stores/SearchStore');
  this._getSearchResults = this.SearchStore.__get__('_getSearchResults');
  this._searchResults = this.SearchStore.__get__('_searchResults');
});

describe('SearchStore', function () {
  it('should be an object', function() {
    expect(typeof this.SearchStore).toBe('object');
  });
  it('should have all the necessary methods', function() {
    expect(typeof this.SearchStore.emitChange).toBe('function');
    expect(typeof this.SearchStore.addChangeListener).toBe('function');
    expect(typeof this.SearchStore.removeChangeListener).toBe('function');
    expect(typeof this.SearchStore.get).toBe('function');
  });
  it('should return searchResults object from get method', function() {
    expect(this.SearchStore.get()).toEqual(this._searchResults);
  });
  it('should emit change when emitChange is called', function() {
    // call emit change
    // check to see if listener was triggered
  });
});