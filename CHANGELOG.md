# 2.6.2

Resolves an issue that caused scrollbars to appear in Thingworx 9.

# 2.6

Improved compatibility with Core UI 2.6.

Core UI type definitions are now available when using Core UI Widgets.

# 2.5

The `$w` function now takes a generic type parameter that will coerce its return value to that type. Note that this will not perform any runtime check of the returned widget. It is still the responsiblity of the developer to ensure that the correct widget type will be returned.

The `INFOTABLE` and `TWInfotable` types are now generic. Additionally, `INFOTABLE` is now a typealias to `TWInfotable` instead of being a separate interface.

The various Thingworx base types that map to regular JavaScript primitives are now defined as typealiases to regular primitives instead of being interfaces that extend boxed types.

The CoreUI definitions are no longer packaged with this extension, instead they will be retrieved from the CoreUI extension.

Resolved an issue that would cause newly added properties, event and services to not be focused if they were added off-screen.

When importing an object from the current mashup, the mashup name is no longer required. For these objects, the syntax is simply:
```js
//#import MyObject
```

Code editors are no longer modal and can now be moved, resized and overlaid.

The two sidebars are now resizable.

CodeHost will now retain its window's size, position and the size of the sidebars when it is closed and reopened.

On macOS Mojave, the code editor will take on a black appearance if the system appearance setting is set to dark mode.

CodeHost now uses a gulp build script for minifying and packaging - release builds are now minified and optimized.

# 2.0.1

CodeHost is now compatible with Thingworx 8.4, but now requires `monaco` as `CodeMirror` is no longer available in the global scope in that release of Thingworx.

# 2.0

A new widget called **TypeScript Object** is now available. It works the same as the **Object** widget except that it uses TypeScript code instead of 
regular JavaScript code.

Improved typing information for some of the built-in methods.

When a typescript or javascript object is set to execute in the global scope, the properties sidebar will now be hidden.

Added code snippets for various commonly used blocks such as for loops.

When using Monaco the code outline available on the left-hand side of the editor now uses `tsc` and is much more accurate and complete.

A new directive may be used to import objects from other mashups or external URLs. This allows you to use autocomplete suggestions for those types
as well take advantage of type correctness in TypeScript. This works for both the **Object** and **TypeScript Object** widgets. The syntax for this is:
```js

// This imports a TypeScript or JavaScript object from another mashup
// Note that the comment dashes are required as well
//#import MyObject from MyMashup

// This imports an external URL
//#import http://roicentersvn.ptcnet.ptc.com/roicenter.d.ts

// This imports the definition of a widget
//#import widget BMView
// In this case, the extension package name is assumed to be BMView_ExtensionPackage

// This imports the definition of a widget with a different package name
//#import widget BMView from BMCoreUI_ExtensionPackage

// This imports a type from definitelytyped.org
//#import type three

```

Resolved an issue that caused keyboard shortcuts to not be handled correctly.

Resolved an issue that caused keyboard shortcuts to be incorrectly bubbled when the code editor had focus.

Added tooltips to the toolbar buttons.

# 1.0.333

This release requires BMCoreUI v2.

## General Changes

The `Javascript` widget has been renamed to `Object`.
The `CSS` widget has been renamed to `Stylesheet`.

Resolved an keyboard shortcut incompatibility with the `BMMashupShowcase` widget.

## Object

Properties, events and services can now be rearranged by dragging them.

The delete button has been removed from properties, events and services. Instead, to delete them now, drag them outside of the properties sidebar.

Resolved an issue in which the jQuery definitions file was not loaded correctly.

CoreUI types are now available as autocomplete suggestions.

Object will now remove invalid bindings when removing or renaming properties, events or services.

# 1.0.300

## Stylesheet

For development environments the Stylesheet widget now has a new property called `DirectLink`. 
This feature enables live updating of the mashup styles at runtime, without needing to save and reload the mashup.
Using this feature requires having the Debugger entities and extensions installed, but if they are missing the CSS widget will continue to work without DirectLink.

# 1.0.215

This release requires BMCoreUI v1.0.9.

Using the Monaco editor now requires having version 1.4.0 of that extension installed.

Fixed an issue that caused updated properties to be converted to strings, even if they were defined with other base types.
