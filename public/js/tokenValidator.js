(async ()=>{
 const answer = await new Api().tokenValidation(localStorage.getItem('token'));
 if(answer.type === 'error'){
  window.location.href = '/';
 }
})();

