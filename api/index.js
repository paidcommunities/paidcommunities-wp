import $ from 'jquery';

export const activate = async (slug, data) => {
    const searchParams = new URLSearchParams();
    searchParams.append('action', `activate_${slug}`);

    return new Promise((resolve) => {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: ajaxurl + '?' + searchParams.toString(),
            data
        }).done(response => {
            return resolve(response);
        }).fail((jqXHR) => {
            return resolve({});
        })
    });
}

export const deactivate = async (slug, data) => {
    const searchParams = new URLSearchParams();
    searchParams.append('action', `activate_${slug}`);

    return new Promise((resolve) => {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: ajaxurl + '?' + searchParams.toString(),
            data
        }).done(response => {
            return resolve(response);
        }).fail((jqXHR) => {
            return resolve({});
        })
    })
}