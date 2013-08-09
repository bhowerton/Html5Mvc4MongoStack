using System;

namespace Models
{
    public class MetricEntry
    {
        public string MetricName { get; set; }
        public int Value { get; set; }
        public DateTime TimeStamp { get; set; }
        public int DayOfMonth 
        {
            get { return TimeStamp.Day; }
        }

        public string DayOfWeek
        {
            get { return TimeStamp.DayOfWeek.ToString(); }
        }

        public string SillyValue
        {
            get
            {
                return "Silly!";
            }
        }

    }
}
