using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ScrumBoardMvcApp.Controllers
{
    public class ScrumBoardController : Controller
    {
        //
        // GET: /ScrumBoard/

        public ActionResult Index()
        {
            return View();
        }

    }
}
