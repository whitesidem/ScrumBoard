using Moq;
using NUnit.Framework;
using ScrumBoardDomain.ApplicationService;
using ScrumBoardDomain.Entities;
using ScrumBoardDomain.Interfaces;

namespace ScrumBoardDomain.Tests
{
    // ReSharper disable InconsistentNaming
    [TestFixture]
    public class TestScrumBoardServiceApplication_Board
    {
        private ScrumBoardApplicationService _scrumBoardApplicationService;
        private Mock<IScrumBoardDomainService> _scrumBoardDomainServiceStub;
        private Mock<IBoardRepository> _boardRepositoryStub;

        [SetUp]
        public void Setup()
        {
            _boardRepositoryStub = new Mock<IBoardRepository>();
            _scrumBoardDomainServiceStub = new Mock<IScrumBoardDomainService>();
            _scrumBoardApplicationService =  new ScrumBoardApplicationService(_scrumBoardDomainServiceStub.Object,_boardRepositoryStub.Object);
        }


        [Test]
        public void CreateScrumBoard_NormalUsage_CreatesBoard()
        {
            //Act
            var result = _scrumBoardApplicationService.CreateScrumBoard("test title");

            //Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Title, Is.EqualTo("test title"));
        }

        [Test]
        public void CreateScrumBoard_NormalUsage_InvokesRepositoryAndSetsNextId()
        {
            //Arrange
            const int idStub = 99;
            _boardRepositoryStub.Setup(m => m.CreateScrumBoard(It.IsAny<ScrumBoard>())).Returns(idStub).Verifiable();

            //Act
            var result = _scrumBoardApplicationService.CreateScrumBoard("test title");

            //Assert
            _boardRepositoryStub.Verify();
            Assert.That(result.Id, Is.EqualTo(idStub));
        }


    }

    [TestFixture]
    public class TestScrumBoardApplicationService_List
    {
        private ScrumBoardApplicationService _scrumBoardApplicationService;
        private Mock<IScrumBoardDomainService> _scrumBoardDomainServiceStub;
        private Mock<IBoardRepository> _boardRepositoryStub;
        private const int _boardId = 22;

        [SetUp]
        public void Setup()
        {
            _boardRepositoryStub = new Mock<IBoardRepository>();
            _scrumBoardDomainServiceStub = new Mock<IScrumBoardDomainService>();
            _scrumBoardApplicationService = new ScrumBoardApplicationService(_scrumBoardDomainServiceStub.Object, _boardRepositoryStub.Object);
        }


        [Test]
        public void CreateAndAddScrumListForBoardId_NormalUsage_CreatesList()
        {
            //Act
            var result = _scrumBoardApplicationService.CreateAndAddScrumListForBoardId(_boardId,"test list");

            //Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Title, Is.EqualTo("test list"));

        }

        [Test]
        public void CreateAndAddScrumListForBoardId_InvokesRepositoryAndSetsNextId()
        {
            //Arrange
            const int idStub = 88;
            _boardRepositoryStub.Setup((m => m.CreateScrumListForBoardIdAndGenerateId(It.Is<ScrumList>(l => l.BoardId == _boardId)))).Returns(idStub).Verifiable();

            //Act
            var result = _scrumBoardApplicationService.CreateAndAddScrumListForBoardId(_boardId, "test list");

            //Assert
            _boardRepositoryStub.Verify();
            Assert.That(result.Id, Is.EqualTo(idStub));
        }


