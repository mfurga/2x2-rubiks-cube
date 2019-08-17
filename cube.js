// Copyright (c) 2019 Mateusz Furga <matfurga@gmail.com>
'use strict';

const CUBE_NOTATIONS = [
  'up', 'down', 'right', 'left', 'front', 'back', 'upR', 'downR', 'rightR', 'leftR', 'frontR', 'backR'
];
const CUBE_NOTATIONS_REAL = {
  'up': 'U',
  'down': 'D',
  'right': 'R',
  'left': 'L',
  'front': 'F',
  'back': 'B',
  'upR': 'U\'',
  'downR': 'D\'',
  'rightR': 'R\'',
  'leftR': 'L\'',
  'frontR': 'F\'',
  'backR': 'B\''
};

const CUBE_NOTATIONS_REAL_REVERSE = {
  'U': 'up',
  'D': 'down',
  'R': 'right',
  'L': 'left',
  'F': 'front',
  'B': 'back',
  'U\'': 'upR',
  'D\'': 'downR',
  'R\'': 'rightR',
  'L\'': 'leftR',
  'F\'': 'frontR',
  'B\'': 'backR'
}

class Cube {
  #faces;
  #facesCopy;
  
  // cube colors
  static C_RED    = 0;
  static C_ORANGE = 1;
  static C_BLUE   = 2;
  static C_GREEN  = 3;
  static C_WHITE  = 4;
  static C_YELLOW = 5;

  static COLORS = ['red', 'orange', 'blue', 'green', 'white', 'yellow'];
  static FACES  = ['up' , 'down'  , 'left', 'right', 'front', 'back'];

  constructor(faces) {
    this.#faces = JSON.parse(JSON.stringify(faces));
    this.#facesCopy = JSON.parse(JSON.stringify(faces));
  }

