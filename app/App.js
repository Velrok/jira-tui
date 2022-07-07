const React = require("react");
const { useState, useEffect } = require("react");
const { render, Text, Box, useApp, useInput, useFocusManager, useFocus } = require("ink");

const { fetch_issues } = require("./jira");

const AppTitle = () => <Text>Jira</Text>;

const JiraIssue = ({ issue }) => {
  const { isFocused } = useFocus();
  return <Box>
    <Text bold={isFocused}>
      <Text inverse>{issue.key}</Text>
      <Text> {issue.fields.summary}</Text>
    </Text>
  </Box>
}
// <Text>{issue.fields.assignee.name}</Text>
// <Text>{issue.fields.status}</Text>
// <Text>{issue.fields.creator}</Text>
// <Text>{issue.fields.resporter}</Text>
// <Text>{issue.fields.issuetype}</Text>
// <Text>{issue.fields.project}</Text>

const App = () => {
  const { exit } = useApp();
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetch_issues().then((data) => {
      const issues = data.issues
      setIssues(issues);
    });
  }, []);

  const {focusPrevious, focusNext} = useFocusManager()

  useInput((input, _key) => {
    input === "q" && exit();
    input === "j" && focusNext();
    input === "k" && focusPrevious();
    // input === "/" && focus(SEARCH_FOCUS_ID);
  });

  return (
    <Box flexDirection="column" height={"100%"} flexGrow={1} borderStyle="single">
      <AppTitle></AppTitle>
      <Box flexDirection="column" borderStyle="single">
        {issues.map((issue, idx) => (
          <JiraIssue key={issue.key} issue={issue} />
        ))}
      </Box>
    </Box>
  );
};

render(<App />);
