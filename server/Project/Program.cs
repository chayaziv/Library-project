using Microsoft.EntityFrameworkCore;
using DAL;
using BLL;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddDbContext<Dblibrary>( o => o.UseLazyLoadingProxies().UseSqlServer
    (builder.Configuration.GetConnectionString("SqlServer")));
builder.Services.AddScoped<IRepository<Book>,BooksRepository>();
builder.Services.AddScoped<IRepository<BookUser>,BookUserRepository>();
builder.Services.AddScoped<IRepository<Package>, PackagesRespository>();
builder.Services.AddScoped<IRepository<PackageUser>,PackageUserRespository>();
builder.Services.AddScoped<IRepository<User>,UserRespository>();
builder.Services.AddScoped<IRepository<Category>,CategoryRepository>();


builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();

        }
       );
});
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});


var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
