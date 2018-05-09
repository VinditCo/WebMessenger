using System.Net.Http;
using System.Threading.Tasks;
using WebMessenger;
using WebMessenger.Models;
using Xunit;
using Xunit.Abstractions;

namespace TestWebMessenger {
    public class MessageAddingAndRemovingShould  : IClassFixture<TestMessengerFixture<TestingStartup>>   {
        protected ITestOutputHelper output;
        public HttpClient Client { get; }

        private static int ticker;
        public MessageAddingAndRemovingShould(TestMessengerFixture<TestingStartup> messengerFixture, ITestOutputHelper output) {
            Client = messengerFixture.Client;
            this.output = output;
           
        }
        // Required as we do not create a new server each test 
        public async Task ClearFakeMessages()
        {
            output.WriteLine("Clearing");;
            await Client.GetAsync("/testing/ClearMessages");
        }
        
        
        [Fact]
        public async Task AddMessageThroughServer()
        {
           await ClearFakeMessages();
            // No messages
            await AssertNoMessagesOnStart();
            // Add a message via the server
            await AssertMessageCanBeAddedViaServer();
        }
        
         
        [Fact]
        public async Task RemoveMessageThroughServer() {
             await ClearFakeMessages();
            // No messages
            await AssertNoMessagesOnStart();
            // Add a message via the server
            await AssertMessageCanBeAddedViaServer();
            // Message removed 
            await AssertSingleMessageCanBeRemoved();
        }

        private async Task AssertSingleMessageCanBeRemoved()
        {
            await Client.GetAsync("/testing/RemoveOneMessage");
            var response = await Client.GetAsync("/");
            var responseString = await response.Content.ReadAsStringAsync();
            Assert.False(responseString.Contains("addMessageAndAssignDelete"));
        }

        private async Task AssertMessageCanBeAddedViaServer()
        {
            var requestAddMessage = await Client.GetAsync("/testing/AddOneMessage");
            await requestAddMessage.Content.ReadAsStringAsync();
            // Message is added 
            var response = await Client.GetAsync("/");
            var responseString = await response.Content.ReadAsStringAsync();
            Assert.True(responseString.Contains("addMessageAndAssignDelete"));
        }

        private async Task AssertNoMessagesOnStart()
        {
            var response = await Client.GetAsync("/");
            response.EnsureSuccessStatusCode();
            var responseString = await response.Content.ReadAsStringAsync();
            Assert.False(responseString.Contains("addMessageAndAssignDelete"));
        }
    }
    
       
        
}