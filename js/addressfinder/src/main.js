import Magento from './magento';

let script = document.createElement('script');
script.src = 'https://api.addressfinder.io/assets/v3b/widget.js';
script.async = 1
script.onload = () => {
    window.AddressFinder.Magento = Magento;

    document.fire('addressfinder:magento:loaded', window.AddressFinder);
};
document.body.appendChild(script);
