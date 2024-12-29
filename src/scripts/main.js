'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.documentElement.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  // eslint-disable-next-line prefer-promise-reject-errors
  window.setTimeout(() => reject('First promise was rejected'), 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.documentElement.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.documentElement.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  document.documentElement.addEventListener('click', () => {
    leftClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });

  document.documentElement.addEventListener('contextmenu', () => {
    rightClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

function success(message) {
  const newDiv = document.createElement('div');

  newDiv.dataset.qa = 'notification';
  newDiv.className = 'success';
  newDiv.append(message);
  document.body.append(newDiv);
}

function error(message) {
  const newDiv = document.createElement('div');

  newDiv.dataset.qa = 'notification';
  newDiv.className = 'error';
  newDiv.append(message);
  document.body.append(newDiv);
}

firstPromise.then(
  (successMessage) => success(successMessage),
  (errorMesage) => error(errorMesage),
);

secondPromise.then(
  (successMessage) => success(successMessage),
  (errorMesage) => error(errorMesage),
);

thirdPromise.then(
  (successMessage) => success(successMessage),
  (errorMesage) => error(errorMesage),
);
