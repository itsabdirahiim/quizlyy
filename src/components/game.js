import React from "react";
import he from 'he';

export default function Game(props){

const styles = (index) => ({
  // make sure if the answer we clicked on is the same as the one we styling if so give it border of 3px
  borderWidth: props.pickedAswer === index ? '5px' : '',
  backgroundColor:
  // if the check button is clicked and we  sure that the answer we clicked on is the same as the one we styling 
  props.isitclicked &&  props.pickedAswer === index
    // check if the answer of that Question has value true or false 
        ? props.isClickedAnswerCorrect ? '#4CAF50' : '#FF5252'
        : '#FFFFFF',
  
});

let game = (
  <div className="test-game">
    <h1 className="the-question text-xl font-bold mb-6">{he.decode(props.question)}</h1>
    {props.answers.map((answer, index) => (
      <spam
      className=" block py-3 px-4 mb-4 rounded-lg shadow-md cursor-pointer text-base"
        onClick={() => props.picked( index)}
        style={styles(index)}
        key={index}
      >
        {he.decode(answer)}
      </spam>
      
    )) }
 
  </div>

);

  return (
    <div>{props.apiData ? game : <div>Loading...</div>}</div>
  )
}

      