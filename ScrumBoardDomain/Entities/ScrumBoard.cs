using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ScrumBoardDomain.Entities
{
    public class ScrumBoard
    {

        public ScrumBoard()
        {
//            ScrumLists = new List<ScrumList>();
        }

        public int Id { get; set; }
        public string Title { get; set; }
//        public List<ScrumList> ScrumLists { get; set; }


    }
}
