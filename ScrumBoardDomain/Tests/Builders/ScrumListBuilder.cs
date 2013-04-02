using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ScrumBoardDomain.Entities;

namespace ScrumBoardDomain.Tests.Builders
{
    public static class ScrumListBuilder
    {

        public static ScrumList Build(int boardId, int id, string title)
        {
            var scrumList = new ScrumList()
                {
                    BoardId = boardId,
                    Id = id,
                    Title = title
                };
            return scrumList;
        }

    }
}
