import React from "react";
import Box from "@mui/material/Box";
import Games from "./videogames.png";
import Art from "./art.png";
import politics from "./politics.png";
export default function Start(props) {
  const [selected, setselected] = React.useState();
  function handleBoxClick(index) {
    let selectedTopic = "";

    if (index === 1) {
      selectedTopic =
        "https://opentdb.com/api.php?amount=10&category=15&type=multiple";
    } else if (index === 2) {
      selectedTopic =
        "https://opentdb.com/api.php?amount=10&category=25&type=multiple";
    } else if (index === 3) {
      selectedTopic =
        "https://opentdb.com/api.php?amount=10&category=24&type=multiple";
    }

    setselected(index);
    props.settopic(selectedTopic);
  }

  return (
    <div className="start-style">
      <div className="py-11 text-blue-500 text-4xl font-bold">Quizly</div>
      <div className="text-blue-400 text-lg font-semibold">Select a Topic</div>
      <div className="flex flex-col md:flex-row gap-6 md:gap-20 py-10">
        <div className="w-full md:w-1/3">
          <Box
            sx={{
              width: "100%",
              height: 150,
              backgroundColor: "primary.dark",
              borderRadius: "8px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
              "&:hover": {
                backgroundColor: "primary.main",
                opacity: [0.9, 0.8, 0.7],
              },
              border: selected === 1 ? "3px solid #1E40AF" : "none",
            }}
            onClick={() => handleBoxClick(1)}
          >
            <img
              src={Games}
              alt="Golf"
              className="h-full w-full object-cover"
            />
            <p className="text-lg text-center py-2">Video Games</p>
          </Box>
        </div>
        <div className="w-full md:w-1/3">
          <Box
            sx={{
              width: "100%",
              height: 150,
              backgroundColor: "primary.dark",
              borderRadius: "8px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
              "&:hover": {
                backgroundColor: "primary.main",
                opacity: [0.9, 0.8, 0.7],
              },
              border: selected === 2 ? "3px solid #1E40AF" : "none",
            }}
            onClick={() => handleBoxClick(2)}
          >
            <img src={Art} alt="" className="h-full w-full object-cover" />
            <p className="text-lg text-center py-2">Art</p>
          </Box>
        </div>
        <div className="w-full md:w-1/3">
          <Box
            sx={{
              width: "100%",
              height: 150,
              backgroundColor: "primary.dark",
              borderRadius: "8px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
              "&:hover": {
                backgroundColor: "primary.main",
                opacity: [0.9, 0.8, 0.7],
              },
              border: selected === 3 ? "3px solid #1E40AF" : "none",
            }}
            onClick={() => handleBoxClick(3)}
          >
            <img src={politics} alt="" className="h-full w-full object-cover" />
            <p className="text-lg text-center py-2">Politics</p>
          </Box>
        </div>
      </div>
      <div className="py-10 md:py-40">
        <button onClick={props.handlecick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-lg transition-colors duration-300">
          Start Quiz
        </button>
      </div>
    </div>
  );
}
