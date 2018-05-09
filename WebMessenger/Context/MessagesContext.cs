using Microsoft.EntityFrameworkCore;
using WebMessenger.Models;

namespace WebMessenger.Context
{
    public class MessagesContext : DbContext
    {
        public MessagesContext(DbContextOptions<MessagesContext> options) : base(options){}
        
        public DbSet<MessageModel> Messages { get; set; }
    }
}