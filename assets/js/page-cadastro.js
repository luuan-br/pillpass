(()=>{"use strict";document.getElementById("form-budget-step-1").addEventListener("submit",e=>{e.preventDefault();var e=e["currentTarget"];e.checkValidity()&&(e=new FormData(e),document.getElementById("email-send").innerText=e.get("email"),gsap.to("#hero",{display:"none",opacity:0,duration:.3,onComplete:()=>{gsap.to("#form-2ft",{display:"block",opacity:1,duration:.2})}}))}),document.getElementById("form-budget-step-2").addEventListener("submit",e=>{e.preventDefault();e=e.currentTarget;e.checkValidity()&&console.log("end form")})})();