const mongoose = require("mongoose");
const { Semester } = require("../db/schema/semester.ts");

// create 8 sems for BTECH program and 6 sems for MTECH program and 4 sems for MBA program
const programs = ["BTECH", "MTECH", "MBA"];
const semesters = [8, 6, 4];

const seedSemesters = async () => {
  for (let i = 0; i < programs.length; i++) {
    for (let j = 1; j <= semesters[i]; j++) {
      //BTECH001, BTECH002, MTECH001, MTECH002, MBA001, MBA002
      const semesterId = `${programs[i]}00${j}`;
      const semester = new Semester({
        semesterId,
        program: programs[i],
        semester: j,
      });

      await semester.save();
    }
  }
};

mongoose
  .connect("mongodb+srv://test:G9IbRnTgnl1nDvGm@college.9xjgs.mongodb.net/")
  .then(() => {
    seedSemesters()
      .then(() => {
        console.log("Semesters seeded successfully");
        mongoose.connection.close();
      })
      .catch((err) => {
        console.log("Error seeding semesters", err);
        mongoose.connection.close();
      });
  })
  .catch((err: any) => {
    console.log("Error connecting to database", err);
  });

// Run this script to seed semesters in the database
