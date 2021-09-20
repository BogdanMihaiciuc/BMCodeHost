declare class TWEvent extends Function {
    private _isThingworxEvent: true;
}

type Filter<B, T> = {
    [Key in keyof B]:
        B[Key] extends T ? Key: never;
}

type CompatibleKeys<B, T> = Filter<B, T>[keyof B];

type NonMethod<Source> = { [K in keyof Source]: Source[K] extends Function ? never : K }[keyof Source];

type ProtoOf<T> = Pick<T, keyof T>

/**
 * A class that represents a property aspect.
 */
declare class TWRuntimePropertyAspect {
    private static aspectWithKeyAndValue(key: string, value: any): TWRuntimePropertyAspect;

    private _key: string;

    private _value: any;
}

/**
 * An aspect that makes the property it's applied to a binding source at design time.
 */
const bindingSource: TWRuntimePropertyAspect;

/**
 * An aspect that makes the property it's applied to a binding target at design time.
 */
const bindingTarget: TWRuntimePropertyAspect;

/**
 * Constructs and returns a property aspect that can be used to 
 * specify a method that can verify binding information before updating the property.
 * 
 * This must be the name of a method on the widget class that received the following parameters:
 * - **`value`**:     Represents the value that is about to be assigned to the property.
 * - **`info`**:      The complete `UpdatePropertyInfo` object.
 * 
 * The method must return a `boolean` that specify whether the binding update should occur or not.
 * @param {string} name         The name of the method that will handle this.
 * @return {TWPropertyAspect}   A property aspect.
 */
function canBind(name: string): TWRuntimePropertyAspect;

/**
 * Constructs and returns a property aspect that can be used to 
 * specify a method that will be invoked after the property has been updated because of a binding.
 * Unlike the regular setter, this method will not be invoked when the property is assigned normally.
 * 
 * When this method is invoked, the new value will have been assigned to the property.
 * 
 * This must be the name of a method on the widget class that received the following parameters:
 * - **`previousValue`**:       Represents the property's previous value.
 * - **`info`**:                The complete `UpdatePropertyInfo` object.
 * 
 * The method is not expected to return any value.
 * @param {string} name         The name of the method that will handle this.
 * @return {TWPropertyAspect}   A property aspect.
 */
function didBind(name: string): TWRuntimePropertyAspect;

/**
 * Constructs and returns a property aspect that specifies what infotable the widget
 * should look into when displaying the available fields, when the baseType is set to `'FIELDNAME'`.
 * This must be the name of one of this widget's infotable properties.
 * @param {string} name                         The name of the infotable property.
 * @return {TWSourceInfotablePropertyAspect}    A property aspect.
 */
function sourcePropertyName(name: string): TWRuntimePropertyAspect;

/**
 * Constructs and returns a property aspect that specifies what infotable
 * property this rendering is based upon when the baseType is set to `'RENDERERWITHFORMAT'`. 
 * This must be the name of one of this widget's infotable properties.
 * @param {string} name         The name of the infotable property.
 * @return {TWPropertyAspect}   A property aspect.
 */
function baseTypeInfotableProperty(name: string): TWRuntimePropertyAspect;

/**
 * Returns a decorator that binds the class member it is applied to to a property definition.
 * @param  {...TWRuntimePropertyAspect} args        An optional list of property aspects to apply to this property.
 * @return {any}                                    A decorator.
 */
function property(...args: TWRuntimePropertyAspect[]): <T extends TWRuntimeWidget, K extends NonMethod<T>, V>(target: T, key: K, descriptor?: V extends (...args: any[]) => any ? never : V) => void;

/**
 * Binds the class member it is applied to to the a property.
 */
function property<T extends TWRuntimeWidget, K extends NonMethod<T>, V>(target: T, key: K, descriptor?: V extends (...args: any[]) => any ? never : V): void;

/**
 * A decorator that binds the given property to the service with the same name as the method.
 */
function service<T extends TWRuntimeWidget, K extends keyof T, F extends T[K]>(target: T, key: CompatibleKeys<T, (...args: any[]) => any>, descriptor?: TypedPropertyDescriptor<(...args: any[]) => any>): void;

/**
 * A decorator that marks the given property as an event.
 */
const event: <T extends TWRuntimeWidget, K extends keyof T, F extends T[K]>(target: T, key: CompatibleKeys<T, TWEvent>, descriptor?: TypedPropertyDescriptor<TWEvent>) => void;

/**
 * A decorator that marks the given property as an event.
 */
const twevent: <T extends TWRuntimeWidget, K extends keyof T, F extends T[K]>(target: T, key: CompatibleKeys<T, TWEvent>, descriptor?: TypedPropertyDescriptor<TWEvent>) => void;

/**
* A decorator that makes a given widget class available to Thingworx.
* @param widget     The widget the decorator is applied to.
*/
function TWWidgetDefinition<T extends new(...args: {}[]) => TWRuntimeWidget>(widget: T): void;