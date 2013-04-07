using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ApplicationService_Interactors.RequestResponseDTo;
using ScrumBoardDomain.Entities;

namespace ScrumBoardDomain.Mappers
{
    public static class ScrumCardMapper
    {
        public static ScrumCardResponseDTO ToScrumCardResponseDTO(ScrumCard scrumCard)
        {
            return AutoMapper.Mapper.Map<ScrumCard, ScrumCardResponseDTO>(scrumCard);
        }
        public static List<ScrumCardResponseDTO> ToScrumCardResponseDTO(List<ScrumCard> scrumCard)
        {
            return AutoMapper.Mapper.Map<List<ScrumCard>, List<ScrumCardResponseDTO>>(scrumCard);
        }
    }
}
