import React from 'react';
import {createRoot} from 'react-dom/client';
import {components} from 'paidcommunities-wp';
import 'paidcommunities-wp/dist/styles.css';

const {
    LicenseActivation
} = components;

window.ajaxurl = '/wp-admin/admin-ajax.php';

const App = () => {
    return (
        <div>
            <LicenseActivation
                config={{
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
                }}/>
        </div>
    )
}

const root = createRoot(document.getElementById('app'));
root.render(<App/>);