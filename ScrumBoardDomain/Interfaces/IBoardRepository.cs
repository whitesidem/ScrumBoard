using System.Collections.Generic;
using ScrumBoardDomain.Entities;

namespace ScrumBoardDomain.Interfaces
{
    public interface IBoardRepository
    {
        ScrumBoard RetrieveBoardById(int id);
        ScrumCard RetrieveScrumCardById(int id);
        int CreateScrumListForBoardIdAndGenerateId(ScrumList list);
        List<ScrumCard> ListScrumCardsListByListId(int id);
        int CreateScrumCardForListIdAndGenerateId(ScrumCard card);
        List<ScrumList> ListScrumListByBoardId(int id);
        int CreateScrumBoard(ScrumBoard board);
//        void UpdateCardParentPosition(int sourceCardId, int listId, int position);
        void UpdateCardPosition(int sourceCardId, int targetCardId, int targetListId);
    }
}