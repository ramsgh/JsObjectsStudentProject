
/**
 * Day 15 Mini-Project: Student Management System
 * Concepts covered: Object literals, constructors, 'this' keyword, 
 * Object static methods (keys, entries), destructuring, spread operator, 
 * array methods (filter, sort, find), and JSON parsing/stringifying.
 */

// 1. STUDENT CONSTRUCTOR FUNCTION
function Student(id, name, age, grade, score, major) {
  this.id = id;
  this.name = name;
  this.age = age;
  this.grade = grade;
  this.score = score;
  this.major = major;
}

// Adding a method to Student prototype using 'this'
Student.prototype.getDetails = function () {
  return `ID: ${this.id} | ${this.name} (${this.age} yrs) - Major: ${this.major} | Grade: ${this.grade} (${this.score} pts)`;
};

// 2. MAIN REGISTRY OBJECT (Manages Student Array & Operations)
const studentRegistry = {
  // Internal State: Array of Student Objects
  students: [
    new Student(101, "Alex Rivera", 21, "A", 92, "Computer Science"),
    new Student(102, "Sarah Chen", 22, "B", 84, "Mathematics"),
    new Student(103, "Michael Scott", 20, "A", 96, "Computer Science"),
    new Student(104, "Emily Watson", 23, "C", 74, "Physics"),
    new Student(105, "Jordan Lee", 21, "B", 88, "Electrical Engineering")
  ],

  // -------------------------------------------------------------
  // FEATURE 1: ADD STUDENT
  // -------------------------------------------------------------
  addStudent(name, age, grade, score, major) {
    const newId = this.students.length > 0 ? Math.max(...this.students.map(s => s.id)) + 1 : 101;
    
    const newStudent = new Student(newId, name, age, grade, score, major);
    this.students.push(newStudent);
    console.log(`✅ Added Student: "${name}" with ID #${newId}`);
    return newStudent;
  },

  // -------------------------------------------------------------
  // FEATURE 2: SEARCH STUDENT (By Name or ID)
  // -------------------------------------------------------------
  searchStudent(query) {
    const searchTerm = String(query).toLowerCase().trim();
    
    const results = this.students.filter(student => {
      // Destructuring properties from student object
      const { id, name, major } = student;
      return (
        id === Number(query) ||
        name.toLowerCase().includes(searchTerm) ||
        major.toLowerCase().includes(searchTerm)
      );
    });

    return results;
  },

  // -------------------------------------------------------------
  // FEATURE 3: FILTER STUDENTS (By Grade or Minimum Score)
  // -------------------------------------------------------------
  filterByGrade(gradeLetter) {
    return this.students.filter(
      student => student.grade.toUpperCase() === gradeLetter.toUpperCase()
    );
  },

  filterByMinScore(minScore) {
    return this.students.filter(student => student.score >= minScore);
  },

  // -------------------------------------------------------------
  // FEATURE 4: SORT STUDENTS (By Score or Name)
  // -------------------------------------------------------------
  sortByScore(ascending = false) {
    // Return a shallow copy sorted using spread operator to prevent mutating original state
    return [...this.students].sort((a, b) => 
      ascending ? a.score - b.score : b.score - a.score
    );
  },

  sortByName(ascending = true) {
    return [...this.students].sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) return ascending ? -1 : 1;
      if (nameA > nameB) return ascending ? 1 : -1;
      return 0;
    });
  },

  // -------------------------------------------------------------
  // FEATURE 5: SUMMARY & JSON DATA EXPORT
  // -------------------------------------------------------------
  getSystemAnalytics() {
    const totalStudents = this.students.length;
    const averageScore = (
      this.students.reduce((sum, s) => sum + s.score, 0) / totalStudents
    ).toFixed(2);

    // Using Object.entries and Object.keys
    const gradeDistribution = this.students.reduce((acc, s) => {
      acc[s.grade] = (acc[s.grade] || 0) + 1;
      return acc;
    }, {});

    return {
      totalStudents,
      averageScore: Number(averageScore),
      gradeDistribution,
      availableFields: Object.keys(this.students || {})
    };
  },

  // Deep Cloning and JSON Backup
  exportToJSON() {
    return JSON.stringify(this.students, null, 2);
  },

  importFromJSON(jsonString) {
    try {
      const parsedArray = JSON.parse(jsonString);
      if (Array.isArray(parsedArray)) {
        this.students = parsedArray;
        console.log(`📥 Successfully restored ${parsedArray.length} students from JSON backup.`);
      }
    } catch (err) {
      console.error("❌ Invalid JSON string provided!");
    }
  }
};

// =================================================================
// 🧪 DEMO & TESTING SCRIPT
// =================================================================

console.log("=== 1. INITIAL REGISTRY COUNT ===");
console.log(`Total Students: ${studentRegistry.students.length}`);

console.log("\n=== 2. ADDING A NEW STUDENT ===");
studentRegistry.addStudent("David Kim", 22, "A", 95, "Computer Science");

console.log("\n=== 3. SEARCHING FOR STUDENTS ('computer') ===");
const searchResults = studentRegistry.searchStudent("computer");
console.table(searchResults);

console.log("\n=== 4. FILTERING BY MINIMUM SCORE (>= 90) ===");
const topPerformers = studentRegistry.filterByMinScore(90);
topPerformers.forEach(s => console.log(`⭐ ${s.getDetails()}`));

console.log("\n=== 5. LEADERBOARD (SORTED BY SCORE DESCENDING) ===");
console.table(studentRegistry.sortByScore(false));

console.log("\n=== 6. SYSTEM ANALYTICS ===");
const analytics = studentRegistry.getSystemAnalytics();
console.log("Analytics Output:", analytics);
console.log("Object Keys of Student Object:", Object.keys(studentRegistry.students));
console.log("Object Entries of Analytics:", Object.entries(analytics.gradeDistribution));
