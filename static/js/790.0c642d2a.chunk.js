"use strict";(self.webpackChunkreact_app_2_0=self.webpackChunkreact_app_2_0||[]).push([[790],{6790:function(s,e,r){r.r(e),r.d(e,{default:function(){return f}});var a=r(2791),i=r(8687),n=r(5773),l={wrapper:"Users_wrapper__OlyPm",avatar__thumb:"Users_avatar__thumb__peHwj",user:"Users_user__ureKU",right_block:"Users_right_block__iyM+3",left_block:"Users_left_block__GPLkt",follow:"Users_follow__Iacut",pageCount:"Users_pageCount__fc-Od",arrows:"Users_arrows__9divR"},c="Paginator_pages__xZaO7",t=r(4264),u=r(184),o=function(s){var e=s.usersPage,r=s.dispatch;return(0,u.jsx)("div",{className:c,children:(0,u.jsx)(t.Z,{count:Math.ceil(e.usersCount/e.pageSize),page:e.currentPage,onChange:function(s,a){!function(s){r((0,n.tK)(s)),r((0,n.Uk)(s,e.pageSize))}(a)},color:"primary"})})},d=r(7764),_=r(3504),h=function(s){var e=s.user,r=s.dispatch,a=s.usersPage;return(0,u.jsxs)("div",{className:l.user,children:[(0,u.jsxs)("div",{className:l.left_block,children:[(0,u.jsx)("div",{className:l.avatar,children:(0,u.jsx)(_.OL,{to:"/profile/"+e.id,children:(0,u.jsx)("img",{className:l.avatar__thumb,src:null!=e.photos.small?e.photos.small:d,alt:"avatar"})})}),(0,u.jsx)("div",{className:l.follow,children:e.followed?(0,u.jsx)("button",{disabled:a.isFollowingInProgress.includes(e.id),onClick:function(){r((0,n.UD)(e.id))},children:"Unfollow"}):(0,u.jsx)("button",{disabled:a.isFollowingInProgress.includes(e.id),onClick:function(){r((0,n.AC)(e.id))},children:"Follow"})})]}),(0,u.jsx)("div",{className:l.right_block,children:(0,u.jsxs)("ul",{children:[(0,u.jsx)("li",{children:e.name}),(0,u.jsx)("li",{className:l.location,children:"${user.address.city}, ${user.address.country}"}),(0,u.jsx)("li",{children:e.status})]})})]})},p=function(s){var e=s.dispatch,r=s.usersPage;return(0,u.jsxs)("div",{className:l.wrapper,children:[(0,u.jsx)("div",{className:l.paginator,children:(0,u.jsx)(o,{usersPage:r,dispatch:e})}),(0,u.jsx)("div",{className:l.users,children:r.users.map((function(s){return(0,u.jsx)(h,{user:s,usersPage:r,dispatch:e},s.id)}))})]})},g=r(4967),f=function(){var s=(0,i.I0)(),e=(0,i.v9)((function(s){return s.usersPage}));return(0,a.useEffect)((function(){s((0,n.Uk)(e.currentPage,e.pageSize))}),[e.currentPage]),(0,u.jsx)(u.Fragment,{children:e.isFetching?(0,u.jsx)(g.Z,{}):(0,u.jsx)(p,{dispatch:s,usersPage:e})})}}}]);
//# sourceMappingURL=790.0c642d2a.chunk.js.map