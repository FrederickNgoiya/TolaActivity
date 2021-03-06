// Run the app's SCSS through webpack
import '@babel/polyfill'
import '../scss/tola.scss';
import 'react-virtualized/styles.css'


/*
 * Moved legacy app.js code here - Contains global functions called by template code
 * along with global setup to be performed on every page
 *
 * If you decide to add a new function to this grab bag, and want to call it from Django
 * template code, make sure to add it to the `window` obj to make it globally accessible
 */


/*
 * Global AJAX handlers for CSRF handling and redirection on logout for AJAX requests
 */
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

function redirectToLoginOnLoginScreenHeader(jqxhr) {
    if (jqxhr.getResponseHeader("Login-Screen") != null && jqxhr.getResponseHeader("Login-Screen").length) {
        // Not logged in - the 302 redirect is implicit and jQuery has no way to know it happened
        // check special header set by our login view to see if that's where we ended up
        window.location = js_context.loginUrl;
    }
}

/*
 * Set the csrf header before sending the actual ajax request
 * while protecting csrf token from being sent to other domains
 *
 * Attach to success/error here instead of ajaxSuccess()/ajaxError() below
 * as these take priority and will not fail to run if an exception is
 * thrown in the app code handler
 */
$.ajaxSetup({
    crossDomain: false, // obviates need for sameOrigin test
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type)) {
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
        }
    },
    success: function(data, status, jqxhr) {
        redirectToLoginOnLoginScreenHeader(jqxhr);
    },
    error: function(jqxhr) {
        redirectToLoginOnLoginScreenHeader(jqxhr);
    }
});


/*
 * Global AJAX handlers for indicating a request in progress + error reporting
 */
$( document )
    .ajaxStart( function() {
        $('#ajaxloading').show();
    })
    .ajaxStop( function() {
        $('#ajaxloading').hide();
    })
    .ajaxError(function( event, jqxhr, settings, thrownError ) {
        if (settings.suppressErrors === true) {
            //do nothing
        } else {
            if (jqxhr.readyState === 4) {
                // HTTP error (can be checked by XMLHttpRequest.status and XMLHttpRequest.statusText)
                // TODO: Give better error mssages based on HTTP status code
                let errorStr = `${jqxhr.status}: ${jqxhr.statusText}`;

                if (jqxhr.status === 403) {
                    // Permission denied
                    notifyError(js_context.strings.permissionError, js_context.strings.permissionErrorDescription);
                } else {
                    // all other errors
                    notifyError(js_context.strings.serverError, errorStr);
                }
            }
            else if (jqxhr.readyState === 0) {
                // Network error (i.e. connection refused, access denied due to CORS, etc.)
                notifyError(js_context.strings.networkError, js_context.strings.networkErrorTryAgain);
            }
            else {
                // something weird is happening
                notifyError(js_context.strings.unknownNetworkError, jqxhr.statusText);
            }
        }
    });



if (!Date.prototype.toISODate) {
  Date.prototype.toISODate = function() {
    return this.getFullYear() + '-' +
           ('0'+ (this.getMonth()+1)).slice(-2) + '-' +
           ('0'+ this.getDate()).slice(-2);
  }
}


function zeroPad(n, width) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(0) + n;
}

function isDate(dateVal) {
    /*
    var pattern = /^(\d{4})-(\d{2})-(\d{2})$/;
    var dateArray = dateVal.match(pattern);
    if (dateArray == null) return false;

    var currentYear = (new Date).getFullYear();
    var year = dateArray[1];
    var month = dateArray[2];
    var day = dateArray[3];
    if (year < 2010 || year > (currentYear+3)) return false;
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;
    return new Date(dateVal) === 'Invalid Date' ? false : true;
    */
    var date = new Date(dateVal);
    if (date == 'Invalid Date') {
        return false;
    }
    var currentYear = (new Date).getFullYear();
    if (date.getFullYear() > currentYear + 100 || date.getFullYear() < 1980 ) {
        return false;
    }
    return true;
}
window.isDate = isDate;

