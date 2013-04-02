using System.Collections.Generic;
using System.Linq;
using ScrumBoardDomain.Entities;
using ScrumBoardDomain.Interfaces;
using ScrumBoardDomain.Repository;

namespace ScrumBoardDomain.DomainService
{
    public class BoardManager : IBoardManager
    {
        private readonly IBoardRepository _boardRepository;

        public BoardManager(IBoardRepository boardRepository)
        {
            _boardRepository = boardRepository;
        }

        public ScrumBoard CreateScrumBoard(string title)
        {
            var board = new ScrumBoard();
            board.Title = title;
            int id = _boardRepository.CreateScrumBoard(board);
            board.Id = id;
            return board;
        }

        public ScrumList CreateAndAddScrumListForBoardId(int boardID, string title)
        {
            var list = new ScrumList()
                {
                    BoardId = boardID,  
                    Title = title
                };
            int id = _boardRepository.CreateScrumListForBoardIdAndGenerateId(list);
            list.Id = id;
            return list;
        }

        public ScrumCard CreateAndAddScrumCardForListId(int listId, string title)
        {
            var card = new ScrumCard()
            {
                ListId = listId,
                Title = title
            };
            int id = _boardRepository.CreateScrumCardForListIdAndGenerateId(card);
            card.Id = id;
            return card;
        }

        public ScrumBoard RetrieveScrumBoardById(int boardID)
        {
            return _boardRepository.RetrieveBoardById(boardID);
        }

        public List<ScrumList> RetrieveOrderedScrumListsByBoardId(int boardId)
        {
            return _boardRepository.ListScrumListByBoardId(boardId);
        }

        public List<ScrumCard> RetrieveOrderedScrumCardsByListId(int listId)
        {
            return _boardRepository.ListScrumCardsListByListId(listId);
        }

        public void MoveCard(int sourceCardId, int targetListId, int targetCardId)
        {
//            var sourceCard = _boardRepository.RetrieveScrumCardById(sourceCardId);
//            var targetCard = _boardRepository.RetrieveScrumCardById(targetCardId);
//            _boardRepository.UpdateCardParentPosition(sourceCardId, sourceCard.ParentSequenceId);
//            _boardRepository.UpdateCardParentPosition(targetCardId, sourceCardId);
            _boardRepository.UpdateCardPosition(sourceCardId, targetCardId, targetListId);
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
