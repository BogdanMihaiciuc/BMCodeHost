type Int = number;
type Integer = number;
type Float = number;
type Short = number;
type DOMNode = HTMLElement;
declare class JQuery {}
type $ = JQuery;
const YES = true;
const NO = false;
                
            
type BMCollectionViewUpdate = never;
type TimeoutToken = number;

declare class JQueryEventObject {}
type $event = JQueryEventObject;

declare class iScroll {}
declare class Monaco {}
declare class CodeMirror {}

declare namespace kiwi {
    class Variable {}
    class Expression {}
    class Solver {}
    class Constant {}
    class Constraint {}
}

/**
 * An interface representing an object whose key values are constrained to a generic type.
 */
declare interface Dictionary<V> {
    [key: string]: V;
}


/**
 * An interface implemented by classes that support copying.
 * Most CoreUI primitives implement this interface.
 */
declare interface BMCopying {
    /**
     * Returns a copy of this object. Only the properties
     * defined in the prototype will be present in the returned object,
     * and no other properties that may have been added after the object was created.
     * Additionally, properties that represent internal state will not be copied
     * over to the new instance.
     */
    copy(): ThisType<BMCopying>;
}

/**
 * An interface implemented by classes that support interpolation.
 * Most CoreUI primitives implement this interface.
 * Animatable types must also support copying.
 */
declare interface BMAnimating extends BMCopying {
    /**
     * Invoked by the CoreUI animation engine to obtain an interpolated
     * value between this object and the target object.
     * @param fraction          The animation fraction.
     * @param toValue           The object to which to interpolate. This must be of the same
     *                          type as the caller.
     */
    interpolatedValueWithFraction(fraction: number, {toValue}: {toValue: ThisType<BMAnimating>}): ThisType<BMAnimating>;
}

            



/**
 * The CoreUI package contains reusable generic functions and structures, usable as basic building blocks in different types of projects.
 * It includes basic objects such as point, size, rect, indexPath and color, as well as several globally defined functions.
 * 
 * Most objects defined here are copyable through the copy() method. The copy method will return a functionally identical object,
 * with the same property values as the source object, however only the properties defined in the source prototype are copied.
 * Other developer-added properties will not exist in the copied object.
 * 
 */
declare var BMCoreUI: string;



/**
 * Is set to YES if the current device is a touch device, otherwise it is set to NO.
 * 
 */
declare var BMIsTouchDevice: boolean;



/**
 * Returns the scrollbar size for the current platform.
 * @return 			The scrollbar size.
 * 
 */
declare function BMScrollBarGetSize(): number;



/**
 * Returns a CSS rule string from the given object.
 * @return 							A string.
 * 
 */
declare function BMCSSRuleWithSelector(selector: string, args: {important?: boolean | null | undefined, properties: any}): string;



/**
 * Adds an interaction to the target node that smoothly animates wheel events.
 * 													The speed with which the scroll speed decreases over time.
 * 													The acceleration with which the scrolling begins. This decreases
 * 													over time after the first scroll event fires.
 * 													The speed to add for successive scroll events.
 * 
 */
declare function BMAddSmoothMousewheelInteractionToNode(node: DOMNode, args?: {withDeceleration?: number | null | undefined, baseAcceleration?: number | null | undefined, speedIncrement?: number | null | undefined}): void;



/**
 * Allows using `$.Velocity.hook` by passing in a key-value object similar to $.fn.css
 * 
 */
declare function BMHook(element: $, properties: any): void;



/**
 * Copies the properties and their definitions from all objects given as paramters to the first object given as a parameter.
 * Unlike jQuery's `$.extend` or `Object.assign`, this function will also copy getters and setters.
 * The property descriptors will be copied in the order in which the parameters are specified. For example, if the third parameter has a property
 * with the same name as the second parameter, the target object will have the third parameter's definition of that property.
 * @return 						The target object.
 * 
 */
declare function BMExtend(target?: any | null | undefined, ...args: any[] | null | undefined): any;



/**
 * Copies the property values from all objects given as paramters to the first object given as a parameter. Only own properties will be copied.
 * The property values will be copied in the order in which the parameters are specified. For example, if the third parameter has a property
 * with the same name as the second parameter, the target object will have the third parameter's value for that property.
 * This will not redefine or reconfigure existing properties on the target object. For example, if any readonly property on the target object also exists on any of the
 * other objects, the target object's value for that property will not change.
 * @return 						The target object.
 * 
 */
declare function BMCopyProperties(target?: any | null | undefined, ...args: any[] | null | undefined): any;



/**
 * Creates and returns a string that represents the box-shadow to apply to an item to obtain
 * a material design-like box shadow for the given elevation.
 * Optionally, the shadow may also include a 1-pixel outline.
 * @return 							The box-shadow string.
 * 
 */
declare function BMShadowForElevation(elevation: number, args?: {drawOutline?: boolean | null | undefined, opacity?: number | null | undefined}): string;



/**
 * Converts the given element to a material design-like ripple that activates on mouse/touch down and up events on the given target element.
 * Though this is not required, it is recommended that the ripple element be an absolutely positioned direct descendant of the target element.
 * For best results, the ripple should also have its border radius set to 50% and its pointer-events set to none.
 * 
 */
declare function BMRippleMakeWithElement(ripple: $, args: {forTarget: $}): void;



/**
 * Creates a material design-like ripple that activates on mouse/touch down and up events on the given target element.
 * @return 										The newly created ripple element.
 * 
 */
declare function BMRippleMakeForTarget(target: $, args?: {withColor?: BMColor | string | null | undefined}): $;



/**
 * Returns a number that represents the linear interpolation of two numbers using a fraction.
 * 							Negative values will overshoot the source number and values greater than 1 will overshoot the target number.
 * @return 				The interpolated number.
 * 
 */
declare function BMNumberByInterpolatingNumbersWithFraction(source: number, target: number, fraction: number): number;



/**
 * Returns the target value or either of the specified interval bounds if the value overshoots any bound.
 * If the value is greater than the low bound and less than the high bound, the value is returned.
 * If the value is less than the low bound, the low bound is returned.
 * Otherwise, if the value is greater than the high bound, the high bound is returned.
 * @return 				A number.
 * 
 */
declare function BMNumberByConstrainingNumberToBounds(value: number, low: number, high: number): number;



/**
 * Returns an array that contains all of the given object's keys that contain the given value.
 * If no key contains the given value, an empty array will be returned.
 * The object must not be null or undefined.
 * @return 							An array of keys that match the given value.
 * 
 */
declare function BMKeysForValue(value: any | null | undefined, args: {inObject: any}): string[];



/**
 * Creates and returns an UUID string.
 * @return      An UUID.
 * 
 */
declare function BMUUIDMake(): string;



/**
 * A dictionary containing HTML entities for various commonly used symbols.
 * 
 */
declare class BMHTMLEntity {
	/**
	 * The HTML entity representing the bowen knot Command symbol.
	 *  
	 */
	static Command: BMHTMLEntity;

	/**
	 * The HTML entity representing the Option symbol.
	 *  
	 */
	static Option: BMHTMLEntity;

	/**
	 * The HTML entity representing the Shift symbol.
	 *  
	 */
	static Shift: BMHTMLEntity;

	/**
	 * The HTML entity representing the Caps-Lock symbol.
	 *  
	 */
	static CapsLock: BMHTMLEntity;

	/**
	 * The HTML entity representing the Backspace delete symbol.
	 *  
	 */
	static Delete: BMHTMLEntity;

	/**
	 * The HTML entity representing the Return symbol.
	 *  
	 */
	static Return: BMHTMLEntity;

	private constructor(); 
}

/**
 * A struct which represents the insets which may be applied to a rect such a view's frame.
 * An inset is represented by four numbers, each representing the amount by which each rect's edge should be inset.
 * If an inset is positive, the rect edge will be inset (move towards the center) by that amount,
 * if it is negative, the rect edge will be outset (move away from the center) by that amount.
 * 
 */
declare class BMInset {

	/**
	 * The left edge inset.
	 *  
	 */
	left: number;

	/**
	 * The top edge inset.
	 *  
	 */
	top: number;

	/**
	 * The right edge inset.
	 *  
	 */
	right: number;

	/**
	 * The bottom edge inset.
	 *  
	 */
	bottom: number;

	/**
	 * Creates and returns a copy of this BMInset object.
	 * @return 	An inset object.
	 *  
	 */
	copy(): BMInset;


	/**
	 * Constructs and returns a new inset with all four edges having the same value.
	 * @return 					An inset.
	 * 
	 */
	static insetWithEqualInsets (insets?: number | null | undefined): BMInset;


	/**
	 * Creates and returns an inset object.
	 * @return 					An insets object.
	 * 
	 */
	static insetWithLeft (left?: number | null | undefined, args?: {top?: number | null | undefined, right?: number | null | undefined, bottom?: number | null | undefined}): BMInset;

}


/**
 * Constructs and returns a new inset with all four edges having the same value.
 * @return 					An inset.
 * 
 */
declare function BMInsetMakeWithEqualInsets(insets?: number | null | undefined): BMInset;



/**
 * Creates and returns an inset object.
 * @return 					An insets object.
 * 
 */
declare function BMInsetMake(left?: number | null | undefined, top?: number | null | undefined, right?: number | null | undefined, bottom?: number | null | undefined): BMInset;



/**
 * Creates and returns an inset object.
 * @return 					An insets object.
 * 
 */
declare function BMInsetMakeWithLeft(left?: number | null | undefined, args?: {top?: number | null | undefined, right?: number | null | undefined, bottom?: number | null | undefined}): BMInset;



/**
 * A struct which represents a point in two dimensions.
 * 
 */
declare class BMPoint implements BMAnimating {

	/**
	 * The point's X coordinate.
	 *  
	 */
	x: number;

	/**
	 * The point's Y coordinate.
	 *  
	 */
	y: number;

	/**
	 * Returns a string representation of this point.
	 *  
	 */
	readonly stringValue: any;

	/**
	 * Returns a string representation of this point.
	 * This property removes the fractional part of the components in the serialized representation.
	 *  
	 */
	readonly integerStringValue: any;

	/**
	 * Returns a point with the same coordinates as this point, but without their fractional parts.
	 *  
	 */
	readonly integerPointValue: any;

	/**
	 * Tests whether this point is equal to the given point.
	 * @return 							YES if the points are equal, NO otherwise.
	 *  
	 */
	isEqualToPoint(point: BMPoint): boolean;


	/**
	 * Returns a copy of this point.
	 * @return 	A point.
	 *  
	 */
	copy(): BMPoint;


	/**
	 * Computes and returns the distance from this point to the given point.
	 * @return 						The distance.
	 *  
	 */
	distanceToPoint(point: BMPoint): number;


	/**
	 * Computes and returns the slope angle, in radians, of the line between this point and the given point.
	 * @return 						The angle in radians.
	 *  
	 */
	slopeAngleToPoint(point: BMPoint): number;


	/**
	 * Invoked by the CoreUI animation engine to obtain an interpolated
	 * value between this object and the target object.
	 * @return 				A point.
	 *     
	 */
	interpolatedValueWithFraction(fraction: number, args: {toValue: BMPoint}): BMPoint;


	/**
	 * Returns a string representation of this point.
	 * @return 		A string.
	 *  
	 */
	toString(): string;

}


/**
 * Constructs and returns a new point with the given coordinates.
 * @return 				A Point.
 * 
 */
declare function BMPointMake(x?: number | null | undefined, y?: number | null | undefined): BMPoint;



/**
 * Constructs and returns a new point with the given coordinates.
 * @return 				A Point.
 * 
 */
declare function BMPointMakeWithX(x?: number | null | undefined, args?: {y?: number | null | undefined}): BMPoint;



/**
 * Computes and returns the absolute distance between the two given points.
 * @return 					The distance between the two points.
 * 
 */
declare function BMDistanceBetweenPoints(fromPoint: BMPoint, toPoint: BMPoint): number;



/**
 * Computes and returns the slope angle, in radians, between the two given points.
 * @return 					The angle in radians.
 * 
 */
declare function BMSlopeAngleBetweenPoints(fromPoint: BMPoint, toPoint: BMPoint): number;



/**
 * A struct which represents a size in two dimensions
 * 
 */
declare class BMSize implements BMAnimating {

	/**
	 * Creates a new rect with its origin at (0, 0) with this size.
	 * @return  A rect.
	 *  
	 */
	newRectWithSize(): BMRect;


	/**
	 * Creates and returns a new size with the same attributes as this size.
	 * @return 		A size.
	 *  
	 */
	copy(): BMSize;


	/**
	 * Tests whether this size is identical to the given size.
	 * @return 		YES if the sizes are identical, NO otherwise.
	 *  
	 */
	isEqualToSize(size: BMSize): boolean;


	/**
	 * Invoked by the CoreUI animation engine to obtain an interpolated
	 * value between this object and the target object.
	 * @return 					A size.
	 *     
	 */
	interpolatedValueWithFraction(fraction: number, args: {toValue: BMSize}): BMSize;


	/**
	 * Returns a string representation of this size.
	 * @return 		A string.
	 *  
	 */
	toString(): string;

}


/**
 * Creates and returns a new size.
 * @return 						A size.
 * 
 */
declare function BMSizeMake(width?: number | null | undefined, height?: number | null | undefined): BMSize;



/**
 * A struct which represents a rectangle in two dimensions.
 * It is defined by the origin of the rectangle and its size.
 * 
 */
declare class BMRect implements BMAnimating {

	/**
	 * The rect's origin point.
	 *  
	 */
	origin: BMPoint;

	/**
	 * The rect's size.
	 *  
	 */
	size: BMSize;

	/**
	 * The X coordinate of this rect's right edge.
	 *  
	 */
	readonly right: number;

	/**
	 * The Y coordinate of this rect's bottom edge.
	 *  
	 */
	readonly bottom: number;

	/**
	 * The X coordinate of this rect's origin point.
	 *  
	 */
	readonly left: number;

	/**
	 * The Y coordinate of this rect's origin point.
	 *  
	 */
	readonly top: number;

	/**
	 * The rect's width.
	 *  
	 */
	readonly width: number;

	/**
	 * The rect's height.
	 *  
	 */
	readonly height: number;

	/**
	 * The rect's center point.
	 *  
	 */
	center: BMPoint;

	/**
	 * Determines whether this rect is equal to the target rect.
	 * @return         True if the rects are equal, false otherwise.
	 *  
	 */
	isEqualToRect(rect: BMRect): boolean;


	/**
	 * Determines whether this rect intersects the target rect in any point.
	 * @return         YES if the rects intersect, NO otherwise.
	 *  
	 */
	intersectsRect(rect: BMRect): boolean;


	/**
	 * Determines whether this rect intersects the target rect in any point except the edges.
	 * @return         YES if the rects intersect, NO otherwise.
	 *  
	 */
	intersectsContentOfRect(rect: BMRect): boolean;


	/**
	 * Creates and returns a new rect that represents the intersection between this rect and the target rect.
	 * If the rects do not intersect, the resulting rect will be undefiend.
	 * @return    	A rect.
	 *  
	 */
	rectByIntersectingWithRect(rect: BMRect): BMRect | null | undefined;


	/**
	 * Creates and returns up to 4 rects which reprent the areas of this rect and the target rect that do not intersect.
	 * The resulting rects will first cover any horionztal area and then the vertical area.
	 * @return  	The list of rects. Some of these rects may be missing, indicating that the two rects fit either vertically or horizontally.
	 * 
	 */
	rectsByExclusiveOrWithRect(): any;


	/**
	 * Returns up to two rects that together make up the difference between this rect and the supplied rect.
	 * If the rects are identical or the target rect contains this rect, this function will return nothing.
	 * If the rects do not intersect, this function will return this rect.
	 * @return 		A list of rects or undefined if the intersection is identical to either rect.
	 *  
	 */
	rectsWithDifferenceFromRect(rect: BMRect): BMRect[] | null | undefined;


	/**
	 * Determines if the target rect is completely included in this rect.
	 * The given rect will be considered to be contained within this rect even if they have equal positionining and sizing.
	 * @return         YES if the rect is contained, NO otherwise. If the target rect is not valid, the result is undefined.
	 *  
	 */
	containsRect(rect: BMRect): boolean;


	/**
	 * Determines if the target point is strictly contained in this rect.
	 * @return                             YES if the point is contained within this rect, NO if it is outside or on the edge of this rect.
	 *  
	 */
	containsPoint(point: BMPoint): boolean;


	/**
	 * Determines if the target point is strictly contained in this rect or any of its edges.
	 * @return                             YES if the point is contained within this rect or its edges, NO otherwise.
	 *  
	 */
	intersectsPoint(point: BMPoint): boolean;


	/**
	 * Moves this rect in place by the specified positions.
	 *  
	 */
	offset(x: number, y: number): void;


	/**
	 * Moves this rect in place by the specified positions.
	 *  
	 */
	offsetWithX(x?: number | null | undefined, args?: {y?: number | null | undefined}): void;


	/**
	 * Contracts or expands this rect in place by the specified sizes. If the sizes are positive, the rect is inset, otherwise it is expanded.
	 * This method may be invoked in two ways:
	 * --------------------------------------------------
	 * --------------------------------------------------
	 *  
	 */
	inset(width: number, height: number, insets: BMInset): void;


	/**
	 * Contracts or expands this rect in place by the specified sizes. If the sizes are positive, the rect is inset, otherwise it is expanded.
	 *  
	 */
	insetWithWidth(width: number, args: {height: number}): void;


	/**
	 * Contracts or expands this rect in place by the specified sizes. If the sizes are positive, the rect is inset, otherwise it is expanded.
	 *  
	 */
	insetWithInset(inset: BMInset): void;


	/**
	 * Constructs and returns a new rect that represents the rect that would be obtained by applying the given insets to this rect.
	 * @return 				A new rect after applying the insets.
	 *  
	 */
	rectWithInset(inset: BMInset): BMRect;


	/**
	 * Constructs and returns a new rect that represents the transform that should be applied to this rect
	 * for it to be identical to the given rect.
	 * The new rect's size represents the X and Y scales that should be applied to this rect, while the origin represents the translation.
	 * To achieve the correct results, the translation should be applied first and the scaling the second.
	 * @return 				The transformation rect.
	 *  
	 */
	rectWithTransformToRect(rect: BMRect): BMRect;


	/**
	 * Creates a deep copy of this rect.
	 * @return  A rect.
	 * 
	 */
	copy(): BMRect;


	/**
	 * Invoked by the CoreUI animation engine to obtain an interpolated
	 * value between this object and the target object.
	 * @return 					A rect.
	 *     
	 */
	interpolatedValueWithFraction(fraction: number, args: {toValue: BMRect}): BMRect;

}


/**
 * Creates and returns a rectangle that represents the interpolation between two rects with a given fraction.
 * 									Negative values will overshoot the source rect and values greater than 1 will overshoot the target rect.
 * @return 						A rect.
 * 
 */
declare function BMRectByInterpolatingRect(sourceRect: BMRect, args: {toRect: BMRect, withFraction: number}): BMRect;



/**
 * Creates and returns a rectangle with the specified properties.
 * @return 						A rect.
 * 
 */
declare function BMRectMake(x?: number | null | undefined, y?: number | null | undefined, width?: number | null | undefined, height?: number | null | undefined): BMRect;



/**
 * Creates and returns a rectangle with the specified properties.
 * @return 						A rect.
 * 
 */
declare function BMRectMakeWithX(x?: number | null | undefined, args?: {y?: number | null | undefined, width?: number | null | undefined, height?: number | null | undefined}): BMRect;



/**
 * Creates and returns a rectangle with the specified properties.
 * @return 						A rect.
 * 
 */
declare function BMRectMakeWithOrigin(origin?: BMPoint | null | undefined, args?: {size?: BMSize | null | undefined}): BMRect;



/**
 * Creates and returns a rectangle that represents the area of the document currently occupied by the given DOM node.
 * The coordinates will be relative to the viewport and will take into account the current document scroll position.
 * @return 						A rect.
 * 
 */
declare function BMRectMakeWithNodeFrame(DOMNode: DOMNode): BMRect;



/**
 * An animation subscriber is used with animation contexts when multiple animation properties should be batched for the same animation target.<br/><br/>
 * There is no constructor or prototype for animation subscribers. Instead, they may be any object that conforms to the subscriber specification.
 * 
 */
declare class BMAnimationSubscriber {

	/**
	 * This method is invoked by animation context
	 *  
	 */
	applyForContext(): void;

}


/**
 * An animation controller is an object that makes it easier to integrate custom properties with the animation engine.
 * 
 * Animation controllers are never created explicitly, instead all animation contexts provide a method that creates
 * an animation controller for an object. After retrieving an animation controller, you may use it to register either regular
 * CSS/transform properties or custom properties with an update handler.
 * To retrieve an animation controller for an object, invoke the `controllerForObject(_)` method on the active animation context,
 * passing in the caller object as the parameter. If a previous animation controller was already retrieved for that object, the
 * method will return that existing instance already.
 * 
 * Besides the animation controller, in supported environments you may annotate your properties with the
 * `@BMAnimatable` or `@BMAnimatableNumber` decorators. For properties annotated in this way,
 * CoreUI automatically handles checking for animation conexts, retrieving animation controllers and setting up
 * progress handlers.
 * 
 */
declare class BMAnimationController {

	/**
	 * The animation context to which this animation controller applies.
	 *  
	 */
	private _animation: BMAnimationContext;

	/**
	 * The object for which this animation controller was created.
	 *  
	 */
	private _owner: any;

	/**
	 * The DOM node on which the animation will run.
	 *  
	 */
	private _node: DOMNode;

	/**
	 * An object containing the properties that are registered to this animation controller.
	 * For standard properties, the key name is the property name and its value is the usual
	 * `Velocity.js` value.
	 * For custom properties, a single `tween` property is created whose value is another object where
	 * its keys are the names of the custom properties and their values are functions that control what
	 * happens when the property value is updated.
	 *  
	 */
	private _properties: Dictionary< any>;

	/**
	 * Initializes this animation controller with the given owner and animation context.
	 * @return 					This animation controller.
	 *  
	 */
	initWithAnimation(animation: BMAnimationContext, args: {owner: any, node: DOMNode}): BMAnimationController;


	/**
	 * Registers an animation that will run on the given standard CSS or transform property.
	 *  
	 */
	registerBuiltInProperty(property: string, args: {withValue: any}): void;


	/**
	 * Registers an animation that will run on the given custom property.
	 * 										A handler that is invoked on each animation frame, where the developer should perform their changes.
	 * 										This handler is passed the following parameters:
	 * 										* __fraction__: <Number> 		- The animation completion percentage. This will typically be a number between 0 and 1,
	 * 																			however for animations that overshoot or undershoot their values, this completion
	 * 																			fraction may surpass those values as well.
	 * 										* __value__: <Number, nullable> - Supplied if the property was registered with a starting and ending value.
	 * 																			Represents the current interpolated value.
	 * 												If this argument is specified, `targetValue` should also be specified.
	 * 												If this argument is specified, `startingValue` should also be specified.
	 *  
	 */
	registerCustomProperty(property: string, args: {withHandler: (($0: number, $1: number) => void), startingValue?: number | null | undefined, targetValue?: number | null | undefined}): void;


	/**
	 * Registers an animation that will run on one of the target object's own properties.
	 * 												An optional starting value from which the property will animate.
	 *  
	 */
	registerOwnProperty(property: string, args: {targetValue: number, startingValue?: number | null | undefined}): void;


	/**
	 * Registers an animation that will run on one of the target object's own properties.
	 * 														An optional starting value from which the property will animate.
	 *  
	 */
	registerAnimatableProperty(property: string, args: {targetValue: BMAnimating, startingValue?: BMAnimating | null | undefined}): void;

}


/**
 * A decorator that may be applied to properties to make them animatable using CoreUI.
 * This decorator should be applied to properties whose type is a class that implements `BMAnimating`.
 * When a property marked animatable is changed while an animation context is active, an animation will
 * be registered to run for that property. Classes using this decorator must have a `node` property that
 * returns the DOM node on which animations run.
 * 
 * The property extended by this decorator must have a setter defined for it.
 * 
 * Using this decorator will cause your class to gain a private underscore-prefixed version
 * of the target property that will be used by CoreUI for storage, unless you also define
 * a getter for the property.
 * 
 */
declare function BMAnimatable(target: any, key: string, descriptor: any): void;



/**
 * A decorator that may be applied to properties to make them animatable using CoreUI.
 * This decorator should be applied to properties whose type is a number.
 * When a property marked animatable is changed while an animation context is active, an animation will
 * be registered to run for that property. Classes using this decorator must have a `node` property that
 * returns the DOM node on which animations run.
 * 
 * The property extended by this decorator must have a setter defined for it.
 * 
 * Using this decorator will cause your class to gain a private underscore-prefixed version
 * of the target property that will be used by CoreUI for storage, unless you also define
 * a getter for the property.
 * 
 */
declare function BMAnimatableNumber(target: any, key: string, descriptor: any): void;



/**
 * This interface represents an object that specifies a portion of an animation.
 * 
 */
declare interface BMAnimationTarget {

	/**
	 * The jQuery element that will be affected by this animation.
	 *  
	 */
	element: $;

	/**
	 * A dictionary of properties that will be changed by the animation.
	 *  
	 */
	properties: Dictionary<any>;

	/**
	 * An optional map of options that will override the animation context's options.
	 *  
	 */
	options?: Dictionary<any> | null | undefined;
}


/**
 * An animation context manages the options and animated elements for an animation.<br/>
 * Animation contexts are never created explicitly, instead they are created and activated in the background by
 * `BMAnimationBeginWithDuration()` or `BMAnimateWithBlock()`.<br/><br/>
 * While there is an active animation context, changing compatible properties will be done through an animation, using
 * that context's animation options.<br/><br/>
 * To support animating with animation contexts, the current animation context may be retrieved by invoking the global `BMAnimationContextGetCurrent()`
 * function. This will return the current animation context if one is active. That context may be used to register animations in response to property changes.
 * 
 */
declare class BMAnimationContext {

	/**
	 * The animation options for this context.
	 *  
	 */
	options: any;

	/**
	 * A map containing the callbacks for animations that are registered and should be applied when this animation begins.
	 * The keys in this map may be any type of object and their values must be objects that contain the `apply` method which will
	 * be invoked when this animation is about to begin.
	 *  
	 */
	subscribers: Map<any, BMAnimationSubscriber>;

	/**
	 * Returns an animation controller for the given object. If an animation controller was previously requested
	 * for this object for this animation, this method will return that previously created controller.
	 *  
	 */
	controllerForObject(object: any, args: {node: DOMNode}): void;


	/**
	 * An array containing the animation targets for the current context.
	 * An animation target is an object with the following three properties:
	 * 
	
	 *  * element &lt;$&gt;: 					The jQuery node to which the animation should be applied.
	
	 *  * properties &lt;Object&gt;: 			An object containing the node properties which will be animated.
	
	 *  * options &lt;Object&gt;: 				An optional object containing animation property overrides.
	
	 * 
	
	 *  
	 */
	targets: BMAnimationTarget[];

	/**
	 * Should be invoked to register an animation that will run when this animation context is started.
	 * 													This object has the same format as the Velocity.js property object.
	 * 													Specifying this parameter will cause the animation context's animation options to be overriden for this animation.
	 *  
	 */
	registerAnimationForTarget(target: $, args: {properties: Dictionary< any>, options?: Dictionary< any> | null | undefined}): void;

}


/**
 * The animation stack holds all animations with their attributes.
 * Whenever an attribute property is changed while there is an active animation, that property
 * will smoothly interpolate to the new value using the top-most animation's attributes.
 * 
 */
declare var _BMAnimationStack: BMAnimationContext[];



/**
 * Retrieves the currently active animation context, if there is one.
 * @return 		The current animation context if there is one, undefined otherwise.
 * 
 */
declare function BMAnimationContextGetCurrent(): BMAnimationContext | null | undefined;



/**
 * Should be invoked to start a new attribute animation.
 * After this call, you should assign the new values to the attributes you want to animate
 * and finally call `BMAnimationApply()` to start the animations.
 * You may call `BMAnimationBeginWithDuration()` multiple times in a row to set up multiple animations, but each call must be balanced
 * by calling `BMAnimationApply()`.
 *                                      This object should not be modified afterwards until this animation is applied.
 * @return 			The animation context associated with the new animation.
 * 
 */
declare function BMAnimationBeginWithDuration(duration: Int, options?: any | null | undefined): BMAnimationContext;



/**
 * Must be invoked after a `BMAnimationBeginWithDuration()` call to apply the pending animation.
 * @return 					A promise that resolves when the animation completes.
 * 
 */
declare function BMAnimationApply(): Promise<void>;



/**
 * Must be invoked after a `BMAnimationBeginWithDuration()` call to apply the pending animation.
 * Applying the animation in this way will stop all other running animations on the animation targets.
 * 									A blocking animation will cancel all other animations currently running on any of the target elements.
 * @return 				A promise that resolves when the animation completes.
 * 
 */
declare function BMAnimationApplyBlocking(blocking?: boolean | null | undefined): Promise<void>;



/**
 * Animates the properties modified in the given callback using the supplied options.
 *                                  		This object should not be modified afterwards until this animation is applied.
 *                                  		This object must contain a valid duration property.
 * @return 						A promise that resolves when this animation completes or is cancelled.
 * 
 */
declare function BMAnimateWithBlock(block: (() => void), options: any): Promise<void>;



