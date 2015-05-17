using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web.Models;

namespace Web.Controllers
{
    public class ThesisController : Controller
    {
        public ActionResult Index()
        {
            List<Error> err = new List<Error>();
            err.Add(new Error { Id = "E001", Message = "Tere {nimi}, tegid vea. Vajuta {siia|/}" });
            
            return View(err);
        }
    }
}
