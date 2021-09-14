import type { TypeScriptWorker } from "monaco-typescript/release/esm/tsWorker";
import type { BinaryExpression, BinaryOperatorToken, CallExpression, ClassDeclaration, Expression, FunctionExpression, FunctionLikeDeclaration, Identifier, JSDoc, MethodDeclaration, Node, NodeArray, ObjectLiteralExpression, Program, PropertyAssignment, PropertyDeclaration, PropertyName, StringLiteral, SyntaxKind, TypeNode, TypeReference, TypeReferenceNode, VariableDeclaration, __String } from 'typescript';

declare const self: any;

/**
 * An enum containing constants that describe the kind of each class member.
 */
enum ThingworxTypescriptWidgetClassMemberKind {
	/**
	 * Indicates that this member represents a widget property.
	 */
	Property = 'property',

	/**
	 * Indicates that this member represents a widget event.
	 */
	Event = 'event',

	/**
	 * Indicates that this member represents a widget service.
	 */
	Service = 'service'
}

/**
 * An interface describing a widget class member aspect.
 */
interface ThingworxTypescriptWidgetAspect {
	/**
	 * The name of the aspect.
	 */
	name: string;

	/**
	 * An optional argument that the aspect has been invoked with, if this aspect is callable.
	 */
	value?: unknown;
}

/**
 * An interface describing a widget class member.
 */
interface ThingworxTypescriptWidgetClassMember {
	/**
	 * The name of this class member.
	 */
	name: string;

	/**
	 * An optional list of aspects that may be associated with this member.
	 */
	aspects?: ThingworxTypescriptWidgetAspect[];

	/**
	 * An optional description to display for this member in the composer.
	 */
	description?: string;

	/**
	 * The kind of widget member represented by this class member.
	 */
	kind: ThingworxTypescriptWidgetClassMemberKind;
}

interface ThingworxTypescriptWidgetProperty extends ThingworxTypescriptWidgetClassMember {
	/**
	 * The property's base type.
	 */
	baseType: string;

	kind: ThingworxTypescriptWidgetClassMemberKind.Property;
}

/**
 * An interface that represents the definition of a widget class.
 */
interface ThingworxTypescriptWidgetClass {
	/**
	 * The name of the widget class.
	 */
	name: string;

	/**
	 * The class members with widget decorators.
	 */
	members: ThingworxTypescriptWidgetClassMember[];
}

interface CodeOutlineToken {
	name: string;
	kind: CodeOutlineTokenKind;
	ordinal: number;
	line: number;
	indentAmount: number;
}

export enum CodeOutlineTokenKind {
	Class = 'Class',
	ObjectLiteral = 'ObjectLiteral',
	Method = 'Method',
	Constructor = 'Constructor',
	Function = 'Function',
	Get = 'Get',
	Set = 'Set'
}

/**
 * A mapping between typescript type names and valid thingworx base types.
 */
