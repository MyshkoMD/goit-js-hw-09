import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');



form.addEventListener('submit', onSubmit);


function onSubmit(evt) {
  evt.preventDefault();

  let delay = Number(form.elements.delay.value);
  let step = Number(form.elements.step.value);
  let amount = Number(form.elements.amount.value)

  for (i = 0; i < amount; i += 1){
    position = i + 1;
  
    createPromise(position, delay)
      .then(({position, delay}) => Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`))
      .catch(({position, delay}) => Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`));
    delay = delay + step;
  }
};




function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
    resolve({position, delay})
  } else {
    // Reject
    reject({position, delay})
  }
    }, delay)
  })
  
}
