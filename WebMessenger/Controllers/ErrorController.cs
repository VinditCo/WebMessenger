﻿using Microsoft.AspNetCore.Mvc;

namespace WebMessenger.Controllers {
    public class ErrorController : Controller {
        public IActionResult Index() {
            return View();
        }
    }
}