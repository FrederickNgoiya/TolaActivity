(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{QTZG:function(e,t,n){"use strict";n.r(t);var r,o,i=n("q1tI"),l=n.n(i),a=n("i8i4"),s=n.n(a),c=n("okNM"),u=(n("qtBC"),n("TSYQ"),n("2vnA")),p=n("7O5W"),f=(n("IP2g"),n("wHSu"));function m(e){return(m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function y(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function b(e,t,n){return t&&h(e.prototype,t),n&&h(e,n),e}function v(e,t){return!t||"object"!==m(t)&&"function"!=typeof t?d(e):t}function d(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function g(e){return(g=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function S(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&E(e,t)}function E(e,t){return(E=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}p.b.add(f.a,f.b);var O,w=function(e){function t(){return y(this,t),v(this,g(t).apply(this,arguments))}return S(t,l.a.Component),b(t,[{key:"render",value:function(){return l.a.createElement("span",{className:this.props.classes},this.props.tierName,this.props.ontologyLabel?" "+this.props.ontologyLabel:null,":")}}]),t}(),_=(Object(c.b)("rootStore")(r=Object(c.c)(r=function(e){function n(e){var t;return y(this,n),(t=v(this,g(n).call(this,e))).deleteLevel=t.deleteLevel.bind(d(d(t))),t.editLevel=t.editLevel.bind(d(d(t))),t}return S(n,l.a.Component),b(n,[{key:"deleteLevel",value:function(){document.getElementById(this.props.level.id)}},{key:"editLevel",value:function(){document.getElementById(this.props.level.id)}},{key:"render",value:function(){return l.a.createElement("div",{className:"levelcard-collapsed",id:this.props.level.id},l.a.createElement("div",{className:"levelcard-collapsed__name"},l.a.createElement("strong",null,l.a.createElement(w,{tierName:this.props.levelProps.tierName,ontologyLabel:this.props.levelProps.ontologyLabel,classes:null})),l.a.createElement("span",null," ",this.props.level.name)),l.a.createElement("div",{className:"levelcard-collapsed__rightbuttons"},l.a.createElement("div",{className:"topButtons",style:{display:"flex",justifyContent:"flex-end"}},this.props.levelProps.canDelete&&l.a.createElement("button",{className:"btn btn-sm btn-link btn-danger",onClick:this.deleteLevel},l.a.createElement("i",{className:"fas fa-trash-alt"})," ",gettext("Delete")),l.a.createElement("button",{className:"btn btn-sm btn-link btn-text",onClick:this.editLevel},l.a.createElement("i",{className:"fas fa-edit"})," ",gettext("Edit"))),l.a.createElement("div",{className:"bottomButtons",style:{display:"flex",justifyContent:"flex-end"}},l.a.createElement("button",{className:"btn btn-sm btn-link"},"Indicators"))))}}]),n}())||r),Object(c.b)("rootStore")(o=Object(c.c)(o=function(e){function n(e){var t;return y(this,n),(t=v(this,g(n).call(this,e))).onFormChange=t.onFormChange.bind(d(d(t))),t}return S(n,l.a.Component),b(n,[{key:"saveLevel",value:function(){document.getElementById(this.props.level.id)}},{key:"saveAndCreateChild",value:function(){document.getElementById(this.props.level.id)}},{key:"saveAndCreateSibling",value:function(){document.getElementById(this.props.level.id)}},{key:"onFormChange",value:function(e){this.props.level[e.target.name]=e.target.value}},{key:"render",value:function(){return l.a.createElement("div",{className:"levelcard-expanded",id:this.props.level.id},l.a.createElement("div",null,l.a.createElement(w,{tierName:this.props.levelProps.tierName,ontologyLabel:this.props.levelProps.ontologyLabel,classes:"levelcard-expanded__title"})),l.a.createElement("form",{className:"levelcard-expanded__form"},l.a.createElement("input",{type:"text",id:"level-name",name:"name",value:this.props.level.name||"",onChange:this.onFormChange}),l.a.createElement("label",{htmlFor:"assumptions"},"Assumptions"),l.a.createElement("input",{type:"text",id:"level-assumptions",name:"assumptions",value:this.props.level.assumptions||"",onChange:this.onFormChange}),l.a.createElement(j,null)))}}]),n}())||o)||o),j=function(e){function t(){return y(this,t),v(this,g(t).apply(this,arguments))}return S(t,l.a.Component),b(t,[{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement(k,{text:"Save and close"}),l.a.createElement(k,{text:"Save and another"}),l.a.createElement(k,{text:"Save and link"}))}}]),t}(),k=function(e){function t(){return y(this,t),v(this,g(t).apply(this,arguments))}return S(t,l.a.Component),b(t,[{key:"render",value:function(){return l.a.createElement("button",{className:this.props.classes},this.props.text)}}]),t}();function C(e){return(C="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function N(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function P(e,t){return!t||"object"!==C(t)&&"function"!=typeof t?function(e){if(void 0!==e)return e;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}(e):t}function L(e){return(L=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function T(e,t){return(T=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}p.b.add(f.a,f.b);var x,z,B=Object(c.b)("rootStore")(O=Object(c.c)(O=function(e){function r(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,r),P(this,L(r).apply(this,arguments))}var t,n,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&T(e,t)}(r,l.a.Component),t=r,(n=[{key:"render",value:function(){var n=this;return("initial"==this.props.renderList?this.props.rootStore.levels.filter(function(e){return null==e.parent}).sort(function(e){return e.customsort}):this.props.renderList.sort(function(e){return e.customsort})).map(function(t){var e=n.props.rootStore.levels.filter(function(e){return e.parent==t.id});return l.a.createElement("div",{key:t.id,className:"new-leveltier"},l.a.createElement(_,{level:t,levelProps:n.props.rootStore.levelProperties[t.id]}),0<e.length&&l.a.createElement(r,{rootStore:n.props.rootStore,renderList:e}))})}}])&&N(t.prototype,n),o&&N(t,o),r}())||O)||O,I=Object(c.c)(function(e){return l.a.createElement("div",{id:"level-list",style:{flexGrow:"2"}},l.a.createElement(B,{renderList:"initial"}))}),D=n("y2Vs");function F(e){return(F="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function A(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function R(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function q(e,t,n){return t&&R(e.prototype,t),n&&R(e,n),e}function J(e,t){return!t||"object"!==F(t)&&"function"!=typeof t?function(e){if(void 0!==e)return e;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}(e):t}function G(e){return(G=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function Q(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&Z(e,t)}function Z(e,t){return(Z=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var H,M,V,W,Y=Object(c.b)("rootStore")(x=Object(c.c)(x=function(e){function i(){var e,t;A(this,i);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(t=J(this,(e=G(i)).call.apply(e,[this].concat(r)))).handleChange=function(e){t.props.rootStore.changeTierSet(e.value)},t}return Q(i,l.a.Component),q(i,[{key:"render",value:function(){var e=Object.keys(this.props.rootStore.tierPresets).map(function(e){return{value:e,label:e}}),t={value:this.props.rootStore.chosenTierSet,label:this.props.rootStore.chosenTierSetName};return l.a.createElement("div",{className:"rfpicker__selectbox"},"Results framework template",l.a.createElement(D.default,{options:e,value:t,onChange:this.handleChange}))}}]),i}())||x)||x,K=function(e){function t(){return A(this,t),J(this,G(t).apply(this,arguments))}return Q(t,l.a.Component),q(t,[{key:"render",value:function(){return l.a.createElement("div",{className:"rfpicker__tierlist__tier"}," ",this.props.tierName," ")}}]),t}(),U=Object(c.b)("rootStore")(z=Object(c.c)(z=function(e){function t(){return A(this,t),J(this,G(t).apply(this,arguments))}return Q(t,l.a.Component),q(t,[{key:"render",value:function(){return l.a.createElement("div",{id:"leveltier-list",className:"rfpicker__tierlist"},0<this.props.rootStore.tierList.length?this.props.rootStore.tierList.map(function(e,t){return l.a.createElement(K,{key:t,tierName:e})}):null)}}]),t}())||z)||z,X=Object(c.c)(function(e){return l.a.createElement("div",{id:"leveltier-picker",className:"rfpicker"},l.a.createElement(Y,null),l.a.createElement(U,null))});function $(e,t,n,r){n&&Object.defineProperty(e,t,{enumerable:n.enumerable,configurable:n.configurable,writable:n.writable,value:n.initializer?n.initializer.call(r):void 0})}function ee(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function te(n,r,e,t,o){var i={};return Object.keys(t).forEach(function(e){i[e]=t[e]}),i.enumerable=!!i.enumerable,i.configurable=!!i.configurable,("value"in i||i.initializer)&&(i.writable=!0),i=e.slice().reverse().reduce(function(e,t){return t(n,r,e)||e},i),o&&void 0!==i.initializer&&(i.value=i.initializer?i.initializer.call(o):void 0,i.initializer=void 0),void 0===i.initializer&&(Object.defineProperty(n,r,i),i=null),i}var ne=(M=te((H=function(){function r(e,t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,r),$(this,"levels",M,this),$(this,"chosenTierSet",V,this),$(this,"chosenTierSetName",W,this),this.tierPresets={},this.levels=e.sort(function(e,t){return e.ontology<t.ontology?-1:t.ontology<e.ontology?1:0}),0<t.length&&(this.chosenTierSet=t,this.chosenTierSetName=this.derive_preset_name(t,n)),this.tierPresets=n,this.addChildLevel=this.addChildLevel.bind(this)}var e,t,n;return e=r,(t=[{key:"changeTierSet",value:function(e){this.chosenTierSetName=e}},{key:"addChildLevel",value:function(e){}},{key:"derive_preset_name",value:function(e,t){if(!e)return None;var n=e.sort(function(e){return e.tier_depth}).map(function(e){return e.name}),r=JSON.stringify(n);for(var o in t){if(e.length==t[o].length)if(r==JSON.stringify(t[o]))return o}return"Custom"}},{key:"tierList",get:function(){return this.chosenTierSet||this.chosenTierSetName?this.chosenTierSetName in this.tierPresets?this.tierPresets[this.chosenTierSetName]:this.chosenTierSet:[]}},{key:"levelProperties",get:function(){var r=this,o={},e=!0,t=!1,n=void 0;try{for(var i,l=function(){var t=i.value,e={};e.ontologyLabel=t.ontology.split(".").slice(1).filter(function(e){return 0<e}).join("."),e.tierName=r.tierList[t.get_level_depth-1];var n=r.levels.filter(function(e){return e.parent==t.id}).length;e.canDelete=0==n,o[t.id]=e},a=this.levels[Symbol.iterator]();!(e=(i=a.next()).done);e=!0)l()}catch(e){t=!0,n=e}finally{try{e||null==a.return||a.return()}finally{if(t)throw n}}return o}}])&&ee(e.prototype,t),n&&ee(e,n),r}()).prototype,"levels",[u.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),V=te(H.prototype,"chosenTierSet",[u.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),W=te(H.prototype,"chosenTierSetName",[u.l],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return""}}),te(H.prototype,"tierList",[u.e],Object.getOwnPropertyDescriptor(H.prototype,"tierList"),H.prototype),te(H.prototype,"levelProperties",[u.e],Object.getOwnPropertyDescriptor(H.prototype,"levelProperties"),H.prototype),te(H.prototype,"changeTierSet",[u.d],Object.getOwnPropertyDescriptor(H.prototype,"changeTierSet"),H.prototype),te(H.prototype,"addChildLevel",[u.d],Object.getOwnPropertyDescriptor(H.prototype,"addChildLevel"),H.prototype),H),re=jsContext,oe=new ne(re.levels,re.levelTiers,re.tierPresets);s.a.render(l.a.createElement(c.a,{rootStore:oe},l.a.createElement(l.a.Fragment,null,l.a.createElement(X,null),l.a.createElement(I,null))),document.querySelector("#level-builder-react-component"))},qtBC:function(e,t,n){"use strict";var r=n("7+Rn"),o=n.n(r)()();t.a=o}},[["QTZG",0,1]]]);