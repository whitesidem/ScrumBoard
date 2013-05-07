using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ScrumBoardDomain.Entities;

namespace ScrumBoardRepository.Builders
{
    public static class ScrumBoardBuilder
    {

        public static BoardRepository _repository = new BoardRepository();


        public static ScrumBoard AddBoard(string title)
        {
            var repository = new BoardRepository();
            var board = new ScrumBoard {Title = "Test Board 1"};
            int boardId = repository.CreateScrumBoard(board);
            return repository.RetrieveBoardById(boardId);
        }

        public static ScrumList AddList(this ScrumBoard board, string title)
        {
            var list = new ScrumList {BoardId = board.Id, Title = title};
            var id = _repository.CreateScrumListForBoardIdAndGenerateId(list);
            return _repository.RetrieveScrumListById(id);
        }

        public static ScrumCard AddCard(this ScrumList list, string title)
        {
            var card = new ScrumCard {ListId = list.Id, Title = title};
            var id = _repository.CreateScrumCardForListIdAndGenerateId(card);
            return _repository.RetrieveScrumCardById(id);
        }


    }
}
