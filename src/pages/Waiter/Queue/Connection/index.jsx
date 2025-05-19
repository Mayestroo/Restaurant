import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
  .withUrl("http://192.168.1.245:5063/orderHub", {
    accessTokenFactory: () => localStorage.getItem('authToken'),
    transport: signalR.HttpTransportType.WebSockets,
    withCredentials: true
  })
  .withAutomaticReconnect()
  .build();

export default connection;
