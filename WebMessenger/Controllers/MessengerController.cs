using System.Linq;
using Microsoft.AspNetCore.Mvc;
using WebMessenger.Context;

namespace WebMessenger.Controllers {
    public class MessengerController : Controller {
        private readonly MessagesContext _testMessages;
        public MessengerController (MessagesContext messages)
        {
            _testMessages = messages;
        }
        
        public IActionResult Index() {
            
            return View(_testMessages.Messages.ToList());
        }
    }
}