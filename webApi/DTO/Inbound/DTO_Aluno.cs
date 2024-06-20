namespace webapi.DTO.Inbound
{
  public class DTO_Aluno
  {

    public string Nome { get; set; } = null!;
    public string BI {get;set;}
    public DateTime DataNascimento { get; set; }

    public string NecessidadesEspeciais {get;set;}

    public int TurmaId { get; set; }
    public List<int> EncarregadosId {get;set;}
  }
}