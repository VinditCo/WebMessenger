using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using WebMessenger.Context;
using WebMessenger.Models;

namespace ASP.Testing {
    public class TestingController : Controller {
        private IConfiguration _config;
        private readonly MessagesContext _messages;

        private bool IsTesting {
            get {
                if (_config == null) {
                    return false;
                }
                return _config["ENVIRONMENT"] == "Test";
            }
        }

      
        public TestingController (IConfiguration configuration,MessagesContext messages)
        {
            _config = configuration;
            _messages = messages;
        }
        
        public IActionResult Index() {
            return View();
        }

        public string RemoveOneMessage() {
           
            if ( IsTesting&& _messages?.Messages != null && _messages.Messages.Any()) {
                _messages.Messages.Remove(_messages.Messages.First());
                _messages.SaveChanges();
                return "Removed message";
            }
         

            return "not avaiable in production";
        }

        public string AddOneMessage() {
            if (IsTesting && _messages?.Messages != null) {
                // Load page with javascript to call server
                _messages.Messages.Add(new MessageModel(){Content = "test content", ID ="test ID"});
                _messages.SaveChanges();
                return "Added message";
            }
           
            return "not avaiable in production";

        }
        
        public string ClearMessages() {
            if (IsTesting && _messages?.Messages != null) {
                // Load page with javascript to call server
                foreach (var entity in _messages.Messages)
                    _messages.Messages.Remove(entity);
                _messages.SaveChanges();
                return "Added message";
            }
           
            return "not avaiable in production";

        }
    }
}