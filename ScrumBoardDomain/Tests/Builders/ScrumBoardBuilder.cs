using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ScrumBoardDomain.Entities;

namespace ScrumBoardDomain.Tests.Builders
{
    public static class ScrumBoardBuilder
    {

        public static ScrumBoard Build(int id, string title)
        {
            var scrumBoard = new ScrumBoard()
                {
                    Id = id,
                    Title = title
                };
            return scrumBoard;
        }

        public static ScrumBoard WithList(this ScrumBoard board, ScrumList list)
        {
            board.ScrumLists.Add(list);
            return board;
        }

        public static ScrumBoard CreateBasicScrumBoard()
        {
            return Build(1, "TestBoard1")
                .WithList(
                    ScrumListBuilder.Build(10, "List10")
                                    .WithCard(
                                        ScrumCardBuilder.Build(101, "TestCard101")
                        )
                                    .WithCard(
                                        ScrumCardBuilder.Build(102, "TestCard102")
                        )
                )
                .WithList(
                    ScrumListBuilder.Build(20, "List20")
                                    .WithCard(
                                        ScrumCardBuilder.Build(201, "TestCard201")
                        )
                                    .WithCard(
                                        ScrumCardBuilder.Build(202, "TestCard202")
                        )
                );
        }


    }
}
