# Basic design for Job Portal Management System

## Features
 -User authentication (login/signup)
 -Create job (admin/recruiter)
 -Apply for job
 -View applied jobs
 -Delete application
 -Search/filter jobs (by title, location, etc.)

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