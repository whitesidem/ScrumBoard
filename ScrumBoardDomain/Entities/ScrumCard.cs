using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ScrumBoardDomain.Entities
{
    public class ScrumCard
    {
        public int ListId { get; set; }
        public int Id { get; set; }
        public string Title { get; set; }
        public int ParentSequenceId { get; set; }
        public int Position { get; set; }

    }
}
