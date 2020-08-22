using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace devIncubator.Models
{
    public class UserData
    {
        public int UserDataId { get; set; }
        public int RangeFrom { get; set; }
        public int RangeTo { get; set; }
        public float step { get; set; }
        public int a { get; set; }
        public int b { get; set; }
        public int c { get; set; }
    }
}
