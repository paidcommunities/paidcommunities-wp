import React from 'react';
import {fn} from '@storybook/test';
import LicenseActivation from "./index";

import './styles.scss';

const CONFIG = {
    i18n: {
        licenseKey: 'License Key',
        deactivateMsg: 'Deactivating...',
        activateMsg: 'Activating...',
        deactivateLicense: 'Deactivate',
        activateLicense: 'Activate',
        activate_success: 'Success!',
        deactivate_success: 'Success!',
        general_error: 'Activation error!'
    },
    license: {
        status: '',
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
        onActivate: () => ({
            success: true,
            data: {
                notice: {
                    code: 'activate_success',
                    message: 'License key activated.'
                },
                license: {
                    status: 'active',
                    registered: true,
                    license_key: '***********************CE5ED990'
                }
            }
        }),
        onDeactivate: () => ({
            success: true,
            data: {
                notice: {
                    code: 'deactivate_success',
                    message: 'License key deactivated.'
                },
                license: {
                    status: '',
                    registered: false,
                    license_key: '***********************CE5ED990'
                }
            }
        })
    }
};

export const Default = {
    args: {
        config: CONFIG
    }
}

export const Active = {
    args: {
        config: {
            ...CONFIG,
            license: {
                status: 'active',
                registered: true,
                license_key: '***********************CE5ED990'
            }
        }
    }
}

export const Inactive = {
    args: {
        config: {
            ...CONFIG,
            license: {
                status: 'inactive',
                registered: true,
                license_key: '***********************CE5ED990'
            }
        }
    }
}