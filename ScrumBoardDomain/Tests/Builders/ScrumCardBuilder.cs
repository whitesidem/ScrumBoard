using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ScrumBoardDomain.Entities;

namespace ScrumBoardDomain.Tests.Builders
{
    public static class ScrumCardBuilder
    {

        public static ScrumCard Build(int id, string title, int listId = 0, int parentSequenceId = 0)
        {
            var scrumCard = new ScrumCard()
            {
                Id = id,
                Title = title,
                ParentSequenceId = parentSequenceId
            };
            return scrumCard;
        }


    }
}
