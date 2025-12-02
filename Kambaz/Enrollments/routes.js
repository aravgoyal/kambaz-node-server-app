import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const getAllEnrollments = (req, res) => {
    res.json(db.enrollments);
  };

  const getEnrollmentsForUser = (req, res) => {
    const { userId } = req.params;
    const enrollments = dao.findEnrollmentsForUser(userId);
    res.json(enrollments);
  };

  const enrollInCourse = (req, res) => {
    const { userId, courseId } = req.body;
    dao.enrollUserInCourse(userId, courseId);
    res.sendStatus(200);
  };

  const unenrollFromCourse = (req, res) => {
    const { userId, courseId } = req.params;
    dao.unenrollUserFromCourse(userId, courseId);
    res.sendStatus(200);
  };

  app.get("/api/enrollments", getAllEnrollments);
  app.get("/api/enrollments/user/:userId", getEnrollmentsForUser);
  app.post("/api/enrollments", enrollInCourse);
  app.delete("/api/enrollments/:userId/:courseId", unenrollFromCourse);
}