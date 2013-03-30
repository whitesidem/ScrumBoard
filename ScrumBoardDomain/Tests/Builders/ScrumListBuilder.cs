using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ScrumBoardDomain.Entities;

namespace ScrumBoardDomain.Tests.Builders
{
    public static class ScrumListBuilder
    {

        public static ScrumList Build(int id, string title)
        {
            var scrumList = new ScrumList()
                {
                    Id = id,
                    Title = title
                };
            return scrumList;
        }

        public static ScrumList WithCard(this ScrumList list, ScrumCard card)
        {
            list.ScrumCards.Add(card);
            return list;
        }

    }
}
