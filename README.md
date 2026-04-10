# Basic design for Job Portal Management System
This is a backend application for a Job Portal Management System it uses Node.js, Express.js, MongoDB.
In this project I have tried to follow REST APIs architecture. The APIs have various features such as pagination.

## Features
 - User authentication (login/signup)
 - Create job (admin/recruiter)
 - Apply for job
 - View applied jobs
 - Delete application
 - Search/filter jobs (by title, location, etc.)

## Database Collections

1. Users
 - _id (ObjectId)
 - firstName (string)
 - lastName (string)
 - email (string, unique)
 - password (string, hashed)
 - role (string: "admin", "recruiter", "applicant")
 - createdAt (Date)

2. Jobs
 - _id (ObjectId)
 - title (string)
 - company (string)
 - location (string)
 - description (string)
 - createdBy (ObjectId, references Users._id)

3. Applications
 - _id (ObjectId)
 - userId (ObjectId, references Users._id)
 - jobId (ObjectId, references Jobs._id)
 - status (string: "applied", "rejected", "accepted")
 - appliedAt (Date)

## APIs
 - POST - /auth/signup : Sign up the user
 - POST - /auth/login : Login the user
 - GET - /user/me : Get the profile of user
 - POST - /jobs : Create new job
 - GET - /jobs : Get all jobs
 - POST - /jobs/:id/applications : Apply for a job
 - GET - /jobs/applications : Get all the applied jobs by user
 - GET - /jobs/myjobs : Recruiter gets all jobs created by him
 - GET - /jobs/:id/applicants : Recruiter gets all the user applied for his job
 - DEL - /jobs/:id/applications : User can delete his application for a job
 - PATCH - /jobs/:id/applicants : Recruiter can manage the application i.e. accept or reject the application