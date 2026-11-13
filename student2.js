function Student(id, name, age) {
  this.id = id;
  this.name = name;
  this.age = age;
  
}

const studentRegistry = {
  // Internal State: Array of Student Objects
  students: [
    new Student(101, "Alex Rivera", 21)
    new Student(102, "Sarah Chen", 22),
    new Student(103, "Michael Scott", 20 ),
    new Student(104, "Emily Watson", 23),
    new Student(105, "Jordan Lee", 21)
  ],

addStudent(name, age) {
    const newId = this.students.length > 0 ? Math.max(...this.students.map(s => s.id)) + 1 : 101;
    
    const newStudent = new Student(newId, name, age);
    this.students.push(newStudent);
    console.log(`Added Student: "${name}" with ID #${newId}`);
    return newStudent;
  }
}

console.log("\n===  ADDING A NEW STUDENT ===");
studentRegistry.addStudent("David Kim", 22);