using AutoMapper;
using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//using DTO;

namespace BLL.cast
{
    public class MapingProfile:Profile
    {
        public MapingProfile()
        {
            CreateMap<User, UserDto>().ReverseMap();
        }
    }
}
