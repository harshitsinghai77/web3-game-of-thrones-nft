(this.webpackJsonpcreap=this.webpackJsonpcreap||[]).push([[0],{23:function(e){e.exports=JSON.parse('[{"inputs":[],"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"},{"indexed":false,"internalType":"string","name":"message","type":"string"}],"name":"NewWave","type":"event"},{"inputs":[],"name":"getAllWaves","outputs":[{"components":[{"internalType":"address","name":"waver","type":"address"},{"internalType":"string","name":"message","type":"string"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"internalType":"struct WavePortal.Wave[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalWaves","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"getWavesByAddress","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastWavedAt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_message","type":"string"}],"name":"wave","outputs":[],"stateMutability":"nonpayable","type":"function"}]')},41:function(e,t,n){e.exports=n(80)},46:function(e,t,n){},68:function(e,t,n){},70:function(e,t){},80:function(e,t,n){"use strict";n.r(t);var a=n(5),r=n.n(a),s=n(34),i=n.n(s),c=(n(46),n(22)),o=n(2),u=n.n(o),l=n(14),p=n(15),m=n(35),d=n.n(m),v=n(13),f=n(23),y=(n(68),"0x140519971Cc926577d5b50D0CFcb5d2Ee33BeD36");function b(){var e=Object(a.useState)(""),t=Object(p.a)(e,2),n=t[0],s=t[1],i=Object(a.useState)(),o=Object(p.a)(i,2),m=o[0],b=o[1],h=Object(a.useState)([]),g=Object(p.a)(h,2),w=g[0],x=g[1],k=Object(a.useState)(!1),E=Object(p.a)(k,2),j=E[0],O=E[1],T=Object(a.useState)(),N=Object(p.a)(T,2),W=N[0],C=N[1],M=function(){var e=Object(l.a)(u.a.mark((function e(){var t,n,a,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=window,n=t.ethereum){e.next=4;break}return console.log("Make sure you have metamask!"),e.abrupt("return");case 4:return e.next=6,n.request({method:"eth_accounts"});case 6:0!==(a=e.sent).length?(r=a[0],s(r)):console.log("No authorized account found");case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),S=function(){var e=Object(l.a)(u.a.mark((function e(){var t,n,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,t=window,n=t.ethereum){e.next=5;break}return alert("Get MetaMask!"),e.abrupt("return");case 5:return e.next=7,n.request({method:"eth_requestAccounts"});case 7:a=e.sent,s(a[0]),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),console.log(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(){return e.apply(this,arguments)}}(),D=function(){var e=Object(l.a)(u.a.mark((function e(){var t,n,a,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,t=window,!t.ethereum){e.next=11;break}return n=v.a.getDefaultProvider("rinkeby"),a=new v.a.Contract(y,f,n),e.next=7,a.getTotalWaves();case 7:r=e.sent,C(r.toNumber()),e.next=12;break;case 11:console.log("Ethereum object doesn't exist!");case 12:e.next=17;break;case 14:e.prev=14,e.t0=e.catch(0),console.log(e.t0);case 17:case"end":return e.stop()}}),e,null,[[0,14]])})));return function(){return e.apply(this,arguments)}}(),A=function(){var e=Object(l.a)(u.a.mark((function e(){var t,n,a,r,s;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,t=window,!t.ethereum){e.next=13;break}return n=v.a.getDefaultProvider("rinkeby"),a=new v.a.Contract(y,f,n),e.next=7,a.getAllWaves();case 7:r=e.sent,s=[],r.forEach((function(e){s.push({address:e.waver,timestamp:new Date(1e3*e.timestamp),message:e.message})})),x(s),e.next=14;break;case 13:console.log("Ethereum object doesn't exist!");case 14:e.next=19;break;case 16:e.prev=16,e.t0=e.catch(0),console.log(e.t0);case 19:case"end":return e.stop()}}),e,null,[[0,16]])})));return function(){return e.apply(this,arguments)}}();Object(a.useEffect)((function(){var e;M(),D(),A();var t=function(){var e=Object(l.a)(u.a.mark((function e(t,n,a){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return x((function(e){return[].concat(Object(c.a)(e),[{address:t,timestamp:new Date(1e3*n),message:a}])})),e.next=3,D();case 3:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}();if(window.ethereum){var n=v.a.getDefaultProvider("rinkeby");(e=new v.a.Contract(y,f,n)).on("NewWave",t)}return function(){e&&e.off("NewWave",t)}}),[]);var B=function(){var e=Object(l.a)(u.a.mark((function e(){var t,n,a,r,s,i;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,t=window,!(n=t.ethereum)){e.next=20;break}return a=new v.a.providers.Web3Provider(n),r=a.getSigner(),s=new v.a.Contract(y,f,r),O(!0),e.next=9,s.wave(m);case 9:return i=e.sent,console.log("Mining...",i.hash),e.next=13,i.wait();case 13:return console.log("Mined...",i.hash),e.next=16,D();case 16:O(!1),b(""),e.next=22;break;case 20:console.log("Ethereum object doesn't exist!"),O(!1);case 22:e.next=28;break;case 24:e.prev=24,e.t0=e.catch(0),console.log(e.t0),O(!1);case 28:case"end":return e.stop()}}),e,null,[[0,24]])})));return function(){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"mainContainer"},r.a.createElement("div",{className:"dataContainer"},r.a.createElement("div",{className:"header"},r.a.createElement("span",{role:"img","aria-label":"wave"},"\ud83d\udc4b"),"Hey there!"),r.a.createElement("div",{className:"bio"},"I am Harshit, Software Engineer currently based in India. Interested in Data Engineering, MLOps and Web3. Connect your Ethereum wallet and wave at me! You can find more about me"," ",r.a.createElement("a",{href:"https://fictionally-irrelevant.vercel.app/",target:"_blank",rel:"noopener noreferrer"},"here.")),r.a.createElement("div",{className:"container-center"},r.a.createElement("label",null,"Say Hi"),r.a.createElement("input",{type:"text",className:"container-input",placeholder:"Type a message",style:{height:"35px",width:"250px",padding:"0 15px"},value:m,onChange:function(e){return b(e.target.value)}})),r.a.createElement("button",{className:"waveButton container-center",onClick:B,disabled:!m},"Wave at Me",j&&r.a.createElement(d.a,{type:"TailSpin",color:"#00BFFF",height:20,width:20,style:{padding:"0px 12px"}})),!n&&r.a.createElement("button",{className:"waveButton",onClick:S},"Connect Wallet"),W>0&&r.a.createElement("div",{className:"bio"},"Total waves ",W),w.map((function(e,t){return r.a.createElement("div",{key:t,style:{backgroundColor:"OldLace",marginTop:"16px",padding:"8px"}},r.a.createElement("div",null,"Address: ",e.address),r.a.createElement("div",null,"Time: ",e.timestamp.toString()),r.a.createElement("div",null,"Message: ",e.message))}))))}i.a.render(r.a.createElement(b,null),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.df69a78d.chunk.js.map