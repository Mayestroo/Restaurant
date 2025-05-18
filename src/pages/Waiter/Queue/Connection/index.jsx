import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
  .withUrl("http://localhost:5063/orderHub", {
    accessTokenFactory: () =>
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1MyIsImp0aSI6IjViY2ZjY2E5LTU2NGMtNDJiMi1iOWM0LTZkZDI0MTFlNzc2NyIsImlhdCI6MTc0NzU0NzUzMSwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6InRvaGlydW4iLCJVc2VyTmFtZSI6InRvaGlydW4iLCJVc2VySWQiOiIyIiwiSXNBZG1pbiI6IlRydWUiLCJQZXJtaXNzaW9ucyI6IjEwLDEwMDEsMTAwMiwxMDAzLDIwLDIwMDEsMzAsMzAwMSwiLCJhY3RpdmUiOiJUcnVlIiwiZXhwaXJlcyI6IjIwMjUwNTE4MTEzMjExIiwibmJmIjoxNzQ3NTQ3NDcxLCJleHAiOjE3NDc1NDk5MzEsImlzcyI6Ikhvc3RBdXRoIiwiYXVkIjoicmVzdGF1cmFudC51eiJ9.gaEeRaHubOZ5KKnhTArGNU_q8GCYJutRDdvWli4plF4",
    transport: signalR.HttpTransportType.WebSockets,
    withCredentials: true,
  })
  .withAutomaticReconnect()
  .build();

export default connection;
