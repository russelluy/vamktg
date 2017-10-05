define(function () {
  'use strict';

  var ResourceBundle = {

    fareSelector: {
      invalidDateMinuteBuffer: 90
    },

    changeGuider: {
      changeDates: 'Change: Select new dates',
      changeCities: 'Change: Select new cities',
      changeFares: 'Change: Select new fare',
      changeFaresExtended: 'Change: Select new fare type',
      changeSeats: 'Change: Select new seats',
      reviewChanges: 'Change: Review changes',
      submitPayment: 'Change: Submit payment'
    },

    ical: {
      subjectPrefix: 'Virgin America'
    },

    checkIn: {
      dayLimit: 2,
      loungeOptions: {
        continueButton: {
          none: 'NO THANKS',
          selected: 'CONTINUE',
        },
        continueText: {
          none: 'Continue without lounge',
          noLoungesAvailable: 'Sorry, no lounges available.',
          selected: ' lounge selected'
        },
        IAD: {
          options: [
            'Complimentary Drinks',
            'Free Food',
            'Free WiFi',
            'Luxury Seating'
          ]
        },
        JFK: {
          options: [
            'Complimentary Drinks',
            'Free Food',
            'Free WiFi',
            'Luxury Seating',
            'Spa Services'
          ]
        },
        LAX: {
          options: [
            'Complimentary Drinks',
            'Free Food',
            'Free WiFi',
            'Luxury Seating',
            'Views'
          ]
        },
        SFO: {
          options: [
            'Complimentary Drinks',
            'Free Food',
            'Free WiFi',
            'Luxury Seating'
          ]
        }
      },
      upgradeOptions: {
        mc: {
          title: 'Main Cabin',
          options: [
            'Less leg room',
            'No free movies',
            'No free food',
            'Regular boarding'
          ]
        },
        mce: {
          title: 'Main Cabin Express',
          options: [
            'More leg room',
            'Free movies',
            'Free food',
            'Early boarding',
            'Priority security'
          ]
        },
        mcs: {
          title: 'Main Cabin Select',
          options: [
            'Early Boarding',
            'Priority Security',
            'More Leg Room',
            'Free Food',
            'Free Movies'
          ]
        },
        first: {
          title: 'First Class',
          options: [
            'Luxury Seating',
            'Dedicated Cabin Space',
            'Priority Security',
            'Early Boarding',
            'Free Food',
            'Free Movies'
          ]
        }
      }
    },
    elevate: {
      favoriteDestinations: [
        'Atlanta, GA',
        'Austin, TX',
        'Baltimore, MD',
        'Boston, MA',
        'Cancun, Mexico',
        'Charlotte, NC',
        'Cincinnati, OH',
        'Cleveland, OH',
        'Dallas, TX',
        'Denver, CO',
        'Detroit, MI',
        'Fort Lauderdale, FL',
        'Fort Myers, FL',
        'Hartford, CT',
        'Houston, TX',
        'Indianapolis, IN',
        'Jacksonville, FL',
        'Kansas City, MO',
        'Las Vegas, NV',
        'Los Angeles, CA',
        'Los Cabos, Mexico',
        'Long Beach, CA',
        'Miami, FL',
        'Milwaukee, WI',
        'Minneapolis, MN',
        'Nashville, TN',
        'New York, NY',
        'Newark, NJ',
        'New Orleans, LA',
        'Oakland, CA',
        'Orange County, CA',
        'Orlando, FL',
        'Palm Springs, CA',
        'Philadelphia, PA',
        'Phoenix, AZ',
        'Pittsburgh, PA',
        'Providence, RI',
        'Portland, OR',
        'Raleigh-Durham, NC',
        'Sacramento, CA',
        'Salt Lake City, UT',
        'San Antonio, TX',
        'San Diego, CA',
        'San Francisco, CA',
        'San Jose, CA',
        'Seattle, WA',
        'St. Louis, MO',
        'Tampa, FL',
        'Toronto, ON',
        'Washington, DC',
        'West Palm Beach, FL'
      ],
      navBarLinks: {
        loggedOut: [
          {
            value: '/elevate-frequent-flyer/sign-up',
            name: 'Join Elevate'
          },
          {
            value: '/cms/elevate-frequent-flyer',
            name: 'About Elevate'
          },
          {
            value: '/cms/elevate-frequent-flyer/earn-points',
            name: 'Earn Points'
          },
          {
            value: '/cms/elevate-frequent-flyer/redeem-points',
            name: 'Redeem Points'
          },
          {
            value: '/cms/elevate-frequent-flyer/status',
            name: 'Status'
          },
          {
            value: '/cms/elevate-frequent-flyer/partners',
            name: 'Partners'
          },
          {
            value: '/elevate-frequent-flyer/buy-gift-points',
            name: 'Buy Points'
          },
          {
            value: '/elevate-frequent-flyer/credit-card',
            name: 'Credit Card'
          }
        ],
        loggedIn: [
          {
            value: '/elevate-frequent-flyer/landing',
            name: 'Overview'
          },
          {
            value: '/elevate-frequent-flyer/my-account',
            name: 'My Account'
          },
          {
            value: '/cms/elevate-frequent-flyer',
            name: 'About Elevate'
          },
          {
            value: '/cms/elevate-frequent-flyer/earn-points',
            name: 'Earn Points'
          },
          {
            value: '/cms/elevate-frequent-flyer/redeem-points',
            name: 'Redeem Points'
          },
          {
            value: '/cms/elevate-frequent-flyer/status',
            name: 'Status'
          },
          {
            value: '/cms/elevate-frequent-flyer/partners',
            name: 'Partners'
          },
          {
            value: '/elevate-frequent-flyer/buy-gift-points',
            name: 'Buy Points'
          },
          {
            value: '/elevate-frequent-flyer/credit-card',
            name: 'Credit Card'
          },
          {
            value: 'LOGOUT',
            name: 'SIGN OUT'
          }
        ]
      }
    },
    statusMessages: {
      checkIn: {
        upgradeYourSeat: {
          DESC: 'Wanna Upgrade?'
        },
        upgradeYourSeatConnecting: {
          DESC: 'Wanna Upgrade? | {{departure}} - {{arrival}}'
        },
        selectLoungeOptions: {
          DESC: 'Chill in Style.'
        },
        changeYourSeats: {
          DESC: 'Change your seats?'
        },
        numberOfBags: {
          DESC: 'How many bags?'
        },
        payment: {
          DESC: 'Payment'
        },
        pickNewSeat: {
          DESC: 'Pick {{name}}\'s new seat. '
        },
        international: {
          DESC: 'Sorry. We can\'t check you in online. Please check in at the airport.'
        },
        seatSelectionUnavailable: {
          DESC: 'Sorry. Seat selection unavailable.'
        }
      },
      peoplePicker: {
        travelersSelected: {
          DESC: 'Got it. <strong>{{travelers}}.</strong>'
        }
      },
      travelInfo: {
        whoIsSittingAt: {
          DESC: 'Who is sitting at {{seatNumber}}?'
        },
        whereIsPersonSitting: {
          DESC: 'Where is {{name}} sitting?'
        },
        fillInLapInfant: {
          DESC: 'Fill in the lap infant information.'
        }
      },
      login: {
        failed: {
          DESC: '<strong>Oops</strong>. Bad username or password. Please try again.'
        },
        signInChallenge: {
          DESC: 'Enter your info, or sign in.'
        }
      },
      calendar: {
        selectReturnDate: {
          DESC: 'Great, now pick your return date.'
        },
        completeOneWay: {
          DESC: '<strong>{{tripStart}}.</strong> One way trip complete.'
        },
        completeSameDay: {
          DESC: '<strong>{{tripStart}}.</strong> Looks good!'
        },
        completeRoundTrip: {
          DESC: '<strong>{{monthStart}} {{(monthStart === monthEnd) ? ' +
          'tripStartDay + "-" + tripEndDay : tripStartDay + "-" + tripEnd}},' +
          '</strong> looks good.'
          //August 15-18th, looks good.
        },
        seasonalAvailability: {
          TITLE: 'Hey!',
          DESC: 'Flights to {{destinationCity}} start {{startDate}}.'
        },
        noFlyDays: {
          TITLE: 'Hey!',
          DESC: 'Flights to {{destinationCity}} are only on certain days.'
        }
      },
      fare: {
        complete: {
          DESC: 'Looks good. <strong>{{departureTime}} in {{classOfService}}.' +
          '</strong>'
          //morning
          //afternoon
          //evening
          //redeye
        },
        pickReturnDate: {
          DESC: 'Nice. Now pick your returning flight.'
        },
        pickMultiCityLeg2: {
          DESC: 'Nice. Now pick your second flight.'
        },
        notEnoughElevatePoints: {
          DESC: 'Not enough points yet. Consider flying more often!'
        },
        jumped: {
          DESC: '<strong>Uh oh!</strong> Seems like the price jumped a bit.'
        },
        noFlights: {
          DESC: '<strong>Uh oh!</strong> No flights found.'
        },
        invalidDate: {
          DESC: 'Departing and return flights cannot overlap. ' +
            'Please consider adding appropriate time between flights.'
        },
        restrictedDates: {
          TITLE: 'Hey!',
          DESC: 'We don\'t fly from {{dep}} to {{des}} on that date.'
        }
      },
      booker: {
        multiCitySelected: {
          DESC: 'Thumbs up.'
        },
        citiesSelected: {
          DESC: '{{intro}} <strong>{{fromAirportCode}} to {{toAirportCode}}.' +
          '</strong>'
        },
        TIMER_START: {
          TITLE: 'Hey!',
          DESC: 'We can only hold this price for 15 minutes.'
        },
        TIMER_FOUR: {
          TITLE: 'Hey!',
          DESC: 'You have 4 minutes to finish paying.'
        },
        TIMER_TWO: {
          TITLE: 'Heads up!',
          DESC: 'You have {{timeLeft()|date:\'mm:ss\'}} to finish paying.'
        },
        TIMER_END: {
          TITLE: 'Hey!',
          DESC: 'We ran out of time, please re-select your flight.'
        }
      },
      purchase: {
        purchaseDeclined: {
          TITLE: 'Uh oh.',
          DESC: ' The transaction has been declined'
        },
        insuranceTravelBank: {
          TITLE: 'Hey!',
          DESC: 'You can\'t pay for insurance with Travel Bank, ' +
            'please select a credit card.'
        }
      },
      seatSelector: {
        selectRemainingSeats: {
          DESC: 'Select <strong>{{remainingSeats}} {{seatsLabel}}' +
            '</strong> for {{departure}} - ' + '{{arrival}} ' +
            '<span ng-if="showSkipLink">(<a href="#" class="link-skip" ' +
            'ng-click="statusBar.publish' +
            '(\'seatSelector.skipSeatSelection\', [{{segmentIndex}}])">skip</a>)</span>'
        },
        changeSeat: {
          DESC: 'Pick <strong>{{firstName}}\'s</strong> new seat. ' +
            '<a href="#" class="btn btn-secondary btn-normal"' +
            ' ng-click="statusBar.publish(\'seatSelector.keepCurrentSeat\', ' +
            '[\'{{travelerGuid}}\',{{segmentIndex}}])">Keep current</a>'
        },
        upgradeSeat: {
          DESC: 'Pick <strong>{{firstName}}\'s</strong> upgraded seat.'
        },
        pickNewSeat: {
          DESC: 'Pick <strong>{{firstName}}\'s</strong> seat for ' +
            '{{departure}} to {{arrival}} <span ng-if="showSkipLink">' +
            '(<a href="#" class="link-skip" ng-click=" ' +
            'statusBar.publish(\'seatSelector.skipSeatSelection\',' +
            '[{{segmentIndex}}])">skip</a>)'
        }
      },
      travelerInfo: {
        pickSeatForTraveler: {
          DESC: 'Pick <strong>{{traveler}}\'s</strong> seat for ' +
            '{{departure}} - {{arrival}} (<a href="#" class="link-skip" ' +
            'ng-click=" statusBar.publish(\'seatSelector.skipSeatSelection\',' +
            '[{{segmentIndex}}])">skip</a>)'
        },
        namesMustBeUnique: {
          DESC: 'Names must be unique!'
        }
      },
      error: {
        general: {
          DESC: '<strong>Oops</strong>. Something went wrong. Please try again.'
        }
      }
    },

    taxCodes: {
      AY: {
        DESC: 'September 11th Security Fee'
      },
      US1: {
        DESC: 'Intl Arrival/Departure Tax'
      },
      US2: {
        DESC: 'Intl Arrival/Departure Tax'
      },
      US: {
        DESC: 'Intl Arrival/Departure Tax'
      },
      ZP: {
        DESC: 'Segment Fee'
      },
      XF: {
        DESC: 'Passenger Facility Charge'
      },
      XA: {
        DESC: 'US APHIS User Fee'
      },
      XY: {
        DESC: 'Federal Inspection Fee'
      },
      SQ: {
        DESC: 'Airport Improvement Tax'
      },
      CA: {
        DESC: 'Canadian Air Security Charge'
      },
      XG: {
        DESC: 'Goods and Service Tax'
      },
      RC: {
        DESC: 'Ontario Harmonized Tax'
      },
      UK: {
        DESC: 'Mexico Tourism Tax'
      },
      XD: {
        DESC: 'Mexico Airport Tax'
      },
      XO: {
        DESC: 'Mexico IVA Transportation Tax'
      },
      YC: {
        DESC: 'US International Arrival Departure tax'
      },
      YX: {
        DESC: 'Mexico Surcharge'
      },
      MCE: {
        DESC: 'Main Cabin Express'
      },
      INFANT: {
        DESC: 'Infant fees'
      },
      INSURANCE: {
        DESC: 'Travel Insurance'
      },
      PETC: {
        DESC: 'Pets fee'
      },
      UNSUPPORTED: {
        DESC: 'US Customs User Fee'
      }
    },

    // Federal Excise Taxes
    FET: [
      'US',
      'US1',
      'US2'
    ],

    // Modals
    modal: {
      fareInfo: {
        SIZE: 'large',
        TYPE: 'custom',
        TITLE: 'Info',
        TEMPLATE_URL: '/app/trip/templates/modals/fare-info.tpl.html'
      },
      pets: {
        SIZE: 'medium',
        TITLE: 'Traveling with a pet?',
        TYPE: 'default',
        TEMPLATE_URL: '/app/trip/templates/modals/pets.tpl.html'
      },
      specialRequests: {
        SIZE: 'medium',
        TITLE: 'Any special requests?',
        TYPE: 'default',
        TEMPLATE_URL: '/app/trip/templates/modals/spcial-requests.tpl.html'
      },
      flightPerformance: {
        SIZE: 'small',
        TITLE: 'Flight {{flightNum}} On-time performance*',
        TYPE: 'table',
        TEMPLATE_URL: '/app/trip/templates/modals/flight-performance.tpl.html'
      },
      flightPerformanceError: {
        SIZE: 'small',
        TITLE: 'No data available at this time.',
        TEMPLATE: '<p>We\'re sorry, but the performance data for this flight ' +
        'is currently unavailable. Please try again later.</p>'
      },
      seatQuestions: {
        SIZE: 'medium',
        TITLE: 'Information on optional fields',
        TYPE: 'default',
        TEMPLATE_URL: '/app/trip/templates/modals/seat-questions.tpl.html'
      },
      seatChangeAccept: {
        SIZE: 'medium',
        TITLE: 'Your seat selection',
        TYPE: 'default',
        TEMPLATE_URL: '/app/trip/templates/modals/seat-selection.tpl.html'
      },
      refundableFaresNotice: {
        SIZE: 'medium',
        TITLE: 'Refundable Fares Notice',
        TYPE: 'default',
        TEMPLATE_URL: '/app/trip/templates/modals/refundable-fares-notice.tpl.html'
      },
      privacyPolicy: {
        SIZE: 'medium',
        TITLE: 'Privacy Policy',
        TYPE: 'default',
        TEMPLATE_URL: '/app/common/templates/modals/privacy-policy.tpl.html'
      },
      primaryTraveler: {
        SIZE: 'small',
        TITLE: 'Canceling and Changing Flights',
        TYPE: 'default',
        TEMPLATE_URL: '/app/trip/templates/modals/primary-traveler.tpl.html'
      },
      cabinAvailability: {
        SIZE: 'medium',
        TITLE: 'Seat selection unavailable, but you can still book this flight.',
        TYPE: 'default',
        TEMPLATE_URL: '/app/trip/templates/modals/cabin-availability.tpl.html'
      },
      cvv: {
        SIZE: 'medium',
        TITLE: 'Where is my CVV?',
        TYPE: 'default',
        TEMPLATE_URL: '/app/purchase/templates/modals/cvv.tpl.html'
      },
      fareRules: {
        SIZE: 'medium',
        TITLE: 'Fare Restrictions',
        TYPE: 'default',
        TEMPLATE_URL: '/app/common/templates/modals/fare-rules.tpl.html'
      },
      dynamicFareRules: {
        SIZE: 'medium',
        TITLE: 'Fare Restrictions',
        TYPE: 'default',
        TEMPLATE_URL: '/app/common/templates/modals/dynamic-fare-rules.tpl.html'
      },
      taxesAndFees: {
        SIZE: 'medium',
        TITLE: 'Taxes and Fees',
        TYPE: 'default',
        TEMPLATE_URL: '/app/common/templates/modals/taxes.tpl.html'
      },
      forgotPassword: {
        SIZE: 'small',
        TITLE: 'Forgot password?',
        TYPE: 'default',
        TEMPLATE_URL: '/app/common/templates/modals/forgot-password.tpl.html'
      },
      fareSignIn: {
        SIZE: 'small',
        TITLE: 'Sign in to Elevate',
        TYPE: 'default',
        TEMPLATE_URL: '/app/trip/templates/modals/sign-in.tpl.html'
      },
      elevateTerms: {
        SIZE: 'medium',
        TITLE: 'Terms and Conditions — Elevate Membership',
        TYPE: 'default',
        TEMPLATE_URL: '/app/elevate/templates/modals/terms.tpl.html'
      },
      elevateOptionalFields: {
        SIZE: 'medium',
        TITLE: 'Information on optional fields',
        TYPE: 'default',
        TEMPLATE_URL: '/app/elevate/templates/modals/optionals.tpl.html'
      },
      elevateTAndCs: {
        SIZE: 'medium',
        TITLE: 'Virgin America Visa Signature® Credit Cards Terms & Conditions',
        TYPE: 'default',
        TEMPLATE_URL: '/app/elevate/templates/modals/terms-conditions.tpl.html'
      }
    },

    genders: [
      {
        name: 'Female',
        value: 'FEMALE'
      },
      {
        name: 'Male',
        value: 'MALE'
      }
    ],

    cabinClassVXToUiMap: {
      MAIN_CABIN: 'main',
      MAIN_CABIN_REFUNDABLE: 'mainRefundable',
      MCS: 'mcs',
      INSTANT_UPG_TO_MCS: 'mcsUpgrade',
      FIRST: 'first',
      FIRST_CABIN_REFUNDABLE: 'firstRefundable'
    },

    cabinClassToTier: {
      main: 'main',
      mainRefundable: 'main',
      mce: 'mce',
      mcsUpgrade: 'mcs',
      mcs: 'mcs',
      first: 'first',
      firstRefundable: 'first'
    },

    flightInformation: {
      tier: {
        name: {
          FIRST: 'FIRST CLASS',
          MCS: 'MAIN CABIN SELECT',
          MCE: 'MAIN CABIN',
          MC: 'MAIN CABIN'
        },
        emergencyExit: 'EMERGENCY EXITS'
      },
      leg: {
        name: {
          0: 'DEPARTING SEATS',
          1: 'RETURNING SEATS'
        }
      },

      cabinClass: {
        main: 'MAIN CABIN',
        mcsUpgrade: 'MAIN CABIN',
        mainRefundable: 'MAIN CABIN',
        mcs: 'MAIN CABIN SELECT',
        first: 'FIRST CLASS',
        firstRefundable: 'FIRST CLASS'
      },
      cabinDesc: {
        main: 'Surf the web, watch your favorite shows, and pay $25 for each ' +
        'checked bag. Non-refundable fare. See a full list of fees here.',
        mcsUpgrade: 'Enjoy free food and entertainment, one free checked ' +
        'bag, priority boarding and security, and more. Non-refundable fare.',
        mainRefundable: 'Get the Main Cabin feel with 100% refundable fares. ' +
        'Plus, one free checked bag and access to Express seats. ',
        mcs: 'Enjoy free food and entertainment, one free checked bag, ' +
        'priority boarding and security, and more. Non-refundable fare.',
        first: 'Keep it classy with white leather seats, unlimited free ' +
        'entertainment, food and drinks. Plus, two free checked bags. ' +
        'Non-refundable fare with no change fee.',
        firstRefundable: 'Need some flexibility? Change your plans on a ' +
        'whim with fully refundable fares and two free checked bags.'
      },
      upgradeOption: {
        main: 'Main Cabin Ticket',
        mcsUpgrade: 'Instant Upgrade to Main Cabin Select',
        mainRefundable: 'Refundable Ticket',
        firstRefundable: 'First Class Refundable Ticket',
        first: 'First Class Ticket'
      },
      tripType: {
        ROUND_TRIP: 'Round Trip',
        ONE_WAY: 'One Way',
        MULTI_CITY: 'Multi City'
      }
    },

    states: {
      'AIRPORT_PICKER_STATE': {
        scrollTarget: 'top'
      },
      'PEOPLE_PICKER_STATE': {
        scrollTarget: 'people-picker'
      },
      'DATE_PICKER_STATE': {
        scrollTarget: 'calendar'
      },
      'FARE_SELECTOR_STATE': {
        scrollTarget: 'fares'
      },
      'SEAT_SELECTOR_STATE': {
        scrollTarget: 'seatSelector'
      }
    },

    urlParser: {
      maximumNumberOfPeople: 9
    },

    savedChoicesBar: {
      'YES': 'Yes',
      'NO': 'No',
      'COPY': 'Hi Natasha. Still looking for flights to JFK?'
    },

    calendar: {
      MAX_SELECTABLE_DAYS: 331
    },

    seatMap: {
      'UPGRADE': 'UPGRADE',
      'DOWNGRADE': 'DOWNGRADE'
    },

    elevatePointsMultiplier: {
      RED: 5,
      SILVER: 6.25,
      GOLD: 10
    },

    avatarsDefaultMap: [
      'A1',
      'A2',
      'A3',
      'A4'
    ],

    avatarsSpecialMap: [
      'B1',
      'B2',
      'B3',
      'B4',
      'B5',
      'B6',
      'B7',
      'B8'
    ],

    ffPrograms: [
      {
        value: 'VIRGIN_AMERICA',
        name: 'Virgin America (Elevate)'/*,
        nickname: 'Elevate'*/
      },
      {
        value: 'VIRGIN_ATLANTIC',
        name: 'Virgin Atlantic (Flying Club)'/*,
        nickname: 'Flying Club'*/
      },
      {
        value: 'VIRGIN_AUSTRALIA',
        name: 'Virgin Australia (Velocity)'/*,
        nickname: 'Velocity'*/
      },
      {
        //value: 'EK',
        value: 'EMIRATES',
        name: 'Emirates (Skywards)'/*,
        nickname: 'Skywards'*/
      },
      {
        //value: 'SQ',
        value: 'SINGAPORE_AIRLINES',
        name: 'Singapore Airlines (KrisFlyer)'/*,
        nickname: 'KrisFlyer'*/
      }
    ],

    exclusiveOffers: [
      {
        title: 'Avis',
        offer: 'Earn 3 points per $1 spent and take up to 35% off.',
        img: '/images/offers/logo-avis-2x.png',
        imgLight: '/images/offers/logo-avis-2x.png',
        url: 'http://www.carrental.com/virginamerica'
      },
      {
        title: 'Budget',
        offer: 'Earn 3 points per $1 spent and take up to 30% off.',
        img: '/images/offers/logo-budget-1-2x.png',
        imgLight: '/images/offers/logo-budget-white-1-2x.png',
        url: 'http://www.carrental.com/virginamerica'
      },
      {
        title: 'Hertz',
        offer: 'Earn double Elevate points and take up to 35% off.',
        img: '/images/offers/logo-hertz-2x.png',
        imgLight: '/images/offers/logo-hertz-2x.png',
        url: 'https://offer.hertz.com/offers/index.jsp?targetPage=VX.jsp&id=25807'
      }/*,
      {
        title: 'carbonfund.org',
        offer: 'Want to offset emissions from your flight?',
        img: '',
        url: 'http://carbonfund.org'
      }*/
    ],

    errorMessages: {
      // Generic error message
      '0': 'Whoa there, something went wrong. ' +
        'Please call 1.877.FLY.VIRGIN.',
      // Timeout error message
      'timeout': 'Sorry, this seems to be taking awhile. Please try again.',
      // Generic validation error message
      '>8880000000': 'Whoa there, something went wrong. ' +
        'Please call 1.877.FLY.VIRGIN.',
      // Generic Sabre error message
      '>9110000000': 'Whoa there, something went wrong. ' +
        'Please call 1.877.FLY.VIRGIN.',
      // All other mapped errors


      '100020': 'Whoa there, something went wrong. Please call 1.8' +
        '77.FLY.VIRGIN.',
      '103001': 'Please login to your Elevate account again. Secon' +
        'd time\'s a charm.',
      '103003': 'Please login in to your Elevate account again. Se' +
        'cond time\'s a charm.',
      '103080': 'The Travel Bank password or user ID isn\'t correct' +
        '. Please check and try again.',
      '103085': 'Children and Infants aren\'t allowed to sit in the' +
        ' exit row. Please re-choose.',
      '103087': 'Whoa there, something went wrong. Please call 1.8' +
        '77.FLY.VIRGIN.',
      '103114': 'Oops. This card didn\'t work. Please check your in' +
        'fo and try again.',
      '103115': 'Your Elevate ID doesnt match our records, please ' +
        'check the number.',
      '103116': 'The Frequent Flyer number entered is not valid, p' +
        'lease check the number.',
      '105051': 'Whoa there, something went wrong. Please call 1.8' +
        '77.FLY.VIRGIN.',
      '105052': 'Whoa there, something went wrong. Please call 1.8' +
        '77.FLY.VIRGIN.',
      '105053': 'You need a few more points. Top off your points h' +
        'ere and try again.',
      '105057': 'Whoa there, something went wrong. Please call 1.8' +
        '77.FLY.VIRGIN.',
      '105058': 'Whoa there, something went wrong. Please call 1.8' +
        '77.FLY.VIRGIN.',
      '109007': 'The Frequent Flyer number entered is not valid, p' +
        'lease check the number.',
      '110650': 'Whoa there, something went wrong. Please call 1.8' +
        '77.FLY.VIRGIN.',
      '110671': 'Oops. This card didn\'t work. Please check your in' +
        'fo and try again.',
      '110672': 'Sorry, We Couldn\'t save your credit card informat' +
        'ion.',
      '110673': 'Call 1.877.FLY.VIRGIN to use your Travel Bank or ' +
        'choose another form of payment.',
      '110674': 'Call 1.877.FLY.VIRGIN to use your Travel Bank or ' +
        'choose another form of payment.',
      '110675': 'Oops, the payment failed. Please call the Contact' +
        ' Center 1.877.FLY.VIRGIN.',
      '110676': 'Whoa there, something went wrong. Please call 1.8' +
        '77.FLY.VIRGIN.',
      '110677': 'Sorry, We Couldn\'t save your credit card informat' +
        'ion.',
      '110678': 'Oops. This card didn\'t work. Please check your in' +
        'fo and try again.',
      '110679': 'Oops. This card didn\'t work. Please check your in' +
        'fo and try again.',
      '110800': 'Looks like card number is invalid. Please check a' +
        'gain and re-enter your info.',
      '110801': 'Oops, the payment failed. Please check your credi' +
        't card info, and try again.',
      '110900': 'Whoa there, something went wrong. Please call 1.8' +
        '77.FLY.VIRGIN.',
      '110901': 'We couldn\'t add Travler Insurance to your booking.',
      '113553': 'We weren\'t able to add your Express seat(s), plea' +
        'se call 1.877.FLY.VIRGIN.',
      '113720': 'We couldn\'t add Travler Insurance to your booking.',
      '113752': 'We couldn\'t opt you in for the upgrade. Please ca' +
       'll us for help 1.877.FLY.VIRGIN.',
      '113940': 'Call 1.877.FLY.VIRGIN to use your Travel Bank or ' +
       'choose another form of payment.',
      '113963': 'We\'re missing some credit card info from your pro' +
        'file. Please enter manually.',
      '113968': 'Please login to your Elevate account to purchase ' +
        'this ticket with points.',
      '113971': 'Whoa there, something went wrong. Please call 1.8' +
        '77.FLY.VIRGIN.',
      '113972': 'Oops. This card didn\'t work. Please check your in' +
        'fo and try again.',
      '113973': 'We couldn\'t find your profile address. Please ent' +
        'er your billing address here.',
      '116360': 'Whoa there, something went wrong. Please call 1.8' +
        '77.FLY.VIRGIN.',
      '116380': 'Oops. This card didn\'t work. Please check your in' +
        'fo and try again.',
      '116655': 'Oops, this card number is invalid. Please check a' +
        'gain and re-enter your info.',
      '116656': 'Oops. This expiration date does not jive. Please ' +
        'check your info and try again.',
      '116657': 'Oops. This card didn\'t work. Please check your in' +
        'fo and try again.',
      '116750': 'Whoa there, something went wrong. Please call 1.8' +
        '77.FLY.VIRGIN.',
      '117000': 'Whoa there, something went wrong. Please call 1.8' +
        '77.FLY.VIRGIN.',
      '118017': 'Whoa there, something went wrong. Please call 1.8' +
        '77.FLY.VIRGIN.',
      '118019': 'Whoa there, something went wrong. Please call 1.8' +
        '77.FLY.VIRGIN.',
      '118021': 'Whoa there, something went wrong. Please call 1.8' +
        '77.FLY.VIRGIN.',
      '118022': 'Whoa there, something went wrong. Please call 1.8' +
        '77.FLY.VIRGIN.',
      '118180': 'Whoa there, something went wrong. Please call 1.8' +
        '77.FLY.VIRGIN.',
      '118183': 'Whoa there, something went wrong. Please call 1.8' +
        '77.FLY.VIRGIN.',
      '118210': 'You need a few more points. Top off your points h' +
        'ere and try again.',
      '118211': 'You need a few more points. Top off your points h' +
        'ere and try again.',
      '118220': 'Oops, the payment failed. Please call the Contact' +
        ' Center 1.877.FLY.VIRGIN.',
      '118291': 'Whoa there, something went wrong. Please call 1.8' +
        '77.FLY.VIRGIN.',
      '118292': 'Whoa there, something went wrong. Please call 1.8' +
        '77.FLY.VIRGIN.',
      '118293': 'Hey! All traveler names must be unique. Please co' +
        'nsider adding Sr. or Jr. or III.',
      '118294': 'Whoa there, something went wrong. Please call 1.8' +
        '77.FLY.VIRGIN.',
      '118561': 'Whoa there, something went wrong. Please call 1.8' +
        '77.FLY.VIRGIN.',
      '118592': 'Whoa there, something went wrong. Please call 1.8' +
        '77.FLY.VIRGIN.',
      '118596': 'We couldn\'t add Travler Insurance to your booking.',
      '118795': 'Whoa there, something went wrong. Please call 1.8' +
        '77.FLY.VIRGIN.',
      '120000': 'Whoa there, something went wrong. Please call 1.8' +
        '77.FLY.VIRGIN.',
      '200052': 'Whoa there, something went wrong. Please call 1.8' +
        '77.FLY.VIRGIN.',
      '200053': 'Whoa there, something went wrong. Please call 1.8' +
        '77.FLY.VIRGIN.',
      '200054': 'Whoa there, something went wrong. Please call 1.8' +
        '77.FLY.VIRGIN.',
      '200055': 'Whoa there, something went wrong. Please call 1.8' +
        '77.FLY.VIRGIN.',
      '200056': 'Whoa there, something went wrong. Please call 1.8' +
        '77.FLY.VIRGIN.',
      '200057': 'Whoa there, something went wrong. Please call 1.8' +
        '77.FLY.VIRGIN.',
      '203001': 'Please log in to your Elevate account again. Seco' +
        'nd time\'s a charm.',
      '203003': 'Please log in to your Elevate account again. Seco' +
        'nd time\'s a charm.',
      '203050': 'Whoa there, something went wrong. Please call 1.8' +
        '77.FLY.VIRGIN.',
      '203086': 'Hey there, please login to your Elevate account b' +
        'efore you continue booking.',
      '205053': 'You\'re short a few points. Top off your points he' +
        're to lock in this flight.',
      '218039': 'Oops, looks like someone took your seat...please ' +
        'select another fare.',
      '218040': 'Oops, looks like someone took your seat...please ' +
        'select another fare.',
      '218041': 'Looks like there\'s a conflict. Please check the d' +
        'ate and time of your flights.',
      '218042': 'Whoa there, something went wrong. Please call 1.8' +
        '77.FLY.VIRGIN.',
      '303021': 'Oops. Your booking failed. Please try again or ca' +
        'll 1.877.FLY.VIRGIN.',
      '310550': 'This promo code is invalid. Try checking it and r' +
        'e-entering it again.',
      '310690': 'Bummer. No flights are available for this date. P' +
        'lease try another date.',
      '318521': 'Bummer. No flights are available for this date. P' +
        'lease try another date.',
      '318522': 'Bummer. No flights are available for this date. P' +
        'lease try another date.',
      '318523': 'Bummer. No flights are available for this date. P' +
        'lease try another date.',
      '318524': 'Bummer. No flights are available for this date. P' +
        'lease try another date.',
      '413801': 'Ruff! Pets are not allowed in First Class, Main C' +
        'abin Select or exit rows.',
      '418591': 'Ruff! Pets are not allowed in First Class, Main C' +
        'abin Select or exit rows.',
      '513967': 'Insurance isn\'t available for flights departing w' +
        'ithin 24 hours of purchase.',
      '518594': 'Sorry, Travel Insurance is not available. Please ' +
        'de-select Travel Insurance.',
      '613965': 'Sorry. That promo code didn\'t work. Please check ' +
        'and try again.',
      '813900': 'The Travel Bank password or user ID isn\'t correct' +
        '. Please check and try again.',
      '813901': 'The Travel Bank password or user ID isn\'t correct' +
        '. Please check and try again.',
      '904002': 'Whoa there, something went wrong. Try again or Pl' +
        'ease call 1.877.FLY.VIRGIN.',
      '912071': 'Whoa there, something went wrong. Try again or Pl' +
        'ease call 1.877.FLY.VIRGIN.',
      '916091': 'Skip seats',
      '916092': 'Whoa there, something went wrong. Try again or Pl' +
        'ease call 1.877.FLY.VIRGIN.',
      '916093': 'Whoa there, something went wrong. Try again or Pl' +
        'ease call 1.877.FLY.VIRGIN.',
      '918150': 'Skip seats',
      '918151': 'Whoa there, something went wrong. Try again or Pl' +
        'ease call 1.877.FLY.VIRGIN.',
      '918152': 'Whoa there, something went wrong. Try again or Pl' +
        'ease call 1.877.FLY.VIRGIN.',
      '918153': 'Whoa there, something went wrong. Try again or Pl' +
        'ease call 1.877.FLY.VIRGIN.',
      '918154': 'Whoa there, something went wrong. Try again or Pl' +
        'ease call 1.877.FLY.VIRGIN.',
      '918155': 'Whoa there, something went wrong. Try again or Pl' +
        'ease call 1.877.FLY.VIRGIN.',
      '918156': 'Whoa there, something went wrong. Try again or Pl' +
        'ease call 1.877.FLY.VIRGIN.',
      '918160': 'Whoa there, something went wrong. Try again or Pl' +
        'ease call 1.877.FLY.VIRGIN.',
      '918161': 'Whoa there, something went wrong. Try again or Pl' +
        'ease call 1.877.FLY.VIRGIN.',
      '918162': 'Whoa there, something went wrong. Try again or Pl' +
        'ease call 1.877.FLY.VIRGIN.',
      '918163': 'Whoa there, something went wrong. Try again or Pl' +
        'ease call 1.877.FLY.VIRGIN.',
      '1004002': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '1012071': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '1016091': 'Skip seats',
      '1016092': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '1016093': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '1018150': 'Skip seats',
      '1018151': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '1018152': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '1018153': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '1018154': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '1018155': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '1018156': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '1018160': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '1018161': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '1018162': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '1018163': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '2017003': 'Sorry. Invalid user ID and/or Password. Please c' +
        'heck your info and try again.',
      '2113670': 'That Elevate number didn\'t match our records. Pl' +
        'ease re-enter and try again.',
      '2113671': 'The name doesn\'t match our records. Please check' +
        ' and try again.',
      '2118401': 'The name doesn\'t match our records. Please check' +
        ' and try again.',
      '2209007': 'That frequent flyer number didn\'t work. Please r' +
        'e-enter and try again.',
      '2303001': 'Please log in to your Elevate account again. Se' +
        'cond time\'s a charm.',
      '2303003': 'Please log in to your Elevate account again. Se' +
        'cond time\'s a charm.',
      '2313660': 'This email is invalid. Please double check your ' +
        'entry.',
      '2317051': 'Sorry, we couldn\'t update your profile. Try agai' +
        'n or call 1.877.FLY.VIRGIN.',
      '2317058': 'Sorry, we couldn\'t update your profile. Try agai' +
        'n or call 1.877.FLY.VIRGIN.',
      '2317059': 'Sorry, we couldn\'t update your profile. Try agai' +
        'n or call 1.877.FLY.VIRGIN.',
      '2317060': 'Sorry, we couldn\'t update your profile. Try agai' +
        'n or call 1.877.FLY.VIRGIN.',
      '2317061': 'Sorry, we couldn\'t update your profile. Try agai' +
        'n or call 1.877.FLY.VIRGIN.',
      '2317062': 'Sorry, we couldn\'t update your profile. Try agai' +
        'n or call 1.877.FLY.VIRGIN.',
      '2713660': 'This email is invalid. Please double check your ' +
        'entry.',
      '2713661': 'Oops. The password or the user ID isn\'t correct.' +
        ' Please check and try again.',
      '2713664': 'We’re doing some maintenance on our interweb por' +
      'tal machine. Be back soon.',
      '2713665': 'Please re-enter your email or elevate ID and try' +
        ' again.',
      '2713666': 'It\'s been a while. Please call 1.877.FLY.VIRGIN ' +
        'to reactivate your account.',
      '2813662': 'This email address is already in use. Please use' +
        ' a different email.',
      '2813672': 'Please check that your state and country are val' +
        'id.',
      '2818360': 'Sorry, we had trouble building you an elevate ac' +
        'count. please try again.',
      '2818504': 'This email address is already in use. Please use' +
        ' a different email.',
      '2909006': 'We had trouble getting your account details. Try' +
        ' again or call 1.877.FLY.VIRGIN.',
      '3103001': 'We had trouble getting your account details. Try' +
        ' again or call 1.877.FLY.VIRGIN.',
      '3103003': 'Oops. The password or the user ID isn\'t correct.' +
        ' Please check and try again.',
      '3213667': 'The name doestn\'t match our records. Please chec' +
        'k and try again.',
      '3216243': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '3403001': 'Oops. We had trouble getting your Elevate accoun' +
        't. Please try again.',
      '3403003': 'Oops. We had trouble getting your Elevate accoun' +
        't. Please try again.',
      '3413661': 'Oops. The password or the user ID isn\'t correct.' +
        ' Please check and try again.',
      '3418000': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '3418001': 'Oops. The password or the user ID isn\'t correct.' +
        ' Please check and try again.',
      '3418002': 'Looks like you\'ve used this password before. Ple' +
        'ase pick a new one.',
      '3513669': 'Couldn\'t reset your password. Enter the phone nu' +
        'mber on your Elevate account.',
      '3517002': 'Whoa there, something went wrong. Please call 1.' +
        '877.FLY.VIRGIN.',
      '3518002': 'Sorry, you cant change you password to one you u' +
        'sed previously.',
      '4013050': 'Sorry, We can\'t check you in online. Please che' +
        'ck in at the airport.',
      '4013053': 'Please check in at the ticket counter with your ' +
        'passport info.',
      '4016021': 'Sorry. We can\'t check you in online. Please chec' +
        'k in at the airport.',
      '4016024': 'Sorry. We can\'t check you in online. Please chec' +
        'k in at the airport.',
      '4016033': 'Sorry. We can\'t check you in online. Please chec' +
        'k in at the airport.',
      '4016034': 'Sorry. We can\'t check you in online. Please chec' +
        'k in at the airport.',
      '4016035': 'Sorry, We can\'t check you in online. Please che' +
        'ck in at the airport.',
      '4018271': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '4018273': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '4018592': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '4113820': 'Sorry. The last name doesn\'t match. Please check' +
        ' and try again.',
      '4113920': 'Sorry. The last name doesn\'t match. Please check' +
        ' and try again.',
      '4118104': 'We can\'t find your itinerary. Please call the Co' +
        'ntact Center 1.877.FLY.VIRGIN.',
      '4118273': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '4118592': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '4118598': 'Invalid Confirmation or Ticket Number. Please ch' +
        'eck and try again.',
      '4210704': 'Hey! Looks like you\'ve been upgraded. Check for ' +
        'your seat at the counter.',
      '4210800': 'Oops. This card didn\'t work. Please check your i' +
        'nfo and try again.',
      '4213050': 'Sorry. We can\'t check you in online. Please chec' +
        'k in at the airport.',
      '4213052': 'Sorry, we couldnt add your baggs. Please check i' +
        'n at the airport.',
      '4213053': 'Please check in at the ticket counter with your ' +
        'passport info.',
      '4213534': 'Hey! You can\'t check in more than 10 bags.',
      '4213611': 'Sorry, we couldnt add the lounge pass to your ti' +
        'cket.',
      '4213615': 'Sorry. We can\'t check you in online. Please chec' +
        'k in at the airport.',
      '4213616': 'Hey! The lounge actually isn\'t available.',
      '4213840': 'Your seat selection didn\'t go through. Please s' +
        'ee an agent at the gate.',
      '4213960': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '4213963': 'We\'re missing some credit card info from your pr' +
        'ofile. Please enter manually.',
      '4216021': 'Sorry. We can\'t check you in online. Please chec' +
        'k in at the airport.',
      '4216024': 'Sorry. We can\'t check you in online. Please chec' +
        'k in at the airport.',
      '4216033': 'Sorry. We can\'t check you in online. Please chec' +
        'k in at the airport.',
      '4216034': 'Sorry. We can\'t check you in online. Please chec' +
        'k in at the airport.',
      '4216035': 'Sorry. We can\'t check you in online. Please chec' +
        'k in at the airport.',
      '4216081': 'Your seat selection didn\'t go through. Please tr' +
        'y again or call 1.877.FLY.VIRGIN.',
      '4216082': 'Sorry. We couldn\'t actually change your seat. Pl' +
        'ease call 1.877.FLY.VIRGIN.',
      '4216087': 'Sorry. We couldn\'t actually change your seat. Pl' +
        'ease call 1.877.FLY.VIRGIN.',
      '4216655': 'Oops, this card number is invalid. Please check ' +
        'again and re-enter your info.',
      '4216656': 'Oops. This expiration date does not jive. Please' +
        ' check your info and try again.',
      '4216657': 'Oops. This card didn\'t work. Please check your i' +
        'nfo and try again.',
      '4218110': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '4218271': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '4218273': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '4218592': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '4318271': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '4318273': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '4318592': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '4613820': 'We cant find your Itinerary, please re-enter or ' +
        'call 1.877.FLY.VIRGIN.',
      '4618271': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '4618273': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '4618592': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '6013820': 'This name doesn\'t match the confirmation or tick' +
        'et number. Please try again.',
      '6013920': 'This name doesn\'t match the confirmation or tick' +
        'et number. Please try again.',
      '6018104': 'We can\'t find your itinerary. Please call the Co' +
        'ntact Center 1.877.FLY.VIRGIN.',
      '6018270': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '6018598': 'Invalid Confirmation or Ticket Number. Please ch' +
        'eck and try again.',
      '6110534': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '6110610': 'We cant find your Itinerary, please re-enter or ' +
        'call 1.877.FLY.VIRGIN.',
      '6110710': 'If you\'d like to downgrade cabin classes please ' +
        'cancel and rebook.',
      '6110711': 'Whoa there, something went wrong. Please call 1.' +
        '877.FLY.VIRGIN.',
      '6110712': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '6116130': 'Whoa there, something went wrong. Please call 1.' +
        '877.FLY.VIRGIN.',
      '6118039': 'Ok, that didn\'t stick. Please try booking your f' +
        'light again.',
      '6118040': 'Oops, looks like someone took your seat...please' +
        ' select another fare.',
      '6118041': 'Looks like there\'s a conflict. Please check the ' +
        'date and time of your flights.',
      '6118042': 'Whoa there, something went wrong. Please call 1.' +
        '877.FLY.VIRGIN.',
      '6118104': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '6118190': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '6118598': 'We cant find your Itinerary, please re-enter or ' +
        'call 1.877.FLY.VIRGIN.',
      '6203080': 'We can\'t find that TravelBank. Please check your' +
        ' login and try again.',
      '6210522': 'Sorry. You don\'t have enough funds in your Trave' +
        'l Bank.',
      '6210533': 'Sorry. You don\'t have enough funds in your Trave' +
        'l Bank.',
      '6210534': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '6210590': 'We had a problem refunding you. Let\'s work this ' +
        'out. Call 1.877.FLY.VIRGIN.',
      '6210610': 'We cant find your Itinerary, please re-enter or ' +
        'call 1.877.FLY.VIRGIN.',
      '6210710': 'If you\'d like to downgrade cabin classes please ' +
        'cancel and rebook.',
      '6210711': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '6210712': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '6210807': 'Sorry. We couldn\'t actually change your flight. ' +
        'Please call 1.877.FLY.VIRGIN.',
      '6210808': 'Sorry. Your Flight Alert wasn\'t added. Please tr' +
        'y again.',
      '6213054': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '6213551': 'Sorry. We couldn\'t actually change your seat. Pl' +
        'ease call 1.877.FLY.VIRGIN.',
      '6213552': 'Sorry. We couldn\'t actually change your seat. Pl' +
        'ease call 1.877.FLY.VIRGIN.',
      '6213702': 'We had a problem refunding you. Let\'s work this ' +
        'out. Call 1.877.FLY.VIRGIN.',
      '6213770': 'Sorry. We couldn\'t actually change your seat. Pl' +
        'ease call 1.877.FLY.VIRGIN.',
      '6213963': 'We\'re missing some credit card info from your pr' +
        'ofile. Please enter manually.',
      '6216130': 'Sorry. We couldn\'t actually change your flight. ' +
        'Please call 1.877.FLY.VIRGIN.',
      '6216655': 'Looks like card number is invalid. Please check ' +
        'again and re-enter your info.',
      '6216656': 'Looks like this card has expired. Please check t' +
        'he info and try again.',
      '6216657': 'Oops. This card didn\'t work. Please check your i' +
        'nfo and try again.',
      '6216670': 'Sorry. We couldn\'t refund you. Let\'s work this o' +
        'ut. Call 1.877.FLY.VIRGIN.',
      '6216673': 'We\'re missing some of your credit card info. Ple' +
        'ase check info and try again.',
      '6216675': 'Sorry. Invalid card type. Please try another card.',
      '6218019': 'Sorry. We couldn\'t actually change your flight. ' +
        'Please call 1.877.FLY.VIRGIN.',
      '6218592': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '6218598': 'We cant find your Itinerary, please re-enter or ' +
        'call 1.877.FLY.VIRGIN.',
      '6313820': 'This name doesn\'t match the confirmation or tick' +
        'et number. Please try again.',
      '6313920': 'This name doesn\'t match the confirmation or tick' +
        'et number. Please try again.',
      '6318104': 'We can\'t find your itinerary. Please call the Co' +
        'ntact Center 1.877.FLY.VIRGIN.',
      '6318598': 'Invalid Confirmation or Ticket Number. Please ch' +
        'eck and try again.',
      '6410610': 'We cant find your Itinerary, please re-enter or ' +
        'call 1.877.FLY.VIRGIN.',
      '6410711': 'Whoa there, something went wrong. Please call 1.' +
        '877.FLY.VIRGIN.',
      '6416130': 'Whoa there, something went wrong. Please call 1.' +
        '877.FLY.VIRGIN.',
      '6416131': 'Sorry. We couldn\'t refund you. Let\'s work this o' +
        'ut. Call 1.877.FLY.VIRGIN.',
      '6418104': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '6510520': 'Sorry. We couldn\'t cancel your flight. Please ca' +
        'll 1.877.FLY.VIRGIN.',
      '6510590': 'We had a problem refunding you. Let\'s work this ' +
        'out. Call 1.877.FLY.VIRGIN.',
      '6513702': 'We had a problem refunding you. Let\'s work this ' +
        'out. Call 1.877.FLY.VIRGIN.',
      '6513963': 'We\'re missing some credit card info from your pr' +
        'ofile. Please enter manually.',
      '6516130': 'Sorry. We couldn\'t cancel your flight. Please ca' +
        'll 1.877.FLY.VIRGIN.',
      '6516655': 'Looks like card number is invalid. Please check ' +
        'again and re-enter your info.',
      '6516656': 'Looks like this card has expired. Please check t' +
        'he info and try again.',
      '6516657': 'Oops. This card didn\'t work. Please check your i' +
        'nfo and try again.',
      '6516670': 'Sorry. We couldn\'t refund you. Let\'s work this o' +
        'ut. Call 1.877.FLY.VIRGIN.',
      '6516673': 'We\'re missing some of your credit card info. Ple' +
        'ase check info and try again.',
      '6516675': 'Sorry. Invalid card type. Please try another card.',
      '6516676': 'Sorry. Invalid security code. Please check the i' +
        'nfo and try again.',
      '6518104': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '7112050': 'Your flight was changed, but we couldn\'t assign ' +
        'you a seat. Please call 1.877.FLY.VIRGIN.',
      '7113047': 'We cant find your Itinerary, please re-enter or ' +
        'call 1.877.FLY.VIRGIN.',
      '7113963': 'Sorry, your Elevate user name and password did n' +
        'ot match. Please try again.',
      '7213820': 'This name doesn\'t match the confirmation or tick' +
        'et number. Please try again.',
      '7213920': 'This name doesn\'t match the confirmation or tick' +
        'et number. Please try again.',
      '7218104': 'We can\'t find your itinerary. Please call the Co' +
        'ntact Center 1.877.FLY.VIRGIN.',
      '7218598': 'Invalid confirmation code number. Please double ' +
        'check your entry.',
      '7413680': 'We cant find your Itinerary, please re-enter or ' +
        'call 1.877.FLY.VIRGIN.',
      '8003001': 'Sorry, your Elevate user name and password did n' +
        'ot match. Please try again.',
      '8003003': 'Sorry, your Elevate user name and password did n' +
        'ot match. Please try again.',
      '8013502': 'Oops. It appears you don\'t have a Virgin America' +
        ' credit card.',
      '8213700': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '8213701': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '8309034': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '8309035': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '8309036': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '8309037': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '8309038': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '8309039': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '8309040': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '8313700': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '8313701': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '8313703': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '8313704': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '8409034': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '8409035': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '8409036': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '8409037': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '8409038': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '8409039': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '8409040': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '8413700': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '8413701': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '8413703': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '8413704': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
      '8503001': 'Sorry, your Elevate user name and password did n' +
        'ot match. Please try again.',
      '8513590': 'Whoa there, something went wrong. Try again or P' +
        'lease call 1.877.FLY.VIRGIN.',
    },

    elevateLanding: {
      redeemPoints: [
        {
          title: 'No Blackout Dates or Restrictions',
          desc: 'Fly at any time, like a boss. You\'ll never run into ' +
          'blackout dates or restrictions on Virgin America reward flights.*',
          cta: 'Book With Points',
          url: '/'
        },
        {
          title: 'Redeem With Our Airline Partners',
          desc: 'Take your rewards worldwide and redeem trips with one of ' +
            'our international airline partners.',
          cta: 'Learn More',
          url: '/cms/elevate-frequent-flyer/redeem-points'
        },
        {
          title: 'Redeem With Virgin Limited Edition',
          desc: 'Take your points on an exclusive vacation with Virgin ' +
          'Limited Edition, a luxury portfolio of stunning retreats around ' +
          'the world.',
          cta: 'Learn More',
          url: '/cms/elevate-frequent-flyer/partners/hotel-partners' +
          '/virgin-limited-edition-redeem'
        }
      /*  {
          img: '/images/temp/bridge.png',
          cityPair: {
            dep: 'PDX',
            des: 'SFO'
          },
          points: 1400
        },
        {
          img: '/images/temp/bridge.png',
          cityPair: {
            dep: 'PDX',
            des: 'NYC'
          },
          points: 3400
        },
        {
          img: '/images/temp/bridge.png',
          cityPair: {
            dep: 'PDX',
            des: 'LAX'
          },
          points: 900
        } */
      ],
      earnPoints: [
        {
          img: '/images/icons/icon-card.png',
          desc: 'No purchase is pointless when you earn up to 3x points ' +
          'per $1 spent with the new Virgin America Visa Signature® Card.***',
          cta: 'Learn More',
          url: '/elevate-frequent-flyer/credit-card'
        },
        {
          img: '/images/icons/icon-points.png',
          desc: 'Earn even more points with our airline, hotel, shopping, ' +
          'and rental car partners.',
          cta: 'See All Partners',
          url: '/cms/elevate-frequent-flyer/partners'
        },
        {
          img: '/images/icons/icon-buy.png',
          desc: 'You can buy the points you need for your next reward trip, ' +
          'gift points, or transfer points to your friends and family.',
          cta: 'Learn More',
          url: '/elevate-frequent-flyer/buy-gift-points'
        }
      ],
      elevateBenefits: {
        RED: [
          {
            title: 'Earn Points With Us',
            desc: 'You earn 5 points per dollar on your base fare every time ' +
            'you grab a seat with Virgin America.',
            url: '/cms/elevate-frequent-flyer/earn-points'
          },
          {
            title: 'Points Take You Places',
            desc: 'Turn that weekend vacay into reality with Virgin America ' +
            'reward flights starting as low as 2,500 points.*',
            url: '/cms/elevate-frequent-flyer/redeem-points'
          },
          {
            title: 'Your Points are Yours to Keep',
            desc: 'Your points won\'t expire as long as you have activity ' +
            'on your account at least once every 18 months.**',
            url: '/cms/elevate-frequent-flyer/member-guide'
          }
        ],
        SILVER: [
          {
            title: 'Take the Good Seats',
            desc: 'Get on the short list for complimentary space-available ' +
            'upgrades to Main Cabin Select.',
            url: '/cms/elevate-frequent-flyer/status/how-it-works'
          },
          {
            title: 'Free Checked Bag',
            desc: 'Enjoy a free checked bag with Priority Baggage handling ' +
            'on every Virgin America flight.',
            url: '/cms/elevate-frequent-flyer/status/how-it-works'
          },
          {
            title: 'More of a Good Thing',
            desc: 'You earned reward flights even faster with 25% bonus ' +
            'points every time you fly Virgin America.',
            url: '/cms/elevate-frequent-flyer/status/how-it-works'
          }
        ],
        GOLD: [
          {
            title: 'Take the Good Seats',
            desc: 'Take your pick of First Class seats by purchasing ' +
            'upgrades up to 24 hours before departure.',
            url: '/cms/elevate-frequent-flyer/status/how-it-works'
          },
          {
            title: 'You\'re Our Priority',
            desc: 'Check in from the First Class lane, breeze through ' +
            'security, and be one of the first onboard with Priority Boarding.',
            url: '/cms/elevate-frequent-flyer/status/how-it-works'
          },
          {
            title: 'Double Take',
            desc: 'You\'ll earn reward flights even faster with 100% bonus ' +
            'reward points each time you grab a seat on Virgin America.',
            url: '/cms/elevate-frequent-flyer/status/how-it-works'
          }
        ]
      }
    }

  };

  return ResourceBundle;
});
