function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{"0ygI":function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var r=n("mrSG"),a=n("fXoL"),o=n("TEn/"),i=function(){var e=function(){function e(t,n,r){_classCallCheck(this,e),this.toastCtrl=t,this.loaderCtrl=n,this.alertCtrl=r}return _createClass(e,[{key:"mostrarToast",value:function(e,t){return Object(r.a)(this,void 0,void 0,regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,this.toastCtrl.create({message:e,duration:3e3,position:t||"top"});case 2:return r=n.sent,n.next=5,r.present();case 5:return n.abrupt("return",n.sent);case 6:case"end":return n.stop()}}),n,this)})))}},{key:"mostrarLoader",value:function(e){return Object(r.a)(this,void 0,void 0,regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.loaderCtrl.create({message:e});case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t,this)})))}},{key:"mostrarAlert",value:function(e,t){return Object(r.a)(this,void 0,void 0,regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,this.alertCtrl.create({header:e,subHeader:t,buttons:["Ok"]});case 2:return r=n.sent,n.next=5,r.present();case 5:return n.abrupt("return",n.sent);case 6:case"end":return n.stop()}}),n,this)})))}},{key:"validateEmail",value:function(e){return/\S+@\S+\.\S+/.test(e)}}]),e}();return e.\u0275fac=function(t){return new(t||e)(a.Rb(o.P),a.Rb(o.I),a.Rb(o.b))},e.\u0275prov=a.Gb({token:e,factory:e.\u0275fac,providedIn:"root"}),e}()},Db4C:function(e,t,n){"use strict";n.r(t),n.d(t,"AcompanhamentoPageModule",(function(){return h}));var r,a,o=n("ofXK"),i=n("3Pt+"),s=n("TEn/"),c=n("tyNb"),u=n("iAfm"),f=n("fXoL"),l=[{path:"",component:u.a}],p=((r=function e(){_classCallCheck(this,e)}).\u0275mod=f.Ib({type:r}),r.\u0275inj=f.Hb({factory:function(e){return new(e||r)},imports:[[c.i.forChild(l)],c.i]}),r),d=n("j1ZV"),h=((a=function e(){_classCallCheck(this,e)}).\u0275mod=f.Ib({type:a}),a.\u0275inj=f.Hb({factory:function(e){return new(e||a)},imports:[[o.b,i.a,s.G,p,d.a]]}),a)},"wf/w":function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n("fXoL"),a=["*"],o=function(){var e=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"ngOnInit",value:function(){}}]),e}();return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=r.Eb({type:e,selectors:[["app-content"]],ngContentSelectors:a,decls:2,vars:0,consts:[[1,"home-page-wrapper"]],template:function(e,t){1&e&&(r.bc(),r.Nb(0,"div",0),r.ac(1),r.Mb())},styles:[".home-page-wrapper[_ngcontent-%COMP%]{width:calc(100% - 64px);margin:0 auto}"]}),e}()}}]);