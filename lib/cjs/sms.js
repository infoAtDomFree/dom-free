"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mode = exports.Clear = exports.AllItems = exports.Item = exports.Register = void 0;
class RegisteredMockItem {
    constructor(name) {
        this.mockAttr = {};
        this.mockCss = {};
        this.events = {};
        this.is_dictionary = function (obj) {
            if (!obj)
                return false;
            if (Array.isArray(obj))
                return false;
            if (obj.constructor != Object)
                return false;
            return true;
        };
        this.name = name;
        this.mockAttr = {};
        this.events = {};
        this.classes = "";
        this.mockCss = {};
    }
    attr(attrName, value) {
        if (value === undefined) {
            return this.mockAttr[attrName];
        }
        this.mockAttr[attrName] = value;
    }
    registerEvent(eventName, func) {
        this.events[eventName] = func;
        return this;
    }
    fireEvent(eventName) {
        this.events[eventName]();
    }
    width(newVal) {
        if (newVal === undefined) {
            return this.attr("!width");
        }
        this.attr("!width", newVal);
    }
    height(newVal) {
        if (newVal === undefined) {
            return this.attr("!height");
        }
        this.attr("!height", newVal);
    }
    text(newVal) {
        return this.attr("!text", newVal);
    }
    html(newVal) {
        return this.attr("!html", newVal);
    }
    val(newVal) {
        return this.attr("value", newVal);
    }
    addClass(className) {
        if (this.classes.indexOf(className) < 0) {
            this.classes += " " + className;
        }
        return this;
    }
    removeClass(className) {
        this.classes = this.classes.replace(className, "");
        return this;
    }
    toggleClass(parm1, parm2) {
        if (parm2 !== undefined) {
            throw "state parameter to toggleClass is not supported";
        }
        if (typeof (parm1) == 'string') {
            parm1.split(' ').forEach(c => {
                if (c.length === 0) {
                    // do nothing...
                }
                else if (this.classes.indexOf(c) < 0) {
                    this.addClass(c);
                }
                else {
                    this.removeClass(c);
                }
            });
        }
        else if (Array.isArray(parm1)) {
            throw 'toggleClass does not support array arguments at this time';
        }
        else {
            throw 'toggleClass does not support function arguments at this time';
        }
    }
    css(parm1, parm2) {
        if (parm2 === undefined) {
            if (typeof (parm1) == 'string') {
                return this.mockCss[parm1];
            }
            else if (this.is_dictionary(parm1)) {
                var keys = Object.keys(parm1);
                keys.forEach(key => {
                    let value = parm1[key];
                    this.css(key, value);
                });
            }
        }
        else if (typeof (parm1) == 'string') {
            this.mockCss[parm1] = parm2;
        }
    }
    hide() {
        this.attr('!hidden', 'true');
        return this;
        // how is this the same as display: none;, and how is it different?
    }
    show() {
        this.attr('!hidden', 'false');
        return this;
    }
    toggle() {
        if (this.attr('!hidden') === "true") {
            this.show();
        }
        else {
            this.hide();
        }
        return this;
    }
}
class RegisteredJQueryItem {
    constructor(name, $selector) {
        this.is_dictionary = function (obj) {
            if (!obj)
                return false;
            if (Array.isArray(obj))
                return false;
            if (obj.constructor != Object)
                return false;
            return true;
        };
        this.$selector = $selector;
        this.name = name;
    }
    registerEvent(eventName, func) {
        this.$selector.on(eventName, () => {
            func();
        });
        return this;
    }
    attr(attrName, value) {
        if (value === undefined) {
            return this.$selector.attr(attrName);
        }
        this.$selector.attr(attrName, value);
    }
    width(newVal) {
        if (newVal === undefined) {
            return this.$selector.width();
        }
        this.$selector.width(newVal);
    }
    height(newVal) {
        if (newVal === undefined) {
            return this.$selector.height();
        }
        this.$selector.height(newVal);
    }
    text(newVal) {
        if (newVal === undefined) {
            return this.$selector.text();
        }
        this.$selector.text(newVal);
    }
    html(newVal) {
        if (newVal === undefined) {
            return this.$selector.html();
        }
        this.$selector.html(newVal);
    }
    val(newVal) {
        if (newVal === undefined) {
            return this.$selector.val();
        }
        this.$selector.val(newVal);
    }
    addClass(className) {
        this.$selector.addClass(className);
    }
    removeClass(className) {
        this.$selector.removeClass(className);
    }
    toggleClass(params, state) {
        if (state !== undefined) {
            throw "state parameter to toggleClass is not supported";
        }
        this.$selector.toggleClass(params);
    }
    css(parm1, parm2) {
        if (parm2 === undefined) {
            if (typeof (parm1) == 'string') {
                return this.$selector.css(parm1);
            }
            else if (this.is_dictionary(parm1)) {
                var keys = Object.keys(parm1);
                keys.forEach(key => {
                    let value = parm1[key];
                    this.$selector.css(key, value);
                });
            }
        }
        else if (typeof (parm1) == 'string') {
            this.$selector.css(parm1, parm2);
        }
    }
    hide() {
        this.$selector.hide();
    }
    show() {
        this.$selector.show();
    }
    toggle() {
        this.$selector.toggle();
    }
}
class StateHolder {
    register(name, $selector) {
        StateHolder.registry[name] = new RegisteredJQueryItem(name, $selector);
        return StateHolder.registry[name];
    }
    registerMock(name) {
        StateHolder.registry[name] = new RegisteredMockItem(name);
        return StateHolder.registry[name];
    }
    item(name) {
        return StateHolder.registry[name];
    }
    all() {
        return StateHolder.registry;
    }
    clear() {
        StateHolder.registry = {};
    }
    setMode(mode) {
        StateHolder.mode = mode;
    }
    getMode() {
        return StateHolder.mode;
    }
}
StateHolder.mode = "Normal";
function Register(name, $selector) {
    let state = new StateHolder();
    if ($selector === undefined || state.getMode() === "Mock") {
        return state.registerMock(name);
    }
    return state.register(name, $selector);
}
exports.Register = Register;
function Item(name) {
    let state = new StateHolder();
    return state.item(name);
}
exports.Item = Item;
function AllItems() {
    let state = new StateHolder();
    return state.all();
}
exports.AllItems = AllItems;
function Clear() {
    let state = new StateHolder();
    state.clear();
}
exports.Clear = Clear;
function Mode(mode) {
    let state = new StateHolder();
    state.setMode(mode);
}
exports.Mode = Mode;
