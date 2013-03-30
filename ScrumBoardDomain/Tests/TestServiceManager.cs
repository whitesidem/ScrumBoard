using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Moq;
using NUnit.Framework;
using ScrumBoardDomain.DomainService;
using ScrumBoardDomain.Entities;
using ScrumBoardDomain.Repository;
using ScrumBoardDomain.Tests.Builders;

namespace ScrumBoardDomain.Tests
{
    // ReSharper disable InconsistentNaming
    [TestFixture]
    public class TestServiceManager_Board
    {
        private BoardManager _boardManager;
        private Mock<IBoardRepository> _boardRepositoryStub;

        [SetUp]
        public void Setup()
        {
            _boardRepositoryStub = new Mock<IBoardRepository>();
            _boardManager = new BoardManager(_boardRepositoryStub.Object);
        }


        [Test]
        public void CreateScrumBoard_NormalUsage_CreatesBoard()
        {
            //Act
            var result = _boardManager.CreateScrumBoard("test title");

            //Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Title, Is.EqualTo("test title"));
        }

        [Test]
        public void CreateScrumBoard_NormalUsage_InvokesRepositoryAndSetsNextId()
        {
            //Arrange
            int idStub = 99;
            _boardRepositoryStub.Setup(m => m.CreateScrumBoard(It.IsAny<ScrumBoard>())).Returns(idStub).Verifiable();

            //Act
            var result = _boardManager.CreateScrumBoard("test title");

            //Assert
            _boardRepositoryStub.Verify();
            Assert.That(result.Id, Is.EqualTo(idStub));
        }


    }

    [TestFixture]
    public class TestServiceManager_List
    {
        private BoardManager _boardManager;
        private static Mock<IBoardRepository> _boardRepositoryStub;
        private ScrumBoard _scrumBoard;
        private int _boardId;

        [SetUp]
        public void Setup()
        {
            _boardRepositoryStub = new Mock<IBoardRepository>();
            _boardManager = new BoardManager(_boardRepositoryStub.Object);
            _scrumBoard = ScrumBoardBuilder.Build(_boardId, "TestBoard");
        }


        [Test]
        public void CreateAndAddScrumListForBoardId_NormalUsage_CreatesBoard()
        {
            //Act
            var result = _boardManager.CreateAndAddScrumListForBoardId(_boardId,"test list");

            //Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Title, Is.EqualTo("test list"));

        }

        [Test]
        public void CreateAndAddScrumListForBoardId_InvokesRepositoryAndSetsNextId()
        {
            //Arrange
            int idStub = 88;
            _boardRepositoryStub.Setup((m => m.CreateScrumListForBoardIdAndGenerateId(_boardId, It.IsAny<ScrumList>()))).Returns(idStub).Verifiable();

            //Act
            var result = _boardManager.CreateAndAddScrumListForBoardId(_boardId,"test list");

            //Assert
            _boardRepositoryStub.Verify();
            Assert.That(result.Id, Is.EqualTo(idStub));
        }


    }

}
