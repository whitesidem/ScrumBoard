namespace ApplicationService_Interactors.RequestResponseDTo
{
    public class ScrumCardResponseDTO
    {

        public ScrumCardResponseDTO(int id, int listId, string title, int position)
        {
            Id = id;
            ListId = listId;
            Title = title;
            Position = position;
        }

        public int ListId { get; private set; }
        public int Id { get; private set; }
        public string Title { get; private set; }
        public int Position { get; private set; }

    }
}