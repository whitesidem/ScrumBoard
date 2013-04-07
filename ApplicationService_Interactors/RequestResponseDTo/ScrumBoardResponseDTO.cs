namespace ApplicationService_Interactors.RequestResponseDTo
{
    public class ScrumBoardResponseDTO
    {

        public ScrumBoardResponseDTO(int id, string title)
        {
            Id = id;
            Title = title;
        }

        public int Id { get; private set; }
        public string Title { get; private set; }
    }
}
