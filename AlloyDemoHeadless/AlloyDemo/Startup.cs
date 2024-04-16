using AlloyDemo.Extensions;
using EPiServer.Cms.Shell;
using EPiServer.Cms.UI.AspNetIdentity;
using EPiServer.ContentApi.Cms;
using EPiServer.ContentApi.Core.DependencyInjection;
using EPiServer.ContentDefinitionsApi;
using EPiServer.OpenIDConnect;
using EPiServer.Scheduler;
using EPiServer.ServiceLocation;
using EPiServer.Web.Routing;

namespace AlloyDemo
{
    public class Startup
    {
        private readonly IWebHostEnvironment _webHostingEnvironment;
        private readonly Uri _frontendUri = new("http://localhost:8080");
        public Startup(IWebHostEnvironment webHostingEnvironment)
        {
            _webHostingEnvironment = webHostingEnvironment;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            if (_webHostingEnvironment.IsDevelopment())
            {
                AppDomain.CurrentDomain.SetData("DataDirectory", Path.Combine(_webHostingEnvironment.ContentRootPath, "App_Data"));

                services.Configure<SchedulerOptions>(options => options.Enabled = false);
            }

            services
                .AddCmsAspNetIdentity<ApplicationUser>()
                .AddCms()
                .AddAlloy()
                .AddAdminUserRegistration()
                .AddEmbeddedLocalization<Startup>()
                .ConfigureForExternalTemplates()
                .Configure<ExternalApplicationOptions>(o => o.OptimizeForDelivery = true);

            services.AddOpenIDConnect<ApplicationUser>(
            useDevelopmentCertificate: true,
            signingCertificate: null,
            encryptionCertificate: null,
            createSchema: true,
            options =>
            {
                options.RequireHttps = !_webHostingEnvironment.IsDevelopment();

                options.Applications.Add(new OpenIDConnectApplication
                {
                    ClientId = "frontend",
                    Scopes = { "openid", "offline_access", "profile", "email", "roles", ContentDeliveryApiOptionsDefaults.Scope },
                    PostLogoutRedirectUris = { _frontendUri },
                    RedirectUris =
                    {
                        new Uri(_frontendUri, "/login-callback"),
                        new Uri(_frontendUri, "/login-renewal"),
                    },
                });

                options.Applications.Add(new OpenIDConnectApplication
                {
                    ClientId = "cli",
                    ClientSecret = "cli",
                    Scopes = { ContentDefinitionsApiOptionsDefaults.Scope },
                });
            });

            services.AddOpenIDConnectUI();

            // Required by Wangkanai.Detection
            services.AddDetection();

            //services.AddContentDefinitionsApi();
            //services.AddContentDeliveryApi().WithSiteBasedCors();

            services.AddContentDefinitionsApi(OpenIDConnectOptionsDefaults.AuthenticationScheme);
            services.AddContentDeliveryApi(OpenIDConnectOptionsDefaults.AuthenticationScheme);
            services.ConfigureForContentDeliveryClient();

            //services.AddCors(opt =>
            //{
            //    opt.AddPolicy(name: "CorsPolicy", builder =>
            //    {
            //        builder.AllowAnyOrigin()
            //               .AllowAnyHeader()
            //               .AllowAnyMethod();
            //    });
            //});

            //services.AddSession(options =>
            //{
            //    options.IdleTimeout = TimeSpan.FromSeconds(10);
            //    options.Cookie.HttpOnly = true;
            //    options.Cookie.IsEssential = true;
            //});

            services.AddHostedService<ProvisionDatabase>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }


            // Required by Wangkanai.Detection
            app.UseDetection();
            //app.UseSession();

            app.UseCors(b => b
               .WithOrigins(new[] { "http://localhost:8080" })
               .WithExposedContentDeliveryApiHeaders()
               .WithExposedContentDefinitionApiHeaders()
               .WithHeaders("Authorization")
               .AllowAnyMethod()
               .AllowCredentials());

            app.UseAuthentication();
            app.UseAuthorization();

    

            //app.UseStaticFiles(new StaticFileOptions()
            //{
            //    OnPrepareResponse = ctx =>
            //    {
            //        ctx.Context.Response.Headers.Append("Access-Control-Allow-Origin", "*");
            //        ctx.Context.Response.Headers.Append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            //        ctx.Context.Response.Headers["Access-Control-Allow-Origin"] = "*";
            //    },
            //});

            app.UseRouting();

            app.UseCors(builder => builder
                     .AllowAnyOrigin()
                     .AllowAnyMethod()
                     .AllowAnyHeader());

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapContent();
            });

            app.UseStatusCodePages(context =>
            {
                if (context.HttpContext.Response.HasStarted == false &&
                    context.HttpContext.Response.StatusCode == StatusCodes.Status404NotFound &&
                    context.HttpContext.Request.Path == "/")
                {
                    context.HttpContext.Response.Redirect("/episerver/cms");
                }

                return Task.CompletedTask;
            });
        }
    }
}
