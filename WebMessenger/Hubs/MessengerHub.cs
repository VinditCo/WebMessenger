using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using WebMessenger.Interfaces;
using WebMessenger.Models;

namespace WebMessenger.Hubs {
    public class MessengerHub : Hub {
        private IMessages _messages;
        
        public MessengerHub (IMessages messages) {
            _messages = messages;
        }

        public async Task Send(string message,string guid)
        {
            _messages.SaveMessage (new MessageModel() {
                ID = guid,
                Content = message
            });
            await Clients.All.InvokeAsync("ReceiveMessage", message,guid);
        }

        public async Task RemoveMessage (string guid) {
            _messages.RemoveMessage (guid);
            await Clients.All.InvokeAsync("ShouldRemoveMessage",guid);
            
        }
    }
}