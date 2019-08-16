// Copyright (c) 2019 Mateusz Furga <matfurga@gmail.com>
'use strict';

const CUBE_FACES = ['up', 'down', 'left', 'right', 'front', 'back'];
const CUBE_NOTATIONS = [
  'up', 'down', 'right', 'left', 'front', 'back', 'upR', 'downR', 'rightR', 'leftR', 'frontR', 'backR'
];

class Cube {
  constructor(faces) {
    this.faces = JSON.parse(JSON.stringify(faces));
    this.prefaces = JSON.parse(JSON.stringify(faces));
  }

  commit() {
    this.faces = JSON.parse(JSON.stringify(this.prefaces)); 
  }

  setColor(face, id, color) {
    this.prefaces[face][id] = color;
  }

  getColor(face, id) {
    return this.faces[face][id];
  }
  
  is_solved() {
    for (var i = 0; i < CUBE_FACES.length; i++) {
      var face = CUBE_FACES[i];
      var color = this.faces[face][0];

      if (color != this.faces[face][1] || color != this.faces[face][2] || color != this.faces[face][3])
        return false;
    }
    return true;
  }

  draw() {
    document.querySelectorAll('.field').forEach((field) => {
      field.dataset.color = this.getColor(field.parentNode.id, field.dataset.id);
    });
  }

  rotateFace(face) {
    var rotated = [];
    rotated[0] = this.faces[face][2];
    rotated[1] = this.faces[face][0];
    rotated[2] = this.faces[face][3];
    rotated[3] = this.faces[face][1];
    this.prefaces[face] = rotated;
  }

  rotateFaceR(face) {
    var rotated = [];
    rotated[0] = this.faces[face][1];
    rotated[1] = this.faces[face][3];
    rotated[2] = this.faces[face][0];
    rotated[3] = this.faces[face][2];
    this.prefaces[face] = rotated;
  }

  up() {
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

    this.commit(); 
    //this.draw();
  }

  upR() {
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

    this.commit();
    //this.draw();
  }

  down() {
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

    this.commit();
    //this.draw();
  }

  downR() {
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

    this.commit();
    //this.draw();
  }

  right() {
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

    this.commit();
    //this.draw();
  }

  rightR() {
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

    this.commit();
    //this.draw();
  }

  left() {
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

    this.commit();
    //this.draw();
  }

  leftR() {
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

    this.commit();
    //this.draw();
  }

  front() {
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

    this.commit();
    //this.draw();
  }

  frontR() {
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

    this.commit();
    //this.draw();
  }

  back() {
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
  
    this.commit();
    //this.draw();
  }

  backR() {
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

    this.commit();
    //this.draw();
  }
}

