using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DTO;

namespace BLL.cast
{
    public class MapingProfile:Profile
    {
        public MapingProfile()
        {
            CreateMap<Books,BooksDTO>()
                .ForMember(dest=>dest.CategoryName,
                source=>source.MapFrom(source
                =>source.Category.Name)).ReverseMap();
        }
    }
}
