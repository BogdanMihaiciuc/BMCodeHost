////<reference path="./types.ts"/>

var CHFunctionRegex = /([^ \t\r\n\f+\-=.<>?:()[\]*\\\/!%]+)\s*\.(\S+)\s*=\s*function\s*[^()]*\s*\(.*\)|function\s*(\S+)\s*\(.*\)|(\S+)\s*:\s*function\s*[^()]*\s*\(.*\)/g;
var CHMarkRegex = /\s*\/\/\s*MARK:\s*(.*)/g;
var CHBlockMarkRegex = /\s*\/\*\s*MARK:\s*(.*)\s*\*\//g;

if (!window.BMMaterialFontsLoaded) {
	window.BMMaterialFontsLoaded = YES;
	
	$('head').append('<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">');
}

function BMCodeHostCoreMonacoLoader() {
	if (!window.require) {
		return window.setTimeout(BMCodeHostCoreMonacoLoader, 100);
	}
	
	var extRoot = "/Thingworx/Common/extensions/MonacoScriptEditor/ui/monacoScriptEditor";
	
	require.config({
	    paths: {
	        "vs": extRoot + "/vs"
	    }
	});
		    
	require(["vs/editor/editor.main"], function () {});
}


setTimeout(function () {
	let twStudio = document.querySelector('#twStudioBody');
	if (twStudio) {
		twStudio.style.backgroundColor = 'white';
		let pageWindow = {node: twStudio, get frame() {return BMRectMake(0, 0, window.innerWidth, window.innerHeight)}};
		BMWindow.registerShowcaseElement(pageWindow);

		let _enterShowcase = BMWindow.enterShowcase;
		BMWindow.enterShowcase = function () {
			_enterShowcase.apply(this, arguments);

			BMAnimateWithBlock(() => {
				BMAnimationContextEnableWebAnimations();
		
				let header = document.getElementById('twStudioHeader');
				let headerController = BMAnimationContextGetCurrent().controllerForObject(header, {node: header});
				headerController.registerBuiltInProperty('translateY', {withValue: -header.offsetHeight + 'px'});
			}, {duration: 300, easing: 'easeInOutQuad'});
		}
		

		let _exitShowcase = BMWindow.exitShowcase;
		BMWindow.exitShowcase = function () {
			_exitShowcase.apply(this, arguments);

			BMAnimateWithBlock(() => {
				BMAnimationContextEnableWebAnimations();
		
				let header = document.getElementById('twStudioHeader');
				let headerController = BMAnimationContextGetCurrent().controllerForObject(header, {node: header});
				headerController.registerBuiltInProperty('translateY', {withValue: '0px'});
			}, {duration: 300, easing: 'easeInOutQuad'});
		}
	}
	else {
		/*let pageWindow = {node: document.querySelector('.aurelia-main'), get frame() {return BMRectMake(0, 0, window.innerWidth, window.innerHeight)}};
		BMWindow.registerShowcaseElement(pageWindow);*/
	}
}, 500);

function BMCHLoadSnippets() {
	let snippets = [];
	for (var key in BMCHSnippets) {
		if (BMCHSnippets.hasOwnProperty(key)) {
			snippets.push({
				kind: monaco.languages.CompletionItemKind.Snippet,
				label: BMCHSnippets[key].prefix,
				documentation: BMCHSnippets[key].description,
				insertText: {
					value: BMCHSnippets[key].body.join("\n")
				}
			});
		}
	}

	monaco.languages.registerCompletionItemProvider(BMCodeEditorLanguage.Javascript, {
		provideCompletionItems() {
			return snippets;
		}
	});

	monaco.languages.registerCompletionItemProvider(BMCodeEditorLanguage.Typescript, {
		provideCompletionItems() {
			return snippets;
		}
	});

	window.BMCHDidLoadSnippets = YES;
}

window.setTimeout(function () {
	if (!TW.monacoEditor) return;
	
	BMCodeHostCoreMonacoLoader();
}, 0);

var BMCHRootES6Library; // <String, nullable>
var BMCHRootjQueryLibrary; // <String, nullable>
var BMCHCoreUILibrary; // <String, nullable>
var BMCHTWXLibrary; // <String, nullable>

async function BMCodeHostLoadRootLibrariesWithCompletionHandler(handler) {
	let ES6Response = await fetch('/Thingworx/Common/extensions/BMCodeHost/ui/BMCodeHost/lib.es6.d.ts', {credentials: 'include'});
	BMCHRootES6Library = await ES6Response.text();

	let jQueryResponse = await fetch('/Thingworx/Common/extensions/BMCodeHost/ui/BMCodeHost/jquery.d.ts', {credentials: 'include'});
	BMCHRootjQueryLibrary = await jQueryResponse.text();

	let coreUIResponse = await fetch('/Thingworx/Common/extensions/BMCoreUI/ui/BMCoreUI/BMCoreUI.d.ts', {credentials: 'include'});
	BMCHCoreUILibrary = await coreUIResponse.text();

	let TWXResponse = await fetch('/Thingworx/Common/extensions/BMCodeHost/ui/BMCodeHost/Thingworx.d.ts', {credentials: 'include'});
	BMCHTWXLibrary = await TWXResponse.text();

	return handler ? handler() : void 0;

	/*var ES6XHR = new XMLHttpRequest();
	
	ES6XHR.open('GET', '/Thingworx/Common/extensions/BMCodeHost/ui/BMCodeHost/lib.es6.d.ts', YES);
	
	ES6XHR.onload = function () {
		BMCHRootES6Library = ES6XHR.responseText;
		
		var jQueryXHR = new XMLHttpRequest();
		
		jQueryXHR.open('GET', '/Thingworx/Common/extensions/BMCodeHost/ui/BMCodeHost/jquery.d.ts', YES);
		
		jQueryXHR.onload = function () {
			BMCHRootjQueryLibrary = jQueryXHR.responseText;
			
			var CoreUIXHR = new XMLHttpRequest();

			CoreUIXHR.open('GET',  '/Thingworx/Common/extensions/BMCodeHost/ui/BMCodeHost/BMCoreUI.d.ts', YES);

			CoreUIXHR.onload = function () {
				BMCHCoreUILibrary = CoreUIXHR.responseText;

				if (handler) handler();
			}

			CoreUIXHR.send();
		}
		
		jQueryXHR.send();
	};
	
	ES6XHR.send();*/
}

var _BMCodeHostLanguageValues = {};

