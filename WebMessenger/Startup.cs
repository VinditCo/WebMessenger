using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using WebMessenger.Hubs;
using WebMessenger.Interfaces;

namespace WebMessenger {
    public class Startup {
        private IMessages localMessages;
        public Startup (IConfiguration configuration) {

            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices (IServiceCollection services) {
            
            // DI
            services.AddTransient<IMessages, LocalMessagesContext>();
            
            services.AddMvc();
            
            services.AddSignalR();        
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure (IApplicationBuilder app, IHostingEnvironment env) {
            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
            }
            else {
                app.UseExceptionHandler ("/Home/Error");
            }

            app.UseStaticFiles();
            
            app.UseSignalR(routes =>
            {
                routes.MapHub<MessengerHub>("messengerHub");
            });

            app.UseMvc (routes => { routes.MapRoute (name: "default", template: "{controller=Home}/{action=Index}/{id?}"); });
            app.UseMvcWithDefaultRoute();
        }
    }
}