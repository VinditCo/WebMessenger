using System.Net.Http;
using System.Threading.Tasks;
using WebMessenger;
using WebMessenger.Models;
using Xunit;
using Xunit.Abstractions;

namespace TestWebMessenger {
    public class LoadingPageWithExistingMessagesShould : IClassFixture<TestMessengerFixture<TestingStartup>>{
        protected ITestOutputHelper output;
        public HttpClient Client { get; }
        public LoadingPageWithExistingMessagesShould(TestMessengerFixture<TestingStartup> messengerFixture, ITestOutputHelper output)
        {
         
            Client = messengerFixture.Client;
            this.output = output;
           
          
        }

        private async Task AddFakeMessage()
        {
            var response =  await Client.GetAsync("/testing/ClearMessages");
            var asString = await response.Content.ReadAsStringAsync();
            output.WriteLine(asString);
            response = await Client.GetAsync("/testing/AddOneMessage");
            asString =  await response.Content.ReadAsStringAsync();
            output.WriteLine(asString);
        }
        
        [Fact]
        public async Task HaveAddMessageAndAssignDeleteScript() {
            await AddFakeMessage();
            var response = await Client.GetAsync("/");
            var responseString =  await response.Content.ReadAsStringAsync();
            output.WriteLine(responseString);
            response.EnsureSuccessStatusCode();
            responseString = await response.Content.ReadAsStringAsync();
            output.WriteLine(responseString);
            Assert.True (responseString.Contains ( "<script> addMessageAndAssignDelete"));
        }
        
        [Fact]
        public async Task HaveCorrectDataStructure() {
            await AddFakeMessage();
            var response = await Client.GetAsync("/");
            response.EnsureSuccessStatusCode();
            var responseString = await response.Content.ReadAsStringAsync();
            output.WriteLine(responseString);
            Assert.True (responseString.Contains ( "addMessageAndAssignDelete($, '#messages', { message: 'test content', id: 'test ID'"));
        }
        
    }
}