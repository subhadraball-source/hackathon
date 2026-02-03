let students = JSON.parse(localStorage.getItem("students")) || [];

// Load today date automatically
document.getElementById("attendanceDate").valueAsDate = new Date();

window.onload = () => {
    displayStudents();
};

// Add student
function addStudent() {
    let name = document.getElementById("studentName").value;
    if (name === "") {
        alert("Enter student name");
        return;
    }

    students.push({
        name: name,
        total: 0,
        present: 0
    });

    document.getElementById("studentName").value = "";
    saveData();
    displayStudents();
}

// Display students
function displayStudents() {
    let list = document.getElementById("studentList");
    list.innerHTML = "";

    students.forEach((s, index) => {
        let percentage = s.total === 0 ? 0 : ((s.present / s.total) * 100).toFixed(1);

        list.innerHTML += `
            <tr>
                <td>${s.name}</td>
                <td>
                    <input type="checkbox" onchange="markAttendance(${index}, this)">
                </td>
                <td>${s.total}</td>
                <td>${s.present}</td>
                <td>${percentage}%</td>
                <td>
                    <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

// Mark attendance
function markAttendance(index, checkbox) {
    students[index].total++;

    if (checkbox.checked) {
        students[index].present++;
    }

    saveData();
    displayStudents();
}

// Delete student
function deleteStudent(index) {
    if (confirm("Delete this student?")) {
        students.splice(index, 1);
        saveData();
        displayStudents();
    }
}

// Save to local storage
function saveData() {
    localStorage.setItem("students", JSON.stringify(students));
}