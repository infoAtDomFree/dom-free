import * as SMS from './lib/esm/sms.mjs';
const Library = (() => {
    let sms = SMS;
    return {
        MakeHeadingGreen: () => sms.Item('heading').addClass('green'),
        MakeHeadingItalic: () => sms.Item('heading').css('font-style','italic'),
        MakeDivShort: () => sms.Item('theDiv').height('32px'),
        MakeDivHidden: () => sms.Item('theDiv').hide(),
        ChangeHtml: () => sms.Item('theDiv').html('<p>This is new html</p>'),
        MakeDivTextBlack: () => sms.Item('theDiv').removeClass('green'),
        ShowDiv: () => sms.Item('theDiv').show(),
        ChangeText: () => sms.Item('theDiv').text('this is new text'),
        ToggleDiv: () => sms.Item('theDiv').toggle(),
        MoveFirstToLast: () => sms.Item('lastName').val(sms.Item('firstName').val()),
        MakeDivNarrow: () => sms.Item('theDiv').width('300px'),
        ToggleClasses: () => sms.Item('allDivs').toggleClass("bold italic red"),
    };
})();

export default Library;




