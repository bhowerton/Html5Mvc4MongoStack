using System;
using System.Linq;
using System.Web.Mvc;
using MongoDB.Driver;
using MongoModels;

namespace Api.Controllers
{
    public class MetricsController : Controller
    {
        // GET metrics/get
        public JsonResult GetMetricEntries(string metric)
        {
            var client = new MongoClient();
            var server = client.GetServer();
            server.Connect();

            var db = server.GetDatabase("AngieTrack");

            JsonResult result = null;
            using (server.RequestStart(db))
            {
                var collection = db.GetCollection<DbMetricEntry>(metric);                
                var list = collection.FindAll();
                if (!list.Any())
                {
                    // Create some new data
                    SeedFakeData(collection);
                    list = collection.FindAll();
                }
                
                result = Json(list, JsonRequestBehavior.AllowGet);
            }

            server.Disconnect();
            return result;
        }

        public JsonResult ClearMetricEntries(string metric)
        {
            var client = new MongoClient();
            var server = client.GetServer();
            server.Connect();

            var db = server.GetDatabase("AngieTrack");

            JsonResult result = null;
            using (server.RequestStart(db))
            {
                var collection = db.GetCollection<DbMetricEntry>(metric);
                collection.Drop();

                result = Json("", JsonRequestBehavior.AllowGet);
            }

            server.Disconnect();
            return result;
        }

        #region SeedData
        private static void SeedFakeData(MongoCollection collection)
        {
            // Generate fake random data for a couple weeks
            var startDate = Convert.ToDateTime("8/1/2013");
            var endDate = Convert.ToDateTime("8/15/2013");
            var r = new Random();

            while (startDate < endDate)
            {
                // Get a mood value from 1-10
                var value = r.Next(1, 10);

                // Inflate randomly based on how close we are to the weekend
                var inflateBy = (double)startDate.DayOfWeek / 7;

                value = value + (int)(((10 - value) * inflateBy/2));

                var metric = new DbMetricEntry { MetricName = "AngiesMood", Value = value, TimeStamp = startDate };

                collection.Insert(metric);

                startDate = startDate.AddDays(1);
            }
        }
        #endregion

    }
}
