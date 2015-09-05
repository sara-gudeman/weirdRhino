var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var MainSearchBar = require('../src/components/MainSearchBar.jsx');

describe('MainSearchBar', function() {
  var renderedComponent;
  var inputComponent;

  beforeEach(function() {
    renderedComponent = TestUtils.renderIntoDocument(<MainSearchBar />);
    inputComponent = TestUtils.findRenderedDOMComponentWithTag(
      renderedComponent,
      'input'
    );

    this.inputElement = inputComponent.getDOMNode();
  });

  it('renders with input component', function() {
    expect(React.findDOMNode(renderedComponent)).toBeTruthy();
  });

  it('initializes with an empty search string', function() {
    expect(this.inputElement.value).toBe('');
  });
});