using System.Collections.Generic;
using ApplicationService_Interactors.Interfaces;
using ApplicationService_Interactors.RequestResponseDTo;
using ScrumBoardDomain.Entities;
using ScrumBoardDomain.Interfaces;
using ScrumBoardDomain.Mappers;

namespace ScrumBoardDomain.ApplicationService
{
    public class ScrumBoardApplicationService : IScrumBoardApplicationService
    {
        private readonly IScrumBoardDomainService _scrumBoardDomainService;
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
            _boardRepository.ResetDefaultPopulateBoardRepository();
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
            int id = _boardRepository.CreateScrumListForBoardIdAndGenerateId(list);
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
            int id = _boardRepository.CreateScrumCardForListIdAndGenerateId(card);
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

        public void MoveCard(int sourceCardId, int targetListId, int targetCardId)
        {
            _boardRepository.UpdateCardPosition(sourceCardId, targetCardId, targetListId);
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
    }
}
