(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"+uhY":function(e,t,r){"use strict";r.r(t);var n,o,a=r("q1tI"),i=r.n(a),l=r("i8i4"),s=r.n(l),u=r("okNM"),c=r("wgi2"),p=r("0pHI"),m=r("2vnA"),f=r("v38i");function d(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function g(r,n,e,t,a){var l={};return Object.keys(t).forEach(function(e){l[e]=t[e]}),l.enumerable=!!l.enumerable,l.configurable=!!l.configurable,("value"in l||l.initializer)&&(l.writable=!0),l=e.slice().reverse().reduce(function(e,t){return t(r,n,e)||e},l),a&&void 0!==l.initializer&&(l.value=l.initializer?l.initializer.call(a):void 0,l.initializer=void 0),void 0===l.initializer&&(Object.defineProperty(r,n,l),l=null),l}var v=(o=g((n=function(){function l(){var e,t,r,n,a=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,l),t="groupBy",n=e=this,(r=o)&&Object.defineProperty(e,t,{enumerable:r.enumerable,configurable:r.configurable,writable:r.writable,value:r.initializer?r.initializer.call(n):void 0}),this.routes=[{name:"logframe",path:"/:programId<\\d+>/logframe/?groupby",defaultParams:{groupby:1}},{name:"logframe-excel",path:"/:programId<\\d+>/logframe_excel/?groupby"}],this.updateState=function(e){var t=e.route;e.prevRoute;a.groupBy=t.params.groupby},this.router=Object(c.b)(this.routes,{trailingSlashMode:"always"}),this.router.usePlugin(Object(p.a)({useHash:!1,base:"/program"})),this.router.subscribe(this.updateState),this.router.start(),this.headerColumns=[gettext("Result level"),gettext("Indicators"),gettext("Means of verification"),gettext("Assumptions")]}var e,t,r;return e=l,(t=[{key:"setGroupBy",value:function(e){e=parseInt(e);var t=this.router.getState(),r=t.name,n=t.params;[f.c,f.d].includes(e)&&(n.groupby=e),this.router.navigate(r,n,{reload:!0})}},{key:"programId",get:function(){return this.router.getState().params.programId||null}},{key:"excelUrl",get:function(){var e=this.router.getState(),t=(e.name,e.params);return this.router.buildUrl("logframe-excel",t)}}])&&d(e.prototype,t),r&&d(e,r),l}()).prototype,"groupBy",[m.n],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),g(n.prototype,"programId",[m.f],Object.getOwnPropertyDescriptor(n.prototype,"programId"),n.prototype),g(n.prototype,"excelUrl",[m.f],Object.getOwnPropertyDescriptor(n.prototype,"excelUrl"),n.prototype),n);function b(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function y(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var h=function e(t){y(this,e),this.pk=t.pk,this.level_order=t.level_order,this.level=t.level||!1,this.name=t.name,this.level_order_display=t.level_order_display,this.means_of_verification=t.means_of_verification,this.manualNumbering=!t.auto_number_indicators,this.number=t.number||!1},_=function e(t){y(this,e),this.pk=t.pk,this.display_name=t.display_name,this.level_depth=t.level_depth,this.ontology=t.ontology,this.display_ontology=t.display_ontology,this.indicators=[],t.indicators&&Array.isArray(t.indicators)&&(this.indicators=t.indicators.map(function(e){return new h(e)})),this.indicators.sort(function(e,t){return e.level_order<t.level_order?-1:t.level_order<e.level_order?1:0}),this.assumptions=t.assumptions,this.child_levels=t.child_levels||[]},x=function(){function n(e){var r=this;if(y(this,n),this._levelsByPk={},this._levelsByChain=[],this._levelsByTier=[],this._unassignedIndicators=[],this.getChildLevels=function(e){var t=[e];return r._levelsByPk[e].child_levels.forEach(function(e){t=t.concat(r.getChildLevels(e))}),t},this.getLevelsGroupedBy=function(e){return parseInt(e)===f.c?r._levelsByChain.map(function(e){return r._levelsByPk[e]}):parseInt(e)===f.d?r._levelsByTier.map(function(e){return r._levelsByPk[e]}):Object.values(r._levelsByPk)},this.name=e.name,this.results_framework=e.results_framework,this.results_framework_url=!!this.results_framework&&e.results_framework_url,this.program_page_url=e.program_page_url,this.rf_chain_sort_label=!!this.results_framework&&e.rf_chain_sort_label,e.unassigned_indicators&&Array.isArray(e.unassigned_indicators)&&(this._unassignedIndicators=e.unassigned_indicators.map(function(e){return new h(e)})),e.levels&&Array.isArray(e.levels)){e.levels.forEach(function(e){var t=new _(e);r._levelsByPk[t.pk]=t,r._levelsByChain.push(t.pk),r._levelsByTier.push(t.pk)}),this._levelsByTier.sort(function(e,t){return r._levelsByPk[e].level_depth<r._levelsByPk[t].level_depth?-1:r._levelsByPk[t].level_depth<r._levelsByPk[e].level_depth?1:r._levelsByPk[e].ontology<r._levelsByPk[t].ontology?-1:r._levelsByPk[t].ontology<r._levelsByPk[e].ontology?1:0});var t=[];this._levelsByChain.filter(function(e){return 1==r._levelsByPk[e].level_depth}).forEach(function(e){t=t.concat(r.getChildLevels(e))}),this._levelsByChain=t}}var e,t,r;return e=n,(t=[{key:"unassignedIndicators",get:function(){return this._unassignedIndicators&&0!=this._unassignedIndicators.length?this._unassignedIndicators:[]}}])&&b(e.prototype,t),r&&b(e,r),n}(),E=Object(u.b)("filterStore")(function(e){var t=e.filterStore,r=t.excelUrl?function(){window.open(t.excelUrl,"_blank")}:function(e){e.preventDefault()};return i.a.createElement("button",{type:"button",className:"btn btn-sm btn-secondary",onClick:r,disabled:!t.excelUrl},i.a.createElement("i",{className:"fas fa-download"})," Excel")}),w=Object(u.b)("dataStore")(function(e){var t=e.dataStore;return i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"logframe--header"},i.a.createElement("h1",{className:"page-title h2"},i.a.createElement("a",{href:t.program_page_url},t.name,":")," ",i.a.createElement("span",{className:"font-weight-normal text-muted text-nowrap"},gettext("Logframe")," ",i.a.createElement("small",null,i.a.createElement("i",{className:"fas fa-table"}))))),i.a.createElement(E,null))}),O=r("Ez0T"),k=Object(u.b)("dataStore","filterStore")(Object(u.c)(function(e){var t=e.dataStore,r=e.filterStore;return i.a.createElement("div",{className:"logframe__subheader"},t.results_framework&&i.a.createElement("a",{href:t.results_framework_url},i.a.createElement("i",{className:"fas fa-sitemap"})," ",gettext("View results framework")),t.results_framework&&i.a.createElement(O.b,{chainLabel:t.rf_chain_sort_label,value:r.groupBy,update:function(e){r.setGroupBy(e.target.value)},labelClass:"col-form-label text-append-colon",formGroupClass:"form-row inline-select"}))})),S=function(e){var t=e.label;return i.a.createElement("th",{className:"text-nowrap"},t)},j=function(e){var t=e.headers;return i.a.createElement("thead",null,i.a.createElement("tr",{className:"logframe__table__header"},t.map(function(e,t){return i.a.createElement(S,{label:e,key:t})})))};var P,C;gettext("Mercy Corps"),gettext("Goal"),gettext("Outcome"),gettext("Output"),gettext("Activity"),gettext("Department for International Development (DFID)"),gettext("Impact"),gettext("Outcome"),gettext("Output"),gettext("Input"),gettext("European Commission (EC)"),gettext("Overall Objective"),gettext("Specific Objective"),gettext("Purpose"),gettext("Result"),gettext("Activity"),gettext("USAID 1"),gettext("Goal"),gettext("Purpose"),gettext("Sub-Purpose"),gettext("Output"),gettext("Input"),gettext("USAID 2"),gettext("Strategic Objective"),gettext("Intermediate Result"),gettext("Sub-Intermediate Result"),gettext("Output"),gettext("Input"),gettext("USAID FFP"),gettext("Goal"),gettext("Purpose"),gettext("Sub-Purpose"),gettext("Intermediate Outcome"),gettext("Output");function B(e){return(B="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function I(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function N(e,t){return!t||"object"!==B(t)&&"function"!=typeof t?function(e){if(void 0!==e)return e;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}(e):t}function L(e){return(L=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function z(e,t){return(z=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function D(r,n,e,t,a){var l={};return Object.keys(t).forEach(function(e){l[e]=t[e]}),l.enumerable=!!l.enumerable,l.configurable=!!l.configurable,("value"in l||l.initializer)&&(l.writable=!0),l=e.slice().reverse().reduce(function(e,t){return t(r,n,e)||e},l),a&&void 0!==l.initializer&&(l.value=l.initializer?l.initializer.call(a):void 0,l.initializer=void 0),void 0===l.initializer&&(Object.defineProperty(r,n,l),l=null),l}var T=function(e){var t=e.name,r=e.rowCount;return i.a.createElement("td",{className:"logframe__cell--level",rowSpan:r<1?1:r},t)},A=function(e){var t,r=e.indicator,n=e.ontology;if(null==r)return i.a.createElement("td",{className:"logframe__cell--indicator"});var a,l=!1;return r.manualNumbering?l=!!r.number&&"".concat(r.number):(n||r.level_order_display)&&(l="".concat((a=n,a.split(".").slice(1).filter(function(e){return 0<e}).join("."))).concat(r.level_order_display)),t=l?"".concat(gettext("Indicator")," ").concat(l,": ").concat(r.name):r.name,i.a.createElement("td",{className:"logframe__cell--indicator"},t)},F=function(e){var t=e.indicator;return null==t?i.a.createElement("td",{className:"logframe__cell--means"}):i.a.createElement("td",{className:"logframe__cell--means"},t.means_of_verification)},G=function(e){var t=e.assumptions,r=e.rowCount;return i.a.createElement("td",{className:"logframe__cell--assumptions",rowSpan:r},t)},U=function(e){var r=e.level,t=r.indicators[0]||null,n=r.indicators.slice(1)||null,a=r.indicators.length;return i.a.createElement("tbody",{className:"logframe__level-set"},i.a.createElement("tr",null,i.a.createElement(T,{name:r.display_name,rowCount:a}),i.a.createElement(A,{indicator:t,ontology:r.ontology}),i.a.createElement(F,{indicator:t}),i.a.createElement(G,{assumptions:r.assumptions,rowCount:a})),n.map(function(e,t){return i.a.createElement("tr",{key:t},i.a.createElement(A,{indicator:e,ontology:r.ontology,key:"ind".concat(t)}),i.a.createElement(F,{indicator:e,key:"means".concat(t)}))}))},M=Object(u.b)("dataStore","filterStore")(P=Object(u.c)((D((C=function(e){function t(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),N(this,L(t).call(this,e))}var r,n,a;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&z(e,t)}(t,i.a.Component),r=t,(n=[{key:"render",value:function(){return i.a.createElement(i.a.Fragment,null,i.a.createElement(j,{headers:this.props.filterStore.headerColumns}),this.levels.map(function(e,t){return i.a.createElement(U,{level:e,key:t})}),this.unassignedLevel&&i.a.createElement(U,{level:this.unassignedLevel}))}},{key:"levels",get:function(){return this.props.dataStore.results_framework?this.props.dataStore.getLevelsGroupedBy(this.props.filterStore.groupBy):[]}},{key:"unassignedLevel",get:function(){return 0<this.props.dataStore.unassignedIndicators.length&&{display_name:gettext("Indicators unassigned to  a results framework level"),indicators:this.props.dataStore.unassignedIndicators,ontology:!1,assumptions:null}}}])&&I(r.prototype,n),a&&I(r,a),t}()).prototype,"levels",[m.f],Object.getOwnPropertyDescriptor(C.prototype,"levels"),C.prototype),D(C.prototype,"unassignedLevel",[m.f],Object.getOwnPropertyDescriptor(C.prototype,"unassignedLevel"),C.prototype),P=C))||P)||P,R=function(){return i.a.createElement(i.a.Fragment,null,i.a.createElement(k,null),i.a.createElement("table",{className:"logframe__table table table-sm table-bordered bg-white text-small"},i.a.createElement(M,null)))},q=new v,H=new x(jsContext);s.a.render(i.a.createElement(u.a,{filterStore:q,dataStore:H},i.a.createElement(w,null)),document.querySelector(".region-header")),s.a.render(i.a.createElement(u.a,{filterStore:q,dataStore:H},i.a.createElement(R,null)),document.querySelector("#id_div_content"))},Ez0T:function(e,t,r){"use strict";var n=r("q1tI"),l=r.n(n),o=r("y2Vs"),a=r("VCnP"),i=r.n(a),s=0;function u(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"id";return s++,"".concat(e).concat(s)}var c=r("v38i");function p(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},l=Object.keys(e);for(n=0;n<l.length;n++)r=l[n],0<=t.indexOf(r)||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)r=l[n],0<=t.indexOf(r)||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}function m(){return(m=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function f(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),n.forEach(function(e){d(t,e,r[e])})}return t}function d(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"d",function(){return g}),r.d(t,"a",function(){return v}),r.d(t,"c",function(){return h}),r.d(t,"b",function(){return _});var g=function(e){var t=u("react-select"),r=e.labelClasses||"col-form-label text-uppercase",n=e.formRowClasses||"form-row mb-3",a=e.selectClasses||"tola-react-select";return l.a.createElement("div",{className:n},l.a.createElement("label",{htmlFor:t,className:r},e.label),l.a.createElement(o.default,{onChange:e.update,value:e.value,id:t,className:a,isDisabled:e.disabled,options:e.options}))},v=function(e){var t=u("date-select"),r=e.options&&1==e.options.length&&void 0!==e.options[0].value?l.a.createElement("option",{value:e.options[0].value},e.options[0].label):e.options&&0<e.options.length&&e.options[0].options&&void 0!==e.options[0].options?e.options.map(function(e,t){return l.a.createElement("optgroup",{label:e.label,key:t},e.options.map(function(e){return l.a.createElement("option",{value:e.value,key:e.value},e.label)}))}):e.options.map(function(e,t){return l.a.createElement("option",{value:e.value,key:t},e.label)});return l.a.createElement("div",{className:"form-row mb-3"},l.a.createElement("label",{htmlFor:t,className:"col-form-label text-uppercase"},e.label),l.a.createElement("select",{className:"form-control",id:t,value:e.value,onChange:e.update,disabled:e.disabled},r))},b=function(e){var t=u("react-select"),r=e.formGroupClass||"form-row mb-3",n=e.labelClass||"col-form-label text-uppercase",a=e.selectClass||"form-control";return l.a.createElement("div",{className:r},l.a.createElement("label",{htmlFor:t,className:n},e.label),l.a.createElement("select",{onChange:e.update,value:e.value,id:t,className:a,disabled:e.disabled},e.options))},y=function(e){return""==e.children?l.a.createElement("div",null):l.a.createElement(l.a.Fragment,null,l.a.createElement("hr",{style:{margin:"3px 0px 0px 0px"}}),l.a.createElement("div",{className:"text-muted",style:{textTransform:"uppercase",paddingLeft:"4px",marginBottom:"2px"}},e.children))},h=function(e){var t=u("multiselect"),r=!e.options||0==e.options.length||1==e.options.length&&null===e.options[0].value,n=r?{getDropdownButtonLabel:function(){return gettext("None available")},isDisabled:!0,menuIsOpen:!1,options:[]}:{isMulti:!0,options:e.options,getDropdownButtonLabel:function(e){return e.value?Array.isArray(e.value)?0==e.value.length?gettext("None selected"):1==e.value.length?e.value[0].label:"".concat(e.value.length,"  ").concat(gettext("selected")):e.value.label:gettext("None selected")}},a={dropdownButton:function(e){return r?f({},e,{backgroundColor:"#E5E6E8",background:""}):e},option:function(e,t){return f({},e,{padding:"1px 12px",display:"inline-block"})},container:function(e,t){return f({},e,{backgroundColor:"#f5f5f5"})}};return l.a.createElement("div",{className:"form-row mb-2 tola-react-multiselect-row"},l.a.createElement("label",{htmlFor:t,className:"col-form-label text-uppercase"},e.label),l.a.createElement(i.a,m({id:t,styles:a,formatOptionLabel:function(e){return l.a.createElement("div",{style:{display:"inline-block",float:"right",width:"90%"}},e.label)},components:{GroupHeading:y},value:e.value,onChange:e.update},n)))},_=function(e){var t=e.chainLabel,r=p(e,["chainLabel"]),n=[l.a.createElement("option",{value:c.c,key:1},t),l.a.createElement("option",{value:c.d,key:2},gettext("by Level"))];return l.a.createElement(b,m({label:gettext("Group indicators"),options:n},r))}},v38i:function(e,t,r){"use strict";r.d(t,"a",function(){return n}),r.d(t,"b",function(){return a}),r.d(t,"j",function(){return l}),r.d(t,"g",function(){return o}),r.d(t,"i",function(){return i}),r.d(t,"e",function(){return s}),r.d(t,"k",function(){return u}),r.d(t,"h",function(){return c}),r.d(t,"c",function(){return p}),r.d(t,"d",function(){return m}),r.d(t,"f",function(){return f});var n={value:null,label:"---------"},a="—",l=1,o=2,i=[3,4,5,6,7],s=[1,2],u=Object.freeze({1:gettext("Life of Program (LoP) only"),2:gettext("Midline and endline"),3:gettext("Annual"),4:gettext("Semi-annual"),5:gettext("Tri-annual"),6:gettext("Quarterly"),7:gettext("Monthly")}),c=Object.freeze({3:gettext("Years"),4:gettext("Semi-annual periods"),5:gettext("Tri-annual periods"),6:gettext("Quarters"),7:gettext("Months")}),p=1,m=2;"undefined"!=typeof gettext&&gettext;var f=Object.freeze({noFilter:0,missingTarget:1,missingResults:2,missingEvidence:3,aboveTarget:5,belowTarget:6,onTarget:7})}},[["+uhY",0,1]]]);