  /*
   * Commits the current state.
   */
  #commit = () => {
    this.#faces = JSON.parse(JSON.stringify(this.#facesCopy)); 
  };

  getFaces() {
    return this.#faces;
  }
  
  /*
   * Sets a color in the given position.
   */
  setColor(face, id, color) {
    this.#facesCopy[face][id] = color;  
  }
  
  /*
   * Sets a color in the given position and commits changes.
   */
  setColorAndCommit(face, id, color) {
    this.#facesCopy[face][id] = color;
    this.#commit();
  }

  /*
   * Gets a color in the given position.
   */
  getColor(face, id) {
    return this.#faces[face][id];
  }
 
  /*
   * Checks if the given faces are solved.
   */
  static isSolved(faces) {
    for (const f of Cube.FACES) {
      if (faces[f][0] != faces[f][1] || faces[f][0] != faces[f][2] || faces[f][0] != faces[f][3])
        return false;
    }
    return true;
  }
  
  /*
   * Checks if `face1` and `face2` are equal.
   */
  static isEqual(face1, face2) {
    for (const f of Cube.FACES) {
      for (var i = 0; i < 4; i++)
        if (face1[f][i] != face2[f][i])
          return false;
    }
    return true;
  }

  /*
   * Generates `times` random operations on the cube.
   */
  doRandomPermutation(times, verbose=false) {
    for (var i = 0; i < times; i++) {
      var notation = CUBE_NOTATIONS[Math.floor(Math.random() * CUBE_NOTATIONS.length)];
      if (verbose)
        console.log(CUBE_NOTATIONS_REAL[notation]);
      this[notation](false);
    }
    this.draw();
  }

  /*
   * Performs the given `permutation` on the cube.
   */
  doPermutation(permutation) {
    for (var i = 0; i < permutation.length; i++) {
      if (permutation[i + 1] !== undefined && permutation[i + 1] === '\'') {
        cube[CUBE_NOTATIONS_REAL_REVERSE[permutation[i] + permutation[i + 1]]](false);
        i += 1;
        continue;
      }
      if (CUBE_NOTATIONS_REAL_REVERSE[permutation[i]] !== undefined)
        cube[CUBE_NOTATIONS_REAL_REVERSE[permutation[i]]](false);
    }
    this.draw();
  }

  /*
   * Generates the solved state on the cube.
   */
  generateSolvedState() {
    for (const f of Cube.FACES) {
      for (var i = 0; i < 4; i++)
        this.setColor(f, i, Cube.FACES.indexOf(f));
    }
    this.#commit();
    this.draw();
  }
  
  /*
   * Draws colors on the cube using faces.
   */
  draw() {
    document.querySelectorAll('.field').forEach((field) => {
      field.dataset.color = Cube.COLORS[this.getColor(field.parentNode.id, field.dataset.id)];
    });
  }
  
  /*
   * Rotates the given face to the right.
   */
  rotateFace(face) {
    var rotated = [];
    rotated[0] = this.#faces[face][2];
    rotated[1] = this.#faces[face][0];
    rotated[2] = this.#faces[face][3];
    rotated[3] = this.#faces[face][1];
    this.#facesCopy[face] = rotated;
  }
  
  /*
   * Rotates the given face to the left.
   */
  rotateFaceR(face) {
    var rotated = [];
    rotated[0] = this.#faces[face][1];
    rotated[1] = this.#faces[face][3];
    rotated[2] = this.#faces[face][0];
    rotated[3] = this.#faces[face][2];
    this.#facesCopy[face] = rotated;
  }

  up(draw=true) {
    // right face 
    this.setColor('right', 0, this.getColor('back', 0));
    this.setColor('right', 1, this.getColor('back', 1));

    // left face
    this.setColor('left', 0, this.getColor('front', 0));
    this.setColor('left', 1, this.getColor('front', 1));

    // front face
    this.setColor('front', 0, this.getColor('right', 0));
    this.setColor('front', 1, this.getColor('right', 1));

    // back face
    this.setColor('back', 0, this.getColor('left', 0));
    this.setColor('back', 1, this.getColor('left', 1));

    this.rotateFace('up');

    this.#commit();
    if (draw) this.draw();
  }

  upR(draw=true) {
    // right face
    this.setColor('right', 0, this.getColor('front', 0));
    this.setColor('right', 1, this.getColor('front', 1));

    // left face
    this.setColor('left', 0, this.getColor('back', 0));
    this.setColor('left', 1, this.getColor('back', 1));
   
    // front face
    this.setColor('front', 0, this.getColor('left', 0));
    this.setColor('front', 1, this.getColor('left', 1));
  
    // back face
    this.setColor('back', 0, this.getColor('right', 0));
    this.setColor('back', 1, this.getColor('right', 1));
  
    this.rotateFaceR('up');

    this.#commit();
    if (draw) this.draw();
  }

  down(draw=true) {
    // right face
    this.setColor('right', 2, this.getColor('front', 2));
    this.setColor('right', 3, this.getColor('front', 3));

    // left face
    this.setColor('left', 2, this.getColor('back', 2));
    this.setColor('left', 3, this.getColor('back', 3));

    // front face
    this.setColor('front', 2, this.getColor('left', 2));
    this.setColor('front', 3, this.getColor('left', 3));

    // back face
    this.setColor('back', 2, this.getColor('right', 2));
    this.setColor('back', 3, this.getColor('right', 3)); 

    this.rotateFace('down');

    this.#commit();
    if (draw) this.draw();
  }

  downR(draw=true) {
    // right face
    this.setColor('right', 2, this.getColor('back', 2));
    this.setColor('right', 3, this.getColor('back', 3));

    // left face
    this.setColor('left', 2, this.getColor('front', 2));
    this.setColor('left', 3, this.getColor('front', 3));

    // front face
    this.setColor('front', 2, this.getColor('right', 2));
    this.setColor('front', 3, this.getColor('right', 3));

    // back face
    this.setColor('back', 2, this.getColor('left', 2));
    this.setColor('back', 3, this.getColor('left', 3));

    this.rotateFaceR('down');

    this.#commit();
    if (draw) this.draw();
  }

  right(draw=true) {
    // up face
    this.setColor('up', 1, this.getColor('front', 1)); 
    this.setColor('up', 3, this.getColor('front', 3)); 

    // down face
    this.setColor('down', 1, this.getColor('back', 2)); 
    this.setColor('down', 3, this.getColor('back', 0)); 
  
    // front face
    this.setColor('front', 1, this.getColor('down', 1)); 
    this.setColor('front', 3, this.getColor('down', 3)); 

    // back face
    this.setColor('back', 0, this.getColor('up', 3)); 
    this.setColor('back', 2, this.getColor('up', 1)); 

    this.rotateFace('right');

    this.#commit();
    if (draw) this.draw();
  }

  rightR(draw=true) {
    // up face
    this.setColor('up', 1, this.getColor('back', 2));
    this.setColor('up', 3, this.getColor('back', 0)); 
    
    // down face
    this.setColor('down', 1, this.getColor('front', 1));
    this.setColor('down', 3, this.getColor('front', 3)); 

    // front face
    this.setColor('front', 1, this.getColor('up', 1));
    this.setColor('front', 3, this.getColor('up', 3)); 

    // back face
    this.setColor('back', 0, this.getColor('down', 3));
    this.setColor('back', 2, this.getColor('down', 1)); 

    this.rotateFaceR('right');

    this.#commit();
    if (draw) this.draw();
  }

  left(draw=true) {
    // up face
    this.setColor('up', 0, this.getColor('back', 3));
    this.setColor('up', 2, this.getColor('back', 1));

    // down face 
    this.setColor('down', 0, this.getColor('front', 0));
    this.setColor('down', 2, this.getColor('front', 2));

    // front face
    this.setColor('front', 0, this.getColor('up', 0)); 
    this.setColor('front', 2, this.getColor('up', 2)); 
  
    // back face 
    this.setColor('back', 1, this.getColor('down', 2));
    this.setColor('back', 3, this.getColor('down', 0));

    this.rotateFace('left');

    this.#commit();
    if (draw) this.draw();
  }

  leftR(draw=true) {
    // up face
    this.setColor('up', 0, this.getColor('front', 0));
    this.setColor('up', 2, this.getColor('front', 2));

    // down face
    this.setColor('down', 0, this.getColor('back', 3));
    this.setColor('down', 2, this.getColor('back', 1));

    // front face
    this.setColor('front', 0, this.getColor('down', 0));
    this.setColor('front', 2, this.getColor('down', 2));
    
    // back face
    this.setColor('back', 1, this.getColor('up', 2));
    this.setColor('back', 3, this.getColor('up', 0));

    this.rotateFaceR('left');

    this.#commit();
    if (draw) this.draw();
  }

  front(draw=true) {
    // up face
    this.setColor('up', 2, this.getColor('left', 3)); 
    this.setColor('up', 3, this.getColor('left', 1)); 

    // down face
    this.setColor('down', 0, this.getColor('right', 2)); 
    this.setColor('down', 1, this.getColor('right', 0)); 
  
    // right face
    this.setColor('right', 0, this.getColor('up', 2)); 
    this.setColor('right', 2, this.getColor('up', 3));

    // left face
    this.setColor('left', 1, this.getColor('down', 0)); 
    this.setColor('left', 3, this.getColor('down', 1));
 
    this.rotateFace('front');

    this.#commit();
    if (draw) this.draw();
  }

  frontR(draw=true) {
    // up face
    this.setColor('up', 2, this.getColor('right', 0)); 
    this.setColor('up', 3, this.getColor('right', 2)); 
  
    // down face
    this.setColor('down', 0, this.getColor('left', 1)); 
    this.setColor('down', 1, this.getColor('left', 3)); 
    
    // right face
    this.setColor('right', 0, this.getColor('down', 1)); 
    this.setColor('right', 2, this.getColor('down', 0)); 
    
    // left face
    this.setColor('left', 1, this.getColor('up', 3)); 
    this.setColor('left', 3, this.getColor('up', 2)); 
    
    this.rotateFaceR('front');

    this.#commit();
    if (draw) this.draw();
  }

  back(draw=true) {
    // up face
    this.setColor('up', 0, this.getColor('right', 1));
    this.setColor('up', 1, this.getColor('right', 3));
    
    // down face
    this.setColor('down', 2, this.getColor('left', 0));
    this.setColor('down', 3, this.getColor('left', 2));
    
    // right face
    this.setColor('right', 1, this.getColor('down', 3));
    this.setColor('right', 3, this.getColor('down', 2));

    // left face
    this.setColor('left', 0, this.getColor('up', 1));
    this.setColor('left', 2, this.getColor('up', 0));

    this.rotateFace('back');
  
    this.#commit();
    if (draw) this.draw();
  }

  backR(draw=true) {
    // up face
    this.setColor('up', 0, this.getColor('left', 2));
    this.setColor('up', 1, this.getColor('left', 0));

    // down face
    this.setColor('down', 2, this.getColor('right', 3));
    this.setColor('down', 3, this.getColor('right', 1));

    // right face
    this.setColor('right', 1, this.getColor('up', 0));
    this.setColor('right', 3, this.getColor('up', 1));

    // left face
    this.setColor('left', 0, this.getColor('down', 2));
    this.setColor('left', 2, this.getColor('down', 3));

    this.rotateFaceR('back');

    this.#commit();
    if (draw) this.draw();
  }
}

