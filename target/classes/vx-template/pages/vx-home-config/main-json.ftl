{
[#assign aDateTime = .now]
    "currentDate":"${aDateTime?iso("UTC")}",
[@cms.area name="travelerAdvisory"/]
[@cms.area name="airports"/],
[@cms.area name="airportMapping"/],
[@cms.area name="noFlyDates"/],
[@cms.area name="seasonalAvailability"/]

}