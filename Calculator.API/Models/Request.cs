using System;

namespace Calculator.API.Models
{
    public class Request
    {
        public int Id { get; set; }
        public string IpAddress { get; set; }
        public DateTime RequestDateTime { get; set; }
    }
}