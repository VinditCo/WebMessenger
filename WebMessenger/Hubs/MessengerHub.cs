using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using WebMessenger.Context;
using WebMessenger.Models;

namespace WebMessenger.Hubs {
    public class MessengerHub : Hub {
        private readonly MessagesContext _messages;

            
        public MessengerHub (MessagesContext messages) {
            _messages = messages;
        }

        public async Task Send(string message,string guid)
        {
            _messages.Messages.Add(new MessageModel() {
                ID = guid,
                Content = message
            });
            await _messages.SaveChangesAsync();

            await Clients.All.InvokeAsync("ReceiveMessage", message,guid);
        }

        public async Task RemoveMessage (string guid)
        {
            var toRemove = await _messages.Messages.FirstOrDefaultAsync(_ => _.ID == guid);
            if (toRemove != null)
            {
                _messages.Messages.Remove(toRemove);
                await _messages.SaveChangesAsync();
            }
           
            await Clients.All.InvokeAsync("ShouldRemoveMessage",guid);
            
        }
    }
}