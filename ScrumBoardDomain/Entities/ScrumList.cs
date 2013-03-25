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
            ScrumCards = new List<ScrumCard>();
        }

        public string Title { get; set; }
        public List<ScrumCard> ScrumCards { get; set; }
        public int Id { get; set; }
        public int ParentSequenceId { get; set; }

    }
}