const ThingworxBaseTypes = {
    NOTHING: "NOTHING",
    void: 'NOTHING',
    nothing: 'NOTHING',

	unknown: 'ANYSCALAR',
	any: 'ANYSCALAR',
	ANYSCALAR: 'ANYSCALAR',

	FIELDNAME: 'FIELDNAME',

	RENDERERWITHFORMAT: 'RENDERERWITHFORMAT',

    STRING: "STRING",
    string: 'STRING',

    NUMBER: "NUMBER",
    number: 'NUMBER',

    BOOLEAN: "BOOLEAN",
    boolean: 'BOOLEAN',

    DATETIME: "DATETIME",
    Date: 'DATETIME',
    datetime: 'DATETIME',

    TIMESPAN: "TIMESPAN",
    timespan: 'TIMESPAN',

    INFOTABLE: "INFOTABLE",
    infotable: 'INFOTABLE',
    InfoTableReference: 'INFOTABLE',
    InfoTable: 'INFOTABLE',

    LOCATION: "LOCATION",
    location: 'LOCATION',

    XML: "XML",
    xml: 'XML',

    Object: "JSON",
    JSON: "JSON",
    TWJSON: "JSON",
    json: 'JSON',

    QUERY: "QUERY",
    query: 'QUERY',

    IMAGE: "IMAGE",
    image: 'IMAGE',

    HYPERLINK: "HYPERLINK",
    hyperlink: 'HYPERLINK',

    IMAGELINK: "IMAGELINK",
    imagelink: 'IMAGELINK',

    PASSWORD: "PASSWORD",
    password: 'PASSWORD',

    HTML: "HTML",
    html: 'HTML',

    TEXT: "TEXT",
    text: 'TEXT',

    TAGS: "TAGS",
    tags: 'TAGS',

    SCHEDULE: "SCHEDULE",
    schedule: 'SCHEDULE',

    VARIANT: "VARIANT",
    variant: 'variant',

    GUID: "GUID",
    guid: 'GUILD',

    BLOB: "BLOB",
    blob: 'BLOB',

    INTEGER: "INTEGER",
    integer: 'INTEGER',

    LONG: "LONG",
    long: 'LONG',

    PROPERTYNAME: "PROPERTYNAME",
    SERVICENAME: "SERVICENAME",
    EVENTNAME: "EVENTNAME",
    THINGNAME: "THINGNAME",
    THINGSHAPENAME: "THINGSHAPENAME",
    THINGTEMPLATENAME: "THINGTEMPLATENAME",
    DATASHAPENAME: "DATASHAPENAME",
    MASHUPNAME: "MASHUPNAME",
    MENUNAME: "MENUNAME",
    BASETYPENAME: "BASETYPENAME",
    USERNAME: "USERNAME",
    GROUPNAME: "GROUPNAME",
    CATEGORYNAME: "CATEGORYNAME",
    STATEDEFINITIONNAME: "STATEDEFINITIONNAME",
    STYLEDEFINITIONNAME: "STYLEDEFINITIONNAME",
    MODELTAGVOCABULARYNAME: "MODELTAGVOCABULARYNAME",
    DATATAGVOCABULARYNAME: "DATATAGVOCABULARYNAME",
    NETWORKNAME: "NETWORKNAME",
    MEDIAENTITYNAME: "MEDIAENTITYNAME",
    APPLICATIONKEYNAME: "APPLICATIONKEYNAME",
    LOCALIZATIONTABLENAME: "LOCALIZATIONTABLENAME",
    ORGANIZATIONNAME: "ORGANIZATIONNAME",
    DASHBOARDNAME: "DASHBOARDNAME",
    PERSISTENCEPROVIDERPACKAGENAME: "PERSISTENCEPROVIDERPACKAGENAME",
    PERSISTENCEPROVIDERNAME: "PERSISTENCEPROVIDERNAME",
    PROJECTNAME: "PROJECTNAME",

    
    propertyName: "PROPERTYNAME",
    serviceName: "SERVICENAME",
    eventName: "EVENTNAME",
    thingName: "THINGNAME",
    thingShapeName: "THINGSHAPENAME",
    thingTemplateName: "THINGTEMPLATENAME",
    dataShapeName: "DATASHAPENAME",
    mashupName: "MASHUPNAME",
    menuName: "MENUNAME",
    baseTypeName: "BASETYPENAME",
    userName: "USERNAME",
    groupName: "GROUPNAME",
    categoryName: "CATEGORYNAME",
    stateDefinitionName: "STATEDEFINITIONNAME",
    styleDefinitionName: "STYLEDEFINITIONNAME",
    modelTagVocabularyName: "MODELTAGVOCABULARYNAME",
    dataTagVocabularyName: "DATATAGVOCABULARYNAME",
    networkName: "NETWORKNAME",
    mediaEntityName: "MEDIAENTITYNAME",
    applicationKeyName: "APPLICATIONKEYNAME",
    localizationTableName: "LOCALIZATIONTABLENAME",
    organizationName: "ORGANIZATIONNAME",
    dashboardName: "DASHBOARDNAME",
    presistenceProviderPackageName: "PERSISTENCEPROVIDERPACKAGENAME",
    persistenceProviderName: "PERSISTENCEPROVIDERNAME",
    projectName: "PROJECTNAME",

    VEC2: "VEC2",
    VEC3: "VEC3",
    VEC4: "VEC4",

    THINGCODE: "THINGCODE",
    thingcode: 'THINGCODE'
};

