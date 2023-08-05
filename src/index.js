import React from "react";
import ReactDOM from "react-dom";
import Start from "./components/front";
import Game from "./components/game";
import "./index.css";

export default function Qadar(props) {
  const [apiData, setApiData] = React.useState([]);
  const [topic, settopic] = React.useState("");
  const [isClickedAnswerCorrect, setIsClickedAnswerCorrect] = React.useState(
    Array(4).fill(null)
  );
  const [isCheckAnswerClicked, setIsCheckAnswerClicked] = React.useState(false);
  const [Endgame, ResetGame] = React.useState(false);
  const [correctAnswrchosen, setanswrs] = React.useState([]);
  const [clickedAnswers, setClickedAnswers] = React.useState(
    Array(4).fill(null)
  );

  const [show, Setvalue] = React.useState({
    value: true,
  });

  function clicked() {
    if (topic)
      Setvalue((pervValue) => {
        return {
          value: !pervValue,
        };
      });
    fetch(`${topic}`)
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.results.map((question) => {
          const answers = [
            question.correct_answer,
            ...question.incorrect_answers,
          ];
          answers.sort(() => Math.random() - 0.5);
          return {
            question: question.question,
            answers: answers,
            correctAnswer: question.correct_answer,
          };
        });
        // set the state to the data we just got
        setApiData(formattedData);
      });
  }
  // create func that takes in 2 parametars the index of the Q and the index of the answer of that q since its multiple choice answers
  function Answerclicked(questionIndex, answerIndex) {
    // set the state to those answer index that gets clicked on
    if (!isCheckAnswerClicked)
      setClickedAnswers((prevState) => {
        const updatedAnswers = [...prevState];
        // that q index when in of the clicked answer index get the answer index
        updatedAnswers[questionIndex] = answerIndex;
        return updatedAnswers;
      });
  }
  function checkAnswers() {
    // check if the answers selected

    const isAllAnswered = clickedAnswers.every((answer) => answer !== null);

    if (isAllAnswered) {
      // go through the data and its 4 Q get 4 and map through each one
      const isAnswerCorrect = apiData.slice(0, 4).map((question, index) => {
        // the index of the answr we clicked on
        const selectedAnswerIndex = clickedAnswers[index];
        // now check if that (question.answers[selectedAnswerIndex]) meaning the answer we choce is the correct answer of that question
        const isAnswerCorrect =
          question.correctAnswer === question.answers[selectedAnswerIndex];
        return isAnswerCorrect;
      });
      setanswrs(isAnswerCorrect);
      // set the state of the answers false or to according to the checking we did ^^^
      setIsClickedAnswerCorrect(isAnswerCorrect);
      setIsCheckAnswerClicked(true);
      ResetGame(true);
    }
  }

  function shuffleArray(array) {
    // strart from the end of the array and move to left till you go through each element
    for (let i = array.length - 1; i > 0; i--) {
      // randomly pick number from the start of the index of the array (i)
      const j = Math.floor(Math.random() * (i + 1));
      // now swap positions
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const questions = apiData.slice(0, 4).map((question, index) => {
    return (
      <Game
        key={question.question}
        apiData={apiData}
        question={question.question}
        answers={question.answers}
        picked={(answerIndex) => Answerclicked(index, answerIndex)}
        isitclicked={isCheckAnswerClicked}
        pickedAswer={clickedAnswers[index]}
        correct_answer={question.correctAnswer[index]}
        isClickedAnswerCorrect={isClickedAnswerCorrect[index]}
      />
    );
  });
  function ResetgameClick() {
    if (Endgame) ResetGame(false);
    setIsCheckAnswerClicked(false);
    shuffleArray(apiData);
    setIsClickedAnswerCorrect(Array(4).fill(null));
    setClickedAnswers(Array(4).fill(null));
    return <Game />;
  }
  function exitgame() {
    Setvalue(() => {
      return {
        value: true,
      };
    });
   
    setIsClickedAnswerCorrect(Array(4).fill(null));
    setClickedAnswers(Array(4).fill(null));
    setIsCheckAnswerClicked(false);
    ResetGame(false);
    settopic("");
  }
  return (
    <>
      {show.value ? (
        <Start handlecick={clicked} settopic={settopic} />
      ) : (
        <>
          {questions}
          <div className=" flex flex-col items-center mt-8">
            {Endgame ? (
              <div className=" text-center">
                {" "}
                <h2 key={questions} className="mb-4">
                  score {" "}
                  <span className="text-green-500">
                    {correctAnswrchosen.filter(Boolean).length}
                  </span>{" "}
                  / {questions.length}
                </h2>
                <button
                  className="  bg-red-500 text-white py-2 px-4 mr-3 rounded-lg shadow-md hover:bg-red-600 "
                  onClick={exitgame}
                >
                  exit
                </button>
                <button
                  className="  bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
                  onClick={ResetgameClick}
                >
                  Start a new game
                </button>{" "}
              </div>
            ) : (
              <button
                className=" bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
                onClick={checkAnswers}
              >
                Check
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
}

ReactDOM.render(<Qadar />, document.getElementById("root"));
