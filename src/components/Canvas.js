import React, { Component } from 'react'

const getClosestPerfectSquare = (arr) => { 
  const perfectSquares = [9, 16, 25, 36, 49, 64, 81, 100];
  var arrayLength = arr.length;
  let closest = perfectSquares.reverse().find(e => e <= arrayLength);
  
  if (arrayLength >= 9){
    return closest;
  }
};

const canvasSize = 500;

class Canvas extends Component {

  constructor(props) {
    super(props);
    this.processImage = this.processImage.bind(this);
  }

  componentDidMount() {
    // setTimeout since I can't seem to draw on the canvas until the page loads 
    setTimeout(this.processImage, 1000);
  }

  // Draws on canvas

  processImage() {
    const canvas = this.refs.canvas;
    const context = canvas.getContext("2d");
    var j = 0;
    var k = 0;
    var gridSquares = getClosestPerfectSquare(this.props.albumArtArray);
    var rowSquares = Math.sqrt(gridSquares);
    var squareSize = (canvasSize / rowSquares);
  
    for (var x = 0; x < gridSquares; x++) {
        if(k > (rowSquares - 1)) {
            j = j + 1;
            k = 0;
        };
        var index = k * rowSquares + j;
        context.drawImage(this.props.albumArtArray[index], (k * squareSize), (j * squareSize), squareSize, squareSize);
        k = k + 1;
      }
      console.log("done processing canvas");
    };


  render() {

    console.log(this.props.albumArtArray);
    console.log(getClosestPerfectSquare(this.props.albumArtArray));

    return (
      <div>
        <div>
          <canvas ref="canvas" width={canvasSize} height={canvasSize}/>
        </div>
      </div>
    )
  }
}



export default Canvas;
