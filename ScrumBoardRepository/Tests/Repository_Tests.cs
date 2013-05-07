using System.Linq;
using NUnit.Framework;
using ScrumBoardDomain.Entities;
using ScrumBoardRepository.Builders;

namespace ScrumBoardRepository.Tests
{
    // ReSharper disable InconsistentNaming
    [TestFixture]
    public class Repository_Tests
    {

        private BoardRepository _repository;
        private ScrumBoard _board;
        private ScrumList _list1;
        private ScrumList _list2;
        private ScrumList _list3;
        private int c1, c2, c3, c4, c5, c6;

        [SetUp]
        public void SetUp()
        {
            _repository = new BoardRepository();
            _board = ScrumBoardBuilder.AddBoard("Test Board");
            _list1 = _board.AddList("Test List2");
            c1 = _list1.AddCard("C1").Id;
            c2 = _list1.AddCard("C2").Id;
            c3 = _list1.AddCard("C3").Id;
            _list2 = _board.AddList("Test List2");
            c4 = _list2.AddCard("C4").Id;
            c5 = _list2.AddCard("C5").Id;
            c6 = _list2.AddCard("C6").Id;
            _list3 = _board.AddList("Test List3");

        }
        [Test]
        public void ListScrumCardsListByListId_HasCorrectItems()
        {
            //Arrange
            //Act
            //Assert
            AssertCardsInList(_list1, c1, c2, c3);
            AssertCardsInList(_list2, c4, c5, c6);
            AssertCardsInList(_list3);
        }


        [Test]
        public void MoveCard_FromList1ToAddSlotInList2()
        {
            //Arrange

            //Act
            _repository.UpdateCardPosition(_board.Id, c1, -1, _list2.Id);

            //Assert
            AssertCardsInList(_list1, c2, c3);
            AssertCardsInList(_list2, c4, c5, c6, c1);
            AssertCardsInList(_list3);
        }

        [Test]
        public void MoveCard_FromList1ToAddSlotInEmptyList3()
        {
            //Arrange

            //Act
            _repository.UpdateCardPosition(_board.Id, c1, -1, _list3.Id);

            //Assert
            AssertCardsInList(_list1, c2, c3);
            AssertCardsInList(_list2, c4, c5, c6);
            AssertCardsInList(_list3, c1);
        }

        [Test]
        public void MoveCard_FromList1ToToAboveTopPositionInList2()
        {
            //Arrange

            //Act
            _repository.UpdateCardPosition(_board.Id, c1, c4, _list2.Id);

            //Assert
            AssertCardsInList(_list1, c2, c3);
            AssertCardsInList(_list2, c1, c4, c5, c6);
            AssertCardsInList(_list3);

        }

        [Test]
        public void MoveCard_FromList1ToToAboveBottomPositionInList2()
        {
            //Arrange

            //Act
            _repository.UpdateCardPosition(_board.Id, c1, c6, _list2.Id);

            //Assert
            AssertCardsInList(_list1, c2, c3);
            AssertCardsInList(_list2, c4, c5, c1, c6);
            AssertCardsInList(_list3);
        }

        [Test]
        public void MoveCard_FromList1ToAddSlotInList1()
        {
            //Arrange

            //Act
            _repository.UpdateCardPosition(_board.Id, c1, -1, _list1.Id);

            //Assert
            AssertCardsInList(_list1, c2, c3, c1);
            AssertCardsInList(_list2, c4, c5, c6);
            AssertCardsInList(_list3);
        }

        [Test]
        public void MoveCard_FromList1ToAddAboveTopSlotInList1()
        {
            //Arrange

            //Act
            _repository.UpdateCardPosition(_board.Id, c3, c1, _list1.Id);

            //Assert
            AssertCardsInList(_list1, c3, c1, c2);
            AssertCardsInList(_list2, c4, c5, c6);
            AssertCardsInList(_list3);
        }


        [Test]
        public void MoveCard_FromList1ToAddAboveBottomSlotInList1()
        {
            //Arrange

            //Act
            _repository.UpdateCardPosition(_board.Id, c1, c3, _list1.Id);

            //Assert
            AssertCardsInList(_list1, c2, c1, c3);
            AssertCardsInList(_list2, c4, c5, c6);
            AssertCardsInList(_list3);
        }

        private void AssertCardsInList(ScrumList list, params int[] ids)
        {
            var cardSet = _repository.ListScrumCardsListByListId(list.Id);
            Assert.That(cardSet.Count(), Is.EqualTo(ids.Count()));

            var cards = _repository.ListScrumCardsListByListId(list.Id);
            for (var i = 0; i < cards.Count; i++)
            {
                Assert.That(cards[i].Id == ids[i], "Not found card {2} for list {0} at pos {1}", list.Id, i, ids[i]);
            }
        }

    }
}
