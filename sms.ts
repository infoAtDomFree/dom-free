interface JQUERY {
    addClass:	(	className: string		) => void;
    attr:	(	attrName: string,	value?	: string|number	) => string|number;
    css:	(	
        parm1 : string
            |   {
                    [key:string]: 
                    string | number
                }, 
        parm2?	: string|number	) => string|number;
    height:	(	newVal?: string|number				) => string|number;
    hide:	(	) => void;
    html:	(	newVal?: string				) => string;
    on:	(	
        eventName: string, func: () => void) => void;
    removeClass:	(	className: string) => void;
    show:	(					) => void;
    text:	(newVal?	: string) => string|undefined;
    toggle:	(						) => void;
    toggleClass: (param:string) => void;
    val:	(newVal?: string|number) => string|number|undefined;
    width:	(newVal?: string|number						) => string|number;
    
}




class RegisteredMockItem {
    readonly name :string;
    classes: string;
    
    mockAttr : { [key: string]: string | number } = {};
    mockCss : { [key: string]: string|number } = {};
    events : { [key: string]: () => void } = {};
    
    constructor(name:string){
        this.name = name;
        this.mockAttr =  {};
        this.events = {};
        this.classes = "";
        this.mockCss = {};
    }
    attr(attrName : string, value? : string | number){
        if (value === undefined){
            return this.mockAttr[attrName];
        }
        this.mockAttr[attrName] = value;
    }
    
    registerEvent(eventName:string, func: ()=>void){
        this.events[eventName] = func;
        return this;
    }
    fireEvent(eventName:string){
        this.events[eventName]();
    }
    width(newVal?: string): string| number| undefined{
        if (newVal === undefined){
            return this.attr("!width");
        }
        this.attr("!width", newVal);
    }
    height(newVal?: string): string| number| undefined{
        if (newVal === undefined){
            return this.attr("!height");
        }
        this.attr("!height", newVal);

    }
    text(newVal?: string): string|number|undefined{
        return this.attr("!text", newVal);
    }
    html(newVal?:string): string|number| undefined{
        return this.attr("!html", newVal);
    }
    val(newVal?: string|number):string|number|undefined{
        return this.attr("value", newVal);
    }
    addClass(className: string): RegisteredItem{
        if (this.classes.indexOf(className) < 0){
            this.classes += " " + className;
        }
        return this;
    }
    removeClass(className: string): RegisteredItem{
        this.classes = this.classes.replace(className, "");
        return this;
    }
    toggleClass(parm1: string|Array<string>|((index:number, className:string, state:boolean ) => string|string[]), parm2?: boolean): void{
        if (parm2 !== undefined){
            throw "state parameter to toggleClass is not supported"
        }
        if (typeof(parm1) == 'string'){
            parm1.split(' ').forEach(c => {
                if (c.length === 0){
                    // do nothing...
                } else if (this.classes.indexOf(c) < 0){
                    this.addClass(c);
                } else {
                    this.removeClass(c);            
                }
            });
        } else if (Array.isArray(parm1)){
            throw 'toggleClass does not support array arguments at this time';
        } else{
            throw 'toggleClass does not support function arguments at this time'
        }
        
    }
    css(
            parm1 : string
                |   {
                        [key:string]: 
                        string
                        |number
                    }, 
            parm2?: string|number
        ) : string|number|undefined {
        if (parm2 === undefined){
            if (typeof(parm1) == 'string') {
                return this.mockCss[parm1];
            } else if (this.is_dictionary(parm1)){
                var keys : string[] = Object.keys(parm1);
                
                keys.forEach(key => {
                    let value:string|number = parm1[key];
                    this.css(key, value);
                });
            }
        } else if (typeof(parm1) == 'string') {
            this.mockCss[parm1] = parm2;
        }
    }
    hide() : RegisteredMockItem{
        this.attr('!hidden', 'true');
        return this;
        // how is this the same as display: none;, and how is it different?
    }
    show() : RegisteredMockItem{
        this.attr('!hidden', 'false');
        return this;
    }
    toggle() : RegisteredMockItem{
        if (this.attr('!hidden') === "true"){
            this.show();
        } else{
            this.hide();
        }
        return this;
    }
    is_dictionary = function (obj: any) : boolean {
        if(!obj) return false;
        if(Array.isArray(obj)) return false;
        if(obj.constructor != Object) return false;
        return true;
    };

}
class RegisteredJQueryItem {
    readonly name: string;
    readonly $selector: JQUERY;
    constructor(name: string, $selector:JQUERY){
        this.$selector = $selector;
        this.name = name;
    }
    registerEvent(eventName: string, func: () => void): RegisteredItem{
        this.$selector.on(eventName, () => {
            func()
        });
        return this;
    }

