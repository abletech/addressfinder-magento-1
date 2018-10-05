module.exports = {
    country: 'NZ',
    map(fullAddress, metaData) {
        let selected = new AddressFinder.NZSelectedAddress(fullAddress, metaData);

        return {
            street1: selected.address_line_1(),
            street2: selected.address_line_2(),
            city: selected.city(),
            region: metaData.region,
            postcode: selected.postcode(),
        };
    },
};
