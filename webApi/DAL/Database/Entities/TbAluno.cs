namespace webapi.DAL.Database.Entities
{
  public class TbAluno
  {
    public int Id {get;set;}
    public string Nome {get;set;}
    public string BI {get;set;}
    public DateTime DataNascimento { get; set; }
    public string NecessidadesEspeciais {get;set;}
    public virtual ICollection<TbEncarregado> Encarregados {get;set;} = new List<TbEncarregado>();
    public virtual ICollection<TbTurma> Turmas {get;set;}  = new List<TbTurma>();
  }
}
