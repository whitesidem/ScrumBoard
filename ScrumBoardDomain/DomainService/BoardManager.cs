using System.Collections.Generic;
using System.Linq;
using ScrumBoardDomain.Entities;
using ScrumBoardDomain.Repository;

namespace ScrumBoardDomain.DomainService
{
    public class BoardManager
    {
        private readonly IBoardRepository _boardRepository;

        public BoardManager(IBoardRepository boardRepository)
        {
            _boardRepository = boardRepository;
        }

        public ScrumBoard CreateScrumBoard(string title)
        {
            ScrumBoard board = new ScrumBoard();
            board.Title = title;
            int id = _boardRepository.CreateScrumBoard(board);
            board.Id = id;
            return board;
        }

        public ScrumList CreateAndAddScrumListForBoardId(int boardID, string title)
        {
            ScrumList list = new ScrumList()
                {
                    Title = title
                };
            int id = _boardRepository.CreateScrumListForBoardIdAndGenerateId(boardID, list);
            list.Id = id;
            return list;
        }

        public ScrumCard CreateAndAddScrumCardForListId(int listId, string title)
        {
            ScrumCard card = new ScrumCard()
            {
                Title = title
            };
            int id = _boardRepository.CreateScrumCardForListIdAndGenerateId(listId, card);
            card.Id = id;
            return card;
        }



        public ScrumBoard RetrieveScrumBoardById(int boardID)
        {
            return _boardRepository.RetrieveBoardById(boardID);
        }

        public List<ScrumList> RetrieveOrderedScrumListsByBoardId(int boardId)
        {
            var unorderedLists = _boardRepository.ListScrumListByBoardId(boardId);
            var orderedLists = unorderedLists.Select(l => l).ToList();                  //Default ordering
            foreach (var unorderedList in unorderedLists)
            {
                if (unorderedList.ParentSequenceId != 0)                                //Requires reordering
                {
                    var locateParent = orderedLists.FirstOrDefault(l => l.Id == unorderedList.ParentSequenceId);
                    if (locateParent != null)
                    {
                        var parentPos = CalcScrumListPosition(orderedLists, locateParent);
                        if (parentPos != -1)
                        {
                            var currentPos = CalcScrumListPosition(orderedLists, unorderedList);
                            if(currentPos != parentPos+1)
                            {
                                orderedLists.Remove(unorderedList);
                                orderedLists.Insert(parentPos+1, unorderedList);
                            }                   
                        }
                    }
                }
            }
            return orderedLists;
        }

        public List<ScrumCard> RetrieveOrderedScrumCardsByListId(int listId)
        {
            var unorderedCards = _boardRepository.ListScrumCardsListByListId(listId);
            var orderedCards = unorderedCards.Select(c => c).ToList();                  //Default ordering
            foreach (var unorderedCard in unorderedCards)
            {
                if (unorderedCard.ParentSequenceId != 0)                                //Requires reordering
                {
                    var locateParent = orderedCards.FirstOrDefault(l => l.Id == unorderedCard.ParentSequenceId);
                    if (locateParent != null)
                    {
                        var parentPos = CalcScrumCardPosition(orderedCards, locateParent);
                        if (parentPos != -1)
                        {
                            var currentPos = CalcScrumCardPosition(orderedCards, unorderedCard);
                            if (currentPos != parentPos + 1)
                            {
                                orderedCards.Remove(unorderedCard);
                                orderedCards.Insert(parentPos + 1, unorderedCard);
                            }
                        }
                    }
                }
            }
            return orderedCards;
        }



        private static int CalcScrumListPosition(IList<ScrumList> list, ScrumList listItem)
        {
            for (int i = 0; i < list.Count(); i++)
            {
                if (list[i] == listItem)
                {
                    return i;
                }
            }
            return -1;
        }

        private static int CalcScrumCardPosition(IList<ScrumCard> card, ScrumCard cardItem)
        {
            for (int i = 0; i < card.Count(); i++)
            {
                if (card[i] == cardItem)
                {
                    return i;
                }
            }
            return -1;
        }



    }
}