function formatDate(dateString, day=0) {
    // Returns an ISO formatted naive datestring
    // Use only to sanitize simplified date strings e.g. for hidden fields or data attributes
    // If you’re trying to format a date[string] for user display, you probably want something else
    if (dateString == null || dateString == undefined || dateString.length == 0 || dateString == 'undefined' || dateString == 'null' ) {
        return '';
    }
    try {
        var dateval = new Date(dateString);
        var tz = dateval.getTimezoneOffset();
        var hrs = dateval.getHours();
        if (hrs > 0) {
            // alert("offsetting timezone tz=" + tz + " hrs = " + hrs);
            dateval.setMinutes(dateval.getMinutes() + tz);
        }
        var year = dateval.getFullYear()
        var month = zeroPad((dateval.getMonth() + 1), 2);
        var paddedDay = zeroPad((day == 0 ? dateval.getDate() : day), 2);
        var ret = year + '-' + month + '-' + paddedDay
        return ret;
    } catch (err) {
        console.log(err);
        try {
            var dateArray = dateString.split('-');
            var year = dateArray[0];
            var month = zeroPad(parseInt(dateArray[1]), 2);
            var paddedDay = zeroPad((day == 0 ? dateArray[2] : day), 2);
            var ret = year + '-' + month + '-' + paddedDay
            return ret
        }
        catch (err) {
            return dateString == (null ? '' : dateString);
        }
    }
}
window.formatDate = formatDate;

// "2017-01-01" -> Date with local timezone (not UTC)
function localDateFromISOStr(dateStr) {
    let dateInts = dateStr.split('-').map(function(x) {return parseInt(x)});
    return new Date(dateInts[0], dateInts[1]-1, dateInts[2]);
}
window.localDateFromISOStr = localDateFromISOStr;

// Return Date() with local timezone at midnight
function localdate() {
    let today = new Date();
    today.setHours(0,0,0,0);
    return today;
}
window.localdate = localdate;

const n = "numeric",
    s = "short",
    l = "long",
    d2 = "2-digit";


const DATE_MED = {
    year: n,
    month: s,
    day: n
};

// Date() -> "Oct 2, 2018" (localized)
// JS equiv of the Django template filter:   |date:"MEDIUM_DATE_FORMAT"
function mediumDateFormatStr(date) {
    const languageCode = window.userLang; // set in base.html by Django
    return new Intl.DateTimeFormat(languageCode, DATE_MED).format(date);
}
window.mediumDateFormatStr = mediumDateFormatStr;

/**
 *  updates session variables for the currently logged in user
 *  @param {Object} sessionVarsToUpdate - key value pairs of session variable name and updated value
 *  @param {function} [callback] - callback to run upon successful session update
 *  @returns {Promise} Promise object with the resutls of the ajax call
 */
function sendSessionVariableUpdate(sessionVarsToUpdate, callback=null) {
    let ajaxSettings = {
        url: '/update_user_session/',
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(sessionVarsToUpdate),
        processData: false
    };
    let updateRequest = $.ajax(ajaxSettings);
    if (callback) {
        updateRequest.done(callback);
    }
    return updateRequest;
}

$(function() {
     // Javascript to enable link to tab
    var hash = document.location.hash;
    if (hash) {
        $('.nav-tabs a[href="'+hash+'"]').tab('show');
    }

    // Change hash for page-reload
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
    window.location.hash = e.target.hash;
    });

    // Enable popovers
    $('[data-toggle="popover"]').popover({
        html: true
    })
    $('[data-toggle="popover"]').on('click', function(e){
        e.preventDefault();
    });
    
    /* specific actions tied to item-specific site-wide events here: */
    // in case of covid alert dismissal, update the session to clear it for the rest of this login session:
    $('#covid-banner-alert').on('close.bs.alert', function() {
        sendSessionVariableUpdate({show_covid_banner: false});
    });
});



//App specific JavaScript
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});

//custom jquery to trigger date picker, info pop-over and print category text
$(document).ready(function() {
    $('.datepicker').datepicker({ dateFormat: "yy-mm-dd" });
});


/*
 * Create and show a Bootstrap alert.
 */
function createAlert (type, message, fade, whereToAppend) {
    if (whereToAppend == undefined ){
        whereToAppend = "#messages";
    }
    $(whereToAppend).append(
        $(
            "<div class='alert alert-" + type + " dynamic-alert alert-dismissable' style='margin-top:0;'>" +
            "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>" +
            "<p>" + message + "</p>" +
            "</div>"
        )
    );
    if (fade == true) {
        // Remove the alert after 5 seconds if the user does not close it.
        $(".dynamic-alert").delay(5000).fadeOut("slow", function () { $(this).remove(); });
    }
}
window.createAlert = createAlert;


/* Configure PNotify global settings */
/* Do so on document ready since lib is included after app.js */
$(function() {
    PNotify.defaults.styling = 'bootstrap4'; // Bootstrap version 4
    PNotify.defaults.icons = 'fontawesome5'; // Font Awesome 5

    // Show close button and hide pin button
    PNotify.modules.Buttons.defaults.closerHover = false;
    PNotify.modules.Buttons.defaults.sticker = false;
});


/* Notifications */

