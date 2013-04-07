using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ApplicationService_Interactors.RequestResponseDTo;
using ScrumBoardDomain.Entities;

namespace ScrumBoardDomain.Mappers
{

    public static class ScrumBoardMapper
    {
        public static ScrumBoardResponseDTO ToScrumBoardResponseDTO(ScrumBoard scrumBoard)
        {
            return AutoMapper.Mapper.Map<ScrumBoard, ScrumBoardResponseDTO>(scrumBoard);
        }

        public static FullScrumBoardResponseDTO ToFullScrumBoardResponseDTO(ScrumBoard scrumBoard)
        {
            return AutoMapper.Mapper.Map<ScrumBoard, FullScrumBoardResponseDTO>(scrumBoard);
        }
    }

}
