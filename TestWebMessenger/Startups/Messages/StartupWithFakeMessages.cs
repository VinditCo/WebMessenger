using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TestWebMessenger;
using WebMessenger;
using WebMessenger.Interfaces;

namespace WebMessenger {
    public class StartupWithFakeMessages : TestingStartup{
       
        public override void AddMessages (IServiceCollection services) {
            services.AddTransient<IMessages, MessagesFake>();
        }

        public StartupWithFakeMessages(IConfiguration configuration) : base(configuration) {
        }
    }
}