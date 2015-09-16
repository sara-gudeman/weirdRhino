var React = require('react/addons');
var assert = require('assert');
var TestUtils = React.addons.TestUtils;

describe('AppContainer', function() {

  before(function() {
    // this test is broken because of new authorization feature
    var AppContainer = require('../src/components/AppContainer.jsx');
    var shallowRenderer = TestUtils.createRenderer();

    shallowRenderer.render(React.createElement(AppContainer, {className: 'AppContainer'}));

    var renderedComponent = shallowRenderer.getRenderOutput();
    this.renderedComponent = renderedComponent;
  });

  it('has a containing div', function() {
    assert(this.renderedComponent.type === 'div');
  });

  describe('AppContainer necessary components', function() {

    it('has a nav bar', function() {
      var NavBarFound = this.renderedComponent.props.children.filter(function(element) {
        return element.type.displayName === 'NavBar';
      });
      assert(NavBarFound.displayName !== 'NavBar');
    });

    it('has a router', function() {
      var routerFound = this.renderedComponent.props.children.filter(function(element) {
        return element.type.contextTypes !== undefined && element.type.contextTypes.router !== undefined;
      });
      assert(routerFound.length !== 0);
    });

  });
});