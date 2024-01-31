var program = "";
var coursesTaken = [];

function addEntry() {
  var courseSubject = document.getElementById("courseSubject").value;
  var classCode = document.getElementById("classCode").value;
  var credits = document.getElementById("credits").value;
  var semester = document.getElementById("semester").value;

  var course = {
    subject: courseSubject,
    courseCode: classCode,
    credits: credits,
    semester: semester,
  };

  coursesTaken.push(course);

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

  updateCourseListDisplay();
  updateRemoveCourseDropdown();
}

function auditDegree() {
  var degreeProgram = document.getElementById("degreeProgram").value;
  var degreeProgramDisplay = document.getElementById("degreeProgramDisplay");
  var auditResults = document.getElementById("auditResults");

  degreeProgramDisplay.innerHTML = "Program: " + degreeProgram;

  let csCredits = 0;
  let additionalTechCredits = 0;
  let techCredits = 0;
  let electiveCredits = 0;
  let csCoursesTaken = [];

  // Iterate through coursesTaken
  coursesTaken.forEach((course) => {
    // Check if it's a CS course
    if (course.subject === "CS") {
      // Check if it's not already counted
      if (!csCoursesTaken.includes(course.courseCode)) {
        csCredits += course.credits;
        csCoursesTaken.push(course.courseCode);
      }
    }
    // Check for additional tech credits
    else if (
      ["CS", "ECE", "INFO", "ORIE"].includes(course.subject) &&
      course.courseCode >= 5000
    ) {
      additionalTechCredits += course.credits;
    }
    // Check for TECH credits
    else if (course.subject === "TECH") {
      techCredits += course.credits;
    }
    // Any other courses are counted as electives
    else {
      electiveCredits += course.credits;
    }
  });

  // Define requirements
  const csCreditsRequired = 15;
  const additionalTechCreditsRequired = 3;
  const techCreditsRequired = 8;
  const electiveCreditsRequired = 4;

  // Check if all requirements are met
  const meetsCSCredits = csCredits >= csCreditsRequired;
  const meetsAdditionalTechCredits =
    additionalTechCredits >= additionalTechCreditsRequired;
  const meetsTechCredits = techCredits >= techCreditsRequired;
  const meetsElectiveCredits = electiveCredits >= electiveCreditsRequired;

  var allRequirementsMet =
    meetsCSCredits &&
    meetsAdditionalTechCredits &&
    meetsTechCredits &&
    meetsElectiveCredits;

  auditResults.innerHTML =
    "Audit Results: " +
    "Meets CS Credits: " +
    meetsCSCredits +
    ", Meets Additional Tech Credits: " +
    meetsAdditionalTechCredits +
    ", Meets Tech Credits: " +
    meetsTechCredits +
    ", Meets Elective Credits: " +
    meetsElectiveCredits;

  if (allRequirementsMet) {
    auditResults.innerHTML += " - <strong>Passed</strong>";
  } else {
    auditResults.innerHTML +=
      " - <br> <strong>Reassess your schedule, you are not on track to graduate</strong>";
  }
}

function removeSelectedCourse() {
  var removeCourseDropdown = document.getElementById("removeCourseDropdown");
  var selectedCourseCode = removeCourseDropdown.value;

  // Find the index of the selected course in the coursesTaken array
  var courseIndex = -1;
  for (var i = 0; i < coursesTaken.length; i++) {
    if (coursesTaken[i].courseCode == selectedCourseCode) {
      courseIndex = i;
      break;
    }
  }

  if (courseIndex !== -1) {
    // Remove the selected course from the coursesTaken array
    coursesTaken.splice(courseIndex, 1);

    removeCourseDropdown.value = "";

    updateCourseListDisplay();
    updateRemoveCourseDropdown();
  } else {
    alert("Course with code " + selectedCourseCode + " was not found.");
  }
}

function updateCourseListDisplay() {
  var entryDiv = document.getElementById("entries");
  entryDiv.innerHTML = ""; // Clear the current display

  // Re-display the updated list of courses
  coursesTaken.forEach((course) => {
    var entry =
      "Subject: " +
      course.subject +
      ", Course: " +
      course.courseCode +
      ", Credits: " +
      course.credits +
      ", Semester: " +
      course.semester;
    entryDiv.innerHTML += "<p>" + entry + "</p>";
  });
}

function updateRemoveCourseDropdown() {
  var removeCourseDropdown = document.getElementById("removeCourseDropdown");
  removeCourseDropdown.innerHTML = ""; // Clear existing options
  removeCourseDropdown.options.add(
    new Option("Select a Course", "", true, true)
  );

  // Loop through coursesTaken and generate options
  for (var i = 0; i < coursesTaken.length; i++) {
    var course = coursesTaken[i];
    removeCourseDropdown.options.add(
      new Option(course.subject + " " + course.courseCode, course.courseCode)
    );
  }
}
