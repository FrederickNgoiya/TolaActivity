(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{RdLr:function(t,e,n){},YqHn:function(t,e,n){"use strict";n.r(e);n("55Il"),n("RdLr"),n("Rkej");function o(t){null!=t.getResponseHeader("Login-Screen")&&t.getResponseHeader("Login-Screen").length&&(window.location=js_context.loginUrl)}function i(t,e){return(t+="").length>=e?t:new Array(e-t.length+1).join(0)+t}$.ajaxSetup({crossDomain:!1,beforeSend:function(t,e){var n;n=e.type,/^(GET|HEAD|OPTIONS|TRACE)$/.test(n)||t.setRequestHeader("X-CSRFToken",function(t){var e=null;if(document.cookie&&""!=document.cookie)for(var n=document.cookie.split(";"),o=0;o<n.length;o++){var a=jQuery.trim(n[o]);if(a.substring(0,t.length+1)==t+"="){e=decodeURIComponent(a.substring(t.length+1));break}}return e}("csrftoken"))},success:function(t,e,n){o(n)},error:function(t){o(t)}}),$(document).ajaxStart(function(){$("#ajaxloading").show()}).ajaxStop(function(){$("#ajaxloading").hide()}).ajaxError(function(t,e,n,o){if(!0===n.suppressErrors);else if(4===e.readyState){var a="".concat(e.status,": ").concat(e.statusText);403===e.status?s(js_context.strings.permissionError,js_context.strings.permissionErrorDescription):s(js_context.strings.serverError,a)}else 0===e.readyState?s(js_context.strings.networkError,js_context.strings.networkErrorTryAgain):s(js_context.strings.unknownNetworkError,e.statusText)}),Date.prototype.toISODate||(Date.prototype.toISODate=function(){return this.getFullYear()+"-"+("0"+(this.getMonth()+1)).slice(-2)+"-"+("0"+this.getDate()).slice(-2)}),window.isDate=function(t){var e=new Date(t);if("Invalid Date"==e)return!1;var n=(new Date).getFullYear();return!(e.getFullYear()>n+100||e.getFullYear()<1980)},window.formatDate=function(e){var n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0;if(null==e||null==e||0==e.length||"undefined"==e||"null"==e)return"";try{var t=new Date(e),o=t.getTimezoneOffset();return 0<t.getHours()&&t.setMinutes(t.getMinutes()+o),t.getFullYear()+"-"+i(t.getMonth()+1,2)+"-"+i(0==n?t.getDate():n,2)}catch(t){try{var a=e.split("-");return a[0]+"-"+i(parseInt(a[1]),2)+"-"+i(0==n?a[2]:n,2)}catch(t){return e==e}}},window.localDateFromISOStr=function(t){var e=t.split("-").map(function(t){return parseInt(t)});return new Date(e[0],e[1]-1,e[2])},window.localdate=function(){var t=new Date;return t.setHours(0,0,0,0),t};var a="numeric",r={year:a,month:"short",day:a};function s(t,e){PNotify.alert({text:e,title:t,hide:!1,type:"error"})}window.mediumDateFormatStr=function(t){var e=window.userLang;return new Intl.DateTimeFormat(e,r).format(t)},$(function(){var t=document.location.hash;t&&$('.nav-tabs a[href="'+t+'"]').tab("show"),$('a[data-toggle="tab"]').on("show.bs.tab",function(t){window.location.hash=t.target.hash}),$('[data-toggle="popover"]').popover({html:!0}),$('[data-toggle="popover"]').on("click",function(t){t.preventDefault()})}),$(function(){$('[data-toggle="tooltip"]').tooltip()}),$(document).ready(function(){$(".datepicker").datepicker({dateFormat:"yy-mm-dd"})}),window.createAlert=function(t,e,n,o){null==o&&(o="#messages"),$(o).append($("<div class='alert alert-"+t+" dynamic-alert alert-dismissable' style='margin-top:0;'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button><p>"+e+"</p></div>")),1==n&&$(".dynamic-alert").delay(5e3).fadeOut("slow",function(){$(this).remove()})},$(function(){PNotify.defaults.styling="bootstrap4",PNotify.defaults.icons="fontawesome5",PNotify.modules.Buttons.defaults.closerHover=!1,PNotify.modules.Buttons.defaults.sticker=!1}),window.notifyError=s,$(document).ready(function(){$(document).on("hidden.bs.modal",".modal",function(){$(".modal:visible").length?$(document.body).addClass("modal-open"):$(document.body).removeClass("modal-open")})}),window.newPopup=function(t,e){return window.open(t,e,"height=768,width=1366,left=1200,top=10,titlebar=no,toolbar=no,menubar=no,location=no,directories=no,status=no")};var _=gettext("Your changes will be recorded in a change log. For future reference, please share your reason for these changes."),g=gettext("Your changes will be recorded in a change log. For future reference, please share your reason for these changes."),w=gettext("This action cannot be undone");window.target_with_results_text=function(t){return interpolate(ngettext("Removing this target means that %s result will no longer have targets associated with it.","Removing this target means that %s results will no longer have targets associated with them.",t),[t])};var y=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=t.on_submit,a=void 0===e?function(){}:e,n=t.on_cancel,o=void 0===n?function(){}:n,i=t.confirm_text,r=void 0===i?gettext("Ok"):i,s=t.cancel_text,c=void 0===s?gettext("Cancel"):s,l=t.type,d=void 0===l?"notice":l,u=t.inner,v=void 0===u?"":u,f=t.context,g=void 0===f?null:f,m=t.rationale_required,p=void 0===m||m,h=t.showCloser,w=void 0!==h&&h,x=PNotify.alert({text:$('<div><form action="" method="post" class="form container">'.concat(v,"</form></div>")).html(),textTrusted:!0,icon:!1,width:"350px",hide:!1,type:d,addClass:"program-page__rationale-form",stack:{overlayClose:!0,dir1:"right",dir2:"up",firstpos1:20,firstpos2:20,context:g},modules:{Buttons:{closer:w,closerHover:!1,sticker:!1},Confirm:{confirm:!0,buttons:[{text:r,primary:!0,addClass:"error"==d?"btn-danger":"",click:function(t){var e=!0,n=$(t.refs.elem).find('textarea[name="rationale"]'),o=n.val();if(n.parent().find(".invalid-feedback").remove(),!o&&p)return n.addClass("is-invalid"),n.parent().append('<div class="invalid-feedback">'+gettext("A reason is required.")+"</div>"),!1;n.removeClass("is-invalid"),a&&void 0===(e=a(o))&&(e=!0),e&&t.close()}},{text:c,click:function(t){close=o(),void 0===close&&(close=!0),close&&t.close()}}]}}});o&&x.on("click",function(t){if($(t.target).is(".ui-pnotify-closer *")){var e=o();(e||void 0===e)&&x.close()}})};window.create_destructive_changeset_notice=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=t.message_text,n=void 0===e?_:e,o=t.on_submit,a=void 0===o?function(){}:o,i=t.on_cancel,r=void 0===i?function(){}:i,s=t.confirm_text,c=void 0===s?gettext("Ok"):s,l=t.cancel_text,d=void 0===l?gettext("Cancel"):l,u=t.context,v=void 0===u?null:u,f=t.no_preamble,g=void 0!==f&&f,m=t.showCloser,p=void 0!==m&&m,h=t.preamble,w=void 0!==h&&h;n||(n=_),w||(w=g?"":"<span class='text-danger'>".concat(gettext("This action cannot be undone."),"</span>"));var x='\n        <div class="row">\n            <div class="col">\n                <h2 class="text-danger">'.concat(gettext("Warning"),'</h2>\n            </div>\n        </div>\n        <div class="row">\n            <div class="col">\n                ').concat(w,"\n                ").concat(n,'\n            </div>\n        </div>\n        <div class="row">\n            <div class="col">\n                <div class="form-group">\n                    <textarea class="form-control" name="rationale"></textarea>\n                </div>\n            </div>\n        </div>\n    ');return y({message_text:n,on_submit:a,on_cancel:r,confirm_text:c,cancel_text:d,type:"error",inner:x,context:v,showCloser:p})},window.create_nondestructive_changeset_notice=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=t.message_text,n=void 0===e?g:e,o=t.on_submit,a=void 0===o?function(){}:o,i=t.on_cancel,r=void 0===i?function(){}:i,s=t.confirm_text,c=void 0===s?gettext("Ok"):s,l=t.cancel_text,d=void 0===l?gettext("Cancel"):l,u=t.context,v=void 0===u?null:u;n||(n=g);var f='\n        <div class="row">\n            <div class="col">\n                <h2>'.concat(gettext("Reason for change"),'</h2>\n            </div>\n        </div>\n        <div class="row">\n            <div class="col">\n                ').concat(n,'\n            </div>\n        </div>\n        <div class="row">\n            <div class="col">\n                <div class="form-group">\n                    <textarea class="form-control" name="rationale"></textarea>\n                </div>\n            </div>\n        </div>\n    ');return y({message_text:n,on_submit:a,on_cancel:r,confirm_text:c,cancel_text:d,type:"notice",inner:f,context:v})},window.create_no_rationale_changeset_notice=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=t.message_text,n=void 0===e?w:e,o=t.on_submit,a=void 0===o?function(){}:o,i=t.on_cancel,r=void 0===i?function(){}:i,s=t.confirm_text,c=void 0===s?gettext("Ok"):s,l=t.cancel_text,d=void 0===l?gettext("Cancel"):l,u=t.context,v=void 0===u?null:u,f=t.type,g=void 0===f?"error":f,m=t.preamble,p=void 0!==m&&m;n||(n=w),p||(p=gettext("This action cannot be undone."));var h='\n        <div class="row">\n            <div class="col">\n                <h2 class="pnotify--header"><i class="fas fa-exclamation-triangle"></i>'.concat(gettext("Warning"),'</h2>\n            </div>\n        </div>\n        <div class="row">\n            <div class="col">\n                <span class=\'text-danger\'>\n                    ').concat(p,'\n                </span>\n            </div>\n        </div>\n        <div class="row">\n            <div class="col">\n                <span>\n                    ').concat(n,"\n                </span>\n            </div>\n        </div>\n    ");return y({message_text:n,on_submit:a,on_cancel:r,confirm_text:c,cancel_text:d,type:g,inner:h,context:v,rationale_required:!1,showCloser:!0})};window.success_notice=function(t){var e={message_text:"Update successful.",preamble:"",animation:"fade",type:"success"};Object.assign(e,t),function(t){var e={textTrusted:!0,icon:!1,width:"350px",hide:!0,delay:2e3,type:"alert"};Object.assign(e,t);var n="fa-exclamation-triangle";"success"==e.type&&(n="fa-check-circle");var o='\n        <div class="row">\n            <div class="col">\n                <h2 class="pnotify--header"><i class="fas '.concat(n,'"></i>').concat(gettext("Success!"),'</h2>\n            </div>\n        </div>\n        <div class="row">\n            <div class="col">\n                <span class=\'text-success\'>\n                    ').concat(e.preamble,'\n                </span>\n            </div>\n        </div>\n        <div class="row">\n            <div class="col">\n                <span>\n                    ').concat(e.message_text,"\n                </span>\n            </div>\n        </div>\n    ");e.text=$('<div><form action="" method="post" class="form container">'.concat(o,"</form></div>")).html(),PNotify.alert(e)}(e)},window.scrollToBottom=function(t){var e=t.prop("scrollHeight");t.animate({scrollTop:e},"slow")}}},[["YqHn",0,1]]]);