TW.IDE.Widgets.BMCodeHost = function (language) {

	_BMCodeHostLanguageValues[BMCodeEditorLanguage.Javascript] = {
		name: 'Object',
		description: 'Represents a javascript object stub that can be implemented on the fly.',
		title: 'object',
		code: ' // Code to be executed at runtime \n',
		class: ''
	}
	
	_BMCodeHostLanguageValues[BMCodeEditorLanguage.CSS] = {
		name: 'Stylesheet',
		description: 'Represents a stylesheet that is added to the page.',
		title: 'stylesheet',
		code: '/* Style to be loaded at runtime */\n\n\
/* MARK: You can define navigation sections with \'MARK:\' comments */ \n',
		class: 'BMCHCSSCodeEditor'
	}
	
	_BMCodeHostLanguageValues[BMCodeEditorLanguage.Typescript] = {
		name: 'TypeScript Object',
		description: 'Represents a typescript object stub that can be implemented on the fly.',
		title: 'object',
		code: ' // Code to be executed at runtime \n',
		class: ''
	}
	
	language = language || BMCodeEditorLanguage.Javascript;
	
	var extension = language === BMCodeEditorLanguage.CSS ? '.css' : (BMCodeEditorLanguage.Typescript === language ? '.ts' : '.js');
	
	var self = this;

	var sourceTimeout = undefined;
	
	var codeEditor = undefined; // <BMCodeEditor, nullable>
	var codeWindow = undefined; // <BMWindow, nullable>
	var propertiesCollection = undefined; // <BMCollectionView, nullable>
	var sidebarCollection = undefined; // <BMCollectionView, nullable>
	
	var codeHosts = undefined; // <[TWWidget]>

	var properties = [];
	var services = [];
	var events = [];
	
	var functions = [];
	var filteredFunctions = [];
	var oldFunctions;
	var newFunctions;
	
	var sidebarDataSet = new (function () {

		this.numberOfSections = function () {
			return 1;
		};
		
		this.numberOfObjectsInSectionAtIndex = function (index) {
			return filteredFunctions.length;
		};
		
		this.indexPathForObjectAtRow = function (row, args) {
			return BMIndexPathMakeWithRow(row, {section: args.inSectionAtIndex, forObject: filteredFunctions[row]});
		};
		
		this.indexPathForObject = function (object) {
			
			for (var row = 0; row < filteredFunctions.length; row++) {
				if (filteredFunctions[row].name == object.name && filteredFunctions[row].ordinal == object.ordinal && filteredFunctions[row].type == object.type) {
					return BMIndexPathMakeWithRow(row, {section: 0, forObject: object});
				}
			}
			
			return undefined;
		};
		
		this.contentsForCellWithReuseIdentifier = function (identifier) {
			if (identifier == 'region') {
				var contents = $('<div class="BMCHNavigationSection"></div>');
			}
			else {
				var contents = $('<div class="BMCHNavigationLink">\
						<span class="BMCHNavigationLinkLine"></span>\
						<span class="BMCHNavigationLinkType"></span><span class="BMCHNavigationLinkName"></span></div>');
			}
			
			return contents;
		};
		
		this.cellForItemAtIndexPath = function (indexPath) {
			var cell = sidebarCollection.dequeueCellForReuseIdentifier(indexPath.object.type);
			
			this.updateCell(cell, {atIndexPath: indexPath});
			
			return cell;
		};
		
		this.updateCell = function (cell, args) {
			var indexPath = args.atIndexPath;
			
			if (cell.reuseIdentifier == 'region') {
				$(cell.node).find('.BMCHNavigationSection').text(indexPath.object.name);
			}
			else {
				$(cell.node).find('.BMCHNavigationLinkLine').text(indexPath.object.line + 1);
				$(cell.node).find('.BMCHNavigationLinkType').html(indexPath.object.type);
				$(cell.node).find('.BMCHNavigationLinkName').text(indexPath.object.name);

				if (indexPath.object.matchesSearch) {
					cell.element[0].classList.add('BMCHNavigationLinkHighlighted');
				}
				else {
					cell.element[0].classList.remove('BMCHNavigationLinkHighlighted');
				}
			}
			
		};
		
		var isUsingOldDataSet = NO;
		
		this.useOldData = function (use) {
			isUsingOldDataSet = use;
			
			if (use) {
				filteredFunctions = oldFunctions;
			}
			else {
				filteredFunctions = newFunctions;
			}
		};
		
		this.isUsingOldData = function () {
			return isUsingOldDataSet;
		};
		
		this.collectionViewShouldRunIntroAnimation = function () { return YES; };
		
		this.collectionViewAnimationOptionsForIntroAnimation = function () { return {duration: 200, delay: 0, stride: 10}; };
		
		this.collectionViewAnimationOptionsForUpdateAnimation = function () { return {duration: 200, delay: 0}; };
		
		this.collectionViewCellWasClicked = function (collectionView, cell) {
			codeEditor.cursorPosition = BMPointMake(0, cell.indexPath.object.line + 1);
			codeEditor.acquireFocus();
		}
		
	})();

	// Imports contain references to other objects or third party scripts
	var imports = [];
	var importsDTS = '';

	var updateNavigationSidebar = async function () {
		
		if (!codeEditor) return;
		if (sidebarCollection && sidebarCollection.isUpdatingData) return;
		
		var code = codeEditor.code;

		// If DirectLink is enabled, publish the changes
		if (language == BMCodeEditorLanguage.CSS) {
			if (self.getProperty('DirectLink')) {
				var request = new XMLHttpRequest();

				request.open('POST', '/Thingworx/Things/Debugger.Websocket/Services/publishNamespaceUpdate', YES);
				request.setRequestHeader('X-XSRF-TOKEN', 'TWX-XSRF-TOKEN-VALUE');
				request.setRequestHeader('Content-Type', 'application/json');
				request.setRequestHeader('Accept', 'application/json');

				var data = {namespace: self.getProperty('DirectLinkUUID'), update: code};

				request.send(JSON.stringify(data));
			}
		}
		
		var currentFunctions = [];
		var functionCounts = {};
		
		oldFunctions = filteredFunctions;
		functions = currentFunctions;
		newFunctions = currentFunctions;

		var lines = code.split('\n');

		let currentImports = [];

		var ordinal = 0;

		let useAST = NO;

		// Always use AST for typescript
		if (language === BMCodeEditorLanguage.Typescript) {
			useAST = YES;
		}

		// For JS, require monaco
		if (language === BMCodeEditorLanguage.Javascript && window.monaco) {
			useAST = YES;
		}

		if (useAST) {
			let worker = await monaco.languages.typescript.getLanguageWorker(language);
			let client = await worker(codeEditor._monaco.getModel().uri);

			let outlineTokens = await client.getOutline(codeEditor._monaco.getModel().uri.toString());

			function indentHTMLWithIndentAmount(indentation) {
				let indents = '';
				for (let i = 0; i < indentation; i++) {
					indents += '<span class="BMCHIndent">&nbsp;&nbsp;</span>';
				}
				return indents;
			}

			function kindHTMLWithKindString(kind) {
				switch (kind) {
					case 'Class': return '<span class="BMCHType BMCHClassType">C</span>&nbsp;';
					case 'ObjectLiteral': return '<span class="BMCHType BMCHClassType">{}</span>&nbsp;';
					case 'Method': return '<span class="BMCHType BMCHMethodType">m</span>&nbsp;';
					case 'Constructor': return '<span class="BMCHType BMCHMethodType">c</span>&nbsp;';
					case 'Function': return '<span class="BMCHType">ƒ</span>&nbsp;';
					case 'Get': return '<span class="BMCHType BMCHGetType">g</span>&nbsp;';
					case 'Set': return '<span class="BMCHType BMCHSetType">s</span>&nbsp;';
					default: return '<span class="BMCHType">x</span>&nbsp;';
				}
			}

			for (let token of outlineTokens) {
				currentFunctions.push({
					name: token.name, 
					type: indentHTMLWithIndentAmount(token.indentAmount) + kindHTMLWithKindString(token.kind), 
					ordinal: token.ordinal, 
					line: token.line,
					indentAmount: token.indentAmount
				});
			}
		}

		var match;
		for (var i = 0; i < lines.length; i++) {
			let line = lines[i];
			// For JS and TS resolve import statements
			if (language !== BMCodeEditorLanguage.CSS) {
				if (line.indexOf('//#import') == 0) {
					if (line.indexOf('//#import type ') == 0) {
						// Import type statements import entire type projects from
						// definitely typed using only the typename
						// //#import type three
						let components = line.trim().split(' ');
						currentImports.push({type: 'type', name: components[2]});
					}
					else if (line.indexOf('//#import widget ') == 0) {
						// Import widget statements can either be widget imports where the package name
						// is the same as the widget name e.g.
						// //#import widget BMView
						//
						// or imports where the widget and package names are different e.g.
						// //#import widget BMView from BMView_ExtensionPackage
						let components = line.trim().split(' ');
						if (components.length == 3) {
							currentImports.push({type: 'widget', widget: components[2], package: components[2] + '_ExtensionPackage'});
						}
						else {
							currentImports.push({type: 'widget', widget: components[2], package: components[4]});
						}
					}
					else {
						// Import statements can either be: 
						// object imports which use a syntax of
						// //#import myObject from MyMashup
						//
						// local object imports which use a syntax of
						// //#import myObject
						//
						// or external resource imports which use a syntax of
						// //#import http://server.com/myFile.d.ts
						let components = line.trim().split(' ');
						let isURL = NO;
						if (components[1]) {
							isURL = components[1].startsWith('http:') || components[1].startsWith('https:') || components[1].startsWith('/') || components[1].startsWith('../');
						}
						if (components.length == 2 && isURL) {
							currentImports.push({type: 'URL', URL: components[1]});
						}
						else {
							currentImports.push({type: 'mashup', mashup: components[3], object: components[1]});
						}
					}
				}
				// Regions are only supported in AST mode
				else if (useAST && line.trim().indexOf('//#region ') == 0) {
					let regionName = line.trim();
					regionName = line.trim().substring('//#region '.length, line.length).trim();
					currentFunctions.push({name: regionName, type: 'region', ordinal: ordinal, line: i});
				}
				else if (useAST && line.trim().indexOf('// MARK: ') == 0) {
					let regionName = line.trim();
					regionName = line.trim().substring('// MARK: '.length, line.length).trim();
					currentFunctions.push({name: regionName, type: 'region', ordinal: ordinal, line: i});
				}
			}

			if (useAST) {
				// Typescript uses AST to build a nicer outline
				continue;
			}

			if (match = CHFunctionRegex.exec(lines[i])) {
				var name = match[2] || match[3] || match[4];
				var type = (match[1] && (match[1] + '.')) || (match[3] && 'function ') || '-> ';
				
				var ordinal = 1;
				if (functionCounts[type + name]) {
					functionCounts[type + name] += 1;
					ordinal = functionCounts[type + name];
				}
				else {
					functionCounts[type + name] = 1;
				}
				
				currentFunctions.push({name: name, type: type, ordinal: ordinal, line: i});
				
			}
			else if (match = CHMarkRegex.exec(lines[i])) {
				var name = match[1];
				
				var ordinal = 1;
				if (functionCounts['MARK: ' + name]) {
					functionCounts['MARK: ' + name] += 1;
					ordinal = functionCounts['MARK: ' + name];
				}
				else {
					functionCounts['MARK: ' + name] = 1;
				}
				
				currentFunctions.push({name: name, type: '&bull; ', ordinal: ordinal, line: i});
				
			}
			else if (match = CHBlockMarkRegex.exec(lines[i])) {
				var name = match[1];
				
				var ordinal = 1;
				if (functionCounts['MARK: ' + name]) {
					functionCounts['MARK: ' + name] += 1;
					ordinal = functionCounts['MARK: ' + name];
				}
				else {
					functionCounts['MARK: ' + name] = 1;
				}
				
				currentFunctions.push({name: name, type: '&bull; ', ordinal: ordinal, line: i});
			}
		}

		currentFunctions = currentFunctions.sort((o1, o2) => o1.line - o2.line);
		filteredFunctions = filteredFunctionsWithFunctions(currentFunctions);
		currentFunctions.forEach(fx => fx.isLeaf = NO);
		newFunctions = filteredFunctions;
		
		
		if (sidebarCollection) sidebarCollection.updateEntireDataAnimated(YES);

		this.resolveImports(currentImports);
		
	}.bind(this);

	let filteredFunctionsWithFunctions = functions => {
		let hasNonLeafs = NO;

		// Discover the leaf nodes - leaf nodes are functions whose following element has the same or a lower indent amount OR if the next element
		// has been marked as a leaf node by a previous iteration
		for (let i = 0, length = functions.length; i < length; i++) {
			if (i == length - 1) {
				functions[i].isLeaf = YES;
			}
			else {
				if (functions[i + 1].indentAmount <= functions[i].indentAmount || functions[i + 1].isLeaf) {
					functions[i].isLeaf = YES;
				}
				else {
					hasNonLeafs = YES;
				}
			}
		}

		// Filter all leaf functions, excluding those that have children
		let filteredFunctions = functions.filter((fx, index) => {
			if (filterText && fx.name.toLowerCase().includes(filterText.toLowerCase())) {
				fx.matchesSearch = YES;
			}
			return (fx.name.toLowerCase().includes(filterText.toLowerCase()) || 
				!fx.isLeaf || 
				(functions[index + 1] && functions[index + 1].indentAmount > fx.indentAmount)
			);
		});

		if (hasNonLeafs) {
			return filteredFunctionsWithFunctions(filteredFunctions);
		}
		else {
			return filteredFunctions;
		}
	}

	let filterNavigationSidebar = () => {

		oldFunctions = filteredFunctions;
		filteredFunctions = filteredFunctionsWithFunctions(functions);
		functions.forEach(fx => fx.isLeaf = NO);
		newFunctions = filteredFunctions;

		sidebarCollection.updateEntireDataAnimated(YES);
	}

	/**
	 * Looks for object and typescript object widgets in the given widget and adds their exports to the given array.
	 * @param rootWidget <Object>			The widget definition in which to look for exports.
	 * @param targetArray <[Object]>		An array to which the exportable widgets will be added.
	 */
	function findExportsInWidget(rootWidget, targetArray) {
		if (rootWidget.Properties.Type == 'BMCodeHost' || rootWidget.Properties.Type == 'BMTypescriptHost') {
			targetArray.push({
				title: rootWidget.Properties.Title,
				exports: rootWidget.Properties.Exports,
				code: rootWidget.Properties.Code,
				scope: rootWidget.Properties.Scope
			});
		}
		else {
			var widgets = rootWidget.Widgets;
			for (var i = 0; i < widgets.length; i++) {
				findExportsInWidget(widgets[i], targetArray);
			}
		}
	}

	// Represents the currently running import operation
	var currentImportOperation; // <Promise<Void>>

	this.resolveImports = async function (newImports) {
		// If there is already a running import operation, await for it to finish before continuing
		await currentImportOperation;

		let resolve;
		currentImportOperation = new Promise($0 => resolve = $0);

		// Create a list of diffs
		let importActions = [];

		// Set to YES if there are any new or deleted imports
		let requiresUpdate = NO;

		// Find the old imports which were removed or retained
		imports.forEach(oldImport => {
			let hasImport = NO;
			newImports.forEach(newImport => {
				if (newImport.type === oldImport.type && 
					newImport.URL === oldImport.URL && 
					newImport.mashup === oldImport.mashup && newImport.object === oldImport.object &&
					newImport.widget === oldImport.widget && newImport.package === newImport.package &&
					newImport.name === oldImport.name) {
						importActions.push({action: 'retain', import: oldImport});
						hasImport = YES;

						// For retained typings, import them here if they don't exist
						if (oldImport.libraries) {
							oldImport.libraries.forEach(library => {
								if (!codeEditor.hasExternalLibraryNamed(library.name)) {
									codeEditor.addExternalLibraryNamed(library.name, {code: library.code});
								}
							});
						}
				}
			});

			if (!hasImport) {
				// If the deleted import was a typing, clear its libraries
				if (oldImport.libraries) {
					oldImport.libraries.forEach(library => {
						codeEditor.removeExternalLibraryNamed(library.name);
					});
				}
				requiresUpdate = YES;
			}
		});

		// Find the newly added imports
		newImports.forEach(newImport => {
			let hasImport = NO;
			imports.forEach(oldImport => {
				if (newImport.type === oldImport.type && 
					newImport.URL === oldImport.URL && 
					newImport.mashup === oldImport.mashup && newImport.object === oldImport.object &&
					newImport.widget === oldImport.widget && newImport.package === newImport.package &&
					newImport.name === oldImport.name) {
						hasImport = YES;
				}
			});

			if (!hasImport) {
				importActions.push({action: 'fetch', import: newImport});
				requiresUpdate = YES;
			}
		});

		// If there were no changes, don't process any further
		if (!requiresUpdate) {
			return resolve();
		}

		// Rebuild the list of imports, fetching new imports as needed
		let updatedImports = [];
		for (let i = 0; i < importActions.length; i++) try {
			const importAction = importActions[i];
			if (importAction.action == 'retain') {
				updatedImports.push(importAction.import)
			}
			else {
				if (importAction.import.type == 'type') {
					importAction.import.libraries = [];

					// Typings require several requests - the first one to retrieve the version information
					let version = await fetch(`https://data.jsdelivr.com/v1/package/npm/@types/${importAction.import.name}`);
					let versionInfo = await version.json();

					let latestVersion = versionInfo.tags.latest;

					let files = await fetch(`https://data.jsdelivr.com/v1/package/npm/@types/${importAction.import.name}@${latestVersion}/flat`, {cache: "force-cache"});
					let fileInfo = await files.json();

					for (let i = 0; i < fileInfo.files.length; i++) {
						let file = fileInfo.files[i];

						// Skip non d.ts files
						if (!file.name.endsWith('.d.ts') && file.name != 'tsconfig.json') continue;

						let fileName = importAction.import.name + file.name;
						/*if (file.name == '/index.d.ts') {
							fileName = importAction.import.name + '/_index.d.ts';
						}*/

						let code = await fetch(`https://cdn.jsdelivr.net/npm/@types/${importAction.import.name}@${latestVersion}${file.name}`, {cache: "force-cache"});
						let library = await code.text();
						library = {name: fileName, code: library};

						importAction.import.libraries.push(library);
					}

					updatedImports.push(importAction.import);
				}
				else if (importAction.import.type == 'URL') {
					importAction.import.libraries = [];

					// For URL imports, fetch the URL and import it directly
					let code = await fetch(importAction.import.URL);
					importAction.import.code = await code.text();
					let URL = importAction.import.URL;
					importAction.import.libraries.push({name: 'URL_' + URL.substring(URL.lastIndexOf('/') + 1, URL.length), code: importAction.import.code});

					updatedImports.push(importAction.import);
				}
				else if (importAction.import.type == 'widget') {
					// For widget imports, construct the URL, fetch it and import it directly
					let url = `/Thingworx/Common/extensions/${importAction.import.package}/ui/${importAction.import.widget}/typings/${importAction.import.widget}.d.ts`;
					let code = await fetch(url, {credentials: 'include'});
					importAction.import.code = await code.text();

					importAction.import.libraries = [{
						name: 'Widget_' + importAction.import.widget,
						code: importAction.import.code
					}];

					updatedImports.push(importAction.import);
				}
				else {
					// If the mashup is not specified, the object is within the current mashup and doesn't require a request
					if (!importAction.import.mashup) {
						let objectName = importAction.import.object;
						
						let widgets = [TW.IDE.Workspace.Mashups.Current.rootWidget];

						while (widgets.length) {
							let widget = widgets[0];

							if (widget.properties.Type == 'BMCodeHost' || widget.properties.Type == 'BMTypescriptHost') {
								if (widget.properties.Title == importAction.import.object) {
									if (widget.properties.Scope === 'global') {
										importAction.import.code = widget.properties.Code;
									}
									else {
										importAction.import.code = widget.properties.Exports;
									}

									importAction.import.libraries = [{
										name: 'Mashup_' + (importAction.import.mashup || 'local') + '_' + importAction.import.object,
										code: importAction.import.code
									}];
			
									updatedImports.push(importAction.import);
									break;
								}
							}
							else {
								var subWidgets = widget.widgets;
								for (let i = 0; i < subWidgets.length; i++) {
									widgets.push(subWidgets[i]);
								}
							}

							widgets.shift();
						}
					}
					else {
						// For mashup imports, get the mashup contents then look for the required script
						let mashup = await fetch('/Thingworx/Mashups/' + importAction.import.mashup, {credentials: 'include', headers: {
							Accept: 'application/json',
							'X-XSRF-TOKEN': 'TWX-XSRF-TOKEN-VALUE'
						}});

						let content = await mashup.text();
						content = JSON.parse(content);
						content = JSON.parse(content.mashupContent);

						let exportables = [];
						findExportsInWidget(content.UI, exportables);

						exportables.forEach(exportable => {
							if (exportable.title === importAction.import.object) {
								if (exportable.scope === 'global') {
									importAction.import.code = exportable.code;
								}
								else {
									importAction.import.code = exportable.exports;
								}
							}
						});

						importAction.import.libraries = [{
							name: 'Mashup_' + importAction.import.mashup + '_' + importAction.import.object,
							code: importAction.import.code
						}];

						updatedImports.push(importAction.import);
					}
				}
			}
		}
		catch (error) {
			// Skip imports that could not be resolved
			console.log('Unable to load import:');
			console.error(error);
		}

		// Create the extra library and add it as an autocomplete library
		/*importsDTS = '';
		updatedImports.forEach(updatedImport => importsDTS += '\n' + (updatedImport.code || ''));*/

		// Add typing libraries if they don't exist
		try {
			updatedImports.forEach(updatedImport => {
				if (updatedImport.libraries) updatedImport.libraries.forEach(library => {
					if (!codeEditor.hasExternalLibraryNamed(library.name)) {
						codeEditor.addExternalLibraryNamed(library.name, {code: library.code});
					}
				});
			});
		}
		catch (e) {
			// Editor no longer exists
		}

		imports = updatedImports;

		if (codeEditor) {
			codeEditor.setImports(importsDTS);
		}

		// Resolve the current import operation
		resolve();

	}

	this.codeEditorContentsDidChange = function (codeEditor) {
		if (sourceTimeout) window.clearTimeout(sourceTimeout);
		sourceTimeout = window.setTimeout(updateNavigationSidebar, 500);
	};

	/**
	 * Creates a new string that replaces all double quotes in the given string with the HTML &quot; entity.
	 * @param string <String> The string.
	 * @return <String> A string.
	 */
	function CHStringByEscapingQuotesInString(string) {
		return string.replace('"', '&quot;');
	}

	/**
	 * Contains the user defined events.
	 */
	this.scriptEvents = { // <Object>
	};


	/**
	 * Contains the user defined services.
	 */
	this.scriptServices = { // <Object>
	};


	/**
	 * Invoked by the platform to retrieve the path to the widget's icon as it appears in the widgets list.
	 * @return <String>			The icon path.
	 */
	this.widgetIconUrl = function () {
    	return  "../Common/extensions/BMCodeHost/ui/BMCodeHost/images/Object@2x.png";
	}


	/**
	 * Invoked by the platform to retrieve the runtime properties this widget exposes.
	 * @return <Object>			The properties.
	 */
    this.widgetProperties = function () {
        var properties = {
            name: _BMCodeHostLanguageValues[language].name,
            description: _BMCodeHostLanguageValues[language].description,
			icon: 'images/Object@2x.png',
            category: ['Common'],
			supportsAutoResize: YES,
			isVisible: YES,
            properties: {
                Width: {
                    defaultValue: 128,
                    isEditable: YES
                },
                Height: {
                    defaultValue: 48,
                    isEditable: YES
                },
				Title: {
					baseType: 'STRING',
					defaultValue: _BMCodeHostLanguageValues[language].title,
					description: 'This script\'s title, which will appear in the browser\'s debug sources.'
				},
				Scope: {
					baseType: 'STRING',
					defaultValue: 'local',
					description: 'The scope in which this script be evaluated. Global is the global scope, local is the widget scope. Local scope is required to use properties, events and services.',
					selectOptions: [
						{text: 'Global', value: 'global'},
						{text: 'Local', value: 'local'}
					]
				},
				DirectLink: {
					baseType: 'BOOLEAN',
					defaultValue: NO,
					description: 'Requires the BMDebugger entities and extensions. If enabled, changes to this CSS widget will automatically update the mashup.'
				},
				DirectLinkUUID: {
					baseType: 'STRING',
					defaultValue: '',
					isVisible: NO
				},
				ScrollPosition: {
					baseType: 'NUMBER',
					isVisible: NO,
					defaultValue: 0,
					description: 'Hidden property used to remember the scroll position'
				},
				ColumnPosition: {
					baseType: 'NUMBER',
					isVisible: NO,
					defaultValue: 0,
					description: 'Hidden property used to remember the scroll position'
				},
				Code: {
					baseType: 'STRING',
					isVisible: NO,
					defaultValue: _BMCodeHostLanguageValues[language].code
				},
				// The runtime properties are user defined properties that may be bound and updated at runtime
				RuntimeProperties: {
					baseType: 'STRING',
					defaultValue: '[]',
					isVisible: NO
				},
				ShowDataLoading: {
					baseType: 'BOOLEAN',
					defaultValue: NO
				},
				FullScreen: {
					baseType: 'BOOLEAN',
					defaultValue: NO,
					isVisible: NO
				},
				Exports: {
					baseType: 'STRING',
					defaultValue: '',
					isVisible: NO
				},
				_Left: {
					baseType: 'NUMBER',
					isVisible: NO
				},
				_Top: {
					baseType: 'NUMBER',
					isVisible: NO
				},
				_Width: {
					baseType: 'NUMBER',
					isVisible: NO
				},
				_Height: {
					baseType: 'NUMBER',
					isVisible: NO
				},
				_NavigationWidth: {
					baseType: 'NUMBER',
					isVisible: NO
				},
				_PropertiesWidth: {
					baseType: 'NUMBER',
					isVisible: NO
				}
			}
        };
        
        if (language == BMCodeEditorLanguage.CSS) {
	        delete properties.properties.Scope;
	        delete properties.properties.RuntimeProperties;
		}
		else {
			delete properties.properties.DirectLink;
		}

		if (language == BMCodeEditorLanguage.Typescript) {
			properties.properties.TranspiledCode = {
				baseType: 'STRING',
				defaultValue: '',
				isVisible: NO
			}
		}
        
        return properties;
    };



	/**
	 * Invoked by the platform to retrieve the services this widget exposes.
	 * @return <Object>			The services.
	 */
	this.widgetServices = function () {
		return this.scriptServices;
	}


	/**
	 * Invoked by the platform to retrieve the events this widget exposes.
	 * @return <Object>			The events.
	 */
	this.widgetEvents = function() {
		return this.scriptEvents;
	}

	/**
	 * Invoked by the runtime when the widget has to be rendered. This function should provide the HTML contents of this widget.
	 * @return <String>				The widget's content as an HTML string.
	 */
    this.renderHtml = function () {
        var html = '<div class="widget-content BMCodeHost">\
        				<div class="BMCodeHostContainer">\
							<div class="BMCHScriptIcon"></div>\
							<div class="InlineBlock BMCHScriptEdit" >' + this.getProperty("Title") + extension + '</div>\
						</div>\
					</div>';

        return html;
    };

	this.hasProperty = function(name, properties) {

		for (var i = 0; i < properties.length; i++) {
			if (properties[i].name == name) return true;
		}

		return false;

	}

	this.removeProperty = function(name) {
		var scriptIO = this.allWidgetProperties();

		delete scriptIO.properties[name];
	}


	/**
	 * Invoked by the runtime immediately after this widget was placed in a mashup.
	 */
	this.afterLoad = function() {
		if (language !== BMCodeEditorLanguage.CSS) {
			this.loadProperties();
			this.updateRuntimeProperties();
		}
	}
	
	/**
	 * Invoked by the runtime whenever any property is edited.
	 * @param property <String>			The name of the property that was edited.
	 * @return <Boolean, nullable>		Defaults to NO. Should be YES if the widget should be redrawn after this property is updated, NO otherwise.
	 */
	this.afterSetProperty = function (property, value) {
		if (property == 'Title') return YES;
		if (property == 'Width') return YES;
		if (property == 'Height') return YES;
		if (property == 'Scope' && codeWindow) {
			codeWindow.dismissAnimated(NO);
			this.editScript(NO);
		}
	}
	
	/**
	 * Invoked by the platform to retrieve the data shape associated with an infotable property.
	 * @param propertyName <String>				The name of the property whose data shape should be returned.
	 * @return <String or Object, nullable>		The data shape field definitions object or a string identifying a data shape in the platform.
	 *											The return value may also be undefined if the data shape cannot be determined at design time.
	 */
	this.getSourceDatashapeName = function (propertyName) {
		var script = this;
		var properties = script.allWidgetProperties().properties;
		
		var property = properties[propertyName];
		
		if (property) {
			
			if (property._dataShapeType) {
				if (property._dataShapeType === 'literal') {
					return JSON.parse(property._dataShape);
				}
				else {
					return property._dataShape;
				}
			}
			
		}
		
	};


	/**
	 * Invoked by the runtime immediately after this widget's HTML content has been added to the document.
	 * At this point, the jqElement and boundingBox properties are available to use.
	 */
	this.afterRender = function () {
	
		self.jqElement.find('.BMCHScriptEdit').click(self.editScript.bind(self));

		if (language == BMCodeEditorLanguage.CSS && !self.getProperty('DirectLinkUUID')) {
			self.setProperty('DirectLinkUUID', 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			    return v.toString(16);
			}));
		}

		var toolbar = this.jqElement.closest('#mashup-ide-workspace-pane').find("#mashup-toolbar");
		var scriptButton = toolbar.find(".script-button");

		if (scriptButton.length == 0) {
			var groups = toolbar.find('.btn-group');

			groups.eq(groups.length - 1).after($('<div class="btn-group script-button">\
				<button type="button" class="btn btn-mini" title="Enter Showcase">\
					<i class="twicon-MashupScript" style="background-image: url(/Thingworx/Common/extensions/BMCodeHost/ui/BMCodeHost/images/Object@2x.png); background-size: 16px 16px;"></i>\
				</button>\
				</div>'));


			scriptButton = toolbar.find(".script-button");

			scriptButton.click(function () {
				return BMWindow.enterShowcase();

				document.body.style.backgroundColor = 'gray';
				document.querySelector('#tab-panel-mashup-ide-view').style.display = 'none';

				let center = BMWindowMakeWithFrame(BMRectMake(256, 0, document.body.offsetWidth - 512, document.body.offsetHeight - 256), {toolbar: YES, modal: NO});
				center.content.appendChild(document.querySelector("#flex-workspace"));
				center.content.classList.add('BMWindowMashupContent');
				center.node.classList.add('BMWindowMashup');

				let bottom = BMToolWindow.toolWindowWithFrame(BMRectMake(256, document.body.offsetHeight - 256, document.body.offsetWidth - 512, 256), {forWindow: center});
				bottom.content.appendChild(document.querySelector("#model-window"));
				bottom.content.classList.add('BMWindowMashupContent');
				//bottom.bringToFrontAnimated(YES);

				let leftWindow = BMToolWindow.toolWindowWithFrame(BMRectMake(0, 0, 256, document.body.offsetHeight), {forWindow: center});
				leftWindow.content.appendChild(document.querySelector("#leftDock"));
				leftWindow.content.classList.add('BMWindowMashupContent');
				//leftWindow.bringToFrontAnimated(YES);

				let rightWindow = BMToolWindow.toolWindowWithFrame(BMRectMake(document.body.offsetWidth - 256, 0, 256, document.body.offsetHeight), {forWindow: center});
				rightWindow.content.appendChild(document.querySelector("#rightDock"));
				rightWindow.content.classList.add('BMWindowMashupContent');
				rightWindow.content.classList.add('BMWindowMashupPropertyContent');
				//rightWindow.bringToFrontAnimated(YES);

				center.bringToFrontAnimated(YES);
			});

		}

	}

	// Represents the mashup's tab element
	let tab;

	// Contains the navigation filter text
	let filterText = '';
	
	/**
	 * Should be invoked to begin editing the code associated with this code host.
	 * This brings up the code editor window and sets up the available keyboard shortcuts.
	 */
	this.editScript = function (animated) {
		
		tab = $('.tab-navigate-command.entity-tab.active.selected');
		
		if (codeWindow) {
			codeWindow.becomeKeyWindow();
			return;
		}

		if (language == BMCodeEditorLanguage.Typescript && !window.monaco) {
			// Typescript requires monaco, fail if it isn't present
			return alert('Typescript requires the Monaco extension.');
		}
		
		var windowFrame = BMRectMakeWithOrigin(BMPointMake(
			this.getProperty('_Left') === undefined ? window.innerWidth * .05 | 0 : this.getProperty('_Left'),
			this.getProperty('_Top') === undefined ? window.innerHeight * .05 | 0 : this.getProperty('_Top')
		), {size: BMSizeMake(
			this.getProperty('_Width') === undefined ? window.innerWidth * .9 | 0 : this.getProperty('_Width'),
			this.getProperty('_Height') === undefined ? window.innerHeight * .9 | 0 : this.getProperty('_Height')
		)});
		
		codeWindow = BMWindowMakeWithFrame(windowFrame, {modal: NO});
		codeWindow.delegate = this;
		codeWindow.title = this.getProperty('Title');
		
		this.activateKeyboardShortcuts();
		
		if (self.getProperty('FullScreen')) {
			codeWindow.enterFullScreenAnimated(NO);
		}

		codeWindow.content.tabIndex = 0;
		
		codeWindow.content.innerHTML = `
		<div class="BMCHNavigationSidebar BMCHScrollbar">
			<div class="BMCHContentWrapper"></div>
		</div>
		<div class="CHCodeContainer BMCHCodeEditor` + (language == BMCodeEditorLanguage.CSS ? ` BMCHCSSCodeEditor` : ``) + `">
			<div class="BMCHContentWrapper"></div>` + (language !== BMCodeEditorLanguage.CSS ? `</div>
		<div class="BMCHPropertiesContainer BMCHScrollbar">
			<div class="BMCHContentWrapper"></div>
		</div>` : `</div>`);
		
		// Create the sidebar view and initialize its constraints
		let sidebar = BMView.viewForNode(codeWindow.content.querySelectorAll('.BMCHNavigationSidebar')[0]);
		codeWindow.addSubview(sidebar);
		codeWindow.height.greaterThanOrEqualTo(480).isActive = YES;
		sidebar.leading.equalTo(codeWindow.leading).isActive = YES;
		sidebar.top.equalTo(codeWindow.top).isActive = YES;
		sidebar.width.greaterThanOrEqualTo(196).isActive = YES;
		sidebar.bottom.equalTo(codeWindow.bottom).isActive = YES;

		// Create a layout guide to allow the sidebar to be resized
		let sidebarGuide = BMView.view.call(BMLayoutGuide);
		sidebarGuide.node.style.cursor = 'col-resize';
		codeWindow.addSubview(sidebarGuide);
		sidebarGuide.top.equalTo(codeWindow.top, {plus: 64}).isActive = YES;
		sidebarGuide.bottom.equalTo(codeWindow.bottom).isActive = YES;
		sidebarGuide.width.equalTo(10).isActive = YES;
		sidebarGuide.centerX.equalTo(sidebar.trailing).isActive = YES;
		sidebarGuide.initialPosition = BMPointMake((this.getProperty('_NavigationWidth') || 256) - 5, 0);


		// Only javascript and typescript support properties, services and events
		if (language !== BMCodeEditorLanguage.CSS) {		
			// Create and initialize the property collection
			propertiesCollection = BMCollectionView.collectionViewForNode(codeWindow.content.querySelectorAll('.BMCHPropertiesContainer > .BMCHContentWrapper')[0]);
			propertiesCollection.layout = new BMCollectionViewTableLayout();
			propertiesCollection.layout.rowHeight = 44;
			propertiesCollection.layout.showsHeaders = YES;
			propertiesCollection.layout.headerHeight = 44;
			propertiesCollection.layout.sectionInsets = BMInsetMake(0, 0, 0, 16);
			propertiesCollection.delegate = self;

			if (self.getProperty('Scope') == 'global') {
				//codeWindow.content.querySelectorAll('.BMCHPropertiesContainer')[0].style.display = 'none';
				codeWindow.content.querySelectorAll('.BMCHCodeEditor')[0].classList.add('BMCHCSSCodeEditor');
			}
		}
		
		// Create and initialize the sidebar navigation collection
		sidebarCollection = BMCollectionView.collectionViewForNode(codeWindow.content.querySelectorAll('.BMCHNavigationSidebar > .BMCHContentWrapper')[0], {customScroll: YES});
		sidebarCollection.identityComparator = function (o1, o2) {
			return o1.name == o2.name && o1.type == o2.type && o1.ordinal == o2.ordinal;
		};
		sidebarCollection.autoResizes = YES;
		sidebarCollection.layout = new BMCollectionViewTableLayout();
		sidebarCollection.layout.rowHeight = 22;
		sidebarCollection.layout.showsHeaders = NO;
		sidebarCollection.layout.showsFooters = NO;
		sidebarCollection.layout.sectionInsets = BMInsetMake(0, 0, 0, 16);
		sidebarCollection.delegate = sidebarDataSet;

		// Initialize the constraints for the sidebar collection
		sidebar.addSubview(sidebarCollection);
		sidebarCollection.leading.equalTo(sidebar.leading).isActive = YES;
		sidebarCollection.top.equalTo(sidebar.top, {plus: 104}).isActive = YES;
		sidebarCollection.width.equalTo(sidebar.width).isActive = YES;
		sidebarCollection.bottom.equalTo(sidebar.bottom).isActive = YES;

		let propertiesView = language !== BMCodeEditorLanguage.CSS ? BMView.viewForNode(codeWindow.content.querySelectorAll('.BMCHPropertiesContainer')[0]) : undefined;
		if (propertiesView) codeWindow.addSubview(propertiesView);

		// Create the sidebar search bar
		let searchBar = document.createElement('input');
		searchBar.className = 'BMCHInput BMCHSearchBar';
		searchBar.placeholder = 'Search sections';
		if (filterText) searchBar.value = filterText;
		let searchView = BMView.viewForNode(searchBar);
		sidebar.addSubview(searchView);
		searchView.leading.equalTo(sidebar.leading, {plus: 16}).isActive = YES;
		searchView.height.equalTo(32).isActive = YES;
		searchView.trailing.equalTo(sidebar.trailing, {plus: -16}).isActive = YES;
		searchView.bottom.equalTo(sidebarCollection.top, {plus: -16}).isActive = YES;

		let searchTimeout;
		searchBar.addEventListener('input', event => {
			filterText = searchBar.value;
			if (searchTimeout) window.clearTimeout(searchTimeout);
			searchTimeout = window.setTimeout(filterNavigationSidebar, 500);
		});

		// Create the code view and set up its constraints
		let codeView = BMView.viewForNode(codeWindow.content.querySelectorAll('.CHCodeContainer')[0]);
		codeWindow.addSubview(codeView);
		codeView.leading.equalTo(sidebar.trailing, {plus: 1}).isActive = YES;
		codeView.top.equalTo(codeWindow.top).isActive = YES;
		codeView.trailing.equalTo(language !== BMCodeEditorLanguage.CSS ? propertiesView.leading : codeWindow.trailing).isActive = YES;
		codeView.bottom.equalTo(codeWindow.bottom).isActive = YES;
		codeView.width.greaterThanOrEqualTo(416).isActive = YES;

		// Create the constraints for the properties view
		if (propertiesView) {
			propertiesView.top.equalTo(codeWindow.top).isActive = YES;
			propertiesView.trailing.equalTo(codeWindow.trailing).isActive = YES;
			propertiesView.bottom.equalTo(codeWindow.bottom).isActive = YES;
			this.propertiesViewWidth = propertiesView.width.greaterThanOrEqualTo(this.getProperty('Scope') == 'local' ? 196 : 0);
			this.propertiesViewWidth.isActive = YES;

			if (this.getProperty('Scope') == 'global') {
				propertiesView.width.equalTo(0).isActive = YES;
			}

			propertiesView.addSubview(propertiesCollection);
			propertiesCollection.leading.equalTo(propertiesView.leading).isActive = YES;
			propertiesCollection.trailing.equalTo(propertiesView.trailing).isActive = YES;
			propertiesCollection.top.equalTo(propertiesView.top, {plus: 64}).isActive = YES;
			propertiesCollection.bottom.equalTo(propertiesView.bottom).isActive = YES;

			
			// Create a layout guide to allow the properties sidebar to be resized
			let propertiesGuide = BMView.view.call(BMLayoutGuide);
			propertiesGuide.node.style.cursor = 'col-resize';
			propertiesGuide._horizontalConstraintAnchor = BMLayoutAttribute.Trailing;
			codeWindow.addSubview(propertiesGuide);
			propertiesGuide.top.equalTo(codeWindow.top, {plus: 64}).isActive = YES;
			propertiesGuide.bottom.equalTo(codeWindow.bottom).isActive = YES;
			propertiesGuide.width.equalTo(10).isActive = YES;
			propertiesGuide.centerX.equalTo(propertiesView.leading).isActive = YES;
			propertiesGuide.initialPosition = BMPointMake(-(this.getProperty('_PropertiesWidth') || 344) + 5, 0);
		}

		
		// Create and initialize the script title text box
		var title = document.createElement('input');
		title.type = 'text';
		title.className = 'BMCHInput BMCHScriptTitle';
		title.value = self.getProperty('Title');
		$(title).on('keypress', function (event) {
			var keyCode = event.which || event.keyCode;
			
			if (keyCode == 13) {
				codeEditor.acquireFocus();
			}
		});
		codeWindow.toolbar.appendChild(title);

		codeView.didSetFrame = frame => {
			title.style.left = frame.origin.x + 4 + 'px';
			codeEditor.resized();
		}
		
		if (!('backdropFilter' in document.body.style) && !('webkitBackdropFilter' in document.body.style)) {
			codeWindow.content.querySelectorAll('.BMCHNavigationSidebar')[0].classList.add('BMCHNavigationSidebarCompatibility');
			/*$('#twStudioBody, #twStudioHeader').velocity({
				blur: '15px'
			}, {
				duration: '300px',
				easing: 'easeOutQuad'
			});*/
		}
		
		title.addEventListener('change', function (event) {
			self.setProperty('Title', title.value);
			self.jqElement.find('.ScriptEdit').text(title.value + extension);
			codeWindow.title = title.value;
		});
		
		// Create and initialize the save button
		codeWindow.BMCHSaveButton = self.createToolbarButtonWithClass('BMCHSaveButton', {content: '<i class="material-icons">&#xE161;</i>', tooltip: 'Save - ⌘S', action: function (event) {
			self.saveMashup();
			codeEditor.acquireFocus();
			event.stopPropagation();
			event.preventDefault();
		}});
		
		// Create and initialize the bindings button
		codeWindow.BMCHBindingsButton = self.createToolbarButtonWithClass('BMCHBindingsButton', {content: '<i class="material-icons">&#xE80D;</i>', tooltip: 'Bindings - ⌘B', action: function () {
			self.openBindings();
		}});
		
		// Open button
		codeWindow.BMCHViewButton = self.createToolbarButtonWithClass('BMCHViewButton', {content: '<i class="material-icons">&#xE89D;</i>', tooltip: 'View Mashup - ⌘V', action: function () {
			self.openMashup();
		}});
		
		// Full screen button
		self.createToolbarButtonWithClass('BMCHFullScreenButton', {content: '<i class="material-icons">add</i>', tooltip: 'Full screen', action: function () {
			self.toggleFullScreen();
		}});
		
		// Minimize button
		self.createToolbarButtonWithClass('BMCHMinimizeButton', {content: '<i class="material-icons">remove</i>', tooltip: 'Minimize', action: function (event) {
			if (event.altKey) {
				BMWindow.minimizeAllAnimated(YES);
			}
			else {
				codeWindow.minimizeAnimated(YES);
			}
		}});
		
		// Close button
		codeWindow.BMCHCloseButton = self.createToolbarButtonWithClass('BMCHCloseButton', {content: '<i class="material-icons">&#xE5CD;</i>', tooltip: 'Close - ⎋', action: function () {
			codeWindow.dismissAnimated(YES, {toNode: self.jqElement[0]});
		}});
		
		//if (codeWindow.isFullScreen) {
			codeWindow.BMCHCloseButton.classList.add('BMCHFullScreen');
			codeWindow.BMCHSaveButton.classList.add('BMCHFullScreen');
			codeWindow.BMCHBindingsButton.classList.add('BMCHFullScreen');
			codeWindow.BMCHViewButton.classList.add('BMCHFullScreen');
		//}
		
		$(codeWindow.content).on('keydown keypress keyup', function (event) {
			var keyCode = event.which || event.keyCode;
			
			if (keyCode == 32) {
				event.stopPropagation();
			}
			
			if ((event.ctrlKey || event.metaKey) && (keyCode == 38 || keyCode == 40)) {
				event.stopPropagation();
				event.preventDefault();
			}
		});
		
		codeWindow.anchorNode = self.jqElement[0];

		codeWindow.bringToFrontAnimated(animated === undefined ? YES : animated, {fromNode: self.jqElement[0], completionHandler: function () {
				
			if (window.monaco) {
				codeEditor = BMMonacoCodeEditorMakeWithContainer(codeWindow.content.querySelectorAll('.CHCodeContainer > .BMCHContentWrapper')[0], {code: self.getProperty('Code'), language: language});

				if (!window.BMCHDidLoadSnippets) {
					BMCHLoadSnippets();
				}
			}
			else {
				codeEditor = BMCodeMirrorCodeEditorMakeWithContainer(codeWindow.content.querySelectorAll('.CHCodeContainer > .BMCHContentWrapper')[0], {code: self.getProperty('Code'), language: language});
			}
			codeEditor.delegate = self;
		
			if (codeEditor.supportsExtensibleAutocomplete && language !== BMCodeEditorLanguage.CSS) {
				if (!BMCHRootES6Library) {
					BMCodeHostLoadRootLibrariesWithCompletionHandler(function () {
						if (!codeEditor) return;
						
						codeEditor.setBuiltinES6Library(BMCHRootES6Library, {jQueryLibrary: BMCHRootjQueryLibrary, additionalLibraries: [BMCHCoreUILibrary, BMCHTWXLibrary]});
					});
				}
				else {
					codeEditor.setBuiltinES6Library(BMCHRootES6Library, {jQueryLibrary: BMCHRootjQueryLibrary, additionalLibraries: [BMCHCoreUILibrary, BMCHTWXLibrary]});
				}

				if (importsDTS) {
					codeEditor.setImports(importsDTS);
				}
			}
		
			//codeEditor.resized();
			
			updateNavigationSidebar();
			
			codeEditor.cursorPosition = BMPointMake(self.getProperty('ColumnPosition'), self.getProperty('ScrollPosition'));
			sidebarCollection.dataSet = sidebarDataSet;
			
			if (language !== BMCodeEditorLanguage.CSS) {
				propertiesCollection.dataSet = self;
				self.buildAutocompleteDefinition();
			}
			
			codeEditor.acquireFocus();
		}});

			
		title.style.left = codeView.frame.origin.x + 4 + 'px';
		
	};

	this.windowWillMinimize = function () {
		if (!TW.minimizeStripCreated) {
			TW.minimizeStripCreated = YES;
			document.getElementById('twStudioBody').style.height = 'calc(100% - 36px)';

			let strip = document.createElement('div');
			strip.className = 'BMCHMinimizeStrip';
			document.body.appendChild(strip);

			$(window).resize();
		}
	}

	this.windowDidRestore = function () {
		if (!BMWindow._minimizedWindows.length) {
			TW.minimizeStripCreated = NO;
			document.getElementById('twStudioBody').style.height = '100%';

			document.querySelector('.BMCHMinimizeStrip').remove();

			$(window).resize();
		}
	}
	
	/**
	 * Constructs and returns a toolbar button DOM node. This node will not be added to the document automatically.
	 * @param className <String>			A list of class names that should be assigned to the button.
	 * {
	 * 	@param content <String>				The HTML content that this button should contain.
	 * 	@param action <void ^ (Event)>		An callback function that will be invoked whenever this button is clicked.
	 * 	@param tooltip <String, nullable>	If specified, this represent a tooltip text that appears when hovering over the button.
	 * }
	 * @return <DOMNode>					The button that was created.
	 */
	this.createToolbarButtonWithClass = function (className, args) {
		var button = document.createElement('div');
		button.className = 'BMCHToolbarButton ' + className;
		button.innerHTML = args.content;
		codeWindow.toolbar.appendChild(button);
		button.addEventListener('click', args.action);

		if (args.tooltip) {
			button.classList.add('BMHasTooltip');
			button.classList.add('BMTooltipPositionBottom');
			button.setAttribute('data-bm-tooltip', args.tooltip);
		}

		return button;
	}
	
	// @override - BMWindowDelegate
	this.DOMNodeForDismissedWindow = function (window) {
		return self.jqElement[0];
	}
	
	// @override - BMWindowDelegate
	this.windowWillClose = function (window) {
		this.setProperty('_Left', window.frame.origin.x);
		this.setProperty('_Top', window.frame.origin.y);
		this.setProperty('_Width', window.frame.size.width);
		this.setProperty('_Height', window.frame.size.height);
		this.setProperty('_NavigationWidth', sidebarCollection.frame.size.width);
		if (propertiesCollection) this.setProperty('_PropertiesWidth', propertiesCollection.frame.size.width);
		
		// Flatten the collection views to improve animation performance
		sidebarCollection.flatten();
		if (propertiesCollection) propertiesCollection.flatten();
		
		if (!('backdropFilter' in document.body.style) && !('webkitBackdropFilter' in document.body.style)) {
			/*$('#twStudioBody, #twStudioHeader').velocity({
				blur: '0px'
			}, {
				duration: '300px',
				easing: 'easeOutQuad'
			});*/
		}

		if (codeEditor.requiresTranspilation) (async function() {
			let transpiledCode = await codeEditor.transpiledCode();
			self.setProperty('TranspiledCode', transpiledCode);
		})();
		
		this.setProperty('Code', codeEditor.code);
		
		var cursorPosition = codeEditor.cursorPosition;
		this.setProperty('ScrollPosition', cursorPosition.y);
		this.setProperty('ColumnPosition', cursorPosition.x);
		
		this.deactivateKeyboardShortcuts();
		if (language !== BMCodeEditorLanguage.CSS) this.updateRuntimeProperties();
		
		codeWindow.BMCHCodeEditor = codeEditor;
		
		codeWindow = undefined;
		codeEditor = undefined;
		
		return YES;	
	};
	
	/**
	 * Should be invoked to save the currently open mashup.
	 */
	this.saveMashup = async function () {
		if (codeEditor.requiresTranspilation) {
			let transpiledCode = await codeEditor.transpiledCode();
			this.setProperty('TranspiledCode', transpiledCode);
		}

		this.setProperty('Code', codeEditor.code);
		if (language !== BMCodeEditorLanguage.CSS) this.updateRuntimeProperties();

		// Switch back to this editor's mashup before saving
		tab.click();
		
		$('.tab-panel-selected').find('.btn-save-continue-edit.btn.btn-primary').click();
		codeEditor.acquireFocus();
	};
	
	/**
	 * Shoud be invoked to open the bindings window for the currently selected widget.
	 */
	this.openBindings = function () {
		if (language !== BMCodeEditorLanguage.CSS) self.updateRuntimeProperties();

		// Switch back to this editor's mashup and select the widget before opening the bindings
		tab.click();
		self.jqElement.click();
		
		self.jqElement.closest('#mashup-ide').find('#widget-properties-tabs').find('#open-configure-dialog').click();
	};
	
	/**
	 * Should be invoked to view the currently open mashup in a new tab or window.
	 * The mashup will be shown without the usual debug toolbar.
	 */
	this.openMashup = function () {

		// Switch back to this editor's mashup before opening
		tab.click();

		var mashupName = $('.tab-navigate-command.entity-tab.active.selected').find('.tab-title').text();
		window.open('/Thingworx/Mashups/' + mashupName, '_blank');
	};

	this.windowDidResize = function () {
		codeEditor.resized();
		sidebarCollection.resized();
		
		if (propertiesCollection) propertiesCollection.resized();
	}
	
	/**
	 * Should be invoked to cause the code editor window to go full screen.
	 */
	this.toggleFullScreen = function () {
		var completeCallback = function () {
			if (codeWindow) {
				codeEditor.resized();
				sidebarCollection.resized();
				
				if (propertiesCollection) propertiesCollection.resized();
			}
		};
		
		if (codeWindow.isFullScreen) {
			codeWindow.exitFullScreenAnimated(YES, {completionHandler: completeCallback});
			/*codeWindow.BMCHCloseButton.classList.remove('BMCHFullScreen');
			codeWindow.BMCHSaveButton.classList.remove('BMCHFullScreen');
			codeWindow.BMCHBindingsButton.classList.remove('BMCHFullScreen');
			codeWindow.BMCHViewButton.classList.remove('BMCHFullScreen');*/
		}
		else {
			codeWindow.enterFullScreenAnimated(YES, {completionHandler: completeCallback});
			/*codeWindow.BMCHCloseButton.classList.add('BMCHFullScreen');
			codeWindow.BMCHSaveButton.classList.add('BMCHFullScreen');
			codeWindow.BMCHBindingsButton.classList.add('BMCHFullScreen');
			codeWindow.BMCHViewButton.classList.add('BMCHFullScreen');*/
		}
		
		self.setProperty('FullScreen', codeWindow.isFullScreen);
	}
	
	// @override - BMWindowDelegate
	this.windowDidClose = function (window) {
		window.BMCHCodeEditor.release();
		window.release();
		if (language !== BMCodeEditorLanguage.CSS) propertiesCollection.release();
		sidebarCollection.release();
		
		propertiesCollection = undefined;
		sidebarCollection = undefined;
		
		codeHosts = undefined;

		this.propertiesViewWidth = undefined;
	};

	// @override - BMWindowDelegate
	this.windowDidBecomeKeyWindow = function () {
		this.activateKeyboardShortcuts();
	};

	// @override - BMWindowDelegate
	this.windowDidResignKeyWindow = function () {
		if (language !== BMCodeEditorLanguage.CSS) this.updateRuntimeProperties();
		this.deactivateKeyboardShortcuts();
	}
	
	/**
	 * Invoked automatically when the code editor window is created.
	 * Sets up the listeners for the available keyboard shortcuts and the window resize event.
	 */
	this.activateKeyboardShortcuts = function () {
		var self = this;
		$(codeWindow.content).on('keydown.BMCodeHost', function (event) {

			var code = event.which || event.keyCode;

			// ⎋ action
			if (code == 27) {
				if (document.activeElement) {
					// If an editable element is focused, remove its focus and move it to code editor
					if (document.activeElement.tagName.toUpperCase() == 'TEXTAREA' || document.activeElement.tagName.toUpperCase() == 'INPUT') {
						document.activeElement.blur();
						codeWindow.content.focus();
						event.preventDefault();
						event.stopPropagation();
						return;
					}
					else {
						// Otherwise close the code editor
						codeWindow.dismissAnimated(YES, {toNode: self.jqElement[0]});
						event.preventDefault();
						event.stopPropagation();
						return;
					}
				}
			}
			
			if (!event.ctrlKey && !event.metaKey) return;

			var eventHandled = NO;

			let activeElement = document.activeElement;
			
			if (code == 222) {
				eventHandled = YES;
				self.isTabbing = YES;
				self.tabToNextCodeHost();
			}
			
			if (code == 186) {
				eventHandled = YES;
				self.isTabbing = YES;
				self.tabToPreviousCodeHost();
			}
			
			if (self.isTabbing) {
				event.stopPropagation();
				event.preventDefault();
				return;
			}
			
			if (language !== BMCodeEditorLanguage.CSS) {
				if (code == 49 && event.shiftKey) {
					eventHandled = YES;
					self.addPropertyOfType(0);
				}
				
				if (code == 50 && event.shiftKey) {
					eventHandled = YES;
					self.addPropertyOfType(1);
				}
				
				if (code == 51 && event.shiftKey) {
					eventHandled = YES;
					self.addPropertyOfType(2);
				}
			}
			
			if (code == 83) {
				eventHandled = YES;
				self.saveMashup();
			}
			
			if (code == 66) {
				eventHandled = YES;
				self.openBindings();
			}
			
			if (code == 80) {
				eventHandled = YES;
				self.openMashup();
			}
			
			if (eventHandled) {
				event.preventDefault();
				event.stopPropagation();

				// Some of these events steal focus so it should be returned back to the previous active element
				if (activeElement) activeElement.focus();
			}
			
		});
		
		$(window).on('keyup.BMCodeHost', function (event) {
			if (!self.isTabbing) return;
			
			var code = event.which || event.keyCode;
			
			if (code == 17 || code == 91 || code == 18 || code == 93) {
				self.isTabbing = NO;
				self.commitCmdTab();
				event.stopPropagation();
				event.preventDefault();
			}
		});
		
		$(window).on('resize.BMCodeHost', function (event) {
			/*codeWindow.frame = BMRectMakeWithOrigin(BMPointMake(
					window.innerWidth * .05 | 0,
					window.innerHeight * .05 | 0
				), {size: BMSizeMake(
					window.innerWidth * .9 | 0,
					window.innerHeight * .9 | 0
				)});
				
			codeEditor.resized();*/
		});
	};
	
	/**
	 * Invoked automatically when the code editor window is closed.
	 * Clears all listeners registered by activateKeyboardShortcuts.
	 */
	this.deactivateKeyboardShortcuts = function () {
		$(codeWindow.content).off('keydown.BMCodeHost');
		$(window).off('resize.BMCodeHost');
		$(window).off('keyup.BMCodeHost');
	};

	this.beforeDestroy = function () {
		if (codeWindow) {
			codeWindow.dismissAnimated(NO);
		}
	}
	