        /*
        [Test]
        public void MoveCard_NormalUsage_InvokesRepositoryRetrieveScrumCardByIdForSourceCard_WithCorrectCardId()
        {
            //Arrange
            int sourceListId = 100;
            int targetListId = 200;
            int sourceCardId = 10;
            int targetCardId = 20;
            int sourceParentSequenceId = 5;
            var sourceCard = ScrumCardBuilder.Build(10, "Test Card1", sourceParentSequenceId);
            _boardRepositoryStub.Setup(r => r.RetrieveScrumCardById(sourceCardId)).Returns(sourceCard);

            //Act
            _boardManager.MoveCard(sourceCardId, targetListId, targetCardId);

            //Assert
            _boardRepositoryStub.Verify( r => r.RetrieveScrumCardById(sourceCardId));

        }

        [Test]
        public void MoveCard_NormalUsage_InvokesRepositoryRetrieveScrumCardByIdForTargetCard_WithCorrectCardId()
        {
            //Arrange
            int sourceCardId = 10;
            int targetListId = 20;
            int targetCardId = 30;
            int sourceParentSequenceId = 5;
            var sourceCard = ScrumCardBuilder.Build(10, "Test Card1", sourceParentSequenceId);
            _boardRepositoryStub.Setup(r => r.RetrieveScrumCardById(sourceCardId)).Returns(sourceCard);

            //Act
            _boardManager.MoveCard(sourceCardId, targetListId, targetCardId);

            //Assert
            _boardRepositoryStub.Verify(r => r.RetrieveScrumCardById(targetCardId));

        }


        [Test]
        public void MoveCard_NormalUsage_InvokesUpdateCardPositionOrphanedCard_WithCorrectParentPosition()
        {
            //Arrange
            int sourceCardId = 10;
            int targetListId = 20;
            int targetCardId = 30;
            int sourceParentSequenceId = 5;
            var sourceCard = ScrumCardBuilder.Build(10, "Test Card1", sourceParentSequenceId);

            _boardRepositoryStub.Setup(r => r.RetrieveScrumCardById(sourceCardId)).Returns(sourceCard);

            //Act
            _boardManager.MoveCard(sourceCardId, targetListId, targetCardId);

            //Assert
            _boardRepositoryStub.Verify(r => r.UpdateCardParentPosition(sourceCardId, sourceParentSequenceId));

        }


        [Test]
        public void MoveCard_NormalUsage_InvokesUpdateCardPositionForTarget_WithCorrectParentPosition()
        {
            //Arrange
            int sourceCardId = 10;
            int targetListId = 20;
            int targetCardId = 30;
            int sourceParentSequenceId = 5;
            var sourceCard = ScrumCardBuilder.Build(10, "Test Card1", sourceParentSequenceId);

            _boardRepositoryStub.Setup(r => r.RetrieveScrumCardById(sourceCardId)).Returns(sourceCard);

            //Act
            _boardManager.MoveCard(sourceCardId, targetListId, targetCardId);

            //Assert
            _boardRepositoryStub.Verify(r => r.UpdateCardParentPosition(targetCardId, sourceCardId));

        }

        [Test]
        public void MoveCard_NormalUsage_InvokesUpdateCardPositionForTarget_WithCorrectCardIdAndListId()
        {
            //Arrange
            int sourceCardId = 10;
            int sourceListId = 100;
            int targetListId = 20;
            int targetCardId = 30;
            int sourceParentSequenceId = 5;
            int targetParentSequenceId = 15;
            var sourceCard = ScrumCardBuilder.Build(10, "Test Card1", sourceListId, sourceParentSequenceId);
            var targetCard = ScrumCardBuilder.Build(20, "Test Card2", targetListId, targetParentSequenceId);

            _boardRepositoryStub.Setup(r => r.RetrieveScrumCardById(sourceCardId)).Returns(sourceCard);
            _boardRepositoryStub.Setup(r => r.RetrieveScrumCardById(targetCardId)).Returns(targetCard);

            //Act
            _boardManager.MoveCard(sourceCardId, targetListId, targetCardId);

            //Assert
            _boardRepositoryStub.Verify(r => r.UpdateCardParentPositionAndListId(sourceCardId, targetParentSequenceId, targetListId));

        }
*/

    }

    [TestFixture]
    public class TestScrumBoardApplicationService_Card
    {
        private ScrumBoardApplicationService _scrumBoardApplicationService;
        private Mock<IScrumBoardDomainService> _scrumBoardDomainServiceStub;
        private Mock<IBoardRepository> _boardRepositoryStub;

        [SetUp]
        public void Setup()
        {
            _boardRepositoryStub = new Mock<IBoardRepository>();
            _scrumBoardDomainServiceStub = new Mock<IScrumBoardDomainService>();
            _scrumBoardApplicationService = new ScrumBoardApplicationService(_scrumBoardDomainServiceStub.Object, _boardRepositoryStub.Object);
        }


        [Test]
        public void CreateAndAddScrumCardForListId_NormalUsage_CreatesCard()
        {
            //Act
            const int stubListId = 10;
            var result = _scrumBoardApplicationService.CreateAndAddScrumCardForListId(stubListId, "test card");

            //Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Title, Is.EqualTo("test card"));

        }

        [Test]
        public void CreateAndAddScrumCardForListId_InvokesRepositoryAndSetsNextId()
        {
            //Arrange
            const int idStub = 88;
            const int listId = 99;
            _boardRepositoryStub.Setup((m => m.CreateScrumCardForListIdAndGenerateId(It.Is<ScrumCard>(l => l.ListId == listId)))).Returns(idStub).Verifiable();

            //Act
            var result = _scrumBoardApplicationService.CreateAndAddScrumCardForListId(listId, "test list");

            //Assert
            _boardRepositoryStub.Verify();
            Assert.That(result.Id, Is.EqualTo(idStub));
        }


    }


}
