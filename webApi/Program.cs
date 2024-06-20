using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using webapi.DAL.CRepository;
using webapi.DAL.IRepository;
using webapi.Services;
using webapi.webapi.DAL.Database;

var builder = WebApplication.CreateBuilder(args);

var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("tngcaixeilmcpnyzkkvowbzhgckdgmlapitltvfmmhoenpbeuwnzqzeyhzbgraucbbndvqnnaixbqsykhefdmvlkvgxfshlexzdaggrxxcvwbvscobwvwsrjsdtaaqxx"));
builder.Services.AddSingleton(key);

builder.Services.AddTransient<CrecheDbContext>();
builder.Services.AddTransient<Authentication>();
builder.Services.AddTransient<ILogin, CLoginRepository>();
builder.Services.AddTransient<IAluno, CAlunoRepository>();
builder.Services.AddTransient<IEncarregado, CEncarregadoRepository>();
builder.Services.AddTransient<IFuncionario, CFuncionarioRepository>();
builder.Services.AddTransient<ITurma, CTurmaRepository>();
builder.Services.AddTransient<IAtividade, CAtividadeRespository>();
builder.Services.AddTransient<IDisciplina, CDisciplinaRepository>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Centro Infantil - Vanessa Rays", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "Insira o token JWT",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true
        };
    });

builder.Services.AddCors(options => options.AddPolicy("BackOffice", builder =>
{
    builder.WithOrigins("http://localhost:5173")
               .AllowAnyHeader()
               .AllowAnyMethod()
               .SetIsOriginAllowed(origin => true) // allow any origin
               .AllowCredentials()
           ;
}));

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("SerAgente", policy =>
    {
        policy.RequireClaim("Senha");
    });
    options.AddPolicy("SerAgenteAdmin", policy =>
    {
        policy.RequireClaim("IsAdmin");
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();

// Use CORS middleware
app.UseCors("BackOffice");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.Run();
