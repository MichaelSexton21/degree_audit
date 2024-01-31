function addEntry() {
  var courseSubject = document.getElementById("courseSubject").value;
  var classCode = document.getElementById("classCode").value;
  var credits = document.getElementById("credits").value;
  var semester = document.getElementById("semester").value;
  var entry =
    "Subject: " +
    courseSubject +
    ", Course: " +
    classCode +
    ", Credits: " +
    credits +
    ", Semester: " +
    semester;
  var entryDiv = document.getElementById("entries");
  entryDiv.innerHTML += "<p>" + entry + "</p>";
}

function auditDegree() {
  var degreeProgram = document.getElementById("degreeProgram").value;
  var degreeProgramDisplay = document.getElementById("degreeProgramDisplay"); // Get the h2 element

  degreeProgramDisplay.innerHTML = "Program: " + degreeProgram; // Update the innerHTML of the h2
}
