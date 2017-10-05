{
[#assign aDateTime = .now]
    "currentDate":"${aDateTime?iso("UTC")}",
    [@cms.area name="payment"/]
}