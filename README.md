# A complete user management with reactjs and .net core web api

## Demo url https://usermsapi.azurewebsites.net Login:- username:admin password:Test@123

![alt](../UserManagement/UserManagement/usermanagement.client/src/assets/readmenew.png)
### On this project we've used react latest version(18+) for client, .Net core web ap(version 8) for backend, MSSQL as db

#### Key features

- Admin can see a list of user and can make CRUD
- Admin can perform CRUD on Roles
- Admin can assign Roles for Users
- Admin can send email with an attachment
- User can see and modify only customers(Add, edit, Update but not delete operation)
- You can modify and use your preferred db
- dark/light theme

#### Important notice

- Add connection string and email settings on appsettings.json as below

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=.;Database=UserReactMngmtss;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True"
  },
  "emailSettings": {
    "port": "465",
    "host": "smtp.gmail.com",
    "SenderName": "info",
    "UserName": "info",
    "FromEmail": "youremail@gmail.com",
    "password": "yourpassword"
  }
}
```

#### future expansion

- We'll implement realtime notifiication using signalR and refresh token

### If you like it, please give start ⭐

### If any questions contact muhdinmussema@gmail.com


