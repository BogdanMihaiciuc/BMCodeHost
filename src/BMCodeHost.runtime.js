/**
 * Returns the widget with the specified id by searching the target mashup.
 * {
 * 	@param withId <String, nullable> 					Required if named is not specified. The ID of the widget to find
 * 	@param named <String, nullable>						The display name of the widget, if specified, the search will find the first widget 
 *														that has the specified id (if given) or the speficied display name.
 * 	@param inMashup <TWMashup>							The mashup object in which to search.
 * 	@param traverseContainedMashup <Boolean, nullable> 	Defaults to false. If set to true, the search will include other mashups contained within the source mashup.
 * }
 * @return <TWWidget, nullable> 						The actual widget object if found, null otherwise
 */
function BMFindWidget(args) {
	var id = args.withId;
	var mashup = args.inMashup;
	var name = args.named;
	
	if (!mashup) mashup = TW.Runtime.Workspace.Mashups.Current;
	
	return BMFindWidgetRecursive(id, name, mashup.rootWidget, args.traverseContainedMashup);
}

function BMFindWidgetRecursive(id, name, container, includeContainedMashup) {
	
	var widgets = container.getWidgets();
	var length = widgets.length;
	
	for (var i = 0; i < length; i++) {
		var widget = widgets[i];
		
		if (widget.idOfThisElement == id || widget.properties.Id == id) return widget;
		if (widget.properties.DisplayName == name) return widget;
		
		var subWidgets = widget.getWidgets();
		if (widget.properties.__TypeDisplayName == "Contained Mashup" && !includeContainedMashup) continue;
		if (subWidgets.length > 0) {
			widget = BMFindWidgetRecursive(id, name, widget, includeContainedMashup);
			
			if (widget) return widget;
		}
		
		
	}
	
	return null;
	
}

TW.Runtime.Widgets.BMCodeHost = function () {

	var self = this;

	/**
	 * Finds and returns the widget instance with the given DisplayName.
	 * @param name <String>				The display name.
	 * @return <TWWidget, nullable>		The widget, if it was found or null otherwise.
	 */
	self.widgetNamed = function (name) {
		return BMFindWidget({named: name, inMashup: self.mashup});
	};
	
	/**
	 * May be invoked to publish a property update to a widget, as if it came from a binding.
	 * @param widget <TWWidget>			The widget whose property should update.
	 * {
	 *	@param forProperty <String>		The property to update.
	 *	@param value <AnyObject>		The property's new value.
	 * }
	 */
	self.dispatchPropertyUpdateToWidget = function (widget, args) {
		var value = args.value;
		widget.updateProperty({TargetProperty: args.forProperty, SinglePropertyValue: args.value, RawSinglePropertyValue: args.value, 
			ActualDataRows: (value && value.rows && value.dataShape) ? value.rows : value
		});
	};

	/**
	 * A shortcut to self.widgetNamed.
	 */
	var $w = self.widgetNamed;
	var $j = function (name) {
		var widget = $w(name);
		if (widget) {
			return widget.jqElement;
		}
		else {
			return;
		}
	};

	var $b = function (name) {
		var widget = $w(name);
		if (widget) {
			return widget.boundingBox;
		}
		else {
			return;
		}
	};

    self.renderHtml = function () {
		var properties = JSON.parse(this.getProperty("RuntimeProperties"));

		for (var i = 0; i < properties.length; i++) {
			if (properties[i].type != "property") continue;

			(function (name) {
				// Initialize the property values to the values set in the composer
				self["_CodeHost_property_" + name] = self.getProperty(name);
				Object.defineProperty(self, name, {
					get: function() {
						return self["_CodeHost_property_" + name];
					},
					set: function(value) {
						self["_CodeHost_property_" + name] = value;
						self.setProperty(name, value);
					}
				});
				
				// Create observer functions
				self[name + 'ShouldUpdateToValue'] = function () {
					return YES;
				};
				
				self[name + 'DidUpdateToValue'] = function () {};
				
			})(properties[i].name);
		}

        return '<div class="widget-content"></div>';
    };

	self.updateProperty = function (updatePropertyInfo) {
		try {
			var property = updatePropertyInfo.TargetProperty;
			var value = updatePropertyInfo.RawSinglePropertyValue || updatePropertyInfo.SinglePropertyValue;
			var previousValue = self[property];
			if (self[property + 'ShouldUpdateToValue'](value, {fromValue: previousValue})) {
				self[property] = value;
	
				self[property + 'DidUpdateToValue'](self[property], {fromValue: previousValue});
				self.propertyDidUpdateToValue(property, self[property]);
			}
		}
		catch (e) {
			console.log(e);
		}
	};
	
	self.propertyDidUpdateToValue = function (name, value) {
		
	};

	/**
	 * Should be invoked to dispatch an event to the Thingworx runtime.
	 * @param name <String>		The event to dispatch.
	 */
	self.dispatchEvent = function (name) {
		self.jqElement.triggerHandler(name);
	};

	self.afterRender = function() {
		
		var afterRender = self.afterRender;
		
		try {
			if (this.getProperty("Scope") == "local") {
				eval(this.getProperty("Code") + "\n//# sourceURL=" + this.getProperty("Title") + ".js");
				
				if (typeof self.renderWithContainer == 'function') {
					self.renderWithContainer(self.jqElement);
				}
				else {
					self.boundingBox.css({display: 'none'});
				}
				
				// Fire afterRender if it was redefined
				if (self.afterRender != afterRender) self.afterRender();
			}
			else {
				(0, eval)(this.getProperty("Code") + "\n//# sourceURL=" + this.getProperty("Title") + ".js");
			}
		}
		catch (e) {
			console.log(e);
		}
	}

	self.serviceInvoked = function (serviceName) {
		// Ensure that the service has been implemented by the script
		if (typeof self[serviceName] == 'function') {
			try {
				self[serviceName]();
			}
			catch (e) {
				console.log(e);
			}
		}
		else {
			console.log("Unable to invoke service " + serviceName + "; no handler has been defined for it.");
		}
	};


};

