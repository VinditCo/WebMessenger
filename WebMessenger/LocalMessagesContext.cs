using System.Collections.Generic;
using System.Linq;
using WebMessenger.Interfaces;
using WebMessenger.Models;

namespace WebMessenger {
    public class LocalMessagesContext : IMessages {
        private static readonly List<MessageModel> allMessages = new List<MessageModel>();
        public List<MessageModel> AllMessages() {
            return allMessages;
        }

        public void SaveMessage (MessageModel message) {
            allMessages.Insert (0,message);
        }

        public void RemoveMessage (string id) {
            if (allMessages.Any (_ => _.ID == id)) {
                allMessages.RemoveAt (allMessages.FindIndex (_=>_.ID == id));
            }
        }
    }
}