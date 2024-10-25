import React from 'react';
import {fn} from '@storybook/test';
import LicenseActivation from "./LicenseActivation";

import './styles.scss';

const CONFIG = {
    i18n: {
        licenseKey: 'License Key',
        deactivateMsg: 'Deactivating...',
        activateMsg: 'Activating...',
        deactivateLicense: 'Deactivate',
        activateLicense: 'Activate'
    },
    license: {
        registered: false
    }
}

export default {
    title: 'Example/LicenseActivation',
    component: LicenseActivation,
    argTypes: {
        config: {control: 'object'}
    },
    args: {
        onClick: fn()
    }
};

export const Default = (props) => {
    window.ajaxurl = '/wp-admin/admin-ajax.php';
    return <LicenseActivation {...props} />
}
Default.args = {
    config: CONFIG
};