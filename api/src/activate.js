import $ from 'jquery';

const activate = async (basename, data) => {
    const searchParams = new URLSearchParams();
    searchParams.append('action', `activate_${basename}`);

    return new Promise((resolve) => {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: ajaxurl + '?' + searchParams.toString(),
            data
        }).done(response => {
            return resolve(response);
        }).fail((jqXHR) => {
            return resolve({
                success: false,
                error: {
                    code: 'general_error',
                    status: jqXHR.status,
                    message: jqXHR.statusText
                }
            });
        })
    });
}

export default activate;