    attr(attrName: string, value: string| number): number | string | undefined{
        if (value === undefined){
            return this.$selector.attr(attrName);
        }
        this.$selector.attr(attrName, value);

    }
    width(newVal?: string|number): string|number|undefined{
        if (newVal === undefined){
            return this.$selector.width();
        }
        this.$selector.width(newVal);
    }
    height(newVal?: string|number):string|number|undefined{
        if (newVal === undefined){
            return this.$selector.height();
        }
        this.$selector.height(newVal);
    }
    text(newVal?: string): string| undefined{
        if (newVal === undefined){
            return this.$selector.text();
        }
        this.$selector.text(newVal);
    }
    html(newVal?:string): string | undefined{
        if (newVal === undefined){
            return this.$selector.html();
        }
        this.$selector.html(newVal);
    }
    val(newVal? :string|number): string | string[] | number | undefined{
        if (newVal === undefined){
            return this.$selector.val();
        }
        this.$selector.val(newVal);
    }
    addClass(className: string): void{
        this.$selector.addClass(className);

    }
    removeClass(className: string): void{
        this.$selector.removeClass(className);
    }
    toggleClass(params: string, state?: boolean): void{
        if (state !== undefined){
            throw "state parameter to toggleClass is not supported"
        }
        
        this.$selector.toggleClass(params);
    }
    css(
        parm1 : string
            |   {
                    [key:string]: 
                    string | number
                }, 
        parm2?: string|number
    ) : string|number|undefined {
    if (parm2 === undefined){
        if (typeof(parm1) == 'string') {
            return this.$selector.css(parm1);
        } else if (this.is_dictionary(parm1)){
            var keys : string[] = Object.keys(parm1);
            
            keys.forEach(key => {
                let value:string|string[]|number = parm1[key];
                this.$selector.css(key, value);
            });
        }
    } else if (typeof(parm1) == 'string') {
        this.$selector.css(parm1, parm2);
    }
}
    hide(): void{
        this.$selector.hide();
    }
    show(): void{
        this.$selector.show();
    }
    toggle(): void{
        this.$selector.toggle();
    }
    is_dictionary = function (obj: any) : boolean {
        if(!obj) return false;
        if(Array.isArray(obj)) return false;
        if(obj.constructor != Object) return false;
        return true;
    };
}

type RegisteredItem = RegisteredJQueryItem | RegisteredMockItem;

class StateHolder {
    static registry: {[key:string]: RegisteredItem};
    static mode = "Normal";
    register(name: string, $selector: JQUERY): RegisteredItem {
        StateHolder.registry[name] = new RegisteredJQueryItem(name, $selector);
        return StateHolder.registry[name];
    }
    registerMock(name:string): RegisteredItem {
        StateHolder.registry[name] = new RegisteredMockItem(name);
        return StateHolder.registry[name];
    }
    item(name: string): RegisteredItem{
        return StateHolder.registry[name];
    }
    all(): {[key:string]: RegisteredItem} {
        return StateHolder.registry;
    }
    clear(): void{
        StateHolder.registry = {};
    }
    setMode(mode: string): void{
        StateHolder.mode = mode;
    }
    getMode(): string{
        return StateHolder.mode;
    }
}

function Register(name:string, $selector:JQUERY): RegisteredItem{
    let state = new StateHolder();
    if ($selector === undefined || state.getMode() === "Mock"){
        return state.registerMock(name);
    }
    return state.register(name, $selector);
}
function Item(name: string): RegisteredItem{
    let state = new StateHolder();
    return state.item(name);
}
function AllItems(): {[key:string]: RegisteredItem}{
    let state = new StateHolder();
    return state.all();
}
function Clear(): void{
    let state = new StateHolder();
    state.clear();
}
function Mode(mode:string):void{
    let state = new StateHolder();
    state.setMode(mode);
}

export  { 
    Register,
    Item,
    AllItems,
    Clear,
    Mode
}
