using System.Collections.Generic;

namespace ScrumBoardMvcApp.Models
{
    public class ScrumListViewModel
    {

        public ScrumListViewModel()
        {
            ScrumCards = new List<ScrumCardViewModel>();
        }

        public string Title { get; set; }
        public List<ScrumCardViewModel> ScrumCards { get; set; }
        public int Id { get; set; }
    }
}