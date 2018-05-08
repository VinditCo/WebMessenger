using System.Collections.Generic;
using WebMessenger.Interfaces;
using WebMessenger.Models;

namespace TestWebMessenger.Mocks {
    public class MessagesDummy :IMessages {
        public List<MessageModel> AllMessages() {
            return new List<MessageModel>();
        }
        public void SaveMessage (MessageModel message) {}

        public void RemoveMessage (string id) {}
    }
}