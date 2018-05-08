using System.Net.Http;
using System.Threading.Tasks;
using WebMessenger;
using WebMessenger.Models;
using Xunit;
using Xunit.Abstractions;

namespace TestWebMessenger {
    public class MessageAddingAndRemovingShould  : IClassFixture<TestMessengerFixture<StartupWithSpyMessages>>   {
        protected ITestOutputHelper output;
        public HttpClient Client { get; }

        private MessagesSpy spy;
        public MessageAddingAndRemovingShould(TestMessengerFixture<StartupWithSpyMessages> messengerFixture, ITestOutputHelper output) {
            Client = messengerFixture.Client;
            spy = new MessagesSpy();
            this.output = output;
        }
        
        
        [Fact]
        public async Task UpdateClientPageWhenMessageIsAdded() {
            var response = await Client.GetAsync("/");
            response.EnsureSuccessStatusCode();
            var responseString = await response.Content.ReadAsStringAsync();
 
            // Add a message via the server
            var addAMessage = await Client.GetAsync("/testing/AddOneMessage");
            
        }
        
    }
    
       
        
}