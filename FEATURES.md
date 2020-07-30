## Dispatcher

### Improvements and Bonuses

- Deployed the app.
- Wrote unit tests for the conflict-checker function.
- Made the tasks be displayed in different colours depending on the type of task (Pickup is green, Dropoff is red, and Other is blue) to improve the user experience.
- Implemented complete form validation:
  - Weeks between 1 and 52
  - Start time between 0 and 23, end time between start time and 24
  - All other input fields are required
- Note, if the task description is too long, it may be cut off when the task is displayed (but can be fully viewed when the edit icon is clicked)
- The CSV generated displays the time frames for the tasks that **exist** and not for the whole year (i.e., if there are only tasks for the first week, generating the 28 time frame will only have one row: 1-28 days).

#### Side Note

Please note that it was challenging to manage full time bootcamp work and the Dispatcher project at the same time. But if I had a bit more time, the first things I would do is incorporate more testing (integration and End-to-End using Cypress), handle conflicts more gracefully by suggesting available time slots for the same day, and refactor my code to be more DRY, modular and testable with unit tests.

Thank you for your consideration and I am really hoping that this project shows that I am capable of learning quickly and working hard (I have never used React before my bootcamp).
