using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.TestHost;
using WebMessenger;
using Xunit;
using Xunit.Abstractions;

namespace TestWebMessenger {
    public class LoadingPageShould : IClassFixture<TestMessengerFixture<TestingStartup>>   {

        protected TestServer _testServer;
        protected ITestOutputHelper output;
        public HttpClient Client { get; set; }
        
        public LoadingPageShould(TestMessengerFixture<TestingStartup> messengerFixture, ITestOutputHelper output) {
            Client = messengerFixture.Client;
            this.output = output;
        }

        [Fact]
        public async Task Return200() {
            var response = await Client.GetAsync("/");
            response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task ReturnHtml() {
            var response = await Client.GetAsync("/");
            response.EnsureSuccessStatusCode();
            var responseString = await response.Content.ReadAsStringAsync();
            Assert.True (responseString.Contains ("<html>"));
            Assert.True (responseString.Contains ("</html>"));
        }
        
        [Fact]
        public async Task HaveAFormToEnterAMessage() {
            var response = await Client.GetAsync("/");
            response.EnsureSuccessStatusCode();
            var responseString = await response.Content.ReadAsStringAsync();
            Assert.True (responseString.Contains ("<textarea type=\"text\""));
        }
        
    }
}