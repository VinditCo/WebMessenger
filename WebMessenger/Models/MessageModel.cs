using System;

namespace WebMessenger.Models {
    public class MessageModel {
        public string ID { get; set; }
        public string Content { get; set; }

        public string TimeStamp { get; set; } = DateTime.UtcNow.ToString ("s", System.Globalization.CultureInfo.InvariantCulture);
    }
}