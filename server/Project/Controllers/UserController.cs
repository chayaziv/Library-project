using AutoMapper;
using BLL;
using BLL.BLL;
using DAL;
using DTO;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
namespace Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors]
    public class UserController : ControllerBase
    {
        private IRepository<User> UserRepository;
        private IMapper mapper;
        private IRepository<PackageUser> _packageUserRepository;
        private IRepository<BookUser> _bookUserRepository;

        public UserController(IRepository<User> UserRepository ,IMapper mapper,IRepository<PackageUser>package,IRepository<BookUser> repository)
        {
            this.UserRepository = UserRepository;
            this.mapper = mapper;
            _packageUserRepository = package;
            _bookUserRepository = repository;
        }
        [HttpPost("login")]
        public ActionResult<UserDto> GetUserById(UserDto s)
        {
            User b = UserRepository.GetBy(mapper.Map<User>(s));
            if (b == null)
                return NotFound("the User isnot found");//404

            return Ok(mapper.Map<UserDto>(b));//200
        }
        [HttpPost("register")]
        public ActionResult<UserDto> AddUser([FromBody]UserDto b)
        {
            if (b == null)
                return BadRequest("UserDto is null.");

            if (string.IsNullOrEmpty(b.Name) || string.IsNullOrEmpty(b.Password))
                return BadRequest("Name and Password are required.");
            var user = mapper.Map<User>(b);
            var existing = UserRepository.GetBy(user);
            if (existing != null)
            {
                return BadRequest("User is already exist");
            }

            // יצירת משתמש חדש
            var newUser = mapper.Map<User>(b);
            var newUser1=UserRepository.Add(newUser);

            var newDto = mapper.Map<UserDto>(newUser1);
            return Ok(newDto);  


        }
        [HttpPut("update/{id}")]

        public IActionResult UpdateUser(int id, User b)
        {
            if (b == null)
                return BadRequest();
            if (id != b.Id )
                return Conflict();
            return CreatedAtAction(nameof(AddUser), new { id = b.Id  }, UserRepository.Update(b));
        }
        [HttpDelete("delete")]
        public IActionResult Delete(int id)
        {

            User User = UserRepository.GetById(id);
            if (User == null)
            {
                return NotFound();
            }

            UserRepository.Delete(User);
            return NoContent();


        }
        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            List<User> s = UserRepository.GetAll();
            if (s == null)
                return NotFound("Dont have any User");
            return Ok(s);
        }

        [HttpGet("{userId}/packages")]
        public ActionResult<List<PackageUser>> GetPackagesByActiveStatus(int userId, [FromQuery] bool isActive)
        {
            var packages = _packageUserRepository.GetAll(pu => pu.UserId == userId && pu.IsActive == isActive);
            return Ok(packages);
        }
        [HttpGet("{userId}/books")]
        public ActionResult<List<BookUser>> GetBooksByActiveStatus(int userId, [FromQuery] bool isActive)
        {
            var books = _bookUserRepository.GetAll(bu => bu.UserId == userId && bu.IsActiveForUser == isActive);
            return Ok(books);
        }

    }
}
