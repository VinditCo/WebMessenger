using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TestWebMessenger;
using WebMessenger;
using WebMessenger.Interfaces;

namespace WebMessenger {
    public class StartupWithSpyMessages : TestingStartup{
       
        public override void AddMessages (IServiceCollection services) {
            services.AddTransient<IMessages, MessagesSpy>();
        }

        public StartupWithSpyMessages(IConfiguration configuration) : base(configuration) {
        }
    }
}