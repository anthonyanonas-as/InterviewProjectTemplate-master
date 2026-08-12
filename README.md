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
