using System.Collections.Generic;
using WebMessenger.Models;

namespace WebMessenger.Interfaces {
    public interface IMessages {
        List<MessageModel> AllMessages();

        void SaveMessage(MessageModel message);
        void RemoveMessage (string id);
    }
}