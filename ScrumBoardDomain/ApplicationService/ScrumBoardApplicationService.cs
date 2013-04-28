using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Globalization;
using ApplicationService_Interactors.Interfaces;
using ApplicationService_Interactors.RequestResponseDTo;
using ScrumBoardDomain.Entities;
using ScrumBoardDomain.Interfaces;
using ScrumBoardDomain.Mappers;

namespace ScrumBoardDomain.ApplicationService
{
    public class ScrumBoardApplicationService : IScrumBoardApplicationService
    {
// ReSharper disable NotAccessedField.Local
        private readonly IScrumBoardDomainService _scrumBoardDomainService;
// ReSharper restore NotAccessedField.Local
        private readonly IBoardRepository _boardRepository;

        static ScrumBoardApplicationService() 
        {
            BootstrapMapper.ConfigureInteractorsAutoMapper();
        }

        public ScrumBoardApplicationService(IScrumBoardDomainService scrumBoardDomainService,
                                            IBoardRepository boardRepository)
        {
            _scrumBoardDomainService = scrumBoardDomainService;
            _boardRepository = boardRepository;
        }

        public ScrumBoardResponseDTO CreateScrumBoard(string title)
        {
            var board = new ScrumBoard {Title = title};
            int id = _boardRepository.CreateScrumBoard(board);
            board.Id = id;
            return ScrumBoardMapper.ToScrumBoardResponseDTO(board);
        }

        public ScrumListResponseDTO CreateAndAddScrumListForBoardId(int boardID, string title)
        {
            var list = new ScrumList
                {
                    BoardId = boardID,
                    Title = title
                };
            int id;
            lock (BoardIdLock(list.BoardId))
            {
                id = _boardRepository.CreateScrumListForBoardIdAndGenerateId(list);
            }
            list.Id = id;
            return ScrumListMapper.ToScrumListResponseDTO(list);
        }

        public ScrumCardResponseDTO CreateAndAddScrumCardForListId(int listId, string title)
        {
            var card = new ScrumCard
                {
                    ListId = listId,
                    Title = title
                };
            int id;
            lock (ListIdLock(card.ListId))
            {
                id = _boardRepository.CreateScrumCardForListIdAndGenerateId(card);
            }
            card.Id = id;
            return ScrumCardMapper.ToScrumCardResponseDTO(card);
        }

        public FullScrumBoardResponseDTO RetrieveScrumBoardById(int boardID)
        {
            return ScrumBoardMapper.ToFullScrumBoardResponseDTO(_boardRepository.RetrieveBoardById(boardID));
        }

        public List<ScrumListResponseDTO> RetrieveOrderedScrumListsByBoardId(int boardId)
        {
            return ScrumListMapper.ToScrumListResponseDTO(_boardRepository.ListScrumListByBoardId(boardId));
        }

        public List<ScrumCardResponseDTO> RetrieveOrderedScrumCardsByListId(int listId)
        {
            return ScrumCardMapper.ToScrumCardResponseDTO(_boardRepository.ListScrumCardsListByListId(listId));
        }

        public void MoveCard(int boardId, int sourceCardId, int targetListId, int targetCardId)
        {
            lock (BoardIdLock(boardId))
            {
                _boardRepository.UpdateCardPosition(boardId, sourceCardId, targetCardId, targetListId);
            }
        }

        public void ClearBoardById(int id)
        {
            lock (BoardIdLock(id))
            {
                _boardRepository.ClearBoardById(id);
            }
        }

        /*
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
        */

        private static object BoardIdLock(int boardId)
        {
            //            return boardId.ToString(CultureInfo.InvariantCulture);
            return _miniLocks.GetOrAdd(boardId.ToString(CultureInfo.InvariantCulture), k => new object());
        }

        private static object ListIdLock(int listId)
        {
            //            return listId.ToString(CultureInfo.InvariantCulture);
            return _miniLocks.GetOrAdd(listId.ToString(CultureInfo.InvariantCulture), k => new object());
        }

        private static readonly ConcurrentDictionary<string, object> _miniLocks = new ConcurrentDictionary<string, object>();




    }
}
