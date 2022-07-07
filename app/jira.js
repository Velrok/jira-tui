// {
//   host: process.env.JIRA_HOST,
//   authentication: {
//     personalAccessToken: process.env.PERSONAL_ACCESS_TOKEN,
//   },
// }

const base64 = require('base-64');
const fetch = require('node-fetch');

const credentials = process.env.JIRA_USER_NAME + ":" + process.env.JIRA_PERSONAL_ACCESS_TOKEN

const request = (path, method= 'GET', extra_options= {}) => {
  const options = {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + base64.encode(credentials)
    }
  }
  
  // const url = process.env.JIRA_HOST + '/rest/api/3/issue/MER-1142'
  const url = process.env.JIRA_HOST + path //'/rest/api/3/myself'
  return fetch(url, {...options, ...extra_options})
    .then(response => response.json())
}

const fetch_issues = (page=0) => {
  const page_size = 50
  return request('/rest/api/3/search?jql=project%20%3D%20'
    + process.env.JIRA_PROJECT
    + '&maxResults=' + page_size
    + '&startAt=' + page_size * page
  )
}

module.exports = { fetch_issues };
