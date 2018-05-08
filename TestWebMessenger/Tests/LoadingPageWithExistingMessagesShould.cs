using System.Net.Http;
using System.Threading.Tasks;
using WebMessenger;
using WebMessenger.Models;
using Xunit;
using Xunit.Abstractions;

namespace TestWebMessenger {
    public class LoadingPageWithExistingMessagesShould : IClassFixture<TestMessengerFixture<StartupWithFakeMessages>>{
        protected ITestOutputHelper output;
        public HttpClient Client { get; }
        public LoadingPageWithExistingMessagesShould(TestMessengerFixture<StartupWithFakeMessages> messengerFixture, ITestOutputHelper output) {
            Client = messengerFixture.Client;
            this.output = output;
            
            MessagesFake fakeMessages = new MessagesFake();
            fakeMessages.SaveMessage (new MessageModel() {
                ID="1",
                Content = "Test"
            });
        }
        
        [Fact]
        public async Task HaveAddMessageAndAssignDeleteScript() {
            var response = await Client.GetAsync("/");
            response.EnsureSuccessStatusCode();
            var responseString = await response.Content.ReadAsStringAsync();
            output.WriteLine (responseString);
            Assert.True (responseString.Contains ( "<script> addMessageAndAssignDelete"));
        }
        
        [Fact]
        public async Task HaveCorrectDataStructure() {
     
            var response = await Client.GetAsync("/");
            response.EnsureSuccessStatusCode();
            var responseString = await response.Content.ReadAsStringAsync();
            output.WriteLine (responseString);
            Assert.True (responseString.Contains ( "<script> addMessageAndAssignDelete($, '#messages', { message: 'Test', id: '1'"));
        }
        
    }
}