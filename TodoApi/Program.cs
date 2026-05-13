using Microsoft.EntityFrameworkCore;
using TodoApi.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();
builder.Services.AddDbContext<TodoDbContext>(opt => 
    opt.UseInMemoryDatabase("TodoList"));
builder.Services.AddCors();

var app = builder.Build();

// Enable CORS
app.UseCors(policy => policy
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());

app.MapControllers();
app.Run();
