using System;
using Microsoft.EntityFrameworkCore;
using HealthCheck.Data.Models;

namespace HealthCheck.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext() : base()
        {
        }
        public ApplicationDbContext(DbContextOptions options)
            : base(options)
        {
        }
        public DbSet<Contact> contacts {get;set;}
     
    }
}
