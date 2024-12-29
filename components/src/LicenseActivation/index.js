import React from 'react';
import {useState, useCallback} from 'react';
import {Button} from '@wordpress/components';
import {activate, deactivate} from '@paidcommunities-wp/api';
import swal from 'sweetalert';
import classnames from 'classnames';

export default function LicenseActivation(
    {
        config,
        className = '',
        onActivate = activate,
        onDeactivate = deactivate
    }) {
    if (!config) {
        throw new Error('A config object is required.');
    }
    const [licenseKey, setLicenseKey] = useState('');
    const [license, setLicense] = useState(config.license)
    const [processing, setProcessing] = useState(false);
    const {
        i18n,
        basename,
        nonce
    } = config;

    const onChange = event => setLicenseKey(event.target.value);

    const onClick = useCallback(type => async () => {
        setProcessing(true);
        try {
            let response;
            switch (type) {
                case 'activate':
                    const data = {
                        nonce,
                        license_key: licenseKey
                    };
                    response = await onActivate(basename, data);
                    if (!response.success) {
                        addNotice(i18n, response.error, 'error');
                    } else {
                        addNotice(i18n, response.data.notice, 'success');
                        setLicense(response.data.license);
                    }
                    break;
                case 'deactivate':
                    response = await onDeactivate(basename, {nonce});
                    if (!response.success) {
                        addNotice(i18n, response.error, 'error');
                    } else {
                        addNotice(i18n, response.data.notice, 'success');
                        setLicense(response.data.license);
                        setLicenseKey('');
                    }
                    break;
            }
        } catch (error) {
            addNotice(i18n, error, 'error');
        } finally {
            setProcessing(false);
        }
    }, [licenseKey]);


    return (
        <div className={classnames('PaidCommunitiesLicense-settings', className)}>
            <div className="PaidCommunitiesGrid-root">
                <div className="PaidCommunitiesGrid-item">
                    <div className="PaidCommunitiesStack-root LicenseKeyOptionGroup">
                        <label className="PaidCommunitiesLabel-root">{i18n.licenseKey}</label>
                        <div className={classnames('PaidCommunitiesInputBase-root', {
                            'LicenseStatus-active': license.status === 'active',
                            'LicenseStatus-inactive': license.status === 'inactive'
                        })}>
                            {license.registered &&
                                <input
                                    type={"text"}
                                    className="PaidCommunitiesInput-text LicenseKey"
                                    type={'text'}
                                    disabled
                                    value={license.license_key}/>
                            }
                            {!license.registered &&
                                <input
                                    type={"text"}
                                    className="PaidCommunitiesInput-text LicenseKey"
                                    value={licenseKey}
                                    onChange={onChange}
                                />
                            }
                        </div>
                        {license.registered &&
                            <Button
                                className={'PaidCommunitiesButton-root'}
                                variant={'secondary'}
                                text={processing ? i18n.deactivateMsg : i18n.deactivateLicense}
                                isBusy={processing}
                                disabled={processing}
                                onClick={onClick('deactivate')}>
                            </Button>
                        }
                        {!license.registered &&
                            <Button
                                className={'PaidCommunitiesButton-root'}
                                variant={'secondary'}
                                text={processing ? i18n.activateMsg : i18n.activateLicense}
                                isBusy={processing}
                                disabled={processing}
                                onClick={onClick('activate')}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

const addNotice = (i18n, notice, type) => {
    swal(i18n[notice.code], notice.message, type);
}