/*
****************************************************************************************************************************************************************
																Cmd-Tab Controller
****************************************************************************************************************************************************************
*/

	/**
	 * The cmd tab controller manages switching between scripts and styles using keyboard shortcuts.
	 * Despite its name, the controller itself does not actually register any keyboard shortcuts, but instead is responsible for
	 * creating the on-screen list of code hosts, navigating between them and switching to a different code host.
	 *
	 * Its methods should generally be invoked in response to keyboard shortcuts.
	 *
	 * Constructing a cmd tab controller will cause its window to automatically become visible on the screen.
	 *
	 * @return <BMCHCmdTabController>		A cmd tab controller.
	 */
	function BMCHCmdTabController () { // <constructor>
		
		// Retain the list of available code hosts
		this.codeHosts = codeHosts;
	
		// Build the window that will show the available code hosts
		var cmdTabFrame = BMRectMake(0, 0, 384, codeHosts.length * 44);
		cmdTabFrame.center = BMPointMake(window.innerWidth / 2, window.innerHeight / 2);
	
		var cmdTabWindow = new BMWindow().initWithFrame(cmdTabFrame, {toolbar: NO});
		cmdTabWindow.delegate = this;
		
		// Create the contents, which is an empty container for a collection view
		var content = window.document.createElement('div');
		content.className = 'BMCHCmdTabView';
		
		cmdTabWindow.content.appendChild(content);
		
		// Create the collection view that manages the on-screen list of code hosts
		var collectionView = BMCollectionViewMakeWithContainer($(content));
		
		this.collectionView = collectionView;
		collectionView.layout = new BMCollectionViewTableLayout();
		collectionView.layout.rowHeight = 44;
		collectionView.delegate = this;
		
		// Automatically select the current code host
		codeHosts.forEach(function (codeHost, index) {
			if (codeHost.widget == self) collectionView.selectedIndexPaths = [BMIndexPathMakeWithRow(index, {section: 0, forObject: codeHost})];
		});
		
		// Make the window visible
		var controller = this;
		cmdTabWindow.bringToFrontAnimated(YES, {completionHandler: function () {
			collectionView.resized();
		}});
		setTimeout(function () {
			collectionView.dataSet = controller;
			document.activeElement.blur();
		}, 0);
		
		/**
		 * Should be invoked to dismiss this cmd tab controller.
		 * Invoking this method does not cause the currently selected code host to become active.
		 */
		this.dismiss = function () {
			cmdTabWindow.dismissAnimated(YES);
		};
		
	}
	
	BMCHCmdTabController.prototype = {
		// @override - BMCollectionViewDataSet
		numberOfSections: function () { return 1; },
		// @override - BMCollectionViewDataSet
		numberOfObjectsInSectionAtIndex: function (index) { return this.codeHosts.length; },
		// @override - BMCollectionViewDataSet
		indexPathForObjectAtRow: function (row, args) {
			return BMIndexPathMakeWithRow(row, {section: 0, forObject: this.codeHosts[row]});
		},
		// @override - BMCollectionViewDataSet
		indexPathForObject: function () {
			// Unused because the cmd-tab controller never invalidates its data or layout
		},
		// @override - BMCollectionViewDataSet
		contentsForCellWithReuseIdentifier: function (identifier) {
			return $('<div class="BMCHCmdTabItem"></div>');
		},
		// @override - BMCollectionViewDataSet
		cellForItemAtIndexPath: function (indexPath) {
			var cell = this.collectionView.dequeueCellForReuseIdentifier('BMCHCmdTabItem');
			this.updateCell(cell, {atIndexPath: indexPath});
			return cell;
		},
		// @override - BMCollectionViewDataSet
		updateCell: function (cell, args) {
			$(cell.node).find('.BMCHCmdTabItem').text(args.atIndexPath.object.name);
			
			if (this.collectionView.isCellAtIndexPathSelected(args.atIndexPath)) {
				$(cell.node).addClass('BMCHCmdTabItemSelected');
			}
			else {
				$(cell.node).removeClass('BMCHCmdTabItemSelected');
			}
		},
		// @override - BMCollectionViewDelegate
		collectionViewDidSelectCellAtIndexPath: function (collectionView, indexPath) {
			var cell = collectionView.cellAtIndexPath(indexPath, {ofType: BMCellAttributesType.Cell});
			
			if (cell) {
				$(cell.node).addClass('BMCHCmdTabItemSelected');
			}
		},
		// @override - BMCollectionViewDelegate
		collectionViewDidDeselectCellAtIndexPath: function (collectionView, indexPath) {
			var cell = collectionView.cellAtIndexPath(indexPath, {ofType: BMCellAttributesType.Cell});
			
			if (cell) {
				$(cell.node).removeClass('BMCHCmdTabItemSelected');
			}
		},
		// @override - BMCollectionViewDelegate
		collectionViewCellWasClicked: function (collectionView, cell) {
			collectionView.selectedIndexPaths = [cell.indexPath];
			self.commitCmdTab();
			
			return YES;
		},
		// @override - BMWindowDelegate
		windowDidClose: function (window) {
			this.collectionView.release();
			window.release();
		},
		// @override - BMWindowDelegate
		windowShouldClose: function (window) {
			return NO;
		},
		/**
		 * Should be invoked to select the next code host in the list.
		 * If the currently selected code host is the last one, this method will select the first code host.
		 */
		nextCodeHost: function () {
			var indexPath = this.collectionView.selectedIndexPaths[0].copy();
			
			indexPath.row++;
			
			if (indexPath.row >= this.numberOfObjectsInSectionAtIndex(0)) {
				indexPath.row = 0;
			}
			
			indexPath.object = codeHosts[indexPath.row];
			
			this.collectionView.selectedIndexPaths = [indexPath];
		},
		/**
		 * Should be invoked to select the previous code host in the list.
		 * If the currently selected code host is the first one, this method will select the last code host.
		 */
		previousCodeHost: function () {
			var indexPath = this.collectionView.selectedIndexPaths[0].copy();
			
			indexPath.row--;
			
			if (indexPath.row < 0) {
				indexPath.row = this.numberOfObjectsInSectionAtIndex(0) - 1;
			}
			
			indexPath.object = codeHosts[indexPath.row];
			
			this.collectionView.selectedIndexPaths = [indexPath];
		}
	};
	
	var cmdTabController; // <BMCHCmdTabController>
	
	/**
	 * Constructs a cmd tab controller.
	 * The controller will be assigned to the cmdTabController variable.
	 */
	this.initCmdTabController = function () {
		cmdTabController = new BMCHCmdTabController();
	};
	
	/**
	 * Finds and constructs a list of available code hosts in the current mashup.
	 * The code host list will be asigned to the codeHosts variable.
	 */
	this.initCodeHosts = function () {
		var codeHostWidgets = [];
		
		function BMFindCodeHostsRecursive(container) {
	
			var widgets = container.widgets;
			var length = widgets.length;
			
			for (var i = 0; i < length; i++) {
				var widget = widgets[i];
				
				if (widget.properties.Type == 'BMCodeHost' || widget.properties.Type == 'BMCSSHost' || widget.properties.Type == 'BMTypescriptHost') codeHostWidgets.push(widget);
				
				var subWidgets = widget.widgets;
				if (subWidgets.length > 0) {
					BMFindCodeHostsRecursive(widget);
				}
				
			}
			
		}
		
		function BMGetRootWidgetFromWidget(widget) {
			var rootWidget = widget;
			while (rootWidget) {
				rootWidget = widget.parentWidget;
				
				widget = rootWidget || widget;
			}
			
			return widget;
		}
		
		BMFindCodeHostsRecursive(BMGetRootWidgetFromWidget(this));
		
		codeHosts = [];
		
		codeHostWidgets.forEach(function (widget) {
			codeHosts.push({
				name: widget.properties.Title + '.' + (widget.properties.Type == 'BMCodeHost' ? 'js' : 'css'),
				widget: widget
			});
		});
	};
	
	/**
	 * Should be invoked to select the next code host.
	 * If the list of available code hosts is not initialized when this method is invoked, it will be initialized before attempting to change the selection.
	 * Similarly, if no cmd tab controller exists, one will be created.
	 */
	this.tabToNextCodeHost = function () {
		if (!codeHosts) this.initCodeHosts();
		if (!cmdTabController) {
			this.initCmdTabController();
		}
		cmdTabController.nextCodeHost();
	};
	
	
	/**
	 * Should be invoked to select the previous code host.
	 * If the list of available code hosts is not initialized when this method is invoked, it will be initialized before attempting to change the selection.
	 * Similarly, if no cmd tab controller exists, one will be created.
	 */
	this.tabToPreviousCodeHost = function () {
		if (!codeHosts) this.initCodeHosts();
		if (!cmdTabController) {
			this.initCmdTabController();
		}
		cmdTabController.previousCodeHost();
	};
	
	/**
	 * Should be invoked to switch to the currently selected code host in the cmd tab controller.
	 * If that code host is this instance, nothing happens.
	 *
	 * Invoking this method will cause the current cmd tab controller to be dismissed.
	 */
	this.commitCmdTab = function () {
		this.isTabbing = NO;
		
		// Retrieve the code host instance corresponding to the current selection
		var codeHost = cmdTabController.collectionView.selectedIndexPaths[0].object;
		
		if (codeHost.widget != this) {
			// If it is different from this instance, dismiss this instance, then begin editing the selected one after the animation ends
			codeWindow.dismissAnimated(YES, {toNode: this.jqElement[0], completionHandler: function () {
				codeHost.widget.editScript();
			}});
		}
		
		cmdTabController.dismiss();
		cmdTabController = undefined;
		
	};
	
