using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace ScrumBoardMvcApp.signalr
{

    [HubName("scrumBoardHub")]
    public class ScrumBoardHub : Hub
    {

        public void SendAddedCardMessage(string title, string id)
        {
            Clients.All.broadcastAddedCardMessage(title,id);
        }

    }
}