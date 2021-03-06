﻿using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using ScrumBoardDomain.Entities;
using ScrumBoardDomain.Interfaces;

namespace ScrumBoardRepository
{
    public class BoardRepository : IBoardRepository
    {
        private static readonly List<DbScrumBoard> _boardDataCollection = new List<DbScrumBoard>();
        private static readonly List<DbScrumList> _scrumListCollection = new List<DbScrumList>();
        private static readonly List<DbScrumCard> _scrumCardCollection = new List<DbScrumCard>();

        public void ClearBoardById(int id)
        {
            _boardDataCollection.Clear();
            _scrumListCollection.Clear();
            _scrumCardCollection.Clear();

            var repository = new BoardRepository();

            var board = new ScrumBoard();
            board.Title = "Test Board 1";
            repository.CreateScrumBoard(board);
        }


        public static void ResetDefaultPopulateBoardRepository()
        {
            _boardDataCollection.Clear();
            _scrumListCollection.Clear();
            _scrumCardCollection.Clear();

            var repository = new BoardRepository();

            var board = new ScrumBoard();
            board.Title = "Test Board 1";
            var boardId = repository.CreateScrumBoard(board);

            var list1 = new ScrumList();
            list1.BoardId = boardId;
            list1.Title = "List1";
            list1.Id = repository.CreateScrumListForBoardIdAndGenerateId(list1);

            var card1 = new ScrumCard();
            card1.Title = "TestCard1";
            card1.ListId = list1.Id;
            card1.Id = repository.CreateScrumCardForListIdAndGenerateId(card1);

            var card2 = new ScrumCard();
            card2.Title = "TestCard2";
            card2.ListId = list1.Id;
            card2.Id = repository.CreateScrumCardForListIdAndGenerateId(card2);

            var list2 = new ScrumList();
            list2.BoardId = boardId;
            list2.Title = "List2";
            list2.Id = repository.CreateScrumListForBoardIdAndGenerateId(list2);

            var card3 = new ScrumCard();
            card3.Title = "TestCard3";
            card3.ListId = list2.Id;
            card3.Id = repository.CreateScrumCardForListIdAndGenerateId(card3);

            var card4 = new ScrumCard();
            card4.Title = "TestCard4";
            card4.ListId = list2.Id;
            card4.Id = repository.CreateScrumCardForListIdAndGenerateId(card4);

        }

        public int CreateScrumBoard(ScrumBoard board)
        {
            var nextId = _boardDataCollection.Any() ? _boardDataCollection.Max(b => b.Id) + 1 : 1;
            var dbBoard = new DbScrumBoard();
            dbBoard.Id = nextId;
            _boardDataCollection.Add(dbBoard);
            return nextId;
        }

        public ScrumBoard RetrieveBoardById(int id)
        {
            var result = _boardDataCollection.FirstOrDefault(b => b.Id == id);
            if (result == null) return null;
            return new ScrumBoard()
                {
                    Id = result.Id,
                    Title = result.Title
                };
        }

        public List<ScrumList> ListScrumListByBoardId(int id)
        {
            var result = from list in _scrumListCollection where list.BoardId == id select new ScrumList()
                {
                    Id = list.Id,
                    BoardId = list.BoardId,
                    Title = list.Title,
                    ParentSequenceId = list.Id,
                    Position = list.Position
                };
            return result.ToList();
        }

        public ScrumList RetrieveScrumListById(int id)
        {
            var result = _scrumListCollection.FirstOrDefault(l => l.Id == id);
            if (result == null) return null;
            return new ScrumList()
            {
                Id = result.Id,
                BoardId = result.BoardId,
                Title = result.Title,
//                ParentSequenceId = result.ParentSequenceId,
                Position = result.Position
            };
        }

        public List<ScrumCard> ListScrumCardsListByListId(int id)
        {
            return _scrumCardCollection.Where(c => c.ListId == id).OrderBy(c => c.Position).Select(dbCard => new ScrumCard
                {
                    Id = dbCard.Id,
                    ListId = dbCard.ListId,
                    Title = dbCard.Title,
                    //ParentSequenceId = dbCard.ParentSequenceId,
                    Position = dbCard.Position
                }).ToList();
        }

