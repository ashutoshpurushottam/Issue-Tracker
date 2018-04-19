document.getElementById('issue-input-form').addEventListener('submit', saveIssue);

function saveIssue(e) {
  const issueDescription = document.getElementById('issue-description-input').value;
  const issueSeverity = document.getElementById('issue-severity-input').value;
  const issueAssignedTo = document.getElementById('issue-assigned-input').value;
  const issueId = chance.guid();
  const issueStatus = 'Open';

  const issue = {
    id: issueId,
    description: issueDescription,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus
  }

  let issues = [];
  if(localStorage.getItem('issues')) {
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issue-input-form').reset();
  fetchIssues();
  e.preventDefault();
}


function fetchIssues() {
  let issues = [];
  if(localStorage.getItem('issues')) {
    issues = JSON.parse(localStorage.getItem('issues'));
  }

  const issueList = document.getElementById('issue-list');
  issueList.innerHTML = '';

  for(let issue of issues) {
    const id = issue.id;
    const description = issue.description;
    const severity = issue.severity;
    const assignedTo = issue.assignedTo;
    const status = issue.status;

    const btnClass = (issue.status == 'Open') ? "btn-warning" : "disabled"; 

    issueList.innerHTML += `<div class="well">
      <h6>${id}</h6>
      <p><span class="label label-info">${status}</span></p>
      <h3>${description}<h3>
      <p><span class="glyphicon glyphicon-time"> ${severity}</span></p>
      <p><span class="glyphicon glyphicon-user"> ${assignedTo}</span></p>
      <a href="#" onclick="setClose('${id}')" class="btn ${btnClass}" id="${id}">Close</a>
      <a href="#" onclick="setDelete('${id}')" class="btn btn-danger">Delete</a>
    </div>`
  }
}

function setClose(id) {
  let issues = [];
  if(localStorage.getItem('issues')) {
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  for(let issue of issues) {
    if (issue.id == id) {
      issue.status = 'Closed';
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues)); 
  fetchIssues();
  
}


function setDelete(id) {
  let issues = [];
  if(localStorage.getItem('issues')) {
    issues = JSON.parse(localStorage.getItem('issues'));
  }

  issues = issues.filter(issue => issue.id != id);

  localStorage.setItem('issues', JSON.stringify(issues)); 
  fetchIssues();
}

