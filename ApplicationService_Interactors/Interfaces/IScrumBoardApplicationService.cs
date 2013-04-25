using System.Collections.Generic;
using ApplicationService_Interactors.RequestResponseDTo;

namespace ApplicationService_Interactors.Interfaces
{
    public interface IScrumBoardApplicationService
    {
        ScrumBoardResponseDTO CreateScrumBoard(string title);
        ScrumListResponseDTO CreateAndAddScrumListForBoardId(int boardID, string title);
        ScrumCardResponseDTO CreateAndAddScrumCardForListId(int listId, string title);
        FullScrumBoardResponseDTO RetrieveScrumBoardById(int boardID);
        List<ScrumListResponseDTO> RetrieveOrderedScrumListsByBoardId(int boardId);
        List<ScrumCardResponseDTO> RetrieveOrderedScrumCardsByListId(int listId);
        void MoveCard(int sourceCardId, int targetListId, int targetCardId);
        void ClearBoardById(int id);
    }
}



