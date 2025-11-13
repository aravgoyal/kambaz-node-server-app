import * as CoursesDao from "./dao.js";
import * as EnrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app) {
  const findAllCourses = (req, res) => {
    const courses = CoursesDao.findAllCourses();
    res.send(courses);
  };

  const deleteCourse = (req, res) => {
    const { courseId } = req.params;
    const status = CoursesDao.deleteCourse(courseId);
    res.send(status);
  };

  const findCoursesForEnrolledUser = (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const courses = CoursesDao.findCoursesForEnrolledUser(userId);
    res.json(courses);
  };

  const createCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    const newCourse = CoursesDao.createCourse(req.body);
    EnrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };

  const updateCourse = (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = CoursesDao.updateCourse(courseId, courseUpdates);
    res.send(status);
  };

  app.delete("/api/courses/:courseId", deleteCourse);
  app.put("/api/courses/:courseId", updateCourse);
  app.post("/api/users/current/courses", createCourse);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.get("/api/courses", findAllCourses);
}