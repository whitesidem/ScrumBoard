namespace ApplicationService_Interactors.RequestResponseDTo
{
    public class ScrumListResponseDTO
    {
        public int BoardId { get; set; }
        public int Id { get; set; }
        public string Title { get; set; }
//        public int ParentSequenceId { get; set; }
        public int Position { get; set; }
    }
}