/*
****************************************************************************************************************************************************************
																Properties Collection
****************************************************************************************************************************************************************
*/
	
	// CSS does not support properties, so the remaining code should not be executed for that language
	if (language == BMCodeEditorLanguage.CSS) return this;
	
	var propertySections = [properties, services, events];
	var propertySectionNames = ['Properties', 'Services', 'Events'];
	var propertySectionTypes = ['property', 'service', 'event'];
	
	var oldPropertySections;
	var newPropertySections;
	
	/**
	 * Constructs the section-based list of properties, services and events from the stored serialized representation.
	 * This will move each property definition into its corresponding array based on its type.
	 */
	this.loadProperties = function () {
		var runtimeProperties = JSON.parse(this.getProperty('RuntimeProperties'));
		
		runtimeProperties.forEach(function (property) {
			if (property.type == 'property') {
				properties.push(property);
			}	
			else if (property.type == 'service') {
				services.push(property);
			}
			else if (property.type == 'event') {
				events.push(property);
			}
		});
	};
	
	/**
	 * Should be invoked to update the stored serialized representation of user defined properties and update the widget model
	 * to use the new properties.
	 * This will remove all previous properties that are no longer defined. It will also remove all bindings to and from those properties.
	 */
	this.updateRuntimeProperties = function () {
		// Build a flat array with all the properties so its easier to iterate
		var runtimeProperties = properties.concat(services).concat(events);
		
		// Attempt to load the previously defined properties, so the ones that no longer exist can be removed
		var previousProperties;
		try { previousProperties = JSON.parse(self.getProperty('RuntimeProperties')); } catch (e) {}
		
		// Update the serialized representaiton
		self.setProperty('RuntimeProperties', JSON.stringify(runtimeProperties));
		
		var scriptIO = self.allWidgetProperties();

		self.scriptServices = {
		};

		// Remove the properties that no longer exist
		if (previousProperties) {
			for (var i = 0; i < previousProperties.length; i++) {
				if (!self.hasProperty(previousProperties[i].name, runtimeProperties)) {
					self.removeProperty(previousProperties[i].name);

					// Remove any bindings to and from this property
					this.removeBindingsFromPropertyAsTarget(previousProperties[i].name);
					this.removeBindingsFromPropertyAsSource(previousProperties[i].name);
				}
			}
		}

		// Add all new properties
		for (var i = 0; i < runtimeProperties.length; i++) {
			if (runtimeProperties[i].type == "property") {
				
				// The data shape is only used for infotables and actually handled later
				var dataShape = runtimeProperties[i].dataShape;
				
				// Build the definition for the current property
				// All user-defined properties are both binding targets and sources
				// Additionally, for boolean properties, the composer will complain if no default value is set
				// so for those data types, the default value will be set to NO
				var propertyDefinition = {
					baseType: runtimeProperties[i].dataType,
					defaultValue: runtimeProperties[i].dataType === 'BOOLEAN' ? false : undefined,
					isBaseProperty: false,
					isVisible: true,
					name: runtimeProperties[i].name,
					type: "property",
					isBindingTarget: true,
					isBindingSource: true
				};
				
				if (dataShape) {
					// If the data shape is defined, it may be in one of two forms:
					// Either a simplified object, which will be converted to a proper data shape
					// or a string which represents a reference to a data shape that already exists in the thing model.
					
					// In either case, the data shape is only saved as a non-standard extension to the property definition model
					// The data shape itself is only retrieved by the platform through the getSourceDataShapeName method.
					if (typeof dataShape === 'object') {
						// For object data shapes, convert the simplified representation to a proper data shape
						var fieldDefinitions = {};
						
						for (var key in dataShape) {
							fieldDefinitions[key] = {
								name: key,
								baseType: dataShape[key]
							};
						}
						
						dataShape = JSON.stringify(fieldDefinitions);
						
						propertyDefinition._dataShape = dataShape;
						propertyDefinition._dataShapeType = 'literal';
					}
					else if (typeof dataShape === 'string') {
						propertyDefinition._dataShape = dataShape;
						propertyDefinition._dataShapeType = 'reference';
					}
				}

				scriptIO.properties[runtimeProperties[i].name] = propertyDefinition;

			}
			// For services and events, the definition is much simpler and is identicial other than a differing type
			else if (runtimeProperties[i].type == "event") {

				scriptIO.properties[runtimeProperties[i].name] = {
					isBaseProperty: false,
					isVisible: true,
					name: runtimeProperties[i].name,
					type: "event"
				};
			}
			else if (runtimeProperties[i].type == 'service') {

				scriptIO.properties[runtimeProperties[i].name] = {
					isBaseProperty: false,
					isVisible: true,
					name: runtimeProperties[i].name,
					type: "service"
				};

				self.scriptServices[runtimeProperties[i].name] = {};
			}

		}

		// Inform the platform that properties were changed and it should update the property table
		self.updatedProperties({updateUi: true});
	};
	
	/**
	 * Should be invoked when the base type of a property is changed through the editor.
	 * Updates the internal property model and schedules a rebuild of the autocomplete definitions.
	 * @param indexPath <BMIndexPath>		The index path of the changed property.
	 * {
	 *	@param to <String>					The new base type.
	 *	@param dataShape <String, nullable>	Defaults to nothing. The data shape.
	 * }
	 */
	this.setBaseTypeOfPropertyAtIndexPath = function (indexPath, args) {
		var type = args.to;
		
		propertySections[indexPath.section][indexPath.row].dataType = type;
		propertySections[indexPath.section][indexPath.row].dataShape = args.dataShape;
		
		self.updateAutocompleteDefinition();
	};
	
	
	/**
	 * Should be invoked when the name of a property is changed through the editor.
	 * Updates the internal property model and schedules a rebuild of the autocomplete definitions.
	 * @param indexPath <BMIndexPath>		The index path of the changed property.
	 * {
	 *	@param to <String>					The new name.
	 * }
	 */
	this.renamePropertyAtIndexPath = function (indexPath, args) {
		var newName = args.to;
		
		propertySections[indexPath.section][indexPath.row].name = newName;
		
		self.updateAutocompleteDefinition();
	};
	
	
	/**
	 * Should be invoked to begin adding a property using the editor.
	 * Creates an empty property in the approperiate array based on its type and updates the properties collection view.
	 * If the collection view is running an animated data change when this method is invoked, it will have no effect.
	 * @param type <String>		The index path of the changed property.
	 */
	this.addPropertyOfType = function (type) {
		if (propertiesCollection.isUpdatingData) return;
		
		// Prepare for the animated update by cloning the current property configuration
		oldPropertySections = [properties.slice(), services.slice(), events.slice()];
		newPropertySections = propertySections;
		
		propertySections[type].push({
			name: '',
			dataType: 'STRING',
			type: propertySectionTypes[type]
		});
		
		propertiesCollection.updateEntireDataAnimated(YES, {completionHandler: function () {
			// After the animation finishes, focus the new property's name
			var newPropertyIndexPath = self.indexPathForObjectAtRow(propertySections[type].length - 1, {inSectionAtIndex: type});
			var newPropertyCell = propertiesCollection.cellAtIndexPath(newPropertyIndexPath, {ofType: BMCellAttributesType.Cell});

			const visibleArea = propertiesCollection.frame.copy();
			visibleArea.origin.y = propertiesCollection.scrollOffset.y;
			
			if (newPropertyCell) {
				$(newPropertyCell.node).find('.BMCHPropertyName').focus();

				if (!newPropertyCell.frame.intersectsRect(visibleArea)) propertiesCollection.scrollToCellAtIndexPath(newPropertyIndexPath, {animated: YES});
			}
			else {
				// If the newly created property is not in view, its cell must be created before it can be focused
				newPropertyCell = propertiesCollection.retainCellForIndexPath(newPropertyIndexPath);
				$(newPropertyCell.node).find('.BMCHPropertyName').focus();
				
				// Because any input acquiring focus will cause its owning cell to be retained, the cell may be released from here
				newPropertyCell.release();

				if (!newPropertyCell.frame.intersectsRect(visibleArea)) propertiesCollection.scrollToCellAtIndexPath(newPropertyIndexPath, {animated: YES});
			}
		}});
		
		self.updateAutocompleteDefinition();
	};
	
	
	/**
	 * Should be invoked when a property is removed using the editor.
	 * If the collection view is running an animated data change when this method is invoked, it will have no effect.
	 * @param indexPath <BMIndexPath>		The index path of the deleted property.
	 */
	this.removePropertyAtIndexPath = function (indexPath) {
		if (propertiesCollection.isUpdatingData) return;
		
		// Prepare for the animated update by cloning the current property configuration
		oldPropertySections = [properties.slice(), services.slice(), events.slice()];
		newPropertySections = propertySections;
		
		propertySections[indexPath.section].splice(indexPath.row, 1);
		
		// Update the collection view
		propertiesCollection.updateEntireDataAnimated(YES);
		
		self.updateAutocompleteDefinition();
	};
	
	/**
	 * The timeout token, used to prevent frequent autocomplete definition generations.
	 */
	var autocompleteTimeout; // <TimeoutToken>
	
	var BaseDefinition; // <String>
	if (YES) {
		BaseDefinition = ["type STRING = string;",
	            "interface LOCATION {",
	            "   latitude: number;",
	            "   longitude: number;",
	            "   elevation?: number;",
	            "   units?: string;",
	            "}",
	            "interface NOTHING extends Void{}",
	            "type NUMBER = number;",
	            "type INTEGER = number;",
	            "type LONG = number;",
	            "type BOOLEAN = boolean",
	            "type DASHBOADNAME = string;",
	            "type GROUPNAME = string;",
	            "type GUID = string;",
	            "type HTML = string;",
	            "type HYPERLINK = string;",
	            "type IMAGELINK = string;",
	            "type MASHUPNAME = string;",
	            "type MENUNAME = string;",
	            "type PASSWORD = string;",
	            "type TEXT = string;",
	            "type THINGCODE = string;",
	            "type THINGNAME = string;",
	            "type USERNAME = string;",
	            "type DATETIME = Date;",
	            "interface XML {}",
	            "type JSON = any;",
	            "interface QUERY {",
	            "   filters?:any;",
	            "   sorts?:any;",
	            "}",
	            "interface TAGS {}",
	            "interface SCHEDULE {}",
	            "interface VARIANT {}",
	            "type BLOB = Blob;",
	            "type THINGSHAPENAME = string;",
	            "type THINGTEMPLATENAME = string;",
	            "type DATASHAPENAME = string;",
	            "type PROJECTNAME = string;",
	            "type BASETYPENAME = string;",
	            "interface FieldDefinition {",
	            "    ordinal?: number;",
	            "    baseType: string;",
	            "    name: string;",
	            "    description?: string;",
	            "}",
	            "interface SortDefinition {",
	            "    name: string;",
	            "    ascending: boolean;",
	            "}",
	            "interface DataShape {",
	            "    fieldDefinitions: FieldDefinition;",
	            "} "].join('\n');
	        
	    BaseDefinition += '\
	    	interface SelfDispatchPropertyUpdateToWidgetArgs {\
	    		forProperty: string;\
	    		value: any;\
	    	}\
	    	interface SelfShouldUpdateToValueArgs {\
	    		fromValue: any;\
	    	}\n\
	    	interface TWWidget {\n\
	    		/**\n\
	    		 * Gets the value for the property with the given name.\n\
	    		 * @param name - The property\'s name.\n\
	    		 * @return - The property\'s value.\n\
	    		 */\n\
	    		getProperty(name: String): any;\n\
	    		/**\n\
	    		 * Sets the value for the property with the given name.\n\
	    		 * @param name - The property\'s name.\n\
	    		 * @param value - The property\'s value.\n\
	    		 */\n\
	    		setProperty(name: String, value: any?);\n\
	    		/**\n\
	    		 * Should be invoked by widgets when they modify the selection in an infotable property.\n\
	    		 * This triggers the SelectedRowsChanged event and notifies all other widgets of the selection update.\n\
	    		 * @param name - The property\'s name.\n\
	    		 * @param selectedRowIndices - An array containing the infotable indices of the current selected rows.\n\
	    		 */\n\
	    		updateSelection(name: String, selectedRowIndices: Number[]);\n\
	    		/**\n\
	    		 * Invoked by the runtime before triggering updateProperty.\n\
	    		 * @param updatePropertyInfo - An object containing the details of the property update.\n\
	    		 */\n\
	    		standardUpdateProperty(updatePropertyInfo: TWUpdatePropertyInfo);\n\
	    		/**\n\
	    		 * Invoked by the runtime to notify widgets that a bound property was updated.\n\
	    		 * @param updatePropertyInfo - An object containing the details of the property update.\n\
	    		 */\n\
	    		updateProperty(updatePropertyInfo: TWUpdatePropertyInfo);\n\
	    		/**\n\
	    		 * Invoked by the runtime during mashup creation.\n\
	    		 * Adds this widget\'s HTML content to the web page.\n\
	    		 * @param ui - The jQuery element in which this widget should be added.\n\
	    		 * @param masuhp - The mashup containing this widget.\n\
	    		 */\n\
	    		appendTo(ui: any, mashup: any);\n\
	    	}\
	    	/**\n\
	    	 * Finds and returns the widget with the given name in the current mashup.\n\
	    	 * @param name - The DisplayName of the widget to find.\n\
	    	 * @return - The widget object if it was found, undefined otherwise.\n\
	    	 */\n\
	    	declare function $w<T extends TWRuntimeWidget>(name: string): T | undefined;\n\
	    	/**\n\
	    	 * Finds and returns the bounding box jQuery element of the widget with the given name in the current mashup.\n\
	    	 * @param name - The DisplayName of the widget to find.\n\
	    	 * @return - The bounding box if it was found, undefined otherwise.\n\
	    	 */\n\
	    	declare function $b(name: string): $ | undefined;\n\
	    	/**\n\
	    	 * Finds and returns the jQuery element of the widget with the given name in the current mashup.\n\
	    	 * @param name - The DisplayName of the widget to find.\n\
	    	 * @return - The jQuery element if it was found, undefined otherwise.\n\
	    	 */\n\
	    	declare function $j(name: string): $ | undefined;\n\
	    ';
	};
	
	/**
	 * Schedules an autocomplete definition update.
	 * If there is already an autocomplete definition update pending, it will be delayed.
	 * If the current code editor does not support extensible autocomplete definitions, this method does nothing.
	 */
	this.updateAutocompleteDefinition = function () {
		if (!codeEditor.supportsExtensibleAutocomplete) return;
		
		// Clear the previous scheduled update if it exists
		if (autocompleteTimeout) window.clearTimeout(autocompleteTimeout);
		
		// The register a new update
		autocompleteTimeout = window.setTimeout(function () {
			autocompleteTimeout = undefined;
			
			self.buildAutocompleteDefinition();
		}, 500);
	};
	
	
	/**
	 * Triggers a blocking autocomplete and export definition update.
	 * The current code editor must support extensible autocomplete definitions, otherwise this method's behaviour will be undefined.
	 */
	this.buildAutocompleteDefinition = function () {
		// Always include the base definition
		var definition = BaseDefinition + 'interface Self extends TWRuntimeWidget {';
		var exportDefinition = 'interface ' + self.getProperty('Title') + ' extends TWRuntimeWidget {';
		
		// Create autocomplete definitions for each of the properties and their associated change callbacks.
		// Those callbacks will also contain descriptions.
		properties.forEach(function (property) {
			let section = property.name + ': ' + property.dataType + '; \n\
	    	/**\n\
	    	 * Invoked whenever the ' + property.name + ' property is about to be updated to a new value as a result of a binding.\n\
	    	 * Scripts can override this method to respond the incoming change and accept or reject the new value.\n\
	    	 * The default implementation does nothing and accepts all new values.\n\
	    	 * @param value - The property\'s new value.\n\
	    	 * @param args - An object containing additional arguments including the previous value (args.fromValue).\n\
	    	 * @return - True if the new value should be accepted, false otherwise.\n\
	    	 */\n\
			' + property.name + 'ShouldUpdateToValue(value: any, args: SelfShouldUpdateToValueArgs): boolean; \n\
	    	/**\n\
	    	 * Invoked after the ' + property.name + ' property has been updated as a result of a binding.\n\
	    	 * This method is only invoked if the corresponding ..ShouldUpdateToValue method has returned true.\n\
	    	 * Scripts can override this method to respond to property updates.\n\
	    	 * The default implementation does nothing.\n\
	    	 * @param value - The property\'s new value.\n\
	    	 * @param args - An object containing additional arguments including the previous value (args.fromValue).\n\
	    	 */\n\
			' + property.name + 'DidUpdateToValue(value: any, args: SelfShouldUpdateToValueArgs); \n';

			definition += section;
			exportDefinition += section;
		});
		
		// Create autocomplete definitions for the services
		services.forEach(function (service) {
			definition += service.name + '(); ';
			exportDefinition += service.name + '(); ';
		});
		
		// Then create the definitions and documention for the generic instance methods.
		let section = '\
	    	/**\
	    	 * Should be invoked to dispatch an event to the Thingworx runtime, causing all actions bound to that event to execute.\n\
	    	 * @param event - The name of the event to dispatch.\n\
	    	 */\n\
			dispatchEvent(event: string): void;\n\
	    	/**\n\
	    	 * Invoked after any property has been updated as a result of a binding.\n\
	    	 * This method will be invoked after the specific ..DidUpdateToValue method is invoked.\n\
	    	 * Scripts can override this method to react to all property updates.\n\
	    	 * @param event - The name of the event to dispatch.\n\
	    	 */\n\
			propertyDidUpdateToValue(property: string, value: any | undefined): void;\n\
	    	/**\n\
	    	 * Finds and returns the widget with the given name in the current mashup.\n\
	    	 * @param name - The DisplayName of the widget to find.\n\
	    	 * @return - The widget object if it was found, undefined otherwise.\n\
	    	 */\n\
			widgetNamed(name: string): TWRuntimeWidget | undefined;\n\
	    	/**\n\
	    	 * Sends a property update to the given widget as if it came from a binding.\n\
	    	 * Supported properties may be updated this way even if they are not bound to anything in the composer.\n\
	    	 * @param widget - The widget object whose property should be updated.\n\
	    	 * @param args - An object containing additional arguments. This object must have the following properties:\n\
	    	 *					forProperty {String} - The name of the property to update.\n\
	    	 *					value {AnyObject} - The value to which that property should update.\n\
	    	 */\n\
			dispatchPropertyUpdateToWidget(widget: any, args: SelfDispatchPropertyUpdateToWidgetArgs): void;\n\
	    	/**\n\
	    	 * May be overriden by scripts that create an UI. This method receives the script\'s container as its parameter.\n\
	    	 * It is the script\'s responsibility to add their content to the supplied container.\n\
	    	 * @param container - The container in which the UI elements should be added.\n\
	    	 */\n\
			renderWithContainer(container: $): void;\n\
		';
		/*
		These lines are now inherited from TWRuntimeWidget
		updateSelection(property: string, selectedRowIndices: number[]): void;\n\
		handleSelectionUpdate(property: string, selectedRows: any[], selectedRowIndices: number[]): void;\n\
		resize(width: number, height: number): void;\n\
		*/

		definition += section;
		exportDefinition += section + '}\n';
		
		definition += '} \n\
		type INFOTABLE<T> = TWInfotable<T>; \
		var self: Self;';
		
		// Asign the definition to the code editor's scope
		codeEditor.scope = definition;

		// Asign the definition to the export property
		self.setProperty('Exports', exportDefinition);
	};
	
	/**
	 * Should be invoked to insert the code corresponding to the property at the given index path to the code editor.
	 * Invoking this method will cause the code editor to acquire keyboard focus.
	 * @param indexPath <BMIndexPath>		The property's index path.
	 */
	this.insertPropertyAtIndexPath = function (indexPath) {
		var code;
		
		if (indexPath.section == 0) {
			code = 'self.' + indexPath.object.name;
		}
		else if (indexPath.section == 1) {
			code = 'self.' + indexPath.object.name + '()';
		}
		else if (indexPath.section == 2) {
			code = 'self.dispatchEvent(\'' + indexPath.object.name + '\')';
		}
		
		codeEditor.insertText(code);
		codeEditor.acquireFocus();	
	};
	
	/**
	 * Should be invoked to insert the code corresponding to declaration of the service at the given index path to the code editor.
	 * Invoking this method will cause the code editor to acquire keyboard focus.
	 * @param indexPath <BMIndexPath>		The property's index path.
	 */
	this.insertDefinitionForPropertyAtIndexPath = function (indexPath) {
		codeEditor.insertText('self.' + indexPath.object.name + ' = function () {\n\t\n}');	
		codeEditor.acquireFocus();
	};

	// @override - BMCollectionViewDataSet
	this.numberOfSections = function () {
		return 3;
	};

	// @override - BMCollectionViewDataSet
	this.numberOfObjectsInSectionAtIndex = function (index) {
		return propertySections[index].length;
	};

	// @override - BMCollectionViewDataSet
	this.indexPathForObjectAtRow = function (row, args) {
		return BMIndexPathMakeWithRow(row, {section: args.inSectionAtIndex, forObject: propertySections[args.inSectionAtIndex][row]});
	};

	// @override - BMCollectionViewDataSet
	this.indexPathForObject = function (object) {
		var type = object.type;
		
		var section;
		if (object.type == 'property') section = 0;
		if (object.type == 'service') section = 1;
		if (object.type == 'event') section = 2;
		
		for (var row = 0; row < propertySections[section].length; row++) {
			if (propertySections[section][row].name == object.name) {
				return BMIndexPathMakeWithRow(row, {section: section, forObject: object})
			}
		}
		
		return undefined;
	};

	// @override - BMCollectionViewDataSet
	this.contentsForCellWithReuseIdentifier = function (identifier) {
		var contents;
		
		if (identifier == 'property') {
			contents = $('<div class="BMCHProperty"><input type="text" class="BMCHPropertyName BMCHInput" placeholder="Name"></input><input type="text" class="BMCHPropertyBaseType BMCHInput" placeholder="Base Type"></input><div class="BMCHPropertyInsertButton"><i class="material-icons">&#xE5C8;</i></div><div class="BMCHPropertyDeleteButton"><i class="material-icons">&#xE872;</i></div></div>');
		}
		else if (identifier == 'event') {
			contents = $('<div class="BMCHProperty"><input type="text" class="BMCHPropertyName BMCHInput" placeholder="Name"></input><div class="BMCHPropertyInsertButton"><i class="material-icons">&#xE5C8;</i></div><div class="BMCHPropertyDeleteButton"><i class="material-icons">&#xE872;</i></div></div>');
		}
		else if (identifier == 'service') {
			contents = $('<div class="BMCHProperty"><input type="text" class="BMCHPropertyName BMCHInput" placeholder="Name"></input><div class="BMCHPropertyInsertDefinitionButton"><i class="material-icons">&#xE86F;</i></div><div class="BMCHPropertyInsertButton"><i class="material-icons">&#xE5C8;</i></div><div class="BMCHPropertyDeleteButton"><i class="material-icons">&#xE872;</i></div></div>');
		}
		
		return contents;
	};

	// @override - BMCollectionViewDataSet
	this.cellForItemAtIndexPath = function (indexPath) {
		var cell = propertiesCollection.dequeueCellForReuseIdentifier(indexPath.object.type);

		cell.node.classList.add('BMCHPropertyCell');
		
		self.updateCell(cell, {atIndexPath: indexPath});
		
		if (!cell.initialized) {
			cell.initialized = YES;
			
			/*var removeButton = cell.element.find('.BMCHPropertyDeleteButton');
			removeButton.click(function () {
				self.removePropertyAtIndexPath(cell.indexPath);
			});*/
			
			var insertButton = $(cell.node).find('.BMCHPropertyInsertButton');
			insertButton.click(function () {
				self.insertPropertyAtIndexPath(cell.indexPath);
			});
			
			var inputs = $(cell.node).find('input');
			
			inputs.on('focus', function () {
				cell.retain();
			});
			
			inputs.on('blur', function () {
				cell.release();
			});
			
			var baseTypeBox = inputs.filter('.BMCHPropertyBaseType').on('change', function () {
				let value = this.value;

				if (value.indexOf('INFOTABLE:') == 0) {
					let type = 'INFOTABLE';
					let dataShape = value.substring('INFOTABLE:'.length, value.length);
					self.setBaseTypeOfPropertyAtIndexPath(cell.indexPath, {to: 'INFOTABLE', dataShape: dataShape});
				}
				else {
					self.setBaseTypeOfPropertyAtIndexPath(cell.indexPath, {to: this.value});
				}
			});
			
			var nameBox = inputs.filter('.BMCHPropertyName').on('change', function () {
				self.renamePropertyAtIndexPath(cell.indexPath, {to: this.value});
			});
			
			inputs.on('keypress', function (event) {
				if (event.which == 13) {
					this.blur();
					
					if (this === nameBox[0]) {
						if (baseTypeBox.length) {
							baseTypeBox[0].focus();
							baseTypeBox[0].select();
						}
						else {
							codeEditor.acquireFocus();
						}
					}
					else {
						codeEditor.acquireFocus();
					}
				}
			});
			
			var insertDefinition = $(cell.node).find('.BMCHPropertyInsertDefinitionButton');
			insertDefinition.click(function () {
				self.insertDefinitionForPropertyAtIndexPath(cell.indexPath);
			});
		}
		
		return cell;
	};

	// @override - BMCollectionViewDataSet
	this.contentsForSupplementaryViewWithIdentifier = function (identifier) {
		return $('<div class="BMCHPropertySection"><div class="BMCHPropertySectionName"></div><div class="BMCHPropertySectionKeyboardShortcut"></div><div class="BMCHPropertySectionAddButton"><i class="material-icons">&#xE145;</i></div></div>');
	};

	// @override - BMCollectionViewDataSet
	this.cellForSupplementaryViewWithIdentifier = function (identifier, args) {
		var cell = propertiesCollection.dequeueCellForSupplementaryViewWithIdentifier(identifier);
		var indexPath = args.atIndexPath;
		
		self.updateSupplementaryView(cell, {withIdentifier: identifier, atIndexPath: args.atIndexPath});
		
		if (!cell.initialized) {
			cell.initialized = YES;
			
			var addButton = $(cell.node).find('.BMCHPropertySectionAddButton');
			addButton.click(function () {
				self.addPropertyOfType(cell.CH_sectionType);
			});
		}
		
		return cell;
	};

	// @override - BMCollectionViewDataSet
	this.updateCell = function (cell, args) {
		var indexPath = args.atIndexPath;
		
		$(cell.node).find('.BMCHPropertyName').val(indexPath.object.name);
		
		if (indexPath.object.type == 'property') {
			if (indexPath.object.dataType == 'INFOTABLE' && indexPath.object.dataShape) {
				$(cell.node).find('.BMCHPropertyBaseType').val('INFOTABLE:' + indexPath.object.dataShape);
			}
			else {
				$(cell.node).find('.BMCHPropertyBaseType').val(indexPath.object.dataType);
			}
		}
	};

	// @override - BMCollectionViewDataSet
	this.updateSupplementaryView = function (cell, args) {
		
		cell.CH_sectionType = args.atIndexPath.section;
		$(cell.node).find('.BMCHPropertySectionName').text(propertySectionNames[args.atIndexPath.section]);
		$(cell.node).find('.BMCHPropertySectionKeyboardShortcut').text('\u2318\u21E7' + (args.atIndexPath.section + 1));
		
	};
	
	/**
	 * Set to YES while the properties data set is using the old data, NO otherwise.
	 */
	var isUsingOldDataSet = NO; // <Boolean>

	// @override - BMCollectionViewDataSet
	this.useOldData = function (use) {
		isUsingOldDataSet = use;
		
		if (use) {
			propertySections = oldPropertySections;
		}
		else {
			propertySections = newPropertySections;
		}
	};

	// @override - BMCollectionViewDataSet
	this.isUsingOldData = function () {
		return isUsingOldDataSet;
	};

	// @override - BMCollectionViewDelegate
	this.collectionViewShouldRunIntroAnimation = function () { return YES; };

	// @override - BMCollectionViewDelegate
	this.collectionViewAnimationOptionsForIntroAnimation = function () { return {duration: 200, delay: 0, stride: 25}; };

	// @override - BMCollectionViewDelegate
	this.collectionViewCanSelectCellAtIndexPath = function () { return NO; };

	// @override - BMCollectionViewDelegate
	this.collectionViewCanMoveCell = function () { return YES; };

	// @override - BMCollectionViewDelegate
	this.collectionViewCanRemoveItemsAtIndexPaths = function () { return YES; };

	// @override - BMCollectionViewDelegate
	this.moveItemsFromIndexPaths = function (indexPaths, args) { 
		if (propertiesCollection.isUpdatingData) return indexPaths;
		let targetIndexPath = args.toIndexPath;
		let indexPath = indexPaths[0];
		
		// Disallow moving items between sections
		if (targetIndexPath.section != indexPath.section) return indexPaths;

		// Prepare for the animated update by cloning the current property configuration
		oldPropertySections = [properties.slice(), services.slice(), events.slice()];
		newPropertySections = propertySections;

		propertySections[indexPath.section].splice(indexPath.row, 1);
		propertySections[targetIndexPath.section].splice(targetIndexPath.row, 0, indexPath.object);

		propertiesCollection.updateEntireDataAnimated(YES, {completionHandler() {
			propertiesCollection.invalidateDraggingIndexPaths();
		}});

		return [args.toIndexPath]; 
	};

	// @override - BMCollectionViewDelegate
	this.moveItemFromIndexPath = function (indexPath, args) { 
		if (propertiesCollection.isUpdatingData) return NO;
		let targetIndexPath = args.toIndexPath;
		
		// Disallow moving items between sections
		if (targetIndexPath.section != indexPath.section) return NO;

		// Prepare for the animated update by cloning the current property configuration
		oldPropertySections = [properties.slice(), services.slice(), events.slice()];
		newPropertySections = propertySections;

		propertySections[indexPath.section].splice(indexPath.row, 1);
		propertySections[targetIndexPath.section].splice(targetIndexPath.row, 0, indexPath.object);

		propertiesCollection.updateEntireDataAnimated(YES, {completionHandler() {
			propertiesCollection.invalidateDraggingIndexPaths();
		}});

		return YES; 
	};

	this.removeItemsAtIndexPaths = function (indexPaths) {
		if (propertiesCollection.isUpdatingData) return NO;

		// Prepare for the animated update by cloning the current property configuration
		oldPropertySections = [properties.slice(), services.slice(), events.slice()];
		newPropertySections = propertySections;

		newPropertySections[indexPaths[0].section].splice(indexPaths[0].row, 1);

		propertiesCollection.updateEntireDataAnimated(YES);

	}

};

