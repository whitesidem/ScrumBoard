using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ScrumBoardDomain.Entities;
using ScrumBoardMvcApp.Models;

namespace ScrumBoardMvcApp.Mappers
{
    public class ScrumBoardMapper
    {

        public static ScrumBoardViewModel DomainToViewModel(ScrumBoard scrumBoard)
        {
            return AutoMapper.Mapper.Map<ScrumBoard, ScrumBoardViewModel>(scrumBoard);
        }

    }
}