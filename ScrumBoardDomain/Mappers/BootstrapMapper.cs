using System.Collections.Generic;
using ApplicationService_Interactors.RequestResponseDTo;
using ScrumBoardDomain.Entities;

namespace ScrumBoardDomain.Mappers
{
    public class BootstrapMapper
    {
        public static void ConfigureInteractorsAutoMapper()
        {
            AutoMapper.Mapper.CreateMap<ScrumBoard, ScrumBoardResponseDTO>();
            AutoMapper.Mapper.CreateMap<ScrumBoard, FullScrumBoardResponseDTO>();
            AutoMapper.Mapper.CreateMap<ScrumList, ScrumListResponseDTO>();
            AutoMapper.Mapper.CreateMap<ScrumCard, ScrumCardResponseDTO>();
        }

    }
}
