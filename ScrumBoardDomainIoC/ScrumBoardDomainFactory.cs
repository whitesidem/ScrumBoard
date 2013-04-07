using ApplicationService_Interactors.Interfaces;
using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;
using ScrumBoardDomain.ApplicationService;
using ScrumBoardDomain.DomainService;
using ScrumBoardDomain.Interfaces;
using ScrumBoardRepository;

namespace ScrumBoardDomainIoC
{
    public static class ScrumBoardDomainFactory
    {

        public static WindsorContainer ScrumBoardAppContext;

        static ScrumBoardDomainFactory()
        {
            CreateContainer();
        }

        public static void CreateContainer()
        {
            var container = new WindsorContainer();
            container.Install(new ScrumBoardWebsiteInstaller());
            ScrumBoardAppContext = container;
        }

        public static IScrumBoardApplicationService CreateServiceApplication()
        {
            return ScrumBoardAppContext.Resolve<IScrumBoardApplicationService>();
        }

    }

    public class ScrumBoardWebsiteInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            container
            .Register(Component
              .For<IBoardRepository>()
              .ImplementedBy<BoardRepository>()
              .LifestylePerWebRequest());
            container
            .Register(Component
              .For<IScrumBoardDomainService>()
              .ImplementedBy<ScrumBoardDomainService>()
              .LifestylePerWebRequest());
            container
            .Register(Component
              .For<IScrumBoardApplicationService>()
              .ImplementedBy<ScrumBoardApplicationService>()
              .LifestylePerWebRequest());
        }
    }

}
