import $ from 'jquery';
import swal from 'sweetalert';
import {activate, deactivate} from '@paidcommunities-wp/api';

const handleButtonClick = async e => {
    e.preventDefault();
    let response;
    let $button = $(e.currentTarget);
    const props = $button.data('paidcommunities-props');
    const {
        nonce,
        basename,
        formattedBasename
    } = props;

    let text = $button.text();
    try {
        $button.prop('disabled', true).addClass('updating-message');
        if ($button.hasClass('ActivateLicense')) {

            $button.text(props.i18n.activateMsg);

            const data = {
                nonce,
                license_key: $(`#${formattedBasename}-license_key`).val()
            }

            response = await activate(basename, data);

        } else {
            $button.text(props.i18n.deactivateMsg);

            response = await deactivate(basename, {nonce});
        }
        if (!response.success) {
            addNotice(props.i18n, response.error, 'error');
        } else {
            addNotice(props.i18n, response.data.notice, 'success');
            $button.closest('.PaidCommunitiesLicense-settings').replaceWith(response.data.html);
        }
    } catch (error) {
        return addNotice(props.i18n, error);
    } finally {
        $button.prop('disabled', false);
        $button.text(text).removeClass('updating-message');
    }
}

const addNotice = (i18n, notice, type) => {
    swal(i18n[notice.code], notice.message, type);
}

$(document.body).on('click', '.ActivateLicense', handleButtonClick);
$(document.body).on('click', '.DeactivateLicense', handleButtonClick);