var React = require('react/addons');
var assert = require('assert');
var should = require('should');
var MainSearchBar = require('../client/src/components/MainSearchBar');
var TestUtils = React.addons.TestUtils;
var rewire = require('rewire');
var sinon = require('sinon');
var rewire = require('rewire');

describe('MainSearchBar', function(){
  before('render and locate element', function() {
    // var searchSpy = sinon.spy();
    var MainSearchBar = rewire('../client/src/components/MainSearchBar');
    // MainSearchBar.__set__.handleSearchChange({
    //   event: 'change',
    //   value: 'javascript'
    // });
    var renderedComponent = TestUtils.renderIntoDocument(
      <MainSearchBar/>
    );

    // Searching for <input> tag within rendered React component
    // Throws an exception if not found
    var inputComponent = TestUtils.findRenderedDOMComponentWithTag(
      renderedComponent,
      'input'
    );

    this.inputElement = inputComponent.getDOMNode();
  });

  describe('Basic functionality', function() {
    it('<input> should be of type "search"', function() {
      assert(this.inputElement.getAttribute('type') === 'search');
    });

    it('<input> should be empty on initialization', function() {
      assert(this.inputElement.value === '');
    });
  });
  describe('Interactive components', function() {
    it('should accept text input', function() {
      // .... how to simulate each key input ? ....
      // this.inputElement.value = 'javascript';
      // this might be circular....
      TestUtils.Simulate.change(this.inputElement);
    });

    it('fires a dom event on each keystroke', function (done) {
    //   TestUtils.Simulate.
      done();
    });
    // on key down should handle search change
  });

  // it should be a valid react component
  // it should contain an input tag
  // the input tag should be of type submit
  // it should be empty upon initialization
  // it should trigger event on every keystroke
  // ...how in depth with the above statement?


});


describe('SearchStore', function() {
  before('set up and spy on dispatcher', function() {
    var AppDispatcher = require('../client/src/dispatcher/AppDispatcher');
    // spyOn(AppDispatcher, 'register');
    var spy = sinon.spy(AppDispatcher, 'register');
    this.SearchStore = rewire('../client/src/stores/SearchStore');
    this._getSearchResults = this.SearchStore.__get__('_getSearchResults');
    // this.get = this.SearchStore.get();
  });

  it('submits a search query based on user input', function() {});
});