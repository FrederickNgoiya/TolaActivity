(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{RdLr:function(t,e,n){},YqHn:function(t,e,n){"use strict";n.r(e);n("55Il"),n("RdLr"),n("Rkej");function o(t){null!=t.getResponseHeader("Login-Screen")&&t.getResponseHeader("Login-Screen").length&&(window.location=js_context.loginUrl)}function a(t,e){return(t+="").length>=e?t:new Array(e-t.length+1).join(0)+t}$.ajaxSetup({crossDomain:!1,beforeSend:function(t,e){var n;n=e.type,/^(GET|HEAD|OPTIONS|TRACE)$/.test(n)||t.setRequestHeader("X-CSRFToken",function(t){var e=null;if(document.cookie&&""!=document.cookie)for(var n=document.cookie.split(";"),o=0;o<n.length;o++){var i=jQuery.trim(n[o]);if(i.substring(0,t.length+1)==t+"="){e=decodeURIComponent(i.substring(t.length+1));break}}return e}("csrftoken"))},success:function(t,e,n){o(n)},error:function(t){o(t)}}),$(document).ajaxStart(function(){$("#ajaxloading").show()}).ajaxStop(function(){$("#ajaxloading").hide()}).ajaxError(function(t,e,n,o){if(!0===n.suppressErrors);else if(4===e.readyState){var i="".concat(e.status,": ").concat(e.statusText);403===e.status?s(js_context.strings.permissionError,js_context.strings.permissionErrorDescription):s(js_context.strings.serverError,i)}else 0===e.readyState?s(js_context.strings.networkError,js_context.strings.networkErrorTryAgain):s(js_context.strings.unknownNetworkError,e.statusText)}),Date.prototype.toISODate||(Date.prototype.toISODate=function(){return this.getFullYear()+"-"+("0"+(this.getMonth()+1)).slice(-2)+"-"+("0"+this.getDate()).slice(-2)}),window.isDate=function(t){var e=new Date(t);if("Invalid Date"==e)return!1;var n=(new Date).getFullYear();return!(e.getFullYear()>n+100||e.getFullYear()<1980)},window.formatDate=function(e){var n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0;if(null==e||null==e||0==e.length||"undefined"==e||"null"==e)return"";try{var t=new Date(e),o=t.getTimezoneOffset();return 0<t.getHours()&&t.setMinutes(t.getMinutes()+o),t.getFullYear()+"-"+a(t.getMonth()+1,2)+"-"+a(0==n?t.getDate():n,2)}catch(t){try{var i=e.split("-");return i[0]+"-"+a(parseInt(i[1]),2)+"-"+a(0==n?i[2]:n,2)}catch(t){return e==e}}},window.localDateFromISOStr=function(t){var e=t.split("-").map(function(t){return parseInt(t)});return new Date(e[0],e[1]-1,e[2])},window.localdate=function(){var t=new Date;return t.setHours(0,0,0,0),t};var i="numeric",r={year:i,month:"short",day:i};function s(t,e){PNotify.alert({text:e,title:t,hide:!1,type:"error"})}window.mediumDateFormatStr=function(t){var e=window.userLang;return new Intl.DateTimeFormat(e,r).format(t)},$(function(){var t=document.location.hash;t&&$('.nav-tabs a[href="'+t+'"]').tab("show"),$('a[data-toggle="tab"]').on("show.bs.tab",function(t){window.location.hash=t.target.hash}),$('[data-toggle="popover"]').popover({html:!0}),$('[data-toggle="popover"]').on("click",function(t){t.preventDefault()})}),$(function(){$('[data-toggle="tooltip"]').tooltip()}),$(document).ready(function(){$(".datepicker").datepicker({dateFormat:"yy-mm-dd"})}),window.createAlert=function(t,e,n,o){null==o&&(o="#messages"),$(o).append($("<div class='alert alert-"+t+" dynamic-alert alert-dismissable' style='margin-top:0;'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button><p>"+e+"</p></div>")),1==n&&$(".dynamic-alert").delay(5e3).fadeOut("slow",function(){$(this).remove()})},$(function(){PNotify.defaults.styling="bootstrap4",PNotify.defaults.icons="fontawesome5",PNotify.modules.Buttons.defaults.closerHover=!1,PNotify.modules.Buttons.defaults.sticker=!1}),window.notifyError=s,$(document).ready(function(){$(document).on("hidden.bs.modal",".modal",function(){$(".modal:visible").length&&$(document.body).addClass("modal-open")})}),window.newPopup=function(t,e){return window.open(t,e,"height=768,width=1366,left=1200,top=10,titlebar=no,toolbar=no,menubar=no,location=no,directories=no,status=no")};var b=gettext("Your changes will be recorded in a change log. For future reference, please share your rationale for these changes."),p=gettext("Your changes will be recorded in a change log. For future reference, please share your rationale for these changes."),w=gettext("This action cannot be undone"),y=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=(t.message_text,t.on_submit),i=void 0===e?function(){}:e,n=t.on_cancel,o=void 0===n?function(){}:n,a=t.confirm_text,r=void 0===a?"Ok":a,s=t.cancel_text,c=void 0===s?"Cancel":s,l=t.type,d=void 0===l?"notice":l,u=t.inner,v=void 0===u?"":u,f=t.context,g=void 0===f?null:f,m=t.rationale_required,p=void 0===m||m,h=t.showCloser,w=void 0!==h&&h;PNotify.alert({text:$('<div><form action="" method="post" class="form container">'.concat(v,"</form></div>")).html(),textTrusted:!0,icon:!1,width:"350px",hide:!1,type:d,addClass:"program-page__rationale-form",stack:{overlayClose:!0,dir1:"right",dir2:"up",firstpos1:0,firstpos2:0,context:g},modules:{Buttons:{closer:w,closerHover:!1,sticker:!1},Confirm:{confirm:!0,buttons:[{text:r,primary:!0,addClass:"error"==d?"btn-danger":"",click:function(t){var e=!0,n=$(t.refs.elem).find('textarea[name="rationale"]'),o=n.val();if(n.parent().find(".invalid-feedback").remove(),!o&&p)return n.addClass("is-invalid"),n.parent().append('<div class="invalid-feedback">'+gettext("Rationale is required.")+"</div>"),!1;n.removeClass("is-invalid"),i&&void 0===(e=i(o))&&(e=!0),e&&t.close()}},{text:c,click:function(t){close=o(),void 0===close&&(close=!0),close&&t.close()}}]}}})};window.create_destructive_changeset_notice=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=t.message_text,n=void 0===e?b:e,o=t.on_submit,i=void 0===o?function(){}:o,a=t.on_cancel,r=void 0===a?function(){}:a,s=t.is_indicator,c=void 0!==s&&s,l=t.confirm_text,d=void 0===l?"Ok":l,u=t.cancel_text,v=void 0===u?"Cancel":u,f=t.context,g=void 0===f?null:f,m=t.no_preamble,p=void 0!==m&&m,h=t.showCloser,w=void 0!==h&&h;n||(n=b);var x=p?"":"<span class='text-danger'>".concat(gettext("This action cannot be undone."),"</span>"),_='\n        <div class="row">\n            <div class="col">\n                <h2 class="text-danger">'.concat(gettext("Warning"),'</h2>\n            </div>\n        </div>\n        <div class="row">\n            <div class="col">\n                ').concat(x,"\n                ").concat(n,'\n            </div>\n        </div>\n        <div class="row">\n            <div class="col">\n                <div class="form-group">\n                    <textarea class="form-control" name="rationale"></textarea>\n                </div>\n            </div>\n        </div>\n    ');return y({message_text:n,on_submit:i,on_cancel:r,is_indicator:c,confirm_text:d,cancel_text:v,type:"error",inner:_,context:g,showCloser:w})},window.create_nondestructive_changeset_notice=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=t.message_text,n=void 0===e?p:e,o=t.on_submit,i=void 0===o?function(){}:o,a=t.on_cancel,r=void 0===a?function(){}:a,s=t.is_indicator,c=void 0!==s&&s,l=t.confirm_text,d=void 0===l?"Ok":l,u=t.cancel_text,v=void 0===u?"Cancel":u,f=t.context,g=void 0===f?null:f;n||(n=p);var m='\n        <div class="row">\n            <div class="col">\n                <h2>'.concat(gettext("Share Your Rationale"),'</h2>\n            </div>\n        </div>\n        <div class="row">\n            <div class="col">\n                ').concat(n,'\n            </div>\n        </div>\n        <div class="row">\n            <div class="col">\n                <div class="form-group">\n                    <textarea class="form-control" name="rationale"></textarea>\n                </div>\n            </div>\n        </div>\n    ');return y({message_text:n,on_submit:i,on_cancel:r,is_indicator:c,confirm_text:d,cancel_text:v,type:"notice",inner:m,context:g})},window.create_no_rationale_changeset_notice=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=t.message_text,n=void 0===e?w:e,o=t.on_submit,i=void 0===o?function(){}:o,a=t.on_cancel,r=void 0===a?function(){}:a,s=t.is_indicator,c=void 0!==s&&s,l=t.confirm_text,d=void 0===l?"Ok":l,u=t.cancel_text,v=void 0===u?"Cancel":u,f=t.context,g=void 0===f?null:f,m=t.preamble,p=void 0!==m&&m;n||(n=w),p||(p=gettext("This action cannot be undone."));var h='\n        <div class="row">\n            <div class="col">\n                <h2><i class="fas fa-exclamation-triangle"></i>'.concat(gettext("Warning"),'</h2>\n            </div>\n        </div>\n        <div class="row">\n            <div class="col">\n                <span class=\'text-danger\'>\n                    ').concat(p,'\n                </span>\n            </div>\n        </div>\n        <div class="row">\n            <div class="col">\n                <span>\n                    ').concat(n,"\n                </span>\n            </div>\n        </div>\n    ");return y({message_text:n,on_submit:i,on_cancel:r,is_indicator:c,confirm_text:d,cancel_text:v,type:"error",inner:h,context:g,rationale_required:!1,showCloser:!0})}}},[["YqHn",0,1]]]);