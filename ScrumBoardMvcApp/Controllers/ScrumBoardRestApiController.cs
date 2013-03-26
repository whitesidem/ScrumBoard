using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using ScrumBoardDomain.DomainService;
using ScrumBoardDomain.Repository;
using ScrumBoardMvcApp.signalr;

namespace ScrumBoardMvcApp.Controllers
{
    public class ScrumBoardRestApiController : ApiController
    {
        // GET api/scrumboardrestapi
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/scrumboardrestapi/5
        public string Get(int id)
        {
            return "value";
        }

        [HttpPost]
        public void CreateCard(CreateCard card)
        {
            string a = "asas";
        }

        [HttpPost]
        public void CreateList(CreateList list)
        {
            var boardRepository = new BoardRepository();
            var boardManager = new BoardManager(boardRepository);
            var newList = boardManager.CreateAndAddScrumListForBoardId(1, list.Title);

            var hub = new ScrumBoardHub();
            hub.SendAddedListMessage(newList.Title, newList.Id);


            //var scrumBoardHub = GlobalHost.ConnectionManager.GetHubContext<ScrumBoardHub>();
            //if (scrumBoardHub == null)
            //{
            //    return;
            //}
            //     scrumBoardHub.SendAddedListMessage(newList.Title, newList.Id);


//            var hd = new DefaultHubManager(GlobalHost.DependencyResolver);
//            var hub = hd.ResolveHub("ScrumBoardHub") as ScrumBoardHub;
////            hub.SendAddedListMessage(newList.Title, newList.Id);
//            hub.Clients.All.broadcastAddedListMessage(newList.Title, newList.Id);

//            scrumBoardHub.Clients.All.broadcastAddedListMessage(newList.Title, newList.Id);
        }

        // PUT api/scrumboardrestapi/5
        public void Put(int id, [FromBody]string value)
        {
            string a = "asas";
        }

        // DELETE api/scrumboardrestapi/5
        public void Delete(int id)
        {
        }
    }

    public class CreateCard
    {
        public String Title { get; set; }
    }

    public class CreateList
    {
        public String Title { get; set; }
    }
}
