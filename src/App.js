import React, { Component } from "react";
import Array from "./components/array";
import Navbar from "./components/navbar";
import { getQuicksortAnimations } from "./algorithms/quicksort";
import { getBubblesortAnimations } from "./algorithms/bubblesort";
import { getHeapsortAnimations } from "./algorithms/heapsort";

const comparingColor = "pink";
const pivotColor = "red";
const indexColor = "purple";
const originalColor = "cadetblue";

class App extends Component {
  state = {
    array: [],
    algorithm: "",
  };

  //Creates the random array when app is loaded
  componentDidMount() {
    // let myArray = [];
    // for (let i = 500; i > 0; i -= 2) {
    //   myArray.push(i);
    // }
    // this.setState({ array: myArray });
    const array = [];
    for (let i = 0; i < 250; i++) {
      array.push(this.getRandomInt(5, 500));
    }
    this.setState({ array });
  }

  disableStartandGenerate() {
    const generateButton = document.getElementById("generatebutton");
    const startButton = document.getElementById("startbutton");
    generateButton.disabled = startButton.disabled = true;
  }

  enableStartorGenerate(button) {
    const generateButton = document.getElementById("generatebutton");
    const startButton = document.getElementById("startbutton");
    if (button === "start") {
      startButton.disabled = false;
    } else {
      generateButton.disabled = false;
    }
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // Updates state algorithm
  changeAlgorithm = (chosen) => {
    this.setState({ algorithm: chosen });
  };

  resetColors() {
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < bars.length; i++) {
      bars[i].style.backgroundColor = originalColor;
    }
  }

  //Genarates new random array and enables start button
  onReset = () => {
    const array = [];
    for (let i = 0; i < 250; i++) {
      array.push(this.getRandomInt(5, 500));
    }
    this.setState({ array });
    this.resetColors();
    this.enableStartorGenerate("start");
  };

  arraysAreEqual = (array) => {
    const javaSorted = array.slice().sort((a, b) => a - b);
    let lenghtOne = array.length;
    let lenghtTwo = javaSorted.length;
    if (lenghtOne !== lenghtTwo) return false;
    for (let i = 0; i < array.length; i++) {
      if (array[i] !== javaSorted[i]) {
        // console.log(arrayOne[i], javaSorted[i]);
        return false;
      }
    }
    return true;
  };

  startSort = () => {
    const chosenAlgorithm = this.state.algorithm;
    const array = this.state.array;
    let barsArray = document.getElementsByClassName("bar");
    if (chosenAlgorithm.length > 0) {
      if (chosenAlgorithm === "quicksort") {
        let animations = getQuicksortAnimations(array);
        this.quicksortAnimator(animations, barsArray);
      } else if (chosenAlgorithm === "bubblesort") {
        let animations = getBubblesortAnimations(array);
        this.bubblesortAnimator(animations, barsArray);
      } else if (chosenAlgorithm === "heapsort") {
        let animations = getHeapsortAnimations(array);
        console.log(animations);
        this.heapsortAnimator(animations, barsArray);
      }
    }
  };

  // Animations array [state, largest, comparison]
  heapsortAnimator = (animations, barsArray) => {
    for (let i = 0; i < animations.length; i++) {
      const [state, largest, comparison] = animations[i];
      const largestBar = barsArray[largest].style;
      const comparisonBar = barsArray[comparison].style;
      if (state === "comparing") {
        //Colors and restores bars being compared
        setTimeout(() => {
          largestBar.backgroundColor = pivotColor;
          comparisonBar.backgroundColor = pivotColor;
        }, i * 5);

        setTimeout(() => {
          largestBar.backgroundColor = originalColor;
          comparisonBar.backgroundColor = originalColor;
        }, (i + 1) * 5);
      } else {
        //Swaps bar's heights
        setTimeout(() => {
          let tmp = largestBar.height;
          largestBar.height = comparisonBar.height;
          comparisonBar.height = tmp;
        }, (i + 2) * 5);
      }
    }
    // Turns all bars green - completed
    setTimeout(() => {
      for (let i = 0; i < barsArray.length; i++) {
        barsArray[i].style.backgroundColor = "green";
      }
      this.enableStartorGenerate("generate");
    }, 5 * animations.length);
    this.disableStartandGenerate();
  };

  // Animations array: [state, i, i + 1]
  bubblesortAnimator = (animations, barsArray) => {
    for (let i = 0; i < animations.length; i++) {
      const [state, iOne, iTwo] = animations[i];
      let iOneBar = barsArray[iOne].style;
      let iTwoBar = barsArray[iTwo].style;
      if (state === "comparing") {
        //Colors and resotores bars being compared
        setTimeout(() => {
          iOneBar.backgroundColor = indexColor;
        }, i * 0.5);

        setTimeout(() => {
          iOneBar.backgroundColor = originalColor;
        }, (i + 1) * 0.5);
      } else {
        //Swaps bar's heights
        setTimeout(() => {
          let tmp = iOneBar.height;
          iOneBar.height = iTwoBar.height;
          iTwoBar.height = tmp;
        }, i * 0.5);
      }
    }
    // Turns all bars green - completed
    setTimeout(() => {
      for (let i = 0; i < barsArray.length; i++) {
        barsArray[i].style.backgroundColor = "green";
      }
      this.enableStartorGenerate("generate");
    }, 26000);
    this.disableStartandGenerate();
  };

  // Animations array: ["state", pIndex, i, end]
  quicksortAnimator = (animations, barsArray) => {
    for (let i = 0; i < animations.length; i++) {
      const [state, pIndex, barTwoIndex, pivotIndex] = animations[i];
      const pIndexBar = barsArray[pIndex].style;
      const barTwoStyle = barsArray[barTwoIndex].style;
      const pivotBar = barsArray[pivotIndex].style;
      //Changes bars colors accordingly
      if (state === "comparing") {
        setTimeout(() => {
          pIndexBar.backgroundColor = indexColor;
          barTwoStyle.backgroundColor = comparingColor;
          pivotBar.backgroundColor = pivotColor;
        }, i * 5);

        // Turns bars back to blue
        setTimeout(() => {
          pIndexBar.backgroundColor = originalColor;
          barTwoStyle.backgroundColor = originalColor;
          pivotBar.backgroundColor = originalColor;
        }, (i + 1) * 5);
      } else {
        //Swaps bar's heights
        setTimeout(() => {
          let tmp = pIndexBar.height;
          pIndexBar.height = barTwoStyle.height;
          barTwoStyle.height = tmp;
        }, i * 5);
      }
    }
    // Turns all bars green - completed
    setTimeout(() => {
      for (let i = 0; i < barsArray.length; i++) {
        barsArray[i].style.backgroundColor = "green";
      }
      this.enableStartorGenerate("generate");
    }, 5 * animations.length);
    this.disableStartandGenerate();
  };

  render() {
    return (
      <React.Fragment>
        <Navbar
          selectAlgorithm={this.changeAlgorithm}
          onStart={this.startSort}
          onReset={this.onReset}
        />
        <Array randomArray={this.state.array} />;
      </React.Fragment>
    );
  }
}

export default App;
