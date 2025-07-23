using AutoMapper;
using BLL;
using DAL;
using DTO;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors]
    public class UserController : ControllerBase
    {
        private readonly IRepository<User> UserRepository;
        private readonly IMapper mapper;
        private readonly IRepository<PackageUser> _packageUserRepository;
        private readonly IRepository<BookUser> _bookUserRepository;
        private readonly IRepository<Book> _bookRepository;
        private readonly IRepository<Package> _packageRepository;

        public UserController(IRepository<User> UserRepository ,IMapper mapper,IRepository<PackageUser>package,IRepository<BookUser> repository,IRepository<Package> repository1,IRepository<Book> repository2)
        {
            this.UserRepository = UserRepository;
            this.mapper = mapper;
            _packageUserRepository = package;
            _bookUserRepository = repository;
            _packageRepository = repository1;
            _bookRepository = repository2;
        }
        [HttpPost("login")]
        public ActionResult<UserDto> GetUserById(UserDto s)
        {
            User b = UserRepository.GetBy(mapper.Map<User>(s));
            if (b == null)
                return NotFound("the User isnot found");

            return Ok(mapper.Map<UserDto>(b));
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
            Console.WriteLine("GetAll");
            if (s == null)
                return NotFound("Dont have any User");
            return Ok(s);
        }

        [HttpGet("{userId}/packages")]
        public ActionResult<List<Package>> GetPackagesByActiveStatus(int userId, [FromQuery] bool isActive)
        {
            var packages = _packageUserRepository.GetAll(pu => pu.UserId == userId && pu.IsActive == isActive);
            return Ok(packages);
        }
        [HttpGet("{userId}/books")]
        public ActionResult<List<Book>> GetBooksByActiveStatus(int userId, [FromQuery] bool isActive)
        {
            var books = _bookUserRepository.GetAll(bu => bu.UserId == userId && bu.IsActiveForUser == isActive);
            return Ok(books);
        }
        public class ReqPurchase
        {
          public  int PackageId {  get; set; }
        }
        [HttpPost("{userId}/packages")]
        public ActionResult<PackageUserDto> PurchasePackage(int userId, [FromBody] ReqPurchase packageId)
        {
            
            var user = UserRepository.GetById(userId);
            if (user == null)
                return NotFound("User not found");

            var package =_packageRepository.GetById(packageId.PackageId);
            if (package == null)
                return NotFound("Package not found");

            var packageUser = new PackageUser
            {
                UserId = userId,
                PackageId = packageId.PackageId,
                IsActive = true,
                RemainingPoints = package.PointCount,
                PurchaseDate = DateTime.UtcNow
            };
            _packageUserRepository.Add(packageUser);
            var packageUserDto = mapper.Map<PackageUserDto>(packageUser);
            return Ok(packageUserDto);

        }

        public class ReqAdd
        {
            public int BookId { get; set; }
        }
    }
}
