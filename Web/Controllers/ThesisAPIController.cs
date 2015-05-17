using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Web.Http;
using Web.Models;

namespace Web.Controllers
{
    public class ThesisAPIController : ApiController
    {
        [HttpGet]
        public IEnumerable<Person> GetPeople()
        {
            List<Person> people = new List<Person>();
            people.Add(new Person { FirstName = "John", LastName = "Doe", Age = 20 });
            people.Add(new Person { FirstName = "Anna", LastName = "Smith", Age = 25 });
            people.Add(new Person { FirstName = "Peter", LastName = "Jones", Age = 30 });

            Thread.Sleep(2000);

            return people;
        }

        [HttpGet]
        public string Title64()
        {
            string base64 = Convert.ToBase64String(Encoding.UTF8.GetBytes("Demopealkiri"));
            return base64;
        }

        [HttpGet]
        public string GetUserName()
        {
            List<string> people = new List<string>();
            people.Add("Mati");
            people.Add("Kati");
            people.Add("Juhan");
            Random r = new Random();
            int index = r.Next(0, people.Count);
            return people[index];
        }
    }
}
