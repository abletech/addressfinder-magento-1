<?php

abstract class AddressFinder_AddressFinder_Block_Abstract extends Mage_Core_Block_Template
{
    /**
     * Tells if the block is enabled.
     *
     * @return bool
     */
    public function isEnabled()
    {
        return (bool) Mage::getStoreConfig('addressfinder/general/enabled');
    }

    /**
     * Returns the licence key.
     *
     * @return string|null
     */
    public function getLicenceKey()
    {
        return Mage::getStoreConfig('addressfinder/general/licence_key');
    }

    /**
     * Tells if we're in debug mode or not.
     *
     * @return bool
     */
    public function isDebugMode()
    {
        return (bool) Mage::getStoreConfig('addressfinder/general/debug_mode');
    }

    /**
     * Tells if the block has widget options or not.
     *
     * @return bool
     */
    public function hasWidgetOptions()
    {
        return !!$this->getWidgetOptions();
    }

    /**
     * Gets widget options and validates that they're actually JSON.
     *
     * @return string|null
     */
    public function getWidgetOptions()
    {
        /** @var string|null $json */
        $json = Mage::getStoreConfig('addressfinder/general/widget_options');

        // If there's no JSON, bail out early
        if (!$json) {
            return;
        }

        // We'll just validate the JSON by decoding it. The decoder throws
        // a number of exceptiosn for invalid JSON...
        Zend_Json::decode($json);

        // If we've got this far, the JSON is valid. Wel'l return the orignal JSON
        // because there's a few ways of re-encoding that could result in some
        // transformation which may not actually be intented by the user.
        return $json;
    }

    /**
     * Returns the supported region IDs, by country code.
     *
     * @return array
     */
    public function getSupportedRegionIds()
    {
        return $this->helper('addressfinder')->getSupportedRegionIds();
    }
}
