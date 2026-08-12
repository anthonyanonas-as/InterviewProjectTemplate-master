# InterviewProjectTemplate

## Project Structure

The backend code is located in the `InterviewProjectTemplate` directory. The frontend is under `Client/web-client`.

## Running

Once the codebase has been cloned, it can be run using the following two commands (note that these commands should be run from the top level directory, where the `docker-compose.yml` file is located):

`docker compose build`

`docker compose up`

This will build and run the ASP.NET Core backend, the Angular frontend, and the MySQL database inside a docker container.

## Tests

### Backend

Run the C# unit tests from the repository root:

`dotnet test InterviewProjectTemplate.Tests\InterviewProjectTemplate.Tests.csproj`

### Frontend

Run the Angular unit tests from the `Client/web-client` folder:

`cd Client/web-client`

`npm test -- --watch=false`

## Database

A blank MySQL database is included inside the container, and will start up when the container is run. The ASP.NET Core backend is already configured with a connection string to this database.

## Frontend

The frontend will be run on `http://localhost:4200`. When making API calls to the backend, please ensure that `environment.apiUrl` is used for the URL, rather than hardcoding the value. This will ensure that we can easily re-configure the URL if needed for deployment.

## E2E Test / Running up the application
Once the docker > compose build and up are done, you can now browse the mood tracker app via http://localhost:4200. The video below shows the running application with the Admin link is displayed. By default, you won't see this unless you add the isAdmin key to true in the localstorage, which also shown at the end of the video to disable the admin view.

[exam-demo.webm](https://github.com/user-attachments/assets/61b2b586-17a3-42b9-a8ce-ec983a4cd36b)

### Admin Role
To enable and display the System Admin Log View, for demo purposes, add a new key in localstorage "isAdmin" with a value of true.

## Unit Test
### Backend
<img width="990" height="187" alt="image" src="https://github.com/user-attachments/assets/6457ceb5-fef3-408e-8dfd-f95b2d715b21" />
<img width="1692" height="879" alt="image" src="https://github.com/user-attachments/assets/2e48883c-ea5a-4ddb-96fa-68dd05b27e3c" />

### Frontend
<img width="944" height="724" alt="image" src="https://github.com/user-attachments/assets/c4bdcdd3-9133-4465-9c34-5ca6e93864a9" />
<img width="759" height="200" alt="image" src="https://github.com/user-attachments/assets/8d89bba7-e0eb-4607-813b-8644730933ae" />




