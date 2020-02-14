!function(e){var t={};function s(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=t,s.d=function(e,t,r){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(r,n,function(t){return e[t]}.bind(null,n));return r},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=7)}([function(e,t,s){"use strict";s.d(t,"a",(function(){return r}));class r{constructor(){this.url="http://localhost:3000/server/",this.tags=["niebieski","czarny","różowy","pomarańczowy","srebrny","czerwnoy","biały","brązowy","żółty","szary","złoty","zielony","fioletowy"],this.category=[{brooches:"Broszki"},{bracelets:"Bransoletki"},{earrings:"Kolczyki"},{yarn:"Szydełkowe twory"},{bags:"Torebki"},{tedy:"Maskotki"},{hwawl:"Chusty"},{}]}}},function(e,t,s){"use strict";s.d(t,"a",(function(){return n}));var r=s(0);class n{constructor(){this.config=new r.a,this.urlProducts=this.config.url+"/api/",this.urlUsers=this.config.url+"/users/"}getCookies(){const e=decodeURIComponent(document.cookie).split(";");if(!e[0])return null;const t={};return e.forEach(e=>{const s=e.split("="),r=s[0].trim(),n=s[1].trim();t[r]=n}),t}setCookie(e,t,s=2592e3){let r=t;"object"==typeof t&&(r=JSON.stringify(t)),document.cookie=`${e}=${r};Max-Age=${s};path=/`}getAll(){return fetch(this.urlProducts).then(e=>{if(200!==e.status)throw e.status;return e.json()})}getCategory(e){const t=this.urlProducts+"/filter?"+e;return fetch(t).then(e=>{if(200!==e.status)throw e.status;return e.json()})}get(e){return fetch(`${this.urlProducts}/${e}`).then(e=>{if(200!==e.status)throw e.status;return e.json()})}async add(e){const t=this.getCookies(),s=t.accessToken,r=t.refreshToken,n=new FormData;for(let t in e)n.append(t,e[t]);const o=await fetch(this.urlProducts,{method:"POST",body:n,headers:{Authorization:`Bearer ${s}`}});if(401===o.status){if(await this.refreshToken(r)){const e=this.getCookies().accessToken;o=await fetch(`${this.urlProducts}`,{method:"POST",body:n,headers:{Authorization:`Bearer ${e}`}})}}return o}async change(e,t){const s=this.getCookies(),r=s.accessToken,n=s.refreshToken,o=new FormData;for(let e in t)o.append(e,t[e]);let i=await fetch(`${this.urlProducts}${e}`,{method:"put",body:o,headers:{Authorization:`Bearer ${r}`}});if(401===i.status){if(await this.refreshToken(n)){const t=this.getCookies().accessToken;i=await fetch(`${this.urlProducts}${e}`,{method:"put",body:o,headers:{Authorization:`Bearer ${t}`}})}}}async getUser(){let e=this.getCookies();if(null!==e&&!e.hasOwnProperty("accessToken")&&e.hasOwnProperty("refreshToken")){if(!await this.refreshToken(e.refreshToken))return;e=this.api.getCookies()}try{return await e.hasOwnProperty("accessToken")?await this.getUserByToken():null}catch(e){return null}}async remove(e){const t=this.getCookies(),s=t.accessToken,r=t.refreshToken;let n=fetch(`${this.urlProducts}${e}`,{method:"delete",headers:{Authorization:`Bearer ${s}`}});if(401===n.status){if(await this.refreshToken(r)){const t=this.getCookies().accessToken;n=await fetch(`${this.urlProducts}${e}`,{method:"delete",headers:{Authorization:`Bearer ${t}`}})}if(200!==n.status)throw res.status;return n.json()}}async getUserByToken(e){const t=this.getCookies().accessToken;return await fetch(`${this.urlUsers}user`,{method:"GET",headers:{Authorization:`Bearer ${t}`}}).then(e=>e.json()).catch(e=>console.log(e))}async refreshToken(e){const t=this.config.url+"/auth/token",s={refreshToken:e},r=await fetch(t,{method:"PUT",body:JSON.stringify(s),headers:{"Content-type":"application/json; charset=UTF-8"}});if(200===r.status){const e=await r.json();return this.setCookie("accessToken",e.accessToken,600),this.setCookie("refreshToken",e.refreshToken,10800),!0}return console.log("refreshTokenStatus ",r.status),!1}async uploadBasket(e){const t=this.getCookies(),s=t.accessToken,r=t.refreshToken;let n=await fetch(`${this.urlUsers}basket`,{method:"put",body:JSON.stringify(e),headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`}});if(401===n.status){if(await this.refreshToken(r)){const t=this.getCookies().accessToken;n=await fetch(`${this.urlUsers}basket`,{method:"put",body:e,headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`}})}}}buy(e){return fetch("http://localhost:3000/server/transactions/buy",{method:"post",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}})}}},function(e,t,s){"use strict";s.d(t,"a",(function(){return n}));var r=s(0);class n{constructor(){this.config=new r.a,this.urlProducts=this.config.url+"/api/",this.urlUsers=this.config.url+"/users/"}getCookies(){const e=decodeURIComponent(document.cookie).split(";");if(!e[0])return null;const t={};return e.forEach(e=>{const s=e.split("="),r=s[0].trim(),n=s[1].trim();t[r]=n}),t}setCookie(e,t,s=2592e3){let r=t;"object"==typeof t&&(r=JSON.stringify(t)),document.cookie=`${e}=${r};Max-Age=${s};path=/`}getAll(){return fetch(this.urlProducts).then(e=>{if(200!==e.status)throw e.status;return e.json()})}getCategory(e){const t=this.urlProducts+"/filter?"+e;return fetch(t).then(e=>{if(200!==e.status)throw e.status;return e.json()})}get(e){return fetch(`${this.urlProducts}/${e}`).then(e=>{if(200!==e.status)throw e.status;return e.json()})}async add(e){const t=this.getCookies(),s=t.accessToken,r=t.refreshToken,n=new FormData;for(let t in e)n.append(t,e[t]);const o=await fetch(this.urlProducts,{method:"POST",body:n,headers:{Authorization:`Bearer ${s}`}});if(401===o.status){if(await this.refreshToken(r)){const e=this.getCookies().accessToken;o=await fetch(`${this.urlProducts}`,{method:"POST",body:n,headers:{Authorization:`Bearer ${e}`}})}}return o}async change(e,t){const s=this.getCookies(),r=s.accessToken,n=s.refreshToken,o=new FormData;for(let e in t)o.append(e,t[e]);let i=await fetch(`${this.urlProducts}${e}`,{method:"put",body:o,headers:{Authorization:`Bearer ${r}`}});if(401===i.status){if(await this.refreshToken(n)){const t=this.getCookies().accessToken;i=await fetch(`${this.urlProducts}${e}`,{method:"put",body:o,headers:{Authorization:`Bearer ${t}`}})}}}async getUser(){let e=this.getCookies();if(null!==e&&!e.hasOwnProperty("accessToken")&&e.hasOwnProperty("refreshToken")){if(!await this.refreshToken(e.refreshToken))return;e=this.api.getCookies()}try{return await e.hasOwnProperty("accessToken")?await this.getUserByToken():null}catch(e){return null}}async remove(e){const t=this.getCookies(),s=t.accessToken,r=t.refreshToken;let n=fetch(`${this.urlProducts}${e}`,{method:"delete",headers:{Authorization:`Bearer ${s}`}});if(401===n.status){if(await this.refreshToken(r)){const t=this.getCookies().accessToken;n=await fetch(`${this.urlProducts}${e}`,{method:"delete",headers:{Authorization:`Bearer ${t}`}})}if(200!==n.status)throw res.status;return n.json()}}async getUserByToken(e){const t=this.getCookies().accessToken;return await fetch(`${this.urlUsers}user`,{method:"GET",headers:{Authorization:`Bearer ${t}`}}).then(e=>e.json()).catch(e=>console.log(e))}async refreshToken(e){const t=this.config.url+"/auth/token",s={refreshToken:e},r=await fetch(t,{method:"PUT",body:JSON.stringify(s),headers:{"Content-type":"application/json; charset=UTF-8"}});if(200===r.status){const e=await r.json();return this.setCookie("accessToken",e.accessToken,600),this.setCookie("refreshToken",e.refreshToken,10800),!0}return console.log("refreshTokenStatus ",r.status),!1}async uploadBasket(e){const t=this.getCookies(),s=t.accessToken,r=t.refreshToken;let n=await fetch(`${this.urlUsers}basket`,{method:"put",body:JSON.stringify(e),headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`}});if(401===n.status){if(await this.refreshToken(r)){const t=this.getCookies().accessToken;n=await fetch(`${this.urlUsers}basket`,{method:"put",body:e,headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`}})}}}buy(e){return fetch("http://localhost:3000/server/transactions/buy",{method:"post",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}})}}},function(e,t,s){},function(e,t,s){"use strict";s.d(t,"a",(function(){return o}));var r=s(1);let n=[];const o=new class{constructor(){this.api=new r.a,this.basketIconCount=document.querySelector("#countBasket"),this.basketContainer=document.querySelector("#handleBuyContainer"),this.basketProductsContainer=document.querySelector("#basketProductsContainer"),this.sumPrice=document.querySelector("#sumPrice"),this.orderForm=document.querySelector("#orderForm"),this.addListeners()}async buyBtn(e){document.querySelector("#basket").classList.add("hide"),this.orderForm.classList.remove("hide");try{this.user=await this.api.getUser()}catch(e){console.log(e)}}backToBasket(){document.querySelector("#basket").classList.remove("hide"),this.orderForm.classList.add("hide")}orderBtn(e){e.preventDefault();const t=document.querySelector("#orderFirstName"),s=document.querySelector("#orderLastName"),r=document.querySelector("#orderZIPcode"),n=document.querySelector("#orderCity"),o=document.querySelector("#orderStreet"),i=document.querySelector("#orderStreetNumber"),a=document.querySelector("#orderMail"),c=document.querySelector("#orderSave");let d=!0;if([t,s,r,n,o,i,a,c].forEach(e=>{if(!e.value)return d=!1,e.setAttribute("placeholder","musisz uzupełnic to pole"),e.classList.add("incorrect");e.classList.remove("incorrect")}),!d)return;this.orderForm.classList.add("hide"),document.querySelector("#confirmOrder").classList.remove("hide");const u=`${t.value} ${s.value}`,h=`${o.value} ${i.value}, ${r.value} ${n.value}`,l=a.value,p=this.user?this.user._id:null;this.confirmBuy(u,h,l,p)}confirmBuy(e,t,s,r){let o=0;const i=n.filter(e=>{if(!0===e.checked)return o+=e.price*e.count,!0});document.querySelector("#totalPriceOrder").innerText=`Do zapłaty ${o} PLN`,document.querySelector("#userConfirm").innerText=`${e}`,document.querySelector("#adressConfirm").innerText=t,document.querySelector("#mailConfirm").innerText=s;const a=document.querySelector("#productsOrder");i.forEach(e=>{const t=document.createElement("div");t.className="confirmProducts";const s=document.createElement("span");s.innerText=e.name;const r=document.createElement("span");r.innerText=`x ${e.count}`;const n=document.createElement("span");n.innerText=`${e.price*e.count} PLN`,t.appendChild(s),t.appendChild(r),t.appendChild(n),a.appendChild(t)});const c={fulName:e,adress:t,mail:s,products:i.map(e=>({id:e._id,count:e.count})),userId:this.user?this.user._id:""};document.querySelector("#confirmOrderBtn").addEventListener("click",e=>this.handleConfirmOrderBtn(e,c))}handleConfirmOrderBtn(e,t){this.api.buy(t).then(t=>{if(200===t.status){const t=document.createElement("div");t.innerText="Zamówienie zostało przyjęte do realizacji. Na podany adres mailowy otrzymasz potwierdzenie zakupu",document.querySelector("#confirmOrder").appendChild(t),e.target.setAttribute("disabled",!0),n=[],this.refreshIconBasket(),this.updateBasketCookies(),this.uploadBasket(),this.refreshTotalPrice()}else if(404===t.status){const e=document.createElement("div");e.innerText="Niewystarczająca ilość jednego z produktów",document.querySelector("#confirmOrder").appendChild(e)}else{const t=document.createElement("div");t.innerText="Błąd zamówienia, prosimy o kontakt",document.querySelector("#confirmOrder").appendChild(t),e.target.setAttribute("disabled",!0)}})}addListeners(){const e=document.querySelector("#basketIcon");e&&e.addEventListener("click",this.showBasket.bind(this));const t=document.querySelector("#closeBasketBtn");t&&t.addEventListener("click",this.hideBasket.bind(this));const s=document.querySelector("#buyBtn");s&&s.addEventListener("click",this.buyBtn.bind(this)),this.orderForm&&this.orderForm.addEventListener("submit",e=>this.orderBtn(e));const r=document.querySelector("#orderFormBack");r&&r.addEventListener("click",()=>this.backToBasket())}updateBasketByCookies(){const e=this.api.getCookies();e&&(n=e.hasOwnProperty("basket")?JSON.parse(e.basket):[],this.refreshIconBasket(),this.refreshBasket(n))}uploadBasket(){const e=this.api.getCookies();e&&e.refreshToken&&this.api.uploadBasket(n)}showBasket(){this.basketContainer.classList.remove("hide")}hideBasket(){this.basketContainer.classList.add("hide"),document.querySelector("#basket").classList.remove("hide"),this.orderForm.classList.add("hide"),document.querySelector("#confirmOrder").classList.add("hide")}getBasket(){return n}setBasket(e){this.refreshIconBasket(),this.refreshBasket(e)}async addToBasket(e){const t=n.findIndex(t=>t._id==e);if(-1!==t)n[t].count++;else{const t=await this.api.get(e),{name:s,price:r,_id:o,image:i}=t,a={name:s,price:r,_id:o,image:i,count:1,checked:!0};n.push(a)}this.refreshBasket(n),this.updateBasketCookies(),this.uploadBasket(),this.refreshTotalPrice()}async removeFromBasket(e){const t=n.findIndex(t=>t._id==e);n.splice(t,1),this.refreshIconBasket(),this.updateBasketCookies(),this.uploadBasket(),this.refreshTotalPrice()}refreshIconBasket(){this.basketIconCount.innerHTML=`(${n.length})`}changeBasketCount(e){const t=n.findIndex(e=>e._id==id);n[t].count=e.target.value,totalSpan.innerText=n[t].count*n[t].price+" PLN",this.updateBasketCookies(),this.uploadBasket(),this.refreshTotalPrice()}increaseBasketCount(e,t,s){const r=n.findIndex(t=>t._id==e);n[r].count++,t.value=n[r].count,s.innerText=n[r].count*n[r].price+" PLN",this.updateBasketCookies(),this.uploadBasket(),this.refreshTotalPrice()}decreaseBasketCount(e,t,s){const r=n.findIndex(t=>t._id==e);n[r].count=n[r].count>1?--n[r].count:n[r].count,t.value=n[r].count,s.innerText=n[r].count*n[r].price+" PLN",this.updateBasketCookies(),this.uploadBasket(),this.refreshTotalPrice()}checkBasketItems(e,t){const s=n.findIndex(e=>e._id==t);n[s].checked=!n[s].checked,this.updateBasketCookies(),this.uploadBasket(),this.refreshTotalPrice()}updateBasketCookies(){this.api.setCookie("basket",n)}refreshBasket(e){this.basketProductsContainer.innerText="",e.forEach(e=>{const t=document.createElement("div");t.className="basketElementMark";const s=document.createElement("span");s.className="Product";const r=document.createElement("input");r.setAttribute("type","checkbox"),e.checked&&r.setAttribute("checked",e.checked),r.addEventListener("change",t=>this.checkBasketItems(t,e._id)),s.appendChild(r),t.appendChild(s);const n=document.createElement("span");n.className="nameArticleBasket",n.innerText=e.name,t.appendChild(n);const o=document.createElement("span"),i=document.createElement("image");i.src=e.image,o.appendChild(i),t.appendChild(o);const a=document.createElement("span");a.innerText=e.price*e.count+" PLN";const c=document.createElement("span"),d=document.createElement("input");d.setAttribute("type","number"),d.setAttribute("min",1),d.value=e.count,d.addEventListener("change",t=>this.changeBasketCount(t,e._id,a));const u=document.createElement("button");u.innerHTML='<i class="fas fa-minus"></i>',u.addEventListener("click",()=>this.decreaseBasketCount(e._id,d,a));const h=document.createElement("button");h.innerHTML='<i class="fas fa-plus"></i>',h.addEventListener("click",()=>this.increaseBasketCount(e._id,d,a)),c.appendChild(u),c.appendChild(d),c.appendChild(h),t.appendChild(c);const l=document.createElement("span"),p=document.createElement("button");p.innerHTML='<i class="fas fa-trash-alt"></i>',p.addEventListener("click",()=>{t.remove(),this.removeFromBasket()}),l.appendChild(p),t.appendChild(l),t.appendChild(a),this.basketProductsContainer.appendChild(t),this.refreshTotalPrice(),this.refreshIconBasket()})}refreshTotalPrice(){let e=0;n.forEach(t=>{t.checked&&(e+=t.count*t.price)});const t=document.createElement("span");t.innerText=`${e} PLN`,this.sumPrice.innerText="Do zapłaty ",this.sumPrice.appendChild(t)}}},function(e,t,s){"use strict";s.d(t,"a",(function(){return i}));var r=s(0),n=s(1),o=s(4);class i{constructor(){this.config=new r.a,this.api=new n.a,this.admin=new n.a,this.basket=o.a}createMessageElement(e){const t=document.createElement("aside");t.className="message";const s=document.createElement("p");return s.innerText=e,t.appendChild(s),t}productsShop(e){return e.map(e=>{const t=document.createElement("article");return t.dataset.id=e._id,t.className="product",t.dataset.tags="object"==typeof e.tags?e.tags.join(" "):e.tags,t.dataset.category=e.category,this._createProductShop(e,t),t})}_createProductShop(e,t){const{name:s,description:r,price:n,count:o,image:i,category:a}=e,c=document.createElement("img"),d=document.createElement("span");d.className="ImgContainer",c.setAttribute("alt",s),c.src=i,d.appendChild(c);const u=document.createElement("h1");u.innerText=s;const h=document.createElement("p");h.innerText=`Cena: ${n}`;const l=document.createElement("p");l.className="descriptionProduct",l.innerText=r;const p=document.createElement("p");p.innerText=`Dostępnych: ${o}`;const m=document.createElement("div"),f=document.createElement("button");return f.innerText="dodaj do koszyka",f.addEventListener("click",e=>{e.stopImmediatePropagation(),this.basket.addToBasket(t.dataset.id)}),m.appendChild(f),t.append(d),t.append(u),t.append(h),t.append(l),t.append(p),t.append(m),t}singleProductAdmin(e){return this._createTableProducts()}createTableAdmin(){const e=document.createElement("table"),t=document.createElement("thead"),s=document.createElement("tbody"),r=document.createElement("tr"),n=document.createElement("th");n.innerText="Produkt";const o=document.createElement("th");o.innerText="Ilość";const i=document.createElement("th");i.innerText="Cena";const a=document.createElement("th");a.innerText="Id";const c=document.createElement("th");c.innerText="Opis";const d=document.createElement("th");d.innerText="Zdjęcie";const u=document.createElement("th");u.innerText="Tagi";const h=document.createElement("th");return h.innerText="Kategoria",r.appendChild(n),r.appendChild(o),r.appendChild(i),r.appendChild(a),r.appendChild(u),r.appendChild(h),r.appendChild(d),r.appendChild(c),t.appendChild(r),e.appendChild(t),e.appendChild(s),e}adminProduct(e){let t=!1;const s=document.createElement("tr"),r=document.createElement("td"),n=document.createElement("input");n.setAttribute("disabled",!0),n.value=e.name,r.appendChild(n);const o=document.createElement("td"),i=document.createElement("input");i.setAttribute("disabled",!0),i.value=e.count,o.appendChild(i);const a=document.createElement("td"),c=document.createElement("input");c.setAttribute("disabled",!0),c.value=e.price,a.appendChild(c);const d=document.createElement("td");d.innerText=e._id;const u=document.createElement("td"),h=document.createElement("input");h.setAttribute("disabled",!0),h.value=e.description,u.appendChild(h);const l=document.createElement("td");l.classList.add("imageCell");const p=document.createElement("img");p.src=e.image,p.alt=e.name;const m=document.createElement("input");m.setAttribute("disabled",!0),m.setAttribute("type","file"),l.appendChild(p),l.appendChild(m);const f=document.createElement("td"),k=this.adminTags(e);k.forEach(e=>f.appendChild(e));const y=document.createElement("td"),g=document.createElement("select");g.setAttribute("disabled",!0),g.setAttribute("name","category"),this.adminCaregory(e).forEach(e=>g.appendChild(e)),y.appendChild(g);const b=document.createElement("td"),T=document.createElement("button");T.innerText="Odblokuj",T.classList.add("active"),T.addEventListener("click",()=>{if(t){const t={name:n.value,count:i.value,price:c.value,description:h.value,category:g.value,image:m.files[0]?m.files[0]:void 0,tags:this._getTags(f.querySelectorAll('input[type="checkbox"]'))};try{this.api.change(e._id,t)}catch{console.log("błąd przy próbie modyfikacji produktu")}}t=!t,T.classList.toggle("active"),T.innerText=t?"Zatwierdź":"Odblokuj",t?i.removeAttribute("disabled"):i.setAttribute("disabled",!0),t?h.removeAttribute("disabled"):h.setAttribute("disabled",!0),t?n.removeAttribute("disabled"):n.setAttribute("disabled",!0),t?c.removeAttribute("disabled"):c.setAttribute("disabled",!0),t?m.removeAttribute("disabled"):m.setAttribute("disabled",!0),t?i.removeAttribute("disabled"):i.setAttribute("disabled",!0),t?g.removeAttribute("disabled"):g.setAttribute("disabled",!0),t?k.forEach(e=>this.switchBlockTags(e.querySelector("input"),"remove")):k.forEach(e=>this.switchBlockTags(e.querySelector("input"),"add"))}),b.appendChild(T);const C=document.createElement("td"),E=document.createElement("button");return E.innerText="Usuń",E.addEventListener("click",()=>{if(confirm("czy na pewno chcesz usunąć produkt?"))try{this.api.remove(e._id).then(e=>s.remove()).catch(e=>console.log("błąd połączenia"))}catch{console.log("błąd podczas usuwania produktu")}}),C.appendChild(E),s.appendChild(r),s.appendChild(o),s.appendChild(a),s.appendChild(d),s.appendChild(f),s.appendChild(y),s.appendChild(l),s.appendChild(u),s.appendChild(b),s.appendChild(C),s}_getTags(e){const t=[];return e.forEach(e=>{e.checked&&t.push(e.getAttribute("name"))}),t}adminCaregory(e){return this.config.category.map(t=>{const s=document.createElement("option");for(let r in t)s.setAttribute("value",r),s.text=t[r],r===e.category&&s.setAttribute("selected",!0);return s})}switchBlockTags(e,t){"remove"===t&&e.removeAttribute("disabled"),"add"===t&&e.setAttribute("disabled",!0)}adminTags(e){return this.config.tags.map(t=>{const s=e.name+e._id,r=document.createElement("span"),n=document.createElement("input");n.setAttribute("type","checkbox"),n.setAttribute("disabled",!0),n.setAttribute("name",t),0!==("string"==typeof e.tags?e.tags:e.tags.filter(e=>e===t)).length&&n.setAttribute("checked","true"),n.id=s;const o=document.createElement("label");return o.setAttribute("for",s),o.innerText=t,r.appendChild(n),r.appendChild(o),r})}addTagsToAddPanel(){return this.config.tags.map(e=>{const t=`addPanel${e}`,s=document.createElement("span"),r=document.createElement("input");r.setAttribute("type","checkbox"),r.setAttribute("name","tags"),r.setAttribute("value",e),r.id=t;const n=document.createElement("label");return n.setAttribute("for",t),n.innerText=e,s.appendChild(r),s.appendChild(n),s})}}},function(e,t,s){"use strict";s.d(t,"a",(function(){return r}));const r=()=>{document.cookie="accessToken =;Max-Age=0; path=/",document.cookie="refreshToken =;Max-Age=0; path=/",window.location.replace("/?message=Poprawnie wylogowano")}},function(e,t,s){"use strict";s.r(t);var r=s(4),n=s(2),o=s(5),i=s(0),a=s(6);s(3);new class{constructor(){this.user=null,this.createItems=new o.a,this.api=new n.a,this.productContainer=document.getElementById("products"),this.showAll(),this.products=[],this.config=new i.a,this.basket=r.a,this.filters={color:"",price:{min:"",max:""}},this.StartSite(),this.putColorsListToFilterOption(),this.colorFilter=document.getElementById("colorFilter"),this.colorFilter.addEventListener("change",this.runFilter.bind(this)),this.maxPriceFilter=document.getElementById("maxPriceFilter"),this.maxPriceFilter.addEventListener("change",this.runFilter.bind(this)),this.minPriceFilter=document.getElementById("minPriceFilter"),this.minPriceFilter.addEventListener("change",this.runFilter.bind(this))}async StartSite(){let e=this.api.getCookies();if(null!==e&&!e.hasOwnProperty("accessToken")&&e.hasOwnProperty("refreshToken")){if(!await this.api.refreshToken(e.refreshToken))return;e=this.api.getCookies()}if(this.user=await this.api.getUser(),this.user&&this.user.activeBasket.length>0?(this.basket.setBasket(this.user.activeBasket),this.basket.updateBasketCookies()):this.basket.updateBasketByCookies(),this.user){const e=document.querySelector("#welcome");e.innerHTML=this.user?"Witaj ":null;const t=document.createElement("span");t.innerText=this.user.login,e.appendChild(t)}const t=document.querySelector("#login");this.user?(t.href="",t.innerText="Wyloguj",t.addEventListener("click",a.a)):(t.href="/login",t.innerText="Zaloguj")}runFilter(){const e=this.maxPriceFilter.value;this.filters.price.max=e;const t=this.minPriceFilter.value;this.filters.price.min=t,this.filters.color=this.colorFilter.value;let s=[...this.products];console.log(s),s=this.getFilterColor(s),s=this.getFilterPrice(s),this._refreshSite(s)}getFilterColor(e){return""===this.filters.color?e:e.filter(e=>{let t=!1;if(""!==e.tags&&e.tags.forEach(e=>{console.log(e),e===this.filters.color&&(t=!0)}),t)return e})}getFilterPrice(e){const{min:t,max:s}=this.filters.price;return e.filter(e=>{if(""!==t&&e.price>=t){if(""!==s&&e.price<=s)return e;if(""===s)return e}else if(""===t){if(""!==s&&e.price<=s)return e;if(""===s)return e}})}async showAll(){const e=window.location.href.split("?"),t=1===e.length?[]:e[1].split("=");if(e.length>1&&"category"===t[0]){const t=e[1];await this.api.getCategory(t).then(e=>{0!==e.docs.length&&e.docs.forEach(e=>this.products.push(e))})}else if(e.length>1&&"message"===t[0]){const e=decodeURIComponent(t[1]),s=this.createItems.createMessageElement(e);document.querySelector("#root").prepend(s);try{await this.api.getAll().then(e=>e.rows.forEach(e=>this.products.push(e.doc)))}catch{console.log("błąd przy próbie pobrania produktów do sklepu")}}else try{await this.api.getAll().then(e=>e.rows.forEach(e=>this.products.push(e.doc)))}catch{console.log("błąd przy próbie pobrania produktów do sklepu")}this._refreshSite(this.products)}putColorsListToFilterOption(){const e=document.getElementById("colorFilter"),t=document.createElement("option");e.append(t),this.config.tags.forEach(t=>{const s=document.createElement("option");s.setAttribute("value",t),s.text=t,e.append(s)})}_refreshSite(e){this.productContainer.innerHTML="",this.createItems.productsShop(e).forEach(e=>{this.productContainer.append(e)})}}}]);