using EPiServer.ContentApi.Core.Configuration;
using EPiServer.Framework;
using EPiServer.Framework.Initialization;
using EPiServer.ServiceLocation;

namespace AlloyDemo.Business.Initialization
{
    [InitializableModule]
    [ModuleDependency(typeof(EPiServer.Web.InitializationModule))]
    public class ContentDeliveryApiInit : IConfigurableModule
    {
        public void ConfigureContainer(ServiceConfigurationContext context)
        {
            context.Services.Configure<ContentApiOptions>(config =>
            {
                config.SetMinimumRoles(string.Empty);
            });
        }

        public void Initialize(InitializationEngine context)
        {
            return;
        }

        public void Uninitialize(InitializationEngine context)
        {
           return ;
        }
    }
}
