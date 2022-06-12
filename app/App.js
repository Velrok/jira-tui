const React = require("react");
const { useState, useEffect } = require("react");
const { render, Text } = require("ink");

const example_project_key = "Ne5DCLO07RXWi4L2cSBX2F00";

const Counter = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((previousCounter) => previousCounter + 1);
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <Text color="green">{counter} tests passed</Text>;
};

render(<Counter />);
