"use strict";(self.webpackChunkreact_app_2_0=self.webpackChunkreact_app_2_0||[]).push([[450],{6450:function(e,s,a){a.r(s),a.d(s,{default:function(){return p}});var r=a(885),t=a(2791),n={wrapper:"ChatPage_wrapper__tdBXV",caption:"ChatPage_caption__2Qo6P",messages__wrapper:"ChatPage_messages__wrapper__d72WY",button__send:"ChatPage_button__send__GQra8",avatar:"ChatPage_avatar__BkmkQ",hline:"ChatPage_hline__MnDZz",userHead:"ChatPage_userHead__EfQEx",user:"ChatPage_user__s3eb1",userInfo:"ChatPage_userInfo__qjopU",message:"ChatPage_message__YSTbF",user__thumb:"ChatPage_user__thumb__o42ne",userName:"ChatPage_userName__B2rlr",messages__new:"ChatPage_messages__new__u1eR2"},c=a(7764),u=a(9434),i=a(9049),_=a(5705),l=a(7942),o=a(184),h=function(){var e=(0,u.I0)(),s=(0,u.v9)((function(e){return e.chat.status})),a=l.Ry({message:l.Z_().min(1,"Must be longer than 0 characters")});return(0,o.jsx)(_.J9,{initialValues:{message:""},validationSchema:a,onSubmit:function(s,a){var r=a.resetForm;s.message&&(e((0,i.bG)(s.message)),r({}))},children:(0,o.jsx)(_.l0,{children:(0,o.jsxs)("div",{className:n.messages__new,children:[(0,o.jsx)(_.gN,{as:"textarea",type:"text",name:"message",placeholder:"Type your message here",className:n.field}),(0,o.jsx)("button",{className:n.button__send,type:"submit",disabled:"ready"!==s,children:"Send"}),(0,o.jsx)(_.Bc,{name:"message"})]})})})},m=a(2932),d=function(){var e=(0,u.v9)((function(e){return e.chat.messages})),s=(0,t.useRef)(null),a=(0,t.useState)(!1),c=(0,r.Z)(a,2),i=c[0],_=c[1];return(0,t.useEffect)((function(){i&&setTimeout((function(){var e;null===(e=s.current)||void 0===e||e.scrollIntoView({block:"nearest",behavior:"smooth"})}),500)}),[e]),(0,o.jsxs)("div",{className:n.messages__wrapper,style:{overflowY:"auto"},onScroll:function(e){var s=e.currentTarget,a=s.scrollHeight-s.scrollTop;Math.abs(a-s.clientHeight)<200?i||_(!0):i&&_(!1)},children:[e.map((function(e){return(0,o.jsx)(g,{message:e},e.id)})),(0,o.jsx)("div",{ref:s})]})},g=t.memo((function(e){var s=e.message;return(0,o.jsxs)("div",{className:n.user,children:[(0,o.jsxs)("div",{className:n.userInfo,children:[(0,o.jsxs)("div",{className:n.userHead,children:[(0,o.jsx)("div",{className:n.user__thumb,children:(0,o.jsx)("img",{src:s.photo?s.photo:c,alt:"avatar",className:n.avatar})}),(0,o.jsx)("div",{className:n.userName,children:s.userName})]}),(0,o.jsx)("div",{className:n.message,children:(0,o.jsx)("ul",{children:(0,o.jsx)("li",{children:s.message})})})]}),(0,o.jsx)("div",{className:n.hline})]})})),p=(0,m.D)((function(){var e=(0,u.I0)(),s=(0,u.v9)((function(e){return e.chat.status}));return(0,t.useEffect)((function(){return e((0,i.WE)()),function(){e((0,i.R7)())}}),[]),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("h1",{className:n.caption,children:"WebSocket chat"}),(0,o.jsxs)("div",{className:n.wrapper,children:["error"===s&&(0,o.jsx)("div",{children:"Spme error occured. Please refresh the page"}),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(d,{}),(0,o.jsx)(h,{})]})]})]})}))}}]);
//# sourceMappingURL=450.c9f72d88.chunk.js.map