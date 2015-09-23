var React = require('react/addons');
var assert = require('assert');
var TestUtils = React.addons.TestUtils;
var rewire = require('rewire');

describe('SearchStore', function() {
  before('set up and spy on dispatcher', function() {
    this.SearchStore = rewire('../src/stores/SearchStore');
    this._getSearchResults = this.SearchStore.__get__('_getSearchResults');
    this._searchResults = this.SearchStore.__get__('_searchResults');

    // sinon.spy($, 'ajax');
  });

  // after(function() {
  //   $.ajax.restore();
  // });

  it('should be an object', function() {
    assert(typeof this.SearchStore === 'object');
  });
  it('should have all the necessary methods', function() {
    assert(typeof this.SearchStore.emitChange === 'function');
    assert(typeof this.SearchStore.addChangeListener === 'function');
    assert(typeof this.SearchStore.removeChangeListener === 'function');
    assert(typeof this.SearchStore.get === 'function');
  });
  it('should return searchResults object from get method', function() {
    assert(this.SearchStore.get() === this._searchResults);
  });
  // it('should make an ajax call when _getSearchResults is called', function(done) {
  //   var searchEndpoints = {
  //     technologies: 'searchbytech',
  //     products: 'searchbyname'
  //   };
  //   var testObj = {
  //     searchMode: products,
  //     text: 'chase',
  //   };
  //   this._getSearchResults(testObj);
  //   expect($.ajax.calledOnce).to.be.false;
  // });
});
