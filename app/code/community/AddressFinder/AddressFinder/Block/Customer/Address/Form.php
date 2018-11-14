<?php

class AddressFinder_AddressFinder_Block_Customer_Address_Form extends AddressFinder_AddressFinder_Block_Abstract
{
    /**
     * {@inheritdoc}
     */
    protected function _construct()
    {
        parent::_construct();

        if (!$this->getTemplate()) {
            $this->setTemplate('addressfinder/customer/address/form.phtml');
        }
    }
}
