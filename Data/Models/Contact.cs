using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HealthCheck.Data.Models
{
    [Table("Contact")]
    public class Contact
    {
        public Contact() { }
        [Required]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ContactID { get; set; }
        [Required]
        [Column(TypeName = "VARCHAR")]
        [StringLength(50)]
        public string Name { get; set; }
        [Required]
        [Column(TypeName = "VARCHAR")]
        [StringLength(10)]
        public string Phone { get; set; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(10)]
        public string Fax { get; set; }
        [Column(TypeName = "VARCHAR")]
        [StringLength(50)]
        public string eMail { get; set; }
        public string? Notes { get; set; }
        public DateTime LastUpdateDate { get; set; } = DateTime.UtcNow;
        [Required]
        [Column(TypeName = "VARCHAR")]
        [StringLength(20)]
        public string LastUpdateUserName { get; set; }
    }
}
