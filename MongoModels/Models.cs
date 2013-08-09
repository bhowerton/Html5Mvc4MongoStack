using Models;
using MongoDB.Bson;

namespace MongoModels
{
    public class DbMetric : Metric
    {
        public ObjectId _id { get; set; }
    }

    public class DbMetricEntry : MetricEntry
    {
        public ObjectId _id { get; set; }
    }

}