/**
 * A BMIndexPath object manages the mapping between an object and its position within a data set.
 * It represents an ordered list of indexes that should be traversed within a data set to reach a given object.
 * Index paths should be created using one of the BMIndexPathMake... functions rather than using the constructor.
 * 
 */
declare class BMIndexPath {

	/**
	 * The object.
	 *     
	 */
	object?: any | null | undefined;

	/**
	 * The ordered list of indexes.
	 *     
	 */
	indexes: Int[];

	/**
	 * The object's row. This corresponds to the second index.
	 *     
	 */
	row: Int;

	/**
	 * The object's section. This corresponds to the first index.
	 *     
	 */
	section: Int;

	/**
	 * Creates and returns a new `BMIndexPath` instance with the same property values
	 * as this index path.
	 * @return     An index path.
	 *     
	 */
	copy(): BMIndexPath;


	/**
	 * Used to test if two index paths are strictly equal.
	 * Two index paths are strictly equal if the contain the same indexes and point to the same object.
	 * @return 										YES if the index paths are strictly equal, NO otherwise.
	 *  
	 */
	isEqualToIndexPath(indexPath: BMIndexPath | null | undefined, args: {usingComparator: (($0: any, $1: any) => boolean)}): boolean;


	/**
	 * Used to test if two index paths represent the same element, even if they have a different position in the data set.
	 * Two index paths are loosely equal if they refer to the same object or if they both refer to no object but have equal indexes.
	 * @return 										YES if the index paths are loosely equal, NO otherwise.
	 *  
	 */
	isLooselyEqualToIndexPath(indexPath: BMIndexPath | null | undefined, args: {usingComparator: (($0: any, $1: any) => boolean)}): boolean;

}


/**
 * An index path that points to no object.
 * This index path will return NO when tested for equality, even against itself.
 * 
 */
declare var BMIndexPathNone: BMIndexPath;



/**
 * Constructs and returns a new BMIndexPath object initialized to the given row and section.
 * @return 					An index path.
 * 
 */
declare function BMIndexPathMakeWithRow(row: Int, args?: {section?: Int | null | undefined, forObject?: any | null | undefined}): BMIndexPath;



/**
 * Constructs and returns a new BMIndexPath object initialized to the given indexes.
 * @return 						An index path.
 * 
 */
declare function BMIndexPathMakeWithIndexes(indexes: Int[], args?: {forObject?: any | null | undefined}): BMIndexPath;



/**
 * A BMKeyPath object represents an ordered list of key names that should be traversed within a data set to reach a given object.
 * Key paths should be created using one of the BMKeyPathMake... functions rather than using the constructor.
 * 
 */
declare class BMKeyPath {

	/**
	 * The list of keys which should be traversed by this key path.
	 *  
	 */
	readonly components: string[];

	/**
	 * Initializes this key path by parsing the given string.
	 * The key path components should be separated by periods. If a key contains a period in its name
	 * that period should be escaped using the '\' character.
	 *  
	 */
	initWithString(string: string): void;


	/**
	 * Initializes this key path using the specified list of ordered key names.
	 * 	 
	 */
	initWithComponents(components: string[]): void;


	/**
	 * Traverses this key path on the given object, returning the value for the last key.
	 * If any of the intermediary objects are undefined, this method will return undefined.
	 * @return 			The value at the end of this key path, or undefined if the object could not be traversed
	 * 										for the entire key path.
	 *  
	 */
	valueForObject(object: any, args?: {withLimit?: number | null | undefined}): any | null | undefined;

}


/**
 * Constructs and returns a new key path by parsing the given string.
 * The key path components should be separated by periods. If a key contains a period in its name
 * that period should be escaped using the '\' character.
 * @return 			A key path.
 * 
 */
declare function BMKeyPathMakeWithString(string: string): BMKeyPath;



/**
 * Constructs and returns a new key path using the specified list of ordered key names.
 * @return 				A key path.
 * 
 */
declare function BMKeyPathMakeWithComponents(components: string[]): BMKeyPath;



/**
 * Contains constants representing the terminal vertical direction of a scrolling operation.
 * 
 */
declare class BMScrollingDirectionVertical {
	/**
	 * Indicates that the scroll operation was stationary on the vertical axis.
	 *  
	 */
	static Stationary: BMScrollingDirectionVertical;

	/**
	 * Indicates that the scroll operation was moving towards the beginning of the content.
	 *  
	 */
	static Top: BMScrollingDirectionVertical;

	/**
	 * Indicates that the scroll operation was moving towards the end of the content.
	 *  
	 */
	static Bottom: BMScrollingDirectionVertical;

	private constructor(); 
}

/**
 * Contains constants representing the terminal horizontal direction of a scrolling operation.
 * 
 */
declare class BMScrollingDirectionHorizontal {
	/**
	 * Indicates that the scroll operation was stationary on the horizontal axis.
	 *  
	 */
	static Stationary: BMScrollingDirectionHorizontal;

	/**
	 * Indicates that the scroll operation was moving towards the beginning of the content.
	 *  
	 */
	static Left: BMScrollingDirectionHorizontal;

	/**
	 * Indicates that the scroll operation was moving towards the end of the content.
	 *  
	 */
	static Right: BMScrollingDirectionHorizontal;

	private constructor(); 
}

/**
 * A function collection is an array-like object that can only contain functions.
 * It also behaves as a function that, when invoked, will invoke all other functions it contains, passing in
 * its context and argument.
 * 
 * Note that while it supports all of Array's methods, it does not support numbered properties.
 * To access or set values at specific indexes, use the `functionAtIndex(_)` and
 * `setFunction(_, {atIndex})` methods.
 * 
 * When invoked, the function collection will return the value returned by the last function it contains.
 * 
 * Function collections cannot be instantiated using the constructor, they can only be created using the
 * `BMFunctionCOllectionMake()` function.
 *  
 */
declare interface BMFunctionCollection extends Function, Array<Function> {

	/**
	 * Represents the number of functions within this function collection.
	 *  
	 */
	length: number;

	/**
	 * Puts the given function at the specified index within this function collection.
	 * If the given index is out of bounds, the function collection will be resized to accomodate
	 * the given index.
	 *  
	 */
	setFunction?(f: Function | null | undefined, args: {atIndex: number}): void;


	/**
	 * Retrieves the function at the given index.
	 * @return 		A function, or `undefined` if there is no function at the specified index.
	 *  
	 */
	functionAtIndex?(index: number): Function | null | undefined;

}


/**
 * Constructs and returns a function collection.
 * 
 * A function collection is an array-like object that can only contain functions.
 * It also behaves as a function that, when invoked, will invoke all other functions it contains, passing in
 * its context and argument.
 * 
 * It is intended to be an easy way to add multiple callbacks in cases where a single callback is expected.
 * 
 * Note that while it supports all of Array's methods, it does not support numbered properties.
 * To access or set values at specific indexes, use the `functionAtIndex(_)` and
 * `setFunction(_, {atIndex})` methods.
 * 
 * When invoked, the function collection will return the value returned by the last function it contains.
 * 
 * @return 		A function collection.
 * 
 */
declare function BMFunctionCollectionMake(): BMFunctionCollection;



/**
 * Used internally by CoreUI.
 *  
 */
declare class _BMColorStorage {
}


/**
 * A BMColor object is an opaque representation of a CSS color.
 * It handles the conversion between the different CSS color representations such as hex strings and rgba strings.
 * The BMColor is an abstract object - a different implementation of BMColor may be used depending on how it was constructed.
 * Additionally, changing certain properties of this object might cause its underlying implementation to change at runtime;
 * when this happens, the color might change slightly if the target implementation cannot accurately represent the source one.
 * 
 */
declare class BMColor implements BMAnimating {

	/**
	 * The underlying storage object to which this color object delegates its functionality.
	 *  
	 */
	private _storage: _BMColorStorage;

	/**
	 * The color's red component in a RGBA representation.
	 * Changing this value will cause this color's underlying representation to switch to RGBA.
	 *  
	 */
	red: Short;

	/**
	 * The color's green component in a RGBA representation.
	 * Changing this value will cause this color's underlying representation to switch to RGBA.
	 *  
	 */
	green: Short;

	/**
	 * The color's blue component in a RGBA representation.
	 * Changing this value will cause this color's underlying representation to switch to RGBA.
	 *  
	 */
	blue: Short;

	/**
	 * The color's alpha component.
	 *  
	 */
	alpha: Short;

	/**
	 * The color's hue component in a HSLA representation.
	 * Changing this value will cause this color's underlying representation to switch to HSLA.
	 *  
	 */
	hue: Short;

	/**
	 * The color's saturation component in a HSLA representation.
	 * Changing this value will cause this color's underlying representation to switch to HSLA.
	 *  
	 */
	saturation: Short;

	/**
	 * The color's luminosity component in a HSLA representation.
	 * Changing this value will cause this color's underlying representation to switch to HSLA.
	 *  
	 */
	luminosity: Short;

	/**
	 * The RGBA representation of this color.
	 *  
	 */
	readonly RGBAString: string;

	/**
	 * The RGB representation of this color. The alpha component of this color is ignored in this representation.
	 *  
	 */
	readonly RGBString: string;

	/**
	 * The hex representation of this color. The alpha component of this color is ignored in this representation.
	 *  
	 */
	readonly hexString: string;

	/**
	 * The HSLA representation of this color.
	 *  
	 */
	readonly HSLAString: string;

	/**
	 * The HSL representation of this color. The alpha component of this color is ignored in this representation.
	 *  
	 */
	readonly HSLString: string;

	/**
	 * Creates and returns a copy of this color.
	 * @return  A color.
	 *  
	 */
	copy(): BMColor;


	/**
	 * Invoked by the CoreUI animation engine to obtain an interpolated
	 * value between this object and the target object.
	 * The resulting color will always be in the RGBA space when created
	 * by this method.
	 * @return 				A color.
	 *     
	 */
	interpolatedValueWithFraction(fraction: number, args: {toValue: BMColor}): BMColor;

}


/**
 * Constructs and returns a fully transparent black color.
 * @return 	A color.
 * 
 */
declare function BMColorMake(): BMColor;



/**
 * Constructs and returns a BMColor object by parsing the given CSS color string.
 * The string can be a hex, rgba, rgb, hsla or hsl color or any of the CSS 3 color keywords.
 * If the string is not a valid color string, the resulting BMColor object is not defined.
 * @return 			The new BMColor object or undefined if the color string cannot be parsed.
 * 
 */
declare function BMColorMakeWithString(string?: string | null | undefined): BMColor | null | undefined;



/**
 * Constructs and returns a BMColor by specifying its RGBA components.
 * 
 */
declare function BMColorMakeWithRed(red: Short, args: {green: Short, blue: Short, alpha?: Short | null | undefined}): void;



/**
 * Constructs and returns a BMColor by specifying its HSLA components.
 * 
 */
declare function BMColorMakeWithHue(hue: Int, args: {saturation: Short, luminosity: Short, alpha?: Short | null | undefined}): void;



/**
 * Constructs and returns a new BMColor by parsing the specified hex string.
 * @return 		A color.
 * 
 */
declare function BMColorMakeWithHexString(string: string): BMColor;



/**
 * Constructs and returns a new BMColor by parsing the specified RGBA string.
 * @return 		A color.
 * 
 */
declare function BMColorMakeWithRGBAString(string: string): BMColor;



/**
 * Constructs and returns a new BMColor by parsing the specified RGB string.
 * @return 		A color.
 * 
 */
declare function BMColorMakeWithRGBString(string: string): BMColor;



/**
 * Constructs and returns a new BMColor by parsing the specified RGBA string.
 * @return 		A color.
 * 
 */
declare function BMColorMakeWithHSLAString(string: string): BMColor;



/**
 * Constructs and returns a new BMColor by parsing the specified RGB string.
 * @return 		A color.
 * 
 */
declare function BMColorMakeWithHSLString(string: string): BMColor;



/**
 * Creates and returns a color that represents the interpolation between two colors with a given fraction.
 * The resulting color will always be a RGBA color.
 * 									Negative values will overshoot the source color and values greater than 1 will overshoot the target color, however each color
 * 									component will be clamped between each component's minimum and maximum values.
 * @return 					A color.
 * 
 */
declare function BMColorByInterpolatingRGBAColor(sourceColor: BMColor, args: {toColor: BMColor, withFraction: number}): BMColor;



/**
 * Creates and returns a color that represents the interpolation between two colors with a given fraction.
 * The resulting color will always be a HSLA color.
 * 									Negative values will overshoot the source color and values greater than 1 will overshoot the target color, however each color
 * 									component will be clamped between each component's minimum and maximum values.
 * @return 					A color.
 * 
 */
declare function BMColorByInterpolatingHSLAColor(sourceColor: BMColor, args: {toColor: BMColor, withFraction: number}): BMColor;



/**
 * Converts the given number to a hex string that is guaranteed to have at least two digits.
 * 									its length is lower than this parameter.
 * @return 						A hex string.
 * 
 */
declare function BMHexStringWithNumber(number: Int, args?: {minDigits?: Int | null | undefined}): string;



/**
 * A _BMRGBAColor object is a color storage model where colors are represented by four 8 bit values representing the
 * red, green, blue and alpha components.
 * 
 */
declare class _BMRGBAColor implements _BMColorStorage {

	/**
	 * The color object that manages this RGBAColor
	 *  
	 */
	private _color: BMColor;

	/**
	 * The color's red component.
	 *  
	 */
	red: Short;

	/**
	 * The color's green component.
	 *  
	 */
	green: Short;

	/**
	 * The color's blue component.
	 *  
	 */
	blue: Short;

	/**
	 * The color's alpha component.
	 *  
	 */
	alpha: Short;

	/**
	 * The color's hue component in a HSLA representation.
	 * Changing this value will cause this color's underlying representation to switch to HSLA.
	 *  
	 */
	hue: Short;

	/**
	 * The color's saturation component in a HSLA representation.
	 * Changing this value will cause this color's underlying representation to switch to HSLA.
	 *  
	 */
	saturation: Short;

	/**
	 * The color's luminosity component in a HSLA representation.
	 * Changing this value will cause this color's underlying representation to switch to HSLA.
	 *  
	 */
	luminosity: Short;

	/**
	 * Returns the equivalent HSLA color.
	 *  
	 */
	readonly BMHSLAColor: _BMHSLAColor;

	/**
	 * The RGBA representation of this color.
	 *  
	 */
	readonly RGBAString: string;

	/**
	 * The RGB representation of this color. The alpha component of this color is ignored in this representation.
	 *  
	 */
	readonly RGBString: string;

	/**
	 * The hex representation of this color. The alpha component of this color is ignored in this representation.
	 *  
	 */
	readonly hexString: string;

	/**
	 * The HSLA representation of this color.
	 *  
	 */
	readonly HSLAString: string;

	/**
	 * The HSL representation of this color. The alpha component of this color is ignored in this representation.
	 *  
	 */
	readonly HSLString: string;

	/**
	 * Creates and returns a copy of this RGBA color.
	 * @return  A color.
	 *  
	 */
	copy(): BMColor;

}


/**
 * A _BMHSLAColor object is a color storage model where colors are represented by four 8 bit values representing the
 * hue, saturation, luminosity and alpha components.
 * 
 */
declare class _BMHSLAColor implements _BMColorStorage {

	/**
	 * The color object that manages this HSLAColor
	 *  
	 */
	private _color: BMColor;

	/**
	 * The color's red component.
	 * Changing this value will cause this color's underlying representation to switch to RGBA.
	 *  
	 */
	red: any;

	/**
	 * The color's green component.
	 * Changing this value will cause this color's underlying representation to switch to RGBA.
	 *  
	 */
	green: any;

	/**
	 * The color's blue component.
	 * Changing this value will cause this color's underlying representation to switch to RGBA.
	 *  
	 */
	blue: any;

	/**
	 * The color's alpha component.
	 *  
	 */
	alpha: Short;

	/**
	 * The color's hue component in a HSLA representation.
	 *  
	 */
	hue: Int;

	/**
	 * The color's saturation component in a HSLA representation.
	 *  
	 */
	saturation: Short;

	/**
	 * The color's luminosity component in a HSLA representation.
	 *  
	 */
	luminosity: Short;

	/**
	 * Returns the equivalent HSLA color.
	 *  
	 */
	readonly BMRGBAColor: _BMRGBAColor;

	/**
	 * The RGBA representation of this color.
	 *  
	 */
	readonly RGBAString: string;

	/**
	 * The RGB representation of this color. The alpha component of this color is ignored in this representation.
	 *  
	 */
	readonly RGBString: string;

	/**
	 * The hex representation of this color. The alpha component of this color is ignored in this representation.
	 *  
	 */
	readonly hexString: string;

	/**
	 * The HSLA representation of this color.
	 *  
	 */
	readonly HSLAString: string;

	/**
	 * The HSL representation of this color. The alpha component of this color is ignored in this representation.
	 *  
	 */
	readonly HSLString: string;

	/**
	 * Creates and returns a copy of this RGBA color.
	 * @return  A color.
	 *  
	 */
	copy(): BMColor;

}


/**
 * The type of view an attributes object applies to.
 * This enumeration is also used by cell objects to make it possible to identify their type.
 * 
 */
declare class BMCollectionViewLayoutAttributesType {
	/**
	 * Indicates that these attributes apply to cells.
	 *     
	 */
	static Cell: BMCollectionViewLayoutAttributesType;

	/**
	 * Indicates that these attributes apply to supplementary views.
	 *     
	 */
	static SupplementaryView: BMCollectionViewLayoutAttributesType;

	/**
	 * Indicates that these attributes apply to decoration views.
	 * Decoration views are a planned feature - currently this value should not be used.
	 *     
	 */
	static DecorationView: BMCollectionViewLayoutAttributesType;

	private constructor(); 
}

/**
 * @deprecated Deprecated. Use BMCollectionViewCellAttributesType instead.
 * 
 */
declare var BMCellAttributesType: any;



/**
 * Manages the layout attributes for a cell or supplementary view. The cell attributes will automatically apply themselves to a cell's
 * DOM element whenever they are assigned to a cell. Additionally, the attributes are also animatable. Applying attributes, frames or styles while there
 * is an active animation context will cause that change to be animated.
 * 
 * Cell attributes should not be created using the constructor; instead one of the BMCollectionViewCellAttributesMake... functions should be used to obtain new instances.
 * 
 */
declare class BMCollectionViewLayoutAttributes {

	/**
	 * The cell whose layout is managed by these attributes.
	 *  
	 */
	cell?: BMCollectionViewCell | null | undefined;

	/**
	 * The type of item these attributes apply to.
	 *     
	 */
	readonly itemType: BMCollectionViewLayoutAttributesType;

	/**
	 * The item kind for supplementary and decoration views.
	 *     
	 */
	identifier: string;

	/**
	 * The position of the cell in the layout.
	 *  
	 */
	frame: BMRect;

	/**
	 * Generates and applies the hook properties for the frame.
	 *     
	 */
	private _hookFrame(): void;


	/**
	 * Invoked by the collection view to flatten the cell using these attributes prior to an animated release.
	 * This will cause any transform or opacity styles to be removed from the cell, which may affect the fidelity
	 * of the resulting layer.
	 *  
	 */
	private _flatten(): void;


	/**
	 * The cell's style and transform attributes
	 *     
	 */
	style: any;

	/**
	 * Applies the specified style on top of the current style properties.
	 *      
	 */
	addStyle(style: any): void;


	/**
	 * Determines whether the cell using these attributes is hidden.
	 * When cells are marked as hidden, the collection view may skip rendering them entirely.
	 *      
	 */
	isHidden: boolean;

	/**
	 * Applies the given hook properties to the backing UI element, if it is available.
	 * If the UI element is not available, these properties will be applied when it becomes available.
	 *                                  This object should not contain position or size attributes; these should be controlled through the frame property instead.
	 *     
	 */
	hook(properties: any): void;


	/**
	 * The index path of the model object backing this cell.
	 * 
	 */
	indexPath: BMIndexPath;

	/**
	 * Creates a new instance of this attributes collection with the same properties as this instance.
	 * The new `BMCollectionViewLayoutAttributes` instance will not be bound to any cell.
	 * @return    A properties collection instance.
	 * 
	 */
	copy(): BMCollectionViewLayoutAttributes;

}


/**
 * @deprecated Deprecated. Use BMCollectionViewCellAttributes instead.
 * 
 */
declare var BMCellAttributes: typeof BMCollectionViewLayoutAttributes;



/**
 * Creates and returns a new instance of `BMCollectionViewLayoutAttributes` for the object at the specified index path.
 * @return        The layout attributes.
 * 
 */
declare function BMCollectionViewLayoutAttributesMakeForCellAtIndexPath(indexPath: BMIndexPath): BMCollectionViewLayoutAttributes;



/**
 * @deprecated Deprecated. Use `BMCollectionViewLayoutAttributesMakeForCellAtIndexPath` instead.
 * 
 */
declare var BMCellAttributesMakeForCellAtIndexPath: Function;



/**
 * Creates and returns a new instance of `BMCollectionViewLayoutAttributes` for the object at the specified index path.
 * @return            The cell attributes.
 * 
 */
declare function BMCollectionViewLayoutAttributesMakeForSupplementaryViewWithIdentifier(identifier: string, args: {atIndexPath: BMIndexPath}): BMCollectionViewLayoutAttributes;



/**
 * @deprecated Deprecated. Use `BMCollectionViewLayoutAttributesMakeForSupplementaryViewWithIdentifier` instead.
 * 
 */
declare var BMCellAttributesMakeForSupplementaryViewWithIdentifier: any;



/**
 * A controller object that manages a cell view instance and its associated retain count.
 * The cell is used as a controller for both regular cells, supplementary views and decoration views.
 * The represented item type is not strongly associated with the actual cell, but it may be inferred from its reuse identifier
 * and associated attributes.
 * 
 * Cells should not be instantiated manually; they will be constructed and provided by the collection view when requested using one of the `dequeueCell...` methods.
 * 
 */
declare class BMCollectionViewCell {

	/**
	 * The number of times the cell was retained.
	 * Subclasses should not override this getter.
	 *     
	 */
	readonly retainCount: number;

	/**
	 * Returns YES if the cell is managed by the collection view, NO otherwise.
	 * Subclasses should not override this getter.
	 *     
	 */
	readonly isManaged: any;

	/**
	 * Returns YES if the cell is retained or managed by the collection view, NO otherwise.
	 * Subclasses should not override this getter.
	 *     
	 */
	readonly isRetained: any;

	/**
	 * The collection view that created this cell.
	 * Subclasses should not override this property.
	 *     
	 */
	collectionView: BMCollectionView;

	/**
	 * @deprecated Deprecated. Use the `node` property instead.
	 * The jQuery element managed by this cell.
	 * Subclasses should not override this property.
	 *  
	 */
	readonly element: $;

	/**
	 * The DOM node managed by this cell.
	 *     
	 */
	node: DOMNode;

	/**
	 * The type of item this cell represents.
	 * Subclasses should not override this property.
	 *     
	 */
	itemType: BMCollectionViewLayoutAttributesType;

	/**
	 * The cell's reuse identifier which corresponds to the template's reuse identifier.
	 *     
	 */
	reuseIdentifier: string;

	/**
	 * The cell's size and position within its own coordinate space.
	 *     
	 */
	readonly bounds: BMRect;

	/**
	 * Invoked just before this cell's bounds are about to change to the given bounds.
	 * This method is invoked before the bounds have actually been changed and before any associated animation has run.
	 * Subclasses can override this method to react to bound updates.
	 * The default implementation does nothing.
	 *     
	 */
	boundsWillChangeToBounds(bounds: BMRect): void;


	/**
	 * Invoked after this cell's bounds have been updated and any associated animation has finished running.
	 * Subclasses can override this method to react to bound updates.
	 * The default implementation does nothing.
	 *     
	 */
	boundsDidChangeFromBounds(bounds: BMRect): void;


	/**
	 * Animatable. The cell attributes used to render this cell.
	 * Subclasses should not override this property.
	 *     
	 */
	attributes: BMCollectionViewLayoutAttributes;

	/**
	 * The index path that this cell is currently bound to.
	 * Subclasses should not override this getter.
	 *  
	 */
	readonly indexPath: any;

	/**
	 * A special version of retain used only by the collection view.
	 * Subclasses should not override this method.
	 * @return 		This cell.
	 *  
	 */
	private _manage(): BMCollectionViewCell;


	/**
	 * A special version of release used only by the collection view.
	 * Subclasses should not override this method.
	 *  
	 */
	private _unmanage(): void;


	/**
	 * Retains ownership of this cell, preventing the collection view from recycling it, until it is released.
	 * If the object backing this cell is removed from the data set while it's still retained, the cell may be destroyed,
	 * guaranteeing that it won't be reused later.
	 * Subclasses that override this method should invoke the superclass method at some point in their implementation.
	 * @return  	This cell.
	 *     
	 */
	retain(): BMCollectionViewCell;


	/**
	 * Relinquishes ownership of this cell. If the retain count reaches 0, the cell may be recycled.
	 * You should only release cells that you previously retained, otherwise the collection view may behave
	 * in an undefined manner.
	 * Subclasses that override this method should invoke the superclass method at some point in their implementation.
	 *     
	 */
	release(): void;


	/**
	 * Invoked by the collection view to recycle this cell, preparing it for reuse later. This implicitly invokes _unmanage().
	 * If this cell is not fully released after invoking this method, it will notify the collection view to destroy it.
	 * Subclasses that override this method should invoke the superclass method at some point in their implementation.
	 * Note that after the superclass implementation is invoked, the cell will have been either collected or invalidated.
	 *     
	 */
	recycle(): void;


	/**
	 * Invoked by the collection view to recycle this cell, preparing it for reuse later. This implicitly invokes release().
	 * If this cell is not fully released after invoking this method, it will notify the collection view to destroy it.
	 * Subclasses that override this method should invoke the superclass method at some point in their implementation.
	 * Note that after the superclass implementation is invoked, the cell will have been either collected or invalidated.
	 *     
	 */
	releaseRecycledCell(): void;


	/**
	 * Should be set to YES to hide the cell, or NO to reveal it.
	 *     
	 */
	isHidden: boolean;

	/**
	 * Hides this cell from the layout without recycling it.
	 * If the cell is already hidden, this method does nothing.
	 *     
	 */
	private _hide(): void;


	/**
	 * Reveals a previously hidden cell.
	 * If the cell is already visible, this method does nothing.
	 *     
	 */
	private _show(): void;


	/**
	 * Invoked prior to this cell being collected for reuse by the collection view.
	 * Subclasses can override this method to perform any changes necessary for reusing this cell.
	 * Subclasses should invoke the superclass method at some point in their implementation.
	 *     
	 */
	prepareForReuse(): void;


	/**
	 * Invoked prior to this cell being shown on the screen either after being initialized or after having been previously collected.
	 * Subclasses can override this method to perform any changes necesarry for displaying this cell.
	 * Subclasses should invoke the superclass method at some point in their implementaiton.
	 *     
	 */
	prepareForDisplay(): void;


	/**
	 * Invoked by the collection view when this cell can no longer be recycled and should be destroyed.
	 * Subclasses that require any additional cleanup before being destroyed should override this method
	 * and perform any necessary cleanup here.
	 * After this method returns, the collection view will remove this cell's node from the DOM and will no
	 * longer reuse this cell.
	 * Subclasses overriding this method should invoke the superclass method at the end of their implementation.
	 * After this method is invoked, all references to this cell should be cleared to allow the garbage collector
	 * to reclaim its memory.
	 *     
	 */
	destroy(): void;


	/**
	 * A property instructing the collection view whether the cell contains asynchronous components used when initializing and the collection view
	 * should await for those asynchronous components to complete before actually rendering the cell.
	 * When this getter returns `NO`, the collection view will invoke `initNonatomic` on this cell after the base initializer
	 * has returned and await for the promise returned by that method to resolve before continuing its operation.
	 * Note that collection view will only await for nonatomic code only during the initial loading and during data updates, in other cases, `initNonatomic`
	 * will be invoked as normally, but the collection will not block awaiting for it to resolve - therefore cell subclasses that use asynchronous should be
	 * prepared to handle the cases where they are used before their nonatomic resources have finished loading.
	 *     
	 */
	readonly initializesAtomically: boolean;

	/**
	 * Designated initializer. Invoked immediately after creation to initialize this cell.
	 * Subclasses that need custom initialization should invoke the superclass implementation to ensure
	 * that the cell is correctly initialized.
	 * 													with the correct contents when reusing elements.
	 * @return                        This cell.
	 *     
	 */
	initWithCollectionView(collectionView: BMCollectionView, args: {reuseIdentifier: string, node: DOMNode}): BMCollectionViewCell;


	/**
	 * Invoked when cell subtypes return `NO` from `initializesAtomically`.
	 * Subtypes should asynchronously perform any work they need, returning a promise that resolves when that work is finished.
	 * When this method is invoked during data updates and the initial loading, collection view will await for the promise returned
	 * by this method to resolve before displaying any changes to the user.
	 *     
	 */
	initNonatomic(): void;

}


/**
 * Creates and returns a new `BMCollectionViewCell` that will be managed by the given collection view.
 * This constructor should not be invoked manually; the collection view itself should decide when it is appropriate to construct new cells.
 * 													with the correct contents when reusing elements.
 * @return                        A cell.
 * 
 */
declare function BMCollectionViewCellMakeForCollectionView(collectionView: BMCollectionView, args: {withReuseIdentifier: string, node: DOMNode}): BMCollectionViewCell;



