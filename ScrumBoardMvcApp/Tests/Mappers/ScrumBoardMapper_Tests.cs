using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NUnit.Framework;
using ScrumBoardDomain.Entities;
using ScrumBoardDomain.Tests.Builders;
using ScrumBoardMvcApp.Mappers;

namespace ScrumBoardMvcApp.Tests.Mappers
{
    [TestFixture]
    public class ScrumBoardMapper_Tests
    {

        [SetUp]
        public void SetUp()
        {
            BootstrapMapper.ConfigureAutoMapper();
        }

        [Test]
        public void DomainToViewModel_GivenBoardWithListsAndCards_ReturnsFullViewModel()
        {
            /*

            //Arrange
            var scrumBoard = ScrumBoardBuilder.CreateBasicScrumBoard();
            

            //Act
            var result =  ScrumBoardMapper.DomainToViewModel(scrumBoard);

            //Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Id, Is.EqualTo(1));
            Assert.That(result.Title, Is.EqualTo("TestBoard1"));
            Assert.That(result.ScrumLists.Count, Is.EqualTo(2));
            Assert.That(result.ScrumLists[0].Id, Is.EqualTo(10));
            Assert.That(result.ScrumLists[0].Title, Is.EqualTo("List10"));
            Assert.That(result.ScrumLists[1].Id, Is.EqualTo(20));
            Assert.That(result.ScrumLists[1].Title, Is.EqualTo("List20"));
            Assert.That(result.ScrumLists[0].ScrumCards.Count, Is.EqualTo(2));
            Assert.That(result.ScrumLists[0].ScrumCards[0].Id, Is.EqualTo(101));
            Assert.That(result.ScrumLists[0].ScrumCards[0].Title, Is.EqualTo("TestCard101"));
            Assert.That(result.ScrumLists[0].ScrumCards[1].Id, Is.EqualTo(102));
            Assert.That(result.ScrumLists[0].ScrumCards[1].Title, Is.EqualTo("TestCard102"));
            Assert.That(result.ScrumLists[1].ScrumCards[0].Id, Is.EqualTo(201));
            Assert.That(result.ScrumLists[1].ScrumCards[0].Title, Is.EqualTo("TestCard201"));
            Assert.That(result.ScrumLists[1].ScrumCards[1].Id, Is.EqualTo(202));
            Assert.That(result.ScrumLists[1].ScrumCards[1].Title, Is.EqualTo("TestCard202"));

            */
        }

    }
}