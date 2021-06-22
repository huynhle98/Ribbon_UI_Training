This is mountebank server for REST API mocking. To run example REST API mock, from command shell:
1) npm install -g mountebank
2) cd as-portal-api-mocks/mountebank/exampleservice
3) npm run mock
4) This will start a server at http://localhost:4545 that responds to the following REST API calls
   defined by imposters.ejs. This file includes 4545.ejs, which includes the following files:
     stubs/auth.json
     stubs/users.json
     stubs/401.json 
5) From Postman, issue a GET http://localhost:4545/users. This should return a list of users.

