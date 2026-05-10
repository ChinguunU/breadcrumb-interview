using LibraryBackendApp.Application.Interfaces;
using LibraryBackendApp.Application.Services;
using Microsoft.Extensions.DependencyInjection;

namespace LibraryBackendApp.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<IBookService, BookService>();

        return services;
    }
}