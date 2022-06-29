const { Version3Client } = require("jira.js");

const client = new Version3Client({
  host: process.env.JIRA_HOST,
  authentication: {
    personalAccessToken: process.env.PERSONAL_ACCESS_TOKEN,
  },
});

const getTickets = async () => {
  // NOTE: this client is super annoying to understand
  response = client.issueSearch({
    jql: "project = MER",
  });
  // response = await client.issueSearch.searchForIssuesUsingJql({
  //   jql: "project = MER",
  // });
  console.log(response);
  return response.sections[0].issues;
};

module.exports = { getTickets };