/**
 * @deprecated Deprecated. Use `BMCollectionViewCellMakeForCollectionView` instead.
 * 
 */
declare var BMCellMakeForCollectionView: any;



/**
 * A specialized version of cell attributes that manages the transition of a cell from one set of attributes to another.
 * The source and target attributes should have the same index path and item type.
 * Transition attributes should not be created and used directly. A collection view will automatically create, manage and destroy transition attributes
 * to perform various animations such as animated layout changes.
 * 
 * Transition attributes are created automatically by the collection view when changing layouts with an animation.
 * 
 */
declare class _BMCollectionViewTransitionLayoutAttributes {

	/**
	 * The attributes from which the transition starts.
	 *  
	 */
	readonly sourceAttributes: BMCollectionViewLayoutAttributes;

	/**
	 * The attributes to which the transition moves.
	 *  
	 */
	readonly targetAttributes: BMCollectionViewLayoutAttributes;

	/**
	 * Controls how close the transition is to completion.
	 * A value of 0 should correspond to the source attributes while a value of 1 should correspond to the target attributes.
	 * Assigning this value will update the target cell.
	 *  
	 */
	fraction: number;

	/**
	 * Invoked by transition layouts at the end of a layout transition.
	 * Causes the transition attributes to apply the final target attributes to its associated cells.
	 *  
	 */
	private _applyFinalAttributes(): void;

}


/**
 * The regex used to extract the units from style CSS values.
 * 
 */
declare var _BMCollectionViewTransitionLayoutAttributesUnitRegex: RegExp;



/**
 * Constructs and returns a new set of transition attributes object that will transition from the given source attributes to 
 * the given target attributes.
 * @return 	            The new transition attributes.
 * 
 */
declare function _BMCollectionViewTransitionLayoutAttributesMakeWithSourceAttributes(sourceAttributes: BMCollectionViewLayoutAttributes, args: {targetAttributes: BMCollectionViewLayoutAttributes}): _BMCollectionViewTransitionLayoutAttributes;



/**
 * @deprecated Deprecated. Use `_BMCollectionViewTransitionLayoutAttributesMakeWithSourceAttributes` instead.
 * 
 */
declare var _BMCollectionViewTransitionCellAttributesMakeWithSourceAttributes: any;



/**
 * The collection view layout is an object that the collection view uses to determine where each element should appear on screen.
 * Additionally, layout object can define supplementary views which help to enrich the display of the elements in the data set;
 * however, supplementary views themselves are not directly part of the data set, though they may be derived from the contents of the data set.
 * 
 * The `BMCollectionViewLayout` is an abstract type and cannot be used directly. It is meant to serve as a base type for concrete implementations.
 * Concrete layout implementations are required to implement at least 3 of this type's abstract methods:
 * 
 * __`attributesForCellAtIndexPath`__: 	used to retrieve the attributes for a single cell

 *  * __`attributesForElementsInRect`__: 		used to retrieve the attributes of all cells and supplementary views in a given rect

 *  * __`contentSize`__:						used to obtain the size of all the content in the collection view


 * 
 * Addtionally, layouts that define supplementary views, must additionally implement the following method:
 * 
 * __`attributesForSupplementaryViewWithIdentifier`__:		used to retrieve the attributes for a single supplementary view


 * 
 * By default, the collection view defines 3 concrete layout types:
 * 
 * BMCollectionViewTableLayout

 *  * BMCollectionViewFlowLayout

 *  * BMCollectionViewMasonryLayout


 * 
 * Creating a subtype of the `BMCollectionViewLayout` type can be achieved in several ways:
 * <ol>
 * <li> Create a type whose prototype inherits the `BMCollectionViewLayout` prototype, e.g.:
 * <pre>
 * 	MyCollectionViewLayout.prototype = Object.create(BMCollectionViewLayout.prototype, {
 * 		// MyCollectionViewLayout prototype methods and properties here
 * 	});
 * </pre>
 * </li>
 * <li> Create a type whose prototype copies the properties of `BMCollectionViewLayout`'s prototype, e.g.:
 * <pre>
 * 	BMExtend(MyCollectionViewLayout.prototype, BMCollectionViewLayout.prototype, {
 * 		// MyCollectionViewLayout prototype methods and properties here
 * 	});
 * </pre>
 * </li>
 * </ol>
 * 
 * All layout objects should inherit from the BMCollectionViewLayout prototype.
 * 
 */
declare class BMCollectionViewLayout {

	/**
	 * The collection view that derives its layout information from this object.
	 *     
	 */
	collectionView: BMCollectionView;

	/**
	 * Will be invoked by the collection view to retrieve the layout attributes for the cell at the specified index path.
	 * This method must return a valid BMCollectionViewLayoutAttributes object, which will be used to determine the position of the cell in the collection view.
	 * @return        The cell attributes.
	 *     
	 */
	attributesForCellAtIndexPath(indexPath: BMIndexPath): BMCollectionViewLayoutAttributes;


	/**
	 * Will be invoked by the collection view to retrieve the layout attributes for all cells and supplementary views that intersect the given rect.
	 * This method must return an array of valid BMCollectionViewLayoutAttributes objects, which will be used to determine the position of the cells and supplementary views in the collection view.
	 * The collection view will use the indexPath attribute of the BMCollectionViewLayoutAttributes objects to match the attributes to the cells and type property to determine whether each
	 * BMCollectionViewLayoutAttributes object applies to an item in the data set or to a supplementary view.
	 * @return      An array of cell attributes.
	 *     
	 */
	attributesForElementsInRect(rect: BMRect): BMCollectionViewLayoutAttributes[];


	/**
	 * Will be invoked by the collection view to determine the size of the collection view's contents.
	 * This method must return a valid BMSize object that represents the collection view's size.
	 * @return                                  The size.
	 *     
	 */
	contentSize(): BMSize;


	/**
	 * Will be invoked by the collection view to determine the layout attributes for a particular supplementary view.
	 * This method must be implemented if the layout object defines supplementary views.
	 * This method will also invoked during an update; during that time this method may return undefined, which indicates that
	 * the requested supplementary should no longer exist; otherwise this method must return valid cell attributes.
	 * @return 		The supplementary view attributes.
	 *     
	 */
	attributesForSupplementaryViewWithIdentifier(identifier: string, args: {atIndexPath: BMIndexPath}): BMCollectionViewLayoutAttributes;


	/**
	 * Will be invoked by the collection the first time it presents its contents or whenever the layout is invalidated.
	 * Layout objects can use this method to perform any necessary calculations before the layout will be displayed.
	 *     
	 */
	prepareLayout(): void;


	/**
	 * For layout objects that support invalidation contexts, this property should be overriden to return the correct type to use
	 * when creating new invalidation contexts.
	 * This property should return the constructor function for the invalidation context type.
	 *  
	 */
	readonly invalidationContextType: Function;

	/**
	 * Will be invoked by the collection before it updates to a new data set.
	 * Until collectionViewDidStartUpdates() is invoked, it is recommended that the layout object should be able to produce both the
	 * current and the old layout attributes as the collection view may request both of them to be able to animate these changes.
	 * 														an update object for each changed element. For bulk updates, this parameter will be undefined.
	 * 														Instead, the old data set will be accessible from callbacks passed to the collectionView.usingOldDataSet() method.
	 *     
	 */
	collectionViewWillStartUpdates(updates?: BMCollectionViewUpdate[] | null | undefined): void;


	/**
	 * Will be invoked by the collection view as a final step during updates.
	 * This method is called from within an animation block, so this method may be used to perform additional animations.
	 *     
	 */
	collectionViewDidStartUpdates(): void;


	/**
	 * Will be invoked by the collection view during an update to determine where the collection view should scroll to when applying the update.
	 * This method can be overriden by layout objects to control the scroll offset after the update, for example to keep the first element visible after the update.
	 * The default implementation returns the supplied offset point.
	 * @return             The preferred scroll offset.
	 *     
	 */
	preferredScrollOffsetWithOffset(offset: BMPoint): BMPoint;


	/**
	 * Will be invoked by the collection view during a layout change to determine where the collection view should scroll to when applying this layout.
	 * This method can be overriden by layout objects to control the scroll offset after the update, for example to keep the first element visible after the update.
	 * The default implementation returns the supplied offset point.
	 * @return             					The preferred scroll offset.
	 *     
	 */
	preferredScrollOffsetForTransitionFromLayout(fromLayout: BMCollectionViewLayout, args: {withOffset: BMPoint}): BMPoint;


	/**
	 * Will be invoked by the collection view to determine the initial attributes for a cell whose position has changed.
	 * It should be implemented by layout objects to supply the old position of a moving cell.
	 * This function recieves both the old and the new index paths as parameters.
	 * The two index paths may be identical, which implies that this cell moved because cells in other sections have been removed or added
	 * and this cell moves as a result.
	 * The default implementation will simply return the attributes for the new index path with the opacity set to 0.
	 * @return 							The attributes.
	 *  
	 */
	initialAttributesForMovingCellFromIndexPath(indexPath: BMIndexPath, args: {toIndexPath: BMIndexPath, withTargetAttributes: BMCollectionViewLayoutAttributes}): BMCollectionViewLayoutAttributes;


	/**
	 * Will be invoked by the collection view to determine the initial attributes for a supplementary view whose position has changed.
	 * It should be implemented by layout objects to supply the old position of a moving supplementary view.
	 * This function only receives the new index path as a parameter. Since the layout object itself controls the index paths of
	 * supplementary views, it should determine on its own how the supplementary view was changed.
	 * The default implementation will simply return the attributes for the new index path with the opacity set to 0.
	 * @return 							The attributes.
	 *  
	 */
	initialAttributesForMovingSupplementaryViewWithIdentifier(identifier: string, args: {atIndexPath: BMIndexPath, withTargetAttributes: BMCollectionViewLayoutAttributes}): BMCollectionViewLayoutAttributes;


	/**
	 * Will be invoked by the collection view to determine the initial attributes for a cell that was added to the collection.
	 * It may be implemented by layout objects to customize the appearance of newly added cells.
	 * The default implementation will return the default layout attributes with the scale and opacity set to 0.
	 * This method will be invoked after collectionViewWillStartUpdates() and before collectionViewDidStartUpdates().
	 * @return            				The attributes.
	 *     
	 */
	initialAttributesForAppearingCellAtIndexPath(indexPath: BMIndexPath, args: {withTargetAttributes: BMCollectionViewLayoutAttributes}): BMCollectionViewLayoutAttributes;


	/**
	 * Will be invoked by the collection view to determine the initial attributes for a supplementary view that was added to the collection.
	 * It may be implemented by layout objects to customize the appearance of newly added supplementary views.
	 * The default implementation will return the default layout attributes with the scale and opacity set to 0.
	 * This method will be invoked after collectionViewWillStartUpdates() and before collectionViewDidStartUpdates().
	 * @return            				The attributes.
	 *     
	 */
	initialAttributesForAppearingSupplementaryViewWithIdentifier(identifier: string, args: {atIndexPath: BMIndexPath, withTargetAttributes: BMCollectionViewLayoutAttributes}): BMCollectionViewLayoutAttributes;


	/**
	 * Will be invoked by the collection view to determine the initial attributes for a cell that was previously hidden but has become visible.
	 * It may be implemented by layout objects to customize the appearance of cells that become visible.
	 * The default implementation will return the result of invoking initialAttributesForAppearingCellAtIndexPath().
	 * This method will be invoked after collectionViewWillStartUpdates() and before collectionViewDidStartUpdates().
	 * @return            				The attributes.
	 *  
	 */
	initialAttributesForRevealingCellAtIndexPath(indexPath: BMIndexPath, args: {withTargetAttributes: BMCollectionViewLayoutAttributes}): BMCollectionViewLayoutAttributes;


	/**
	 * Will be invoked by the collection view to determine the initial attributes for a supplementary view that was previously hidden but has become visible.
	 * It may be implemented by layout objects to customize the appearance of supplementary views that become visible.
	 * The default implementation will return the result of invoking initialAttributesForAppearingSupplementaryViewWithIdentifier().
	 * This method will be invoked after collectionViewWillStartUpdates() and before collectionViewDidStartUpdates().
	 * @return            				The attributes.
	 *  
	 */
	initialAttributesForRevealingSupplementaryViewWithIdentifier(identifier: string, args: {atIndexPath: BMIndexPath, withTargetAttributes: BMCollectionViewLayoutAttributes}): BMCollectionViewLayoutAttributes;


	/**
	 * Will be invoked by the collection view to determine the initial attributes for a cell that is presented for the first time.
	 * It may be implemented by layout objects to customize the appearance of the introduction animation.
	 * The default implementation will return the default layout attributes with the scale and opacity set to 0.
	 * This method will only be invoked once for each visible cell after the collection first receives data.
	 * @return            				The attributes.
	 *     
	 */
	initialAttributesForPresentedCellAtIndexPath(indexPath: BMIndexPath, args: {withTargetAttributes: BMCollectionViewLayoutAttributes}): BMCollectionViewLayoutAttributes;


	/**
	 * Will be invoked by the collection view to determine the initial attributes for a supplementary view that is presented for the first time.
	 * It may be implemented by layout objects to customize the appearance of the introduction animation.
	 * The default implementation will return the default layout attributes with the scale and opacity set to 0.
	 * This method will only be invoked once for each visible supplementary view after the collection first receives data.
	 * @return            				The attributes.
	 *     
	 */
	initialAttributesForPresentedSupplementaryViewWithIdentifier(identifier: string, args: {atIndexPath: BMIndexPath, withTargetAttributes: BMCollectionViewLayoutAttributes}): BMCollectionViewLayoutAttributes;


	/**
	 * Will be invoked by the collection view to determine which supplementary views should be added to the collection during an update.
	 * This method will be invoked after collectionViewWillStartUpdates() and before collectionViewDidStartUpdates().
	 * The default implementation returns an empty array.
	 * @return      	An array of cell attributes that contain the supplementary view index paths and their identifiers, 
	 * 													or an empty array if no supplementary views should be added.
	 * 													The cell attributes returned by this method are not required to have valid frames.
	 *     
	 */
	supplementaryViewsToInsert(): BMCollectionViewLayoutAttributes[];


	/**
	 * Will be invoked by the collection view to determine the final attributes for a cell that was removed from the collection.
	 * It may be implemented by layout objects to customize the appearance of removed cells.
	 * The default implementation will return the default layout attributes with the scale and opacity set to 0.
	 * This method will be invoked after collectionViewWillStartUpdates() and before collectionViewDidStartUpdates().
	 * @return            				The attributes.
	 *     
	 */
	finalAttributesForDisappearingCellAtIndexPath(indexPath: BMIndexPath, args: {withTargetAttributes: BMCollectionViewLayoutAttributes}): BMCollectionViewLayoutAttributes;


	/**
	 * Will be invoked by the collection view to determine the final attributes for a supplementary view that was removed from the collection.
	 * It may be implemented by layout objects to customize the appearance of removed supplementary views.
	 * The default implementation will return the default layout attributes with the scale and opacity set to 0.
	 * This method will be invoked after collectionViewWillStartUpdates() and before collectionViewDidStartUpdates().
	 * @return            				The attributes.
	 *     
	 */
	finalAttributesForDisappearingSupplementaryViewWithIdentifier(identifier: string, args: {atIndexPath: BMIndexPath, withTargetAttributes: BMCollectionViewLayoutAttributes}): BMCollectionViewLayoutAttributes;


	/**
	 * Will be invoked by the collection view to determine the final attributes for a cell that has become hidden.
	 * It may be implemented by layout objects to customize the appearance of hidden cells.
	 * The default implementation will return the result of invoking finalAttributesForDisappearingCellAtIndexPath().
	 * This method will be invoked after collectionViewWillStartUpdates() and before collectionViewDidStartUpdates().
	 * @return            				The attributes.
	 *  
	 */
	finalAttributesForHidingCellAtIndexPath(indexPath: BMIndexPath, args: {withTargetAttributes: BMCollectionViewLayoutAttributes}): BMCollectionViewLayoutAttributes;


	/**
	 * Will be invoked by the collection view to determine the final attributes for a supplementary view that has become hidden.
	 * It may be implemented by layout objects to customize the appearance of hidden supplementary views.
	 * The default implementation will return the result of invoking finalAttributesForDisappearingSupplementaryViewWithIdentifier().
	 * This method will be invoked after collectionViewWillStartUpdates() and before collectionViewDidStartUpdates().
	 * @return            				The attributes.
	 *  
	 */
	finalAttributesForHidingSupplementaryViewWithIdentifier(identifier: string, args: {atIndexPath: BMIndexPath, withTargetAttributes: BMCollectionViewLayoutAttributes}): BMCollectionViewLayoutAttributes;


	/**
	 * Will be invoked by the collection view to determine which supplementary views should be deleted from the collection during an update.
	 * This method will be invoked after collectionViewWillStartUpdates() and before collectionViewDidStartUpdates().
	 * The default implementation returns an empty array.
	 * @return      	An array of cell attributes that contain the supplementary view index paths and their identifiers, 
	 * 													or an empty array if no supplementary views should be removed.
	 * 													The cell attributes returned by this method are not required to have valid frames.
	 *     
	 */
	supplementaryViewsToDelete(): BMCollectionViewLayoutAttributes[];


	/**
	 * Invalidates the layout and causes it to be recalculated.
	 * This will invoke invalidateLayout() on the collection view.
	 * If this layout object is not associated with any collection view, invoking this method will have no effect.
	 *     
	 */
	invalidateLayout(): void;


	/**
	 * Invalidates the parts of the layout that have changed and need to be recalculated.
	 * This will invoke invalidateLayoutWithContext() on the collection view.
	 * If this layout object is not associated with any collection view, invoking this method will have no effect.
	 *  
	 */
	invalidateLayoutWithContext(): void;


	/**
	 * Will be invoked by the collection view whenever the frame changes, for example when the window is resized.
	 * Layout objects should return YES from this method if the new frame requires a new layout.
	 * The default implementation returns YES in all cases.
	 * @return             True if the new frame requires a new layout, false otherwise.
	 *     
	 */
	shouldInvalidateLayoutForFrameChange(frame: BMRect): boolean;


	/**
	 * Will be invoked by the collection view whenever the bounds change, for example when the user is scrolling.
	 * Layout objects should return YES from this method if the new bounds require a new layout.
	 * The default implementation returns NO in all cases.
	 * @return             True if the new frame requires a new layout, false otherwise.
	 *     
	 */
	shouldInvalidateLayoutForBoundsChange(bounds: BMRect): boolean;


	/**
	 * Will be invoked by the collection view whenever the layout has finished invalidating after a bounds change.
	 * Layout objects can implement this method to perform any final changes after a bounds change invalidation.
	 * The default implementation does nothing.
	 *     
	 */
	didInvalidateLayoutForBoundsChange(): void;


	/**
	 * Invoked by the collection to determine the rect that it should scroll to in order to focus on 
	 * the cell at the given index path.
	 * By default, this method retrieves the attributes for the cell at the given index path, then returns
	 * the frame property of those attributes.
	 * Layout subtypes may override this method to provide custom bounding boxes. For example, when
	 * cell positions change depending on the current scroll position, subtypes may override this method
	 * to return the correct position that the collection view should scroll to in order to reveal the given index path.
	 * If the attributes cannot be determined, the method will return a rect that causes the collection view to scroll back to the top.
	 * @return 							A rect.
	 *  
	 */
	rectWithScrollingPositionOfCellAtIndexPath(indexPath: BMIndexPath): BMRect;


	/**
	 * Invoked by the collection to determine the rect that it should scroll to in order to focus on 
	 * the supplementary view of the given type at the given index path.
	 * By default, this method retrieves the attributes for the supplementary view at the given index path, then returns
	 * the frame property of those attributes.
	 * Layout subtypes may override this method to provide custom bounding boxes. For example, when
	 * cell positions change depending on the current scroll position, subtypes may override this method
	 * to return the correct position that the collection view should scroll to in order to reveal the given index path.
	 * If the attributes cannot be determined, the method will return a rect that causes the collection view to scroll back to the top.
	 * @return 							A rect.
	 *  
	 */
	rectWithScrollingPositionOfSupplementaryViewWithIdentifier(indexPath: BMIndexPath): BMRect;


	/**
	 * May be set to YES by layout objects in order to snap the scroll position to certain breakpoints.
	 * When layout objects return YES from this method, the collection view will invoke the
	 * snappingScrollOffsetForScrollOffset(_, {withVerticalDirection, horizontalDirection}) method to determine what point it should snap its scroll to.
	 *  
	 */
	readonly snapsScrollPosition: boolean;

	/**
	 * Invoked by the collection view when this layout supports snapping scroll positions to determine the snapping scroll offset
	 * for the given scroll offset.
	 * Layout object must return a valid scroll offset from this method.
	 * @return 												The scroll offset to which the collection view should snap.
	 *  
	 */
	snappingScrollOffsetForScrollOffset(offset: BMPoint, args: {withVerticalDirection: BMScrollingDirectionVertical, horizontalDirection: BMScrollingDirectionHorizontal}): BMPoint;


	/**
	 * Invoked by collection view when a dragging operation is about to begin and the index paths of the items
	 * is about to shift. Layout subclasses may override this method to prepare for this change.
	 * 
	 * If the user drops the item in an invalid position, collection view will invoke the `dragOperationWillRollback()` method
	 * and immediately follow with an animated data update to move the item back.
	 * 
	 * When the operation completes, collection view will invoke the `dragOperationDidFinish()` method and finalize updating
	 * the item's new position in the data set.
	 * 
	 * The default implementation does nothing.
	 *  
	 */
	prepareForDragOperation(): void;


	/**
	 * Invoked by collection view when a drag and drop operation finishes in a point where there is no index path
	 * and the operation should be rolled back.
	 * Subclasses should override this method to undo any changes they may have made when preparing for that drag
	 * operation.
	 * The default implementation does nothing.
	 *  
	 */
	dragOperationWillRollback(): void;


	/**
	 * Invoked by collection view when a drag and drop operation finishes in a point where there is an index path
	 * and the dragged item is about to be moved to the new index path.
	 * Subclasses should override this method to prepare for the changes.
	 * The default implementation does nothing.
	 *  
	 */
	dragOperationDidFinish(): void;


	/**
	 * Should be implemented by layout objects that support copying.
	 * @return 		A copy of this layout object. The copy should not be bound to any collection view.
	 *  
	 */
	copy(): BMCollectionViewLayout;

}


/**
 * An invalidation context is an object that describes which parts of the layout should be changed during an invalidation.
 * Layout objects that support invalidation contexts can use these objects to optimize their invalidation process and
 * only update the parts of the layout that have actually changed.
 * 
 * To use invalidation contexts, create a subtype of the base invalidation context type and define the properties that
 * represent the parts of the layout that can be updated independently. Then, when the layout should be invalidated, create an invalidation context and invoke the
 * invalidateLayoutWithContext method on the collection view, passing in the newly created invalidation context.
 * 
 * Invalidation context subtypes must invoke the base initializer at some point during initialization.
 * 
 * The collection view itself will create its own invalidation contexts as part of certain changes. Layout objects that support invalidation
 * contexts should override the `invalidationContextType` property to return the correct type. The collection view will use that type when creating
 * new invalidation contexts.
 * 
 * During a layout update, the current invalidation context can be retrieved through the collection view's `invalidationContext` property.
 * 
 */
declare class BMCollectionViewLayoutInvalidationContext {

	/**
	 * Indicates whether the entire layout should be invalidated or not.
	 *  
	 */
	invalidateEverything: boolean;

	/**
	 * Indicates whether or not the data set counts have changed.
	 *  
	 */
	invalidateDataSetCounts: boolean;

	/**
	 * If set to a size, this represents the amounts by which the content size should change.
	 * When this attribute is supplied, the collection view will not query the layout for the new content size.
	 *  
	 */
	contentSizeAdjustment: BMSize;

	/**
	 * An array of index paths that represent the cells that were invalidated.
	 *  
	 */
	invalidatedCellIndexPaths?: BMIndexPath[] | null | undefined;

	/**
	 * A dictionary whose keys represent the identifiers and values the index paths of supplementary views that were invalidated.
	 *  
	 */
	invalidatedSupplementaryViewIndexPaths?: Dictionary< [BMIndexPath]> | null | undefined;
}


/**
 * A specialized layout object that manages the transition between two different layout objects.
 * A transition layout is temporarily installed on a collection view when its setLayout() method is invoked with the animated parameter set to YES.
 * The transition layout should not be created and used directly. A collection view will automatically create, manage and destroy a transition layout
 * as part of an animated layout change.
 * 
 */
declare class BMCollectionViewTransitionLayout extends BMCollectionViewLayout {

	/**
	 * Controls how close to completion the transition is.
	 *  
	 */
	fraction: number;

	/**
	 * Invoked by the collection view at the end of a layout transition.
	 * Causes the transition layout to apply the final attributes to all animated cells.
	 *  
	 */
	private _applyFinalAttributes(): void;

}


/**
 * Constants representing the types of supplementary views that table layouts support.
 * 
 */
declare class BMCollectionViewTableLayoutSupplementaryView {
	/**
	 * Indicates that this supplementary view is a footer.
	 *  
	 */
	static Footer: BMCollectionViewTableLayoutSupplementaryView;

	/**
	 * Indicates that this supplementary view is a header.
	 *  
	 */
	static Header: BMCollectionViewTableLayoutSupplementaryView;

	/**
	 * Indicates that this supplementary is an empty content view.
	 *  
	 */
	static Empty: BMCollectionViewTableLayoutSupplementaryView;

	private constructor(); 
}

/**
 * A basic layout implementation, the BMCollectionViewTableLayout will lay out its elements as a list where each row can have
 * either a fixed height or a variable height.
 * 
 * If the row heights are variable, the collection must have a delegate that implements the 
 * Number collectionViewRowHeightForCellAtIndexPath(BMCollectionView, BMIndexPath) method.
 * 
 * Optionally, the table layout may also generate supplementary views for section headers and section footers.
 * 
 */
declare class BMCollectionViewTableLayout extends BMCollectionViewLayout {

	/**
	 * The row height to use for each row.
	 * This can either be a specific size in pixels or BMCollectionViewTableLayoutRowHeightVariable if each row can have a different height.
	 * If the row heights are variable, the collection must have a delegate that implements the Number collectionViewRowHeightForCellAtIndexPath(BMCollectionView, BMIndexPath) method.
	 *  
	 */
	rowHeight: number;

	/**
	 * The minimum width to use for each row.
	 * If this value is greater than the collection view's frame width, the rows will have this width applied to them.
	 *  
	 */
	minimumWidth: number;

	/**
	 * Determines whether or not the table layout should generate header supplementary views or not.
	 *  
	 */
	showsHeaders: boolean;

	/**
	 * The height to use for headers. Does not have any effect if showsHeaders is set to NO.
	 * This attribute is always 0 if showsHeader is set to NO.
	 *  
	 */
	headerHeight: number;

	/**
	 * Determines whether or not the table layout should generate footer supplementary views or not.
	 *  
	 */
	showsFooters: boolean;

	/**
	 * The height to use for footers. Does not have any effect if showsFooters is set to NO.
	 * This attribute is always 0 if showsFooters is set to NO.
	 *  
	 */
	footerHeight: number;

	/**
	 * The insets to apply to each section which control their distance from the collection view edges and from other sections.
	 *  
	 */
	sectionInsets: BMInset;

	/**
	 * When set to YES, the table layout will stick the header supplementary views to the top edge of the collection view while scrolling.
	 * Otherwise, the header supplementary views will scroll with the rest of the content.
	 *  
	 */
	pinsHeadersToContentEdge: boolean;

	/**
	 * When set to YES, the table layout will stick the footer supplementary views to the bottom edge of the collection view while scrolling.
	 * Otherwise, the footer supplementary views will scroll with the rest of the content.
	 *  
	 */
	pinsFootersToContentEdge: boolean;

	/**
	 * Retrieves the base attributes for the given supplementary view, before adjusting for pinned headers or footers.
	 * @return 	The index path with additional information.
	 *  
	 */
	attributesForSupplementaryViewWithIdentifier(identifier: string, args: {atIndexPath: BMIndexPath}): BMCollectionViewLayoutAttributes;


	/**
	 * @deprecated Currently unused.
	 * Retrieves the index path of the cell that intersects the given point.
	 * The x position of the point is ignored; this method assumes that all rows have infinite width.
	 * If no cell intersects the point, this method will either return the previous 
	 * or the next closest index path, depending on its direction parameter.
	 * 											the next closest index path to the given point if no cell intersects it;
	 * 											otherwise the previous closest index path is returned.
	 * @return 				The intersecting index path or undefined if the collection view contains no data.
	 *  
	 */
	indexPathAtPoint(point: BMPoint, args?: {directionNext?: boolean | null | undefined}): BMIndexPath | null | undefined;

}


/**
 * A value which may be assigned to the rowHeight property to indicate that the row heights vary by row.
 * 
 */
declare var BMCollectionViewTableLayoutRowHeightVariable: number;



