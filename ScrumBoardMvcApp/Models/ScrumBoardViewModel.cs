using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ScrumBoardMvcApp.Models
{
    public class ScrumBoardViewModel
    {
        public ScrumBoardViewModel()
        {
            ScrumLists = new List<ScrumListViewModel>();
        }

        public string Title { get; set; }
        public List<ScrumListViewModel> ScrumLists { get; set; }
        public int Id { get; set; }



    }
}