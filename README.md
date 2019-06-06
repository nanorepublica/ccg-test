# CCG Technical React Test

## Challenge 1

- Responsive & aesthetic design
- Authentication - users should only access their data
- JSON files should not be publicly accessible
- Consider volume of data. 1 User has multiple patients, 1 patient has multiple samples, a sample has up to 100 variants
- App needs to reference the data somehow

* Authentication - client routes and login flow
* Create a page for each user and load data in during build
  - Variants will need to be handled differently? due to the 1.2 Million line file

/app/users/X/
/app/users/X/patients/Y data here