/**
 * The BMCollectionViewTreeLayout will lay out its elements as a list where each row can have
 * either a fixed height or a variable height. Additionally, the elements may be nested, creating a tree-like view.
 * 
 * The tree layout supports collapsible sections and it also supports collapsing the tree elements themselves.
 * Collection views that use the tree layout are required to have a delegate that implements the following methods:
 * String collectionViewLayoutTreeIdentifierForItemAtIndexPath(BMCollectionView, BMCollectionViewTreeLayout, BMIndexPath) - returns a unique identifier for each item in the collection view
 * nullable String collectionViewLayoutTreeParentIdentifierForItemAtIndexPath(BMCollectionView, BMCollectionViewTreeLayout, BMIndexPath) - returns the identifier of each item's parent, if it has one
 * 
 * If the row heights are variable, the collection must have a delegate that implements the 
 * Number collectionViewRowHeightForCellAtIndexPath(BMCollectionView, BMIndexPath) method.
 * 
 * Optionally, the tree layout may also generate supplementary views for section headers, section footers and empty views.
 * 
 */
declare class BMCollectionViewTreeLayout extends BMCollectionViewLayout {

	/**
	 * The row height to use for each row.
	 * This can either be a specific size in pixels or BMCollectionViewTreeLayoutRowHeightVariable if each row can have a different height.
	 * If the row heights are variable, the collection must have a delegate that implements the Number collectionViewRowHeightForCellAtIndexPath(BMCollectionView, BMIndexPath) method.
	 *  
	 */
	rowHeight: number;

	/**
	 * Determines whether or not the tree layout should generate header supplementary views or not.
	 *  
	 */
	showsHeaders: boolean;

	/**
	 * The height to use for headers. Does not have any effect if showsHeaders is set to NO.
	 * This attribute is always 0 if showsHeader is set to NO.
	 *  
	 */
	headerHeight: number;

	/**
	 * Determines whether or not the tree layout should generate footer supplementary views or not.
	 *  
	 */
	showsFooters: boolean;

	/**
	 * The height to use for footers. Does not have any effect if showsFooters is set to NO.
	 * This attribute is always 0 if showsFooters is set to NO.
	 *  
	 */
	footerHeight: number;

	/**
	 * The amount by which child views will be indented.
	 *  
	 */
	indentWidth: number;

	/**
	 * The insets to apply to each section which control their distance from the collection view edges and from other sections.
	 *  
	 */
	sectionInsets: BMInset;

	/**
	 * When set to YES, the tree layout will stick the header supplementary views to the top edge of the collection view while scrolling.
	 * Otherwise, the header supplementary views will scroll with the rest of the content.
	 *  
	 */
	pinsHeadersToContentEdge: boolean;

	/**
	 * When set to YES, the tree layout will stick the footer supplementary views to the bottom edge of the collection view while scrolling.
	 * Otherwise, the footer supplementary views will scroll with the rest of the content.
	 *  
	 */
	pinsFootersToContentEdge: boolean;

	/**
	 * Contains various cached layout attributes.
	 *  
	 */
	private _layoutCache: any;

	/**
	 * Creates and returns a copy of this tree layout.
	 * @return 		A tree layout.
	 *  
	 */
	copy(): BMCollectionViewTreeLayout;

}


declare class BMCollectionViewFlowLayoutGravity {

	/**
	 * The cells will flow to the center of the row with no spacing between them.
	 *  
	 */
	readonly Center: any;

	/**
	 * The cells will flow to the edges of the row with equal spacing between them.
	 *  
	 */
	readonly Edge: any;

	/**
	 * The cells will flow such that they have equal spacing between them and the row edges.
	 *  
	 */
	readonly Spaced: any;

	/**
	 * The cells will flow such that they will have no spacing between them.
	 * If the cells in a row do not occupy the entire horizontal alrea of that row, they will be expanded proportionally until they do.
	 *  
	 */
	readonly Expand: any;
}


declare class BMCollectionViewFlowLayoutAlignment {

	/**
	 * The cells will be aligned to the top edge of the row.
	 *  
	 */
	readonly Top: any;

	/**
	 * The cells will be aligned to the center of the row.
	 *  
	 */
	readonly Center: any;

	/**
	 * The cells will be aligned to the bottom of the row.
	 *  
	 */
	readonly Bottom: any;

	/**
	 * The cells will expand to fit the entire height of the row.
	 *  
	 */
	readonly Expand: any;
}


/**
 * The flow layout arranges cells in a horiztonally (TO DO) or vertically scrolling container.
 * The cells will each flow on a row until they no longer fit. After they extend past the horizontal margin, they will move on to the next row.
 * 
 */
declare class BMCollectionViewFlowLayout extends BMCollectionViewLayout {

	/**
	 * The size of the cells, or undefined if the cells should be sized dynamically.
	 * If the cells are sized dynamically, the collection view must have a delegate that implements the
	 * BMSize collectionViewSizeForCellAtIndexPath(BMCollectionView, BMIndexPath) method, 
	 * otherwise the collection view will not be able to render any cells.
	 *  
	 */
	cellSize?: BMSize | null | undefined;

	/**
	 * The spacing between each row. This is also used between the header and the first row and between the last row and the footer.
	 *  
	 */
	rowSpacing: number;

	/**
	 * Determines whether or not the table layout should generate header supplementary views or not.
	 *  
	 */
	showsHeaders: boolean;

	/**
	 * The height to use for headers. Does not have any effect if showsHeaders is set to NO.
	 * This attribute is always 0 if showsHeader is set to NO.
	 *  
	 */
	headerHeight: number;

	/**
	 * Determines whether or not the table layout should generate footer supplementary views or not.
	 *  
	 */
	showsFooters: boolean;

	/**
	 * The height to use for footers. Does not have any effect if showsFooters is set to NO.
	 * This attribute is always 0 if showsFooters is set to NO.
	 *  
	 */
	footerHeight: number;

	/**
	 * The insets to apply to each section which control their distance from the collection view edges and from other sections.
	 *  
	 */
	sectionInsets: BMInset;

	/**
	 * Controls how items are spaced in each row horizontally.
	 *  
	 */
	gravity: BMCollectionViewFlowLayoutGravity;

	/**
	 * Controls the minimum horizontal spacing between cells. This spacing is guaranteed to be applied between the cells
	 * irrespective of the selected gravity.
	 *  
	 */
	minimumSpacing: number;

	/**
	 * Only used with fixed cell sizes. If set to YES, the final row in each section will be left-aligned.
	 *  
	 */
	leftAlignFinalRow: boolean;

	/**
	 * Controls how items are aligned in each row vertically.
	 *  
	 */
	alignment: BMCollectionViewFlowLayoutAlignment;

	/**
	 * The padding from the top edge to the first item.
	 *  
	 */
	topPadding: number;

	/**
	 * The padding from the bottom edge to the last item.
	 *  
	 */
	bottomPadding: number;

	/**
	 * Controls how the content is aligned when it is smaller than the collection view's frame.
	 *  
	 */
	contentGravity: BMCollectionViewFlowLayoutAlignment;

	/**
	 * When set to YES, the flow layout will stick the header supplementary views to the top edge of the collection view while scrolling.
	 * Otherwise, the header supplementary views will scroll with the rest of the content.
	 *  
	 */
	pinsHeadersToContentEdge: boolean;

	/**
	 * When set to YES, the flow layout will stick the footer supplementary views to the bottom edge of the collection view while scrolling.
	 * Otherwise, the footer supplementary views will scroll with the rest of the content.
	 *  
	 */
	pinsFootersToContentEdge: boolean;

	/**
	 * Prepares the layout, optionally taking the scrollbar size into account.
	 *  
	 */
	private _prepareLayoutWithScrollbarOffset(): void;


	/**
	 * Reflows a cached row object based on the current alignment and gravity.
	 *  
	 */
	reflowRow(row: any, args: {forWidth: number, height: number, withOccupiedWidth: number, spacing: number}): void;


	/**
	 * Returns the cached cell attributes for the cell at the given index path.
	 * This method should only be used when using variable cell sizes.
	 * @return 		The corresponding cell attributes.
	 * @throw											If there are no cached attributes for the specified index path.
	 *  
	 */
	cachedAttributesForCellAtIndexPath(indexPath: BMIndexPath, args?: {usingCache?: any | null | undefined}): BMCollectionViewLayoutAttributes;


	/**
	 * Computes and returns the attributes for the cell at the given index path.
	 * This method should only be used when using fixed cell sizes.
	 * @return 	The corresponding cell attributes.
	 * @throws										If the index path is out of bounds.
	 *  
	 */
	computedAttributesForCellAtIndexPath(indexPath: BMIndexPath, args?: {usingCache?: any | null | undefined}): BMCollectionViewLayoutAttributes;


	/**
	 * Returns the cached cell attributes for the supplementary view with the given identifier at the given index path.
	 * This method should only be used when using variable cell sizes.
	 * @return 		The corresponding cell attributes, or undefined if there are no cached attributes for the specified index path
	 * 														or the requested supplementary view type is unsupported.
	 *  
	 */
	cachedAttributesForSupplementaryViewWithIdentifier(identifier: string, args: {atIndexPath: BMIndexPath, usingCache?: any | null | undefined}): BMCollectionViewLayoutAttributes | null | undefined;


	/**
	 * Computes and returns the cell attributes for the supplementary view with the given identifier at the given index path.
	 * This method should only be used when using fixed cell sizes.
	 * @return 		The corresponding cell attributes, or undefined if the section index is out of bounds 
	 * 														or the requested supplementary view type is unsupported.
	 *  
	 */
	computedAttributesForSupplementaryViewWithIdentifier(identifier: string, args: {atIndexPath: BMIndexPath, usingCache?: any | null | undefined}): BMCollectionViewLayoutAttributes | null | undefined;


	/**
	 * Returns the cached cell attributes for all elements in the given rect. This method should only be used when using variable cell sizes.
	 * @return 				An array of cell attributes.
	 *  
	 */
	cachedAttributesForElementsInRect(rect: BMRect, args?: {usingCache?: any | null | undefined}): BMCollectionViewLayoutAttributes[];


	/**
	 * Computes and returns the cell attributes for all elements in the given rect. This method should only be invoked when using fixed cell sizes.
	 * @return 				An array of cell attributes.
	 *  
	 */
	computedAttributesForElementsInRect(rect: BMRect, args?: {usingCache?: any | null | undefined}): BMCollectionViewLayoutAttributes[];

}


/**
 * The identifiers for flow layout supplementary views.
 * As the flow layout only provides supplementary views for section headers and footers and empty data sets just like the table layout,
 * the identifiers used by the table layout are reused in this case.
 * 
 */
declare var BMCollectionViewFlowLayoutSupplementaryView: any;



/**
 * The masonry layout arranges cells in a vertically scrolling container. Cells will be laid out in equally wide columns and each new cell will be positioned
 * in the column with the topmost space available, starting from the leftmost cell.
 * Additionally, columns in the masonry layout may have a speed assigned to them which affects the scrolling for that column alone. When a column has a higher scrolling speed,
 * it may contain more items for the same container height. Note that while layout order is deterministic, it does not always respect the order the items appear in the data set.
 * When using the masonry layout, the collection view must have a delegate that implements the method
 * Number collectionViewHeightForCellAtIndexPath(BMCollectionView BMIndexPath, {forColumnWidth: Number}) which returns the height to use for the cell at the given index path.
 * Because the masonry layout is a cached layout, it is not suitable for excessively large data sets.
 * The masonry layout does not support supplementary view and will ignore sections.
 * 
 */
declare class BMCollectionViewMasonryLayout extends BMCollectionViewLayout {

	/**
	 * Mutually exclusive with numberOfColumns. If set, controls the minimum size a column may have. 
	 * Columns' width may be larger than this value, but this a the breakpoint based on which it is decided when to add or remove columns.
	 *  
	 */
	minimumColumnWidth?: number | null | undefined;

	/**
	 * Mutually exclusive with minimumColumns. If set, has priority over minimumColumnWidth and controls how many columns the masonry layout should use. 
	 * Columns will be resized so they fit.
	 *  
	 */
	numberOfColumns?: number | null | undefined;

	/**
	 * Controls the horizontal spacing between columns.
	 *  
	 */
	columnSpacing: number;

	/**
	 * Controls the vertical spacing between the cells in a column.
	 *  
	 */
	cellSpacing: number;

	/**
	 * Controls how fast each column scrolls.
	 *  
	 */
	columnSpeeds: number[];

	/**
	 * The padding from the top edge to the first item.
	 *  
	 */
	topPadding: number;

	/**
	 * The padding from the bottom edge to the last item.
	 *  
	 */
	bottomPadding: number;

	/**
	 * Contains the cached layout attributes for all objects in the collection view.
	 *  
	 */
	cachedLayout: any;

	/**
	 * Retrieves the cached attributes for all cells in the given rect.
	 *  
	 */
	cachedAttributesForElementsInRect(rect: BMRect, args?: {usingCache?: any | null | undefined}): void;


	/**
	 * Retrieves the cached attributes for the cell at the given index path.
	 *  
	 */
	cachedAttributesForCellAtIndexPath(indexPath: BMIndexPath, args?: {usingCache?: any | null | undefined}): void;

}


/**
 * The stack layout is a vertically scrolling layout that presents cells as a stack, where the current cell appears above the other cells.
 * In the stack layout, previous cells appear behind the current cell, while upcoming cells are hidden.
 * 
 * When scrolling in the stack layout, the scroll position will always snap back to fully show a single cell.
 * 
 * The stack layout does not support sections or supplementary views.
 * 
 */
declare class BMCollectionViewStackLayout extends BMCollectionViewLayout {

	/**
	 * Controls how the stack layout will appear when there is a single cell in the data set.
	 * When this property is set to YES, insets are ignored when there is a single cell and that cell will occupy
	 * the collection view's entire area.
	 * If it is set to NO, the single cell will have the usual insets applied to it.
	 *  
	 */
	showsSingleCellFullScreen: boolean;

	/**
	 * When enabled, stack layout will only show the first cell in the data set, without any padding.
	 *  
	 */
	showsSingleCell: boolean;

	/**
	 * Controls the edges between the content and the collection view.
	 *  
	 */
	insets: BMInset;

	/**
	 * Controls the spread between background cells.
	 *  
	 */
	spread: number;

	/**
	 * Controls how many background cells will be shown.
	 *  
	 */
	numberOfBackgroundCells: number;

	/**
	 * Controls the minimum scale for background cells.
	 *  
	 */
	minimumScale: number;

	/**
	 * Controls whether cells behind the topmost cell are blurred.
	 *  
	 */
	blursBackgroundCells: boolean;

	/**
	 * Controls the maximum blur of background cells.
	 *  
	 */
	maximumBlur: number;

	/**
	 * Controls whether new cells scroll in with a rotation effect.
	 *  
	 */
	rotatesCells: boolean;

	/**
	 * Controls the maximum rotation of cells, in degrees.
	 *  
	 */
	rotation: number;

	/**
	 * Cached number of items in the current data set.
	 *  
	 */
	private _numberOfObjects: number;

	/**
	 * Returns the index path that appears before the given index path in the data set.
	 * If the given index path is the first index path in the data set, the result will be undefined.
	 * @return 				The previous index path if it could be found, undefiend otherwise.
	 *  
	 */
	previousIndexPathWithIndexPath(indexPath: BMIndexPath): BMIndexPath;


	/**
	 * Returns the index path that appears after the given index path in the data set.
	 * If the given index path is the last index path in the data set, the result will be undefined.
	 * @return 				The next index path if it could be found, undefiend otherwise.
	 *  
	 */
	nextIndexPathWithIndexPath(indexPath: BMIndexPath): BMIndexPath;

}


declare class BMCollectionViewTileLayoutOrientation {

	/**
	 * Indicates that the tile layout will arrange cells primarily along the horizontal axis.
	 * When the orientation is set to this value the tile layout will scroll horizontally and cells
	 * will be primarily placed into the leftmost available positions.
	 *  
	 */
	readonly Horizontal: any;

	/**
	 * Indicates that the tile layout will arrange cells primarily along the vertical axis.
	 * When the orientation is set to this value the tile layout will scroll vertically and cells
	 * will be primarily placed into the topmost available positions.
	 *  
	 */
	readonly Vertical: any;
}


/**
 * TBD.
 * 
 * Collection views using the tile layout must have a delegate object that conforms to the `BMCollectionViewDelegateTileLayout` protocol.
 * 
 */
declare class BMCollectionViewTileLayout extends BMCollectionViewLayout {

	/**
	 * An optional number which represents the grid size to which all sizes will be constrained.
	 * If this property is set to a positive number, all size dimensions will be constrained to the closest number
	 * that is a multiple of this property.
	 *  
	 */
	gridSize: number;

	/**
	 * When set to a positive number, this represents the spacing to use between cells.
	 *  
	 */
	spacing: number;

	/**
	 * Determines whether or not the tile layout should generate header supplementary views or not.
	 *  
	 */
	showsHeaders: boolean;

	/**
	 * The height to use for headers. Does not have any effect if showsHeaders is set to NO.
	 * This attribute is always 0 if showsHeader is set to NO.
	 *  
	 */
	headerHeight: number;

	/**
	 * Determines whether or not the tile layout should generate footer supplementary views or not.
	 *  
	 */
	showsFooters: boolean;

	/**
	 * The height to use for footers. Does not have any effect if showsFooters is set to NO.
	 * This attribute is always 0 if showsFooters is set to NO.
	 *  
	 */
	footerHeight: number;

	/**
	 * The insets to apply to each section which control their distance from the collection view edges and from other sections.
	 *  
	 */
	sectionInsets: BMInset;

	/**
	 * The padding from the top edge to the first item.
	 *  
	 */
	topPadding: number;

	/**
	 * The padding from the bottom edge to the last item.
	 *  
	 */
	bottomPadding: number;

	/**
	 * When set to YES, the tile layout will stick the header supplementary views to the top edge of the collection view while scrolling.
	 * Otherwise, the header supplementary views will scroll with the rest of the content.
	 *  
	 */
	pinsHeadersToContentEdge: boolean;

	/**
	 * When set to YES, the tile layout will stick the footer supplementary views to the bottom edge of the collection view while scrolling.
	 * Otherwise, the footer supplementary views will scroll with the rest of the content.
	 *  
	 */
	pinsFootersToContentEdge: boolean;

	/**
	 * The tile layout's orientation.
	 * For more information about the possible values, refer to the
	 * documentation for the `BMCollectionViewTileLayout` enum.
	 *  
	 */
	orientation: BMCollectionViewTileLayout;

	/**
	 * Set to YES while the collection view is performing a layout invalidation
	 * in response to a bounds change.
	 *  
	 */
	private _isChangingBounds: boolean;

	/**
	 * Returns a size that represents the given size, constrained to this layout's grid size and maximum available space.
	 * This does not modify the original size.
	 * @return 			The constrained size.
	 *  
	 */
	constrainedSizeWithSize(size: BMSize): BMSize;


	/**
	 * Returns a value that represents the multiple of this layout's grid size that is closest to the given value.
	 * @return 				The constrained value.
	 *  
	 */
	constrainedValueWithValue(value: number): number;


	/**
	 * Prepares the layout, optionally taking the scrollbar size into account.
	 *  
	 */
	private _prepareLayoutWithScrollbarOffset(): void;


	/**
	 * Prepares the layout for a single section, optionally taking the scrollbar size into account.
	 *  
	 */
	private _prepareLayoutForSection(section: number, args: {intoCache: any}): void;


	/**
	 * Returns the extent resulting by trimming the entire left side of the given extent
	 * by the given rect.
	 * The given rect must intersect the extent from the top, left or bottom, otherwise the resulting
	 * extent will not be valid.
	 * @return 							The resulting extent.
	 *  
	 */
	rightExtentByTrimmingLeftSideOfExtent(extent: BMRect, args: {withIntersectingRect: BMRect}): BMRect;


	/**
	 * Returns the extent resulting by trimming the entire right side of the given extent
	 * by the given rect.
	 * The given rect must intersect the extent from the top, right or bottom, otherwise the resulting
	 * extent will not be valid.
	 * @return 							The resulting extent.
	 *  
	 */
	leftExtentByTrimmingRightSideOfExtent(extent: BMRect, args: {withIntersectingRect: BMRect}): BMRect;


	/**
	 * Returns the extent resulting by trimming the entire bottom side of the given extent
	 * by the given rect.
	 * The given rect must intersect the extent from the top, right or left, otherwise the resulting
	 * extent will not be valid.
	 * @return 							The resulting extent.
	 *  
	 */
	topExtentByTrimmingBottomSideOfExtent(extent: BMRect, args: {withIntersectingRect: BMRect}): BMRect;


	/**
	 * Returns the extent resulting by trimming the entire top side of the given extent
	 * by the given rect.
	 * The given rect must intersect the extent from the bottom, right or left, otherwise the resulting
	 * extent will not be valid.
	 * @return 							The resulting extent.
	 *  
	 */
	bottomExtentByTrimmingTopSideOfExtent(extent: BMRect, args: {withIntersectingRect: BMRect}): BMRect;


	/**
	 * Returns an array of extent rects that represent the possible extents created after the given rect is placed within an extent.
	 * This will slice up the given extent and return the remaining extents. These extents will contain intersecting regions.
	 * The given rect must intersect the extent from the top, otherwise this function's result will not be well-defined.
	 * @return 					The resulting extents.
	 *  
	 */
	rectsWithDifferenceOfExtent(extent: BMRect, args: {fromRect: BMRect, spacing?: number | null | undefined}): BMRect[];

}


/**
 * An list of constants describing what happens to source objects when they are transferred
 * from a source collection view.
 * 
 */
declare class BMCollectionViewTransferPolicy {
	/**
	 * Indicates that the source collection view will allow the target collection view
	 * to move the items. The move only happens if the target collection view also
	 * specifies a move accept policy.
	 *  
	 */
	static Move: BMCollectionViewTransferPolicy;

	/**
	 * Indicates that the source collection view will retain the items regardless of the
	 * accepting collection view's accept policy.
	 *  
	 */
	static Copy: BMCollectionViewTransferPolicy;

	private constructor(); 
}

/**
 * An list of constants describing what happens to source objects when they are transferred
 * to a destination collection view.
 * 
 */
declare class BMCollectionViewAcceptPolicy {
	/**
	 * Indicates that the target collection view would like the transferred items to be
	 * removed from the source collection view.
	 *  
	 */
	static Move: BMCollectionViewAcceptPolicy;

	/**
	 * Indicates that the items will not be removed from the source collection view.
	 *  
	 */
	static Copy: BMCollectionViewAcceptPolicy;

	private constructor(); 
}



/**
 * The default animation duration.
 * 
 */
declare var _BMCollectionViewAnimationDurationDefault: number;



/**
 * The default animation easing.
 * 
 */
declare var _BMCollectionViewAnimationEasingDefault: string;



/**
 * The default animation stride.
 * 
 */
declare var _BMCollectionViewAnimationStrideDefault: string;



/**
 * The delay in miliseconds before two successive clicks or taps are considered a double click.
 * 
 */
declare var _BMCollectionViewDoubleClickDelay: number;



/**
 * The delay in miliseconds before a click or tap is considered a long click.
 * 
 */
declare var _BMCollectionViewLongClickDelay: number;



/**
 * The number of pixels a touch or clicked pointer can wander off before being considered a drag rather than a tap or click.
 * 
 */
declare var _BMCollectionViewClickSlopeThreshold: number;



/**
 * The time in milliseconds to wait before considering that a scroll operation was finished.
 * When this time expires, the collection view will request snapping offsets from layout objects
 * that support snapping.
 * 
 */
declare var _BMCollectionViewSnappingScrollThreshold: number;



/**
 * The default identity comparator that uses the == operator to test for equality.
 * @return 					YES if the objects are equal, NO otherwise.
 * 
 */
declare function _BMCollectionViewIdentityComparator(o1?: any | null | undefined, o2?: any | null | undefined): boolean;



/**
 * The type of scrolling that the collection view supports.
 * 
 */
declare class BMCollectionViewScrollingDirection {
	/**
	 * Indicates that the collection view will only scroll vertically.
	 *     
	 */
	static Vertical: BMCollectionViewScrollingDirection;

	/**
	 * Indicates that the collection view will only scroll horizontally.
	 *     
	 */
	static Horizontal: BMCollectionViewScrollingDirection;

	/**
	 * Indicates that the collection view will scroll both vertically and horizontally.
	 *     
	 */
	static Both: BMCollectionViewScrollingDirection;

	private constructor(); 
}

/**
 * Controls the final horizontal scrolling position of a programatic scroll.
 * 
 */
declare class BMCollectionViewScrollingGravityHorizontal {
	/**
	 * Indicates that the target view will appear on the left edge of the collection view after the scroll.
	 *  
	 */
	static Left: BMCollectionViewScrollingGravityHorizontal;

	/**
	 * Indicates that the target view will appear centered horizontally in the collection view after the scroll.
	 *  
	 */
	static Center: BMCollectionViewScrollingGravityHorizontal;

	/**
	 * Indicates that the target view will appear on the right edge of the collection view after the scroll.
	 *  
	 */
	static Right: BMCollectionViewScrollingGravityHorizontal;

	private constructor(); 
}

/**
 * Controls the final vertical scrolling position of a programatic scroll.
 * 
 */
declare class BMCollectionViewScrollingGravityVertical {
	/**
	 * Indicates that the target view will appear on the top edge of the collection view after the scroll.
	 *  
	 */
	static Top: BMCollectionViewScrollingGravityVertical;

	/**
	 * Indicates that the target view will appear centered vertically in the collection view after the scroll.
	 *  
	 */
	static Center: BMCollectionViewScrollingGravityVertical;

	/**
	 * Indicates that the target view will appear on the bottom edge of the collection view after the scroll.
	 *  
	 */
	static Bottom: BMCollectionViewScrollingGravityVertical;

	private constructor(); 
}

/**
 * The BMCollectionView manages a horizontally or vertically scrolling list of elements created from a template.
 * The collection view will only render the elements that are actually visible on screen and will recycle and reuse
 * elements as they go off screen when the user scrolls the container.
 * 
 * The position and size of the elements is determined by a layout object. The layout object is responsible for
 * calculating how large the collection should be and where each element should pe placed. Additionally, the layout
 * object may define its own supplementary views that are not explicitly part of the data set but will be rendered by the collection view.
 * It may interact with the data set to determine where to place these elements and how many of them there should be.
 * By default, the collection view will create and use an instance of BMCollectionViewFLowLayout.
 * 
 * The contents and order of the elements is determined by a data set object. The elements can optionally be grouped into sections.
 * The data set object is responsible for managing the model objects that correspond to the collection elements and letting the
 * collection view know the number and order of sections and elements that will be displayed. It also provides the actual contents
 * of the collection view elements.
 * The data set object must be defined and set in order to use the collection view.
 * 
 * Finally, the delegate object may be provided to respond to various collection view events. The delegate may also be used to configure the collection view's
 * behaviour. For example, the collection view may ask its delegate if it can select or deselect elements.
 * The delegate object and all of its methods are optional.
 * 
 * BMCollectionView objects should not be created using the constructor. Instead the BMCollectionViewMakeWithContainer function should be used to obtain new instances
 * of collection views.
 * 
 * 
 */
declare class BMCollectionView {

	/**
	 * An optional delegate object that can receive various callbacks from the collection view.
	 *  
	 */
	delegate?: BMCollectionViewDelegate | null | undefined;

	/**
	 * A required data set object that specifies how many objects are in this collection view and configures their contents.
	 *  
	 */
	dataSet: BMCollectionViewDataSet;

	/**
	 * The collection view's container element.
	 *  
	 */
	readonly container: $;

	/**
	 * A callback that the collection view will invoke to test objects for identity.
	 * Two objects may refer to the same object even if they are not strictly equals.
	 * When performing full data set changes, this callback will be used by the collection view
	 * to compare objects between the current and the old data set to determine how the contents have changed.
	 * The callback takes two parameters that represent the two objects to compare and must return a truthy or falsy value
	 * indicating whether the objects are equal or not.
	 * This method may be redefined to customize the equality test.
	 * The default implementation tests for identity using the == operator.
	 *  
	 */
	identityComparator: (($0: any | null | undefined, $1: any | null | undefined) => boolean);

	/**
	 * May be invoked to get the complete index path of an object at the given row within the given section.
	 * @return 	The complete index path, or undefined if there is no object with the specified indexes.
	 *  
	 */
	indexPathForObjectAtRow(row: Int, args: {inSectionAtIndex: Int}): BMIndexPath | null | undefined;


	/**
	 * May be invoked to get the complete index path of an object within the data set.
	 * The object should be tested against the data set using the collection's view identity comparator,
	 * but the actual implementaion is delegated to the data set object.
	 * @return 	The complete index path, or undefined if the object is not part of the data set.
	 *  
	 */
	indexPathForObject(object: any): BMIndexPath | null | undefined;


	/**
	 * May be invoked to get the number of sections in the data set.
	 * If there is no data set attached to this collection view, this method returns 0.
	 * @return 					The object count.
	 *  
	 */
	numberOfSections(): Int;


	/**
	 * May be invoked to get the number of objects in the specified section.
	 * If there is no data set attached to this collection view, this method returns 0.
	 * @return 					The object count.
	 *  
	 */
	numberOfObjectsInSectionAtIndex(i: Int): Int;


	/**
	 * The layout object managing this collection view's layout.
	 *  
	 */
	layout: BMCollectionViewLayout;

	/**
	 * The collection view's size and its position relative to its parent element.
	 *  
	 */
	readonly frame: BMRect;

	/**
	 * The size of the content in the collection view.
	 *  
	 */
	readonly size: BMRect;

	/**
	 * The container that contains all the collection view cells.
	 *  
	 */
	readonly contentWrapper: $;

