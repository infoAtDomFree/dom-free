
import * as SMS from '../lib/esm/sms.mjs';
import * as Library from '../lib.js';

let lib;
let sms;

let firstName;
let lastName;

describe('new mock setup', function() {

	beforeEach(function() {
		sms = SMS;
		sms.Clear();
		sms.Mode('Mock');
		lib = Library.default;
		sms.Register('allDivs', 'div');
		firstName = sms.Register("firstName", "#fname").attr('value', 'George');
		lastName = sms.Register("lastName", "#lname").attr('value', 'Washington');
		sms.Register("heading", "#heading1");
		sms.Register("theDiv", "#theDiv");
		sms.Register("greenHeading", "#greenHeading").registerEvent("click", lib.MakeHeadingGreen);
		sms.Register("italicHeading", "#italicHeading").registerEvent("click", lib.MakeHeadingItalic);
		sms.Register("shortDiv", "#shortDiv").registerEvent("click", lib.MakeDivShort);
		sms.Register("hiddenDiv", "#hiddenDiv").registerEvent("click", lib.MakeDivHidden);
		sms.Register("changeHTML", "#changeHTML").registerEvent("click", lib.ChangeHtml);
		sms.Register("removeClass", "#removeClass").registerEvent("click", lib.MakeDivTextBlack);
		sms.Register("showDiv", "#showDiv").registerEvent("click", lib.ShowDiv);
		sms.Register("changeText", "#changeText").registerEvent("click", lib.ChangeText);
		sms.Register("toggleDiv", "#toggleDiv").registerEvent("click", lib.ToggleDiv);
		sms.Register("moveFirstToLast", "#moveFirstToLast").registerEvent("click", lib.MoveFirstToLast);
		sms.Register("narrowDiv", "#narrowDiv").registerEvent("click", lib.MakeDivNarrow);
		sms.Register("toggleClasses", "#toggleClasses").registerEvent("click", lib.ToggleClasses);
	})

	it('should be able to Make heading green when clicked', function() {
		sms.Item('greenHeading').fireEvent('click');
		var target = sms.Item('heading');
		expect(target.classes).toBe(' green')
    });
	it('should be able to Make heading italic when clicked', function() {
		sms.Item('italicHeading').fireEvent('click');
		var target = sms.Item('heading');
		expect(target.mockCss['font-style']).toBe('italic')
    });
	it('should be able to Make DIV shorter when clicked', function() {
		sms.Item('shortDiv').fireEvent('click');
		var target = sms.Item('theDiv');
		expect(target.attr("!height")).toBe('32px')
    });
	it('should be able to Hide DIV when clicked', function() {
		sms.Item('hiddenDiv').fireEvent('click');
		var target = sms.Item('theDiv');
		expect(target.attr('!hidden')).toBe('true')
    });
	it('should be able to Change DIV HTML when clicked', function() {
		sms.Item('changeHTML').fireEvent('click');
		var target = sms.Item('theDiv');
		expect(target.attr('!html')).toBe('<p>This is new html</p>')
    });
	it('should be able to Make DIV text black when clicked', function() {
		sms.Item('removeClass').fireEvent('click');
		var target = sms.Item('theDiv');
		expect(target.classes).toBe('')
    });
	it('should be able to Show DIV when clicked', function() {
		sms.Item('showDiv').fireEvent('click');
		var target = sms.Item('theDiv');
		expect(target.attr('!hidden')).toBe('false')
    });
	it('should be able to Change DIV text when clicked', function() {
		sms.Item('changeText').fireEvent('click');
		var target = sms.Item('theDiv');
		expect(target.attr('!text')).toBe('this is new text')
    });
	it('should be able to Hide or Show DIV when clicked', function() {
		sms.Item('toggleDiv').fireEvent('click');
		var target = sms.Item('theDiv');
		expect(target.attr('!hidden')).toBe('true')
    });
	it('should be able to Copy First Name to Last Name when clicked', function() {
		sms.Item('moveFirstToLast').fireEvent('click');
		var target = sms.Item('lastName');
		expect(target.val()).toBe('George')
    });
	it('should be able to Make DIV narrow when clicked', function() {
		sms.Item('narrowDiv').fireEvent('click');
		var target = sms.Item('theDiv');
		expect(target.attr("!width")).toBe('300px')
    });
	it('should be able to toggle classes when clicked', function() {
		sms.Item('toggleClasses').fireEvent('click');
		var target = sms.Item('allDivs');
		expect(target.classes).toBe(' bold italic red');
	});



});

