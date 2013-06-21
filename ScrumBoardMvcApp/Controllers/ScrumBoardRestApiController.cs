using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Web.Http;
using System.Web.Mvc;
using ApplicationService_Interactors.Interfaces;
using ApplicationService_Interactors.RequestResponseDTo;
using ScrumBoardDomainIoC;
using ScrumBoardMvcApp.Mappers;
using ScrumBoardMvcApp.Models;
using ScrumBoardMvcApp.signalr;


namespace ScrumBoardMvcApp.Controllers
{
    public class AllowCrossSiteJsonAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            filterContext.RequestContext.HttpContext.Response.AddHeader("Access-Control-Allow-Origin", "*");
            base.OnActionExecuting(filterContext);
        }
    }


    [AllowCrossSiteJson]
    public class ScrumBoardRestApiController : ApiController
    {

        private IScrumBoardApplicationService _scrumBoardService;

        public ScrumBoardRestApiController()
        {
            CreateBoardManager();
        }

        public void CreateBoardManager()
        {
            _scrumBoardService = ScrumBoardDomainFactory.CreateServiceApplication();
        }


        [System.Web.Http.HttpPost]
        public void ResetBoardDataById(int id)
        {
            _scrumBoardService.ClearBoardById(id);
        }

        [System.Web.Http.HttpGet]
        public dynamic GetAllBoardDataById(int id)
        {
            dynamic boardData = new ExpandoObject();
            var board = _scrumBoardService.RetrieveScrumBoardById(id);
            boardData.board = board;
            var lists = _scrumBoardService.RetrieveOrderedScrumListsByBoardId(board.Id);
            boardData.lists = lists;
            var cardListArray = new List<ScrumCardResponseDTO>();
            foreach (var scrumList in lists)
            {
                var cardList = _scrumBoardService.RetrieveOrderedScrumCardsByListId(scrumList.Id);
                cardListArray.AddRange(cardList);
            }
            boardData.cardLists = cardListArray;
            return boardData;
//            return ScrumBoardMapper.DomainToViewModel(board);
        }

        [System.Web.Http.HttpGet]
        public ScrumBoardViewModel GetBoardById(int id)
        {
            var board = _scrumBoardService.RetrieveScrumBoardById(id);
            return ScrumBoardMapper.ToScrumBoardViewModel(board);
        }

        [System.Web.Http.HttpPost]
       public void CreateCard(CreateCard card)
        {
            var newCard = _scrumBoardService.CreateAndAddScrumCardForListId(card.ListId, card.Title);
            var hub = new ScrumBoardHub();
            hub.SendAddedCardMessage(card.ListId, newCard.Title, newCard.Id);
        }

        [System.Web.Http.HttpPost]
        public void CreateList(CreateList list)
        {
            var newList = _scrumBoardService.CreateAndAddScrumListForBoardId(1, list.Title);
            var hub = new ScrumBoardHub();
            hub.SendAddedListMessage(newList.Title, newList.Id);
        }

        [System.Web.Http.HttpPut]
        public void MoveCard(int boardId, int sourceCardId, int targetListId, int targetCardId)
        {
            _scrumBoardService.MoveCard(boardId, sourceCardId, targetListId, targetCardId);
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