	/**
	 * The collection view's bounds, which represent the rect that is currently rendered on screen.
	 * The bounds's size usually depend on the frame's size and the off-screen buffer factor, and its coordinates are relative to the collection view's frame.
	 *  
	 */
	readonly bounds: BMRect;

	/**
	 * The number of pixels by which to extend the bounds to preload layout attributes and render off-screen elements.
	 * Higher values will create more cells and reduce the flickering at high scroll speeds, but will use more memory and processing time.
	 *  
	 */
	private _offscreenBufferSize: Int;

	/**
	 * The percentage of frame size to use when computing a new off-screen buffer size.
	 * Higher values will cause more off-screen elements to be rendered which decreases the flicker at high scrolling speeds.
	 * Lower values decrease the number of off-screen elements and should be used to reduce the jitter on iOS when complex layouts
	 * that reflow often are used as cell contents.
	 *  
	 */
	offscreenBufferFactor: number;

	/**
	 * @deprecated Currently unused.
	 * The scrolling direction supported by this collection view.
	 *  
	 */
	private _scrollingDirection: BMCollectionViewScrollingDirection;

	/**
	 * The cell cache contains unused cells, grouped by their reuse identifiers.
	 *  
	 */
	cellCache: Dictionary< [BMCollectionViewCell]>;

	/**
	 * The supplementary view cache contains unused supplemetnary views, grouped by their reuse identifiers.
	 *  
	 */
	supplementaryViewCache: Dictionary< [BMCollectionViewCell]>;

	/**
	 * The attributes cache contains cached attributes for all cells and supplementary views as they are requested.
	 * The attribute cache map keys are the containing rects. Whenever the layout is invalidated for any reason, the old pages are discarded.
	 *  
	 */
	attributeCache: Dictionary< [BMCollectionViewLayoutAttributes]>;

	/**
	 * The list of retained cells. This only includes cells managed by the collection view.
	 *  
	 */
	retainedCells: BMCollectionViewCell[];

	/**
	 * The list of all retained cells, including those retained by the developer, outside the collection view's visible area.
	 *  
	 */
	allCells: BMCollectionViewCell[];

	/**
	 * Set to NO until this collection view first receives a valid data set and renders its first set of cells.
	 *  
	 */
	initialized: boolean;

	/**
	 * If set to YES, this collection view will collect and create cells when scrolling.
	 * This property is only set to NO during animated updates while interactive scrolling is disabled.
	 *  
	 */
	private _collectionEnabled: boolean;

	/**
	 * Animatable. The exact scroll offset.
	 *  
	 */
	scrollOffset: BMPoint;

	/**
	 * The scrollbar size as used by the collection view.
	 * In most cases this value is platform dependent, but when using iScroll this value is always 0.
	 *  
	 */
	readonly scrollBarSize: number;

	/**
	 * When auto-resize is enabled, this property is set to a unique identifier used for the window resize listener.
	 * Otherwise this property will be undefined.
	 *  
	 */
	private _autoResizeToken: (($0: Event) => void);

	/**
	 * Controls whether this collection view handles resize events on its own automatically.
	 * When set to YES, the collection view will recalculate its frame whenever the window resizes.
	 * Otherwise you must invoke the resized() method whenever anything modifies the collection view's size.
	 * Note that even when this property is set to YES, you must also invoke the resized() method whenever
	 * this collection view's size changes for any reason other than the window resizing.
	 *  
	 */
	autoResizes: boolean;

	/**
	 * The default cell class that will be instantiated when new cells or supplementary views are created.
	 * Changing this property will not affect already created cells, but cells created afterwards
	 * will be instantiated from this class.
	 *  
	 */
	cellClass: typeof BMCollectionViewCell;

	/**
	 * A dictionary containing the classes to use when instantiating cells with different reuse identifiers.
	 *  
	 */
	private _cellClasses: Dictionary< typeof BMCollectionViewCell>;

	/**
	 * Registers a class to be used when creating cells with the given reuse identifier.
	 * This does not affect already existing cells, but newly created cells with the given identifier will be created
	 * as instances of the given class.
	 * 																		will use the default class.
	 *  
	 */
	registerCellClass(cellClass: typeof BMCollectionViewCell | null | undefined, args: {forReuseIdentifier: string}): void;


	/**
	 * A dictionary containing the classes to use when instantiating supplementary views with different reuse identifiers.
	 *  
	 */
	private _supplementaryViewClasses: Dictionary< typeof BMCollectionViewCell>;

	/**
	 * Registers a class to be used when creating supplementary views with the given reuse identifier.
	 * This does not affect already existing supplementary views, but newly created supplementary views with the given identifier will be created
	 * as instances of the given class.
	 * 																					the supplementary views with this reuse identifier will use the default class.
	 *  
	 */
	registerSupplementaryViewClass(supplementaryViewClass: typeof BMCollectionViewCell | null | undefined, args: {forReuseIdentifier: string}): void;


	/**
	 * Should not be invoked manually. It is invoked by the collection view itself to create the initial layout and cells.
	 *  
	 */
	private _init(): void;


	/**
	 * Should be invoked whenever anything in the layout has changed and no longer matches what the collection view is displaying.
	 * This will cause the collection to reconstruct its layout.
	 * The layout may not be invalidated during an animated data change. If the collection view is currently running an animated data change,
	 * the layout will only be invalidated after that update completes.
	 *  
	 */
	invalidateLayout(): void;


	/**
	 * Should be invoked whenever parts of the layout have changed and no longer match what the collection view is displaying.
	 * This will cause the collection to reconstruct its layout.
	 * The layout may not be invalidated during an animated data change. If the collection view is currently running an animated data change,
	 * the layout will only be invalidated after that update completes.
	 * Currently this method is not implemented and simply calls `invalidateLayout()`.
	 *  
	 */
	invalidateLayoutWithContext(context: BMCollectionViewLayoutInvalidationContext, args?: {animated?: boolean | null | undefined}): void;


	/**
	 * Must be invoked whenever the DOM element node managed by this collection view is resized.
	 *  
	 */
	resized(): void;


	/**
	 * Invoked by the collection view when it needs to recalculate its frame.
	 *  
	 */
	private _prepareFrame(): void;


	/**
	 * Invoked by the collection view during initialization to create the initial bounds.
	 *  
	 */
	private _createBounds(): void;


	/**
	 * Invoked by the collection view to ensure that the bounds do not move off-screen.
	 *  
	 */
	private _constrainBounds(): void;


	/**
	 * Do not invoke manually. Invoked by the collection view itself in response to a bounds change invalidation request.
	 *  
	 */
	invalidateLayoutForBoundsChange(): void;


	/**
	 * Invoked by the collection view during a layout invalidation to recreate its layout.
	 *  
	 */
	private _reloadLayout(): void;


	/**
	 * Invoked by the collection view to apply the correct overflow values to the container.
	 *  
	 */
	private _applyOverflows(): void;


	/**
	 * Constructs and returns a correctly aligned and sized request rect that includes the given rect's origin point.
	 * If this rect has its origins outside the content bounds, this method returns nothing.
	 * @return 	A rect.
	 *  
	 */
	private _alignedRequestRectWithRect(rect: BMRect): BMRect | null | undefined;


	/**
	 * Constructs and returns a correctly aligned and sized request point that represents the origin of the request rect that includes the given point.
	 * @return 								A point.
	 *  
	 */
	private _alignedRequestOriginWithPoint(point: BMPoint): BMPoint;


	/**
	 * Constructs and returns a correctly aligned and sized request rect that includes the given point.
	 * If this point is outside the content bounds, this method returns undefined.
	 * @return 						A rect.
	 *  
	 */
	private _alignedRequestRectWithPoint(point: BMPoint): BMRect | null | undefined;


	/**
	 * Requests and returns attributes from the given rect from the layout object.
	 * @return 		The cell attributes.
	 *  
	 */
	private _requestAttributesInRect(rect: BMRect): BMCollectionViewLayoutAttributes[];


	/**
	 * Defaults to NO. When set to YES, the collection view will handle scroll events during the capture phase and process them as soon as they appear.
	 * This property should be enabled for layouts that modify their contents based on the scroll position.
	 * When this property is disabled, the collection view will batch scroll events and handle them once for each animation frame.
	 *  
	 */
	highFrequencyScrollingEnabled: boolean;

	/**
	 * Should not be invoked manually. Invoked whenever the container scrolls.
	 * This method schedules collection on the next animation frame if it wasn't already scheduled.
	 * @return 	If set to NO, the event will not propagate or trigger the default actions.
	 *  
	 */
	containerDidScrollWithEvent(event: $event): boolean | null | undefined;


	/**
	 * Should not be invoked manually. Invoked on every animation frame while the container is scrolling.
	 * This method collects all off-screen cells and renders new cells for items that appear on screen as the bounds change.
	 *  
	 */
	private _handleNewScrollFromEvent(event: $event): void;


	/**
	 * The token for the current timeout monitoring scroll events.
	 * When the timeout fires, the collection view will request and apply the snapping scroll offset from the layout object.
	 *  
	 */
	private _snappingScrollToken?: TimeoutToken | null | undefined;

	/**
	 * Invoked internally to prepare to snap the scroll position to a layout-defined snapping offset.
	 *  
	 */
	private _prepareForSnappingScrollOffsetWithPreviousOffset(previousOffset: BMPoint): void;


	/**
	 * Renders the cells corresponding to the attributes in the given array.
	 *  
	 */
	private _renderCellsWithAttributes(attributes: BMCollectionViewLayoutAttributes[], args?: {exclusive?: boolean | null | undefined}): void;


	/**
	 * @deprecated Consider publishing a data change and replacing the cell's object completely.
	 * Recreates the cell at the specified index path.
	 * Unlike when updating cells, the newly reconstructed may have a different reuse identifier after the refresh.
	 * If the cell at the specified indexPath is not currently visible or retained, this function has no effect.
	 * Note that if the old cell was retained, its retain count will not carry over to the new cell. You should only invoke
	 * this method on cells that are not retained or manually release the old cell and retain the new one.
	 * If the new cell is hidden this method may return an undefined cell.
	 * @return 		The new cell, if could be bound, undefined otherwise.
	 *  
	 */
	refreshCellAtIndexPath(indexPath: BMIndexPath, args?: {animated?: boolean | null | undefined}): BMCollectionViewCell | null | undefined;


	/**
	 * Should be invoked by the data set object to have the collection view generate and return a cell for the given reuse identifier.
	 * The created cell is not implicitly retained and it should not be retained until its layout attributes have been created and applied.
	 * @return 				A cell.
	 *  
	 */
	dequeueCellForReuseIdentifier(identifier: string): BMCollectionViewCell;


	/**
	 * A promise that is pending while there is an interactive move operation in progress.
	 * The promise is undefined or resolved whenever there is no interactive move operation.
	 *  
	 */
	interactiveMovement?: Promise<void> | null | undefined;

	/**
	 * An array containing the index paths being manipulated by a drag & drop event.
	 *  
	 */
	private _draggingIndexPaths?: BMIndexPath[] | null | undefined;

	/**
	 * Should be invoked when the data set changes during a drag & drop operation and the index paths
	 * corresponding to the items currently being dragged are no longer valid.
	 * This will cause the collection view to request new index paths from the data set object.
	 *  
	 */
	invalidateDraggingIndexPaths(): void;


	/**
	 * Invoked by CoreUI to determine if this collection view is a valid drop target for a set of items.
	 * @return 				`YES` if this collection view can accept the items, `NO` otherwise.
	 *  
	 */
	private _canAcceptItems(items: any[]): boolean;


	/**
	 * Invoked by CoreUI to insert a set of items into this collection view as a result of a drag & drop operation.
	 *  
	 */
	private _insertItems(items: any[], args: {toIndexPath: BMIndexPath, withDropShadows: Map<any, DOMNode>}): void;


	/**
	 * Begins a drag gesture from the given event. The drag event will move the cell from which
	 * the event originates.
	 * 											of the touch point that will control this drag & drop operation.
	 *  
	 */
	beginDragWithEvent(event: Event, args: {forCell: BMCollectionViewCell, touchIdentifier: any}): void;


	/**
	 * Should be invoked by the data set object to have the collection view generate and return a cell for a supplementary view with the given reuse identifier.
	 * The created cell is not implicitly retained and it should not be retained until its layout attributes have been created and applied.
	 * @return 				A cell.
	 *  
	 */
	dequeueCellForSupplementaryViewWithIdentifier(identifier: string): BMCollectionViewCell;


	/**
	 * Invoked by cells when they decide they should be rendered.
	 *  
	 */
	cellShouldRender(cell: BMCollectionViewCell): void;


	/**
	 * Invoked by cells when they are managed.
	 *  
	 */
	cellWasManaged(cell: BMCollectionViewCell): void;


	/**
	 * Invoked by cells when they decide they should be recycled.
	 * Detaches the element from the collection view container and adds the cell to its cache.
	 *  
	 */
	cellWasReleased(cell: BMCollectionViewCell): void;


	/**
	 * Invoked by cells when they are unmanaged.
	 *  
	 */
	cellWasUnmanaged(cell: BMCollectionViewCell): void;


	/**
	 * Invoked by cells when they are no longer valid and should be discarded.
	 * Removes the element from the collection view container.
	 *  
	 */
	cellWasInvalidated(cell: BMCollectionViewCell): void;


	/**
	 * Finds and returns the cell for the specified index path, if it exists.
	 * @return 								The cell if it exists, or undefined if it does not.
	 *  
	 */
	cellAtIndexPath(indexPath: BMIndexPath, args?: {ofType?: BMCollectionViewLayoutAttributesType | null | undefined, withIdentifier?: string | null | undefined}): BMCollectionViewCell | null | undefined;


	/**
	 * Finds and returns the cell for the supplementary view at specified index path, if it exists.
	 * @return 		The cell if it exists, or undefined if it does not.
	 *  
	 */
	supplementaryViewWithIdentifier(identifier: string, args: {atIndexPath: BMIndexPath}): BMCollectionViewCell | null | undefined;


	/**
	 * Finds, retains and returns the cell for the specified index path, if it exists.
	 * If the specified index path is out of view and it doesn't have a cell associated with it, the cell will be created, retained and returned.
	 * When the cell is no longer needed, it must be released so the collection view can recycle and reuse it.
	 * @return 		The cell if it exists, or undefined if the index path is out of bounds.
	 *  
	 */
	retainCellForIndexPath(indexPath: BMIndexPath): BMCollectionViewCell | null | undefined;


	/**
	 * Finds, retains and returns the cell for the supplementary view at the specified index path, if it exists.
	 * If the specified index path is out of view and it doesn't have a cell associated with it, the cell will be created and returned.
	 * When the cell is no longer needed, it must be released so the collection view can recycle and reuse it.
	 * @return 		The cell if it exists, or undefined if the index path is out of bounds.
	 *  
	 */
	retainSupplementaryViewWithIdentifier(identifier: string, args: {forIndexPath: BMIndexPath}): BMCollectionViewCell | null | undefined;


	/**
	 * Will be invoked whenever any cell is clicked or tapped.
	 *  
	 */
	cellWasClicked(cell: BMCollectionViewCell, args: {withEvent: $event}): void;


	/**
	 * Will be invoked whenever any cell is double clicked or double tapped.
	 *  
	 */
	cellWasDoubleClicked(cell: BMCollectionViewCell, args: {withEvent: $event}): void;


	/**
	 * Will be invoked whenever any cell is long clicked or long tapped.
	 *  
	 */
	cellWasLongClicked(cell: BMCollectionViewCell, args: {withEvent: $event}): void;


	/**
	 * Will be invoked whenever any cell is right clicked.
	 * @return 					Defaults to NO. This should be YES if the default behaviour should be supressed, NO otherwise.
	 *  
	 */
	cellWasRightClicked(cell: BMCollectionViewCell, args: {withEvent: $event}): boolean | null | undefined;


	/**
	 * The list of selected index paths.
	 * The index paths in the selection are all strictly compared to the index paths in the data set.
	 * Whenever an update occurs, the selection index paths will also be updated to the new data.
	 *  
	 */
	selectedIndexPaths: BMIndexPath[];

	/**
	 * Invoked by the collection view during an update to refresh the index paths of the selected cells.
	 * Index paths that are no longer in the data set will be removed and all other index paths will be updated
	 * to the correct section and row indexes.
	 *  
	 */
	private _updateSelectionIndexPaths(): void;


	/**
	 * Checks if the cell at the specified index path is selected.
	 * @return 				YES if the cell is selected, NO otherwise.
	 *  
	 */
	isCellAtIndexPathSelected(indexPath: BMIndexPath): boolean;


	/**
	 * Should be invoked to select the cell at the specified index path.
	 *  
	 */
	selectCellAtIndexPath(indexPath: BMIndexPath): void;


	/**
	 * Should be invoked to deselect the cell at the specified index path.
	 *  
	 */
	deselectCellAtIndexPath(indexPath: BMIndexPath): void;


	/**
	 * Should be invoked to change this collection view's layout. Optionally, this change may be animated.
	 * Invoking this method with the animated parameter set to NO is equivalent to asigning the layout property.
	 *  
	 */
	setLayout(layout: BMCollectionViewLayout, args?: {animated?: boolean | null | undefined, completionHandler?: (() => void) | null | undefined}): void;


	/**
	 * Contains all registered data update callbacks.
	 *  
	 */
	private _dataUpdateCallbacks: (() => void)[];

	/**
	 * Schedules a callback that will be invoked when the current or next data update completes.
	 * This callback will only be fired once.
	 *  
	 */
	registerDataCompletionCallback(callback: (() => void)): void;


	/**
	 * Will be invoked by the collection view as the last step during data updates.
	 * This method fires all registered data update callbacks.
	 *  
	 */
	private _executeDataCompletionCallbacks(): void;


	/**
	 * Will be invoked after the data set changes.
	 *  
	 */
	dataSetDidChangeFromDataSet(oldDataSet: BMCollectionViewDataSet): void;


	/**
	 * Should be invoked during an update to execute a block of code that will have access to the old data set.
	 *  
	 */
	usingOldDataSet(block: (() => void)): void;


	/**
	 * Should be invoked during an update to execute a block of code that will have access to the new data set.
	 *  
	 */
	usingNewDataSet(block: (() => void)): void;


	/**
	 * A promise initialized during data updates that resolves when the operation and its associated animations
	 * complete.
	 *  
	 */
	private _dataUpdatePromise?: Promise<void> | null | undefined;

	/**
	 * Should be invoked when the entire data set is updated in bulk.
	 * This method should be invoked when the data set object has access to the new data;
	 * All data set access methods should return the new data, but if this change is animated then until this method returns
	 * the data set object must be able to return information from the old data as well.
	 * 												that the layout does not have to change. Note that if you pass in a value of NO but the structure of your data
	 * 												changes in such a way that the layout should be invalidated the collection view may behave in an undefined manner
	 * 												until its layout is invalidated. This value must be explicitly set to NO or false to disable the layout refresh.
	 * @return 							A promise that resolves when this update completes, after any associated animation finishes.
	 *  
	 */
	updateEntireDataAnimated(animated?: boolean | null | undefined, args?: {updateLayout?: boolean | null | undefined, completionHandler?: (() => void) | null | undefined}): Promise<void>;


	/**
	 * Should be invoked to cause the collection view to scroll to the cell at the specified index path.
	 * Optionally, this scrolling may be animated.
	 * 																				which controls where on the screen the cell should appear after the scrolling operation
	 * 																				completes.
	 * 																				which controls where on the screen the cell should appear after the scrolling operation
	 * 																				completes.
	 * 																				instant.
	 *  
	 */
	scrollToCellAtIndexPath(indexPath: BMIndexPath, args?: {withVerticalGravity?: BMCollectionViewScrollingGravityVertical | null | undefined, horizontalGravity?: BMCollectionViewScrollingGravityHorizontal | null | undefined, animated?: boolean | null | undefined}): void;


	/**
	 * Should be invoked to cause the collection view to scroll to the supplementary view of the given type at the specified index path.
	 * Optionally, this scrolling may be animated.
	 * 																				which controls where on the screen the cell should appear after the scrolling operation
	 * 																				completes.
	 * 																				which controls where on the screen the cell should appear after the scrolling operation
	 * 																				completes.
	 * 																				instant.
	 *  
	 */
	scrollToSupplementaryViewWithIdentifier(identifier: string, args: {atIndexPath: BMIndexPath, verticalGravity?: BMCollectionViewScrollingGravityVertical | null | undefined, horizontalGravity?: BMCollectionViewScrollingGravityHorizontal | null | undefined, animated?: boolean | null | undefined}): void;


	/**
	 * Will be invoked by the collection view to scroll to a rect. The rect's coordinates are relative to the collection view's content.
	 * 																			appear after the scrolling operation completes.
	 * 																			appear after the scrolling operation completes.
	 *  
	 */
	scrollToRect(rect: BMRect, args: {withVerticalGravity: BMCollectionViewScrollingGravityVertical, horizontalGravity: BMCollectionViewScrollingGravityHorizontal, animated?: boolean | null | undefined}): void;


	/**
	 * A unique identifier associated with this collection view.
	 *  
	 */
	readonly _UUID: string;

	/**
	 * A property that is set to YES while the collection view is performing an animated scrolling operation.
	 *  
	 */
	private _isPerformingAnimatedScrolling: boolean;

	/**
	 * Causes the collection view to scroll to the given offset.
	 * If this method is invoked from within an animation context, this change will be animated.
	 *  
	 */
	private _scrollToOffset(offset: BMPoint): void;


	/**
	 * Invoked internally to stop an animated scrolling operation.
	 * The animation will be stopped in its tracks and will not snap to its final coordinates. 
	 *  
	 */
	private _stopAnimatedScrolling(): void;


	/**
	 * Invokes the specified block once for every cell regardless of whether it is a visible cell,
	 * a retained off-screen cell or a cached unbound cell.
	 * The order in which the cells are enumerated is not defined. You should not rely on any particular ordering for these cells.
	 * 			
	 *  __cell__: BMCollectionViewCell -					The cell.
	
	 * 			 *  __type__: BMCollectionViewLayoutAttributesType -		The type of view this cell represents. Can be .Cell or .SupplementaryView.
	
	 * 			<li> __identifier__: String, nullable -						For supplementary views, this is the identifier of the supplementary view's type. For cells
	 * 																			in the data set, this parameter will be undefined.</li>
	 * 			 *  __isBound__: Boolean -									YES if this cell is bound to a data set object, NO if this cell is a cached unbound cell.
	
	
	 * 		The block may optionally return a boolean value. If that value is NO, the enumeration will stop at the current step, otherwise the enumeration
	 * 		will continue until the block has been invoked for each cell.
	 *  
	 */
	enumerateAllCellsWithBlock(block: (($0: BMCollectionViewCell, $1: BMCollectionViewLayoutAttributesType, $2: string, $3: boolean) => boolean)): void;


	/**
	 * Invokes the specified block once for every cell that is visible or off-screen but retained and bound to a data set object.
	 * The order in which the cells are enumerated is not defined. You should not rely on any particular ordering for these cells.
	 * 			
	 *  __cell__: BMCollectionViewCell -				The cell.
	
	 * 			 *  __type__: BMCollectionViewLayoutAttributesType -	The type of view this cell represents. Can be .Cell or .SupplementaryView.
	
	 * 			<li> __identifier__: String, nullable -					For supplementary views, this is the identifier of the supplementary view's type. For cells
	 * 																		in the data set, this parameter will be undefined.</li>
	
	 * 		The block may optionally return a boolean value. If that value is NO, the enumeration will stop at the current step, otherwise the enumeration
	 * 		will continue until the block has been invoked for each cell.
	 *  
	 */
	enumerateRetainedCellsWithBlock(block: (($0: BMCollectionViewCell, $1: BMCollectionViewLayoutAttributesType, $2: string) => boolean)): void;


	/**
	 * Invokes the specified block once for every cell that is visible on screen.
	 * The order in which the cells are enumerated is not defined. You should not rely on any particular ordering for these cells.
	 * 			
	 *  __cell__: BMCollectionViewCell -				The cell.
	
	 * 			 * __type__: BMCollectionViewLayoutAttributesType -		The type of view this cell represents. Can be .Cell or .SupplementaryView.
	
	 * 			<li>__identifier__: String, nullable -					For supplementary views, this is the identifier of the supplementary view's type. For cells
	 * 												 						in the data set, this parameter will be undefined.</li>
	
	 * 		The block may optionally return a boolean value. If that value is NO, the enumeration will stop at the current step, otherwise the enumeration
	 * 		will continue until the block has been invoked for each cell.
	 *  
	 */
	enumerateVisibleCellsWithBlock(block: (($0: BMCollectionViewCell, $1: BMCollectionViewLayoutAttributesType, $2: string) => boolean)): void;


	/**
	 * This method should only be invoked prior to invoking release, if this collection view will be animated entirely prior to being released.
	 * This will remove any effects that prevent the cell elements or the collection view itself from being included in the container's layer,
	 * which may affect performance if the collection view is displaying a large number of cells.
	 * This will cause any transform or opacity styles to be removed from all cells, which may affect the fidelity
	 * of the resulting layer.
	 * This will also disable interaction with collection view.
	 * At some point after invoking this method, release should be invoked. This collection view should not be reused in the meantime.
	 *  
	 */
	flatten(): void;


	/**
	 * Should be invoked when the collection view is no longer needed.
	 * Removes all cells, custom scrollbars and content wrappers and relinquishes control of the container div.
	 * This collection view instance should not be reused after invoking this method.
	 * Additionally, all references to this collection view should be cleared to allow the garbage collector
	 * to reclaim its memory.
	 *  
	 */
	release(): void;

}


/**
 * Creates and returns a new collection view with the default properties.
 * The collection view will use a BMCollectionViewTableLayout layout object.
 * You must assign a valid object to the dataSet property to use this collection view.
 * 										This container should be an empty div element, otherwise the behaviour of the collection view will be undefined.
 * 										custom scrolling in place of regular scrolling. Otherwise, it will use native scrolling.
 * @return 				A collection view.
 * 
 */
declare function BMCollectionViewMakeWithContainer(container: $, args?: {customScroll?: boolean | null | undefined}): BMCollectionView;



/**
 * The specification for a BMCollectionViewDataSet object, which is used to provide information to the collection view regarding the number
 * of sections and objects that it should display, as well as their contents and the contents of any supplementary views defined by the current layout.
 * 
 * There is no default prototype for such an object; all objects implementing this protocol must define their own methods.
 * All of the methods defined in this protocol are required; omitting any method will lead to a runtime error when the collection view
 * attempts to invoke it on the data set object.
 * 
 */
declare interface BMCollectionViewDataSet {

	/**
	 * Returns the number of sections in the data set.
	 * @return 			The number of sections.
	 *  
	 */
	numberOfSections(): Int;


	/**
	 * Returns the number of cells in the given section.
	 * @return 			The number of cells.
	 *  
	 */
	numberOfObjectsInSectionAtIndex(index: Int): Int;


	/**
	 * Returns the complete index path for the object with the given section and row indexes.
	 * @return 				The complete index path.
	 *  
	 */
	indexPathForObjectAtRow(row: Int, args: {inSectionAtIndex: Int}): BMIndexPath;


	/**
	 * Returns the complete index path for the given object.
	 * @return 	The complete index path.
	 *  
	 */
	indexPathForObject(object: any): BMIndexPath;


	/**
	 * @deprecated Deprecated. Consider using custom cell classes instead. Only invoked when using the default cell class.
	 * Returns the jQuery element that represents the contents of a cell with the given reuse identifier.
	 * The collection view will invoke this method whenever a new cell has to be created.
	 * @return 			The cell's contents.
	 *  
	 */
	contentsForCellWithReuseIdentifier?(identifier: string): $ | string;


	/**
	 * Returns the cell for the object at the given index path.
	 * To retrieve a cell, use the collection view's dequeueCellForReuseIdentifier(),
	 * passing in the appropriate identifier for your cell depending on the item at the specified index path.
	 * The data set object itself defines the reuse identifiers that the cells have.
	 * @return 		The cell.
	 *  
	 */
	cellForItemAtIndexPath(indexPath: BMIndexPath): BMCollectionViewCell;


	/**
	 * @deprecated Deprecated. Consider using custom cell classes instead. Only invoked when using the default cell class.
	 * Returns the jQuery element that represents the contents of a supplementary view of the given type.
	 * The supplementary view's type is defined entirely by the layout object.
	 * @return 				The supplementary view's contents.
	 *  
	 */
	contentsForSupplementaryViewWithIdentifier?(identifier: string): $ | string;


	/**
	 * Returns the cell for the supplementary view of the given type at the given index path.
	 * To retrieve a cell, use the collection view's dequeueCellForSupplementaryViewWithIdentifier(),
	 * passing in the supplementary view's type as the parameter.
	 * Both the supplementary's view type and its index path are defined entirely by the layout object.
	 * @return 			The cell.
	 *  
	 */
	cellForSupplementaryViewWithIdentifier(identifier: string, args: {atIndexPath: BMIndexPath}): BMCollectionViewCell;


	/**
	 * @deprecated 		Deprecated. This method is optional, but is still invoked by the collection view when implemented. It is recommended to use cell
	 * 					enumeration and manually update cells as needed during data updates.
	 * This method will be invoked by the collection view when it is needed to update the contents of an already rendered cell.
	 * The data set object should always use the supplied indexPath parameter as the binding to the model object rather than the cell's
	 * own indexPath property as this method may be invoked during an update when the cell's old indexPath no longer matches the new data set.
	 *  
	 */
	updateCell?(cell: BMCollectionViewCell, args: {atIndexPath: BMIndexPath}): void;


