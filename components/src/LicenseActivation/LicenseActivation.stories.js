import React from 'react';
import {fn} from '@storybook/test';
import LicenseActivation from "./index";

import './styles.scss';

const CONFIG = {
    basename: 'test-plugin/test-plugin.php',
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
        onActivate: () => alert('activated'),
        onDeactivate: () => alert('activated'),
        apiService: {
            activate: () => ({
                success: true,
                data: {
                    notice: {
                        code: 'activate_success',
                        message: 'License key activated.'
                    },
                    license: {
                        status: 'active',
                        registered: true,
                        license_key: '***********************4pZMj6B5'
                    }
                }
            }),
            deactivate: () => ({
                success: true,
                data: {
                    notice: {
                        code: 'deactivate_success',
                        message: 'License key deactivated.'
                    },
                    license: {
                        status: '',
                        registered: false,
                        license_key: '***********************4pZMj6B5'
                    }
                }
            })
        }
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
                license_key: '***********************4pZMj6B5'
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
                license_key: '***********************4pZMj6B5'
            }
        }
    }
}