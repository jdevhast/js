

Operations:
Add, Edit, Delete.



<img width="1889" height="960" alt="RemoteEnvs" src="https://github.com/user-attachments/assets/b492a653-9101-4464-a227-58e67216926f" />


Clone Git Repo and open project at open

JS>

 --TodoAngular-SPA
 
 --TodoApi
 
 --.gitignore



.NET 10 & Angular v21.2.0

# Step 1: Install SPA templates if not already installed:
dotnet new install Microsoft.DotNet.Web.Spa.ProjectTemplates


# Step 2:
cd ~/TodoApp/TodoApi
dotnet add package Microsoft.EntityFrameworkCore.InMemory







# Step 3: Create the Properties directory ()
mkdir -p Properties

# Create the launchSettings.json file
cat > Properties/launchSettings.json << 'EOF'
{
  "$schema": "https://json.schemastore.org/launchsettings.json",
  "profiles": {
    "http": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": false,
      "applicationUrl": "http://0.0.0.0:5196",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    },
    "https": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": false,
      "applicationUrl": "https://0.0.0.0:5001;http://0.0.0.0:5196",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  }
}
EOF



////////////////   TEST API Backend /////////////






# Step 4: Run dotnet API backend
cd TodoApi

dotnet restore

dotnet build

dotnet run --urls "http://0.0.0.0:5196"



Test:

curl -X POST http://16.51.188.149:5196/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Test todo","isCompleted":false}'


ubuntu@ip-172-31-28-44:~curl -X POST http://16.51.188.149:5196/api/todos \ \
  -H "Content-Type: application/json" \
  -d '{"title":"Test todo","isCompleted":false}'
{"id":1,"title":"Test todo","isComplete":false,"createdAt":"2026-05-13T09:26:08.3834328Z"}ubuntu@ip-172-31-28-44:~$ 






curl -v http://16.51.188.149:5196/api/todos


ubuntu@ip-172-31-28-44:~$ curl  http://16.51.188.149:5196/api/todos
[{"id":17,"title":"dinner","isComplete":false,"createdAt":"2026-05-13T11:19:27.604Z"},{"id":18,"title":"breakfast","isComplete":false,"createdAt":"2026-05-13T11:19:31.588Z"},{"id":19,"title":"tea","isComplete":false,"createdAt":"2026-05-13T11:19:34.548Z"}]

///////////////////////////////////////////////////////////////


# Step 4: Run Angular Front end

cd TodoAngular-SPA
npm install




cd TodoAn*
ubuntu@ip-172-31-28-44:~/js/TodoAngular-SPA$ npm install

added 472 packages, and audited 473 packages in 20s

111 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
ubuntu@ip-172-31-28-44:~/js/TodoAngular-SPA$ 





# Step 5: Modify API path - for Public IP

todo.service.ts:
private apiUrl =   'http://16.51.188.149:5196/api/todos';
Note!!: make sure save the file to force update.


ng build --delete-output-path





# Step 6: Run Front end:

ng serve --host 0.0.0.0 



Browser Path:
http://16.51.188.149:4200/api/todos