	/**
	 * @deprecated 		Deprecated. This method is optional, but is still invoked by the collection view when implemented. It is recommended to use cell
	 * 					enumeration and manually update cells as needed during data updates.
	 * This method will be invoked by the collection view when it is needed to update the contents of an already rendered supplementary view.
	 * The data set object should always use the supplied indexPath parameter as the binding to the model object rather than the cell's
	 * own indexPath property as this method may be invoked during an update when the cell's old indexPath no longer matches the new data set.
	 *  
	 */
	updateSupplementaryView?(view: BMCollectionViewCell, args: {withIdentifier: string, atIndexPath: BMIndexPath}): void;


	/**
	 * If this data set performs full data updates, this function is required.
	 * This function may be invoked by the collection view during a full data update to access the old data set.
	 * When this function is invoked with the parameter set to YES, the data set object should return values from the old data set
	 * for all data and index path queries.
	 * When this function is invoked with the parameter set to NO, the data set object should return values from the new data set.
	 * Before the update is finished, the collection view will always invoke this method with the parameter set to NO.
	 *  
	 */
	useOldData(use: boolean): void;


	/**
	 * If this data set performs full data updates, this function is required.
	 * This function may be invoked by the collection view during a full data update to determine if this data set is currently serving the previous data.
	 * The data set must return YES if it is serving up the old data, NO otherwise.
	 * @return 			YES if this data set is currently serving up the old data, NO otherwise.
	 *  
	 */
	isUsingOldData(): boolean;


	/**
	 * This method may be implemented by data set objects that support moving items for interactive drag gestures.
	 * Data set objects implementing this method are expected to update their internal data structures to match
	 * the item's new position, then trigger a data update to run on the collection view.
	 * Optionally, data sets may reject the change and not perform any action.
	 * @return 						`YES` if the data set has performed the requested change, `NO` otherwise.
	 *  
	 */
	moveItemFromIndexPath?(indexPath: BMIndexPath, args: {toIndexPath: BMIndexPath}): boolean;


	/**
	 * This method may be implemented by data set objects that support moving items for interactive drag gestures.
	 * Data set objects implementing this method are expected to update their internal data structures to match
	 * the items' new positions, then trigger a data update to run on the collection view.
	 * Optionally, data sets may reject the change and not perform any action or only partially accept the update
	 * and move just some of the items.
	 * The order of the items in the array is guaranteed to be such that the target index paths are in ascending order.
	 * Implementing this method is optional and if it is not implemented, collection view will repeatedly invoke
	 * `moveItemFromIndexPath(_, {toIndexPath})` passing in each of the items that need to be moved.
	 * 											before any items may have moved. It is the data set's responsability to adjust this index path as the items shift
	 * 											within its data structure.
	 * @return 						An array of index paths specifying the positions of the items after they have been moved.
	 * 											The index paths in this array are not required to match either of the lists supplied by
	 * 											collection view.
	 *   
	 */
	moveItemsFromIndexPaths?(indexPaths: BMIndexPath[], args: {toIndexPath: BMIndexPath}): BMIndexPath[];


	/**
	 * This method may be implemented by data set objects that support removing items for interactive drag gestures.
	 * Data set objects implementing this method are expected to update their internal data structures to remove
	 * the items, then trigger a data update to run on the collection view.
	 * Optionally, data sets may reject the change and not perform any action or only partially accept the update
	 * and remove just some of the items, by changing their internal data structures appropriately.
	 * The order of the items in the array is guaranteed to be such that the target index paths are in ascending order.
	 *   
	 */
	removeItemsAtIndexPaths?(indexPaths: BMIndexPath[]): void;


	/**
	 * This method may be implemented by data set objects that support transferring items from another collection view.
	 * Data set objects implementing this method are expected to update their internal data structures to add
	 * the items, then trigger a data update to run on the collection view.
	 * Optionally, data sets may reject the change and not perform any action or only partially accept the update
	 * and add just some of the items, by changing their internal data structures appropriately.
	 *    
	 */
	insertItems?(items: any[], args: {toIndexPath: BMIndexPath}): void;

}


/**
 * The specification for a `BMCollectionViewDelegate` object.
 * 
 * There is no default prototype for such an object; all objects implementing this protocol should define their own methods.
 * The delegate object and all its methods are optional. A collection view will function normally without any delegate and with any of the delegate methods missing.
 * Note however that some configurations or layout objects might require specific delegate methods to be implemented.
 * 
 */
declare interface BMCollectionViewDelegate {

	/**
	 * Invoked by the collection view to determine whether or not it should run the intro animation when the data set first loads.
	 * If this method is not implemented, the collection view will not run the intro animation.
	 * @return 							YES if the collection view should run the intro animation, NO otherwise.
	 *  
	 */
	collectionViewShouldRunIntroAnimation?(collectionView: BMCollectionView): boolean;


	/**
	 * Invoked by the collection view whenever the bounds change.
	 *  
	 */
	collectionViewBoundsDidChange?(collectionView: BMCollectionView, newBounds: BMRect): void;


	/**
	 * Invoked by the collection view whenever any cell will be rendered.
	 *  
	 */
	collectionViewWillRenderCell?(collectionView: BMCollectionView, cell: BMCollectionViewCell): void;


	/**
	 * Invoked by the collection view whenever any cell has been rendered.
	 *  
	 */
	collectionViewDidRenderCell?(collectionView: BMCollectionView, cell: BMCollectionViewCell): void;


	/**
	 * Invoked by the collection view whenever any cell will be recycled.
	 *  
	 */
	collectionViewWillRecycleCell?(collectionView: BMCollectionView, cell: BMCollectionViewCell): void;


	/**
	 * Invoked by the collection view whenever any cell has been recycled.
	 *  
	 */
	collectionViewDidRecycleCell?(collectionView: BMCollectionView, cell: BMCollectionViewCell): void;


	/**
	 * Invoked by the collection view whenever any cell that can no longer be used will be discarded.
	 *  
	 */
	collectionViewWillDestroyCell?(collectionView: BMCollectionView, cell: BMCollectionViewCell): void;


	/**
	 * Invoked by the collection view whenever any cell that can no longer be used has been discarded.
	 *  
	 */
	collectionViewDidDestroyCell?(collectionView: BMCollectionView, cell: BMCollectionViewCell): void;


	/**
	 * Invoked by the collection view whenever any cell should be selected to determine whether that selection is allowed. 
	 * The actuall cell may not be visible on screen and as such it may not have a BMCollectionViewCell object associated with it.
	 * You may invoke the cellAtIndexPath(indexPath) method to obtain a reference to the cell if it is visible.
	 * If this method is not implemented by the delegate object, the collection view will assume that the cell may be selected.
	 * @return 							YES if the cell can be selected, NO otherwise.
	 *  
	 */
	collectionViewCanSelectCellAtIndexPath?(collectionView: BMCollectionView, indexPath: BMIndexPath): boolean;


	/**
	 * Invoked by the collection view whenever any cell was selected. The actual cell may not be visible on screen and as such
	 * it may not have a BMCollectionViewCell object associated with it.
	 * You may invoke the cellAtIndexPath(indexPath) method to obtain a reference to the cell if it is visible.
	 *  
	 */
	collectionViewDidSelectCellAtIndexPath?(collectionView: BMCollectionView, indexPath: BMIndexPath): void;


	/**
	 * Invoked by the collection view whenever any cell should be deselected to determine whether that selection is allowed. 
	 * The actuall cell may not be visible on screen and as such it may not have a BMCollectionViewCell object associated with it.
	 * You may invoke the cellAtIndexPath(indexPath) method to obtain a reference to the cell if it is visible.
	 * If this method is not implemented by the delegate object, the collection view will assume that the cell may be deselected.
	 * @return 							YES if the cell can be deselected, NO otherwise.
	 *  
	 */
	collectionViewCanDeselectCellAtIndexPath?(collectionView: BMCollectionView, indexPath: BMIndexPath): boolean;


	/**
	 * Invoked by the collection view whenever any cell was deselected. The actual cell may not be visible on screen and as such
	 * it may not have a BMCollectionViewCell object associated with it.
	 * You may invoke the cellAtIndexPath(indexPath) method to obtain a reference to the cell if it is visible.
	 *  
	 */
	collectionViewDidDeselectCellAtIndexPath?(collectionView: BMCollectionView, indexPath: BMIndexPath): void;


	/**
	 * Invoked by the collection view before running the initial presentation animation. Delegate objects can implement this method
	 * to customize the animation's parameters.
	 * @return 								The Velocity.js animation options object to use.
	 *  
	 */
	collectionViewAnimationOptionsForIntroAnimation?(collectionView: BMCollectionView): any;


	/**
	 * Invoked by the collection view before running the update animation. Delegate objects can implement this method
	 * to customize the animation's parameters.
	 * @return 								The Velocity.js animation options object to use.
	 *  
	 */
	collectionViewAnimationOptionsForUpdateAnimation?(collectionView: BMCollectionView): any;


	/**
	 * Invoked by the collection view before running the update animation. Delegate objects can implement this method
	 * to customize the animation's parameters.
	 * @return 								The Velocity.js animation options object to use.
	 *  
	 */
	collectionViewAnimationOptionsForLayoutChangeFromLayout?(collectionView: BMCollectionView, fromLayout: BMCollectionViewLayout, args: {toLayout: BMCollectionViewLayout}): any;


	/**
	 * Invoked by the collection view before any click event is processed on any cell.
	 * Delegate objects can implement this method to tell the collection view whether or not it should check for double click events on the given cell for this event.
	 * By default, when returning NO or nothing from this method, the collection view not track double clicks for this event.
	 * When returning YES from this method, the collection view will track double clicks, which will delay the firing of the click event
	 * until the collection view is certain that a second click will not follow fast enough to trigger a double click.
	 * @return 					Defaults to NO. If set to YES the collection view will track double clicks for this event.
	 *  
	 */
	collectionViewCanDoubleClickCell?(collectionView: BMCollectionView, cell: BMCollectionViewCell, args: {withEvent: $event}): boolean | null | undefined;


	/**
	 * Invoked by the collection view whenever any cell is clicked or tapped. Delegate objects can implement this method to react
	 * to cell click or tap events.
	 * Delegate objects can optionally return YES from this method to signal to the collection view that they wish to handle this event
	 * and prevent the default actions from occuring.
	 * By default, when returning NO or nothing from this method, the collection view will togle the selection state of the clicked cell.
	 * @return 					Defaults to NO. If set to YES the default actions will be suppressed for this event.
	 *  
	 */
	collectionViewCellWasClicked?(collectionView: BMCollectionView, cell: BMCollectionViewCell, args: {withEvent: $event}): boolean | null | undefined;


	/**
	 * Invoked by the collection view whenever any cell is double clicked or double tapped. Delegate objects can implement this method to react
	 * to cell click or tap events.
	 * Delegate objects can optionally return YES from this method to signal to the collection view that they wish to handle this event
	 * and prevent the default actions from occuring.
	 * @return 					Defaults to NO. If set to YES the default actions will be suppressed for this event.
	 *  
	 */
	collectionViewCellWasDoubleClicked?(collectionView: BMCollectionView, cell: BMCollectionViewCell, args: {withEvent: $event}): boolean | null | undefined;


	/**
	 * Invoked by the collection view whenever any cell is long clicked or long tapped. Delegate objects can implement this method to react
	 * to cell click or tap events.
	 * Delegate objects can optionally return YES from this method to signal to the collection view that they wish to handle this event
	 * and prevent the default actions from occuring.
	 * @return 					Defaults to NO. If set to YES the default actions will be suppressed for this event.
	 *  
	 */
	collectionViewCellWasLongClicked?(collectionView: BMCollectionView, cell: BMCollectionViewCell, args: {withEvent: $event}): boolean | null | undefined;


	/**
	 * Invoked by the collection view whenever any cell is right clicked. Delegate objects can implement this method to react
	 * to cell click events.
	 * Delegate objects can optionally return YES from this method to signal to the collection view that they wish to handle this event
	 * and prevent the default actions from occuring.
	 * By default, when returning NO or nothing from this method, the browser's default context menu will appear.
	 * @return 					Defaults to NO. If set to YES the default actions will be suppressed for this event.
	 *  
	 */
	collectionViewCellWasRightClicked?(collectionView: BMCollectionView, cell: BMCollectionViewCell, args: {withEvent: $event}): boolean | null | undefined;


	/**
	 * Invoked by the collection view prior to any cell being resized. When this method is invoked, the new size will not have been
	 * assigned to the actual cell. If the size change will be animated, this method is invoked before any associated animation begins.
	 * Delegate object can implement this method to respond to the size change.
	 *  
	 */
	collectionViewWillResizeCell?(collectionView: BMCollectionView, cell: BMCollectionViewCell, args: {toSize: BMSize}): void;


	/**
	 * Invoked by the collection view after any cell was resized. When this method is invoked, the new size will have been
	 * assigned to the actual cell. If the size change was be animated, this method is invoked after any associated animation ends.
	 * Delegate object can implement this method to respond to the size change.
	 *  
	 */
	collectionViewDidResizeCell?(collectionView: BMCollectionView, cell: BMCollectionViewCell, args: {toSize: BMSize}): void;


	/**
	 * Invoked by the collection view whenever the user begins begins to click or touch a cell to determine if it can treat the event sequence
	 * as the beginning of a drag & drop operation.
	 * Delegate objects can implement this method to let collection view know whether it should go ahead
	 * with the interactive drag gesture or not. If this method is not implemented, collection view will not start
	 * any drag gestures.
	 *  
	 */
	collectionViewCanMoveCell?(collectionView: BMCollectionView, cell: BMCollectionViewCell, args: {atIndexPath: BMIndexPath}): void;


	/**
	 * Invoked by the collection view immediately before starting an interactive drag gesture for a cell.
	 * Delegate objects can implement this method to perform any changes that might be needed to accomodate this gesture.
	 *  
	 */
	collectionViewWillBeginInteractiveMovementForCell?(collectionView: BMCollectionView, cell: BMCollectionViewCell, args: {atIndexPath: BMIndexPath}): void;


	/**
	 * Invoked by collection view to determine if the items at the specified index paths may be copied or moved into another
	 * collection view.
	 * Delegate object can implement this method to let collection view know whether or not it can transfer the items.
	 * If this method is not implemented, collection view will assume that items cannot be transferred.
	 * @return 							`YES` if the index paths can be removed, `NO` otherwise.
	 *  
	 */
	collectionViewCanTransferItemsAtIndexPaths?(collectionView: BMCollectionView, indexPaths: BMIndexPath[]): boolean;


	/**
	 * Invoked by collection view to determine how to handle the transfer of the given items to a different
	 * collection view.
	 * @return 		The desired accept policy.
	 *  
	 */
	collectionViewTransferPolicyForItemsAtIndexPaths?(collectionView: BMCollectionView, indexPaths: BMIndexPath[]): BMCollectionViewTransferPolicy;


	/**
	 * Invoked by collection view to determine if the given items may be imported from another collection view.
	 * Delegate object can implement this method to let collection view know whether or not it can import the items.
	 * If this method is not implemented, collection view will assume that items cannot be imported.
	 * @return 							`YES` if the items can be imported, `NO` otherwise.
	 *  
	 */
	collectionViewCanAcceptItems?(collectionView: BMCollectionView, items: any[]): boolean;


	/**
	 * Invoked by collection view to determine how to handle the import of the given items from a different
	 * collection view.
	 * @return 		The desired accept policy.
	 *  
	 */
	collectionViewAcceptPolicyForItems?(collectionView: BMCollectionView, items: any[]): BMCollectionViewAcceptPolicy;


	/**
	 * Invoked by collection view to determine if the items at the specified index paths may be removed by an interactive
	 * drag gesture.
	 * Delegate object can implement this method to let collection view know whether or not it can remove the items.
	 * If this method is not implemented, collection view will assume that items cannot be removed.
	 * @return 							`YES` if the index paths can be removed, `NO` otherwise.
	 *  
	 */
	collectionViewCanRemoveItemsAtIndexPaths?(collectionView: BMCollectionView, indexPaths: BMIndexPath[]): boolean;


	/**
	 * Invoked by the collection view immediately before a drag gesture is about to end for a cell. This is invoked before any
	 * associated animations begin.
	 * Delegate objects can implement this method to perform any changes that might be needed to accomodate this gesture.
	 *  
	 */
	collectionViewWillFinishInteractiveMovementForCell?(collectionView: BMCollectionView, cell: BMCollectionViewCell, args: {atIndexPath: BMIndexPath}): void;


	/**
	 * Invoked by the collection view immediately after a drag gesture has ended for a cell. This is invoked after any
	 * associated animations end.
	 * Delegate objects can implement this method to perform any changes that might be needed to accomodate this gesture.
	 *  
	 */
	collectionViewDidFinishInteractiveMovementForCell?(collectionView: BMCollectionView, cell: BMCollectionViewCell, args: {atIndexPath: BMIndexPath}): void;

}


/**
 * When using the `BMCollectionViewTableLayout`, the `BMCollectionViewFlowLayout` or the `BMCollectionViewMasonryLayout`, 
 * the collection view's delegate object can optionally implement the following methods:
 * 
 */
declare interface BMCollectionViewLayoutAnimationDelegate extends BMCollectionViewDelegate {

	/**
	 * Invoked by the layout to allow the delegate object to customize the intro animation.
	 * The collection view will animate from the returned attributes to the supplied target attributes.
	 * @return 							The cell attributes to use.
	 *  
	 */
	collectionViewInitialAttributesForPresentedCellAtIndexPath?(collectionView: BMCollectionView, indexPath: BMIndexPath, args: {withTargetAttributes: BMCollectionViewLayoutAttributes}): BMCollectionViewLayoutAttributes;


	/**
	 * Invoked by the layout to allow the delegate object to customize the intro animation.
	 * The collection view will animate from the returned attributes to the supplied target attributes.
	 * @return 							The cell attributes to use.
	 *  
	 */
	collectionViewInitialAttributesForPresentedSupplementaryViewWithIdentifier?(collectionView: BMCollectionView, identifier: string, args: {atIndexPath: BMIndexPath, withTargetAttributes: BMCollectionViewLayoutAttributes}): BMCollectionViewLayoutAttributes;


	/**
	 * Invoked by the layout to allow the delegate object to customize the update animation.
	 * The collection view will animate from the returned attributes to the supplied target attributes.
	 * @return 							The cell attributes to use.
	 *  
	 */
	collectionViewInitialAttributesForAppearingCellAtIndexPath?(collectionView: BMCollectionView, indexPath: BMIndexPath, args: {withTargetAttributes: BMCollectionViewLayoutAttributes}): BMCollectionViewLayoutAttributes;


	/**
	 * Invoked by the layout to allow the delegate object to customize the update animation.
	 * The collection view will animate from the returned attributes to the supplied target attributes.
	 * @return 							The cell attributes to use.
	 *  
	 */
	collectionViewInitialAttributesForAppearingSupplementaryViewWithIdentifier?(collectionView: BMCollectionView, identifier: string, args: {atIndexPath: BMIndexPath, withTargetAttributes: BMCollectionViewLayoutAttributes}): BMCollectionViewLayoutAttributes;


	/**
	 * Invoked by the layout to allow the delegate object to customize the update animation.
	 * The collection view will animate from the supplied target attributes to the returned attributes.
	 * @return 							The cell attributes to use.
	 *  
	 */
	collectionViewFinalAttributesForDisappearingCellAtIndexPath?(collectionView: BMCollectionView, indexPath: BMIndexPath, args: {withTargetAttributes: BMCollectionViewLayoutAttributes}): BMCollectionViewLayoutAttributes;


	/**
	 * Invoked by the layout to allow the delegate object to customize the update animation.
	 * The collection view will animate from the supplied target attributes to the returned attributes.
	 * @return 							The cell attributes to use.
	 *  
	 */
	collectionViewFinalAttributesForDisappearingSupplementaryViewWithIdentifier?(collectionView: BMCollectionView, identifier: string, args: {atIndexPath: BMIndexPath, withTargetAttributes: BMCollectionViewLayoutAttributes}): BMCollectionViewLayoutAttributes;

}


/**
 * When using the table layout with variable row heights, the delegate must implement all of the methods in the
 * BMCollectionViewDelegateTableLayout protocol.
 * 
 * They will be invoked by the table layout to determine the height of each row.
 * 
 */
declare interface BMCollectionViewDelegateTableLayout extends BMCollectionViewDelegate {

	/**
	 * Invoked by the table layout to obtain the height to use for the row representing the item at the specified index path.
	 * @return 									The row's height.
	 *  
	 */
	collectionViewRowHeightForCellAtIndexPath(collectionView: BMCollectionView, indexPath: BMIndexPath): number;

}


/**
 * When using the flow layout with variable cell sizes, the delegate must implement all of the methods in the
 * BMCollectionViewDelegateFlowLayout protocol.
 * 
 * They will be invoked by the flow layout to determine the size of each cell.
 * 
 */
declare interface BMCollectionViewDelegateFlowLayout extends BMCollectionViewDelegate {

	/**
	 * Invoked by the flow layout to obtain the height to use for the cell representing the item at the specified index path.
	 * @return 									The cell's size.
	 *  
	 */
	collectionViewSizeForCellAtIndexPath(collectionView: BMCollectionView, indexPath: BMIndexPath): BMSize;

}


/**
 * When using the masonry layout, the delegate must implement all of the methods in the
 * BMCollectionViewDelegateMasonryLayout protocol.
 * 
 * They will be invoked by the masonry layout to determine the height of each cell.
 * 
 */
declare interface BMCollectionViewDelegateMasonryLayout extends BMCollectionViewDelegate {

	/**
	 * Invoked by the masonry layout to obtain the height to use for the cell representing the item at the specified index path.
	 * @return 									The cell's height.
	 *  
	 */
	collectionViewHeightForCellAtIndexPath(collectionView: BMCollectionView, indexPath: BMIndexPath, args: {forColumnWidth: number}): number;

}


/**
 * The specification for a `BMWindowDelegate` object, which can optionally be used in conjunction with `BMWindow` objects and will receive various
 * callbacks related to the window's lifecycle.
 * 
 */
declare interface BMWindowDelegate {

	/**
	 * Invoked when the window is about to become visible. This method is invoked before the window actually
	 * becomes visible and before any associated animation runs.
	 *  
	 */
	windowWillAppear?(window: BMWindow): void;


	/**
	 * Invoked after the window has become visible. This method is invoked after any associated animation has finished running.
	 *  
	 */
	windowDidAppear?(window: BMWindow): void;


	/**
	 * When a window is made visible from a given DOM node, this method is invoked on the delegate object so the window knows whether the node
	 * from which it is shown should remain hidden while the window is visible.
	 * 
	 * The default behaviour when this method is not implemented is that the node is made hidden during the visibility animation and then made
	 * visible when the animation completes. When this method is implemented and returns `YES`, the node is kept hidden until the window is dismissed.
	 * @return 			`YES` if the node should remain hidden, `NO` otherwise.
	 *  
	 */
	windowShouldKeepNodeHidden?(window: BMWindow): boolean;


	/**
	 * Invoked when the window is about to close. This method is invoked before the window actually
	 * becomes hidden and before any associated animation runs.
	 *  
	 */
	windowWillClose?(window: BMWindow): void;


	/**
	 * This method is invoked when the window is about to be dismissed as a result of standard user interaction.
	 * Delegate objects can optionally implement this method and return a `BMRect` object to which this window will transition when closing.
	 * 
	 * This method is invoked before the window begins closing and before `windowWillClose()`.
	 * @return 	An optional rect to which the window will transition.
	 *  
	 */
	rectForDismissedWindow?(window: BMWindow): BMRect | null | undefined;


	/**
	 * This method is invoked when the window is about to be dismissed as a result of standard user interaction.
	 * Delegate objects can optionally implement this method and return a DOM node to which this window will transition when closing.
	 * 
	 * This method is invoked before the window begins closing and before `windowWillClose()`.
	 * @return 	An optional DOM node to which the window will transition.
	 *  
	 */
	DOMNodeForDismissedWindow?(window: BMWindow): DOMNode | null | undefined;


	/**
	 * Invoked after the window has closed. This method is invoked after any associated animation has finished running.
	 *  
	 */
	windowDidClose?(window: BMWindow): void;


	/**
	 * Invoked after the window transitioned to full-screen mode. This method is invoked after any associated animation has finished running.
	 *  
	 */
	windowDidEnterFullScreen?(window: BMWindow): void;


	/**
	 * Invoked after the window transitioned from full-screen mode to regular mode. This method is invoked after any associated animation has finished running.
	 *  
	 */
	windowDidExitFullScreen?(window: BMWindow): void;

}


/**
 * The specification for a `BMCodeEditorDelegate` object, which can optionally be used in conjunction with `BMCodeEditor` objects and will receive various
 * callbacks related to the editor's lifecycle.
 * 
 */
declare interface BMCodeEditorDelegate {

	/**
	 * Invoked after the contents of the given code editor have changed. Note that neither the new contents nor the old ones are given as
	 * parameters to this method; instead, the new content should be retrieved directly from the given editor instance.
	 *  
	 */
	codeEditorContentsDidChange?(editor: BMCodeEditor): void;

}


/**
 * A window is an object that manages the display and lifecycle of a popup window.
 * 
 */
declare class BMWindow {

	/**
	 * An optional delegate which this window may notify of key events.
	 *  
	 */
	delegate?: BMWindowDelegate | null | undefined;

	/**
	 * The window's frame, which represents its on-screen area.
	 *  
	 */
	frame: BMRect;

	/**
	 * The window DOM node.
	 *  
	 */
	private _window: DOMNode;

	/**
	 * The window toolbar DOM node.
	 *  
	 */
	readonly toolbar: DOMNode;

	/**
	 * The modal blocker DOM node.
	 *  
	 */
	private _blocker: DOMNode;

	/**
	 * The DOM node in which the window contents should be added.
	 *  
	 */
	readonly content: DOMNode;

	/**
	 * Set to YES while this window is visible.
	 *  
	 */
	private _visible: boolean;

	/**
	 * Set to YES while this window is visible.
	 *  
	 */
	readonly isVisible: boolean;

	/**
	 * Set to YES while this window is full screen.
	 *  
	 */
	private _fullScreen: boolean;

	/**
	 * Set to YES while this window is full screen.
	 *  
	 */
	readonly isFullScreen: boolean;

	/**
	 * Initializes this window with the given screen area.
	 * @return 						This window.
	 *  
	 */
	initWithFrame(frame: BMRect, args?: {toolbar?: boolean | null | undefined}): BMWindow;


	/**
	 * Should be invoked to make this window visible.
	 * 												If set to a DOM node, the window will expand from that element.
	 *  
	 */
	bringToFrontAnimated(animated?: boolean | null | undefined, args?: {fromRect?: BMRect | null | undefined, fromNode?: DOMNode | null | undefined, completionHandler?: (() => void) | null | undefined}): void;


	/**
	 * Should be invoked to dismiss this window.
	 * 												If set to a DOM node, the window will compact to that element.
	 *  
	 */
	dismissAnimated(animated?: boolean | null | undefined, args?: {toRect?: BMRect | null | undefined, toNode?: DOMNode | null | undefined, completionHandler?: (() => void) | null | undefined}): void;


	/**
	 * Should be invoked to make this window fullscreen.
	 *  
	 */
	enterFullScreenAnimated(animated?: boolean | null | undefined, args?: {completionHandler?: (() => void) | null | undefined}): void;


	/**
	 * Should be invoked to exit full screen mode.
	 *  
	 */
	exitFullScreenAnimated(animated?: boolean | null | undefined, args?: {completionHandler?: (() => void) | null | undefined}): void;


	/**
	 * Destroys this window and removes all DOM nodes associated with it.
	 * This instance should not be reused after invoking this method.
	 *  
	 */
	release(): void;

}


/**
 * Constructs and returns a window that will display in the given rect.
 * @return 			A window.
 * 
 */
declare function BMWindowMakeWithFrame(frame: BMRect): BMWindow;



/**
 * An enum containing the languages that code editors should support.
 * 
 */
declare class BMCodeEditorLanguage {
	/**
	 * Indicates that the code editor should edit javascript.
	 *  
	 */
	static Javascript: BMCodeEditorLanguage;

	/**
	 * Indicates that the code editor should edit CSS.
	 *  
	 */
	static CSS: BMCodeEditorLanguage;

	/**
	 * Indicates that the code editor should edit JSON.
	 *  
	 */
	static JSON: BMCodeEditorLanguage;

	/**
	 * Indicates that this code editor should edit typescript.
	 *  
	 */
	static Typescript: BMCodeEditorLanguage;

	private constructor(); 
}

/**
 * The code editor is an abstract type that defines the methods and properties that should be exposed by a code editor.
 * The code editor itself should not be used directly, instead one of the two subtypes - BMCodeMirrorCodeEditor or BMMonacoCodeEditor - shoud be used.
 * 
 */
declare class BMCodeEditor {

	/**
	 * The DOM Node managed by this code editor.
	 *  
	 */
	readonly container: DOMNode;

	/**
	 * Designated initializer. Must be invoked by all other initializers. 
	 * Subtypes that override this method must invoke the base implementation at some point during their initialization.
	 * @return 								This code editor.
	 *  
	 */
	initWithContainer(container: DOMNode, args?: {code?: string | null | undefined, language?: BMCodeEditorLanguage | null | undefined}): BMCodeEditor;


