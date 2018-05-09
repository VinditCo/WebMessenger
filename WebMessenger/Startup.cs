using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using WebMessenger.Context;
using WebMessenger.Hubs;

namespace WebMessenger {
    public class Startup {
        public Startup (IConfiguration configuration) {

            Configuration = configuration;
        }
        
        public IConfiguration Configuration { get; }
        
        public void ConfigureServices (IServiceCollection services) {
            AddMessages (services);
            
            services.AddMvc();
            
            services.AddSignalR();     
            
            services.AddSingleton<IConfiguration>(Configuration);
        }

        public virtual void AddMessages (IServiceCollection services) {
            services.AddDbContext<MessagesContext>(opt => opt.UseInMemoryDatabase("Messages"));
        }

        public void Configure (IApplicationBuilder app, IHostingEnvironment env) {
            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
            }
            else {
                app.UseExceptionHandler ("/Error");
            }
          
            app.UseStaticFiles();
            
            app.UseSignalR(routes =>
            {
                routes.MapHub<MessengerHub>("messengerHub");
            });

            app.UseMvc (routes => { routes.MapRoute (name: "default", template: "{controller=Messenger}/{action=Index}/{id?}"); });
            app.UseMvcWithDefaultRoute();
        }
    }

}