module.exports = {
    country: 'AU',
    map(fullAddress, metaData) {
        return {
            street1: metaData.address_line_1,
            street2: metaData.address_line_2,
            city: metaData.locality_name,
            region: metaData.state_territory,
            postcode: metaData.postcode,
        };
    },
};
