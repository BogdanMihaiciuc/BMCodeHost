import {TWWidgetDefinition as widgetDecorator, property, event, service, canBind, didBind} from 'typescriptwebpacksupport/widgetRuntimeSupport';

var currentWidget;

// Declare the typescript widget class which all script widgets are required to subclass
export class TypescriptWidget extends TWRuntimeWidget {
    renderHtml() {
        return '<div class="widget-content"></div>';
    }

    afterRender() {
		this.boundingBox.css({display: 'none'});
    }

    getWidget(name) {
        const rootWidget = this.mashup.rootWidget;
        let widgets = [rootWidget];
        let index = 0;
        while (index < widgets.length) {
            const widget = widgets[i];

            if (widget.properties.DisplayName == name) return widget;
            widgets = widgets.concat(widget.getWidgets());
            index++;
        }
    }
}

// Decorate the widget, making it available to thingworx using the class syntax
widgetDecorator(TypescriptWidget);

export function TWWidgetDefinition(widget) {
    currentWidget = widget;
    return widgetDecorator(widget);
}

// These objects are only used for IDE metadata and will have no effect at runtime
export const bindingTarget = {_key: '_bindingTarget', _value: true};
export const bindingSource = {_key: '_bindingSource', _value: true};
const twevent = event;

export {property, event, service, canBind, didBind, twevent};


TW.Runtime.Widgets.BMTypescriptClassHost = function () {
    eval(this.getProperty('TranspiledCode'));

    if (currentWidget) {
        const widget = currentWidget;
        currentWidget = undefined;
        return new widget;
    }
};