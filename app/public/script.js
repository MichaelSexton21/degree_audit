var program = "";
var coursesTaken = [];
var coursesData = [];

function loadCoursesTaken() {
  // Retrieve the JSON string from local storage
  var coursesTakenJSON = localStorage.getItem("coursesTaken");
  var programJSON = localStorage.getItem("program");

  if (coursesTakenJSON !== null) {
    coursesTaken = JSON.parse(coursesTakenJSON);
  }

  if (programJSON !== null) {
    program = JSON.parse(programJSON);
  }
  updateDegreeProgramDropdown();
  updateCourseListDisplay();
  updateRemoveCourseDropdown();
  updateDegreeProgram();
}

// Function to load course data
function loadCourseData() {
  fetch("courses_data.json")
    .then((response) => response.json())
    .then((data) => {
      coursesData = data;
      populateSubjectDropdown();
    })
    .catch((error) => console.error("Error loading course data:", error));
}

// Call the loadCourseData function when the DOM content is loaded
document.addEventListener("DOMContentLoaded", loadCourseData);

// Add an event listener to trigger the loadCoursesTaken function when the page is loaded
document.addEventListener("DOMContentLoaded", function () {
  loadCoursesTaken();
});

// Function to populate the subject dropdown
function populateSubjectDropdown() {
  const uniqueSubjects = new Set(coursesData.map((course) => course[0]));
  const subjectSelect = document.getElementById("courseSubject");

  uniqueSubjects.forEach((subject) => {
    const option = document.createElement("option");
    option.value = subject;
    option.textContent = subject;
    subjectSelect.appendChild(option);
  });
}

