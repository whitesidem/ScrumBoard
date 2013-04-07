using ApplicationService_Interactors.Interfaces;
using ScrumBoardDomain.ApplicationService;
using ScrumBoardDomain.DomainService;
using ScrumBoardRepository;

namespace ScrumBoardDomainIoC
{
    public static class ScrumBoardDomainFactory
    {

        public static IScrumBoardApplicationService CreateServiceApplication()
        {
            var boardRepository = new BoardRepository();
            var scrumBoardDomainService = new ScrumBoardDomainService();
            return new ScrumBoardApplicationService(scrumBoardDomainService, boardRepository);
        }  


    }
}