/**
 * An extension of the typescript worker
 */
const worker = (worker: typeof TypeScriptWorker, ts: typeof import('typescript'), libFileMap) => {
	return class BMCodeHostTypescriptWorker extends worker {
		/**
		 * Returns an object that describes the thingworx widget class declared in the given file, or `undefined`
		 * if the given file does not contain a thingworx widget class.
		 * If the file contains multiple widget classes, only the information related to the last class is returned.
		 * @returns 	An object describing the thingworx widget class if available, `undefined` otherwise.
		 */
		getWidgetClassInformation(fileName: string, parentObjects: string[]): ThingworxTypescriptWidgetClass | undefined {
			const program = (this as any)._languageService.getProgram() as Program;
			if (!program) return undefined;

			const currentFile = program.getSourceFile(fileName);
			if (!currentFile) return undefined;

			let classDefinition: ThingworxTypescriptWidgetClass | undefined = undefined;
			let currentClass: ClassDeclaration | undefined = undefined;

			/**
			 * Checks whether the given node has a decorator with the given name.
			 * @param name      The name of the decorator to find.
			 * @param node      The node in which to search.
			 * @return          `true` if the decorator was found, `false` otherwise.
			 */
			const hasDecoratorNamed = (name: string, node: Node): boolean => {
				if (!node.decorators) return false;

				// Getting the decorator name depends on whether the decorator is applied directly or via a
				// decorator factory
				for (const decorator of node.decorators) {
					if (decorator.expression.kind == ts.SyntaxKind.CallExpression) {
						const callExpression = decorator.expression as CallExpression;
						if (callExpression.expression.getText() == name) {
							return true;
						}
					}
					else if (decorator.expression.kind == ts.SyntaxKind.Identifier) {
						const identifierExpression = decorator.expression as Identifier;
						if (identifierExpression.text == name) {
							return true;
						}
					}
				}
				return false;
			}

			/**
			 * Returns the documentation for the given node, if it exists.
			 * @param node      The node whose documentation to get.
			 * @return          The documentation, or an empty string if it doesn't exist.
			 */
			const documentationOfNode = (node: Node): string => {
				// This method appears to not be included in the type definition
				const documentation = (ts as any).getJSDocCommentsAndTags(node, true) as Node[];

				// Get the first documentation node and use it as the description
				if (documentation.length) {
					for (const documentationNode of documentation) {
						if (documentationNode.kind == ts.SyntaxKind.JSDocComment) {

							const comment = (documentationNode as JSDoc).comment || '';
							if (typeof comment != 'string') {
								return comment.reduce((acc, val) => acc + (val.text), "");
							}
							else {
								return comment;
							}
						}
					}
				}

				return '';
			}

			/**
			 * Retrieves the arguments of the decorator with the given name, if the decorator exists and is a applied
			 * via a decorator factory.
			 * @param name      The name of the decorator to find.
			 * @param node      The node in which to search.
			 * @return          An array of expressions representing the arguments, or `undefined` if they could not be retrieved.
			 */
			const argumentsOfDecoratorNamed = (name: string, node: Node): NodeArray<Expression> | undefined => {
				if (!node.decorators) return;
				
				for (const decorator of node.decorators) {
					if (decorator.expression.kind == ts.SyntaxKind.CallExpression) {
						const callExpression = decorator.expression as CallExpression;
						if (callExpression.expression.getText() == name) {
							return callExpression.arguments;
						}
					}
				}
			}

			/**
			 * Retrieves the text of the single literal argument of the given decorator. This method will return undefined if the given
			 * decorator factory has no arguments, more than one argument or a non-literal argument.
			 * @param name      The name of the decorator to find.
			 * @param node      The node in which to search.
			 * @return          The text of the literal argument, or `undefined` if the decorator does not exist.
			 */
			const literalArgumentOfDecoratorNamed = (name: string, node: Node): string | undefined => {
				if (!hasDecoratorNamed(name, node)) return;

				const args = argumentsOfDecoratorNamed(name, node);

				if (!args || args.length != 1) {
					return undefined;
				}
				else {
					const argument = args[0];

					if (argument.kind != ts.SyntaxKind.StringLiteral) {
						return undefined;
					}

					const literalArgument = argument as StringLiteral;
					return literalArgument.text;
				}
			}

			const visit = (node: Node): void => {
				ts.forEachChild(node, visit);

				switch (node.kind) {
					case ts.SyntaxKind.ClassDeclaration:
						const classNode = node as ClassDeclaration;

						// Check if the class has the appropriate widget definition decorator and extends from the appropriate superclass
						if (hasDecoratorNamed('TWWidgetDefinition', classNode)) {
							const heritageClause = classNode.heritageClauses?.[0]?.types?.[0];
							if (heritageClause && heritageClause.expression.kind == ts.SyntaxKind.Identifier) {
								const superclass = heritageClause.expression.getText();

								if (superclass == 'TypescriptWidget' && classNode.name) {
									classDefinition = {
										name: classNode.name.text,
										members: []
									}

									currentClass = classNode;
								}
							}
						}
						break;
					case ts.SyntaxKind.PropertyDeclaration:
						// Only properties declared directly on the current class are relevant
						if (node.parent != currentClass || !classDefinition) break;

						// Properties can either be widget properties or widget events
						const propertyNode = node as PropertyDeclaration;
						if (hasDecoratorNamed('property', node)) {
							// If the node is marked as a property, add it as a member

							// Non-identifier property names cannot map to composer properties
							if (propertyNode.name.kind != ts.SyntaxKind.Identifier) break;
							const name = propertyNode.name.text;

							// Non-type reference type annotations cannot map to composer properties
							if (propertyNode.type?.kind != ts.SyntaxKind.TypeReference) break;
							const typeNode = propertyNode.type as TypeReferenceNode;

							const type = ThingworxBaseTypes[typeNode.typeName.getText()];
							// If the type isn't a thingworx type, the property cannot be represented in the composer
							if (!type) break;

							const aspects: ThingworxTypescriptWidgetAspect[] = [];

							switch (type) {
								case 'INFOTABLE':
									// Infotables may optionally have a data shape argument
									const argument = typeNode.typeArguments?.[0];
									if (!argument) break;
									if (argument.kind != ts.SyntaxKind.TypeReference) break;

									// If a valid data shape name is specified, add it as an aspect
									const argumentKind = (argument as TypeReferenceNode).typeName.getText();
									if (!argumentKind) break;

									aspects.push({name: 'dataShape', value: argumentKind});
									break;
								case 'THINGNAME':
									// TODO: Thingnames may optionally have a template or shape restriction
									break;
							}

							// Add the composer aspects, if any are defined
							if (hasDecoratorNamed('bindingSource', node)) {
								aspects.push({name: 'isBindingSource', value: true});
							}

							if (hasDecoratorNamed('bindingTarget', node)) {
								aspects.push({name: 'isBindingTarget', value: true});
							}

							if (hasDecoratorNamed('sourcePropertyName', node)) {
								const value = literalArgumentOfDecoratorNamed('sourcePropertyName', node);

								if (value) {
									aspects.push({name: 'sourcePropertyName', value});
								}
							}

							if (hasDecoratorNamed('baseTypeInfotableProperty', node)) {
								const value = literalArgumentOfDecoratorNamed('baseTypeInfotableProperty', node);

								if (value) {
									aspects.push({name: 'baseTypeInfotableProperty', value});
								}
							}

							const description = documentationOfNode(node);

							classDefinition.members.push({
								name,
								baseType: type,
								description,
								aspects,
								kind: ThingworxTypescriptWidgetClassMemberKind.Property
							} as ThingworxTypescriptWidgetProperty);
						}
						else if (hasDecoratorNamed('event', node)) {
							// If this property is marked as an event add it to the class

							// Non-identifier property names cannot map to composer properties
							if (propertyNode.name.kind != ts.SyntaxKind.Identifier) break;
							const name = propertyNode.name.text;

							// Non-type reference type annotations cannot map to composer properties
							if (propertyNode.type?.kind != ts.SyntaxKind.TypeReference) break;
							const typeNode = propertyNode.type as TypeReferenceNode;

							const type = typeNode.typeName.getText();
							// If the type isn't EVENT, the property cannot be represented in the composer
							if (type != 'TWEvent') break;

							const description = documentationOfNode(node);

							classDefinition.members.push({
								kind: ThingworxTypescriptWidgetClassMemberKind.Event,
								name,
								description
							});
						}

						break;
					case ts.SyntaxKind.MethodDeclaration:
						// Only properties declared directly on the current class are relevant
						if (node.parent != currentClass || !classDefinition) break;

						// Only service methods are relevant
						if (!hasDecoratorNamed('service', node)) break;

						const methodNode = node as MethodDeclaration;
						const nameNode = methodNode.name;

						// Only identifier names can map to composer services
						if (nameNode.kind != ts.SyntaxKind.Identifier) break;
						const name = nameNode.text;

						// In order to be valid as services, all parameters must be optional
						let isValidService = true;
						for (const parameter of methodNode.parameters) {
							// A parameter is optional if it is either marked optional explicitly
							// or if it has an initializer expression
							if (parameter.questionToken || parameter.initializer) continue;
							isValidService = false;
							break;
						}

						if (!isValidService) break;

						const description = documentationOfNode(methodNode);

						classDefinition.members.push({
							kind: ThingworxTypescriptWidgetClassMemberKind.Service,
							name,
							description
						});

						break;
				}
			}

			visit(currentFile);

			return classDefinition;
		}



		getOutline(fileName: string, parentObjects: string[]): CodeOutlineToken[] {
			let tokens: CodeOutlineToken[] = [];
			let program = (this as any)._languageService.getProgram();
			if (program) {
				let currentFile = program.getSourceFile(fileName);
				if (currentFile) {
					let ordinal = 0;
					let indentation = 0;

					const getEscapedTextOfIdentifierOrLiteral = function (node?: {
						kind: SyntaxKind;
						escapedText?: __String;
						text?: string;
					}): string | undefined {
						if (node) {
							return node.kind === ts.SyntaxKind.Identifier
								? (node.escapedText as string)
								: node.text;
						}
					};

					const extractLiteral = (liternalNode: ObjectLiteralExpression) => {
						let didExtractLiteral = false;

						// Object literals should only be extracted if they have at least a method or any getter/setter
						let methodCount = 0;
						liternalNode.properties.forEach((property) => {
							switch (property.kind) {
								case ts.SyntaxKind.MethodDeclaration:
									methodCount++;
									break;
								case ts.SyntaxKind.GetAccessor:
								case ts.SyntaxKind.SetAccessor:
									didExtractLiteral = true;
									break;
								case ts.SyntaxKind.PropertyAssignment:
									if (
										property.initializer &&
										(property.initializer.kind == ts.SyntaxKind.FunctionDeclaration ||
											property.initializer.kind == ts.SyntaxKind.FunctionExpression)
									) {
										methodCount++;
									}
							}
						});

						if (methodCount > 0) {
							didExtractLiteral = true;
						}

						if (didExtractLiteral) {
							ordinal++;
							let parentNode = liternalNode.parent;

							// Compute the name for assignments, call expressions and others
							let name = '';
							if (
								parentNode.kind == ts.SyntaxKind.VariableDeclaration ||
								parentNode.kind == ts.SyntaxKind.PropertyAssignment
							) {
								let parentNodeAsVariableDeclaration = parentNode as Node & {
									name: PropertyName;
								};
								name =
									getEscapedTextOfIdentifierOrLiteral(parentNodeAsVariableDeclaration.name) || '';
							} else if (parentNode.kind == ts.SyntaxKind.CallExpression) {
								let parentNodeAsCallExpression = parentNode as CallExpression;
								name =
									(parentNodeAsCallExpression.expression &&
										parentNodeAsCallExpression.expression.getFullText().trim()) ||
									'';
								if (name) {
									let nameTokens = name.split('\n');
									name = nameTokens[nameTokens.length - 1];
									name = name + '()';
								}
							} else if (parentNode.kind == ts.SyntaxKind.BinaryExpression) {
								let parentNodeAsBinaryExpression = parentNode as BinaryExpression;
								// Only handle these for assignments
								let sign: BinaryOperatorToken = parentNodeAsBinaryExpression.operatorToken;
								if (ts.tokenToString(sign.kind) == '=') {
									let left = parentNodeAsBinaryExpression.left;
									let nameTokens;
									switch (left.kind) {
										case ts.SyntaxKind.VariableDeclaration:
											let leftVariableDeclaration = (left as unknown) as VariableDeclaration;
											name = getEscapedTextOfIdentifierOrLiteral(leftVariableDeclaration.name) || '';
											break;
										case ts.SyntaxKind.PropertyAccessExpression:
											name = left.getFullText().trim();
											nameTokens = name.split('\n');
											name = nameTokens[nameTokens.length - 1];
											break;
									}
								}
							}

							tokens.push({
								name: name || '{}',
								kind: CodeOutlineTokenKind.ObjectLiteral,
								ordinal: ordinal,
								line: currentFile?.getLineAndCharacterOfPosition(liternalNode.getStart()).line || 0,
								indentAmount: indentation
							});
						}

						return didExtractLiteral;
					};

					const extractClass = function (classNode: ClassDeclaration) {
						ordinal++;
						if (classNode.name) {
							tokens.push({
								name: getEscapedTextOfIdentifierOrLiteral(classNode.name) || '',
								kind: CodeOutlineTokenKind.Class,
								ordinal: ordinal,
								line: currentFile?.getLineAndCharacterOfPosition(classNode.getStart()).line || 0,
								indentAmount: indentation
							});
						} else {
							tokens.push({
								name: '{}',
								kind: CodeOutlineTokenKind.Class,
								ordinal: ordinal,
								line: currentFile?.getLineAndCharacterOfPosition(classNode.getStart()).line || 0,
								indentAmount: indentation
							});
						}
					};

					const extractMethod = function (methodNode: FunctionLikeDeclaration) {
						ordinal++;
						let node = methodNode;
						let line = currentFile?.getLineAndCharacterOfPosition(methodNode.getStart()).line || 0;

						let parentNode = methodNode.parent;
						// isMethodKind is set to YES for function declarations whose parent is a property assignment
						let isMethodKind = false;

						// Compute the name for assignments
						let name = '';
						if (parentNode.kind == ts.SyntaxKind.PropertyAssignment) {
							let parentNodeAsPropertyAssignment = parentNode as PropertyAssignment;
							name = getEscapedTextOfIdentifierOrLiteral(parentNodeAsPropertyAssignment.name) || '';
							isMethodKind = true;
						} else if (parentNode.kind == ts.SyntaxKind.VariableDeclaration) {
							let parentNodeAsVariableDeclaration = parentNode as VariableDeclaration;
							name = getEscapedTextOfIdentifierOrLiteral(parentNodeAsVariableDeclaration.name) || '';
						} else if (parentNode.kind == ts.SyntaxKind.CallExpression) {
							let parentNodeAsCallExpression = parentNode as CallExpression;
							name =
								(parentNodeAsCallExpression.expression &&
									parentNodeAsCallExpression.expression.getFullText().trim()) ||
								'';
							if (name) {
								let nameTokens = name.split('\n');
								name = nameTokens[nameTokens.length - 1].trim();
								name = name + '()';
							}
						} else if (parentNode.kind == ts.SyntaxKind.BinaryExpression) {
							// Only handle these for assignments
							let parentNodeAsBinaryExpression = parentNode as BinaryExpression;
							let sign = parentNodeAsBinaryExpression.operatorToken;
							if (ts.tokenToString(sign.kind) == '=') {
								let left = parentNodeAsBinaryExpression.left;
								let nameTokens;
								switch (left.kind) {
									case ts.SyntaxKind.VariableDeclaration:
										let leftAsVariableDeclaration = (left as unknown) as VariableDeclaration;
										name = getEscapedTextOfIdentifierOrLiteral(leftAsVariableDeclaration.name) || '';
										break;
									case ts.SyntaxKind.PropertyAccessExpression:
										name = left.getFullText().trim();
										nameTokens = name.split('\n');
										name = nameTokens[nameTokens.length - 1].trim();
										break;
								}
							}
						}

						switch (methodNode.kind) {
							case ts.SyntaxKind.Constructor:
								tokens.push({
									name: 'constructor ()',
									kind: CodeOutlineTokenKind.Constructor,
									ordinal: ordinal,
									line: line,
									indentAmount: indentation
								});
								break;
							case ts.SyntaxKind.MethodDeclaration:
								let nodeAsMethodDeclaration = node as MethodDeclaration;
								tokens.push({
									name: getEscapedTextOfIdentifierOrLiteral(nodeAsMethodDeclaration.name) || '{}',
									kind: CodeOutlineTokenKind.Method,
									ordinal: ordinal,
									line: line,
									indentAmount: indentation
								});
								break;
							case ts.SyntaxKind.FunctionExpression:
							case ts.SyntaxKind.FunctionDeclaration:
								let nodeAsFunctionDeclaration = node as FunctionExpression;
								tokens.push({
									name:
										getEscapedTextOfIdentifierOrLiteral(nodeAsFunctionDeclaration.name) ||
										name ||
										'{}',
									kind: isMethodKind ? CodeOutlineTokenKind.Method : CodeOutlineTokenKind.Function,
									ordinal: ordinal,
									line: line,
									indentAmount: indentation
								});
								break;
							case ts.SyntaxKind.GetAccessor:
								tokens.push({
									name: getEscapedTextOfIdentifierOrLiteral(node.name) || '()',
									kind: CodeOutlineTokenKind.Get,
									ordinal: ordinal,
									line: line,
									indentAmount: indentation
								});
								break;
							case ts.SyntaxKind.SetAccessor:
								tokens.push({
									name: getEscapedTextOfIdentifierOrLiteral(node.name) || '()',
									kind: CodeOutlineTokenKind.Set,
									ordinal: ordinal,
									line: line,
									indentAmount: indentation
								});
								break;
							case ts.SyntaxKind.ArrowFunction:
								tokens.push({
									name: getEscapedTextOfIdentifierOrLiteral(node.name) || name || '() => {}',
									kind: CodeOutlineTokenKind.Function,
									ordinal: ordinal,
									line: line,
									indentAmount: indentation
								});
								break;
							default:
								break;
						}
					};

					const buildOutline = function (node: Node): void {
						let didIndent = false;
						switch (node.kind) {
							case ts.SyntaxKind.ObjectLiteralExpression:
								if (extractLiteral(node as ObjectLiteralExpression)) {
									indentation += 1;
									didIndent = true;
								}
								break;
							case ts.SyntaxKind.ClassExpression:
							case ts.SyntaxKind.ClassDeclaration:
								extractClass(node as ClassDeclaration);
								indentation += 1;
								didIndent = true;
								break;
							case ts.SyntaxKind.MethodDeclaration:
							case ts.SyntaxKind.MethodSignature:
							case ts.SyntaxKind.FunctionDeclaration:
							case ts.SyntaxKind.FunctionExpression:
							case ts.SyntaxKind.GetAccessor:
							case ts.SyntaxKind.SetAccessor:
							case ts.SyntaxKind.Constructor:
							case ts.SyntaxKind.ArrowFunction:
								extractMethod(node as FunctionLikeDeclaration);
								indentation += 1;
								didIndent = true;
								break;
							default:
								break;
						}

						ts.forEachChild(node, buildOutline);
						if (didIndent) indentation -= 1;
					};

					buildOutline(currentFile);
				}
			}
			return tokens;
		}
	};
};

self.customTSWorkerFactory = worker;