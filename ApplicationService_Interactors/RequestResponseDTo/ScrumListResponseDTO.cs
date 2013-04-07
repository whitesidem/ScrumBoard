namespace ApplicationService_Interactors.RequestResponseDTo
{
    public class ScrumListResponseDTO
    {
        public ScrumListResponseDTO(int id, int boardId, string title, int position)
        {
            Id = id;
            BoardId = boardId;
            Title = title;
            Position = position;
        }

        public int BoardId { get; private set; }
        public int Id { get; private set; }
        public string Title { get; private set; }
        public int Position { get; private set; }
    }
}