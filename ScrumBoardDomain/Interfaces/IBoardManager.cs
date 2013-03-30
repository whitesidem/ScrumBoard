using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ScrumBoardDomain.Entities;

namespace ScrumBoardDomain.Interfaces
{
    public interface IBoardManager
    {
        ScrumBoard CreateScrumBoard(string title);
        ScrumList CreateAndAddScrumListForBoardId(int boardID, string title);
        ScrumCard CreateAndAddScrumCardForListId(int listId, string title);
        ScrumBoard RetrieveScrumBoardById(int boardID);
        List<ScrumList> RetrieveOrderedScrumListsByBoardId(int boardId);
        List<ScrumCard> RetrieveOrderedScrumCardsByListId(int listId);
    }

}
