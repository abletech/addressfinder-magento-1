module.exports = {
    country: 'NZ',
    map(fullAddress, metaData) {
        let selected = new AddressFinder.NZSelectedAddress(fullAddress, metaData);
        let street1Value, street2Value;

        if (!selected.suburb() || 0 === selected.suburb().length) {
            street1Value = selected.address_line_1();
            street2Value = selected.address_line_2();
        } else {
            street1Value = selected.address_line_1_and_2();
            street2Value = selected.suburb();
        }

        return {
            street1: street1Value,
            street2: street2Value,
            city: selected.city(),
            region: metaData.region,
            postcode: selected.postcode(),
        };
    },
};
