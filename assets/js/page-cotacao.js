(()=>{"use strict";var e;function a(){gsap.to("#hero",{display:"none",opacity:0,duration:.3,onComplete:()=>{gsap.to("#collaborators",{display:"block",opacity:1,duration:.2})}})}document.getElementById("form-budget-step-1").addEventListener("submit",e=>{e.preventDefault();var t,e=e["currentTarget"];e.checkValidity()&&(e=new FormData(e),e=e.get("email"),(t=new URL(window.location.href)).searchParams.set("email",e),window.history.replaceState({},"",t),a())}),document.getElementById("form-budget-step-2").addEventListener("submit",e=>{e.preventDefault();var e=e["currentTarget"];e.checkValidity()&&(console.log("end form"),e="modal-success",e=document.getElementById(e),(e=new bootstrap.Modal(e)).show())}),e=window.location.href,(new URL(e).searchParams.get("email")??"")&&a()})();