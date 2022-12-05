using CPKINGDOM.Core.Interfaces;
using CPKINGDOM.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;

namespace CPKINGDOM.Portal.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserSvc _userSvc;
        private readonly ITokenSvc _tokenSvc;
        private readonly IConfiguration _config;

        public AuthController(IUserSvc userSvc, IConfiguration config, ITokenSvc tokenSvc)
        {
            _userSvc = userSvc;
            _config = config;
            _tokenSvc = tokenSvc;
        }

        [AllowAnonymous]
        [HttpPost("Login")]
        public IActionResult GetUserCredential([FromBody] User user)
        {
            try
            {
                var userCreds = _userSvc.GetUserCredential(user.Username, user.Password);
                var token = _tokenSvc.BuildToken(_config["Jwt:Key"], _config["Jwt:Issuer"], userCreds);

                return Ok(new
                {
                    token,
                    details = userCreds
                });
            }
            catch(NullReferenceException)
            {
                return NotFound();
            }
        }
    }
}
