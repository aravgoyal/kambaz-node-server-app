import Database from "../Database/index.js";
import model from "./model.js";

function enrollUserInCourse(userId, courseId) {
  return model.create({
    user: userId,
    course: courseId,
    _id: `${userId}-${courseId}`,
  });
}
function unenrollUserFromCourse(user, course) {
  return model.deleteOne({ user, course });
}


export async function findCoursesForUser(userId) {
 const enrollments = await model.find({ user: userId }).populate("course");
 return enrollments.map((enrollment) => enrollment.course);
}

export function findEnrollmentsForUser(userId) {
  const { enrollments } = Database;
  return enrollments.filter((enrollment) => enrollment.user === userId);
}

export function findEnrollmentsForCourse(courseId) {
  const { enrollments } = Database;
  return enrollments.filter((enrollment) => enrollment.course === courseId);
}

 function unenrollAllUsersFromCourse(courseId) {
   return model.deleteMany({ course: courseId });
 }

 async function findUsersForCourse(courseId) {
   const enrollments = await model.find({ course: courseId }).populate("user");
   return enrollments.map((enrollment) => enrollment.user);
 }

 return {
   findCoursesForUser,
   findUsersForCourse,
   enrollUserInCourse,
   unenrollUserFromCourse,
   unenrollAllUsersFromCourse,
 };
