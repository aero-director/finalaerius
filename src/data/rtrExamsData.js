// DGCA RTR Part 2 Examination Scenarios & Question Banks
// Modeled directly on official DGCA Part 2 Oral Examination Patterns

export const RTR_EXAMS = [
  {
    id: "sample-exam-1",
    title: "Sample Exam 1 - RTR Part 2",
    badge: "Important",
    isFree: true,
    callsign: "Akasa Air 1532",
    registration: "VT-AXC",
    aircraftType: "Boeing 737-8 MAX",
    route: "VOVZ → VOBL",
    departure: "Visakhapatnam (VOVZ)",
    destination: "Bengaluru (VOBL)",
    flightLevel: "FL 340",
    questionsCount: 12,
    passingScore: 50,
    description: "Standard domestic scheduled flight covering complete departure, enroute radar vectoring, weather avoidance, and precision ILS approach into Kempegowda International Airport.",
    questions: [
      {
        id: "q1",
        stage: "Pre-Departure",
        frequency: "127.850",
        freqName: "VISAKHAPATNAM ATIS",
        situation: "You are parked at Stand 4 at Visakhapatnam (VOVZ) preparing for departure to Bengaluru. ATIS Information Charlie is current with QNH 1012, runway in use 28. Contact Visakhapatnam Delivery for your IFR clearance.",
        atcCall: "Akasa Air 1532, Visakhapatnam Delivery, cleared to Bengaluru via APANO 1A departure, runway 28, climb to FL 080, squawk 4321.",
        options: [
          { text: "Cleared to Bengaluru via APANO 1A departure, runway 28, climb to FL 080, squawk 4321, Akasa Air 1532.", correct: true, feedback: "Perfect! All mandatory clearance items (destination, route, runway, altitude, and transponder code) correctly read back with callsign." },
          { text: "Roger, cleared to Bengaluru via APANO 1A, squawk 4321, Akasa Air 1532.", correct: false, feedback: "Negative. Missing runway in use (28) and assigned initial climb level (FL 080)." },
          { text: "Cleared to Bengaluru, APANO 1A, runway 28, FL 080, Wilco.", correct: false, feedback: "Negative. Never use 'Wilco' without repeating the mandatory readback items and appending your full callsign." }
        ]
      },
      {
        id: "q2",
        stage: "Ground & Pushback",
        frequency: "121.900",
        freqName: "VISAKHAPATNAM GROUND",
        situation: "Cockpit preparation complete, doors armed, ground tug connected. Call Visakhapatnam Ground for pushback and engine start clearance.",
        atcCall: "Akasa Air 1532, Visakhapatnam Ground, pushback and start approved facing East, QNH 1012.",
        options: [
          { text: "Pushback and start approved facing East, QNH 1012, Akasa Air 1532.", correct: true, feedback: "Accurate! Facing direction and QNH sub-scale pressure acknowledged verbatim." },
          { text: "Push and start approved, facing East, Akasa Air 1532.", correct: false, feedback: "Incomplete readback: QNH 1012 was omitted." },
          { text: "Starting engines now facing East, Akasa Air.", correct: false, feedback: "Non-standard phraseology. Must state push and start approved and include full callsign." }
        ]
      },
      {
        id: "q3",
        stage: "Taxi",
        frequency: "121.900",
        freqName: "VISAKHAPATNAM GROUND",
        situation: "Both engines started and stabilized, ground steering pin removed. Request taxi clearance to the active runway.",
        atcCall: "Akasa Air 1532, taxi to holding point runway 28 via Taxiway Alpha, Bravo, hold short of runway 10.",
        options: [
          { text: "Taxi to holding point runway 28 via Alpha, Bravo, hold short of runway 10, Akasa Air 1532.", correct: true, feedback: "Correct. Runway holding instructions and intermediate hold-short clearances are strictly mandatory readbacks." },
          { text: "Taxiing runway 28 via Alpha Bravo, Akasa Air 1532.", correct: false, feedback: "Hazardous omission: Failed to read back 'hold short of runway 10'." },
          { text: "Roger, taxi via Alpha, Bravo to runway 28, Akasa 1532.", correct: false, feedback: "Incorrect. 'Roger' is not a readback and holding instruction was dropped." }
        ]
      },
      {
        id: "q4",
        stage: "Line Up & Wait",
        frequency: "118.100",
        freqName: "VISAKHAPATNAM TOWER",
        situation: "You are holding short of runway 28 at Taxiway Bravo. Ground transfers you to Tower. On contact, Tower issues an alignment instruction.",
        atcCall: "Akasa Air 1532, Visakhapatnam Tower, runway 28, line up and wait, traffic landing on cross runway.",
        options: [
          { text: "Runway 28, line up and wait, Akasa Air 1532.", correct: true, feedback: "Exact standard phraseology. Explicitly states runway and line up and wait instruction." },
          { text: "Lining up runway 28, Akasa Air 1532.", correct: false, feedback: "Non-standard phraseology. Must read back 'line up and wait'." },
          { text: "Cleared for takeoff runway 28, Akasa Air 1532.", correct: false, feedback: "CRITICAL SAFETY VIOLATION! 'Line up and wait' is NOT a takeoff clearance. Severe exam failure." }
        ]
      },
      {
        id: "q5",
        stage: "Takeoff Clearance",
        frequency: "118.100",
        freqName: "VISAKHAPATNAM TOWER",
        situation: "Runway is now clear of all arriving and crossing traffic. Tower controller issues your departure clearance.",
        atcCall: "Akasa Air 1532, surface wind 260 degrees 11 knots, runway 28, cleared for takeoff.",
        options: [
          { text: "Runway 28, cleared for takeoff, Akasa Air 1532.", correct: true, feedback: "Correct. Mandatory read-back elements: Runway designator (28) and 'cleared for takeoff'." },
          { text: "Cleared for takeoff, wind copied, Akasa Air 1532.", correct: false, feedback: "Incomplete. Runway number 28 must always be included in takeoff readbacks." },
          { text: "Rolling runway 28, Akasa Air 1532.", correct: false, feedback: "Non-standard. 'Rolling' or 'Taking off' are prohibited substitutes under ICAO standards." }
        ]
      },
      {
        id: "q6",
        stage: "Initial Climb",
        frequency: "124.700",
        freqName: "VISAKHAPATNAM RADAR",
        situation: "Airborne, passing 2,200 ft climbing to FL 080. Tower transfers you: 'Contact Visakhapatnam Radar on 124.7'. Make your initial departure check-in.",
        atcCall: "Akasa Air 1532, Visakhapatnam Radar, radar contact, climb to FL 180, cancel speed restriction below 10,000 feet.",
        options: [
          { text: "Climb to FL 180, speed restriction cancelled, Akasa Air 1532.", correct: true, feedback: "Accurate! Both cleared flight level and cancellation of 250 kt speed constraint confirmed." },
          { text: "Climb FL 180, Akasa Air 1532.", correct: false, feedback: "Incomplete. Must acknowledge speed restriction cancellation." },
          { text: "Roger FL 180, unrestricted speed, Akasa 1532.", correct: false, feedback: "Non-standard phrasing. Read back 'Climb to FL 180, speed restriction cancelled'." }
        ]
      },
      {
        id: "q7",
        stage: "Enroute Level & Reporting",
        frequency: "132.250",
        freqName: "CHENNAI CONTROL",
        situation: "Cruising at FL 340 along airway W13. Chennai Control instructs a flight level change due to opposite-direction traffic.",
        atcCall: "Akasa Air 1532, Chennai Control, for traffic spacing, climb to FL 360, report reaching.",
        options: [
          { text: "Climb to FL 360, report reaching, Akasa Air 1532.", correct: true, feedback: "Correct. Level change instruction and reporting requirement properly read back." },
          { text: "Climbing FL 360, Akasa Air 1532.", correct: false, feedback: "Omitted 'report reaching' instruction." },
          { text: "Wilco FL 360, Akasa Air 1532.", correct: false, feedback: "Negative. Mandatory readback items cannot be answered with 'Wilco'." }
        ]
      },
      {
        id: "q8",
        stage: "Weather Deviation",
        frequency: "132.250",
        freqName: "CHENNAI CONTROL",
        situation: "Weather radar shows severe Cumulonimbus (CB) thunderstorm cells directly on airway centerline 30 NM ahead. Request 20 NM right deviation.",
        atcCall: "Akasa Air 1532, Chennai Control, deviation up to 20 miles right of track approved, report clear of weather and rejoining.",
        options: [
          { text: "Deviation up to 20 miles right of track approved, will report clear of weather, Akasa Air 1532.", correct: true, feedback: "Perfect. Acknowledged approved deviation distance, direction (right), and reporting requirement." },
          { text: "Turning right 20 miles, Akasa Air 1532.", correct: false, feedback: "Inaccurate phrasing. Must state 'deviation approved' and confirm reporting when clear." },
          { text: "Right deviation approved, Roger, Akasa Air 1532.", correct: false, feedback: "Incomplete. Missing the specific distance and reporting condition." }
        ]
      },
      {
        id: "q9",
        stage: "Descent Clearance",
        frequency: "125.900",
        freqName: "BENGALURU APPROACH",
        situation: "Approaching Top of Descent (TOD) into Bengaluru. Contact Bengaluru Approach on 125.9 with Information Echo.",
        atcCall: "Akasa Air 1532, Bengaluru Approach, cleared via AKUM 1A arrival, descend via STAR to FL 080, QNH 1015, expect ILS runway 09L.",
        options: [
          { text: "Cleared via AKUM 1A arrival, descend via STAR to FL 080, QNH 1015, expect ILS runway 09L, Akasa Air 1532.", correct: true, feedback: "Outstanding! Full read-back of STAR routing, vertical profile, altimeter setting, and expected approach." },
          { text: "Descend to FL 080, QNH 1015, Akasa Air 1532.", correct: false, feedback: "Incomplete. Missing AKUM 1A STAR clearance and expected approach aid." },
          { text: "AKUM 1A arrival, descend FL 080, runway 09L, Akasa Air.", correct: false, feedback: "Omitted altimeter setting QNH 1015, which is mandatory." }
        ]
      },
      {
        id: "q10",
        stage: "Approach Clearance",
        frequency: "125.900",
        freqName: "BENGALURU APPROACH",
        situation: "Passing FL 090 on intercept heading 060 degrees. Radar controller vectors you to intercept the localizer for runway 09L.",
        atcCall: "Akasa Air 1532, turn left heading 070, intercept localizer runway 09L, cleared ILS runway 09L, report established.",
        options: [
          { text: "Turn left heading 070, intercept localizer, cleared ILS runway 09L, report established, Akasa Air 1532.", correct: true, feedback: "Exact standard phraseology for intercept heading and ILS clearance." },
          { text: "Heading 070, cleared ILS runway 09L, Akasa Air 1532.", correct: false, feedback: "Omitted 'intercept localizer' and 'report established'." },
          { text: "Cleared ILS runway 09L, Akasa Air 1532.", correct: false, feedback: "Dangerous omission: Missed the vector heading 070." }
        ]
      },
      {
        id: "q11",
        stage: "Landing Clearance",
        frequency: "118.550",
        freqName: "BENGALURU TOWER",
        situation: "Established on localizer and glidepath 4 NM from touchdown. Tower contacts you with final landing authorization.",
        atcCall: "Akasa Air 1532, Bengaluru Tower, wind 080 degrees 9 knots, runway 09L, cleared to land.",
        options: [
          { text: "Runway 09L, cleared to land, Akasa Air 1532.", correct: true, feedback: "Standard ICAO read-back. Runway 09L and 'cleared to land' confirmed." },
          { text: "Cleared to land, Akasa Air 1532.", correct: false, feedback: "Incomplete. Runway designator (09L) is mandatory on parallel runway airports." },
          { text: "Landing runway 09L, wind copied, Akasa Air.", correct: false, feedback: "Non-standard. Must use 'cleared to land'." }
        ]
      },
      {
        id: "q12",
        stage: "Runway Vacated",
        frequency: "118.550",
        freqName: "BENGALURU TOWER",
        situation: "Touchdown and rollout normal. Aircraft slows to taxi speed and exits via Rapid Exit Taxiway November.",
        atcCall: "Akasa Air 1532, runway vacated via Rapid Exit November, contact Bengaluru Ground 121.75.",
        options: [
          { text: "Runway vacated via November, contact Ground 121.75, Akasa Air 1532.", correct: true, feedback: "Exam pass! Complete flight routine executed with zero phraseology infractions." },
          { text: "Switching to Ground 121.75, Akasa Air 1532.", correct: false, feedback: "Failed to confirm runway vacated status." },
          { text: "Roger Ground 121.75, Akasa Air.", correct: false, feedback: "Non-standard readback." }
        ]
      }
    ]
  },
  {
    id: "sample-exam-2",
    title: "Sample Exam 2",
    badge: "Free",
    isFree: true,
    callsign: "Akasa Air 1789",
    registration: "VT-YPN",
    aircraftType: "Boeing 737-8 MAX",
    route: "VOVZ → VOBL",
    departure: "Visakhapatnam (VOVZ)",
    destination: "Bengaluru (VOBL)",
    flightLevel: "FL 360",
    questionsCount: 12,
    passingScore: 50,
    description: "Challenging weather scenario featuring enroute clear air turbulence, speed constraints, holding pattern over DPN VOR, missed approach, and second visual landing.",
    questions: [
      {
        id: "q1",
        stage: "Pre-Departure Clearance",
        frequency: "127.850",
        freqName: "VISAKHAPATNAM DELIVERY",
        situation: "Requesting IFR clearance to Bengaluru with Information Delta. Flow management requires a slot restriction.",
        atcCall: "Akasa Air 1789, Visakhapatnam Delivery, cleared to Bengaluru via APANO 1A, runway 28, climb FL 090, squawk 5214, slot time 0420.",
        options: [
          { text: "Cleared to Bengaluru via APANO 1A, runway 28, climb FL 090, squawk 5214, slot 0420, Akasa Air 1789.", correct: true, feedback: "Accurate! Full CRAFT clearance including the critical slot time constraint read back." },
          { text: "Cleared to Bengaluru via APANO 1A, runway 28, squawk 5214, Akasa Air 1789.", correct: false, feedback: "Missing climb level FL 090 and slot time 0420." },
          { text: "Roger slot 0420, APANO 1A, Akasa Air 1789.", correct: false, feedback: "Incomplete readback." }
        ]
      },
      {
        id: "q2",
        stage: "Push & Start",
        frequency: "121.900",
        freqName: "VISAKHAPATNAM GROUND",
        situation: "Ready on Stand 2. Request pushback and engine start facing South.",
        atcCall: "Akasa Air 1789, pushback and start approved facing South, QNH 1010, report when ready to taxi.",
        options: [
          { text: "Pushback and start approved facing South, QNH 1010, will report ready to taxi, Akasa Air 1789.", correct: true, feedback: "Correct. Full facing direction and altimeter setting acknowledged." },
          { text: "Push and start approved facing South, Akasa Air 1789.", correct: false, feedback: "Missing altimeter setting QNH 1010." },
          { text: "Starting engines facing South, QNH 1010, Akasa Air.", correct: false, feedback: "Non-standard phrasing." }
        ]
      },
      {
        id: "q3",
        stage: "Enroute Speed Control",
        frequency: "132.250",
        freqName: "CHENNAI CONTROL",
        situation: "Cruising at FL 360. Chennai Control requests Mach number speed control for sequencing behind preceding Airbus A350.",
        atcCall: "Akasa Air 1789, for traffic separation, maintain Mach 0.78 or less.",
        options: [
          { text: "Maintain Mach 0.78 or less, Akasa Air 1789.", correct: true, feedback: "Standard speed readback. Mach decimal and condition (or less) confirmed." },
          { text: "Reducing speed to 0.78, Akasa Air 1789.", correct: false, feedback: "Non-standard phrasing. Must state 'Maintain Mach 0.78 or less'." },
          { text: "Roger, 280 knots, Akasa Air 1789.", correct: false, feedback: "Incorrect. High altitude speed assignments are given in Mach numbers, not indicated airspeed." }
        ]
      },
      {
        id: "q4",
        stage: "Holding Pattern Entry",
        frequency: "125.900",
        freqName: "BENGALURU APPROACH",
        situation: "Bengaluru arrivals are delayed due to runway rubber removal. Approach instructs entering the holding pattern over DPN VOR.",
        atcCall: "Akasa Air 1789, hold at DPN VOR, maintain FL 100, standard right-hand turns, inbound track 090 degrees, expect further clearance at time 0540.",
        options: [
          { text: "Hold at DPN VOR, maintain FL 100, right turns, inbound 090, expect further clearance at 0540, Akasa Air 1789.", correct: true, feedback: "Flawless! All 5 holding parameters (Fix, Level, Turn direction, Inbound track, EFC time) completely read back." },
          { text: "Holding at DPN VOR, FL 100, EFC 0540, Akasa Air 1789.", correct: false, feedback: "Omitted turn direction and inbound track." },
          { text: "Roger holding at DPN, FL 100, Akasa Air 1789.", correct: false, feedback: "Critical exam error: EFC time is mandatory for radio failure planning." }
        ]
      },
      {
        id: "q5",
        stage: "Missed Approach / Go-Around",
        frequency: "118.550",
        freqName: "BENGALURU TOWER",
        situation: "On final approach at 300 ft AGL, a runway inspection vehicle inadvertently crosses the touchdown zone. Tower orders an immediate go-around.",
        atcCall: "Akasa Air 1789, go around immediately, climb straight ahead to 4,000 feet, contact Approach 125.9.",
        options: [
          { text: "Going around, climb straight ahead 4,000 feet, contact Approach 125.9, Akasa Air 1789.", correct: true, feedback: "Immediate positive acknowledgment of go-around and missed approach altitude." },
          { text: "Roger, going around, Akasa Air 1789.", correct: false, feedback: "Failed to read back assigned missed approach altitude (4,000 ft)." },
          { text: "Missed approach, Wilco, Akasa Air 1789.", correct: false, feedback: "Improper phraseology." }
        ]
      },
      {
        id: "q6",
        stage: "Visual Approach Final",
        frequency: "118.550",
        freqName: "BENGALURU TOWER",
        situation: "Re-vectored onto downwind runway 09R. Field is in visual contact. Request visual approach.",
        atcCall: "Akasa Air 1789, runway 09R in sight reported, cleared visual approach runway 09R, number one, wind 090 at 10, cleared to land.",
        options: [
          { text: "Cleared visual approach runway 09R, cleared to land runway 09R, Akasa Air 1789.", correct: true, feedback: "Accurate! Acknowledged both visual approach clearance and landing clearance with runway designator." },
          { text: "Cleared to land 09R, Akasa Air 1789.", correct: false, feedback: "Missed visual approach clearance confirmation." },
          { text: "Field in sight, cleared to land, Akasa Air.", correct: false, feedback: "Omitted runway designator 09R." }
        ]
      }
    ]
  },
  {
    id: "sample-exam-3",
    title: "Sample Exam 3",
    badge: "Emergency & Diversion",
    isFree: false,
    callsign: "Akasa Air 1532",
    registration: "VT-YPN",
    aircraftType: "Boeing 737-8 MAX",
    route: "VOVZ → VOBL (Divert: VOHS)",
    departure: "Visakhapatnam (VOVZ)",
    destination: "Bengaluru (VOBL)",
    flightLevel: "FL 320",
    questionsCount: 12,
    passingScore: 50,
    description: "In-flight hydraulic emergency requiring declaration of urgency (PAN-PAN), checklist execution, diversion coordination to Rajiv Gandhi International (VOHS), and flapless landing handling.",
    questions: [
      {
        id: "q1",
        stage: "Emergency Declaration",
        frequency: "132.250",
        freqName: "HYDERABAD CONTROL",
        situation: "Cruising at FL 320 near Vijayawada. Hydraulic System B low pressure and low quantity warning illuminates. Declare PAN-PAN and request diversion to Hyderabad.",
        atcCall: "PAN-PAN acknowledged, Akasa Air 1532, Hyderabad Control, cleared direct to Hyderabad VOR, descend to FL 140, state POB and endurance.",
        options: [
          { text: "PAN-PAN, cleared direct Hyderabad VOR, descend to FL 140, POB 174, endurance 2 hours 40 minutes, Akasa Air 1532.", correct: true, feedback: "Exemplary emergency phraseology! Acknowledged routing, descent level, and reported POB & fuel endurance." },
          { text: "Cleared direct Hyderabad, descend FL 140, Akasa Air 1532.", correct: false, feedback: "Failed to report Persons On Board (POB) and fuel endurance requested by ATC." },
          { text: "Roger direct Hyderabad, FL 140, Akasa Air 1532.", correct: false, feedback: "Never use 'Roger' during emergency coordination." }
        ]
      },
      {
        id: "q2",
        stage: "Technical Status & Standby Services",
        frequency: "124.950",
        freqName: "HYDERABAD APPROACH",
        situation: "Approaching Hyderabad. Approach queries aircraft status and whether emergency equipment is required on runway.",
        atcCall: "Akasa Air 1532, Hyderabad Approach, advise nature of problem, landing gear status, and if fire services required.",
        options: [
          { text: "Akasa Air 1532, System B hydraulic failure, landing gear manual extension required, flapless landing, request fire services on standby.", correct: true, feedback: "Concise, precise technical briefing ensuring airport emergency services are fully prepared." },
          { text: "We have a hydraulic problem, please prepare emergency vehicles, Akasa Air 1532.", correct: false, feedback: "Too vague. Did not specify flapless condition or gear manual extension." },
          { text: "Aircraft damaged, need help on runway, Akasa Air.", correct: false, feedback: "Non-standard, alarms ATC without providing actionable parameters." }
        ]
      },
      {
        id: "q3",
        stage: "Flapless Approach Speed",
        frequency: "124.950",
        freqName: "HYDERABAD APPROACH",
        situation: "Due to zero flaps, your approach speed (VREF) is 165 knots. Approach asks if you can comply with standard 140 knot speed restriction on final.",
        atcCall: "Akasa Air 1532, can you reduce speed to 140 knots on final approach?",
        options: [
          { text: "Unable to comply due flapless configuration, minimum approach speed 165 knots, Akasa Air 1532.", correct: true, feedback: "Standard ICAO 'UNABLE' phraseology with operational justification clearly stated." },
          { text: "Negative, we are too fast, Akasa Air 1532.", correct: false, feedback: "Ambiguous and non-standard." },
          { text: "Roger 140 knots, Akasa Air 1532.", correct: false, feedback: "CATASTROPHIC ERROR! Accepting 140 knots with zero flaps would stall the aircraft." }
        ]
      }
    ]
  },
  {
    id: "phraseology-questions-1",
    title: "Phraseology Questions Part 1",
    badge: "Viva Review",
    isFree: false,
    callsign: "Akasa Air 1532",
    registration: "VT-AXC",
    aircraftType: "Theoretical Exam",
    route: "DGCA Oral Examination Bank",
    departure: "General Air Law",
    destination: "Part 2 Viva Board",
    flightLevel: "Syllabus Standard",
    questionsCount: 15,
    passingScore: 50,
    description: "Crucial examiner oral questions on readability scale, callsign abbreviation limits, SSR squawk codes, semicircular cruising levels, and message priority ranking.",
    questions: [
      {
        id: "q1",
        stage: "Readability Scale",
        frequency: "121.500",
        freqName: "EXAMINER VIVA",
        situation: "The DGCA examiner asks: 'How would you respond if ATC performs a radio check and you receive their voice clearly with zero static?'",
        atcCall: "Examiner: 'State the exact standard phraseology to report maximum signal clarity.'",
        options: [
          { text: "Read you 5 (or Readability 5).", correct: true, feedback: "Correct. Scale is 1 to 5. 5 means perfectly readable." },
          { text: "Loud and clear.", correct: false, feedback: "Incorrect. 'Loud and clear' is colloquial military slang and prohibited under ICAO Annex 10." },
          { text: "Five by five.", correct: false, feedback: "Incorrect. 'Five by five' is obsolete CB radio slang, strictly penalized in DGCA exams." }
        ]
      },
      {
        id: "q2",
        stage: "Callsign Abbreviation",
        frequency: "121.500",
        freqName: "EXAMINER VIVA",
        situation: "The examiner asks: 'Your callsign is VT-AXC. When are you legally permitted to abbreviate your callsign to V-XC over the radio?'",
        atcCall: "Examiner: 'Explain the rule on callsign abbreviation initiation.'",
        options: [
          { text: "Only after the air traffic controller has used the abbreviated callsign first.", correct: true, feedback: "Golden rule of ICAO Annex 10: Pilot must NEVER abbreviate first." },
          { text: "Whenever the frequency is busy or congested.", correct: false, feedback: "Incorrect. Frequency congestion does not permit pilot-initiated abbreviation." },
          { text: "After completing initial contact on any frequency.", correct: false, feedback: "Incorrect. ATC must initiate abbreviation every time frequency changes." }
        ]
      },
      {
        id: "q3",
        stage: "Squawk Codes",
        frequency: "121.500",
        freqName: "EXAMINER VIVA",
        situation: "Examiner question: 'Which transponder code must be selected immediately during total two-way radio failure under IFR?'",
        atcCall: "Examiner: 'Name the specific 4-digit emergency Mode A/C squawk code for communications failure.'",
        options: [
          { text: "Squawk 7600.", correct: true, feedback: "Correct. 7500 = Hijack, 7600 = Radio Comms Failure, 7700 = Distress/General Emergency." },
          { text: "Squawk 7700.", correct: false, feedback: "Incorrect. 7700 is for general distress/MAYDAY, not dedicated comms loss." },
          { text: "Squawk 7500.", correct: false, feedback: "Dangerous! 7500 indicates unlawful interference / hijack." }
        ]
      }
    ]
  },
  {
    id: "phraseology-questions-2",
    title: "Phraseology Questions Part 2",
    badge: "Viva Review",
    isFree: false,
    callsign: "Akasa Air 1532",
    registration: "VT-AXC",
    aircraftType: "Theoretical Exam",
    route: "DGCA Advanced Viva",
    departure: "Altimetry & Emergency",
    destination: "Part 2 Viva Board",
    flightLevel: "Syllabus Standard",
    questionsCount: 14,
    passingScore: 50,
    description: "Advanced oral viva exam questions on QNH/QFE/QNE altimetry, TCAS RA pilot duties, light gun signals, and fuel reserve definitions.",
    questions: [
      {
        id: "q1",
        stage: "Altimeter Settings",
        frequency: "121.500",
        freqName: "EXAMINER VIVA",
        situation: "Examiner asks: 'What will your altimeter read on the airport tarmac when QFE is set on the subscale?'",
        atcCall: "Examiner: 'State the indicated altitude when QFE is set.'",
        options: [
          { text: "Zero feet (or aerodrome reference datum height).", correct: true, feedback: "Correct. QFE gives height above aerodrome level (reads zero on runway). QNH gives elevation above MSL." },
          { text: "Airport elevation above mean sea level.", correct: false, feedback: "Incorrect. That is QNH, not QFE." },
          { text: "Standard pressure height 1013.25 hPa.", correct: false, feedback: "Incorrect. That is QNE." }
        ]
      },
      {
        id: "q2",
        stage: "TCAS RA Priority",
        frequency: "121.500",
        freqName: "EXAMINER VIVA",
        situation: "Examiner asks: 'While climbing under ATC instruction to FL 280, TCAS sounds: \"CLIMB, CLIMB NOW!\". ATC simultaneously says: \"Descend FL 260 immediately\". What must you do?'",
        atcCall: "Examiner: 'Whose instruction takes precedence: TCAS RA or Air Traffic Control?'",
        options: [
          { text: "Follow TCAS RA immediately, disregard ATC instruction, and inform ATC: '[Callsign], TCAS climb'.", correct: true, feedback: "Absolute rule: TCAS Resolution Advisory overrides ATC commands unconditionally." },
          { text: "Follow ATC because the controller has overall radar picture.", correct: false, feedback: "Incorrect. Obeying ATC over TCAS caused the 2002 Überlingen mid-air collision." },
          { text: "Maintain present level and ask ATC to clarify.", correct: false, feedback: "Incorrect. TCAS RA demands instantaneous compliance within 5 seconds." }
        ]
      }
    ]
  },
  {
    id: "sample-exam-4",
    title: "Sample Exam 4",
    badge: "Coastal & Terrain",
    isFree: false,
    callsign: "Akasa Air 1532",
    registration: "VT-VSL",
    aircraftType: "Boeing 737-8 MAX",
    route: "VABB → VOML",
    departure: "Mumbai (VABB)",
    destination: "Mangalore (VOML)",
    flightLevel: "FL 340",
    questionsCount: 14,
    passingScore: 50,
    description: "Complex metropolitan departure from Mumbai Runway 27 crossing active Runway 14/32, coastal airway transit, and precision approach onto Mangalore's famous table-top runway.",
    questions: [
      {
        id: "q1",
        stage: "Runway Crossing",
        frequency: "121.900",
        freqName: "MUMBAI GROUND",
        situation: "Taxiing via Taxiway November towards Runway 27 at Mumbai. Active runway 14/32 intersects your taxi route.",
        atcCall: "Akasa Air 1532, cross runway 14 at Taxiway November, report vacated, hold short of runway 27.",
        options: [
          { text: "Cross runway 14 at Taxiway November, report vacated, hold short of runway 27, Akasa Air 1532.", correct: true, feedback: "Flawless runway safety readback." },
          { text: "Cross runway 14, taxi to runway 27, Akasa Air 1532.", correct: false, feedback: "Dropped mandatory 'hold short of runway 27' instruction." },
          { text: "Crossing runway 14 now, Akasa Air 1532.", correct: false, feedback: "Incomplete readback." }
        ]
      }
    ]
  },
  {
    id: "sample-exam-5",
    title: "Sample Exam 5",
    badge: "Monsoon Ops",
    isFree: false,
    callsign: "VT-YGH",
    registration: "VT-YGH",
    aircraftType: "Airbus A320neo",
    route: "VANP → VIDP",
    departure: "Nagpur (VANP)",
    destination: "Delhi (VIDP)",
    flightLevel: "FL 370",
    questionsCount: 17,
    passingScore: 50,
    description: "Challenging cross-country flight through severe monsoon thunderstorms over Madhya Pradesh, FIR boundary transfer, and CAT IIIB low-visibility approach into Delhi Indira Gandhi Airport.",
    questions: [
      {
        id: "q1",
        stage: "Low Visibility CAT III",
        frequency: "127.900",
        freqName: "DELHI APPROACH",
        situation: "Delhi is experiencing winter fog with RVR 150 meters. Approach clears you for CAT IIIB ILS approach.",
        atcCall: "VT-YGH, Delhi Approach, runway 28 RVR touchdown 175 meters, mid-point 150 meters, cleared ILS runway 28 CAT IIIB, report established.",
        options: [
          { text: "Cleared ILS runway 28 CAT IIIB, report established, VT-YGH.", correct: true, feedback: "Correct precision approach acknowledgement." },
          { text: "Cleared ILS 28, RVR copied, VT-YGH.", correct: false, feedback: "Failed to confirm CAT IIIB procedure specification." },
          { text: "Roger CAT IIIB, landing runway 28, VT-YGH.", correct: false, feedback: "Non-standard phraseology." }
        ]
      }
    ]
  },
  {
    id: "sample-exam-6",
    title: "Sample Exam 6",
    badge: "Hot & High",
    isFree: false,
    callsign: "VT-VDT",
    registration: "VT-VDT",
    aircraftType: "ATR 72-600",
    route: "VIJP → VANP",
    departure: "Jaipur (VIJP)",
    destination: "Nagpur (VANP)",
    flightLevel: "FL 190",
    questionsCount: 14,
    passingScore: 50,
    description: "Turboprop operations under extreme summer ambient temperatures (46°C), density altitude climb gradients, HF communication checks, and non-precision VOR approach.",
    questions: [
      {
        id: "q1",
        stage: "Climb Gradient Check",
        frequency: "122.700",
        freqName: "JAIPUR TOWER",
        situation: "High ambient temperature reduces single-engine climb gradient. Tower asks if you can meet published SID gradient 5.2%.",
        atcCall: "VT-VDT, confirm able to maintain minimum climb gradient 5.2 percent to 5,000 feet?",
        options: [
          { text: "Affirm, able to maintain 5.2 percent climb gradient, VT-VDT.", correct: true, feedback: "Clear, unambiguous standard confirmation using 'AFFIRM'." },
          { text: "Yes we can, VT-VDT.", correct: false, feedback: "Never say 'Yes' in aviation telephony; use 'AFFIRM'." },
          { text: "Roger gradient copied, VT-VDT.", correct: false, feedback: "Non-standard." }
        ]
      }
    ]
  },
  {
    id: "sample-exam-7",
    title: "Sample Exam 7",
    badge: "Short Runway",
    isFree: false,
    callsign: "VT-VDT",
    registration: "VT-VDT",
    aircraftType: "ATR 72-600",
    route: "VOCL → VOBG",
    departure: "Calicut (VOCL)",
    destination: "Bengaluru HAL (VOBG)",
    flightLevel: "FL 150",
    questionsCount: 11,
    passingScore: 50,
    description: "Departure from table-top Calicut Airport over the Western Ghats, regional mountain waves, visual circling to land onto Bengaluru HAL Airport.",
    questions: [
      {
        id: "q1",
        stage: "Circling Approach",
        frequency: "122.300",
        freqName: "HAL TOWER",
        situation: "Cleared ILS for runway 09, but surface wind favored landing runway 27. Tower issues circling instructions.",
        atcCall: "VT-VDT, cleared ILS runway 09, circle to land runway 27, maintain visual contact with runway, report right base.",
        options: [
          { text: "Cleared ILS runway 09, circle to land runway 27, report right base, VT-VDT.", correct: true, feedback: "Correct circling approach readback." },
          { text: "Circle runway 27, VT-VDT.", correct: false, feedback: "Omitted initial instrument aid clearance." },
          { text: "Landing runway 27, Wilco, VT-VDT.", correct: false, feedback: "Improper terminology." }
        ]
      }
    ]
  },
  {
    id: "sample-exam-8",
    title: "Sample Exam 8",
    badge: "Quick Sector",
    isFree: false,
    callsign: "AIC 2946",
    registration: "VT-VPQ",
    aircraftType: "Airbus A321neo",
    route: "VOBL → VOBZ",
    departure: "Bengaluru (VOBL)",
    destination: "Vijayawada (VOBZ)",
    flightLevel: "FL 270",
    questionsCount: 6,
    passingScore: 50,
    description: "Rapid regional sector covering expedited departure climb, descent planning without intermediate level-off, and straight-in visual approach.",
    questions: [
      {
        id: "q1",
        stage: "Expedite Climb",
        frequency: "124.700",
        freqName: "BENGALURU DEPARTURE",
        situation: "Air traffic congestion overhead. Departure controller instructs you to expedite climb through FL 150.",
        atcCall: "AIC 2946, expedite climb passing FL 150 for crossing traffic.",
        options: [
          { text: "Expediting climb passing FL 150, AIC 2946.", correct: true, feedback: "Proper acknowledgment of expedite instruction." },
          { text: "Roger climbing fast, AIC 2946.", correct: false, feedback: "Non-standard." },
          { text: "Wilco FL 150, AIC 2946.", correct: false, feedback: "Inappropriate use of Wilco." }
        ]
      }
    ]
  }
];