function notifyError(title, msg) {
    PNotify.alert({
        text: msg,
        title: title,
        hide: false,
        type: 'error',
    });
}
window.notifyError = notifyError;


$(document).ready(function() {
    $(document).on('hidden.bs.modal', '.modal', function () {
        if ($('.modal:visible').length) {
            $(document.body).addClass('modal-open');
        } else {
            $(document.body).removeClass('modal-open');
        }
    });
});



/*
* Pop-up window for help docs and guidance on forms
*/

function newPopup(url, windowName) {
    return window.open(url,windowName,'height=768,width=1366,left=1200,top=10,titlebar=no,toolbar=no,menubar=no,location=no,directories=no,status=no');
}
window.newPopup = newPopup;

// EXAMPLE: <a onclick="newPopup('https://docs.google.com/document/d/1tDwo3m1ychefNiAMr-8hCZnhEugQlt36AOyUYHlPbVo/edit?usp=sharing','Form Help/Guidance'); return false;" href="#" class="btn btn-sm btn-info">Form Help/Guidance</a>

const DEFAULT_DESTRUCTIVE_MESSAGE = gettext("Your changes will be recorded in a change log. For future reference, please share your reason for these changes.")
const DEFAULT_NONDESTRUCTIVE_MESSAGE = gettext('Your changes will be recorded in a change log. For future reference, please share your reason for these changes.')
const DEFAULT_NO_RATIONALE_TEXT = gettext("This action cannot be undone");

// This is only until we get indicator_form_common_js moved to webpack and out of html (makemessages bug)
// these translation strings are used exclusively in the indicator setup form:
const target_with_results_text = (numResults) => {
    return interpolate(
        ngettext('Removing this target means that %s result will no longer have targets associated with it.',
                 'Removing this target means that %s results will no longer have targets associated with them.',
                 numResults),
        [numResults]);
}
window.target_with_results_text = target_with_results_text;


const create_changeset_notice = ({
    on_submit = () => {},
    on_cancel = () => {},
    // # Translators: Button to approve a form
    confirm_text = gettext('Ok'),
    // # Translators: Button to cancel a form submission
    cancel_text = gettext('Cancel'),
    type = 'notice',
    inner = '',
    context = null,
    rationale_required = true,
    showCloser = false,
} = {}) => {
    var notice = PNotify.alert({
        text: $(`<div><form action="" method="post" class="form container">${inner}</form></div>`).html(),
        textTrusted: true,
        icon: false,
        width: '350px',
        hide: false,
        type: type,
        addClass: 'program-page__rationale-form',
        stack: {
            'overlayClose': true,
            'dir1': 'right',
            'dir2': 'up',
            'firstpos1': 20,
            'firstpos2': 20,
            'context': context
        },
        modules: {
            Buttons: {
                closer: showCloser,
                closerHover: false,
                sticker: false
            },
            Confirm: {
                confirm: true,
                buttons: [
                    {
                        text: confirm_text,
                        primary: true,
                        addClass:(type == 'error')?'btn-danger':'',
                        click: function (notice) {
                            var close = true;
                            var textarea = $(notice.refs.elem).find('textarea[name="rationale"]')
                            var rationale = textarea.val();
                            textarea.parent().find('.invalid-feedback').remove();
                            if(!rationale && rationale_required) {
                                textarea.addClass('is-invalid');
                                textarea.parent().append(
                                    '<div class="invalid-feedback">'
                                    + gettext('A reason is required.')
                                    + '</div>'
                                );
                                return false;
                            } else {
                                textarea.removeClass('is-invalid');
                            }
                            if(on_submit) {
                                close = on_submit(rationale);
                                if(close === undefined) {
                                    close = true;
                                }
                            }
                            if(close) {
                                notice.close();
                            }
                        }
                    },
                    {
                        text: cancel_text,
                        click: function (notice) {
                            close = on_cancel()
                            if(close === undefined) {
                                close = true;
                            }

                            if(close) {
                                notice.close();
                            }
                        }
                    }
                ]
            }
        }
    });
    if (on_cancel) {
        notice.on('click', function(e) {
            if ($(e.target).is('.ui-pnotify-closer *')) {
                let close = on_cancel();
                if (close || close === undefined) {
                    notice.close();
                }
        }});
    }
}

