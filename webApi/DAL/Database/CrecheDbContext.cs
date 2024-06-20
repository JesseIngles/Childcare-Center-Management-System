using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;
using webapi.DAL.Database.Entities;

namespace webapi.webapi.DAL.Database;

public partial class CrecheDbContext : DbContext
{

    private string ConnnectionString = "Server=localhost;port=3306;userid=root;password=1234;database=crechedb1";
    public DbSet<TbAluno> TbAlunos {get;set;}
    public DbSet<TbAtividade> TbAtividades {get;set;}
    public DbSet<TbTurma> TbTurmas {get;set;}
    public DbSet<TbFuncionario> TbFuncionarios {get;set;}
    public DbSet<TbDisciplina> TbDisciplinas {get;set;}
    public DbSet<TbEncarregado> TbEncarregados {get;set;}
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseMySql(ConnnectionString,ServerVersion.AutoDetect(ConnnectionString));
    }

}