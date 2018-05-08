    
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TestWebMessenger;
using TestWebMessenger.Mocks;
using WebMessenger.Interfaces;

public class StartupWithDummyMessages : TestingStartup{
    public StartupWithDummyMessages(IConfiguration configuration) : base(configuration) {
    }
    public override void AddMessages (IServiceCollection services) {
        services.AddTransient<IMessages, MessagesDummy>();
    }
}