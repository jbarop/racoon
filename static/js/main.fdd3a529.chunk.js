(this.webpackJsonpracoon=this.webpackJsonpracoon||[]).push([[0],{206:function(e,t,n){e.exports=n(333)},333:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(29),o=n.n(c),u=(n(211),n(94)),i=n(151),l=n(340),s=n(16),f="".concat("/racoon","/COVID-19/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv");function m(e){var t=e.map((function(e){return function(e){var t=s.j("%m/%d/%Y");return{countryName:e["Country/Region"],records:Object.entries(e).map((function(e){return{date:t(e[0]),value:parseInt(e[1])}})).filter((function(e){return null!=e.date}))}}(e)})).reduce((function(e,t){return e[t.countryName]=e[t.countryName]?e[t.countryName].map((function(e,n){return Object(i.a)({},e,{value:e.value+t.records[n].value})})):t.records,e}),{});return Object.entries(t).forEach((function(e){return t[e[0]]=e[1].filter((function(e){return 0!==e.value}))})),t}var d=function(){var e=Object(r.useState)(["Germany","Italy","US"]),t=Object(u.a)(e,2),n=t[0],c=t[1],o=Object(r.useState)(),i=Object(u.a)(o,2),d=i[0],p=i[1],v=Object(r.useRef)(null);return Object(r.useEffect)((function(){s.c(f).then((function(e){return p(m(e))}))}),[]),Object(r.useEffect)((function(){if(v.current&&d){var e=s.e(n.map((function(e){return d[e]})).map((function(e){return s.e(e.map((function(e){return e.value})))}))),t=s.f(n.map((function(e){return d[e]})).map((function(e){return s.f(e.map((function(e){return e.date})))}))),r=s.e(n.map((function(e){return d[e]})).map((function(e){return s.e(e.map((function(e){return e.date})))}))),a=10,c=30,o=30,u=60,i=800-u-c,l=400-a-o;s.i(v.current).selectAll("*").remove();var f=s.i(v.current).append("svg").attr("width",i+u+c).attr("height",l+a+o).append("g").attr("transform","translate(".concat(u,", ").concat(a,")")),m=s.h().domain([t,r]).range([0,i]),p=s.g().domain([1,e]).range([l,0]),h=s.d().x((function(e){return m(e.date)})).y((function(e){return p(e.value)}));f.append("g").attr("transform","translate(0, ".concat(l,")")).call(s.a(m)),f.append("g").call(s.b(p)),n.forEach((function(e){f.append("path").datum(d[e]).attr("fill","none").attr("stroke","steelblue").attr("stroke-width",1.5).attr("d",h)}))}}),[n,d,v]),d?a.a.createElement(a.a.Fragment,null,a.a.createElement("header",{className:"App-header"},a.a.createElement("h1",null,"racoon - Corona Dashboard")),a.a.createElement("main",null,a.a.createElement(l.a,{placeholder:"Countries",clearable:!0,fluid:!0,multiple:!0,search:!0,selection:!0,options:Object.keys(d).map((function(e){return{key:e,text:e,value:e}})),value:n,onChange:function(e,t){return c(t.value)}}),a.a.createElement("div",{ref:v}))):a.a.createElement("span",null,"Loading")};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(d,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[206,1,2]]]);
//# sourceMappingURL=main.fdd3a529.chunk.js.map