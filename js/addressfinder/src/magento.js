import { defaults, has, each, size } from 'lodash';

import * as au from './providers/au';
import * as nz from './providers/nz';

export default class Magento {

    constructor(countrySelector, autocompleteSelector, options) {

        // We'll firstly setup our options with some defaults
        defaults(options, {
            licenceKey: 'ADDRESSFINDER_DEMO_KEY',
            debugMode: false,
            widgetOptions: {},
            mappings: {},
        });

        this.autocompleteSelector = autocompleteSelector;
        this.countrySelector = countrySelector;

        this.licenceKey = options.licenceKey;
        this.debugMode = options.debugMode;
        this.widgetOptions = options.widgetOptions;
        this.initialMappings = options.mappings;

        this.initialise();
        this.enable();
    }

    reset() {
        this.countryElement = null;
        this.autocompleteElement = null;

        this.mappings = {};
        this.providers = {};
        this.widgets = {};
    }

    initialise() {
        this.fire('addressfinder:magento:initialising', this);

        this.reset();

        this.fire('addressfinder:magento:initialised', this);
    }

    enable() {
        this.fire('addressfinder:magento:enabling', this);

        this.autocompleteElement = document.querySelector(this.autocompleteSelector);

        each(this.initialMappings, (selector, key) => this.registerMapping(key, selector));

        this.registerProvider(au);
        this.registerProvider(nz);

        this.setupCountry(this.countrySelector);

        this.fire('addressfinder:magento:enabled', this);
    }

    disable() {
        this.fire('addressfinder:magento:disabling', this);

        if (this.hasWidgets()) {
            this.disableWidgets();
        }

        this.reset();

        this.fire('addressfinder:magento:disabled', this);
    }

    refresh() {
        this.fire('addressfinder:magento:refreshing', this);

        this.init();
        this.enable();

        this.fire('addressfinder:magento:refreshed', this);
    }

    registerProvider(provider) {
        this.debug('Registering provider', provider.country);

        this.fire('addressfinder:magento:provider:registering', provider);

        this.providers[provider.country] = provider;
    }

    hasProvider(country) {
        return has(this.providers, country);
    }

    getProvider(country) {
        if (this.hasProvider(country)) {
            return this.providers[country];
        }
    }

    setupCountry(selector) {
        this.countryElement = document.querySelector(selector);

        this.countryElement.addEventListener('change', () => this.setCountry(this.countryElement.value));

        this.setCountry(this.countryElement.value);
    }

    setCountry(country) {
        if (this.hasWidgets()) {
            this.disableWidgets();
        }

        if (!this.hasProvider(country)) {
            this.debug('Country not supported', country);
            this.country = null;
            return;
        }

        this.debug('Setting country', country);
        this.country = country;
        this.enableWidget(country);
    }

    registerMapping(key, selector) {
        let element = document.querySelector(selector);

        if (null === element) {
            this.debug('Element not found for mapping', selector, key);
            return;
        }

        this.debug('Registering mapping', key, selector);

        this.mappings[key] = element;
    }

    hasMapping(key) {
        return has(this.mappings, key);
    }

    getMapping(key) {
        if (this.hasMapping(key)) {
            return this.mappings[key];
        }
    }

    hasWidgets() {
        return 0 < size(this.widgets);
    }

    disableWidgets() {
        this.debug('Disabling all widgets');

        each(this.widgets, widget => widget.disable());
    }

    hasWidget(country) {
        return has(this.widgets, country);
    }

    getWidget(country) {
        if (this.hasWidget(country)) {
            return this.widgets[country];
        }
    }

    registerWidget(country, widget) {
        this.fire('addressfinder:magento:widget:registering', {
            country: country,
            widget: widget,
        });

        this.debug('Registering and enabling widget for country', country);

        this.widgets[country] = widget;
    }

    enableWidget(country) {
        if (this.hasWidget(country)) {
            this.debug('Re-enabling widget for country', country);

            this.getWidget(country).enable();
        } else {
            let widget = new AddressFinder.Widget(
                this.autocompleteElement,
                this.licenceKey,
                country,
                this.widgetOptions
            );

            widget.on('result:select', (fullAddress, metaData) => {
                let values = this.getProvider(country).map(fullAddress, metaData);

                each(values, (value, key) => this.setValue(key, value));

                this.fire('addressfinder:magento:result:select', {
                    fullAddress: fullAddress,
                    metaData: metaData,
                });
            });

            this.registerWidget(country, widget);
        }
    }

    setValue(key, value) {
        if (!this.hasMapping(key)) {
            this.debug('Cannot set value for mapping because it was never mapped', key, value);
            return;
        }

        this.debug('Setting value for mapping', key, value);
        this.getMapping(key).value = value;

        this.fire('addressfinder:magento:value', {
            key: key,
            value: value,
        });
    }

    isDebugMode() {
        return true === this.debugMode;
    }

    debug(...parameters) {
        if (!this.isDebugMode()) {
            return;
        }

        parameters[0] = '[AddressFinder Magento] '+parameters[0];

        console.debug.apply(null, parameters);
    }

    fire(...parameters) {
        this.debug('Firing event', parameters[0]);

        document.fire.call(null, parameters);
    }

};
