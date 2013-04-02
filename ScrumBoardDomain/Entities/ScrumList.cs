using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ScrumBoardDomain.Entities
{
    public class ScrumList
    {

        public ScrumList()
        {
//            ScrumCards = new List<ScrumCard>();
        }

        public int BoardId { get; set; }
        public int Id { get; set; }
        public string Title { get; set; }
//        public List<ScrumCard> ScrumCards { get; set; }
        public int ParentSequenceId { get; set; }
        public int Position { get; set; }
    }
}
