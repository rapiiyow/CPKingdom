using CPKINGDOM.Core.Interfaces;
using CPKINGDOM.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;

namespace CPKINGDOM.Portal.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserSvc _userSvc;

        public UserController(IUserSvc userSvc)
        {
            _userSvc = userSvc;
        }
    }
}
