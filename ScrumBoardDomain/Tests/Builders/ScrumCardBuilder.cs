using ScrumBoardDomain.Entities;

namespace ScrumBoardDomain.Tests.Builders
{
    public static class ScrumCardBuilder
    {

        public static ScrumCard Build(int id, string title, int listId , int parentSequenceId)
        {
            var scrumCard = new ScrumCard()
            {
                Id = id,
                ListId = listId,
                Title = title
//                ,ParentSequenceId = parentSequenceId
            };
            return scrumCard;
        }


    }
}
