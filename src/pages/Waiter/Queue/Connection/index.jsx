import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
  .withUrl("http://localhost:5063/orderHub", {
    accessTokenFactory: () => "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0OSIsImp0aSI6IjVjZWY1ZTk4LWI4NjktNDdkNS05YmM0LTcyMzI0MDM1MDFjMiIsImlhdCI6MTc0NzUzMzA1NiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6InRvaGlydW4iLCJVc2VyTmFtZSI6InRvaGlydW4iLCJVc2VySWQiOiIyIiwiSXNBZG1pbiI6IlRydWUiLCJQZXJtaXNzaW9ucyI6IjEwLDEwMDEsMTAwMiwxMDAzLDIwLDIwMDEsMzAsMzAwMSwiLCJhY3RpdmUiOiJUcnVlIiwiZXhwaXJlcyI6IjIwMjUwNTE4MDczMDU2IiwibmJmIjoxNzQ3NTMyOTk2LCJleHAiOjE3NDc1MzU0NTYsImlzcyI6Ikhvc3RBdXRoIiwiYXVkIjoicmVzdGF1cmFudC51eiJ9.NpeE7X84wNpYLtPN5yWf4GzQ2Nr5iFBksCx-aPhYG_Q",
    transport: signalR.HttpTransportType.WebSockets,
    withCredentials: true
  })
  .withAutomaticReconnect()
  .build();

export default connection;
