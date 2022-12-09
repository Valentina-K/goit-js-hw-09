import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');
let promisePara = {};

formRef.addEventListener('input', onChangeInput);
formRef.addEventListener('submit', onSubmit);

function onChangeInput(evt) {
  promisePara[evt.target.name] = evt.target.value;
}

function onSubmit(evt) {
  evt.preventDefault();
 
  let promiseDelay = parseInt(promisePara["delay"]);

  for (let promiseNumber = 1; promiseNumber <= promisePara["amount"]; promiseNumber += 1) {
    
    createPromise(promiseNumber, promiseDelay)
      .then(({ position, delay }) => {       
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);        
      });
    promiseDelay += parseInt(promisePara["step"]);
  }
}

function createPromise(position, delay) {
  console.log(position, delay);
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({position, delay});
    } else {
      reject({position, delay});
    }
  });  
}