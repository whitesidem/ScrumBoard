using ApplicationService_Interactors.RequestResponseDTo;
using ScrumBoardMvcApp.Models;

namespace ScrumBoardMvcApp.Mappers
{
    public class ScrumBoardMapper
    {

        public static ScrumBoardViewModel ToScrumBoardViewModel(ScrumBoardResponseDTO scrumBoard)
        {
            return AutoMapper.Mapper.Map<ScrumBoardResponseDTO, ScrumBoardViewModel>(scrumBoard);
        }

        public static ScrumBoardViewModel ToScrumBoardViewModel(FullScrumBoardResponseDTO scrumBoard)
        {
            return AutoMapper.Mapper.Map<FullScrumBoardResponseDTO, ScrumBoardViewModel>(scrumBoard);
        }


    }
}