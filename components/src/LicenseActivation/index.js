import React from 'react';
import {useState, useCallback} from 'react';
import {Button} from '@wordpress/components';
import {activate, deactivate} from '@paidcommunities-wp/api';
import swal from 'sweetalert';
import classnames from 'classnames';

export default function LicenseActivation(
    {
        config,
        className = ''
    }) {
    if (!config) {
        throw new Error('A config object is required.');
    }
    const [licenseKey, setLicenseKey] = useState('');
    const [license, setLicense] = useState(config.license)
    const [processing, setProcessing] = useState(false);
    const {
        i18n,
        slug,
        nonce
    } = config;

    const onChange = event => setLicenseKey(event.target.value);

    const onActivate = useCallback(async () => {
        setProcessing(true);
        try {
            const data = {
                nonce,
                license_key: licenseKey
            };
            const response = await activate(slug, data);
            if (!response.success) {
                addNotice(i18n, response.error, 'error');
            } else {
                addNotice(i18n, response.data.notice, 'success');
                setLicense(response.data.license);
            }
        } catch (error) {
            addNotice(i18n, error, 'error');
        } finally {
            setProcessing(false);
        }
    }, [licenseKey]);

    const onDeactivate = useCallback(async () => {
        setProcessing(true);
        try {
            const response = await deactivate(slug, {nonce});
            if (!response.success) {
                addNotice(i18n, response.error, 'error');
            } else {
                addNotice(i18n, response.data.notice, 'success');
                setLicense(response.data.license);
                setLicenseKey('');
            }
        } catch (error) {
            addNotice(i18n, error, 'error');
        } finally {
            setProcessing(false);
        }
    }, []);

    return (
        <div className={classnames('PaidCommunitiesLicense-settings', className)}>
            <div className="PaidCommunitiesGrid-root">
                <div className="PaidCommunitiesGrid-item">
                    <div className="PaidCommunitiesStack-root LicenseKeyOptionGroup">
                        <label className="PaidCommunitiesLabel-root">{i18n.licenseKey}</label>
                        <div className={classnames('PaidCommunitiesInputBase-root', {
                            'LicenseRegistered': license.registered
                        })}>
                            {license.registered &&
                                <input className="PaidCommunitiesInput-text LicenseKey"
                                       type={'text'}
                                       disabled
                                       value={license.license_key}/>
                            }
                            {!license.registered &&
                                <input
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
                                onClick={onDeactivate}>
                            </Button>
                        }
                        {!license.registered &&
                            <Button
                                className={'PaidCommunitiesButton-root'}
                                variant={'secondary'}
                                text={processing ? i18n.activateMsg : i18n.activateLicense}
                                isBusy={processing}
                                disabled={processing}
                                onClick={onActivate}/>
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