using Microsoft.Extensions.Configuration;
using WebMessenger;

namespace TestWebMessenger {
        
    public class TestingStartup : Startup {
        public TestingStartup(IConfiguration configuration) : base(configuration) {
            configuration["ENVIRONMENT"] ="Development";
        }
    }

}