window.create_destructive_changeset_notice = ({
    message_text = DEFAULT_DESTRUCTIVE_MESSAGE,
    on_submit = () => {},
    on_cancel = () => {},
    // # Translators: Button to approve a form
    confirm_text = gettext('Ok'),
    // # Translators: Button to cancel a form submission
    cancel_text = gettext('Cancel'),
    context = null,
    no_preamble = false,
    showCloser = false,
    preamble = false
} = {}) => {
    if(!message_text) {message_text = DEFAULT_DESTRUCTIVE_MESSAGE}
    if (!preamble) { preamble = (no_preamble)?'':`<span class='text-danger'>${gettext("This action cannot be undone.")}</span>`}
    const inner = `
        <div class="row">
            <div class="col">
                <h2 class="text-danger">${gettext("Warning")}</h2>
            </div>
        </div>
        <div class="row">
            <div class="col">
                ${preamble}
                ${message_text}
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="form-group">
                    <textarea class="form-control" name="rationale"></textarea>
                </div>
            </div>
        </div>
    `;
    return create_changeset_notice({
        message_text: message_text,
        on_submit: on_submit,
        on_cancel: on_cancel,
        confirm_text: confirm_text,
        cancel_text: cancel_text,
        type: 'error',
        inner: inner,
        context: context,
        showCloser: showCloser
    })
}

window.create_nondestructive_changeset_notice = ({
    message_text = DEFAULT_NONDESTRUCTIVE_MESSAGE,
    on_submit = () => {},
    on_cancel = () => {},
    // # Translators: Button to approve a form
    confirm_text = gettext('Ok'),
    // # Translators: Button to cancel a form submission
    cancel_text = gettext('Cancel'),
    context = null
} = {}) => {
    if(!message_text) {message_text = DEFAULT_NONDESTRUCTIVE_MESSAGE}
    const inner = `
        <div class="row">
            <div class="col">
                <h2>${gettext("Reason for change")}</h2>
            </div>
        </div>
        <div class="row">
            <div class="col">
                ${message_text}
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="form-group">
                    <textarea class="form-control" name="rationale"></textarea>
                </div>
            </div>
        </div>
    `;
    return create_changeset_notice({
        message_text: message_text,
        on_submit: on_submit,
        on_cancel: on_cancel,
        confirm_text: confirm_text,
        cancel_text: cancel_text,
        type: 'notice',
        inner: inner,
        context: context
    })
}

window.create_no_rationale_changeset_notice = ({
    message_text = DEFAULT_NO_RATIONALE_TEXT,
    on_submit = () => {},
    on_cancel = () => {},
    // # Translators: Button to approve a form
    confirm_text = gettext('Ok'),
    // # Translators: Button to cancel a form submission
    cancel_text = gettext('Cancel'),
    context = null,
    type = 'error',
    preamble = false,
} = {}) => {
    if (!message_text) {message_text = DEFAULT_NO_RATIONALE_TEXT}
    if (!preamble) {preamble = gettext("This action cannot be undone.")};
    const inner = `
        <div class="row">
            <div class="col">
                <h2 class="pnotify--header"><i class="fas fa-exclamation-triangle"></i>${gettext("Warning")}</h2>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <span class='text-danger'>
                    ${preamble}
                </span>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <span>
                    ${message_text}
                </span>
            </div>
        </div>
    `;
    return create_changeset_notice({
        message_text: message_text,
        on_submit: on_submit,
        on_cancel: on_cancel,
        confirm_text: confirm_text,
        cancel_text: cancel_text,
        type: type,
        inner: inner,
        context: context,
        rationale_required: false,
        showCloser: true
        });
}


const createPnotifyAlert = (passedInConfig) => {
    let config = {
        textTrusted: true,
        icon: false,
        width: '350px',
        hide: true,
        delay: 2000,
        type: 'alert',
    };
    Object.assign(config, passedInConfig);

    let faClass = "fa-exclamation-triangle";
    if (config.type == "success"){
        faClass = "fa-check-circle";
    }

    const inner = `
        <div class="row">
            <div class="col">
                <h2 class="pnotify--header"><i class="fas ${faClass}"></i>${gettext("Success!")}</h2>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <span class='text-success'>
                    ${config.preamble}
                </span>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <span>
                    ${config.message_text}
                </span>
            </div>
        </div>
    `;

    config.text = $(`<div><form action="" method="post" class="form container">${inner}</form></div>`).html();
    PNotify.alert(config);
};

window.success_notice = (userConfig) =>{
    let config = {
        message_text: "Update successful.",
        preamble: "",
        animation: "fade",
        type: "success",
    }
    Object.assign(config, userConfig);

    createPnotifyAlert(config);
};


/*
 * Take a jquery element and scroll the to the bottom of said element
 * The element should represent the top level element controlled by a scroll bar
 * One might think that is always 'html' but can also be a modal div overlay or possibly
 * a div with overflow: scroll
 */
function scrollToBottom($el) {
    let height = $el.prop('scrollHeight');
    $el.animate({ scrollTop: height }, 'slow');
}
window.scrollToBottom = scrollToBottom;
