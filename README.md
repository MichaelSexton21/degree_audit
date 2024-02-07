# Degree Audit Application

**You can access this application at [degree-audit.vercel.app](https://degree-audit.vercel.app).**

This application, a personal project developed by Michael Sexton, was created out of a desire to simplify the task of tracking degree progress for himself and his peers. Built over a few days, it's designed to assist students at Cornell Tech in auditing their degree progress, ensuring they're on track with their academic goals, much like the D.A.R.S system used at other institutions ([D.A.R.S at UW-Madison](https://registrar.wisc.edu/dars/)).

Understanding that some programs have complex requirements which can be challenging to track, this application aims to simplify the process. It provides a user-friendly interface where students can input their course details and receive an audit of their degree progress, making it easier to manage and understand their academic journey.

_This page is made exclusively for Cornell Tech Masters Degrees. Prior to this, no solution existed at this institution for such a purpose._

## Development Notes

- The application is built using JavaScript and Bulma CSS. Python was used for data retrieval, cleaning, and storage
- Vercel is utilized for hosting, in addition to providing Continuous Deployment and Continuous Integration (CI/CD) Pipeline services.
- When developing locally, you must run a python server to help load the JSON: python3 -m http.server

## Repository Structure

- `generate_course_data.py`: Script to fetch and process course data.
- `app/public`: Contains the frontend files including HTML, JS, and CSS.
- `app/public/courses_data.json`: JSON file containing the processed course data.

## Author

Michael Sexton (ms3648@cornell.edu)
