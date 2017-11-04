using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Threading.Tasks;
using time4movies.UI.Auth;
using time4movies.Repository;
using time4movies.Services;
using time4movies.Repository.Administration;
using time4movies.Repository.Administration.Interfaces;
using time4movies.Services.Administration.Interfaces;
using time4movies.Services.Administration;

namespace time4movies.UI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        { 
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            DbHelper.ConnectionString = "Server=mssql4.gear.host;Database=time4moviesdb;User Id=time4moviesdb;Password=riinvest@12;";
            services.AddTransient<IAppUserRepo, AppUserRepo>();
            services.AddTransient<IAppUserService, AppUserService>();
            string t = TokenGenerator.Build();

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(options => {
                        options.TokenValidationParameters =
                             new TokenValidationParameters
                             {
                                 ValidateIssuer           = true,
                                 ValidateAudience         = true,
                                 ValidateLifetime         = true,
                                 ValidateIssuerSigningKey = true,
                                 ValidIssuer              = TokenGenerator.ISSUER,
                                 ValidAudience            = TokenGenerator.AUDIENCE,
                                 IssuerSigningKey         = TokenGenerator.Create(TokenGenerator.TOKEN_SECRET)
                             };

                        options.Events = new JwtBearerEvents
                        {
                            OnAuthenticationFailed = context =>
                            {
                                return Task.CompletedTask;
                            },
                            OnTokenValidated = context =>
                            {
                                return Task.CompletedTask;
                            }
                        };
                    });


            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }


            app.UseStaticFiles();

            //This implements Authentication
            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }
    }
}
