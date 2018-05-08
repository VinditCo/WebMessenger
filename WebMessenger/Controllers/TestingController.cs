using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using WebMessenger.Interfaces;
using WebMessenger.Models;

namespace ASP.Testing {
    public class TestingController : Controller {
        private IConfiguration _config;
        private IMessages _messages;

        private bool IsDevelopment {
            get {
                if (_config == null) {
                    return false;
                }
                return _config["ENVIRONMENT"] == "Development";
            }
        }

        public TestingController (IConfiguration configuration, IMessages messages) {
            _config = configuration;
            _messages = messages;
            Console.WriteLine (IsDevelopment);
        }

        
        public IActionResult Index() {
            return View();
        }

        public ViewResult RemoveOneMessage() {
            if (IsDevelopment) {
                if (_messages.AllMessages().Any()) {
                    return View();
                }
            }

            return null;
        }

        public ViewResult AddOneMessage() {
            if (IsDevelopment) {
                // Load page with javascript to call server
                return View();
            }

            return null;
        }
    }
}