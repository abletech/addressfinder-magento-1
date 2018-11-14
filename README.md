# AddressFinder for Magento 1

## Installation

There are two supported ways to install the module, either via [Composer](https://getcomposer.org) or manually.

### Installation Using Composer

To install the AddresssFinder module for Magento 1, simply run:

```
composer require addressfinder/module-magento1
```

> **Tip**: Don't forget to [enable symlinks](https://magento.stackexchange.com/a/184185) in your Magento installation to enable Composer installation to work. This isn't specific to AddressFinder, but a common "gotcha". [Read more](https://github.com/magento-hackathon/magento-composer-installer/issues/51).

### Manual Installation

Firstly, [download](https://github.com/AbleTech/addressfinder-magento-1/archive/master.zip) the latest ZIP, then merge the following files/directories into your existing project:

```
app/code/community/AddressFinder
app/design/frontend/base/default/layout/addressfinder.xml
app/design/frontend/base/default/template/addressfinder
app/etc/modules/AddressFinder_AddressFinder.xml
js/addressfinder
```

## Clear Cache

After installation, it's important to clear any [caches](https://docs.magento.com/m1/ce/user_guide/system-operations/cache-clear.html).

## Setup & Usage

Follow the user guide on the AddressFinder website:

- [Australian website](#)
- [New Zealand website](#)

## Tmeplates & Events

The following templates are exposed:

1. `app/design/frontend/base/default/template/addressfinder/checkout/onepage/billing.phtml` - sets up AddressFinder on the billing step of the checkout.
2. `app/design/frontend/base/default/template/addressfinder/checkout/onepage/shipping.phtml` - sets up AddressFinder on the shpping step of hte checkout.
3. `app/design/frontend/base/default/template/addressfinder/customer/address/form.phtml` - sets up AddressFinder on the customer address management page.

Further, a number of JavaScript events are fired. We've identified the important events:

- `addressfinder:magento:loaded` - when AddressFinder has loaded, used by frontend templates to initialise
- `addressfinder:magento:initialising`
- `addressfinder:magento:initialised`
- `addressfinder:magento:enabling` - when AddressFinder is being enabled as the country is changed (one widget per country)
- `addressfinder:magento:enabled`
- `addressfinder:magento:disabling` - when AddressFinder is being disabled as the country is changed (one widget per country)
- `addressfinder:magento:disabled`
- `addressfinder:magento:refreshing`
- `addressfinder:magento:refreshed`
- `addressfinder:magento:provider:registering` - when a provider is being registered (AU or NZ)
- `addressfinder:magento:widget:registering` - when a widget is being registered for a provider (AU or NZ)
- `addressfinder:magento:result:select` - **when a result is selected**
- `addressfinder:magento:value` - when a value is being set on for the given metadata key, e.g. `city` to `Sydney`.
- `addressfinder:magento:transform`

To attach functionality to these, simply add observers as per the [Prototype 1.7 documentatio](http://api.prototypejs.org/dom/Element/fire/):

```javascript
document.observe('addressfinder:magento:result:select', function (event) {
    // The payload of the event is located in event.memo

    // console.log(event.memo.fullAddress);
    // console.log(event.memo.metaData);
});
```

## Module Development

### Installation

To begin development, you will need a copy of Magento installed using Composer. Create the following `composer.json` file in a working directory:

```json
{
    "repositories": {
        "firegento": {
            "type": "composer",
            "url": "https://packages.firegento.com"
        }
    },
    "require": {
        "magento-hackathon/magento-composer-installer": "^3.1",
        "aydin-hassan/magento-core-composer-installer": "^1.5",
        "firegento/magento": "v1.9.3.10",
    },
    "minimum-stability": "dev",
    "prefer-stable": true,
    "extra": {
        "magento-root-dir": "./public"
    }
}
```

After you have created this file, simply run `composer install` to setup your Magento 1.9 environment. Of course, you can substitute any version of Magento into the file you've created, we're just using the latest.

From here, clone the repository to a location (such as inside your newly created Magento project):

```bash
git clone https://github.com/AbleTech/addressfinder-magento-1.git
```

You may now use a [feature of Composer](https://getcomposer.org/doc/05-repositories.md#path) to pull in the locally cloned repository as a Composer dependency. Simply update your `composer.json` file

```json
{
    "repositories": {
        "firegento": {
            "type": "composer",
            "url": "https://packages.firegento.com"
        },
        "addressfinder": {
            "type": "path",
            "url": "./module-magento1"
        }
    },
    "require": {
        "magento-hackathon/magento-composer-installer": "^3.1",
        "aydin-hassan/magento-core-composer-installer": "^1.5",
        "firegento/magento": "v1.9.3.10",
        "addressfinder/module-magento1": "*"
    },
    "minimum-stability": "dev",
    "prefer-stable": true,
    "extra": {
        "magento-root-dir": "./public"
    }
}
```

You can now make changes in the module and they will reflect in your Magento store.

### Compilng assets

In order to compile assets, simply run (from within the repository):

```bash
npm install
npm run dev
```

There's also the following tasks which may be of use:

```bash

# Minitfy assets
npm run production

# Watch and automatically recompile
```
