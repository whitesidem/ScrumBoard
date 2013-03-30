using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ScrumBoardDomain.Entities;
using ScrumBoardMvcApp.Models;

namespace ScrumBoardMvcApp.Mappers
{
    public class BootstrapMapper
    {
        public static void ConfigureAutoMapper()
        {
            AutoMapper.Mapper.CreateMap<ScrumBoard, ScrumBoardViewModel>();
            AutoMapper.Mapper.CreateMap<ScrumList, ScrumListViewModel>();
            AutoMapper.Mapper.CreateMap<ScrumCard, ScrumCardViewModel>();
        }

    }
}
