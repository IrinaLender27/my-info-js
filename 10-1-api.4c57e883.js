const e=document.querySelector(".js-search"),t=document.querySelector(".js-list");e.addEventListener("submit",(function(e){e.preventDefault();const{query:n,days:r}=e.currentTarget.elements;(function(e,t){return fetch(`http://api.weatherapi.com/v1/forecast.json?key=47cce444510845a3b5890337232811&q=${e}&days=${t}`).then((e=>{if(!e.ok)throw new Error(e.statusText);return e.json()}))})(n.value,r.value).then((e=>t.innerHTML=e.forecast.forecastday.map((({date:e,day:{avgtemp_c:t,condition:{icon:n,text:r}}})=>`<li>\n        <img src="${n}" alt="${r}" />\n        <p>${r}</p>\n        <h2>${e}</h2>\n        <h3>${t}</h3>\n      </li>`)).join(""))).catch((e=>console.log(e)))}));
//# sourceMappingURL=10-1-api.4c57e883.js.map
