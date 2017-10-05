<div class="calculator red">
    <section ng-controller="CalculatorCtrl">
       <div class="radio-buttons red" 
origin="{{calculator.defaultOrigin='${content.origin!}'}}" 
destination="{{calculator.defaultDestination='${content.destination!}'}}"
json_airports = "{{calculator.json_airports='/cms/dam/jcr:${cmsfn.contentByPath( '/vx-points-calculator/airports.json' ,'dam')['jcr:uuid']}'}}"
json_pointsBurnAll = "{{calculator.json_pointsBurnAll='/cms/dam/jcr:${cmsfn.contentByPath( '/vx-points-calculator/pointsBurnAll.json' ,'dam')['jcr:uuid']}'}}"
json_carriers = "{{calculator.json_carriers='/cms/dam/jcr:${cmsfn.contentByPath( '/vx-points-calculator/carriers.json' ,'dam')['jcr:uuid']}'}}"
>
            <div class="radio-buttons-container">
                <form carrier="{{calculator.carrierSelected='${content.carrier!}'}}">
                    <input name="trip-carrier" type="hidden" ng-model="calculator.carrierSelected"/>
                    <input id="radio01" type="radio" ng-model="calculator.typeSelected" name="trip-type" value="RT" />
                    <label for="radio01">Round Trip</label>
                    <input id="radio02" type="radio" ng-model="calculator.typeSelected" name="trip-type" value="OW" />
                    <label for="radio02">One Way</label>
                    <!--
                    <input id="radio03" type="radio" ng-model="calculator.typeSelected" name="trip-type" value="MC" />
                    <label for="radio03">Multi City</label>
                    -->
                </form>
            </div>
        </div>
        <div class="header-selector red">
            <div id="header-selector-container">
                <p class="header-selector-paragraph">Calculate points from
                    <span class= "container">
                        <select class="header-selector-selectbox" ng-model="calculator.originSelected" ng-options="airport.name for airport in calculator.airports_origin">
                            <option>San Francisco, CA (SFO) - All Airports</option>
                        </select>
                        <br class="header-selector-linebreak"/>
                    </span> to
                    <span class= "container">
                        <select class="header-selector-selectbox" ng-model="calculator.destinationSelected" ng-options="airport.name for airport in calculator.airports_destination">
                            <option>San Francisco, CA (SFO) - All Airports</option>
                        </select>
                        <br class="header-selector-linebreak"/>
                    </span>
                </p>
            </div>
        </div>
        <div ng-class="{'calculator-table-column-four': (calculator.carrierSelected === ''),'calculator-table-column-three': !(calculator.carrierSelected === '')}" ng-show="calculator.result.length > 0">
            <div class="container">
            <table>
                <thead>
                  <tr>
                    <th class="col first">&nbsp;<br/>Class</th>
                    <th class="col second">&nbsp;<br/>Points</th>
                    <th class="col third">Taxes &<br ng-hide="header.breakpoint === 'small'"/>Carrier Imposed Fees</th>
                    <th class="col fourth" ng-show="calculator.carrierSelected === ''">&nbsp;<br/>Airline Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr ng-repeat="airport in calculator.result">
                    <td class="col first" ng-bind="airport.cabinClass"></td>
                    <td class="col second"><span ng-bind="airport.numberOfPoints"></span><span ng-show="airport.connectingFlight==='true'"><sup>*</sup></span></td>
                    <td class="col third" ng-bind="airport.taxesAndFees"></td>
                    <td class="col fourth" ng-bind="airport.carrierName" ng-show="calculator.carrierSelected === ''"></td>
                  </tr>
                </tbody>
            </table>
            <div class="content"><p>* Requires connection.</p></div>
            </div>
        </div>
        [#if content.legalFooter??]
            <div class="calculator-text-footer">
                <div class="wrap">
                    <div class="content">
                    ${cmsfn.decode(content).legalFooter}
                    </div>
                </div>
            </div>
        [/#if]
        <div class="calculator-footer">
	        <div class="wrap">
		        <div class="content">
		            <p>${content.text!}</p>
		            <a href="${content.buttonLink!}">${content.buttonLabel!}</a>
		        </div>
	        </div>
        </div>
    </section>
</div>