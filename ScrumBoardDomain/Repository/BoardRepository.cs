using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ScrumBoardDomain.Entities;

namespace ScrumBoardDomain.Repository
{
    public interface IBoardRepository
    {
        ScrumBoard RetrieveBoardById(int id);
        int CreateScrumListForBoardIdAndGenerateId(int boardId, ScrumList list);
        List<ScrumCard> ListScrumCardsListByListId(int id);
        int CreateScrumCardForListIdAndGenerateId(int listId, ScrumCard card);
        List<ScrumList> ListScrumListByBoardId(int id);
        int CreateScrumBoard(ScrumBoard board);
    }

    public class BoardRepository : IBoardRepository
    {
        private static ScrumBoard _boardData = new ScrumBoard();

        static BoardRepository()
        {
            _boardData.Id = 1;
            _boardData.ScrumLists = new List<ScrumList> {new ScrumList()};
            _boardData.ScrumLists[0].Id = 1;
            _boardData.ScrumLists[0].Title = "List1";
            _boardData.ScrumLists[0].ScrumCards = new List<ScrumCard> {new ScrumCard()};
            _boardData.ScrumLists[0].ScrumCards[0].Id = 10;
            _boardData.ScrumLists[0].ScrumCards[0].Title = "TestCard1";
            _boardData.ScrumLists[0].ScrumCards.Add(new ScrumCard());
            _boardData.ScrumLists[0].ScrumCards[1].Id = 11;
            _boardData.ScrumLists[0].ScrumCards[1].Title = "TestCard2";

            _boardData.ScrumLists.Add(new ScrumList());
            _boardData.ScrumLists[1].Id = 2;
            _boardData.ScrumLists[1].Title = "List2";
            _boardData.ScrumLists[1].ScrumCards = new List<ScrumCard> { new ScrumCard() };
            _boardData.ScrumLists[1].ScrumCards[0].Id = 20;
            _boardData.ScrumLists[1].ScrumCards[0].Title = "TestCard3";
            _boardData.ScrumLists[1].ScrumCards.Add(new ScrumCard());
            _boardData.ScrumLists[1].ScrumCards[1].Id = 21;
            _boardData.ScrumLists[1].ScrumCards[1].Title = "TestCard4";
        
        }

        public ScrumBoard RetrieveBoardById(int id)
        {
            return _boardData;
        }

        public int CreateScrumListForBoardIdAndGenerateId(int boardId, ScrumList list)
        {
            var nextId = !_boardData.ScrumLists.Any() ? 1 : _boardData.ScrumLists.Max(l => l.Id) + 1;
            var newList = new ScrumList()
                {
                    Id = nextId,
                    Title = list.Title
                };
            _boardData.ScrumLists.Add(newList);

            return nextId;
        }

        public List<ScrumCard> ListScrumCardsListByListId(int id)
        {
            ScrumList dbList = _boardData.ScrumLists.FirstOrDefault(l => l.Id == id);
            if (dbList == null)
            {
                return null;
            }
            var scrumCards = new List<ScrumCard>();
            foreach (var scrumCard in dbList.ScrumCards)
            {
                var card = new ScrumCard
                    {
                        Id = scrumCard.Id,
                        Title = scrumCard.Title,
                        ParentSequenceId = dbList.ParentSequenceId

                    };
                scrumCards.Add(card);
            }
            return scrumCards;
        }


        public int CreateScrumCardForListIdAndGenerateId(int listId, ScrumCard card)
        {
            ScrumList dbList = _boardData.ScrumLists.FirstOrDefault(l => l.Id == listId);
            if (dbList == null)
            {
                return -1;
            }
            var nextId = !dbList.ScrumCards.Any() ? 1 : dbList.ScrumCards.Max(c => c.Id) + 1;
            var dbCard = new ScrumCard()
            {
                Id = nextId,
                Title = card.Title
            };
            dbList.ScrumCards.Add(dbCard);

            return nextId;
        }

        public List<ScrumList> ListScrumListByBoardId(int id)
        {
            var scrumLists = new List<ScrumList>();
            foreach (var dbScrumList in _boardData.ScrumLists)
            {
                var list = new ScrumList()
                {
                    Id = dbScrumList.Id,
                    Title = dbScrumList.Title,
                    ParentSequenceId = dbScrumList.ParentSequenceId
                };
                scrumLists.Add(list);
            }
            return scrumLists;
        }

        public int CreateScrumBoard(ScrumBoard board)
        {
            _boardData = new ScrumBoard();
            int boardId = 1;
            _boardData.Id = boardId;
            return boardId;
        }
    }
}