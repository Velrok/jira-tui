const React = require("react");
const { useState, useEffect } = require("react");
const { render, Text, Box, useApp, useInput } = require("ink");

const { getTickets } = require("./jira");

const AppTitle = () => <Text>Jira</Text>;

const App = () => {
  const { exit } = useApp();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    getTickets().then((tickets) => {
      console.log(tickets);
      setTickets(tickets);
    });
  }, []);

  useInput((input, _key) => {
    input === "q" && exit();
    // input === "j" && focusNext();
    // input === "k" && focusPrevious();
    // input === "/" && focus(SEARCH_FOCUS_ID);
  });

  return (
    <Box flexDirection="row" height={"100%"} flexGrow={1} borderStyle="single">
      <AppTitle></AppTitle>
      <Box>
        {tickets.map((ticket, idx) => (
          <Text key={`ticket-list-${idx}`}>{ticket}</Text>
        ))}
      </Box>
    </Box>
  );
};

render(<App />);
