# final-project

## Courses

- At index, loads a list of courses,

## Course details

- upon clicking a course routes to /courses/:id
- or /notfound if a course that does not exist is entered into the URL
- renders update and delete buttons if user shows ownership

## Update course / Create course

- sends user to sign in if they aren't already
- shows validation errors for blank titles and descriptions
- update sends user to /forbidden if they make it there without ownership of the course

## Delete course

- renders a confirmation modal

## Sign up

- displays validation errors for empty first/last names, email, and password
