# CMS Templates List

--------------------------------------------------------------------------------------------------------------
Name              Type    Content Details                         Description
----------------- ------- --------------------------------------- --------------------------------------------  
vxHomeConfig      JSON    (1) Airport Database, (2) Traveler      Fetched at the begining of a bootstrap 
                          Advisory, (3) Airport Mapping,          session, sets up the most basic data for 
                          (4) Seasonal Availability,              needed for website operation
                          (5) No Fly Dates                            

vxHomeInfo        JSON    (6) Latest News & Info, (7) Virgin      Information used to build the Home page and
                          features, (8) Promotional Blocks        not pertaining to a deeper configuration
                                                                  level (these are on vxHomeConfig)

vxFlightInfo      JSON    (8) Flight Movies, (9) Beverages and    Used at the confirmation page to show which
                          other products on the Flight            movies and purchase options are available on
                                                                  the flight

--------------------------------------------------------------------------------------------------------------


Open ones:


INTERACTION INTENSIVE (JSON + Angular app)


vxDeals (2-4 templates? - complex ones - intensive DB-like structures) Lists all deals currently available

vxAirportInfo (1 template) - Lists many information for a chosen airport

vxPointsCalc (1 template? - complex one - multiple DB-like structures) Allows to calculate points from partners



COPY INTENSIVE (Simple HTML markup-only, injected in vxContentApp)


vxPartners (1-3 templates) - List of partners

vxNewsList (1 template?) Listing all news headers (can be connected to info?)

vxNewsArticle (1 template?) One specific news article per se

vxElevate (2-4 templates) Several templates for Elevate section

vxFlyWithUs (2-3 templates) Several templates for Fly with Us section