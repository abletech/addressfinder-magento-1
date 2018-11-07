<?php

class AddressFinder_AddressFinder_Helper_Data extends Mage_Core_Helper_Abstract
{
    /**
     * The region mappings.
     */
    private $regionMappings;

    /**
     * Returns the support country codes.
     *
     * @return array
     */
    public function getSupportedCountryCodes()
    {
        return ['AU', 'NZ'];
    }

    /**
     * Returns the supported region IDs, by country code.
     *
     * @return array
     */
    public function getSupportedRegionIds()
    {
        if (null === $this->regionMappings) {

            /** @var Mage_Directory_Model_Country[] $countries */
            $countries = Mage::getModel('directory/country')
                ->getResourceCollection()
                ->loadByStore()
                ->getItems();

            // Filter down the list of countries by those which we support
            $countries = array_intersect_key($countries, array_flip($this->getSupportedCountryCodes()));

            // Prep up mappings where the keys are the country codes and the value is an associative
            // array that uses region codes for the keys and the internal region ID for the values.
            $this->regionMappings = [];

            array_walk($countries, function (Mage_Directory_Model_Country $country) {
                foreach ($country->getRegions() as $region) {
                    $this->regionMappings[$country->getId()][$region->getCode()] = $region->getId();
                }
            });

            return $this->regionMappings;
        }
    }
}
