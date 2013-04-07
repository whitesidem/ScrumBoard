namespace ApplicationService_Interactors.RequestResponseDTo
{
    public class FullScrumBoardResponseDTO
    {

        public FullScrumBoardResponseDTO(int id, string title)
        {
            Id = id;
            Title = title;
        }

        public int Id { get; private set; }
        public string Title { get; private set; }
    }
}