	/**
	 * Controls the code on which the code editor operates.
	 *  
	 */
	readonly code: any;

	/**
	 * Will be set to `YES` when the current configuration requires the code to be transpiled before it can be executed by the browser environment.
	 * When this property returns YES, the `transpiledCode()` method should be invoked to retrieve the transpiled code.
	 *  
	 */
	readonly requiresTranspilation: boolean;

	/**
	 * Controls the cursor position in the code editor.
	 * This property is a point where the X coordinate represents the cursor's 0-indexed column and the Y coordinate its 0-indexed line.
	 *  
	 */
	readonly cursorPosition: any;

	/**
	 * Defaults to `NO`. If the code editor supports extensible autocomplete, it should set this property to `YES` during initialization.
	 * If the code editor sets this property to YES, it must override the getter and setter associated with `scope` property to handle
	 * injecting additional autocomplete symbols.
	 *  
	 */
	supportsExtensibleAutocomplete: boolean;

	/**
	 * Should be overriden by code editors that support extensible autocomplete but do not provide autocomplete 
	 * for builtin ES6 and jQuery types.
	 * Code editors that already provide default autocomplete support for ES6 and jQuery are not required to implement this method.
	 * Sets the builtin libraries to the given code.
	 * The default implementation does nothing.
	 * 													be needed for the environment.
	 *  
	 */
	setBuiltinES6Library(ES6Library: string, args: {jQueryLibrary: string, additionalLibraries?: string[] | null | undefined}): void;


	/**
	 * Should be overriden by code editors that support extensible autocomplete.
	 * When this method is invoked, the code editor should enable autocomplete definitions for the given imports.
	 * If this method has already been previously invoked, the previous imports autocomplete definition should be
	 * replaced by this new one.
	 * The default implementation does nothing.
	 *  
	 */
	setImports(imports: string): void;


	/**
	 * Should be overriden by code editors that support extensible autocomplete.
	 * When this method is invoked, the code editor should enable autocomplete definitions for the given external library.
	 * If this method has already been previously invoked with the same name, the previous autocomplete definition should be
	 * replaced by this new one.
	 * The default implementation does nothing.
	 *  
	 */
	addExternalLibraryNamed(name: string, args: {code: string}): void;


	/**
	 * Should be overriden by code editors that support extensible autocomplete.
	 * When this method is invoked with the name of a library that was previously added, it will be removed from the autocomplete
	 * definitions. If that library was not previously imported, this method does nothing.
	 * The default implementation does nothing.
	 *  
	 */
	removeExternalLibraryNamed(name: string, args: {code: string}): void;


	/**
	 * Should be overriden by code editors that support extensible autocomplete.
	 * When this method is invoked with the name of a library that was previously added, it returns `YES`. 
	 * If that library was not previously imported, this method returns `NO`.
	 * The default implementation returns `NO` in all cases.
	 * @return 			`YES` if the library was imported, `NO` otherwise.
	 *  
	 */
	hasExternalLibraryNamed(name: string): boolean;


	/**
	 * Controls the autocomplete scope in which the code runs.
	 * Editors that support extensible autocomplete should override this property to handle injecting
	 * additional symbols into the autocomplete scope.
	 *  
	 */
	readonly scope: any;

	/**
	 * Should be invoked to insert the given text at the current cursor position.
	 *  
	 */
	insertText(text: string): void;


	/**
	 * Should be invoked to cause this code editor to acquire keyboard focus.
	 *  
	 */
	acquireFocus(): void;


	/**
	 * Should be invoked to cause this code editor to resign keyboard focus.
	 *  
	 */
	resignFocus(): void;


	/**
	 * Should be invoked whenever this code editor is resized for any reason.
	 *  
	 */
	resized(): void;


	/**
	 * Should be invoked when this code editor is no longer needed and should be destroyed.
	 *  
	 */
	release(): void;

}


/**
 * The code mirror code editor is a concrete implementation of BMCodeEditor that uses CodeMirror as its editor.
 * 
 */
declare class BMCodeMirrorCodeEditor {

	/**
	 * The CodeMirror instance managed by this code editor.
	 *  
	 */
	private _codeMirror: CodeMirror;

	/**
	 * Designated initializer. Must be invoked by all other initializers. 
	 * Initializes this code mirror code editor using the specified container.
	 * Optionally, the initial code may be provided as well.
	 * @return 						This code editor.
	 *  
	 */
	initWithContainer(container: DOMNode, args?: {code?: string | null | undefined, language?: BMCodeEditorLanguage | null | undefined}): BMCodeMirrorCodeEditor;


	/**
	 * Controls the code on which the code editor operates.
	 *  
	 */
	code: string;
}


/**
 * Constructs and returns a code mirror code editor using the specified container.
 * @return 		A code editor.
 * 
 */
declare function BMCodeMirrorCodeEditorMakeWithContainer(container: DOMNode, args?: {code?: string | null | undefined, language?: BMCodeEditorLanguage | null | undefined}): BMCodeMirrorCodeEditor;



/**
 * The monaco code editor is a concrete implementation of BMCodeEditor that uses Monaco as its editor.
 * 
 */
declare class BMMonacoCodeEditor extends BMCodeEditor {

	/**
	 * Invoked when creating a monaco code editor.
	 * Creates the default themes if they weren't already created.
	 * 
	 */
	static createThemes (): void;


	/**
	 * The monaco instance managed by this code editor.
	 *  
	 */
	private _monaco: Monaco;

	/**
	 * Designated initializer. Must be invoked by all other initializers. 
	 * Initializes this code mirror code editor using the specified container.
	 * Optionally, the initial code may be provided as well.
	 * @return 							This code editor.
	 *  
	 */
	initWithContainer(container: DOMNode, args?: {code?: string | null | undefined, language?: BMCodeEditorLanguage | null | undefined}): BMMonacoCodeEditor;


	/**
	 * Sets the builtin libraries to the given code. If the builtin libraries are already defined, they will be replaced with the given definitions.
	 * 													be needed for the environment.
	 *  
	 */
	setBuiltinES6Library(ES6Library: string, args: {jQueryLibrary: string, additionalLibraries?: string[] | null | undefined}): void;


	/**
	 * Controls the code on which the code editor operates.
	 *  
	 */
	code: string;

	/**
	 * Will be set to `YES` when the current configuration requires the code to be transpiled before it can be executed by the browser environment.
	 * When this property returns YES, the `transpiledCode()` method should be invoked to retrieve the transpiled code.
	 *  
	 */
	readonly requiresTranspilation: boolean;

	/**
	 * Returns the transpiled code.
	 * This method should not be invoked when `requiresTranspilation` is set to NO.
	 * @return 			The transpiled code.
	 *  
	 */
	transpiledCode(): string;

}


/**
 * Constructs and returns a code mirror code editor using the specified container.
 * @return 		A code editor.
 * 
 */
declare function BMMonacoCodeEditorMakeWithContainer(container: DOMNode, args?: {code?: string | null | undefined, language?: BMCodeEditorLanguage | null | undefined}): BMCodeMirrorCodeEditor;



/**
 * A view is a wrapper around a DOM node enabling various CoreUI-related functionality.
 * Views typically do not duplicate existing DOM capabilities, but instead are used to
 * attach additional information and functionality to those nodes.
 * 
 * Views are usually not constructed using any constructor function. Instead, their lifecycle is managed by CoreUI.
 * You obtain views by invoking the static `viewForNode(_)` method on the `BMView` type.
 * It is also not necessary to invoke any destruction method when the DOM nodes managed by views are removed,
 * but there is no built-in way to unlink a view from its DOM node after it has been created.
 * 
 * To extend from BMView and create a view subtype, extend from the BMView prototype, then, when requesting views use
 * `BMView.viewForNode.call(MyCustomViewType, node)`. Note that if the node already had
 * a view associated with it, the method above will return the original view reference of whatever type
 * it was created with. Subclasses may also provide their own construction methods built atop of `viewForNode`.
 * For view subclasses that create and manage their own DOM content, it is sufficient to invoke `BMView`'s
 * designated initializer after construction.
 * 
 */
declare class BMView {

	/**
	 * Returns the view object associated with the given DOM node.
	 * @return                  A view.
	 *     
	 */
	static viewForNode (node: DOMNode): BMView;


	/**
	 * Constructs a div node and returns the view object associated with it.
	 * The newly created node will not be attached to any parent - it must be manually
	 * added to the document's node hierarchy in order to be used.
	 * @return              A view.
	 *     
	 */
	static view (): BMView;


	/**
	 * Invoked internally when this view is no longer needed.
	 * Removes the view from its superview and removes all event listeners
	 * created by this view but otherwise leaves its DOM node intact.
	 * 
	 * You should not invoke this method on views that have subviews.
	 * 
	 * This view should not be reused after invoking this method. Instead, if needed,
	 * a new view should be obtained for that node and used.
	 *     
	 */
	release(): void;


	/**
	 * Designated initializer, invoked immediately after any view is created.
	 * Subclasses must invoke this base initializer at some point during their initialization.
	 * @return                  This view.
	 *     
	 */
	initWithDOMNode(node: DOMNode): BMView;


	/**
	 * The DOM node managed by this view.
	 *     
	 */
	readonly node: DOMNode;

	/**
	 * The DOM node to which subviews will be added.
	 * This should be a descendant of the node returned by the `node` property.
	 * 
	 * Subclasses which manage a larger node hierarchy should override this getter
	 * and return the appropriate node within their hierarchy to let CoreUI know
	 * where to insert subviews.
	 * 
	 * The default implementation returns the same value as the `node` property.
	 *     
	 */
	readonly contentNode: DOMNode;

	/**
	 * An optional name used to identify this view when printing out debug messages.
	 *     
	 */
	debuggingName?: string | null | undefined;

	/**
	 * The layout editor currently editing this view's layout.
	 *     
	 */
	private _layoutEditor?: BMLayoutEditor | null | undefined;

	/**
	 * Animatable.
	 * A rectangle describing this view's size and position relative to its superview.
	 * If the view hierarchy that this view belongs to does not match the DOM node hierarchy, the coordinates
	 * of this view's frame are not guaranteed to match its position within the document.
	 * 
	 * For views whose layout is managed by CoreUI, this will return the view's frame as it is obtained by
	 * resolving the layout constraints. This value should not be set manually in those cases.
	 * 
	 * Setting this value will cause the node managed by this view to have its position set to absolute and
	 * its size and position styles set to match the new frame's values.
	 * 
	 * After setting this property, the position and size of the node managed by this view will be managed 
	 * by CoreUI and should not be modified by outside means (e.g. through CSS).
	 *     
	 */
	frame: BMRect;

	/**
	 * Invoked by CoreUI after a frame was assigned to this view.
	 * 
	 * Subclasses can override this method to perform any additional changes needed
	 * for their content to fit the given frame.
	 * 
	 * The default implementation does nothing.
	 *     
	 */
	didSetFrame(frame: BMRect): void;


	/**
	 * A rectangle describing this view's size and position relative to its frame.
	 * 
	 * The default value for this property is a rect with the origin set to (0, 0)
	 * and the same size as this view's frame rectangle.
	 * 
	 * Modifying this rectangle will typically cause the view's frame to change accordingly.
	 *     
	 */
	readonly bounds: BMRect;

	/**
	 * Controls whether the layout managed by this view is in the left-to-right order.
	 * The default implementation returns the global CoreUI left-to-right status.
	 *     
	 */
	LTRLayout: boolean;

	/**
	 * Controls whether or not this view acts as a layout manager or not.
	 * In a view hierarchy, typically only the root view will act as the layout manager for all of its descendants,
	 * however subviews may be allowed to become layout managers for their own subviews in
	 * certain configurations.
	 * The value of this property is managed by CoreUI.
	 *     
	 */
	readonly isManagingLayout: boolean;

	/**
	 * Used by CoreUI to determine if this view's intrinsic size should match the intrinsic size reported by its node element.
	 * When this getter returns `YES`, CoreUI will measure the view's node to determine its intrinsic size.
	 * Subclasses that can make use of automatic intrinsic size do not need to override the getter for `intrinsicSize`
	 * to support intrinsic sizes.
	 * 
	 * Subclasses that do not support intrinsic sizes or need to perform their own calculations to supply an intrinsic size
	 * should override this getter and return `NO`.
	 * 
	 * The default implementation returns `YES`.
	 *     
	 */
	supportsAutomaticIntrinsicSize: boolean;

	/**
	 * Used by CoreUI to determine if this view can provide an intrinsic size.
	 * 
	 * Subclasses that explicitly support or do not support intrinsic sizes should override this value and
	 * return the appropriate. This is used by CoreUI to determine whether the constraints affecting this view
	 * can fully define its layout attributes.
	 * 
	 * The default implementation returns the same value as `supportsAutomaticIntrinsicSize`.
	 *     
	 */
	readonly supportsIntrinsicSize: boolean;

	/**
	 * Will be set to a number that represents the width that will be assigned to this view
	 * after the current layout pass.
	 * Outside of a layout pass or before this view has been assigned a width, this property
	 * will be set to `undefined`. Subclasses that override `intrinsicSize` should
	 * check the value of this property when computing their intrinsic size and adjust it appropriately
	 * if this value is not `undefined`.
	 *     
	 */
	readonly requiredWidth: number;

	/**
	 * Set to `YES` when views invalidate their intrinsic size and the layout engine must
	 * measure it again.
	 *     
	 */
	private _needsIntrinsicSizeMeasurement: boolean;

	/**
	 * Returns `YES` if this view or any of its descendants have had their intrinsic size invalidated.
	 *     
	 */
	readonly needsIntrinsicSizeMeasurement: boolean;

	/**
	 * Should be invoked when this view's intrinsic size is no longer valid and should be measured again
	 * by the layout engine during the next layout pass. This implicitly invalidates this view's layout as well,
	 * causing a layout pass to run before the next animation frame.
	 * 
	 * To prevent visual artifacts that might be caused by the content updating without the view's bounds, CoreUI
	 * will attempt to perform the next layout pass before the next animation frame renders.
	 *     
	 */
	invalidateIntrinsicSize(): void;


	/**
	 * The last measured intrinsic size for this view, if available.
	 *     
	 */
	private _intrinsicSize?: BMSize | null | undefined;

	/**
	 * A size that represents this view's preferred intrinsic size. This is the intrinsic size returned by the view
	 * during the first layout pass, before having been assigned a width. It is used to determine if a new intrinsic size should
	 * be requested for this view during subsequent layout passes so this view has a chance to adjust to its new size restrictions.
	 * 
	 * This value is automatically managed by CoreUI.
	 *     
	 */
	private _preferredIntrinsicSize?: BMSize | null | undefined;

	/**
	 * Invoked internally by CoreUI to obtain and cache the intrinsic size for this view.
	 *     
	 */
	private _getIntrinsicSize(): void;


	/**
	 * This view's intrinsic size. If this view does not have an intrinsic size, this property's value will be
	 * undefined.
	 * The default implementation returns undefined, unless `supportsAutomaticIntrinsicSize` is set to YES.
	 * Whenever a view's intrinsic size changes, for example if the content from which it is derived changes,
	 * the view should invoke `invalidateIntrinsicSize` to cause the layout engine to measure the view when
	 * performing the next layout pass.
	 *  
	 * Subclasses that support intrinsic sizes should override this getter to return the correct intrinsic 
	 * size corresponding to the view's contents.
	 * 
	 * The CoreUI layout engine will invoke this getter twice during a layout pass. The first time it will do so
	 * to obtain the overall size that this view would like to have. Afterwards it will compute the horizontal
	 * layout and assign a width to this view. It will then invoke this getter again to verify if the intrinsic
	 * size may have changed in response to the new width requirement.
	 * Subclasses should check the value of the `requiredWidth` property to check if they have been assigned a width when computing
	 * their intrisic sizes.
	 *     
	 */
	readonly intrinsicSize?: BMSize | null | undefined;

	/**
	 * Controls how much this view will resist being compressed below its intrinsic size in a layout
	 * managed by CoreUI. This generates two implicit constraints, one for width and one for height,
	 * that specify that this view's size should be greater than or equal to its intrinsic size.
	 * That constraint will have its priority set to this value.
	 * A value of `BMLayoutConstraintPriorityRequired` will ensure that this view's content
	 * will never become compressed in a valid layout.
	 * This value has no effect if this view does not provide an intrinsic size.
	 *     
	 */
	compressionResistance: number;

	/**
	 * Controls how much this view will resist being expanded beyond its intrinsic size in a layout
	 * managed by CoreUI. This generates two implicit constraints, one for width and one for height,
	 * that specify that this view's size should be less than or equal to its intrinsic size.
	 * That constraint will have its priority set to this value.
	 * A value of `BMLayoutConstraintPriorityRequired` will ensure that this view's size will never
	 * be larger than its intrinsic size in a valid layout.
	 * This value has no effect if this view does not provide an intrinsic size.
	 *     
	 */
	expansionResistance: number;

	/**
	 * An internal list of layout constraints that affect this view. This array will contain both constraints having
	 * this view as the source view and constraints having this view as the target view. It also contains constraints
	 * that have been registered for this view but are marked inactive.
	 *     
	 */
	private _constraints: BMLayoutConstraint[];

	/**
	 * An internal list of Cassowary variables used by the constraints affecting this view.
	 * These are automatically generated based upon the active constraints affecting this view.
	 *     
	 */
	private _variables: Dictionary< kiwi.Variable>;

	/**
	 * A list of layout constraints that currently affect this view or its subviews that have deterministic constraints. 
	 * The array returned by this getter will only return the constraints that are marked as active. This array will contain 
	 * both constraints having this view as the source view and constraints having this view as the target view.
	 *     
	 */
	readonly activeConstraints: BMLayoutConstraint[];

	/**
	 * A list of layout constraints that have been registered for this view.
	 *     
	 */
	readonly localConstraints: BMLayoutConstraint[];

	/**
	 * Invoked internally when a constraint that affects this view is created.
	 *     
	 */
	private _addConstraint(constraint: BMLayoutConstraint): void;


	/**
	 * Invoked internally to remove a constraint that is no longer needed.
	 *     
	 */
	private _removeConstraint(constraint: BMLayoutConstraint): void;


	/**
	 * A property that controls if this view has deterministic constraints.
	 *     
	 */
	private _hasDeterministicConstraints: boolean;

	/**
	 * Invoked by CoreUI to determine if this view's size and positioning can be derived from its constraints.
	 * A view has deterministic constraints if it has at least two horizontal constraints affecting different attributes,
	 * and two vertical constraints affecting different attributes.
	 *     
	 */
	private _checkConstraints(): void;


	/**
	 * Invoked internally to remove all the constraints from this view and all of its subviews.
	 *     
	 */
	private _clearConstraints(): void;


	/**
	 * Returns the Cassowary expression corresponding to this view's left variable.
	 * This expressed as the sum between this view's left variable and its superview's left expression
	 * and represents the horizontal distance from the rootView's origin point.
	 * This makes it possible to create constraints that affect two views that are not direct descendants of 
	 * the same view but share at least an ancestor within their hierarchy.
	 *                                              term of this expression.
	 *     
	 */
	private _leftExpressionWithMultiplier(multiplier?: number | null | undefined): void;


	/**
	 * Returns the Cassowary expression corresponding to this view's top variable.
	 * This expressed as the sum between this view's top variable and its superview's top expression
	 * and represents the vertical distance from the rootView's origin point.
	 * This makes it possible to create constraints that affect two views that are not direct descendants of 
	 * the same view but share at least an ancestor within their hierarchy.
	 *                                              term of this expression.
	 *     
	 */
	private _topExpressionWithMultiplier(multiplier?: number | null | undefined): void;


	/**
	 * Invoked internally to obtain the Cassowary expression corresponding to the given layout attribute.
	 * The Left, Width, Top and Height are simple variables, but all other layout attributes are actually
	 * treated as expressions between those four variables.
	 * 
	 * Additionally, the Left and Top variables return by this method are expressed in terms of the layout's 
	 * `rootView` coordinate space, whereas locally they are epxressed in terms of the superview's coordinate space.
	 * 
	 * Optionally, the attribute may be multiplied by the given multiplier.
	 *                                                  If this attribute is expressed as an expression, it will be
	 *                                                  added to each of its terms. This value should not be `0`
	 * @return                         The Cassowary expression for the variable.
	 *     
	 */
	private _cassowaryExpressionForLayoutAttribute(attribute: BMLayoutAttribute, args?: {withMultiplier?: number | null | undefined}): kiwi.Expression;


	/**
	 * Invoked by CoreUI prior to a layout pass to obtain internal constraints required by this view or is subviews,
	 * as well as the constraints representing the intrinsic size for these views, if available.
	 * The default implementation returns an empty array for a view without an intrinsic size and
	 * various constraints for views that declare an intrinsic size.
	 * 
	 * This will also return the internal constraints provided by this view and its subviews. Subclasses that need to
	 * provide internal constraints should not override this getter. The `internalConstraints()` serves as
	 * an extension point for subclasses to override and include their own internal constraints.
	 *     
	 */
	readonly builtInConstraints: BMLayoutConstraint[];

	/**
	 * Invoked by CoreUI prior to a layout pass to obtain internal constraints required by this view.
	 * The default implementation returns an empty array for all views except the layout root view.
	 * 
	 * Subclasses overriding this method should invoke the superclass implementation and include
	 * any constraints returned by it into their result. Views are expected to return the same set of constraints from
	 * this method unless they invalidate their constraint set. During all other layout passes, views should just
	 * modify and return their previously returned set of constraints.
	 * 
	 * Constraints created from within this method must be marked internal.
	 * @return        An array of layout constraints needed by this view.
	 *     
	 */
	internalConstraints(): BMLayoutConstraint[];


	/**
	 * Invoked internally by CoreUI to assign the layout width to this view.
	 *     
	 */
	private _assignWidth(): void;


	/**
	 * Invoked internally by CoreUI to prepare the view's node to be measured by CoreUI if it supports
	 * automatic intrinsic sizes.
	 *     
	 */
	private _prepareForAutomaticIntrinsicSize(): void;


	/**
	 * Invoked internally by CoreUI during the second phase of the layout process, after assigning
	 * a width to each view.
	 * Updates the internal height constraints of this view and all of its subviews to match the new intrinsic size.
	 *     
	 */
	private _updateInternalHeightConstraints(): void;


	/**
	 * Returns all the horizontal layout variables used by this view hierarchy.
	 *     
	 */
	readonly _horizontalLayoutVariables: kiwi.Variable[];

	/**
	 * Returns all the vertical layout variables used by this view hierarchy.
	 *     
	 */
	readonly _verticalLayoutVariables: kiwi.Variable[];

	/**
	 * Used internally.
	 *     
	 */
	private _layoutAnimationFrameIdentifier: number;

	/**
	 * Schedules a layout pass before the next animation frame.
	 *     
	 */
	private _scheduleLayout(): void;


	/**
	 * Used internally.
	 *     
	 */
	private _layoutIntrisicSizeInvalidationIdentifier: number;

	/**
	 * Schedules a layout pass in response to an intrinsic size invalidation by this view or one of its subviews.
	 * 
	 * Unlike the regular layout invalidation performed by `_scheduleLayout`, CoreUI will attempt to process this
	 * request before the next animation frame has a chance to render in order to avoid potential visual artifacts
	 * that may occur when views' content change independent of their frames.
	 *     
	 */
	private _scheduleImmediateLayout(): void;


	/**
	 * Should be invoked to perform an immediate layout pass on the view hierarchy to
	 * which this view belongs.
	 *     
	 */
	layout(): void;


	/**
	 * Invoked by the layout engine to cause this view to layout its subviews.
	 * This method should not be invoked manually to cause a layout pass, instead set the
	 * `needsLayout` property to `YES` which will schedule a layout pass on the next run loop.
	 * If an immediate layout pass is required, the `layout()` method should be invoked instead.
	 * CoreUI will then invoke this method as needed.
	 * 
	 * The default implementation lays out subviews based on the constraints that have been added to the view hierarchy.
	 * 
	 * Subtypes can override this method to perform their own custom layout operations, directly setting
	 * the frames of their subviews.
	 *     
	 */
	layoutSubviews(): void;


	/**
	 * Invoked as the final step of the layout process. Extracts the result from the
	 * Cassowary equation and creates the final frames for this view and all of its subviews.
	 *     
	 */
	private _updateFrames(): void;


	/**
	 * A property indicating whether this view's layout is stale and the view should be laid out again.
	 * 
	 * Setting this property to `YES` will cause the superview managing this view's layout to recalculate the layout
	 * during the next animation frame. Afterwards, this property will be reset to NO.
	 * 
	 * Setting this property to `NO` has no effect, however the value of this property may be used to determine whether
	 * this view's layout needs to be recalculated.
	 *     
	 */
	needsLayout: boolean;

	/**
	 * The topmost superview managing the layout for this hierarchy. This may be this view itself.
	 * Note that a view hierarchy may have several root views each managing their own local layouts.
	 * A view may be both a root view for its own layout and a child view of another layout.
	 *     
	 */
	readonly rootView: BMView;

	/**
	 * Returns `YES` if this view is a root view that manages the layout of its descendants.
	 *     
	 */
	readonly isRootView: boolean;

	/**
	 * The superview containing this view, if available.
	 *     
	 */
	readonly superview?: BMView | null | undefined;

	/**
	 * An array of views contained by this view.
	 * You must not modify the array returned by this property.
	 *     
	 */
	readonly subviews: BMView[];

	/**
	 * Makes this view a child of the given superview. The DOM node managed by this view will be moved to
	 * the superview's `contentNode`.
	 * If this view already has a superview, it will first be removed from its current superview.
	 *                                          in which to add this view to the superview. If this is specified
	 *                                          CoreUI will add the view's node before the node of the
	 *                                          view currently occupying that position.
	 *     
	 */
	addToSuperview(superview: BMView, args?: {toPosition?: number | null | undefined}): void;


	/**
	 * Should be invoked to add a subview to this view's `contentNode`. If that subview
	 * already has a superview, it will first be removed from its current superview.
	 *                                          in which to add the given subview. If this is specified
	 *                                          CoreUI will add the subview's node before the node of the
	 *                                          view currently occupying that position.
	 *     
	 */
	addSubview(subview: BMView, args?: {toPosition?: number | null | undefined}): void;


	/**
	 * Removes the given subview from this view. Invoking this method has no effect
	 * if the given view is not a subview of this view.
	 * The view's DOM node will also be detached from the document.
	 *     
	 */
	removeSubview(subview: BMView): void;


	/**
	 * Invoked internally by CoreUI when the given subview is about to move to a different superview.
	 * Removes the subview from this view, but does not detach its DOM node from the document.
	 *     
	 */
	private _detachSubview(subview: BMView): void;


	/**
	 * Prepares this view hierarchy for cloning.
	 *     
	 */
	private _prepareForCloning(): void;


	/**
	 * Returns a flat array containg all of the views within this view hierarchy.
	 *     
	 */
	readonly allSubviews: BMView[];

	/**
	 * Returns a clone of this view hierarchy and its constraints.
	 * @return      A clone of this view.
	 *     
	 */
	private _clone(): BMView;


	/**
	 * Returns a clone of this view initialized to the given
	 * node.
	 * @return                              A view.
	 *     
	 */
	private _cloneForNode(node: DOMNode, args?: {superview?: BMView | null | undefined}): BMView;

}


/**
 * The scroll view manages a DOM node whose content may overflow beyond its bounds.
 * Unlike regular scrolling DOM nodes, constraints may be attached to a scroll view's content area.
 * When views are constrained to its content areas, whenever the scroll view scrolls, those views' layouts
 * will update accordingly.
 * 
 */
declare class BMScrollView extends BMView {

	/**
	 * Constructs and returns a scroll view.
	 * @return    A scroll view.
	 * 
	 */
	static scrollView (): BMScrollView;


	/**
	 * Constructs and returns a scroll view for the given node.
	 * @return            A scroll view.
	 * 
	 */
	static scrollViewForNode (node: DOMNode, args: {contentNode: DOMNode}): BMScrollView;


	/**
	 * The content view having all of the views managed by this view.
	 *     
	 */
	readonly contentView: BMView;

	/**
	 * The iScroll instance used for scrolling.
	 *     
	 */
	private _iScroll: iScroll;

	/**
	 * A point representing this scroll view's current scroll offset.
	 *     
	 */
	private _scrollOffset: BMPoint;

	/**
	 * Initializes this scroll view with the given wrapper DOM node and the given content DOM node.
	 *     
	 */
	initWithWrapperDOMNode(node: DOMNode, args: {contentNode: DOMNode}): void;


	/**
	 * Invoked whenever the iScroll instance managing this scroll view's scrolling scrolls.
	 *     
	 */
	private _iScrollDidScroll(): void;


	/**
	 * Should be invoked to add a subview to the content view's `contentNode`. If that subview
	 * already has a superview, it will first be removed from its current superview.
	 * Note that the view will not be added as a direct descendant of this scroll view
	 *                                          in which to add the given subview. If this is specified
	 *                                          CoreUI will add the subview's node before the node of the
	 *                                          view currently occupying that position.
	 *     
	 */
	addSubview(subview: BMView, args?: {toPosition?: number | null | undefined}): void;

}


/**
 * The scroll content view manages the content of a scroll view.
 * 
 */
declare class BMScrollContentView extends BMView {

