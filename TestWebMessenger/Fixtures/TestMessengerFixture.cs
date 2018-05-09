using System;
using System.IO;
using System.Net.Http;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.PlatformAbstractions;

public class TestMessengerFixture<TStartup> : IDisposable where TStartup : class  
{
    public HttpClient Client { get; }
    public TestServer Server { get; }

    public TestMessengerFixture()
    {
        IWebHostBuilder builder = new WebHostBuilder()
            .UseEnvironment("Test")
            .UseContentRoot(GetWebMessengerRoot()).UseStartup<TStartup>();
        Server = new TestServer(builder);
        Client = Server.CreateClient();
        Client.BaseAddress = new Uri("http://localhost:5000");
    }

    private static string GetWebMessengerRoot() {
        return Path.GetFullPath (Path.Combine (PlatformServices.Default.Application.ApplicationBasePath, @"../../../../WebMessenger"));
    }
    
    public void Dispose()
    {
        Client.Dispose();
        Server.Dispose();
    }
}