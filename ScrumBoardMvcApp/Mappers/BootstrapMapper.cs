using ApplicationService_Interactors.RequestResponseDTo;
using ScrumBoardMvcApp.Models;

namespace ScrumBoardMvcApp.Mappers
{
    public class BootstrapMapper
    {
        public static void ConfigureAutoMapper()
        {
            AutoMapper.Mapper.CreateMap<ScrumBoardResponseDTO, ScrumBoardViewModel>();
            AutoMapper.Mapper.CreateMap<ScrumListResponseDTO, ScrumListViewModel>();
            AutoMapper.Mapper.CreateMap<ScrumCardResponseDTO, ScrumCardViewModel>();
        }

    }
}
