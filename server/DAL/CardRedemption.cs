using System.ComponentModel.DataAnnotations;

namespace DAL
{
    //מימוש הכרטיס
    public class CardRedemption
    {
        [Key]
       public int QuestionCode { get; set; }
       public DateTime DateOfQuestion { get; set; }
       public DateTime ReturnDate { get; set; }
       public int balance { get; set; }
       public int PointsDeducted { get; set; }
       public virtual Package Package { get; set; }
       public int idPackage { get; set; }

       public virtual  Books books { get; set; }
       public int idbooks { get; set; }

    }
}