TW.IDE.Widgets.BMCSSHost = function () {
	// The CSS host is mostly identical to the Javascript host so it reuses most of its code.
	// The main difference is the inability to define properties, services and events for the CSS host.
	TW.IDE.Widgets.BMCodeHost.call(this, BMCodeEditorLanguage.CSS);


	/**
	 * Invoked by the platform to retrieve the path to the widget's icon as it appears in the widgets list.
	 * @return <String>			The icon path.
	 */
	this.widgetIconUrl = function () {
    	return  "../Common/extensions/BMCodeHost/ui/BMCodeHost/images/Stylesheet@2x.png";
	}

	/**
	 * Invoked by the runtime when the widget has to be rendered. This function should provide the HTML contents of this widget.
	 * @return <String>				The widget's content as an HTML string.
	 */
    this.renderHtml = function () {
        var html = '<div class="widget-content BMCodeHost">\
        				<div class="BMCodeHostContainer">\
							<div class="BMCHStyleIcon"></div>\
							<div class="InlineBlock BMCHScriptEdit" >' + this.getProperty("Title") + '.css</div>\
						</div>\
					</div>';

        return html;
    };
}


TW.IDE.Widgets.BMTypescriptHost = function () {
	// The Typescript host is mostly identical to the Javascript host so it reuses most of its code.
	TW.IDE.Widgets.BMCodeHost.call(this, BMCodeEditorLanguage.Typescript);


	/**
	 * Invoked by the platform to retrieve the path to the widget's icon as it appears in the widgets list.
	 * @return <String>			The icon path.
	 */
	this.widgetIconUrl = function () {
    	return  "../Common/extensions/BMCodeHost/ui/BMCodeHost/images/TypeScriptObject@2x.png";
	}

	/**
	 * Invoked by the runtime when the widget has to be rendered. This function should provide the HTML contents of this widget.
	 * @return <String>				The widget's content as an HTML string.
	 */
    this.renderHtml = function () {
        var html = '<div class="widget-content BMCodeHost">\
        				<div class="BMCodeHostContainer">\
							<div class="BMCHTypescriptIcon"></div>\
							<div class="InlineBlock BMCHScriptEdit" >' + this.getProperty("Title") + '.ts</div>\
						</div>\
					</div>';

        return html;
    };
}