using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using ScrumBoardDomain.DomainService;
using ScrumBoardDomain.Entities;
using ScrumBoardDomain.Interfaces;
using ScrumBoardDomain.Repository;
using ScrumBoardMvcApp.Mappers;
using ScrumBoardMvcApp.Models;
using ScrumBoardMvcApp.signalr;

namespace ScrumBoardMvcApp.Controllers
{
    public class ScrumBoardRestApiController : ApiController
    {

        private IBoardManager _boardManager;

        public ScrumBoardRestApiController()
        {
            CreateBoardManager();
        }

        public ScrumBoardRestApiController(IBoardManager boardManager)
        {
            _boardManager = boardManager;
        }


        // GET api/scrumboardrestapi
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        public void CreateBoardManager()
        {
            var boardRepository = new BoardRepository();
            _boardManager = new BoardManager(boardRepository);
        }


        
        [HttpGet]
        public dynamic GetAllBoardDataById(int id)
        {
            dynamic boardData = new ExpandoObject();
            var board = _boardManager.RetrieveScrumBoardById(id);
            boardData.board = board;
            var lists = _boardManager.RetrieveOrderedScrumListsByBoardId(board.Id);
            boardData.lists = lists;
            var cardListArray = new List<ScrumCard>();
            foreach (var scrumList in lists)
            {
                var cardList = _boardManager.RetrieveOrderedScrumCardsByListId(scrumList.Id);
                cardListArray.AddRange(cardList);
            }
            boardData.cardLists = cardListArray;
            return boardData;
//            return ScrumBoardMapper.DomainToViewModel(board);
        }

        [HttpGet]
        public ScrumBoardViewModel GetBoardById(int id)
        {
            var board = _boardManager.RetrieveScrumBoardById(id);
            return ScrumBoardMapper.DomainToViewModel(board);
        }

        [HttpPost]
       public void CreateCard(CreateCard card)
        {
            var newCard = _boardManager.CreateAndAddScrumCardForListId(card.ListId, card.Title);
            var hub = new ScrumBoardHub();
            hub.SendAddedCardMessage(card.ListId, newCard.Title, newCard.Id);
        }

        [HttpPost]
        public void CreateList(CreateList list)
        {
            var newList = _boardManager.CreateAndAddScrumListForBoardId(1, list.Title);
            var hub = new ScrumBoardHub();
            hub.SendAddedListMessage(newList.Title, newList.Id);
        }

        [HttpPut]
        public void MoveCard(int sourceCardId, int targetListId, int targetCardId)
        {
            _boardManager.MoveCard(sourceCardId, targetListId, targetCardId);
            var hub = new ScrumBoardHub();
            hub.MoveCard(sourceCardId, targetListId, targetCardId);
        }
        


        // DELETE api/scrumboardrestapi/5
        public void Delete(int id)
        {
        }
    }

    public class CreateCard
    {
        public String Title { get; set; }
        public int ListId { get; set; }
    }

    public class CreateList
    {
        public String Title { get; set; }
    }



}
