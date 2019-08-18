// Copyright (c) 2019 Mateusz Furga <matfurga@gmail.com>
'use strict';

var pickedColor = 'blue';
var cube = undefined;

document.addEventListener('keypress', (e) => {
  pickedColor = Cube.COLORS[(parseInt(e.key) - 1) % Cube.COLORS.length];
});

window.addEventListener('load', () => {
  console.log('%c Copyright (c) 2019 Mateusz Furga <matfurga@gmail.com>.', 'color: green;');
  console.log('%c Type `cube` in the console to perform cube operations.', 'color: green;');

  var urlParams = new URLSearchParams(window.location.search);
  var faces = {};

  document.querySelectorAll('.field').forEach((field) => {
    try {
      faces[field.parentNode.id].push(Cube.COLORS.indexOf(field.dataset.color));
    } catch (TypeError) {
      faces[field.parentNode.id] = [];
      faces[field.parentNode.id].push(Cube.COLORS.indexOf(field.dataset.color));
    }
  });

  cube = new Cube(faces);

  // Generate the random state by the URL parameter.
  if (urlParams.has('rand')) {
    cube.doRandomPermutation(urlParams.get('rand'));
  }

  var fields = document.querySelectorAll('.field');
  fields.forEach((field) => {
    field.addEventListener('click', function() {
      this.dataset.color = pickedColor;
      cube.setColorAndCommit(
        this.parentNode.id, this.dataset.id, Cube.COLORS.indexOf(this.dataset.color));
    });
  });
});