TW.Runtime.Widgets.BMTypescriptHost = function () {
	TW.Runtime.Widgets.BMCodeHost.call(this);

	var self = this;
	

	/**
	 * A shortcut to self.widgetNamed.
	 */
	var $w = self.widgetNamed;
	var $j = function (name) {
		var widget = $w(name);
		if (widget) {
			return widget.jqElement;
		}
		else {
			return;
		}
	};

	var $b = function (name) {
		var widget = $w(name);
		if (widget) {
			return widget.boundingBox;
		}
		else {
			return;
		}
	};

	self.afterRender = function() {
		
		var afterRender = self.afterRender;
		
		try {
			if (this.getProperty("Scope") == "local") {
				eval(this.getProperty("TranspiledCode") + "\n//# sourceURL=" + this.getProperty("Title") + ".ts");
				
				if (typeof self.renderWithContainer == 'function') {
					self.renderWithContainer(self.jqElement);
				}
				else {
					self.boundingBox.css({display: 'none'});
				}
				
				// Fire afterRender if it was redefined
				if (self.afterRender != afterRender) self.afterRender();
			}
			else {
				(0, eval)(this.getProperty("TranspiledCode") + "\n//# sourceURL=" + this.getProperty("Title") + ".ts");
			}
		}
		catch (e) {
			console.log(e);
		}
	}
}

var BMCSSHostWidgetRegex = /\$([^=\s\.#\[\]@>\*\:\~\"\(\)]+)/g;

TW.Runtime.Widgets.BMCSSHost = function () {

	var self = this;

    this.renderHtml = function () {
        return '<div class="widget-content"></div>';
    };

	this.afterRender = function() {
		this.boundingBox.css({display: 'none'});
		
		var style = this.getProperty('Code');
		var self = this;

		this.style = $("<style>").text(style);

		$("head").append(this.style);

		if (self.getProperty('DirectLink')) {
			self.resolveThing();
		}
	}

	this.resolveThing = function () {
		var resolver = new XMLHttpRequest();
		resolver.open('POST', '/Thingworx/Things/Debugger.Websocket/Services/GetConfigurationTable?x-thingworx-session=true');
		resolver.setRequestHeader('x-thingworx-session', true);
		resolver.setRequestHeader('Content-Type', 'application/json');
		resolver.setRequestHeader('Accept', 'application/json');
		
		resolver.onload = function (event) {
			if (resolver.status == 200) {
				self.host = (location.protocol.indexOf('https') == -1 ? 'ws://' : 'wss://') + location.host + '/Thingworx' + JSON.parse(resolver.responseText).rows[0].endpoint;
				self.connect();
			}
			else {
				if (window.snackBarWithAction) snackBarWithAction("test", '[CSS] DirectLink was unable to connect', 'RETRY', function () {
					self.resolveThing();
				});
				
				console.error('[CSS] DirectLink was unable to connect');
			}
		};
		
		resolver.onerror = function (event) {
			if (window.snackBarWithAction) snackBarWithAction("test", '[CSS] DirectLink was unable to connect', 'RETRY', function () {
				self.resolveThing();
			});
				
			console.error('[CSS] DirectLink was unable to connect');
		};
		
		resolver.send(JSON.stringify({
			tableName: 'PortInfo'
		}));
	}
	
	this.connect = function () {
		try{

			var socket;
			var host = this.host;
			var requiredNamespace = this.getProperty("DirectLinkUUID");
			var requiredNamespaceComponents = requiredNamespace.split(".");
			this.socket = new WebSocket(host);
			var socket = this.socket;

			socket.onopen = function(){
			}

			socket.onmessage = function(msg) {
				
				// message format is "[namespace]message"
				var incomingMessage = msg.data;
				var compatibleNamespace = false;
				
				var incomingNamespace = incomingMessage.substring(0, incomingMessage.indexOf("]")).substring(1);
				var incomingMessage = incomingMessage.substring(incomingMessage.indexOf("]") + 1);
				
				if (requiredNamespace == "") {
					compatibleNamespace = true;
				}
				else {
					compatibleNamespace = true;

					var namespaceComponents = incomingNamespace.split(".");
					
					for (var i = 0; i < requiredNamespaceComponents; i++) {
						if (namespaceComponents[i] != requiredNamespaceComponents[i]) {
							compatibleNamespace = false;
							break;
						}
					}
					
				}
				
				if (compatibleNamespace) {
					self.style.remove();

					self.style = $("<style>").text(incomingMessage);
		
					$("head").append(self.style);
				}
			}

			socket.onclose = function(){
				snackBarWithAction(self.jqElement.attr('id') + "-snackbar", "[CSS] DirectLink was disconnected", "RECONNECT", function () {
					self.connect();
				});
			}			

		} catch(exception){
			snackBarWithAction(self.jqElement.attr('id') + "-snackbar", "[CSS] DirectLink was unable to connect", "RECONNECT", function () {
				self.connect();
			});
		}
		
	}

	this.beforeDestroy = function () {
		if (this.style) this.style.remove();
	}

};

