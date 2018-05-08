using System.Collections.Generic;
using WebMessenger.Interfaces;
using WebMessenger.Models;

namespace TestWebMessenger {
    public class MessagesSpy: IMessages {
        public static int MessageCount = 0; 
        public List<MessageModel> AllMessages() {
            return new List<MessageModel>();
        }

        public void SaveMessage (MessageModel message) {
            MessageCount++;
        }

        public void RemoveMessage (string id) {
            MessageCount--;
        }
    }
}