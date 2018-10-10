<?php

class AddressFinder_AddressFinder_Block_Checkout_Onepage_Shipping extends AddressFinder_AddressFinder_Block_Abstract
{
    /**
     * {@inheritdoc}
     */
    protected function _construct()
    {
        parent::_construct();

        if (!$this->getTemplate()) {
            $this->setTemplate('addressfinder/checkout/onepage/shipping.phtml');
        }
    }
}
