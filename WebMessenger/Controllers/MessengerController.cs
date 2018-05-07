using Microsoft.AspNetCore.Mvc;
using WebMessenger.Interfaces;

namespace WebMessenger.Controllers {
    public class MessengerController : Controller {
        private readonly IMessages _testMessages;
        public MessengerController (IMessages messages) {
            _testMessages = messages;
        }
        public IActionResult Index() {
            
            return View(  _testMessages.AllMessages());
        }

    }
}