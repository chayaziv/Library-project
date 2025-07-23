using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public enum BookUserStatus
    {
        Active,
        Completed,
        Cancelled
    }

    public class BookUser
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public virtual User User { get; set; }

        public int BookId { get; set; }
        public virtual Book? Book { get; set; }

        public DateTime BorrowDate { get; set; }
        public DateTime ReturnDate { get; set; }
        public DateTime? ActualReturnDate { get; set; }

        public BookUserStatus Status { get; set; } 

        public bool CanModify { get; set; }

        public bool IsActiveForUser { get; set; }
    }

}

