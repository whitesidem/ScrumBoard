using System.Diagnostics;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace ScrumBoardMvcApp.signalr
{

    [HubName("scrumBoardHub")]
    public class ScrumBoardHub : Hub
    {

        public IHubConnectionContext CurrentClients
        {
            get
            {

                //if (Clients != null)
                //{
                //    return Clients;
                //}
                var scrumBoardHub = GlobalHost.ConnectionManager.GetHubContext<ScrumBoardHub>();
                Debug.Assert(scrumBoardHub != null, "scrumBoardHub should exist");
                return scrumBoardHub.Clients;
            }
        }

        public void SendAddedListMessage(string title, int id)
        {
            CurrentClients.All.broadcastAddedListMessage(title,id);
        }

        public void MoveCard(int sourceCardId, int targetListId, int targetCardId)
        {
            CurrentClients.All.moveCard(sourceCardId, targetListId, targetCardId);
        }

        public void SendAddedCardMessage(int listId, string title, int id)
        {
            CurrentClients.All.broadcastAddedCardMessage(listId, title,id);
        }
        

        public void Test()
        {
            Clients.All.broadcastAddedListMessage("abc", 10);
        }


    }
}