	/**
	 * Is set to `"Scroll View Content"` by default for scroll content views.
	 *     
	 */
	debuggingName: string;
}


/**
 * The layout guide view is a view that can be dragged and translates its dragged position into constraints related to its superview.
 * This makes it possible to use it to implement behaviours such as resizable or movable panels.
 * 
 */
declare class BMLayoutGuide extends BMView {

	/**
	 * This layout guide's position.
	 *     
	 */
	private _position: BMPoint;

	/**
	 * Set to `YES` after this layout guide has been dragged once.
	 *     
	 */
	private _dragged: boolean;

	/**
	 * The horizontal layout attribute that will be used when building this layout guide's horizontal constraint.
	 *     
	 */
	private _horizontalConstraintAnchor: BMLayoutAttribute;

	/**
	 * The vertical layout attribute that will be used when building this layout guide's vertical constraint.
	 *     
	 */
	private _verticalConstraintAnchor: BMLayoutAttribute;
}


/**
 * Constants representing the layout attributes used by the CoreUI layout engine.
 * 
 */
declare class BMLayoutAttribute {
	/**
	 * The attribute corresponding to a view's leading edge.
	 * This is the same as the left edge in a left-to-right layout and
	 * the same as the right edge in a right-to-left layout.
	 *  
	 */
	static Leading: BMLayoutAttribute;

	/**
	 * The attribute corresponding to a view's trailing edge.
	 * This is the same as the right edge in a left-to-right layout and
	 * the same as the left edge in a right-to-left layout.
	 *  
	 */
	static Trailing: BMLayoutAttribute;

	/**
	 * The attribute corresponding to a view's left edge.
	 *  
	 */
	static Left: BMLayoutAttribute;

	/**
	 * The attribute corresponding to a view's right edge.
	 *  
	 */
	static Right: BMLayoutAttribute;

	/**
	 * The attribute corresponding to a view's top edge.
	 *  
	 */
	static Top: BMLayoutAttribute;

	/**
	 * The attribute corresponding to a view's bottom edge.
	 *  
	 */
	static Bottom: BMLayoutAttribute;

	/**
	 * The attribute corresponding to a view's horizontal center.
	 *  
	 */
	static CenterX: BMLayoutAttribute;

	/**
	 * The attribute corresponding to a view's vertical center.
	 *  
	 */
	static CenterY: BMLayoutAttribute;

	/**
	 * The attribute corresponding to a view's width.
	 *  
	 */
	static Width: BMLayoutAttribute;

	/**
	 * The attribute corresponding to a view's height.
	 *  
	 */
	static Height: BMLayoutAttribute;

	/**
	 * The attribute corresponding to a view's aspect ratio.
	 *  
	 */
	static AspectRatio: BMLayoutAttribute;

	private constructor(); 
}

/**
 * Constants that describe the equality or inequality relation between the two sides of a constraint.
 * 
 */
declare class BMLayoutConstraintRelation {
	/**
	 * Indicates that the two sides of the constraint's equation should be equal.
	 *  
	 */
	static Equals: BMLayoutConstraintRelation;

	/**
	 * Indicates that the source view's attribute's value should be less than the right-hand side expression's value.
	 *  
	 */
	static LessThanOrEquals: BMLayoutConstraintRelation;

	/**
	 * Indicates that the source view's attribute's value should be greater than the right-hand side expression's value.
	 *  
	 */
	static GreaterThanOrEquals: BMLayoutConstraintRelation;

	private constructor(); 
}

/**
 * Constants that describe what type of view attribute a layout constraint affects.
 * 
 */
declare class BMLayoutConstraintKind {
	/**
	 * Indicates that this constraint affects a horizontal attribute.
	 *  
	 */
	static Horizontal: BMLayoutConstraintKind;

	/**
	 * Indicates that this constraint affects a vertical attribute.
	 *  
	 */
	static Vertical: BMLayoutConstraintKind;

	/**
	 * Indicates that this constraint affects the aspect ratio.
	 *  
	 */
	static AspectRatio: BMLayoutConstraintKind;

	private constructor(); 
}

/**
 * A layout constraint is a mathematical equality or inequality between two layout attributes on a view.
 * 
 * They are used as rules by the CoreUI layout engine to lay out views.
 * 
 * A constraint is a linear equation that takes the form of 
 * ```js
 * view1.attribute1 = multiplier * view2.attribute2 + constant
 * ```
 * where the equals sign can be replaced with an inequality sign as needed.
 * Note that despite looking like an assignment statement, the constraint expression is a mathematical equation and the layout
 * system may choose to modify either side (or even both) of the equation to fulfill the constraint's requirements.
 * 
 * There are four types of layout constraints: vertical position, horizontal position, width and height. 
 * Each of them controls a specific aspect of a view's layout. A view must have constraints which clearly define all four of those
 * attributes for the layout system to be able to size it and position it correctly.
 * Additionally, constraints having an attribute of a type on the left hand side of the equation can only have an attribute of the same type on the right hand side.
 * In other words, for example, a view's vertical positioning can only depend on the vertical positioning of another view and not on its horizontal positioning or its size.
 * For views that have intrinsic sizes, the sizing constraints are optional as the intrinsic sizes of the views will be used by default as size constraint inequalities.
 * In addition, it is also possible to specify a constraint for a view's aspect ratio by linking its width to its own height.
 * Similarly, it is also possible to specify a constraint that makes a view's aspect ratio depend upon the aspect ratio of another view.
 * When creating an aspect ratio constraint, this may only be to another view's aspect ratio.
 * 
 * Constraints may also have a priority value assigned to them. All constraints with a priority value lower than `BMLayoutConstraintPriorityRequired` are considered
 * optional. The layout system will try to fulfill them, but it does not guarantee that it will do so and optional constraints may be ignored if it is needed to do so to fulfill
 * the required constraints. When an optional constraint cannot be fulfilled, the layout system may nevertheless attempt to change the values of the attributes so that they are
 * as close as possible to fulfill the optional constraint without breaking the required constraints.
 * 
 */
declare class BMLayoutConstraint {

	/**
	 * Constructs and returns an internal layout constraint initialized with the given values.
	 * The constraint will be marked inactive by default. Internal constraints are marked automatically as active
	 * by CoreUI when needed.
	 * 															If omitted, the constraint will cause the view's attribute to be 
	 * 															solely related to the equation's constant component.
	 * 															The constraint's priority.
	 * 
	 */
	static internalConstraintWithView (view: BMView, args: {attribute: BMLayoutAttribute, relatedBy?: BMLayoutConstraintRelation | null | undefined, toView?: BMView | null | undefined, secondAttribute?: BMLayoutAttribute | null | undefined, multiplier?: number | null | undefined, constant?: number | null | undefined, priority?: number | null | undefined}): void;


	/**
	 * Constructs and returns a layout constraint initialized with the given values.
	 * The constraint will be marked inactive by default. You must set the constraint's
	 * `isActive` property to `YES` to make this constraint take part in layout calculations.
	 * 															If omitted, the constraint will cause the view's attribute to be 
	 * 															solely related to the equation's constant component.
	 * 															The constraint's priority.
	 * @return 								A layout constraint.
	 * 
	 */
	static constraintWithView (view: BMView, args: {attribute: BMLayoutAttribute, relatedBy?: BMLayoutConstraintRelation | null | undefined, toView?: BMView | null | undefined, secondAttribute?: BMLayoutAttribute | null | undefined, multiplier?: number | null | undefined, constant?: number | null | undefined, priority?: number | null | undefined}): BMLayoutConstraint;


	/**
	 * Creates and returns a constraint with the values of the given serialized constraint.
	 * 												The block is given a String ID and is expected to return the corresponding
	 * 												view instance.
	 * @return 		The constraint, or `undefined` if the constraint could not be deserialized.
	 * 
	 */
	static constraintWithSerializedConstraint (constraint: any, args: {viewIDs: (($0: string) => BMView)}): BMLayoutConstraint | null | undefined;


	/**
	 * The Cassowary solver to which this layout constraint has been attached.
	 *  
	 */
	private _solver: kiwi.Solver;

	/**
	 * The Cassowary constraint represented by this layout constraint.
	 *  
	 */
	private _constraint: kiwi.Constraint;

	/**
	 * Initializes this constraint with the values of the given serialized constraint.
	 * 												The block is given a String ID and is expected to return the corresponding
	 * 												view instance.
	 * @return 		This constraint, or `undefined` if the constraint could not be deserialized.
	 *  
	 */
	initWithSerializedConstraint(constraint: any, args: {viewIDs: (($0: string) => BMView)}): BMLayoutConstraint | null | undefined;


	/**
	 * Returns an array containing the attributes that this constraint affects
	 * for the given view. If this constraint does not affect that view, an empty
	 * array will be returned.
	 * @return 	The list off affected constraints.
	 *  
	 */
	affectedAttributesForView(view: BMView): BMLayoutConstraint[];


	/**
	 * Returns `YES` if this constraint represents a constraint collection.
	 *  
	 */
	readonly isConstraintCollection: any;

	/**
	 * Returns an array of primitive constraints that make up this constraint.
	 * For primitive constraints, this will return an array containing only this constraint.
	 *  
	 */
	readonly constituentConstraints: any;

	/**
	 * Used by the CoreUI layout editor to determine if the constant for this constraint may be modified.
	 * For primitive constraints this is always YES.
	 *  
	 */
	readonly _hasEditableConstant: any;

	/**
	 * The source view, on the left hand side of the equation.
	 *  
	 */
	private _sourceView: BMView;

	/**
	 * The source view's attribute involved in the equation.
	 *  
	 */
	private _sourceViewAttribute: BMLayoutAttribute;

	/**
	 * The source view, on the right hand side of the equation.
	 * If this property is not specified, this will be interpreted as a constant constraint.
	 *  
	 */
	private _targetView?: BMView | null | undefined;

	/**
	 * The target view's attribute involved in the equation.
	 * This property must be specified if `targetView` is also specified.
	 *  
	 */
	private _targetViewAttribute?: BMLayoutAttribute | null | undefined;

	/**
	 * The equation's multiplier component.
	 *  
	 */
	private _multiplier: number;

	/**
	 * The equation's constant component.
	 *  
	 */
	constant: number;

	/**
	 * The constraint's priority.
	 *  
	 */
	priority: number;

	/**
	 * The equation sign.
	 *  
	 */
	private _relation: BMLayoutConstraintRelation;

	/**
	 * The kind of layout constraint.
	 *  
	 */
	private _kind: BMLayoutConstraintKind;

	/**
	 * Returns a string representing this constraint's category, for debugging purposes.
	 *  
	 */
	readonly categoryKind: string;

	/**
	 * Defaults to NO. Should be set to YES to cause this constraint to become active and affect the layout.
	 * 
	 * For newly created constraints, it is up to the developer to mark the constraint as active, however in most cases
	 * where constraints are created automatically, the view that manages the layout hierarchy will typically
	 * manage the active state of constraints it owns, based on the current set of size traits.
	 * 
	 * This operation will throw an exception if the views to which the constraint is related are not siblings.
	 *  
	 */
	isActive: boolean;

	/**
	 * Invoked internally to install this constraint onto the views it affects.
	 *  
	 */
	private _install(): void;


	/**
	 * Should be invoked when this constraint is no longer and should be removed from the views it affects.
	 * This constraint cannot be marked active after invoking this method.
	 *  
	 */
	remove(): void;


	/**
	 * Invoked internally by CoreUI to retrieve the Cassowary expression that will be
	 * generated by this layout constraint. This expression will be used as the basis of
	 * the Cassowary constraint that will finally be used in the layout calculations.
	 *  
	 */
	readonly _cassowaryExpression: kiwi.Expression[];

	/**
	 * Invoked internally by CoreUI to retrieve the Cassowary constraint that will be
	 * generated by this layout constraint.
	 *  
	 */
	readonly _cassowaryConstraint: any;

	/**
	 * Returns a string representation of this constraint. This is
	 * often used when generating layout-related debug messages.
	 * @return 			A string.
	 *  
	 */
	toString(): string;


	/**
	 * Returns a string representation of this constraint. This is
	 * often used when generating layout-related debug messages.
	 * @return 			A string.
	 *  
	 */
	toCompactString(): string;


	/**
	 * Returns an object representing this constraint that may be serialized to a string.
	 * 										The block is given the view instance and should return a string from which
	 * 										a view reference may be obtained when this serialized representation is converted
	 * 										back into a constraint.
	 * @return 					A serializable representation of this constraint.
	 *  
	 */
	serializedConstraintWithViewIDs(block: (($0: BMView) => string)): any;

}


/**
 * The priority value indicating that the constraint is required to be fulfilled.
 * 
 */
declare var BMLayoutConstraintPriorityRequired: number;



/**
 * An equal attribute layout constraint is a constraint collection that makes a given attribute
 * of a set of views have the same value.
 * 
 */
declare class BMEqualAttributeLayoutConstraint extends BMLayoutConstraint {

	/**
	 * Constructs and returns a constraint that makes all of the views given to it have the same value
	 * for a given attribute.
	 * 												two views.
	 * @return  	A constraint.
	 * 
	 */
	static constraintWithAttribute (attribute: BMLayoutAttribute, args: {forViews: BMView[], priority?: number | null | undefined}): BMEqualAttributeLayoutConstraint;


	/**
	 * The views that this constraint affects.
	 *  
	 */
	private _views: BMView[];

	/**
	 * The attribute affected by this 
	 *  
	 */
	private _attribute: BMLayoutAttribute;
}


/**
 * An equal attribute layout constraint is a constraint collection that makes a set of views
 * have the same spacing between them, and optionally between the first and last view and the superview.
 * 
 */
declare class BMEqualSpacingLayoutConstraint extends BMLayoutConstraint {

	/**
	 * Constructs and returns a constraint that makes all of the views given to it have the same value
	 * for a given attribute.
	 * 												two views. If `withSuperview` is set to `YES`, this views in this
	 * 												array must be siblings.
	 * 											the array will have leading and trailing constraints bound to their superview.
	 * @return  	A constraint.
	 * 
	 */
	static constraintOfKind (kind: BMLayoutConstraintKind, args: {forViews: BMView[], withSuperview?: boolean | null | undefined, constant?: number | null | undefined, priority?: number | null | undefined}): BMEqualAttributeLayoutConstraint;


	/**
	 * The views that this constraint affects.
	 *  
	 */
	private _views: BMView[];

	/**
	 * The superview affected by this constraint, if any.
	 *  
	 */
	private _superview?: BMView | null | undefined;

	/**
	 * The first attribute for this constraint. This is `.Leading` for horizontal spacing
	 * and `.Top` for vertical spacing.
	 *  
	 */
	private _firstAttribute: BMLayoutAttribute;

	/**
	 * The first attribute for this constraint. This is `.Leading` for horizontal spacing
	 * and `.Top` for vertical spacing.
	 *  
	 */
	private _secondAttribute: BMLayoutAttribute;
}


/**
 * The layout editor is a popup window that helps users edit the constraints for that
 * view's layout.
 * 
 * Layout editor should be initialized with the root of the view hierarchy that should be edited.
 * The layout editor will automatically extract and update the constraints from the view hierarchy.
 * 
 */
declare class BMLayoutEditor extends BMWindow {

	/**
	 * The root of the view hierarchy managed by this layout editor.
	 *     
	 */
	readonly view: BMView;

	/**
	 * Designated initializer. Must be invoked after creating this layout editor, passing in the
	 * root of the view hierarchy whose layout will be edited by this window.
	 * The view's node will be temporarily detached from its parent and attached to the layout editor
	 * while it is being edited.
	 * @return      This layout editor.
	 *     
	 */
	initWithView(view: BMView): BMLayoutEditor;


	/**
	 * Is set to `YES` while this layout editor is full screen.
	 *     
	 */
	private _isFullScreen: boolean;

	/**
	 * Invoked to toggle fullscreen mode.
	 *     
	 */
	toggleFullscreenWithEvent(event: Event): void;


	/**
	 * Is set to `YES` while this settings pane is hidden.
	 *     
	 */
	private _isSettingsPaneHidden: boolean;

	/**
	 * Invoked to toggle fullscreen mode.
	 *     
	 */
	toggleSettingsPaneWithEvent(event: Event): void;


	/**
	 * Initializes the toolbar.
	 *     
	 */
	private _initToolbar(toolbar: DOMNode): void;


	/**
	 * Resizes the workspace to the given static size. Optionally, this change may be animated.
	 *     
	 */
	private _setStaticWorkspaceSize(size: BMSize): void;


	/**
	 * Should be invoked to make the given view selected.
	 * This will deselect the currently selected item.
	 *     
	 */
	selectView(view?: BMView | null | undefined, args?: {withEvent?: Event | null | undefined}): void;


	/**
	 * Invoked during a multiple selection to toggle the selection state for the given view.
	 *     
	 */
	toggleSelectionForView(view: BMView): void;


	/**
	 * 
	 *     
	 */
	initDragEventListenerForNode(node: DOMNode, args: {view: BMView}): void;


	/**
	 * 
	 * @return 
	 *     
	 */
	constraintOptionWithLabel(label: string, args: {action: (($0: Event) => void)}): DOMNode;


	/**
	 * Adds the given constraint to the view model, then selects it.
	 *     
	 */
	addConstraint(constraint: BMLayoutConstraint): void;


	/**
	 * Brings up a menu allowing the user to select, from a list, the type of constraint
	 * that they want to add.
	 * Once the user selects a constraint, it will be added and selected in the editor.
	 *     
	 */
	showConstraintOptionsFromView(view: BMView, args: {toView?: BMView | null | undefined, atPoint: BMPoint}): void;


	/**
	 * Returns an array of DOM nodes representing the possible default choices for horizontal constraints.
	 * @return                   The options.
	 *     
	 */
	horizontalConstraintOptionsFromView(view: BMView, args?: {toView?: BMView | null | undefined}): DOMNode[];


	/**
	 * Returns an array of DOM nodes representing the possible default choices for vertical constraints.
	 * @return                   The options.
	 *     
	 */
	verticalConstraintOptionsFromView(view: BMView, args?: {toView?: BMView | null | undefined}): DOMNode[];


	/**
	 * Should be invoked to make the given constraint selected.
	 * This will deselect the currently selected item.
	 *     
	 */
	selectConstraint(constraint?: BMLayoutConstraint | null | undefined, args?: {withReferenceView?: BMView | null | undefined}): void;


	/**
	 * Invoked internally to clear the offset states.
	 *     
	 */
	private _clearOffsets(): void;


	/**
	 * Draws the given constraint.
	 *                                                          of a constraint collection. Represents the constraint
	 *                                                          collection that generated this constraint.
	 * } 
	 *     
	 */
	private _drawConstraint(constraint: BMLayoutConstraint, args: {withReferenceView: BMView, sourceConstraint?: BMLayoutConstraint | null | undefined}): void;


	/**
	 * Invoked internally to draw the given horizontal constraint.
	 *     
	 */
	private _drawHorizontalConstraint(constraint: BMLayoutConstraint, args: {fromSourcePoint: BMPoint, toPoint: BMPoint, withReferenceView: BMView, sourceConstraint?: BMLayoutConstraint | null | undefined}): void;


	/**
	 * Invoked internally to draw the given vertical constraint.
	 *     
	 */
	private _drawVerticalConstraint(constraint: BMLayoutConstraint, args: {fromSourcePoint: BMPoint, toPoint: BMPoint, withReferenceView: BMView, sourceConstraint?: BMLayoutConstraint | null | undefined}): void;


	/**
	 * Constructs and returns the DOM node for a readonly setting.
	 *                                              when the value is clicked.
	 * @return                             A DOM node.
	 *     
	 */
	readonlySettingWithName(name: string, args: {value: string, action?: (($0: Event) => void) | null | undefined}): DOMNode;


	/**
	 * Constructs and returns the DOM node for a numeric setting.
	 * @return                             A DOM node.
	 *     
	 */
	numericSettingWithName(name: string, args: {forConstraint: BMLayoutConstraint, propertyName: string, value: string, withReferenceView: BMView}): DOMNode;


	/**
	 * 
	 *     
	 */
	optionNamed(named: string, args: {value: any}): void;


	/**
	 * Constructs and returns the DOM node for a numeric setting.
	 * @return                             A DOM node.
	 *     
	 */
	dropdownSettingWithName(name: string, args: {forConstraint: BMLayoutConstraint, propertyName: string, value: string, withReferenceView: BMView}): DOMNode;


	/**
	 * Constructs and returns the DOM node for a numeric setting.
	 * @return                             A DOM node.
	 *     
	 */
	equalitySettingWithName(name: string, args: {forConstraint: BMLayoutConstraint, value: string, withReferenceView: BMView}): DOMNode;


	/**
	 * Constructs and returns a settings button.
	 * @return                 A DOM node.
	 *     
	 */
	buttonSettingWithName(name: string, args: {action: (($0: Event) => void)}): DOMNode;


	/**
	 * Constructs and returns a settings divier.
	 * @return         A DOM node.
	 *     
	 */
	settingsDivider(): DOMNode;


	/**
	 * Creates a setting item that represents a view.
	 * Clicking on it will select the view in the layout editor.
	 * @return         The setting.
	 *     
	 */
	viewSettingWithView(view: BMView): DOMNode;


	/**
	 * Creates the settings pane for the given constraint.
	 *     
	 */
	createSettingsForConstraint(constraint: BMLayoutConstraint, args: {withReferenceView: BMView}): void;


	/**
	 * Creates the settings pane for the given constraint collection.
	 *     
	 */
	createSettingsForConstraintCollection(constraint: BMLayoutConstraint): void;


	/**
	 * 
	 *     
	 */
	constraintSettingWithConstraint(constraint: BMLayoutConstraint, args: {referenceView: BMView, internal?: boolean | null | undefined}): void;


	/**
	 * Creates the settings pane for the given view.
	 *     
	 */
	createSettingsForView(view: BMView): void;


	/**
	 * Constructs and returns a settings button that creates an equal attribute constraint
	 * over a set of views.
	 *     
	 */
	equalConstraintSettingWithName(name: string, args: {icon?: string | null | undefined, attribute: BMLayoutAttribute}): void;


	/**
	 * Creates the settings pane for multiple selected views.
	 *     
	 */
	createSettingsForMultipleViews(): void;


	/**
	 * Constructs and returns a layout editor that manages the layout constraints of the given view.
	 * @return          A layout editor.
	 * 
	 */
	static editorForView (view: BMView): BMLayoutEditor;

}


/**
 * The layout editor tree manages the tree-view sidebar of a layout editor.
 * 
 */
declare class _BMLayoutEditorTree {

	/**
	 * The DOM node into which this tree will render itself.
	 *     
	 */
	private _node: DOMNode;

	/**
	 * The root of the view hierarchy displayed by this tree.
	 *     
	 */
	private _view: BMView;

	/**
	 * The editor using this navigation tree.
	 *     
	 */
	private _editor: BMLayoutEditor;

	/**
	 * A map that maintains the reference between views and their associated DOM nodes
	 * in the tree.
	 *     
	 */
	private _viewNodeMap: Map<BMView, DOMNode>;

	/**
	 * A map that maintains the reference between constraints and their associated DOM nodes
	 * in the tree.
	 * Unlike views, layout constraints may have multiple associated DOM nodes, one for each
	 * view they affect.
	 *     
	 */
	private _constraintNodeMap: Map<BMLayoutConstraint, [DOMNode]>;

	/**
	 * 
	 *     
	 */
	initWithView(): void;


	/**
	 * Invoked during initialization to build the tree.
	 *     
	 */
	private _buildTree(): void;


	/**
	 * Constructs and returns the DOM structure for the given view.
	 * @return 
	 *     
	 */
	treeNodeForView(view: BMView): DOMNode;


	/**
	 * Constructs and returns the DOM structure for the given constraint.
	 * @return 
	 *     
	 */
	treeNodeForConstraint(constraint: BMLayoutConstraint, args: {withReferenceView: BMView}): DOMNode;


	/**
	 * Invoked by the layout editor to mark the given view as selected.
	 * This will first cause the currently selected item to be deselected.
	 * This only affects the view's display - the actual selection is stored by the layout editor
	 * itself.
	 * If the given view does not exist in this tree, this method will not select anything.
	 *     
	 */
	selectView(view?: BMView | null | undefined, args?: {continuous?: boolean | null | undefined}): void;


	/**
	 * Invoked by the layout editor to mark the given view as deselected.
	 * This only affects the view's display - the actual selection is stored by the layout editor
	 * itself.
	 * If the given view does not exist in this tree, this method will not select anything.
	 *     
	 */
	deselectView(view?: BMView | null | undefined): void;


	/**
	 * Invoked by the layout editor to mark the given constraint as selected.
	 * This will first cause the currently selected item to be deselected.
	 * This only affects the constraint's display - the actual selection is stored by the layout editor
	 * itself.
	 * If the given constraint does not exist in this tree, this method will not select anything.
	 *     
	 */
	selectConstraint(view?: BMLayoutConstraint | null | undefined): void;


	/**
	 * Invoked by the layout editor to remove the given constraint.
	 *     
	 */
	removeConstraint(constraint: BMLayoutConstraint): void;


	/**
	 * Invoked by the layout editor to add the given constraint.
	 *     
	 */
	addConstraint(constraint: BMLayoutConstraint): void;

}


/**
 * 
 * } 
 * @return 
 * 
 */
declare function _BMLayoutEditorTreeMakeWithView(view: BMView, args: {node: DOMNode}): _BMLayoutEditorTree;



/**
 * An attributed label view is a view that displays a text that can have various arguments which may be changed at runtime.
 * The attributed label automatically generates DOM nodes for each argument.
 * 
 * Creating a label view with a template can be done using the factory method:
 * ```js
 * MAttributedView.labelViewWithTemplate('Template with ${firstPlaceholder} and ${secondPlaceholder}');
 * ``
 * which creates an attributed label with two arguments named `firstPlaceholder` and `secondPlaceholder`.
 * 
 * The arguments themselves are accessed and updated via the `arguments` property of the attributed label view. Each argument
 * appears a property of that object. Their value can be read or written through the `value` property of that object .e.g 
 * ```js
 * / This sets the value of the firstPlaceholder argument
 * yLabelView.arguments.firstPlaceholder.value = 3;
 * ``
 * 
 * Additionally, the arguments objects allow specifying CSS styles for each argument. The attributed label view will reapply these styles
 * whenever the underlying DOM structure changes, for example when changing the template string. This is accessible via the `style` property of each argument
 * object. This takes a regular CSS rule object, such as `{color: 'red', borderWidth: '2px'}`.
 * 
 * Finally, the underlying DOM nodes themselves are accessible via the `node` property of these arguments objects. Note that there is no guarantee of the lifetime of
 * these DOM nodes. The attribute label can remove and re-create these nodes at any time as needed.
 * 
 */
declare class BMAttributedLabelView extends BMView {

	/**
	 * This attributed label view's content node. If this value is not set during initialization, it defaults to the view's node.
	 * 
	 * If set, this controls where the attributed label view will insert its text. The given node should be a descendant of the label view's node.
	 *     
	 */
	private readonly _contentNode: any;

	/**
	 * An optional string that will be prefixed to the argument DOM node class names.
	 * By default, a DOM node is created for each argument and is assigned a class name that is
	 * equal to the argument's name. When this property is set, its value is prefixed to the argument's class name.
	 *     
	 */
	classPrefix: string;

	/**
	 * The template string.
	 *     
	 */
	template: string;

	/**
	 * An object that contains the arguments used by this attributed label view.
	 * This object's keys and values should not be modified; only the properties label view arguments themselves should be modified.
	 *     
	 */
	arguments: Readonly<Dictionary<BMAttributedLabelViewArgument>>;

	/**
	 * Constructs and returns an attributed label view with the given template.
	 * @return                       An attributed label view.
	 * 
	 */
	static labelViewWithTemplate (template: string, args?: Dictionary<any> | null | undefined): BMAttributedLabelView;


	/**
	 * Constructs and returns an attributed label view with the given template. The new view will use the given node.
	 *                                                      This parameter represents the DOM node in which the attributed label view will insert its contents.
	 * @return                       An attributed label view.
	 * 
	 */
	static labelViewForNode (node: DOMNode, args: {template: string, contentNode?: DOMNode | null | undefined, arguments?: Dictionary<any> | null | undefined}): BMAttributedLabelView;

}


/**
 * An attributed label view argument manages the display of an argument of an attributed label view.
 * 
 * Label view arguments cannot be created directly. They are always created and managed by an attributed label view.
 * 
 */
declare class BMAttributedLabelViewArgument {

	/**
	 * The attributed label view managing this argument.
	 *     
	 */
	private _view: BMAttributedLabelView;

	/**
	 * This argument's name.
	 *     
	 */
	private _name: string;

	/**
	 * Represents this argument's index within the DOM hierarchy.
	 *     
	 */
	private _index: number;

	/**
	 * The argument's current value. If this is set to a non-string value, its `toString()` method will be used
	 * to obtain a string representation.
	 *     
	 */
	value: any;

	/**
	 * An object containing the CSS styles that this argument should use.
	 * This object returned by this property should not be modified after being assigned, instead
	 * modifications should be performed by creating and setting a new object for this property.
	 *     
	 */
	style?: Readonly<Dictionary<string>> | null | undefined;

	/**
	 * The DOM node managed by this argument.
	 *     
	 */
	readonly node: DOMNode;

	/**
	 * Used internally by CoreUI to assign a node to this argument.
	 *     
	 */
	private _setNode(node: DOMNode): void;

}