        public ScrumCard RetrieveScrumCardById(int id)
        {
            var result = _scrumCardCollection.FirstOrDefault(c => c.Id == id);
            if (result == null) return null;
            return new ScrumCard
            {
                Id = result.Id,
                ListId = result.ListId,
                Title = result.Title,
                //ParentSequenceId = result.ParentSequenceId,
                Position = result.Position
            };
        }

        public int CreateScrumListForBoardIdAndGenerateId(ScrumList list)
        {
            var nextId = _scrumListCollection.Any() ? _scrumListCollection.Max(l => l.Id) + 1 : 1;
            var allListsForBoard = _scrumListCollection.Where(l => l.BoardId == list.BoardId).ToList();
            var nextPos = allListsForBoard.Any() ? allListsForBoard.Max(l => l.Position) + 1 : 1;
            var dbList = new DbScrumList
            {
                BoardId = list.BoardId,
                Id = nextId,
                Title = list.Title,
//                    ParentSequenceId = list.ParentSequenceId,
                Position = nextPos
            };
            _scrumListCollection.Add(dbList);
            return nextId;
        }

        public int CreateScrumCardForListIdAndGenerateId(ScrumCard card)
        {
            var nextId = _scrumCardCollection.Any() ? _scrumCardCollection.Max(l => l.Id) + 1 : 1;
            var allCardsForList = _scrumCardCollection.Where(c => c.ListId == card.ListId).ToList();
            var nextPos = allCardsForList.Any() ? allCardsForList.Max(l => l.Position) + 1 : 1;
            var dbCard = new DbScrumCard
                {
                    ListId = card.ListId,
                    Id = nextId,
                    Title = card.Title,
                    //ParentSequenceId = card.ParentSequenceId,
                    Position = nextPos
                };
            _scrumCardCollection.Add(dbCard);
            return nextId;
        }

        public void UpdateCardPosition(int boardid, int sourceCardId, int targetCardId, int targetListId)
        {
            if (targetCardId == sourceCardId) return;

            bool addNewCardPosition = targetCardId == -1;

            var dbSourceCard = _scrumCardCollection.FirstOrDefault(c => c.Id == sourceCardId);
            if (dbSourceCard == null) return;

            var targetList = RetrieveScrumListById(targetListId);
            if (targetList == null) return;

            DbScrumCard dbTargetCard = null;
            if (addNewCardPosition == false)
            {
                dbTargetCard = _scrumCardCollection.FirstOrDefault(c => c.Id == targetCardId && c.ListId == targetListId);
                if (dbTargetCard == null) return;
            }

            var sourceListcards = _scrumCardCollection.Where(c => (c.ListId == dbSourceCard.ListId && c.Position > dbSourceCard.Position ));
            foreach (var dbScrumCard in sourceListcards)
            {
                dbScrumCard.Position--;
            }

            if (addNewCardPosition)
            {
                var nextPos = _scrumCardCollection.Any(c => c.ListId == targetListId) ? _scrumCardCollection.Where(c => c.ListId == targetListId).Max(m => m.Position) + 1 : 1;
                dbSourceCard.Position = nextPos;
                dbSourceCard.ListId = targetListId;
                return;
            }

            var newPosition = dbTargetCard.Position;
            var targetListcards = _scrumCardCollection.Where(c => (c.ListId == targetListId && c.Position >= dbTargetCard.Position));
            foreach (var dbScrumCard in targetListcards)
            {
                dbScrumCard.Position++;
            }
            dbSourceCard.Position = newPosition;
            dbSourceCard.ListId = targetListId;
        }


        private class DbScrumBoard
        {
            public string Title { get; set; }
            public int Id { get; set; }
        }

        private class DbScrumList
        {
            public int BoardId { get; set; }
            public string Title { get; set; }
            public int Id { get; set; }
            public int ParentSequenceId { get; set; }
            public int Position { get; set; }
        }

        private class DbScrumCard
        {
            public int ListId { get; set; }
            public string Title { get; set; }
            public int Id { get; set; }
            public int ParentSequenceId { get; set; }
            public int Position { get; set; }
        }

    
    }
}