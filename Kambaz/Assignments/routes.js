import * as assignmentsDao from "./dao.js";

export default function AssignmentRoutes(app) {
  const findAssignmentsForCourse = async (req, res) => {
    const { cid } = req.params;
    const assignments = await assignmentsDao.findAssignmentsForCourse(cid);
    res.json(assignments);
  };

  const findAssignmentById = async (req, res) => {
    const { aid } = req.params;
    const assignment = await assignmentsDao.findAssignmentById(aid);
    if (assignment) {
      res.json(assignment);
    } else {
      res.status(404).json({ message: "Assignment not found" });
    }
  };

  const createAssignment = async (req, res) => {
    const { cid } = req.params;
    const assignment = { ...req.body, course: cid };
    const newAssignment = await assignmentsDao.createAssignment(assignment);
    res.json(newAssignment);
  };

  const updateAssignment = async (req, res) => {
    const { aid } = req.params;
    const assignmentUpdates = req.body;
    const status = await assignmentsDao.updateAssignment(aid, assignmentUpdates);
    res.json(status);
  };

  const deleteAssignment = async (req, res) => {
    const { aid } = req.params;
    const status = await assignmentsDao.deleteAssignment(aid);
    res.json(status);
  };

  app.get("/api/courses/:cid/assignments", findAssignmentsForCourse);
  app.get("/api/courses/:cid/assignments/:aid", findAssignmentById);
  app.post("/api/courses/:cid/assignments", createAssignment);
  app.put("/api/courses/:cid/assignments/:aid", updateAssignment);
  app.delete("/api/courses/:cid/assignments/:aid", deleteAssignment);
}