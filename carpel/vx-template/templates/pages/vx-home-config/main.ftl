[#import "../default.ftl" as base/]
[@base.page content model]
    <h1>${content.title!content.@name}</h1>
    <h2>Traveler Advisory</h2>
    [@cms.area name="travelerAdvisory"/]
    <h2>Available Airports</h2>
    [@cms.area name="airports"/]
    <h2>Airport Mapping</h2>
    [@cms.area name="airportMapping"/]
    <h2>No Fly Dates</h2>
    [@cms.area name="noFlyDates"/]
    <h2>Seasonal Availability</h2>
    [@cms.area name="seasonalAvailability"/]
[/@base.page]