// Function to populate the Course Name dropdown based on selected subject
function populateCourseNames(selectedSubject) {
  const courseNameSelect = document.getElementById("className");
  courseNameSelect.innerHTML = '<option value="">Select Course Name</option>';

  // Filter courses by the selected subject and populate dropdown
  coursesData.forEach((course) => {
    if (course[0] === selectedSubject) {
      const option = document.createElement("option");
      option.value = course[1]; // Use course number as value
      option.textContent = course[1] + " " + course[2]; // Use course description as text
      courseNameSelect.appendChild(option);
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const courseSubjectSelect = document.getElementById("courseSubject");
  if (courseSubjectSelect) {
    courseSubjectSelect.addEventListener("change", function () {
      populateCourseNames(this.value);
    });
  } else {
    console.error('Element with ID "courseSubject" was not found.');
  }
});

// Function to update the credits display
function updateCreditsDisplay(courseNumber) {
  const creditsDisplay = document.getElementById("credits");

  // Find the course with the matching course number
  const course = coursesData.find((c) => c[1] === courseNumber);

  if (course) {
    // Set the credits value
    creditsDisplay.value = course[3];
  } else {
    // Clear the display or handle the case where the course is not found
    creditsDisplay.value = "";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var courseNameSelect = document.getElementById("className");
  if (courseNameSelect) {
    courseNameSelect.addEventListener("change", function () {
      updateCreditsDisplay(this.value);
    });
  } else {
    console.error('Element with ID "courseName" was not found.');
  }
});

function updateDegreeProgramDropdown() {
  var degreeProgramDropdown = document.getElementById("degreeProgram");
  degreeProgramDropdown.value = program;
}

function updateDegreeProgram() {
  var degreeProgramDisplay = document.getElementById("degreeProgramDisplay");
  degreeProgramDisplay.innerHTML = "Program: " + program;
}

function saveDegreeProgram() {
  // Save program to local storage
  var programJSON = JSON.stringify(program);
  localStorage.setItem("program", programJSON);
}

function saveCoursesTaken() {
  // Save coursesTaken to local storage
  var coursesTakenJSON = JSON.stringify(coursesTaken);
  localStorage.setItem("coursesTaken", coursesTakenJSON);

  var programJSON = JSON.stringify(program);
  localStorage.setItem("program", coursesTakenJSON);
}

function addEntry() {
  var courseSubject = document.getElementById("courseSubject").value;
  var classCode = document.getElementById("classCode").value;
  var className = document.getElementById("className").value;
  var credits = document.getElementById("credits").value;
  var semester = document.getElementById("semester").value;

  //validate there is input before adding class
  if (
    courseSubject === "" ||
    classCode === "" ||
    credits === "" ||
    semester === ""
  ) {
    alert("Please complete all fields");
  } else {
    var course = {
      subject: courseSubject,
      courseCode: classCode,
      courseName: className,
      credits: credits,
      semester: semester,
    };

    coursesTaken.push(course);

    var entry =
      "Subject: " +
      courseSubject +
      ", Course: " +
      classCode +
      ", Course Name: " +
      className +
      ", Credits: " +
      credits +
      ", Semester: " +
      semester;
    var entryDiv = document.getElementById("entries");
    entryDiv.innerHTML += "<p>" + entry + "</p>";

    updateCourseListDisplay();
    updateRemoveCourseDropdown();

    saveCoursesTaken();
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
  saveCoursesTaken();
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
      ", Course Name: " +
      course.courseName +
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

function CS_auditDegree() {
  var csCredits = 0;
  var additionalTechCredits = 0;
  var techCredits = 0;
  var electiveCredits = 0;
  var courseGroupings = "";

  coursesTaken = coursesTaken.sort((a, b) => {
    return b.credits - a.credits;
  });

  // Iterate through coursesTaken
  coursesTaken.forEach((course) => {
    if (course.subject === "CS" && csCredits < 15) {
      courseGroupings +=
        "CS: " +
        course.subject +
        " " +
        course.courseCode +
        " " +
        course.courseName +
        " " +
        course.credits +
        " credits <br>";
      csCredits += Number(course.credits);
    } else if (
      ["CS", "ECE", "INFO", "ORIE"].includes(course.subject) &&
      course.courseCode >= 5000 &&
      additionalTechCredits < 3
    ) {
      courseGroupings +=
        "Tech Elective: " +
        course.subject +
        " " +
        course.courseCode +
        " " +
        course.courseName +
        " " +
        course.credits +
        " credits <br>";
      additionalTechCredits += Number(course.credits);
    } else if (course.subject === "TECH" && techCredits < 8) {
      courseGroupings +=
        "Tech (Studio): " +
        course.subject +
        " " +
        course.courseCode +
        " " +
        course.courseName +
        " " +
        course.credits +
        " credits <br>";

      techCredits += Number(course.credits);
    }
    // Any remaining courses are counted as electives
    else {
      courseGroupings +=
        "Elective: " +
        course.subject +
        " " +
        course.courseCode +
        " " +
        course.courseName +
        " " +
        course.credits +
        " credits <br>";

      electiveCredits += Number(course.credits);
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

  var auditResults = document.getElementById("auditResults");

  auditResults.innerHTML =
    "Audit Results: " +
    "<strong>Meets CS Credits:</strong> " +
    csCredits +
    "/" +
    csCreditsRequired +
    " " +
    meetsCSCredits +
    ", <strong>Meets Additional Tech Credits:</strong> " +
    additionalTechCredits +
    "/" +
    additionalTechCreditsRequired +
    " " +
    meetsAdditionalTechCredits +
    ", <strong>Meets Tech Credits:</strong> " +
    techCredits +
    "/" +
    techCreditsRequired +
    " " +
    meetsTechCredits +
    ", <strong>Meets Elective Credits:</strong> " +
    electiveCredits +
    "/" +
    electiveCreditsRequired +
    " " +
    meetsElectiveCredits;

  if (allRequirementsMet) {
    auditResults.innerHTML += " - <strong>Passed</strong>";
  } else {
    auditResults.innerHTML +=
      " <br> <strong>Reassess your schedule, you are not on track to graduate</strong>";
  }

  var courseGroupingsDisplay = document.getElementById("courseGroupings");
  courseGroupingsDisplay.innerHTML = courseGroupings;
}

function CM_auditDegree() {
  alert("not yet implemented");
}

function HT_auditDegree() {
  alert("not yet implemented");
}

function UT_auditDegree() {
  alert("not yet implemented");
}

function MBA_auditDegree() {
  alert("not yet implemented");
}

function ECE_auditDegree() {
  alert("not yet implemented");
}

function LLM_auditDegree() {
  alert("not yet implemented");
}

function DT_auditDegree() {
  alert("not yet implemented");
}

function ORIE_auditDegree() {
  alert("not yet implemented");
}

function auditDegree() {
  program = document.getElementById("degreeProgram").value;
  if (program === "") {
    alert("Please select a degree program");
  } else if (coursesTaken.length === 0) {
    alert("Please enter a course");
  } else {
    saveDegreeProgram();
    updateDegreeProgram();

    if (program === "CM") {
      CM_auditDegree();
    } else if (program === "HT") {
      HT_auditDegree();
    } else if (program === "UT") {
      UT_auditDegree();
    } else if (program === "MBA") {
      MBA_auditDegree();
    } else if (program === "CS") {
      CS_auditDegree();
    } else if (program === "ECE") {
      ECE_auditDegree();
    } else if (program === "LLM") {
      LLM_auditDegree();
    } else if (program === "DT") {
      DT_auditDegree();
    } else if (program === "ORIE") {
      ORIE_auditDegree();
    } else {
      alert("Please select a degree program");
    }
  }
}
