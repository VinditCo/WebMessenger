using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TestWebMessenger.Mocks;
using WebMessenger;
using WebMessenger.Interfaces;

namespace TestWebMessenger {
        
    public abstract class TestingStartup :Startup {
        protected TestingStartup(IConfiguration configuration) : base(configuration) {
            configuration["ENVIRONMENT"] ="Development";
        }
    }

}
