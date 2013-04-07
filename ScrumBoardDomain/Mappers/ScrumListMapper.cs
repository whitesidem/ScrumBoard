using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ApplicationService_Interactors.RequestResponseDTo;
using ScrumBoardDomain.Entities;

namespace ScrumBoardDomain.Mappers
{
    public static class ScrumListMapper
    {
        public static ScrumListResponseDTO ToScrumListResponseDTO(ScrumList scrumList)
        {
            return AutoMapper.Mapper.Map<ScrumList, ScrumListResponseDTO>(scrumList);
        }
        public static List<ScrumListResponseDTO> ToScrumListResponseDTO(List<ScrumList> scrumList)
        {
            return AutoMapper.Mapper.Map<List<ScrumList>, List<ScrumListResponseDTO>>(scrumList);
        }
    }
}
