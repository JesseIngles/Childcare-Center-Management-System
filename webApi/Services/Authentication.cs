using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using webapi.DAL.Database.Entities;

namespace webapi.Services
{
  public class Authentication
  {
    private readonly SymmetricSecurityKey _key;

    public Authentication(SymmetricSecurityKey key)
    {
      _key = key;
    }
    public string GenerateTokenEncarregado(TbEncarregado username)
    {

      var claims = new[]
      {
        new Claim(JwtRegisteredClaimNames.Sub, username.Nome),
        new Claim("Encarregado", username.Nome),
        new Claim("Telefone", username.Email),
        new Claim("Id", username.Id.ToString()),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
    };

      var token = new JwtSecurityToken(
          issuer: "CRECHE",
          audience: "CRECHE",
          claims: claims,
          expires: DateTime.UtcNow.AddDays(360),
          signingCredentials: new SigningCredentials(_key, SecurityAlgorithms.HmacSha256)
      );

      return new JwtSecurityTokenHandler().WriteToken(token);
    }


    public string GenerateTokenFuncionario(TbFuncionario username)
    {

      var claims = new[]
      {
        new Claim(JwtRegisteredClaimNames.Sub, username.Nome),
        new Claim("Funcionario", username.Nome),
        new Claim("Telefone", username.Email),
        new Claim("Id", username.Id.ToString()),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
      };

      var token = new JwtSecurityToken(
          issuer: "CRECHE",
          audience: "CRECHE",
          claims: claims,
          expires: DateTime.UtcNow.AddDays(360),
          signingCredentials: new SigningCredentials(_key, SecurityAlgorithms.HmacSha256)
      );

      return new JwtSecurityTokenHandler().WriteToken(token);
    }

  }
}