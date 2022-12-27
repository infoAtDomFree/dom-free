interface JQUERY {
    addClass: (className: string) => void;
    attr: (attrName: string, value?: string | number) => string | number;
    css: (parm1: string | {
        [key: string]: string | number;
    }, parm2?: string | number) => string | number;
    height: (newVal?: string | number) => string | number;
    hide: () => void;
    html: (newVal?: string) => string;
    on: (eventName: string, func: () => void) => void;
    removeClass: (className: string) => void;
    show: () => void;
    text: (newVal?: string) => string | undefined;
    toggle: () => void;
    toggleClass: (param: string) => void;
    val: (newVal?: string | number) => string | number | undefined;
    width: (newVal?: string | number) => string | number;
}
declare class RegisteredMockItem {
    readonly name: string;
    classes: string;
    mockAttr: {
        [key: string]: string | number;
    };
    mockCss: {
        [key: string]: string | number;
    };
    events: {
        [key: string]: () => void;
    };
    constructor(name: string);
    attr(attrName: string, value?: string | number): string | number | undefined;
    registerEvent(eventName: string, func: () => void): this;
    fireEvent(eventName: string): void;
    width(newVal?: string): string | number | undefined;
    height(newVal?: string): string | number | undefined;
    text(newVal?: string): string | number | undefined;
    html(newVal?: string): string | number | undefined;
    val(newVal?: string | number): string | number | undefined;
    addClass(className: string): RegisteredItem;
    removeClass(className: string): RegisteredItem;
    toggleClass(parm1: string | Array<string> | ((index: number, className: string, state: boolean) => string | string[]), parm2?: boolean): void;
    css(parm1: string | {
        [key: string]: string | number;
    }, parm2?: string | number): string | number | undefined;
    hide(): RegisteredMockItem;
    show(): RegisteredMockItem;
    toggle(): RegisteredMockItem;
    is_dictionary: (obj: any) => boolean;
}
declare class RegisteredJQueryItem {
    readonly name: string;
    readonly $selector: JQUERY;
    constructor(name: string, $selector: JQUERY);
    registerEvent(eventName: string, func: () => void): RegisteredItem;
    attr(attrName: string, value: string | number): number | string | undefined;
    width(newVal?: string | number): string | number | undefined;
    height(newVal?: string | number): string | number | undefined;
    text(newVal?: string): string | undefined;
    html(newVal?: string): string | undefined;
    val(newVal?: string | number): string | string[] | number | undefined;
    addClass(className: string): void;
    removeClass(className: string): void;
    toggleClass(params: string, state?: boolean): void;
    css(parm1: string | {
        [key: string]: string | number;
    }, parm2?: string | number): string | number | undefined;
    hide(): void;
    show(): void;
    toggle(): void;
    is_dictionary: (obj: any) => boolean;
}
type RegisteredItem = RegisteredJQueryItem | RegisteredMockItem;
declare function Register(name: string, $selector: JQUERY): RegisteredItem;
declare function Item(name: string): RegisteredItem;
declare function AllItems(): {
    [key: string]: RegisteredItem;
};
declare function Clear(): void;
declare function Mode(mode: string): void;
export { Register, Item, AllItems, Clear, Mode };
//# sourceMappingURL=sms.d.ts.map