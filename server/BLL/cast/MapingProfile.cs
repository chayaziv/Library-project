using AutoMapper;
using DAL;
using DTO;
namespace BLL.cast
{
    public class MapingProfile:Profile
    {
        public MapingProfile()
        {
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<PackageUser, PackageUserDto>().ReverseMap();
        }
        
    }
}
