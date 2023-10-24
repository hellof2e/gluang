import e from"@babel/runtime/helpers/classPrivateFieldGet";import t from"@babel/runtime/helpers/classPrivateFieldSet";import r from"@babel/runtime/helpers/defineProperty";import n from"@babel/runtime/helpers/slicedToArray";import i from"@babel/runtime/helpers/classCallCheck";import o from"@babel/runtime/helpers/createClass";import s from"@babel/runtime/helpers/get";import a from"@babel/runtime/helpers/inherits";import u from"@babel/runtime/helpers/possibleConstructorReturn";import l from"@babel/runtime/helpers/getPrototypeOf";function c(e,t,r){!function(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}(e,t),t.set(e,r)}function f(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,t){if(!e)return;if("string"==typeof e)return h(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return h(e,t)}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,i=function(){};return{s:i,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,s=!0,a=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return s=e.done,e},e:function(e){a=!0,o=e},f:function(){try{s||null==r.return||r.return()}finally{if(a)throw o}}}}function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function v(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=l(e);if(t){var i=l(this).constructor;r=Reflect.construct(n,arguments,i)}else r=n.apply(this,arguments);return u(this,r)}}var p=function(e){return function(e){a(r,e);var t=v(r);function r(){var e;return i(this,r),(e=t.call(this))._observers=[],e.update(),e}return o(r,[{key:"update",value:function(){k.start(),s(l(r.prototype),"update",this).call(this),this._initStateObservers()}},{key:"_initStateObservers",value:function(){this._clearStateObservers(),this._addStateObservers(k.finish())}},{key:"_addStateObservers",value:function(e){var t,r=this,i=f(e);try{for(i.s();!(t=i.n()).done;){var o=n(t.value,2),s=o[0],a=o[1],u=function(){return r.requestUpdate()};this._observers.push([s,u]),s.addObserver(u,a)}}catch(e){i.e(e)}finally{i.f()}}},{key:"_clearStateObservers",value:function(){var e,t=f(this._observers);try{for(t.s();!(e=t.n()).done;){var r=n(e.value,2),i=r[0],o=r[1];i.removeObserver(o)}}catch(e){t.e(e)}finally{t.f()}this._observers=[]}}]),r}(e)},d=function(){function e(){i(this,e),r(this,"_observers",void 0),this._observers=[],this._initStateVars()}return o(e,[{key:"addObserver",value:function(e,t){this._observers.push({observer:e,keys:t})}},{key:"removeObserver",value:function(e){this._observers=this._observers.filter((function(t){return t.observer!==e}))}},{key:"_initStateVars",value:function(){if(this.constructor.stateVarOptions)for(var e=0,t=Object.entries(this.constructor.stateVarOptions);e<t.length;e++){var r=n(t[e],2),i=r[0],o=r[1];this._initStateVar(i,o)}if(this.constructor.stateVars)for(var s=0,a=Object.entries(this.constructor.stateVars);s<a.length;s++){var u=n(a[s],2),l=u[0],c=u[1];this._initStateVar(l,{}),this[l]=c}}},{key:"_initStateVar",value:function(e,t){var r=this;if(!this.hasOwnProperty(e)){var n=new((t=this._parseOptions(t)).handler)({options:t,recordRead:function(){return r._recordRead(e)},notifyChange:function(){return r._notifyChange(e)}});Object.defineProperty(this,e,{get:function(){return n.get()},set:function(e){n.shouldSetValue(e)&&n.set(e)},configurable:!0,enumerable:!0})}}},{key:"_parseOptions",value:function(e){return e.handler?e.propertyMethod&&"method"===e.propertyMethod.kind&&Object.assign(e,e.propertyMethod.descriptor.value.call(this)):e.handler=y,e}},{key:"_recordRead",value:function(e){k.recordRead(this,e)}},{key:"_notifyChange",value:function(e){var t,r=f(this._observers);try{for(r.s();!(t=r.n()).done;){var n=t.value;n.keys&&!n.keys.includes(e)||n.observer(e)}}catch(e){r.e(e)}finally{r.f()}}}]),e}(),y=function(){function e(t){i(this,e),r(this,"options",void 0),r(this,"recordRead",void 0),r(this,"notifyChange",void 0),r(this,"value",void 0),this.options=t.options,this.recordRead=t.recordRead,this.notifyChange=t.notifyChange,this.value=void 0}return o(e,[{key:"get",value:function(){return this.recordRead(),this.value}},{key:"set",value:function(e){this.value=e,this.notifyChange()}},{key:"shouldSetValue",value:function(e){return this.value!==e}}]),e}();function b(e){return function(t){return{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer:function(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher:function(r){"method"===t.kind&&(e.propertyMethod=t),r.stateVarOptions||(r.stateVarOptions={}),r.stateVarOptions[t.key]=e}}}}var m=new WeakMap,k=new(function(){function r(){i(this,r),c(this,m,{writable:!0,value:void 0}),t(this,m,null)}return o(r,[{key:"start",value:function(){t(this,m,new Map)}},{key:"recordRead",value:function(t,r){if(e(this,m)){var n=e(this,m).get(t)||[];n.includes(r)||n.push(r),e(this,m).set(t,n)}}},{key:"finish",value:function(){var r=e(this,m);return t(this,m,null),r}}]),r}());export{y as StateVar,p as connectStore,d as createGluang,k as stateRecorder,b as stateVar};