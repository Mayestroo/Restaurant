import * as signalR from '@microsoft/signalr';

const connection = new signalR.HubConnectionBuilder()
  .withUrl('http://192.168.1.245:5063/orderHub') 
  .withAutomaticReconnect()
  .build();

export default connection;