const fs = require('fs');
const path = require('path');

// Helper to format topic
function createTopic(id, title, whenToUse, pilotTemplate, atcTemplate, notes, reference, example) {
  return {
    id,
    title,
    whenToUse,
    pilotTemplate,
    atcTemplate,
    notes,
    reference,
    example
  };
}

// 1. GENERAL PROCEDURES
const generalProcedures = {
  id: "general-procedures",
  label: "General Procedures",
  icon: "Radio",
  topics: [
    createTopic(
      "initial-contact",
      "Initial Contact",
      "Used when establishing first communication with any ATC unit. The initial call must include the station being called, your full callsign, and your request or message type. Subsequent calls on the same frequency may use abbreviated callsigns once two-way communication is established.",
      "[STATION], [FULL_CALLSIGN], [TYPE_OF_AIRCRAFT], [POSITION], [LEVEL], [REQUEST]",
      "[CALLSIGN], [STATION], pass your message / go ahead",
      [
        "Always use full callsign on initial contact — abbreviation is permitted only after ATC abbreviates first.",
        "Include aircraft type on first contact for sequencing purposes.",
        "If no response within 10 seconds, repeat the call; after two attempts try alternative frequency.",
        "Monitor the frequency before transmitting to avoid blocking ongoing communication.",
        "DGCA exams frequently test whether full or abbreviated callsign should be used on initial contact."
      ],
      "ICAO Annex 10, Vol II, Chapter 5; DGCA CAR Section 7, Series F, Part I",
      [
        { speaker: "pilot", text: "Delhi Control, Air India 101, Boeing 787, position ALRAM, FL 340, estimating Delhi at 1145, request descent." },
        { speaker: "atc", text: "Air India 101, Delhi Control, maintain FL 340, expect descent clearance at time 1130." },
        { speaker: "pilot", text: "Maintain FL 340, expecting descent at 1130, Air India 101." }
      ]
    ),
    createTopic(
      "read-back",
      "Read Back Procedure",
      "Mandatory procedure where the pilot repeats back safety-critical ATC instructions to confirm mutual understanding and prevent runway incursions or altitude busts.",
      "[REPEATED ATC INSTRUCTION EXACTLY], [CALLSIGN]",
      "[CALLSIGN], read-back correct / negative, read-back [CORRECTION]",
      [
        "Mandatory readback items include: runway in use, altimeter settings (QNH/QFE), taxi clearances, hold short instructions, level/altitude instructions, headings, speed instructions, transponder codes.",
        "Always append your callsign to the end of the read-back.",
        "Never use 'Roger' or 'Wilco' as a substitute for a mandatory read-back.",
        "If unsure, ask ATC to 'SAY AGAIN' rather than guessing."
      ],
      "ICAO Doc 4444, Chapter 12; DGCA Advisory Circular AC-04",
      [
        { speaker: "atc", text: "SpiceJet 432, climb FL 280, turn left heading 260." },
        { speaker: "pilot", text: "Climb FL 280, turn left heading 260, SpiceJet 432." },
        { speaker: "atc", text: "SpiceJet 432, readback correct." }
      ]
    ),
    createTopic(
      "correction",
      "Correction Transmission",
      "Used when an error has been made during transmission. The speaker states 'CORRECTION', followed by the last correct item or phrase, and then transmits the correct version.",
      "... [INCORRECT_PART] CORRECTION [CORRECT_PART] ...",
      "[CALLSIGN], acknowledge / confirm [CORRECTED_ITEM]",
      [
        "Use 'CORRECTION' immediately upon realizing a verbal slip.",
        "State the last correct item before repeating the revised instruction.",
        "If an entire sentence is wrong, say 'CORRECTION, I SAY AGAIN' and restart.",
        "Common exam question: Explain how to correct a spoken FL 320 to FL 340."
      ],
      "ICAO Annex 10, Vol II, 5.2.1.5",
      [
        { speaker: "pilot", text: "Mumbai Radar, IndiGo 521, descending to FL 220 — CORRECTION — descending to FL 240, passing FL 290." },
        { speaker: "atc", text: "IndiGo 521, Roger, descend to FL 240, QNH 1012." },
        { speaker: "pilot", text: "Descend to FL 240, QNH 1012, IndiGo 521." }
      ]
    ),
    createTopic(
      "how-do-you-read",
      "Signal Readability & Radio Check",
      "Used to assess the clarity and strength of radio transmission using the standard 1 to 5 readability scale.",
      "[STATION], [CALLSIGN], how do you read?",
      "[CALLSIGN], [STATION], read you [SCALE_1_TO_5] (e.g., readability 5 / 3 with background hum)",
      [
        "1 = Unreadable, 2 = Readable now and then, 3 = Readable with difficulty, 4 = Readable, 5 = Perfectly readable.",
        "Do NOT use arbitrary non-standard terms like 'loud and clear' or 'five by five' in DGCA Part 2 exams.",
        "If readability is 1 or 2, switch to alternate VHF box or standby frequency.",
        "Radio checks should not exceed 10 seconds."
      ],
      "ICAO Annex 10, Vol II, 5.2.1.8",
      [
        { speaker: "pilot", text: "Kolkata Radio, VT-AER, on 125.7, how do you read?" },
        { speaker: "atc", text: "VT-AER, Kolkata Radio, read you 4, slight background noise." },
        { speaker: "pilot", text: "Read you 5, Kolkata, VT-AER." }
      ]
    ),
    createTopic(
      "words-twice",
      "Words Twice Procedure",
      "Used when communication is difficult due to atmospheric interference, weak signal, or high background noise. Each word or phrase is spoken twice.",
      "[STATION], [CALLSIGN], request WORDS TWICE / [PHRASE] [PHRASE]",
      "[CALLSIGN], [STATION], WORDS TWICE, [MESSAGE_SPOKEN_TWICE]",
      [
        "As a request: 'WORDS TWICE' means please send every phrase twice.",
        "As information: 'COMMUNICATION IS DIFFICULT, WORDS TWICE'.",
        "Used extensively on long-range HF channels or degraded VHF.",
        "Frequently tested in DGCA oral Part 2 tests."
      ],
      "ICAO Annex 10, Vol II, 5.2.1.5.3",
      [
        { speaker: "pilot", text: "Chennai Radio, VT-SHR, readability 2, request WORDS TWICE." },
        { speaker: "atc", text: "VT-SHR, VT-SHR, Chennai Radio, Chennai Radio, CLIMB FL 310, CLIMB FL 310." },
        { speaker: "pilot", text: "CLIMB FL 310, CLIMB FL 310, VT-SHR, VT-SHR." }
      ]
    ),
    createTopic(
      "relay",
      "Relay of Messages",
      "Used when an aircraft or ATC unit cannot communicate directly with the intended recipient and requests another aircraft or station to relay transmissions.",
      "[RELAY_STATION], [CALLSIGN], request you relay to [TARGET_STATION] [MESSAGE]",
      "[TARGET_STATION], this is [RELAY_STATION] relaying for [CALLSIGN]: [MESSAGE]",
      [
        "Always specify that you are relaying on behalf of another aircraft.",
        "Include the transmitting aircraft's original callsign and timestamp.",
        "Aircraft on 121.5 MHz guard frequency frequently relay emergency messages."
      ],
      "ICAO Annex 10, Vol II, 5.2.1.7",
      [
        { speaker: "pilot", text: "Air India 456, VT-AER on 121.5, unable contact Ahmedabad, request relay our position report." },
        { speaker: "pilot", text: "Ahmedabad Control, Air India 456 relaying for VT-AER: VT-AER over RAJAT at 0412, FL 180, estimating APANO 0438." },
        { speaker: "atc", text: "Air India 456, Ahmedabad Control, Roger, tell VT-AER to squawk 3341 and contact Ahmedabad 124.75." }
      ]
    ),
    createTopic(
      "test-transmission",
      "Test Transmission (Radio Check)",
      "Conducted prior to departure or after radio maintenance to verify operational integrity of radio equipment without interfering with normal ATC traffic.",
      "[STATION], [CALLSIGN], test transmission on [FREQUENCY] 1, 2, 3, 4, 5, how do you read?",
      "[CALLSIGN], [STATION], read you 5 / test transmission readable",
      [
        "Never perform a test transmission without including your callsign.",
        "Transmission must not exceed 10 seconds; counting 1 through 5 is standard.",
        "Conduct on designated ground or flight service frequency, never on active tower or emergency guard."
      ],
      "ICAO Doc 9432, Chapter 2",
      [
        { speaker: "pilot", text: "Delhi Ground, Akasa 1102, radio check on 121.9, 1, 2, 3, 4, 5." },
        { speaker: "atc", text: "Akasa 1102, Delhi Ground, read you 5." },
        { speaker: "pilot", text: "Read you 5 also, Akasa 1102." }
      ]
    ),
    createTopic(
      "broadcast",
      "Broadcast Transmission (TIBA)",
      "Transmissions made when operating in uncontrolled airspace (Class G) or when ATC ground facilities are temporarily unavailable, informing other traffic in the vicinity.",
      "ALL STATIONS, [CALLSIGN], [TYPE], [POSITION], [LEVEL], [TRACK/INTENTIONS]",
      "No ATC response expected; other aircraft in vicinity reply if conflicting",
      [
        "Used for Traffic Information Broadcasts by Aircraft (TIBA).",
        "Broadcast on designated VHF en-route advisory frequency or 126.9 MHz.",
        "Broadcast 10 minutes prior to entering airspace and at each reporting point."
      ],
      "ICAO Annex 11, Attachment B; DGCA CAR Section 9",
      [
        { speaker: "pilot", text: "ALL STATIONS, VT-AER, Cessna 172, 15 miles south of Aligarh, altitude 3,500 feet, tracking 340 towards Meerut, estimating Meerut at 0925." }
      ]
    ),
    createTopic(
      "position-report",
      "Standard Position Report",
      "Mandatory verbal report given when crossing compulsory reporting points in non-radar environments or when requested by ATC.",
      "[STATION], [CALLSIGN], POSITION [REPORTING_POINT] AT [TIME], [LEVEL], ESTIMATING [NEXT_POINT] AT [TIME], [SUCCEEDING_POINT]",
      "[CALLSIGN], [STATION], Roger, report over [NEXT_POINT]",
      [
        "Standard order: Identification, Position, Time, Flight Level, Next Position and ETA, Succeeding reporting point.",
        "In radar environment, ATC may state 'OMIT POSITION REPORTS'.",
        "Times are always expressed in UTC (Universal Time Coordinated)."
      ],
      "ICAO Doc 4444, Section 4.11; DGCA AIP India ENR 1.2",
      [
        { speaker: "pilot", text: "Mumbai Control, Air India 302, position BUTOP at 0725, FL 360, estimating TEBRO at 0755, next BADOT." },
        { speaker: "atc", text: "Air India 302, Mumbai Control, Roger, maintain FL 360, report TEBRO." },
        { speaker: "pilot", text: "Maintain FL 360, report TEBRO, Air India 302." }
      ]
    ),
    createTopic(
      "time-check",
      "Aeronautical Time Check",
      "Used to synchronize onboard clocks with the official ATC master chronometer (UTC) for navigation and reporting accuracy.",
      "[STATION], [CALLSIGN], request time check",
      "[CALLSIGN], [STATION], TIME [HOURS] [MINUTES] [SECONDS] / TIME [MINUTES] AND A HALF",
      [
        "Time is checked to the nearest half-minute or second.",
        "Always recorded in UTC / Zulu time.",
        "Critical in procedural airspace where longitudinal separation is based on exact time estimates."
      ],
      "ICAO Annex 10, Vol II, 5.2.1.4",
      [
        { speaker: "pilot", text: "Kolkata Tower, VT-SHR, request time check." },
        { speaker: "atc", text: "VT-SHR, Kolkata Tower, time is 06 hours 24 minutes and 20 seconds." },
        { speaker: "pilot", text: "0624 and 20 seconds, VT-SHR." }
      ]
    ),
    createTopic(
      "cancel-ifr",
      "Cancelling IFR Flight Plan",
      "Used when an IFR flight wishes to change to VFR in flight, transferring traffic separation responsibility to the pilot.",
      "[STATION], [CALLSIGN], CANCEL IFR, REQUEST VFR TO [DESTINATION]",
      "[CALLSIGN], IFR CANCELLED AT [TIME], SQUAWK [VFR_CODE], CONTACT [INFORMATION_STATION] [FREQUENCY]",
      [
        "ATC cannot solicit IFR cancellation; it must be voluntarily initiated by PIC.",
        "After cancellation, IFR separation is no longer provided.",
        "Squawk changes from assigned IFR squawk to VFR code (typically 2000 in India)."
      ],
      "ICAO Doc 4444, Chapter 6; DGCA CAR Section 7",
      [
        { speaker: "pilot", text: "Jaipur Approach, VT-SHR, cancel IFR, request VFR to Udaipur." },
        { speaker: "atc", text: "VT-SHR, IFR cancelled at 0830, squawk 2000, no further IFR separation provided. QNH 1013, contact Jaipur Information 124.3." },
        { speaker: "pilot", text: "IFR cancelled, squawk 2000, QNH 1013, contact Jaipur Information 124.3, VT-SHR." }
      ]
    ),
    createTopic(
      "transfer-of-communication",
      "Transfer of Communication / Frequency Change",
      "Used when ATC transfers an aircraft to a different frequency or ATC unit. The pilot reads back the new frequency and callsign, then contacts the new station.",
      "CONTACT [STATION] [FREQUENCY], [CALLSIGN] — (read-back of ATC instruction)",
      "[CALLSIGN], CONTACT [STATION] [FREQUENCY]",
      [
        "Frequency must always be read back by the pilot.",
        "If unable to establish contact on new frequency, return to previous frequency immediately.",
        "'MONITOR' means listen on frequency without transmitting; 'CONTACT' means initiate transmission.",
        "ATC instruction 'STANDBY [frequency]' means switch and wait for ATC to call you."
      ],
      "ICAO Annex 10, Vol II, 5.2.1.6; ICAO Doc 4444, Chapter 8",
      [
        { speaker: "atc", text: "VT-AER, contact Mumbai Control on 132.35." },
        { speaker: "pilot", text: "Contact Mumbai Control 132.35, VT-AER." },
        { speaker: "pilot", text: "Mumbai Control, VT-AER, FL 370, maintaining Mach 0.78." },
        { speaker: "atc", text: "VT-AER, Mumbai Control, radar contact, maintain FL 370." }
      ]
    )
  ]
};

// 2. PRE-DEPARTURE & GROUND
const preDeparture = {
  id: "pre-departure",
  label: "Pre-Departure & Ground",
  icon: "ClipboardList",
  topics: [
    createTopic(
      "request-atis",
      "Request / Acknowledge ATIS",
      "Used to obtain or acknowledge receipt of Automatic Terminal Information Service broadcast regarding aerodrome weather and operational status.",
      "[STATION], [CALLSIGN], INFORMATION [ALPHABET_CODE] RECEIVED, QNH [PRESSURE], [REQUEST]",
      "[CALLSIGN], [STATION], INFORMATION [ALPHABET_CODE] CURRENT, QNH [PRESSURE], [CLEARANCE/INSTRUCTION]",
      [
        "ATIS broadcasts are identified sequentially by ICAO phonetic letters (Alpha, Bravo, Charlie...).",
        "Must confirm current ATIS letter and QNH on initial call to Delivery or Ground.",
        "If ATIS is unserviceable, request weather directly from ATC."
      ],
      "ICAO Annex 11, Chapter 4; DGCA CAR Section 9",
      [
        { speaker: "pilot", text: "Delhi Delivery, IndiGo 204, Stand 32, with Information Delta, QNH 1014, request IFR clearance to Mumbai." },
        { speaker: "atc", text: "IndiGo 204, Delhi Delivery, Information Delta current, QNH 1014, standby for clearance." }
      ]
    ),
    createTopic(
      "request-departure-clearance",
      "Request Departure Clearance (IFR)",
      "Requesting the initial route, SID, initial altitude, and squawk code from ATC clearance delivery before engine start.",
      "[STATION_DELIVERY], [CALLSIGN], [STAND_NUMBER], INFORMATION [CODE], REQUEST IFR CLEARANCE TO [DESTINATION]",
      "[CALLSIGN], CLEARED TO [DESTINATION], [SID] DEPARTURE, RUNWAY [RWY], CLIMB TO [ALTITUDE], SQUAWK [CODE]",
      [
        "Use CRAFT format to organize: Clearance limit, Route, Altitude, Frequency, Transponder.",
        "Full read-back of all clearance components is mandatory.",
        "Do not commence pushback until ATC clearance is fully acknowledged."
      ],
      "ICAO Doc 4444, Chapter 6; DGCA CAR Section 7",
      [
        { speaker: "pilot", text: "Mumbai Delivery, Air India 805, Stand 45, Information Charlie, request clearance to Delhi." },
        { speaker: "atc", text: "Air India 805, cleared to Delhi via EXOLU 1A departure, RWY 27, initial climb FL 080, squawk 4321." },
        { speaker: "pilot", text: "Cleared to Delhi via EXOLU 1A departure, RWY 27, initial climb FL 080, squawk 4321, Air India 805." },
        { speaker: "atc", text: "Air India 805, readback correct, contact Ground 121.9 when ready for push and start." }
      ]
    ),
    createTopic(
      "obtain-startup",
      "Obtain Startup & Pushback Clearance",
      "Requesting approval to start engines and push back from the parking bay into the taxiway.",
      "[STATION_GROUND], [CALLSIGN], STAND [NUMBER], REQUEST PUSH AND START, [AIRCRAFT_HEADING/INTENTION]",
      "[CALLSIGN], [STATION_GROUND], PUSH AND START APPROVED, FACING [DIRECTION], QNH [VALUE]",
      [
        "Ensure ground crew is in intercom contact before requesting pushback.",
        "Report any towbar or tug disconnects immediately.",
        "Altimeter QNH should be verified during start approval."
      ],
      "ICAO Doc 4444, Chapter 7",
      [
        { speaker: "pilot", text: "Delhi Ground, SpiceJet 712, Stand 24, request push and start, facing west." },
        { speaker: "atc", text: "SpiceJet 712, Delhi Ground, push and start approved facing west, QNH 1013." },
        { speaker: "pilot", text: "Push and start approved facing west, QNH 1013, SpiceJet 712." }
      ]
    ),
    createTopic(
      "taxi-instructions",
      "Taxi Instructions & Holding Points",
      "Requesting taxi clearance from apron to the active runway holding point, including taxi routes and intermediate stops.",
      "[STATION_GROUND], [CALLSIGN], REQUEST TAXI",
      "[CALLSIGN], TAXI TO HOLDING POINT RUNWAY [RWY] VIA [TAXIWAYS], HOLD SHORT OF [RUNWAY/POINT]",
      [
        "All runway crossing instructions and holding point assignments MUST be read back verbatim.",
        "Never cross a solid red stop bar or enter an active runway without explicit clearance.",
        "If taxiway signage is unclear, halt aircraft and request progressive taxi instructions."
      ],
      "ICAO Doc 9870 (Runway Incursion Prevention); DGCA CAR Section 4",
      [
        { speaker: "pilot", text: "Bengaluru Ground, Akasa 1421, on Apron 2, ready to taxi." },
        { speaker: "atc", text: "Akasa 1421, taxi to holding point RWY 09L via Taxiway Mike, Bravo, hold short of RWY 09R." },
        { speaker: "pilot", text: "Taxi to holding point RWY 09L via Mike, Bravo, hold short of RWY 09R, Akasa 1421." }
      ]
    ),
    createTopic(
      "cross-runway",
      "Cross Runway During Taxi",
      "Clearance to cross an active or inactive runway during surface transit to or from the gate.",
      "[STATION_GROUND/TOWER], [CALLSIGN], HOLDING SHORT RUNWAY [RWY], REQUEST CROSS",
      "[CALLSIGN], CROSS RUNWAY [RWY] AT TAXIWAY [NAME], REPORT VACATED",
      [
        "Mandatory read-back: 'CROSS RUNWAY [number]'.",
        "Aircraft must turn on strobe lights when crossing any runway.",
        "Report immediately when aircraft and tail have completely cleared the runway holding boundary."
      ],
      "ICAO Doc 4444, 7.5.3; DGCA AC on Aerodrome Operations",
      [
        { speaker: "atc", text: "Air India 512, cross runway 28 at Taxiway November, report vacated." },
        { speaker: "pilot", text: "Cross runway 28 at Taxiway November, report vacated, Air India 512." },
        { speaker: "pilot", text: "Air India 512, runway 28 vacated, on taxiway Alpha." },
        { speaker: "atc", text: "Air India 512, Roger, continue taxi to Stand 18 via Alpha." }
      ]
    ),
    createTopic(
      "runway-line-up",
      "Line Up and Wait Clearance",
      "Instruction to taxi onto the departure runway and align with the centerline, holding position until takeoff clearance.",
      "LINE UP AND WAIT RUNWAY [RWY], [CALLSIGN]",
      "[CALLSIGN], RUNWAY [RWY], LINE UP AND WAIT, [TRAFFIC_ADVISORY]",
      [
        "Line up and wait is NOT a takeoff clearance.",
        "Verify final approach path is clear of landing aircraft before entering runway.",
        "If held on runway for more than 90 seconds without takeoff clearance, call tower to confirm status."
      ],
      "ICAO Doc 4444, 12.3.4.2",
      [
        { speaker: "atc", text: "IndiGo 884, runway 27, line up and wait, traffic landing on parallel runway." },
        { speaker: "pilot", text: "Runway 27, line up and wait, IndiGo 884." }
      ]
    ),
    createTopic(
      "takeoff-clearance",
      "Takeoff Clearance",
      "Authorization from Tower controller to apply takeoff thrust and depart the runway.",
      "RUNWAY [RWY], CLEARED FOR TAKEOFF, [CALLSIGN]",
      "[CALLSIGN], WIND [DIRECTION] DEGREES [SPEED] KNOTS, RUNWAY [RWY], CLEARED FOR TAKEOFF",
      [
        "Takeoff clearance must include runway designation and surface wind.",
        "Mandatory read-back includes 'CLEARED FOR TAKEOFF' and the runway identifier.",
        "Never abbreviate takeoff clearance with 'Roger' or 'Taking off'."
      ],
      "ICAO Doc 4444, 12.3.4.3; DGCA CAR Section 7",
      [
        { speaker: "atc", text: "SpiceJet 301, wind 280 degrees 12 knots, runway 28, cleared for takeoff." },
        { speaker: "pilot", text: "Runway 28, cleared for takeoff, SpiceJet 301." }
      ]
    ),
    createTopic(
      "revised-departure",
      "Revised / Amended Departure Clearance",
      "Issued by ATC when traffic flow, slot times, or meteorological factors require modifying the original departure clearance.",
      "[STATION], [CALLSIGN], [READBACK_REVISED_CLEARANCE]",
      "[CALLSIGN], CANCEL PREVIOUS CLEARANCE, CLEARED TO [DESTINATION] VIA [REVISED_SID], SQUAWK [NEW_CODE]",
      [
        "Acknowledge cancellation of previous clearance explicitly.",
        "Reprogram Flight Management System (FMS) and cross-check both pilots.",
        "Ensure new transponder squawk is set and cross-verified."
      ],
      "ICAO Doc 4444, Chapter 6",
      [
        { speaker: "atc", text: "Air India 118, cancel previous clearance. Recleared to Chennai via KARIK 2B departure, initial climb FL 090." },
        { speaker: "pilot", text: "Cancel previous clearance, recleared to Chennai via KARIK 2B departure, initial climb FL 090, Air India 118." }
      ]
    ),
    createTopic(
      "pushback-request",
      "Pushback Disconnect & Hand Signals",
      "Coordination between cockpit and tug crew after completion of pushback and engine stabilization.",
      "TUG DISCONNECTED, STEERING PIN REMOVED, REPORTING CLEAR FOR TAXI",
      "[GROUND CREW]: Towbar disconnected, bypass pin removed, see you on left side with pin and streamer.",
      [
        "Pilot checks left/right side to sight ground handler showing bypass pin with red streamer before taxiing.",
        "Do not turn on taxi light until ground crew is in safe visual zone.",
        "Confirm parking brake set before ground crew disconnects towbar."
      ],
      "IATA Airport Handling Manual (AHM 910)",
      [
        { speaker: "pilot", text: "Cockpit to ground: engines stabilized, brakes set, ready to disconnect." },
        { speaker: "atc", text: "Ground to cockpit: chocks in, towbar disconnecting, bypass pin removed, wait for visual wave on left side." },
        { speaker: "pilot", text: "Holding position, looking for pin on left side." }
      ]
    ),
    createTopic(
      "holding-short-clearance",
      "Holding Short of Runway / Stop Bar",
      "Standard phraseology when reaching designated holding positions before entering active surfaces.",
      "[CALLSIGN], HOLDING SHORT RUNWAY [RWY] AT TAXIWAY [NAME]",
      "[CALLSIGN], [STATION], HOLD POSITION, EXPECT DEPARTURE IN [TIME] MINUTES",
      [
        "Always state current exact location and holding point.",
        "Never cross lit red stop bars under any circumstance.",
        "Essential question in DGCA Part 2 oral examinations."
      ],
      "ICAO Annex 14, Aerodromes; DGCA CAR Section 4",
      [
        { speaker: "pilot", text: "Delhi Tower, Vistara 705, holding short of runway 11 at Taxiway Echo." },
        { speaker: "atc", text: "Vistara 705, Delhi Tower, hold short runway 11, traffic landing Airbus A350." },
        { speaker: "pilot", text: "Holding short runway 11, Vistara 705." }
      ]
    )
  ]
};

// 3. DEPARTURE
const departure = {
  id: "departure",
  label: "Departure",
  icon: "PlaneTakeoff",
  topics: [
    createTopic(
      "initial-climb",
      "Initial Climb & Radar Contact",
      "First call to Departure Radar after becoming airborne, reporting current passing altitude and assigned flight level.",
      "[STATION_DEPARTURE], [CALLSIGN], AIRBORNE RUNWAY [RWY], PASSING [ALTITUDE] CLIMBING TO [ASSIGNED_LEVEL], FOLLOWING [SID]",
      "[CALLSIGN], [STATION_DEPARTURE], RADAR CONTACT, CLIMB TO [LEVEL], [FURTHER_INSTRUCTION]",
      [
        "State both passing altitude and cleared altitude on initial contact.",
        "Verify transponder Mode C altitude matches cockpit altimeter within 200 feet.",
        "Confirm SID name on initial departure call."
      ],
      "ICAO Doc 4444, 12.3.5",
      [
        { speaker: "pilot", text: "Delhi Departure, IndiGo 603, airborne runway 28, passing 1,800 feet climbing to FL 080, following BUTOP 1A departure." },
        { speaker: "atc", text: "IndiGo 603, Delhi Departure, radar contact, climb to FL 140, cancel speed restriction." },
        { speaker: "pilot", text: "Climb to FL 140, speed restriction cancelled, IndiGo 603." }
      ]
    ),
    createTopic(
      "noise-abatement",
      "Noise Abatement Departure Procedures (NADP)",
      "Procedures flown during initial climb to minimize aircraft engine noise over populated residential zones surrounding the aerodrome.",
      "[STATION], [CALLSIGN], REQUEST [NADP1 / NADP2] DEPARTURE PROFILE",
      "[CALLSIGN], [STATION], APPROVED / MAINTAIN HEADING UNTIL PASSING [ALTITUDE]",
      [
        "NADP 1: Noise alleviation close to aerodrome (thrust reduction at 800ft, accelerate at 3000ft).",
        "NADP 2: Noise alleviation distant from aerodrome (thrust reduction and acceleration at 800ft).",
        "Comply strictly with published SID turn and altitude restrictions."
      ],
      "ICAO PANS-OPS Doc 8168, Vol I; DGCA CAR Section 8",
      [
        { speaker: "atc", text: "Air India 310, noise abatement in effect, maintain runway heading until 4,000 feet." },
        { speaker: "pilot", text: "Maintain runway heading until 4,000 feet, Air India 310." }
      ]
    ),
    createTopic(
      "sid-departure",
      "Standard Instrument Departure (SID) Compliance",
      "Flying and conforming to published navigational SID routes, waypoint constraints, and climb gradients.",
      "[CALLSIGN], MAINTAINING [SID_NAME], PASSING [WAYPOINT] AT [ALTITUDE]",
      "[CALLSIGN], CLIMB VIA SID TO [LEVEL] / OPEN CLIMB [LEVEL]",
      [
        "'Climb via SID': Comply with all published altitude and speed constraints.",
        "'Climb unrestricted': Cancel all intermediate level constraints and climb directly.",
        "DGCA examiner favorite: Difference between 'CLIMB VIA SID' and 'CLIMB TO FLxxx'."
      ],
      "ICAO Doc 4444, Chapter 6; DGCA AIP Supplement",
      [
        { speaker: "atc", text: "Akasa 114, climb via SID to FL 180." },
        { speaker: "pilot", text: "Climb via SID to FL 180, Akasa 114." },
        { speaker: "pilot", text: "Akasa 114, passing waypoint REXOD at 9,000 feet." }
      ]
    ),
    createTopic(
      "turn-after-takeoff",
      "Turn Instructions After Takeoff",
      "ATC radar vectoring instructions given shortly after takeoff for sequencing or obstacle clearance.",
      "[CALLSIGN], TURN [LEFT/RIGHT] HEADING [HEADING_DEG]",
      "[CALLSIGN], PASSING [ALTITUDE], TURN [LEFT/RIGHT] HEADING [HEADING_DEG], REPORT ESTABLISHED",
      [
        "Do not initiate turns below 400 feet AGL unless published in departure procedure.",
        "Maintain standard rate one turn (3 degrees per second) or 25 degree bank angle.",
        "Read back direction and degrees of heading precisely."
      ],
      "ICAO Doc 8168, PANS-OPS; DGCA CAR Section 7",
      [
        { speaker: "atc", text: "SpiceJet 891, passing 2,500 feet, turn right heading 040." },
        { speaker: "pilot", text: "Passing 2,500 feet, turn right heading 040, SpiceJet 891." }
      ]
    ),
    createTopic(
      "acceleration-altitude",
      "Acceleration & Flap Retraction",
      "Procedure following reaching engine-out or standard acceleration altitude where flaps are retracted and en-route climb thrust set.",
      "[CALLSIGN], PASSING ACCELERATION ALTITUDE, CLEAN AIRCRAFT",
      "[CALLSIGN], ROGER, RESUME NORMAL SPEED / NO SPEED RESTRICTIONS",
      [
        "Standard acceleration altitude is typically 1,000 ft or 1,500 ft AGL.",
        "Below 10,000 ft, standard maximum speed is 250 KIAS unless waived by ATC.",
        "Pilots must inform ATC if unable to meet published climb gradient (e.g. 5.2%)."
      ],
      "ICAO Annex 6, Operation of Aircraft",
      [
        { speaker: "pilot", text: "Mumbai Departure, Air India 902, passing acceleration altitude, clean aircraft, request cancel 250 knot speed limit." },
        { speaker: "atc", text: "Air India 902, no speed restriction, climb FL 240." },
        { speaker: "pilot", text: "No speed restriction, climb FL 240, Air India 902." }
      ]
    ),
    createTopic(
      "radar-vectors-departure",
      "Radar Vectors on Departure",
      "When ATC terminates standard navigational routing and assumes heading guidance through radar vectors.",
      "[CALLSIGN], LEAVING [SID_NAME], FLY HEADING [HEADING]",
      "[CALLSIGN], FLY HEADING [DEG], RADAR VECTORS FOR [SEQUENCING/SEPARATION/WEATHER]",
      [
        "Terrain clearance remains ATC responsibility when vectoring below minimum sector altitude.",
        "Pilot monitors minimum vectoring altitude (MVA) on charts.",
        "Read back heading and direction."
      ],
      "ICAO Doc 4444, Chapter 8",
      [
        { speaker: "atc", text: "IndiGo 211, fly heading 180, radar vectors for traffic spacing, climb FL 210." },
        { speaker: "pilot", text: "Heading 180, vectors for spacing, climb FL 210, IndiGo 211." }
      ]
    ),
    createTopic(
      "contact-approach-departure",
      "Transfer to En Route Control",
      "Handoff from terminal area departure frequency to the ACC area control center.",
      "CONTACT [ACC_STATION] [FREQUENCY], [CALLSIGN]",
      "[CALLSIGN], CONTACT [ACC_STATION] ON [FREQUENCY]",
      [
        "Ensure all pending departure climb clearances are read back before changing frequency.",
        "Check standby box has the new en route frequency active.",
        "State current level and cleared level on initial check-in with ACC."
      ],
      "ICAO Doc 4444, Chapter 12",
      [
        { speaker: "atc", text: "Vistara 412, contact Delhi Control on 133.65." },
        { speaker: "pilot", text: "Contact Delhi Control on 133.65, Vistara 412." }
      ]
    ),
    createTopic(
      "cancel-sid",
      "Cancel SID & Direct Routing",
      "When ATC clears the departure aircraft directly to an en-route waypoint, bypassing remaining SID waypoints.",
      "DIRECT [WAYPOINT], [CALLSIGN]",
      "[CALLSIGN], CANCEL SID, PROCEED DIRECT [WAYPOINT], CLIMB FL [LEVEL]",
      [
        "Verify terrain clearance between current position and direct waypoint.",
        "SID altitude constraints are superseded unless ATC explicitly repeats them.",
        "Reprogram route in GPS/FMS and cross-check CDI track."
      ],
      "ICAO Doc 4444, Section 8.6; DGCA CAR Section 7",
      [
        { speaker: "atc", text: "Air India 651, cancel SID, proceed direct to EKURI, climb FL 280." },
        { speaker: "pilot", text: "Cancel SID, direct EKURI, climb FL 280, Air India 651." }
      ]
    )
  ]
};

// 4. EN ROUTE
const enRoute = {
  id: "en-route",
  label: "En Route",
  icon: "Route",
  topics: [
    createTopic(
      "level-change",
      "Cruising Level Change Request",
      "Requesting a change in cruising flight level due to meteorological factors, clear air turbulence, or fuel economy.",
      "[STATION], [CALLSIGN], REQUEST CLIMB / DESCENT TO FL [LEVEL] DUE [REASON]",
      "[CALLSIGN], CLIMB / DESCEND TO FL [LEVEL], REPORT REACHING",
      [
        "Levels follow semicircular rule in India: Eastbound (000°-179°) ODD FL, Westbound (180°-359°) EVEN FL.",
        "Standard rate of climb/descent should be maintained (at least 500 ft/min unless ATC informed).",
        "Report 'LEAVING' and 'REACHING' flight levels."
      ],
      "ICAO Annex 2, Appendix 3; DGCA CAR Section 9",
      [
        { speaker: "pilot", text: "Mumbai Control, IndiGo 401, request climb to FL 370 due turbulence at FL 350." },
        { speaker: "atc", text: "IndiGo 401, climb to FL 370, report reaching." },
        { speaker: "pilot", text: "Climb to FL 370, report reaching, IndiGo 401." },
        { speaker: "pilot", text: "Mumbai Control, IndiGo 401, reaching FL 370." }
      ]
    ),
    createTopic(
      "position-reporting",
      "En Route Compulsory Position Report",
      "Periodic progress reports transmitted when crossing designated ATS navigational waypoints.",
      "[STATION], [CALLSIGN], POSITION [WAYPOINT] AT [TIME], FL [LEVEL], ESTIMATING [NEXT_WAYPOINT] AT [TIME], [SUCCEEDING_WAYPOINT]",
      "[CALLSIGN], [STATION], ROGER, NEXT REPORT OVER [NEXT_WAYPOINT]",
      [
        "Mandatory in procedural (non-radar) airspace.",
        "If estimated time over next point changes by more than 2 minutes (or 3 min in certain FIRs), notify ATC immediately.",
        "Always give times in 4-digit UTC format."
      ],
      "ICAO Doc 4444, 4.11; DGCA AIP India ENR 1.2",
      [
        { speaker: "pilot", text: "Kolkata Control, Air India 122, position SAGAR at 0345, FL 330, estimating TEPAL at 0418, next BILIK." },
        { speaker: "atc", text: "Air India 122, Kolkata Control, Roger, maintain FL 330, report TEPAL." }
      ]
    ),
    createTopic(
      "speed-control",
      "En Route Speed Control Instructions",
      "Speed adjustments assigned by ATC to establish or maintain longitudinal radar separation between aircraft on the same track.",
      "[CALLSIGN], MAINTAIN [SPEED_IN_KNOTS / MACH_NUMBER]",
      "[CALLSIGN], MAINTAIN MACH [NUMBER] / REDUCE SPEED TO [KNOTS] KNOTS INDICATED",
      [
        "Above FL 250, speeds are assigned in Mach numbers (e.g. Mach decimal 78).",
        "Speed tolerance is +/- 10 knots or +/- Mach 0.01.",
        "Inform ATC immediately if unable to comply with speed assignment due to aircraft performance."
      ],
      "ICAO Doc 4444, 8.6.9",
      [
        { speaker: "atc", text: "Vistara 802, for traffic separation, maintain Mach 0.76 or greater." },
        { speaker: "pilot", text: "Maintain Mach 0.76 or greater, Vistara 802." }
      ]
    ),
    createTopic(
      "heading-assignment",
      "Radar Vectoring & Heading Clearances",
      "Directions assigned by ATC to divert aircraft temporarily off airways for separation or traffic flow.",
      "[CALLSIGN], TURN [LEFT/RIGHT] [DEGREES] HEADING [HEADING_DEG]",
      "[CALLSIGN], TURN [LEFT/RIGHT] HEADING [DEG], VECTOR FOR [REASON]",
      [
        "When given a heading, track adherence is suspended until cleared 'RESUME OWN NAVIGATION'.",
        "State current heading if asked by ATC: 'HEADING [degrees]'.",
        "Wind drift compensation is NOT applied when flying an ATC assigned heading."
      ],
      "ICAO Doc 4444, Chapter 8",
      [
        { speaker: "atc", text: "SpiceJet 614, turn left 20 degrees heading 070." },
        { speaker: "pilot", text: "Turn left 20 degrees heading 070, SpiceJet 614." }
      ]
    ),
    createTopic(
      "direct-routing",
      "Direct Routing Clearance",
      "Clearance to proceed directly from present position to an en-route waypoint, bypassing intermediate route segments.",
      "PROCEED DIRECT TO [WAYPOINT], [CALLSIGN]",
      "[CALLSIGN], CLEARED DIRECT TO [WAYPOINT], RESUME OWN NAVIGATION",
      [
        "Verify terrain clearance along the direct leg.",
        "Update navigational computer and inform copilot.",
        "Advise ATC of revised estimates for downstream reporting points."
      ],
      "ICAO Doc 4444, Chapter 8",
      [
        { speaker: "atc", text: "Air India 202, cleared direct to APANO, resume own navigation." },
        { speaker: "pilot", text: "Cleared direct to APANO, resume own navigation, Air India 202." }
      ]
    ),
    createTopic(
      "traffic-information",
      "Traffic Advisory & Avoidance",
      "ATC radar advisories warning of proximity to other airborne aircraft, and pilot response upon sighting.",
      "[CALLSIGN], TRAFFIC IN SIGHT / LOOKING OUT / NEGATIVE CONTACT",
      "[CALLSIGN], TRAFFIC [CLOCK_POSITION] [DISTANCE] MILES, [DIRECTION]-BOUND, [TYPE], AT FL [LEVEL]",
      [
        "Clock reference is based on aircraft ground track, not heading.",
        "Response options: 'TRAFFIC IN SIGHT', 'LOOKING OUT', or 'NEGATIVE CONTACT'.",
        "If visual contact lost, advise ATC."
      ],
      "ICAO Doc 4444, Chapter 8; DGCA CAR Section 7",
      [
        { speaker: "atc", text: "Akasa 304, traffic 11 o'clock, 8 miles, eastbound, Boeing 777, FL 360." },
        { speaker: "pilot", text: "Looking out, Akasa 304." },
        { speaker: "pilot", text: "Akasa 304, traffic in sight." }
      ]
    ),
    createTopic(
      "offset-track",
      "Strategic Lateral Offset Procedures (SLOP)",
      "Procedures to fly 1 or 2 nautical miles right of airway centerline to mitigate wake turbulence and reduce risk of head-on collisions.",
      "[CALLSIGN], ADVISING OFFSET [1/2] MILES RIGHT OF TRACK",
      "[CALLSIGN], ROGER, REPORT REJOINING CENTERLINE",
      [
        "Authorized in oceanic and designated continental airspace.",
        "Offsets are always to the RIGHT of centerline, never to the left.",
        "Must return to centerline prior to entering terminal control airspace."
      ],
      "ICAO Doc 4444, Section 16.5; DGCA AIP India ENR 2.2",
      [
        { speaker: "pilot", text: "Mumbai Oceanic, Air India 131, offsetting 2 miles right of track due wake turbulence." },
        { speaker: "atc", text: "Air India 131, Mumbai Oceanic, Roger, report rejoining track." }
      ]
    ),
    createTopic(
      "selcal-check",
      "Selective Calling (SELCAL) Check",
      "Testing the onboard SELCAL radio tone decoder on HF or VHF frequencies to relieve pilots of continuous radio listening watch.",
      "[STATION], [CALLSIGN], REQUEST SELCAL CHECK [4-LETTER_CODE]",
      "[CALLSIGN], [STATION], TRANSMITTING SELCAL [CODE]",
      [
        "SELCAL code consists of four letters from A through S (excluding certain characters).",
        "Letters in each pair are in alphabetical order (e.g. AH-CK).",
        "When chime sounds, press PTT and state 'SELCAL OK'."
      ],
      "ICAO Annex 10, Vol II, Chapter 5",
      [
        { speaker: "pilot", text: "Mumbai Radio on 5601, Air India 191, request SELCAL check code DJ-HM." },
        { speaker: "atc", text: "Air India 191, Mumbai Radio, sending SELCAL DJ-HM." },
        { speaker: "pilot", text: "SELCAL OK, Air India 191." }
      ]
    ),
    createTopic(
      "oceanic-entry",
      "FIR Boundary Crossing / Oceanic Entry",
      "Checking in with adjacent Flight Information Region (FIR) upon crossing territorial or oceanic airspace boundaries.",
      "[NEW_FIR_CONTROL], [CALLSIGN], ESTIMATING BOUNDARY [WAYPOINT] AT [TIME], FL [LEVEL], MACH [NUMBER]",
      "[CALLSIGN], [NEW_FIR_CONTROL], RADAR CONTACT / PROCEDURAL IDENTIFICATION, SQUAWK [CODE]",
      [
        "Contact receiving FIR 10-15 minutes prior to boundary waypoint.",
        "Verify HF primary and secondary frequencies before entering oceanic zones.",
        "Ensure Mach number technique clearance is confirmed."
      ],
      "ICAO Doc 7030 (Regional Supplementary Procedures)",
      [
        { speaker: "pilot", text: "Chennai Control, Emirates 502, entering FIR over NOBAT at 0812, FL 380, Mach 0.82." },
        { speaker: "atc", text: "Emirates 502, Chennai Control, radar contact, maintain FL 380." }
      ]
    ),
    createTopic(
      "frequency-change-enroute",
      "En Route Sector Handover",
      "Transferring communication between radar sectors within the same or adjoining air traffic control centers.",
      "CONTACT [STATION] ON [FREQUENCY], [CALLSIGN]",
      "[CALLSIGN], CONTACT [CONTROL_NAME] ON [FREQUENCY]",
      [
        "Promptly read back the assigned frequency.",
        "State current flight level and assigned constraints on check-in.",
        "Check radio failure backup procedures if silence persists for over 15 minutes."
      ],
      "ICAO Doc 4444, Chapter 12",
      [
        { speaker: "atc", text: "IndiGo 515, contact Nagpur Control on 123.9." },
        { speaker: "pilot", text: "Contact Nagpur Control on 123.9, IndiGo 515." }
      ]
    )
  ]
};

// 5. ARRIVAL & APPROACH
const arrivalApproach = {
  id: "arrival-approach",
  label: "Arrival & Approach",
  icon: "PlaneLanding",
  topics: [
    createTopic(
      "request-descent",
      "Descent Clearance Request & Top of Descent (TOD)",
      "Requesting descent clearance from cruising altitude prior to reaching calculated Top of Descent.",
      "[STATION], [CALLSIGN], READY FOR DESCENT / REQUEST DESCENT TO FL [LEVEL]",
      "[CALLSIGN], WHEN READY, DESCEND TO FL [LEVEL], QNH [VALUE] / CROSS [WAYPOINT] AT FL [LEVEL]",
      [
        "'When ready descend': Pilot determines exact Top of Descent point.",
        "'Descend now': Commences descent immediately at minimum 500 fpm.",
        "Set and cross-check altimeter sub-scale when descending through Transition Level."
      ],
      "ICAO Doc 4444, Chapter 6; DGCA CAR Section 7",
      [
        { speaker: "pilot", text: "Delhi Control, Air India 812, ready for descent." },
        { speaker: "atc", text: "Air India 812, when ready descend to FL 150, cross DPN at or above FL 180." },
        { speaker: "pilot", text: "When ready descend to FL 150, cross DPN at or above FL 180, Air India 812." }
      ]
    ),
    createTopic(
      "star-arrival",
      "Standard Terminal Arrival Route (STAR) Clearance",
      "Clearance to follow published standard arrival routing into the terminal maneuvering area.",
      "CLEARED VIA [STAR_NAME] ARRIVAL, [CALLSIGN]",
      "[CALLSIGN], CLEARED VIA [STAR_NAME] ARRIVAL, RUNWAY [RWY], DESCEND VIA STAR TO [LEVEL]",
      [
        "'Descend via STAR': Comply with all lateral waypoints and vertical altitude/speed restrictions.",
        "Cross-check active STAR in navigational display against published approach plate.",
        "Notify ATC immediately if unable to make any speed or level restriction."
      ],
      "ICAO PANS-OPS Doc 8168; DGCA AIP India",
      [
        { speaker: "atc", text: "Vistara 910, cleared via RINVI 1A arrival, runway 28, descend via STAR to FL 080." },
        { speaker: "pilot", text: "Cleared via RINVI 1A arrival, runway 28, descend via STAR to FL 080, Vistara 910." }
      ]
    ),
    createTopic(
      "expect-approach",
      "Approach Type Expectation",
      "Advisory from ATC on the specific instrument approach type and runway to be anticipated.",
      "[CALLSIGN], EXPECT [ILS / VOR / RNP] APPROACH RUNWAY [RWY]",
      "[CALLSIGN], EXPECT ILS Z APPROACH RUNWAY [RWY], INFORMATION [CODE] CURRENT",
      [
        "Begin approach briefing and set navigational aids (ILS localizer frequency, inbound course).",
        "Verify minimum decision altitude (DA) or minimum descent altitude (MDA).",
        "DGCA exam question: What is the difference between ILS CAT I, CAT II, and CAT IIIA minima?"
      ],
      "ICAO Doc 4444, 12.3.6",
      [
        { speaker: "atc", text: "SpiceJet 410, expect ILS runway 27, QNH 1011, transition at FL 060." },
        { speaker: "pilot", text: "Expect ILS runway 27, QNH 1011, transition at FL 060, SpiceJet 410." }
      ]
    ),
    createTopic(
      "holding-instructions",
      "Holding Pattern Clearance",
      "Instructions to enter a published or non-published holding pattern when arrival delays or sequencing is required.",
      "[CALLSIGN], HOLD AT [WAYPOINT/VOR], INBOUND TRACK [DEG], [LEFT/RIGHT] HAND PATTERN, MAINTAIN FL [LEVEL], EXPECT FURTHER CLEARANCE AT [TIME]",
      "[CALLSIGN], HOLD AT [FIX], FL [LEVEL], INBOUND [DEG], [TURN_DIR] TURNS, EFC [TIME]",
      [
        "Standard holding pattern turns are RIGHT; left turns must be explicitly specified.",
        "Standard leg length: 1 minute below 14,000 ft, 1.5 minutes above 14,000 ft.",
        "EFC (Expect Further Clearance) time is vital: if communications fail, pilot departs hold at EFC."
      ],
      "ICAO Doc 8168, PANS-OPS Vol I; DGCA CAR Section 7",
      [
        { speaker: "atc", text: "IndiGo 284, hold at DPN VOR, maintain FL 100, standard right turns, expect further clearance at time 1420." },
        { speaker: "pilot", text: "Hold at DPN VOR, maintain FL 100, right turns, expect further clearance at 1420, IndiGo 284." }
      ]
    ),
    createTopic(
      "ils-approach",
      "ILS Approach Clearance",
      "Clearance to intercept localizer and glidepath and execute the full Instrument Landing System approach.",
      "CLEARED ILS APPROACH RUNWAY [RWY], [CALLSIGN]",
      "[CALLSIGN], TURN [LEFT/RIGHT] HEADING [DEG], INTERCEPT LOCALIZER, CLEARED ILS RUNWAY [RWY], REPORT ESTABLISHED",
      [
        "Do not descend on glidepath until established on the localizer centerline.",
        "Report 'LOCALIZER ESTABLISHED' or 'ILS ESTABLISHED RUNWAY [number]'.",
        "Set decision altitude (DA) on both barometric altimeters."
      ],
      "ICAO Doc 4444, Chapter 12; DGCA Advisory Circular",
      [
        { speaker: "atc", text: "Air India 314, turn left heading 310, intercept localizer runway 28, cleared ILS runway 28." },
        { speaker: "pilot", text: "Turn left heading 310, intercept localizer, cleared ILS runway 28, Air India 314." },
        { speaker: "pilot", text: "Air India 314, established localizer runway 28." },
        { speaker: "atc", text: "Air India 314, contact Delhi Tower on 118.1." }
      ]
    ),
    createTopic(
      "vor-approach",
      "Non-Precision / VOR Approach Clearance",
      "Clearance to execute a non-precision approach using ground VOR/DME navigation without vertical electronic glideslope guidance.",
      "CLEARED VOR APPROACH RUNWAY [RWY], [CALLSIGN]",
      "[CALLSIGN], CLEARED VOR RUNWAY [RWY] APPROACH, DESCEND TO MDA [ALTITUDE], REPORT COMMENCING PROCEDURE TURN",
      [
        "Non-precision approaches have a Minimum Descent Altitude (MDA), not a Decision Altitude (DA).",
        "Aircraft cannot descend below MDA unless visual references are established.",
        "Use step-down fixes and DME distances accurately."
      ],
      "ICAO Doc 8168, PANS-OPS; DGCA CAR Section 7",
      [
        { speaker: "atc", text: "VT-SHR, cleared VOR runway 09 approach, report outbound." },
        { speaker: "pilot", text: "Cleared VOR runway 09 approach, report outbound, VT-SHR." }
      ]
    ),
    createTopic(
      "visual-approach",
      "Visual Approach Request & Clearance",
      "An approach by an IFR flight when either part or all of an instrument approach is not completed and the approach is executed with visual reference to terrain.",
      "[STATION], [CALLSIGN], RUNWAY / AERODROME IN SIGHT, REQUEST VISUAL APPROACH RUNWAY [RWY]",
      "[CALLSIGN], CLEARED VISUAL APPROACH RUNWAY [RWY], MAINTAIN OWN SEPARATION FROM TERRAIN",
      [
        "Pilot assumes responsibility for terrain avoidance and separation from preceding aircraft in sight.",
        "Ceiling must be at or above initial approach level and visibility at least 5 km.",
        "Can be requested by pilot or offered by ATC."
      ],
      "ICAO Doc 4444, 6.5.3; DGCA CAR Section 9",
      [
        { speaker: "pilot", text: "Mumbai Approach, Akasa 455, aerodrome in sight, request visual approach runway 27." },
        { speaker: "atc", text: "Akasa 455, cleared visual approach runway 27, maintain visual separation, contact Tower 118.1." },
        { speaker: "pilot", text: "Cleared visual approach runway 27, contact Tower 118.1, Akasa 455." }
      ]
    ),
    createTopic(
      "circling-approach",
      "Circling Approach Procedure",
      "An extension of an instrument approach procedure which provides for visual circling of the aerodrome prior to landing on a runway not aligned with the approach aid.",
      "CLEARED [APPROACH_TYPE] CIRCLING TO RUNWAY [RWY], [CALLSIGN]",
      "[CALLSIGN], CLEARED [APPROACH_NAME], CIRCLE TO RUNWAY [RWY], REPORT [LEFT/RIGHT] BASE",
      [
        "Maintain visual reference with runway environment throughout the circle.",
        "Do not descend below circling MDA until aligned with final landing runway.",
        "If visual reference lost during circling, initiate missed approach for the original instrument runway."
      ],
      "ICAO Doc 8168, PANS-OPS Vol I",
      [
        { speaker: "atc", text: "SpiceJet 109, cleared ILS runway 10, circle to land runway 28, wind 270 at 14 knots." },
        { speaker: "pilot", text: "Cleared ILS runway 10, circle to land runway 28, SpiceJet 109." }
      ]
    ),
    createTopic(
      "missed-approach",
      "Missed Approach Execution",
      "Executed when visual references are not acquired at Decision Altitude / MDA, or runway is obstructed.",
      "[CALLSIGN], GOING AROUND / EXECUTING MISSED APPROACH RUNWAY [RWY]",
      "[CALLSIGN], [STATION], ROGER, FOLLOW PUBLISHED MISSED APPROACH / CLIMB TO [ALTITUDE], FLY HEADING [DEG]",
      [
        "Apply full go-around thrust, establish positive rate of climb, retract gear and flaps according to profile.",
        "Comply with published missed approach procedure unless ATC gives immediate radar vectors.",
        "Mandatory DGCA test item: Initial radio call is simply '[CALLSIGN], GOING AROUND'."
      ],
      "ICAO Doc 4444, 12.3.6; DGCA CAR Section 7",
      [
        { speaker: "pilot", text: "Delhi Tower, Air India 408, going around." },
        { speaker: "atc", text: "Air India 408, Delhi Tower, climb to 4,000 feet on runway heading, contact Approach 127.9." },
        { speaker: "pilot", text: "Climb to 4,000 feet on runway heading, contact Approach 127.9, Air India 408." }
      ]
    ),
    createTopic(
      "landing-clearance",
      "Landing Clearance",
      "Final authorization issued by aerodrome control tower to touch down on the active runway.",
      "CLEARED TO LAND RUNWAY [RWY], [CALLSIGN]",
      "[CALLSIGN], RUNWAY [RWY], WIND [DEG] AT [SPEED] KNOTS, CLEARED TO LAND",
      [
        "Mandatory read-back includes 'CLEARED TO LAND' and runway designator.",
        "Verify wind components (crosswind, tailwind limits).",
        "If runway not clear by 200 feet AGL and no clearance received, prepare for go-around."
      ],
      "ICAO Doc 4444, 12.3.7; DGCA CAR Section 4",
      [
        { speaker: "atc", text: "IndiGo 351, runway 28, wind 260 degrees 10 knots, cleared to land." },
        { speaker: "pilot", text: "Runway 28, cleared to land, IndiGo 351." }
      ]
    )
  ]
};

// 6. METEOROLOGICAL
const meteorological = {
  id: "meteorological",
  label: "Meteorological",
  icon: "CloudSun",
  topics: [
    createTopic(
      "atis-decode",
      "ATIS / METAR & SPECI Decoding",
      "Decoding standard terminal aerodrome meteorological reports and weather elements.",
      "[CALLSIGN], REQUEST MET REPORT FOR [AERODROME]",
      "[CALLSIGN], [AERODROME] WEATHER: WIND [DEG/KT], VISIBILITY [METERS], CLOUD [OCTAS/FEET], TEMP/DP [T/DP], QNH [HPA]",
      [
        "CAVOK means: Visibility 10km+, no cloud below 5,000ft or MSA, no CB/TCU, no significant weather.",
        "QNH gives altitude above mean sea level; QFE gives height above aerodrome datum.",
        "Temperature and Dewpoint spread indicates fog/mist risk (close spread = high relative humidity)."
      ],
      "ICAO Annex 3, Meteorological Service for International Air Navigation",
      [
        { speaker: "pilot", text: "Mumbai Radio, VT-AER, request latest METAR for Ahmedabad." },
        { speaker: "atc", text: "VT-AER, Ahmedabad time 0830: wind 240/08kt, visibility 4000m in haze, few 2500ft, temperature 32, dewpoint 24, QNH 1010, NOSIG." },
        { speaker: "pilot", text: "QNH 1010, Ahmedabad weather copied, VT-AER." }
      ]
    ),
    createTopic(
      "sigmet",
      "SIGMET Information Transmission",
      "Significant Meteorological Information broadcast regarding en-route weather phenomena which may affect aircraft safety.",
      "[CALLSIGN], ACKNOWLEDGE SIGMET [NUMBER]",
      "[CALLSIGN], SIGMET [NUMBER] VALID UNTIL [TIME]: SEVERE TURBULENCE FORECAST OVER [FIR/AREA] BETWEEN FL [LEVEL] AND FL [LEVEL]",
      [
        "SIGMETs cover: Severe turbulence, severe icing, severe mountain waves, heavy thunderstorm (TS), volcanic ash, tropical cyclone.",
        "Valid typically for 4 hours (6 hours for volcanic ash and tropical cyclones).",
        "Pilots must plan diversions around SIGMET areas."
      ],
      "ICAO Annex 3, Chapter 7; DGCA CAR Section 9",
      [
        { speaker: "atc", text: "All stations, Kolkata Control, SIGMET Echo 2 valid until 1200: severe thunderstorm observed over Ranchi FIR moving east, tops FL 450." },
        { speaker: "pilot", text: "Air India 701, copied SIGMET Echo 2, request 25 miles right deviation." }
      ]
    ),
    createTopic(
      "windshear-report",
      "Windshear Pilot Report & Warning",
      "Reporting or receiving alerts of sudden wind velocity/direction changes on takeoff or approach paths.",
      "[STATION], [CALLSIGN], REPORT WINDSHEAR ON [FINAL/DEPARTURE] RUNWAY [RWY], [SPEED_LOSS/GAIN] KNOTS AT [ALTITUDE] FEET",
      "[CALLSIGN], [STATION], ROGER, WINDSHEAR WARNING IN EFFECT RUNWAY [RWY]",
      [
        "Windshear: sudden microburst causing sharp change in airspeed and vertical lift.",
        "Immediate full thrust go-around following windshear escape guidance.",
        "Report altitude, loss/gain of airspeed, and location to ATC."
      ],
      "ICAO Doc 9817 (Manual on Low-Level Wind Shear); DGCA CAR Section 8",
      [
        { speaker: "pilot", text: "Delhi Tower, IndiGo 554, experienced severe windshear on final runway 28 at 400 feet, 20 knots airspeed loss, going around." },
        { speaker: "atc", text: "IndiGo 554, Roger, windshear warning broadcast to following traffic, climb straight ahead 4,000 feet." }
      ]
    ),
    createTopic(
      "turbulence-report",
      "Turbulence Pilot Report (PIREP)",
      "Standard pilot reporting of Clear Air Turbulence (CAT) or convective turbulence intensity.",
      "[STATION], [CALLSIGN], PIREP: [LIGHT/MODERATE/SEVERE] TURBULENCE AT FL [LEVEL], BETWEEN [POINTS]",
      "[CALLSIGN], [STATION], ROGER, PIREP COPIED, [CLEARANCE_FOR_LEVEL_CHANGE]",
      [
        "Light: slight erratic changes in attitude/altitude.",
        "Moderate: changes in attitude, aircraft remains in control, airspeed fluctuations.",
        "Severe: large abrupt variations, aircraft temporarily out of control, unsecured objects tossed."
      ],
      "ICAO Annex 3, Appendix 4",
      [
        { speaker: "pilot", text: "Delhi Control, Vistara 818, PIREP: moderate clear air turbulence at FL 360 between SAMAR and DPN, request descend FL 320." },
        { speaker: "atc", text: "Vistara 818, descend to FL 320, report ride conditions." }
      ]
    ),
    createTopic(
      "runway-conditions",
      "Runway Surface Conditions (RCR / SNOWTAM)",
      "Information on contaminated runways (water, standing water, rubber deposit) and braking action.",
      "[CALLSIGN], REQUEST RUNWAY CONDITION REPORT RUNWAY [RWY]",
      "[CALLSIGN], RUNWAY [RWY] [DRY/WET/WATER_PATCHES], BRAKING ACTION [GOOD/MEDIUM/POOR], WATER DEPTH [MM]",
      [
        "Global Reporting Format (GRF) Runway Condition Assessment Matrix (RCAM) uses RWY Condition Code (RWYCC) 0 to 6.",
        "6 = Dry, 5 = Wet, 3 = Standing water >3mm, 1 = Poor, 0 = Less than poor.",
        "Braking action 'POOR' requires immediate pilot assessment of crosswind landing limits."
      ],
      "ICAO Doc 9981 (PANS-Aerodromes); DGCA CAR Section 4",
      [
        { speaker: "pilot", text: "Kochi Tower, Air India Express 412, request braking action runway 27." },
        { speaker: "atc", text: "Air India Express 412, runway 27 wet, standing water 4mm, braking action medium to poor reported by Boeing 737." }
      ]
    ),
    createTopic(
      "visibility-report",
      "Runway Visual Range (RVR) & Low Visibility Ops",
      "Transmission of RVR values at touchdown, mid-point, and stop-end during CAT II and CAT III ILS operations.",
      "[CALLSIGN], REQUEST RVR RUNWAY [RWY]",
      "[CALLSIGN], RUNWAY [RWY] RVR: TOUCHDOWN [VAL] METERS, MID-POINT [VAL] METERS, STOP-END [VAL] METERS",
      [
        "RVR reported when visibility drops below 1,500 meters.",
        "CAT I minima: RVR 550m, DH 200ft. CAT II: RVR 300m, DH 100ft. CAT IIIA: RVR 175m, DH 50ft.",
        "Touchdown RVR is always mandatory before commencing approach past outer marker / 1000 ft."
      ],
      "ICAO Doc 9365 (All-Weather Operations Manual); DGCA CAR Section 8",
      [
        { speaker: "pilot", text: "Delhi Approach, SpiceJet 208, request RVR runway 28." },
        { speaker: "atc", text: "SpiceJet 208, runway 28 RVR: touchdown 350 meters, mid-point 300 meters, stop-end 250 meters, CAT II operations in progress." },
        { speaker: "pilot", text: "Copied CAT II in progress, RVR 350, SpiceJet 208." }
      ]
    ),
    createTopic(
      "weather-deviation",
      "Weather Deviation Around Thunderstorms (CB)",
      "Requesting lateral deviations off assigned airway route to bypass Cumulonimbus (CB) storm cells.",
      "[STATION], [CALLSIGN], REQUEST [DISTANCE] NM [LEFT/RIGHT] DEVIATION OF TRACK DUE WEATHER",
      "[CALLSIGN], DEVIATION [DISTANCE] NM [LEFT/RIGHT] OF TRACK APPROVED, REPORT REJOINING TRACK",
      [
        "State deviation direction and distance in nautical miles.",
        "If unable to contact ATC due to frequency congestion, pilot deviates up to 5 NM right/left maintaining standard offset altitude rules.",
        "Report when clear of weather and rejoining cleared flight path."
      ],
      "ICAO Doc 4444, Chapter 15; DGCA CAR Section 7",
      [
        { speaker: "pilot", text: "Nagpur Control, IndiGo 671, request 20 miles left of track due heavy weather." },
        { speaker: "atc", text: "IndiGo 671, deviation up to 20 miles left of track approved, report clear of weather." },
        { speaker: "pilot", text: "Left deviation approved, will report clear, IndiGo 671." }
      ]
    ),
    createTopic(
      "volcanic-ash",
      "Volcanic Ash Advisory (VAA)",
      "Procedures and phraseology regarding airspace closures and flight avoidance of volcanic ash clouds.",
      "[CALLSIGN], VOLCANIC ASH CLOUD OBSERVED / ADVISORY IN EFFECT",
      "[CALLSIGN], VOLCANIC ASH ADVISORY: CLOUD OBSERVED OVER [LOCATION], EXTENDING FROM SURFACE TO FL [LEVEL], MOVING [DIRECTION]",
      [
        "Volcanic ash causes rapid jet engine flameout, cockpit abrasion, and pitot-static clogging.",
        "Standard procedure: 180-degree turn out of ash cloud, disconnect auto-throttles, start APU, maximum continuous ignition.",
        "Never attempt to penetrate volcanic ash cloud."
      ],
      "ICAO Doc 9691 (Manual on Volcanic Ash); DGCA Advisory Circular",
      [
        { speaker: "atc", text: "All stations, Chennai Control, volcanic ash cloud reported between FL 250 and FL 400 west of airway P574, avoid area." },
        { speaker: "pilot", text: "Singapore 412, copied volcanic ash advisory, request revised routing via airway N571." }
      ]
    )
  ]
};

// 7. EMERGENCY & ABNORMAL (25 TOPICS)
const emergencyAbnormal = {
  id: "emergency-abnormal",
  label: "Emergency & Abnormal",
  icon: "AlertTriangle",
  topics: [
    createTopic(
      "mayday",
      "MAYDAY (Distress Signal)",
      "Grave and imminent danger threatening the aircraft, requiring immediate assistance from all stations.",
      "MAYDAY, MAYDAY, MAYDAY, [STATION], [CALLSIGN], [NATURE_OF_EMERGENCY], [INTENTIONS], [POSITION], [LEVEL], [POB], [ENDURANCE]",
      "[CALLSIGN], [STATION], MAYDAY ACKNOWLEDGED, [RADAR_ASSISTANCE / SQUAWK 7700 / EMERGENCY_SERVICES_STANDING_BY]",
      [
        "Spoken three times at start of transmission.",
        "Format: Station, Callsign, Nature of emergency, Intentions of PIC, Position/Level/Heading, POB (Persons On Board), Endurance (fuel remaining).",
        "Distress traffic has absolute priority over all other communications.",
        "Squawk Mode A/C 7700."
      ],
      "ICAO Annex 10, Vol II, Chapter 5; DGCA CAR Section 7",
      [
        { speaker: "pilot", text: "MAYDAY, MAYDAY, MAYDAY, Delhi Control, Air India 102, engine fire number two, shutting down engine, forced descent, present position 40 miles south of Delhi, passing FL 220 descending to 7,000 feet, heading 360, POB 164, endurance 2 hours 30 minutes." },
        { speaker: "atc", text: "Air India 102, Delhi Control, MAYDAY acknowledged, squawk 7700, cleared descent to 7,000 feet, QNH 1012, radar vectors for ILS runway 28, emergency services notified." },
        { speaker: "pilot", text: "Squawk 7700, descend 7,000 feet, QNH 1012, Air India 102." }
      ]
    ),
    createTopic(
      "pan-pan",
      "PAN-PAN (Urgency Signal)",
      "Condition concerning the safety of an aircraft or person on board, but NOT requiring immediate distress assistance.",
      "PAN-PAN, PAN-PAN, PAN-PAN, [STATION], [CALLSIGN], [NATURE_OF_URGENCY], [INTENTIONS], [POSITION], [LEVEL]",
      "[CALLSIGN], [STATION], PAN-PAN ACKNOWLEDGED, [INSTRUCTIONS/CLEARANCE]",
      [
        "Spoken three times at start of transmission.",
        "Used for: medical emergencies, single generator failure, minor fuel leak, precautionary engine shutdown.",
        "Has priority over all transmissions except MAYDAY.",
        "Can be upgraded to MAYDAY if condition deteriorates."
      ],
      "ICAO Annex 10, Vol II, Chapter 5",
      [
        { speaker: "pilot", text: "PAN-PAN, PAN-PAN, PAN-PAN, Mumbai Control, IndiGo 533, passenger having suspected cardiac arrest, request direct routing to Mumbai, medical assistance upon landing." },
        { speaker: "atc", text: "IndiGo 533, Mumbai Control, PAN-PAN acknowledged, cleared direct Mumbai, descend to FL 140, medical services will meet aircraft at Stand 12." }
      ]
    ),
    createTopic(
      "engine-failure",
      "Engine Failure After Takeoff / In-Flight",
      "Phraseology used following single or dual engine failure during departure or cruising flight.",
      "MAYDAY / PAN-PAN, [STATION], [CALLSIGN], ENGINE FAILURE NUMBER [1/2], [INTENTION]",
      "[CALLSIGN], [STATION], ACKNOWLEDGED, FLY HEADING [DEG], CLIMB/DESCEND [LEVEL], SQUAWK 7700",
      [
        "Aviate, Navigate, Communicate — fly the aircraft first before transmitting.",
        "Declare MAYDAY or PAN-PAN based on single vs multi-engine aircraft type.",
        "State immediate intentions: return to aerodrome, holding to dump fuel, or forced landing."
      ],
      "ICAO Doc 4444; DGCA CAR Section 8",
      [
        { speaker: "pilot", text: "Delhi Tower, SpiceJet 212, PAN-PAN PAN-PAN PAN-PAN, engine number one flameout, stopping climb at 3,000 feet, request radar vectors to return runway 28." },
        { speaker: "atc", text: "SpiceJet 212, Delhi Tower, turn right heading 090, maintain 3,000 feet, runway 28 ready, wind 270 at 10." }
      ]
    ),
    createTopic(
      "hydraulic-failure",
      "Hydraulic System Failure",
      "Loss of hydraulic pressure affecting landing gear extension, flaps, spoilers, or steering.",
      "PAN-PAN PAN-PAN PAN-PAN, [CALLSIGN], HYDRAULIC SYSTEM FAILURE, REQUIRE RUNWAY LENGTH [METERS], NO NOSE-WHEEL STEERING",
      "[CALLSIGN], [STATION], ACKNOWLEDGED, RUNWAY [RWY] AVAILABLE, TOW TUG STANDING BY",
      [
        "Advise ATC if alternate gear extension required.",
        "Advise if flaps inoperative (results in higher approach speed and longer landing roll).",
        "State if aircraft will be unable to vacate runway under own power due to loss of nosewheel steering."
      ],
      "ICAO Doc 9432",
      [
        { speaker: "pilot", text: "Mumbai Approach, Air India 441, PAN-PAN PAN-PAN PAN-PAN, dual hydraulic failure, flapless landing, will require full runway 27 and tow tug on runway." },
        { speaker: "atc", text: "Air India 441, Mumbai Approach, Roger, runway 27 cleared for your arrival, length 3,445 meters, tug and fire services standing by." }
      ]
    ),
    createTopic(
      "lost-communications",
      "Two-Way Radio Communication Failure",
      "Procedures when unable to establish contact on any published ATC or guard frequency.",
      "[CALLSIGN], TRANSMITTING BLIND DUE TO RECEIVER FAILURE, [POSITION], [LEVEL], [INTENTIONS]",
      "ATC clears route and monitors Mode A/C 7600 squawk",
      [
        "Squawk Code 7600 immediately.",
        "In VMC: continue in VMC, land at nearest suitable aerodrome, report arrival to ATC.",
        "In IMC: maintain assigned speed/level for 20 minutes (or 7 min per regional rules), then continue according to filed flight plan.",
        "Transmit reports blind twice on designated frequency."
      ],
      "ICAO Annex 2, Section 3.6.5; DGCA CAR Section 7",
      [
        { speaker: "pilot", text: "Delhi Control, VT-AER, transmitting blind due to receiver failure, position 25 miles south, descending FL 080, proceeding via published STAR to runway 28, squawking 7600." }
      ]
    ),
    createTopic(
      "transponder-codes",
      "Emergency Transponder Squawk Codes",
      "Special transponder Mode 3/A codes used internationally to signal specific emergency conditions.",
      "[CALLSIGN], SQUAWKING [7500 / 7600 / 7700]",
      "[CALLSIGN], CONFIRM SQUAWKING [CODE]",
      [
        "7500 = Unlawful Interference (Hijack).",
        "7600 = Radio Communication Failure.",
        "7700 = General Emergency / Distress.",
        "DGCA exam rule: ATC will ask 'CONFIRM SQUAWKING 7500' if accidental code selection suspected."
      ],
      "ICAO Doc 4444, Section 8.5; DGCA AIP ENR 1.6",
      [
        { speaker: "atc", text: "IndiGo 219, confirm squawking 7500?" },
        { speaker: "pilot", text: "IndiGo 219, affirm, squawking 7500." }
      ]
    ),
    createTopic(
      "tcas-ra",
      "TCAS Resolution Advisory (RA)",
      "Maneuver executed in response to Airborne Collision Avoidance System vertical guidance command.",
      "[CALLSIGN], TCAS CLIMB / TCAS DESCENT",
      "[CALLSIGN], [STATION], ROGER",
      [
        "Pilot MUST follow TCAS RA immediately, overriding contradictory ATC instructions.",
        "ATC radar separation responsibility is suspended during the RA maneuver.",
        "Report 'TCAS CLEAR OF CONFLICT, RETURNING TO [LEVEL]' once resolution complete."
      ],
      "ICAO Doc 4444, 15.7.3; DGCA CAR Section 8",
      [
        { speaker: "pilot", text: "Delhi Control, Air India 108, TCAS climb!" },
        { speaker: "atc", text: "Air India 108, Roger." },
        { speaker: "pilot", text: "Air India 108, clear of conflict, returning to FL 340." },
        { speaker: "atc", text: "Air India 108, Roger, resume own navigation." }
      ]
    ),
    createTopic(
      "unlawful-interference",
      "Unlawful Interference (Hijack)",
      "Procedures and phraseology when aircraft is subject to hijack or unlawful control by hostile persons.",
      "SQUAWK 7500 / [COVERT PHRASEOLOGY]",
      "ATC avoids unnecessary transmissions, clears path, alerts defense authorities",
      [
        "Squawk 7500 silently on transponder.",
        "If forced to speak by hijackers, use natural phrasing or confirm squawk.",
        "ATC will provide maximum radar priority and avoid asking leading questions."
      ],
      "ICAO Annex 17 (Security); DGCA CAR Section 8",
      [
        { speaker: "atc", text: "Air India 815, Delhi Control, confirm squawk 7500?" },
        { speaker: "pilot", text: "Delhi Control, Air India 815, affirm." }
      ]
    ),
    createTopic(
      "emergency-descent",
      "Emergency Descent (Rapid Depressurization)",
      "Rapid vertical descent initiated following structural damage, cabin window failure, or rapid decompression.",
      "MAYDAY MAYDAY MAYDAY, [STATION], [CALLSIGN], EMERGENCY DESCENT TO FL 100 / 10,000 FEET",
      "[CALLSIGN], [STATION], EMERGENCY DESCENT APPROVED, FLY HEADING [DEG], QNH [VALUE]",
      [
        "Don oxygen masks immediately (100% oxygen).",
        "Descend to 10,000 feet or Minimum Sector Altitude (MSA), whichever is higher.",
        "ATC clears all traffic below on the descent corridor."
      ],
      "ICAO Doc 4444, 15.1.1; DGCA CAR Section 8",
      [
        { speaker: "pilot", text: "MAYDAY, MAYDAY, MAYDAY, Kolkata Control, SpiceJet 119, rapid decompression, emergency descent to FL 100, turning right heading 120." },
        { speaker: "atc", text: "SpiceJet 119, Kolkata Control, emergency descent approved, heading 120, QNH 1011, all stations below clear the corridor." }
      ]
    ),
    createTopic(
      "minimum-fuel",
      "MINIMUM FUEL vs MAYDAY FUEL",
      "Distinction between declaring fuel priority concern and an actual fuel distress emergency.",
      "[CALLSIGN], MINIMUM FUEL / MAYDAY, MAYDAY, MAYDAY, MAYDAY FUEL",
      "[CALLSIGN], [STATION], ROGER, EXPECT NO DELAY / CLEARED STRAIGHT-IN APPROACH",
      [
        "'MINIMUM FUEL': Informs ATC that any unexpected delay may result in landing with less than planned final reserve fuel. It is NOT an emergency.",
        "'MAYDAY FUEL': Declares a distress emergency when usable fuel on landing is calculated to be less than the planned final reserve fuel (30 or 45 mins).",
        "ATC MUST give absolute landing priority to 'MAYDAY FUEL'."
      ],
      "ICAO Doc 4444, 15.5.5; DGCA CAR Section 7",
      [
        { speaker: "pilot", text: "Delhi Approach, IndiGo 822, MINIMUM FUEL, unable to accept holding." },
        { speaker: "atc", text: "IndiGo 822, Roger, no holding expected, vectoring for straight-in runway 28." },
        { speaker: "pilot", text: "MAYDAY, MAYDAY, MAYDAY, Delhi Approach, IndiGo 822, MAYDAY FUEL, 15 minutes fuel remaining, request immediate landing runway 28." }
      ]
    ),
    createTopic(
      "diversion-emergency",
      "Emergency Diversion to Nearest Aerodrome",
      "Initiating an urgent en-route course change to land at the closest suitable airport due to emergency conditions.",
      "[CALLSIGN], DIVERTING TO [AERODROME_NAME], DUE [REASON], REQUEST [VECTORS/CLEARANCE]",
      "[CALLSIGN], CLEARED DIRECT [AERODROME], DESCEND FL [LEVEL], WIND [VALUE], RUNWAY IN USE [RWY]",
      [
        "State preferred alternate aerodrome, remaining endurance, and POB.",
        "ATC coordinates emergency services at receiving aerodrome.",
        "DGCA exam tip: Difference between en-route alternate and takeoff alternate requirements."
      ],
      "ICAO Annex 6, Chapter 4",
      [
        { speaker: "pilot", text: "Ahmedabad Control, Air India 301, MAYDAY MAYDAY MAYDAY, cargo smoke indication, diverting to Ahmedabad, request straight-in approach runway 23." },
        { speaker: "atc", text: "Air India 301, cleared direct Ahmedabad, descend FL 070, runway 23 ready, QNH 1012, fire trucks standing by." }
      ]
    ),
    createTopic(
      "fire-smoke",
      "Cockpit / Cabin / Cargo Fire",
      "Distress transmission when onboard smoke or fire is detected.",
      "MAYDAY MAYDAY MAYDAY, [CALLSIGN], FIRE ON BOARD [LOCATION], COMMENCING IMMEDIATE DESCENT",
      "[CALLSIGN], CLEARED IMMEDIATE DESCENT, RUNWAY [RWY] PREPARED, FOAM TENDERS STANDING BY",
      [
        "Land at nearest suitable airport without delay; in-flight fires can compromise aircraft structure in under 15 minutes.",
        "Advise ATC if evacuation will take place on the runway.",
        "Request airport rescue and firefighting (ARFF) services."
      ],
      "ICAO Doc 9432",
      [
        { speaker: "pilot", text: "MAYDAY MAYDAY MAYDAY, Mumbai Tower, Vistara 214, cockpit electrical fire, smoke in cockpit, landing immediately runway 27, will evacuate on runway." },
        { speaker: "atc", text: "Vistara 214, cleared to land runway 27, wind calm, fire tenders rolling." }
      ]
    ),
    createTopic(
      "medical-priority",
      "Critical Medical Emergency on Board",
      "Urgency/distress transmission requesting expedited handling and ground ambulance for a passenger or crew member.",
      "PAN-PAN PAN-PAN PAN-PAN, [CALLSIGN], MEDICAL PRIORITY, PASSENGER UNCONSCIOUS, REQUIRE DOCTOR AND AMBULANCE",
      "[CALLSIGN], [STATION], CLEARED DIRECT [DESTINATION], EXPEDITE DESCENT, AMBULANCE STANDING BY",
      [
        "Specify nature of medical situation (e.g. CPR in progress, stroke, severe trauma).",
        "Advise if passenger is a crew member (pilot incapacitation).",
        "Request gate or apron medical team upon shutdown."
      ],
      "ICAO Doc 4444; DGCA CAR Section 7",
      [
        { speaker: "pilot", text: "Kolkata Approach, Air India 711, PAN-PAN PAN-PAN PAN-PAN, passenger suffering suspected cardiac arrest, doctor on board performing CPR, request priority approach and ambulance at gate." },
        { speaker: "atc", text: "Air India 711, number one for approach, cleared direct to runway 01R, ambulance confirmed at Stand 7." }
      ]
    ),
    createTopic(
      "brakes-hot",
      "Hot Brakes / Gear Assembly Fire Risk",
      "Advising tower after high-energy rejected takeoff or overweight landing that brake temperatures are critical.",
      "[CALLSIGN], BRAKES OVERHEAT / HOT BRAKES, STOPPING ON TAXIWAY, REQUEST FIRE SERVICES INSPECTION",
      "[CALLSIGN], [STATION], HOLD POSITION, FIRE SERVICES DISPATCHED",
      [
        "Do not set parking brake (can weld pads to discs); use wheel chocks.",
        "Vacate runway if able, or hold position if tires at risk of deflation/fuse plug melt.",
        "Keep aircraft facing into wind to assist brake cooling."
      ],
      "IATA Airport Operations; Boeing/Airbus FCOM",
      [
        { speaker: "pilot", text: "Delhi Ground, Akasa 312, rejected takeoff, hot brakes indication, holding on Taxiway Echo, request fire service thermal inspection." },
        { speaker: "atc", text: "Akasa 312, hold position on Echo, fire tender 2 is proceeding to your position." }
      ]
    ),
    createTopic(
      "copilot-incapacitated",
      "Pilot Incapacitation",
      "Urgent transmission when one operating flight crew member becomes medically incapacitated in flight.",
      "PAN-PAN PAN-PAN PAN-PAN, [CALLSIGN], CO-PILOT INCAPACITATED, SINGLE PILOT OPERATION, REQUEST RADAR VECTORS",
      "[CALLSIGN], [STATION], PAN-PAN ACKNOWLEDGED, CLEARED DIRECT [AIRPORT], MAINTAIN [LEVEL], ADVISE INTENTIONS",
      [
        "Cabin crew member briefed to assist in flight deck (locking seat, monitor radios).",
        "Request vectors with minimal workload (long straight-in ILS approach).",
        "Medical crew to meet aircraft upon arrival."
      ],
      "ICAO Doc 8984 (Manual of Civil Aviation Medicine); DGCA CAR Section 8",
      [
        { speaker: "pilot", text: "Chennai Control, IndiGo 492, PAN-PAN PAN-PAN PAN-PAN, First Officer has fainted and is unresponsive, single pilot operation, request radar vectors for immediate landing Chennai." },
        { speaker: "atc", text: "IndiGo 492, Chennai Control, Roger, cleared direct Chennai, descend to 3,000 feet, runway 07 ready, straight-in ILS." }
      ]
    ),
    createTopic(
      "flaps-stuck",
      "Flap Asymmetry / Flapless Overweight Landing",
      "Handling mechanical trailing edge flap or slat failure requiring high approach speed and extended runway length.",
      "PAN-PAN PAN-PAN PAN-PAN, [CALLSIGN], FLAP ASYMMETRY / FLAPS INOPERATIVE, REQUEST HOLDING TO COMPLETE CHECKLIST",
      "[CALLSIGN], [STATION], HOLD AT [FIX] / CLEARED ILS [RWY], REPORT READY",
      [
        "Approach speed (VREF) significantly increased (+20 to +30 knots).",
        "Landing distance required increases by 50% to 70%.",
        "Advise ATC of inability to meet standard approach speed restrictions."
      ],
      "Boeing/Airbus QRH; DGCA CAR Section 8",
      [
        { speaker: "pilot", text: "Mumbai Approach, SpiceJet 516, PAN-PAN PAN-PAN PAN-PAN, flaps locked at position 1, flapless approach speed 165 knots, unable to comply with 140 knot speed restriction on final." },
        { speaker: "atc", text: "SpiceJet 516, 165 knots approved, runway 27 cleared to land, wind 260 at 08." }
      ]
    ),
    createTopic(
      "red-flares",
      "Series of Red Flares Observed",
      "Visual pyrotechnic distress signal sighting reported by aircraft, or pyrotechnics fired from ground control.",
      "[STATION], [CALLSIGN], OBSERVED SERIES OF RED FLARES AT [POSITION/COORDINATES]",
      "[CALLSIGN], [STATION], ROGER, SEARCH AND RESCUE (SAR) NOTIFIED",
      [
        "Red flares fired by another vessel or person signify grave distress.",
        "Red pyrotechnic fired from control tower towards aircraft on final approach means: 'UNSAFE, DO NOT LAND, GO AROUND IMMEDIATELY'.",
        "Record exact GPS coordinates, heading, and time of observation."
      ],
      "ICAO Annex 2 (Rules of the Air), Appendix 1; DGCA CAR Section 9",
      [
        { speaker: "pilot", text: "Mumbai Radio, Air India 144, observed series of red flares at sea, position 18 degrees 42 minutes North, 72 degrees 15 minutes East." },
        { speaker: "atc", text: "Air India 144, Roger, Mumbai Coast Guard and MRCC alerted, report any vessel sightings." }
      ]
    ),
    createTopic(
      "bird-strike",
      "Bird Strike Reporting",
      "Reporting a collision with birds during takeoff, approach, or landing, and runway inspection request.",
      "[STATION], [CALLSIGN], EXPERIENCED BIRD STRIKE ON [RUNWAY/FINAL], [ENGINE/WINDSHIELD/AIRFRAME], [INTENTIONS]",
      "[CALLSIGN], [STATION], ROGER, [RUNWAY_INSPECTION_ORDERED / EMERGENCY_SERVICES_ADVISED]",
      [
        "Advise ATC of location, altitude, and number/size of birds.",
        "Check engine parameters for vibration or temperature rise.",
        "ATC immediately halts departures and inspects runway for bird carcasses."
      ],
      "ICAO Doc 9137 (Airport Services Manual, Part 3); DGCA CAR Section 4",
      [
        { speaker: "pilot", text: "Delhi Tower, Vistara 805, bird strike on departure runway 28 at 800 feet, flock of pigeons, engine parameters normal, continuing to destination." },
        { speaker: "atc", text: "Vistara 805, Roger, runway 28 closed temporarily for wildlife inspection." }
      ]
    ),
    createTopic(
      "airprox",
      "AIRPROX (Air Proximity / Near Miss Report)",
      "Reporting an incident where the distance between aircraft and their relative positions and speed compromised safety.",
      "[STATION], [CALLSIGN], REPORTING AIRPROX AT [TIME], FL [LEVEL], [POSITION], OTHER AIRCRAFT [DESCRIPTION/DISTANCE]",
      "[CALLSIGN], [STATION], AIRPROX LOGGED, ADVISE DETAILS WHEN ABLE",
      [
        "Four ICAO risk categories: Risk of collision, Safety not assured, No risk of collision, Risk not determined.",
        "File written AIRPROX report with DGCA within 24 hours of landing.",
        "Note transponder squawk and TCAS audio warnings."
      ],
      "ICAO Doc 4444, Chapter 16; DGCA CAR Section 5, Series F",
      [
        { speaker: "pilot", text: "Delhi Control, IndiGo 115, filing AIRPROX: near miss with unknown military fighter at FL 240, 20 miles north of Delhi, missed by less than 500 feet vertically." },
        { speaker: "atc", text: "IndiGo 115, Delhi Control, AIRPROX logged, report filed with Directorate General of Civil Aviation." }
      ]
    ),
    createTopic(
      "aircraft-crashed",
      "Downed Aircraft Sighting / ELT Signal Heard",
      "Reporting an aircraft accident observed from the air or an Emergency Locator Transmitter (ELT) distress beacon heard on 121.5 MHz.",
      "[STATION], [CALLSIGN], SIGHTING OF DOWNED AIRCRAFT / ELT DISTRESS BEACON HEARD ON 121.5 MHZ AT [POSITION]",
      "[CALLSIGN], [STATION], ROGER, SEARCH AND RESCUE RESCUE COORDINATION CENTRE (RCC) ACTIVATED",
      [
        "Standard ELT beacon frequencies: 121.5 MHz (analog civilian) and 406 MHz (satellite Cospas-Sarsat).",
        "Report signal strength, position, and whether visual smoke/wreckage is spotted.",
        "Standby to act as on-scene airborne communications relay if requested."
      ],
      "ICAO Annex 12 (Search and Rescue); DGCA CAR Section 9",
      [
        { speaker: "pilot", text: "Nagpur Control, Air India 419, hearing strong oscillating ELT distress beacon on guard 121.5 MHz, position 45 miles west of Nagpur." },
        { speaker: "atc", text: "Air India 419, Roger, Nagpur RCC notified, monitor 121.5 and report any visual signs." }
      ]
    ),
    createTopic(
      "transponder-mode-c-fail",
      "Transponder Mode C (Altitude Reporting) Failure",
      "Transponder operates in Mode A but fails to transmit pressure altitude, or altitude readout is corrupted.",
      "[CALLSIGN], [STATION], NO MODE C READOUT / ALTITUDE DIFFERS BY [FEET] FEET",
      "[CALLSIGN], RESET SQUAWK [CODE] / STOP SQUAWK ALTITUDE / SQUAWK CHARLIE",
      [
        "'SQUAWK CHARLIE': Activate pressure altitude reporting.",
        "'STOP SQUAWK ALTITUDE': Deactivate pressure altitude transmission due to faulty encoder.",
        "Max allowable difference between Mode C readout and barometric altimeter is 200 feet."
      ],
      "ICAO Doc 4444, 8.5.2",
      [
        { speaker: "atc", text: "VT-AER, Delhi Radar, your altitude readout shows FL 120, confirm level." },
        { speaker: "pilot", text: "Delhi Radar, VT-AER is maintaining FL 140, altimeter 1013." },
        { speaker: "atc", text: "VT-AER, stop squawk altitude, altitude reporting defective." },
        { speaker: "pilot", text: "Stop squawk altitude, VT-AER." }
      ]
    ),
    createTopic(
      "altimeter-unreliable",
      "Unreliable Airspeed & Altimeter (Pitot-Static Failure)",
      "Loss of reliable airspeed or barometric altitude indications due to pitot-static icing or blockage.",
      "MAYDAY / PAN-PAN, [CALLSIGN], UNRELIABLE AIRSPEED AND ALTIMETER, FLYING PITCH AND POWER, REQUIRE RADAR ALTITUDE AND GROUND SPEED",
      "[CALLSIGN], [STATION], RADAR CONTACT, YOUR GROUND SPEED [KNOTS], ESTIMATED FLIGHT LEVEL [LEVEL]",
      [
        "Disengage autopilot and autothrottle.",
        "Fly memorized pitch and thrust settings from Unreliable Airspeed checklist (e.g. 5° pitch, 85% N1).",
        "Request ATC provide radar ground speed and GPS/radar altitude updates."
      ],
      "Boeing/Airbus QRH; DGCA Safety Bulletin",
      [
        { speaker: "pilot", text: "Mumbai Control, Air India 211, PAN-PAN PAN-PAN PAN-PAN, unreliable airspeed indication, flying pitch and power, request radar ground speed and avoid all clouds." },
        { speaker: "atc", text: "Air India 211, your ground speed is 380 knots, maintain heading 240, airspace clear of weather." }
      ]
    ),
    createTopic(
      "sinking-ship",
      "Vessel in Distress / Ditching at Sea",
      "Reporting an ocean-going vessel or ship observed sinking, or aircraft preparing for forced landing on water (ditching).",
      "MAYDAY MAYDAY MAYDAY, [CALLSIGN], DITCHING / VESSEL IN DISTRESS OBSERVED AT [COORDINATES]",
      "[CALLSIGN], [STATION], ROGER, COAST GUARD AND RCC ALERTED",
      [
        "Transmit: Position, heading, swell direction, wind velocity.",
        "Ditching aircraft: Touch down parallel to sea swells, upwind if swell not significant.",
        "Life vests donned prior to ditching, inflated ONLY after exiting the aircraft."
      ],
      "ICAO Annex 12 (SAR); DGCA CAR Section 8",
      [
        { speaker: "pilot", text: "Chennai Radio, SpiceJet 781, sighting fishing trawler capsized at position 13°12'N 080°45'E, persons in water, deploying emergency rafts." },
        { speaker: "atc", text: "SpiceJet 781, Roger, Chennai Naval Command and Coast Guard dispatched." }
      ]
    ),
    createTopic(
      "fuel-dumping",
      "Fuel Jettisoning / Fuel Dumping",
      "Intentional overboard jettison of aviation fuel to reduce aircraft gross weight down to Maximum Landing Weight (MLW).",
      "[CALLSIGN], REQUEST FUEL DUMPING, [AMOUNT] TONS, AT FL [LEVEL]",
      "[CALLSIGN], [STATION], FUEL JETTISON APPROVED BETWEEN FL [LEVEL] AND FL [LEVEL], IN AREA [DESCRIPTION]",
      [
        "Fuel dumping conducted at minimum 6,000 feet AGL above terrain (to allow fuel to vaporize before reaching ground).",
        "Conducted clear of thunderstorms, cities, and other aircraft (minimum 10 NM lateral separation from other traffic).",
        "All stations broadcast advisory: 'ATTENTION ALL AIRCRAFT, FUEL JETTISON IN PROGRESS'."
      ],
      "ICAO Doc 4444, 15.6; DGCA CAR Section 8",
      [
        { speaker: "pilot", text: "Delhi Approach, Air India 101, Boeing 787, technical return, gross weight 210 tons, request fuel dumping to maximum landing weight 172 tons, 38 tons to dump." },
        { speaker: "atc", text: "Air India 101, proceed to fuel dump area Romeo 12, maintain FL 120, fuel dumping approved." },
        { speaker: "pilot", text: "Proceed to area Romeo 12, maintain FL 120, dumping 38 tons, Air India 101." }
      ]
    ),
    createTopic(
      "bomb-threat",
      "Bomb Threat / Security Alert",
      "Procedures following a sabotage or bomb warning received for an airborne aircraft.",
      "MAYDAY / PAN-PAN, [CALLSIGN], BOMB THREAT ON BOARD, REQUEST IMMEDIATE LANDING AND ISOLATED PARKING POSITION",
      "[CALLSIGN], [STATION], CLEARED DIRECT [AERODROME], RUNWAY [RWY], ISOLATED BAY [BAY_NUMBER] ALLOCATED, EVACUATION CONTINGENCY READY",
      [
        "Squawk 7700 (or 7500 if instructed by security authorities).",
        "Descend to cabin equalization altitude if differential pressure poses risk.",
        "Airport directs aircraft to designated isolated aircraft parking position (minimum 100 meters from other aircraft and buildings)."
      ],
      "ICAO Security Manual Doc 8973; DGCA CAR Section 8",
      [
        { speaker: "pilot", text: "MAYDAY MAYDAY MAYDAY, Mumbai Control, IndiGo 610, bomb threat note found on board, descending immediately, request landing Mumbai, isolated parking stand." },
        { speaker: "atc", text: "IndiGo 610, Mumbai Control, cleared straight-in approach runway 27, descend to 3,000 feet, taxi to isolated Bay 88 upon landing, security forces mobilized." }
      ]
    )
  ]
};

// 8. COMMUNICATION FAILURE
const communicationFailure = {
  id: "communication-failure",
  label: "Communication Failure",
  icon: "WifiOff",
  topics: [
    createTopic(
      "total-comm-failure",
      "Total Two-Way Communication Failure",
      "Loss of both transmitting and receiving capability under Instrument Flight Rules.",
      "SQUAWK 7600, MAINTAIN FLIGHT PLAN ROUTE AND LEVEL PER ICAO ANNEX 2 RULES",
      "ATC clears surrounding traffic and reserves airspace along flight planned route",
      [
        "Squawk 7600 immediately.",
        "In VMC: continue in visual meteorological conditions, land at nearest suitable aerodrome.",
        "In IMC: maintain last assigned speed and level for 20 minutes following failure to report, then conform to flight plan.",
        "Commence descent at destination holding fix at the latest of EFC time or ETA."
      ],
      "ICAO Annex 2, Section 3.6.5; DGCA CAR Section 7",
      [
        { speaker: "pilot", text: "[Cockpit action]: Transponder code set to 7600, attempting contact on 121.5 MHz and standby VHF sets." }
      ]
    ),
    createTopic(
      "partial-comm-failure",
      "Transmitter Failure (Receiver Only Working)",
      "Aircraft can receive ATC instructions but cannot transmit verbally.",
      "[CALLSIGN], IF YOU READ, SQUAWK IDENT / TURN HEADING [DEG]",
      "[CALLSIGN], [STATION], SQUAWK IDENT OBSERVED, RADAR TRANSMISSION ACKNOWLEDGED",
      [
        "ATC instructs pilot to acknowledge transmissions by squawking 'IDENT' or operating transponder mode.",
        "ATC asks pilot to make a turn (e.g. 'Turn left 20 degrees to acknowledge').",
        "Listen carefully to assigned frequencies and watch for radar vectors."
      ],
      "ICAO Doc 4444, Chapter 15",
      [
        { speaker: "atc", text: "IndiGo 418, Delhi Radar, if you read, squawk IDENT." },
        { speaker: "atc", text: "IndiGo 418, squawk IDENT observed, continue on current heading 280, descend to FL 080." }
      ]
    ),
    createTopic(
      "receiver-only",
      "Receiver Failure (Transmitting Blind)",
      "Aircraft cannot hear ATC, but can transmit blind to broadcast intentions.",
      "[STATION], [CALLSIGN], TRANSMITTING BLIND DUE TO RECEIVER FAILURE, [POSITION], [LEVEL], [INTENTIONS]",
      "ATC clears path based on pilot's transmitted blind report",
      [
        "Prefix all calls with: 'TRANSMITTING BLIND DUE TO RECEIVER FAILURE'.",
        "Transmit the entire message twice, including next reporting point and ETA.",
        "State intentions clearly: cruising level, approach aid to be used, and landing time."
      ],
      "ICAO Annex 10, Vol II, 5.2.1.7.3",
      [
        { speaker: "pilot", text: "Mumbai Control, VT-AER, transmitting blind due to receiver failure, transmitting blind due to receiver failure: position 30 miles north, FL 090, proceeding direct to runway 27 ILS, landing at 1045." }
      ]
    ),
    createTopic(
      "relay-through-aircraft",
      "Relaying Communication via Airborne Aircraft",
      "When terrain or atmospheric propagation blocks direct VHF line-of-sight communication with ground ATC.",
      "[AIRCRAFT], [CALLSIGN], UNABLE TO REACH [ATC], REQUEST YOU RELAY OUR [POSITION/ESTIMATE]",
      "[RELAYING_AIRCRAFT]: [ATC_NAME], [CALLSIGN] ON GUARD REQUESTS RELAY: [MESSAGE]",
      [
        "Use 121.5 MHz guard frequency if other air-to-air frequencies fail.",
        "Relaying pilot notes callsign and exact timestamp.",
        "Common in hilly terrain or oceanic entry gaps."
      ],
      "ICAO Annex 10, Vol II",
      [
        { speaker: "pilot", text: "Air India 102, this is VT-SHR on 121.5, unable contact Jaipur Tower, request relay we are 15 miles south inbound." },
        { speaker: "pilot", text: "Jaipur Tower, Air India 102 relaying for VT-SHR: VT-SHR 15 miles south inbound, requesting runway in use." }
      ]
    ),
    createTopic(
      "light-signals",
      "Aerodrome Light Gun Signals",
      "Optical light gun signals directed by control tower to aircraft with inoperative radio communication.",
      "PILOT ACKNOWLEDGES BY ROCKING WINGS (DAY) OR FLASHING LANDING LIGHTS (NIGHT)",
      "TOWER DIRECTS DIRECTED LIGHT BEAM: GREEN / RED / WHITE",
      [
        "Steady Green: Cleared to land (in flight) / Cleared for takeoff (on ground).",
        "Flashing Green: Return for landing (in flight) / Cleared to taxi (on ground).",
        "Steady Red: Give way to other aircraft and continue circling (in flight) / Stop (on ground).",
        "Flashing Red: Aerodrome unsafe, do not land (in flight) / Taxi clear of runway (on ground).",
        "Flashing White: Land at this aerodrome and proceed to apron (in flight) / Return to starting point on aerodrome (on ground)."
      ],
      "ICAO Annex 2, Appendix 1; DGCA CAR Section 7 (Crucial Exam Table)",
      [
        { speaker: "atc", text: "[Tower points steady green beam at aircraft on final approach]." },
        { speaker: "pilot", text: "[Pilot flashes landing lights twice, acknowledging clearance to land]." }
      ]
    ),
    createTopic(
      "squelch-break",
      "Squelch & Stuck Microphone Procedures",
      "Procedures when an open microphone or squelch lock blocks an ATC frequency.",
      "[ALL STATIONS], TRANSMISSION BLOCKED / OPEN CARRIER ON [FREQUENCY]",
      "[CALLSIGN], CHECK YOUR TRANSMITTER, STUCK MIC ON FREQUENCY",
      [
        "Listen for high-pitched squeal or background cockpit noises.",
        "Check audio control panel push-to-talk (PTT) switch.",
        "ATC switches non-affected aircraft to secondary frequency: 'ALL STATIONS EXCEPT [CALLSIGN] SWITCH TO 124.8'."
      ],
      "ICAO Doc 9432",
      [
        { speaker: "atc", text: "All stations on 118.1, we have a stuck microphone, all traffic switch to frequency 125.7 immediately." }
      ]
    )
  ]
};

// 9. DIVERSION
const diversion = {
  id: "diversion",
  label: "Diversion",
  icon: "GitBranch",
  topics: [
    createTopic(
      "weather-diversion",
      "En Route Weather Diversion to Alternate",
      "Diverting to an alternate aerodrome due to weather below landing minima at destination.",
      "[STATION], [CALLSIGN], DESTINATION WEATHER BELOW MINIMA, DIVERTING TO [ALTERNATE_NAME], REQUEST CLEARANCE",
      "[CALLSIGN], [STATION], CLEARED TO [ALTERNATE] VIA [ROUTE], CLIMB FL [LEVEL], SQUAWK [CODE]",
      [
        "Verify fuel remaining exceeds: trip fuel to alternate + 30/45 min final reserve fuel.",
        "Obtain latest weather and runway in use at alternate before initiating diversion.",
        "Notify company dispatch via ACARS or operational frequency."
      ],
      "ICAO Annex 6, Operation of Aircraft; DGCA CAR Section 8",
      [
        { speaker: "pilot", text: "Delhi Approach, Air India 312, visibility at Delhi below CAT I minima, diverting to Jaipur, request climb FL 160 routing direct DPN VOR." },
        { speaker: "atc", text: "Air India 312, cleared to Jaipur direct DPN VOR, climb FL 160, contact Delhi Control 133.65." }
      ]
    ),
    createTopic(
      "technical-diversion",
      "Technical / Mechanical Diversion",
      "Diverting to a maintenance base or nearest capable airport due to non-critical system failure.",
      "[CALLSIGN], DIVERTING TO [AERODROME], DUE [SYSTEM_MALFUNCTION], REQUEST [LEVEL/ROUTE]",
      "[CALLSIGN], CLEARED TO [AERODROME], DESCEND FL [LEVEL], RADAR VECTORS AVAILABLE",
      [
        "Assess runway length requirements for degraded flap/brake performance.",
        "Verify emergency ground equipment availability at alternate.",
        "Coordinate with airline maintenance operations center (MOC)."
      ],
      "ICAO Doc 4444; DGCA CAR Section 8",
      [
        { speaker: "pilot", text: "Mumbai Control, IndiGo 521, single generator failure, precautionary diversion to Ahmedabad, request direct to APANO." },
        { speaker: "atc", text: "IndiGo 521, cleared direct APANO, maintain FL 260, Ahmedabad informed." }
      ]
    ),
    createTopic(
      "fuel-diversion",
      "Fuel-Critical Diversion",
      "Diverting when headwinds, holding, or routing changes erode fuel reserves towards minimum landing limits.",
      "[CALLSIGN], DIVERTING TO [ALTERNATE], FUEL ENDURANCE [HOURS/MINUTES], POB [NUMBER]",
      "[CALLSIGN], CLEARED UNRESTRICTED CLIMB TO FL [LEVEL], DIRECT TO [ALTERNATE], EXPEDITE",
      [
        "Declare MINIMUM FUEL if further delay will breach reserve.",
        "Declare MAYDAY FUEL if expected landing will occur with less than final reserve.",
        "Request shortest possible radar vectors and continuous descent approach."
      ],
      "ICAO Doc 4444, 15.5.5",
      [
        { speaker: "pilot", text: "Kolkata Control, SpiceJet 704, extended holding at Kolkata, diverting to Bhubaneswar, endurance 1 hour 10 minutes, POB 178." },
        { speaker: "atc", text: "SpiceJet 704, cleared direct Bhubaneswar, climb FL 280, straight-in approach runway 14." }
      ]
    ),
    createTopic(
      "medical-diversion",
      "Medical Diversion Execution",
      "Immediate diversion to closest aerodrome equipped with specialized trauma or medical facilities.",
      "PAN-PAN PAN-PAN PAN-PAN, [CALLSIGN], MEDICAL DIVERSION TO [AERODROME], CRITICAL PASSENGER",
      "[CALLSIGN], [STATION], CLEARED DIRECT [AERODROME], EMERGENCY DESCENT AUTHORIZED, AMBULANCE STANDING BY",
      [
        "Provide pilot estimate of landing time to enable ambulance prepositioning.",
        "Request priority landing and direct routing.",
        "Advise ground handling of emergency gate requirements."
      ],
      "ICAO Annex 9 (Facilitation)",
      [
        { speaker: "pilot", text: "Nagpur Control, Vistara 982, PAN-PAN PAN-PAN PAN-PAN, passenger having stroke, diverting to Nagpur, request priority descent." },
        { speaker: "atc", text: "Vistara 982, cleared direct Nagpur, descend FL 100 unrestricted, medical priority assigned." }
      ]
    ),
    createTopic(
      "alternate-aerodrome",
      "En Route Alternate Selection & Briefing",
      "Procedures and regulatory criteria for selecting takeoff, en-route, and destination alternates.",
      "[CALLSIGN], REQUEST WEATHER AND RUNWAY STATUS FOR ALTERNATE [AERODROME]",
      "[CALLSIGN], [ALTERNATE] WEATHER [METAR_DETAILS], RUNWAY [RWY] IN USE",
      [
        "Takeoff alternate required if weather at departure aerodrome is below landing minima.",
        "Destination alternate requirements: at least 1 alternate always required for IFR flights unless isolated destination criteria met.",
        "Weather at alternate must be at or above alternate planning minima at estimated time of arrival."
      ],
      "ICAO Annex 6, Chapter 4; DGCA CAR Section 8",
      [
        { speaker: "pilot", text: "Delhi Control, Air India 410, request latest weather for Lucknow and Jaipur alternates." },
        { speaker: "atc", text: "Air India 410, Lucknow CAVOK, Jaipur visibility 3000m in haze, both runways open." }
      ]
    )
  ]
};

// 10. AIRPORT CODES & AERONAUTICAL INFO
const airportCodes = {
  id: "airport-codes",
  label: "Airport Codes & Airspace",
  icon: "MapPin",
  topics: [
    createTopic(
      "icao-codes-india",
      "Indian ICAO Aerodrome Codes",
      "The 4-letter ICAO location indicators for Indian airports starting with prefix 'VI' (North), 'VA' (West/Central), 'VE' (East), 'VO' (South).",
      "[AIRPORT_NAME] = [4-LETTER_ICAO_CODE]",
      "Used in all IFR flight plans, NOTAMs, METARs, and ATC clearances",
      [
        "Delhi (Indira Gandhi): VIDP (Northern region).",
        "Mumbai (Chhatrapati Shivaji Maharaj): VABB (Western region).",
        "Bengaluru (Kempegowda): VOBL (Southern region).",
        "Chennai (Meenambakkam): VOMM (Southern region).",
        "Kolkata (Netaji Subhash Chandra Bose): VECC (Eastern region).",
        "Hyderabad (Rajiv Gandhi): VOHS; Ahmedabad: VAAH; Cochin: VOCI; Goa (Dabolim): VAGO / Mopa: VOGA."
      ],
      "ICAO Doc 7910 (Location Indicators); DGCA AIP India GEN 2.4",
      [
        { speaker: "pilot", text: "Flight plan filed: Route VIDP to VABB via airway W13, alternate VAAH." },
        { speaker: "atc", text: "Cleared flight plan VIDP to VABB via EXOLU." }
      ]
    ),
    createTopic(
      "icao-codes-international",
      "Major International ICAO Codes",
      "Key international hub aerodrome identifiers frequently tested in DGCA RTR examinations.",
      "[CITY] = [ICAO_CODE] (e.g. Dubai = OMDB, London Heathrow = EGLL, Singapore = WSSS)",
      "Standard international ICAO 4-letter format",
      [
        "Gulf: Dubai (OMDB), Doha (OTHH), Abu Dhabi (OMAA), Muscat (OOMS).",
        "Europe: London Heathrow (EGLL), Frankfurt (EDDF), Paris Charles de Gaulle (LFPG), Amsterdam (EHAM).",
        "Asia-Pacific: Singapore Changi (WSSS), Bangkok Suvarnabhumi (VTBS), Hong Kong (VHHH), Kuala Lumpur (WMKK).",
        "USA: New York JFK (KJFK), Los Angeles (KLAX), Chicago O'Hare (KORD)."
      ],
      "ICAO Doc 7910",
      [
        { speaker: "pilot", text: "Filed route: VABB direct OMDB via oceanic airway G450." }
      ]
    ),
    createTopic(
      "iata-vs-icao",
      "IATA vs ICAO Codes Comparison",
      "Differences between commercial 3-letter IATA codes and technical 4-letter ICAO operational indicators.",
      "IATA (Commercial/Ticketing) vs ICAO (Navigation/ATC/Meteorology)",
      "Air traffic control and radiotelephony exclusively utilize ICAO 4-letter codes",
      [
        "IATA codes (e.g. DEL, BOM, BLR) are used for passenger baggage tags, tickets, and schedules.",
        "ICAO codes (e.g. VIDP, VABB, VOBL) are used for air traffic services, flight plans, NOTAMs, and METARs.",
        "DGCA Part 2 rule: In radio telephony examinations, always refer to airports using ICAO identifiers or full spoken names."
      ],
      "ICAO Annex 10; IATA Airline Coding Directory",
      [
        { speaker: "pilot", text: "DEL is IATA for Delhi; VIDP is the official ICAO identifier for navigation." }
      ]
    ),
    createTopic(
      "fir-boundaries",
      "Indian Flight Information Regions (FIRs)",
      "The five territorial FIR divisions of Indian airspace responsible for flight information and alerting services.",
      "[FIR_NAME] ACC: Delhi, Mumbai, Kolkata, Chennai, and Guwahati Sub-FIR",
      "Each FIR provides Area Control (ACC) and Flight Information Services",
      [
        "Delhi FIR (VIDF): Covers Northern India.",
        "Mumbai FIR (VABF): Covers Western and Central India plus Arabian Sea oceanic airspace.",
        "Kolkata FIR (VECF): Covers Eastern and North-Eastern India plus northern Bay of Bengal.",
        "Chennai FIR (VOMF): Covers Southern peninsular India and southern Bay of Bengal / Indian Ocean.",
        "Guwahati Sub-FIR: Subordinate to Kolkata FIR for mountainous north-east borders."
      ],
      "DGCA AIP India ENR 2.1 (FIR Boundaries)",
      [
        { speaker: "pilot", text: "Air India 101, crossing from Delhi FIR to Mumbai FIR over waypoint APANO at FL 360." },
        { speaker: "atc", text: "Air India 101, contact Mumbai Control on 132.35." }
      ]
    ),
    createTopic(
      "runway-designators",
      "Runway Designators & Magnetic Orientation",
      "How runway numbering is determined from magnetic orientation rounded to nearest 10 degrees.",
      "RUNWAY [TWO_DIGITS] [L/C/R] (e.g. Runway 28, Runway 09 Left)",
      "Designated based on magnetic heading rounded to nearest tenth degree (e.g. 278° = Runway 28)",
      [
        "Parallel runways are labeled L (Left), R (Right), and C (Center).",
        "If magnetic variation shifts significantly, runway numbers are repainted (e.g. 28 becoming 29).",
        "Reciprocal runway is exactly 180° opposite (e.g. RWY 09 and RWY 27)."
      ],
      "ICAO Annex 14, Volume I (Aerodromes)",
      [
        { speaker: "atc", text: "Cleared to land runway 09 Left, wind 090 at 12 knots." },
        { speaker: "pilot", text: "Cleared to land runway 09 Left, VT-AER." }
      ]
    ),
    createTopic(
      "ats-frequencies",
      "Aeronautical Frequency Bands & ATC Units",
      "VHF and HF spectrum allocations for civil aviation air traffic control units.",
      "VHF Spectrum: 118.000 MHz to 136.975 MHz with 8.33 kHz or 25 kHz channel spacing",
      "Units: Delivery -> Ground -> Tower -> Departure -> Approach -> Area Control (ACC)",
      [
        "Emergency Guard: 121.500 MHz (civilian VHF) and 243.000 MHz (military UHF).",
        "ATIS: Continuous recorded broadcast on dedicated VHF channel.",
        "HF (High Frequency) 2.8 MHz to 22 MHz used for long-range oceanic communication beyond VHF line-of-sight."
      ],
      "ICAO Annex 10, Volume V; DGCA CAR Section 7",
      [
        { speaker: "pilot", text: "Tuning VHF COM 1 to 118.1 (Tower), COM 2 monitoring 121.5 (Guard)." }
      ]
    )
  ]
};

// 11. PHRASEOLOGY QUESTIONS & EXAM RULES
const phraseologyQuestions = {
  id: "phraseology-questions",
  label: "Phraseology Questions & Exam Rules",
  icon: "HelpCircle",
  topics: [
    createTopic(
      "readability-scale",
      "Readability Scale 1 to 5 (Radio Checks)",
      "The exact numerical grading used for assessing voice transmission quality in radiotelephony.",
      "[CALLSIGN], HOW DO YOU READ?",
      "[STATION], READ YOU [1 to 5]",
      [
        "1 = Unreadable.",
        "2 = Readable now and then.",
        "3 = Readable with difficulty.",
        "4 = Readable.",
        "5 = Perfectly readable.",
        "Exam Trap: Never answer 'Loud and clear' or 'Five by five'. In DGCA oral examinations, strictly state 'Read you 5' or 'Readability 3'."
      ],
      "ICAO Annex 10, Vol II, 5.2.1.8.4",
      [
        { speaker: "pilot", text: "Delhi Tower, VT-AER, how do you read?" },
        { speaker: "atc", text: "VT-AER, read you 5." }
      ]
    ),
    createTopic(
      "numbers-pronunciation",
      "Aviation Number Pronunciation Rules",
      "Standard phonetic pronunciation of digits to prevent phonetic confusion over radio channels.",
      "0=ZE-RO, 1=WUN, 2=TOO, 3=TREE, 4=FOW-ER, 5=FIFE, 6=SIX, 7=SEV-EN, 8=AIT, 9=NIN-ER",
      "Decimal point is spoken as 'DECIMAL'; 100 as 'HUNDRED'; 1,000 as 'TOUSAND'",
      [
        "Number 9 is pronounced 'NINER' to avoid confusion with German 'nein' (no).",
        "Number 3 is pronounced 'TREE' (no 'th' sound).",
        "Number 4 is pronounced 'FOW-ER' (two syllables).",
        "Altitude 10,000 ft is spoken as: 'WUN TOUSAND' or 'WUN ZERO TOUSAND'."
      ],
      "ICAO Annex 10, Vol II, 5.2.1.4.3",
      [
        { speaker: "atc", text: "Squawk 3549 (TREE FIFE FOW-ER NIN-ER)." },
        { speaker: "pilot", text: "Squawk 3549 (TREE FIFE FOW-ER NIN-ER), VT-AER." }
      ]
    ),
    createTopic(
      "time-format",
      "Time Representation in Radiotelephony",
      "How time is spoken in aviation using Coordinated Universal Time (UTC / Zulu).",
      "Normally only minutes are transmitted if hour is clear (e.g. 0924 spoken as 'TOO FOW-ER')",
      "Full four digits spoken when confusion is possible: 'ZE-RO NIN-ER TOO FOW-ER'",
      [
        "Always referenced to Greenwich Mean Time (UTC / Zulu), never local time (IST).",
        "India Standard Time (IST) is UTC + 5 hours 30 minutes.",
        "Example: 1430 IST is 0900 UTC."
      ],
      "ICAO Annex 10, Vol II, 5.2.1.4.2",
      [
        { speaker: "atc", text: "Estimate BUTOP at time 45 (FOW-ER FIFE)." },
        { speaker: "pilot", text: "Estimating BUTOP at 45, Air India 101." }
      ]
    ),
    createTopic(
      "flight-levels-vs-altitude",
      "Flight Level vs Altitude vs Height",
      "Understanding vertical distance references and altimeter sub-scale settings.",
      "Flight Level (Standard 1013.25 hPa) vs Altitude (QNH - Sea Level) vs Height (QFE - Aerodrome)",
      "Transition Altitude (climbing): switch from QNH to Standard 1013. Transition Level (descending): switch to QNH",
      [
        "Altitude: Measured above Mean Sea Level using local QNH.",
        "Flight Level: Measured above standard isobaric surface (1013.25 hPa / 29.92 inHg).",
        "Height: Measured above aerodrome reference point using QFE.",
        "Transition Layer is the airspace between Transition Altitude and Transition Level."
      ],
      "ICAO Doc 8168, PANS-OPS Vol I; DGCA CAR Section 9",
      [
        { speaker: "atc", text: "Climb to FL 140, passing transition altitude 4,000 feet, set standard 1013." },
        { speaker: "pilot", text: "Climb FL 140, standard set, cross-checked, Air India 202." }
      ]
    ),
    createTopic(
      "qnh-qfe-qne",
      "Q Codes: QNH, QFE, and QNE",
      "The classic aeronautical Q-signals used for barometric altimeter calibration.",
      "QNH = Altimeter reads airfield elevation on ground. QFE = Altimeter reads zero on ground. QNE = Standard 1013.25",
      "Mandatory readback required for all QNH altimeter setting values",
      [
        "QNH (Question Normal Height): Barometric pressure adjusted to sea level according to standard atmosphere.",
        "QFE (Question Field Elevation): Barometric pressure at aerodrome elevation. Altimeter reads zero at runway touchdown.",
        "QNE: The altitude indicated on landing when standard 1013.25 hPa is set on subscale (used at high elevation airfields)."
      ],
      "ICAO Annex 10; DGCA CAR Section 7 (Frequent Oral Question)",
      [
        { speaker: "atc", text: "IndiGo 302, QNH 1015, descend to 3,000 feet." },
        { speaker: "pilot", text: "QNH 1015, descend to 3,000 feet, IndiGo 302." }
      ]
    ),
    createTopic(
      "priority-of-messages",
      "Order of Priority for Radio Messages",
      "The international hierarchy governing which transmissions take precedence over radio channels.",
      "Order 1 to 6: Distress -> Urgency -> Direction Finding -> Flight Safety -> Meteorological -> Flight Regularity",
      "Distress messages (MAYDAY) have absolute paramount priority",
      [
        "1. Distress calls, messages, and traffic (MAYDAY).",
        "2. Urgency messages (PAN-PAN).",
        "3. Communications relating to Direction Finding.",
        "4. Flight Safety messages (ATC clearances, position reports).",
        "5. Meteorological messages (SIGMET, AIRMET, weather reports).",
        "6. Flight Regularity messages (company operations, arrival times, passenger connections)."
      ],
      "ICAO Annex 10, Vol II, Section 5.1.8 (Core DGCA Exam Question)",
      [
        { speaker: "atc", text: "All stations, cease transmission, MAYDAY in progress on frequency." }
      ]
    ),
    createTopic(
      "compulsory-readback",
      "Mandatory Read-Back Items (The Golden Rule)",
      "List of safety-critical instructions that MUST always be read back verbatim to prevent misunderstandings.",
      "Pilot must repeat back all safety-critical parameters with callsign appended",
      "ATC must listen to verify accuracy of read-back",
      [
        "1. Level / Altitude / Flight Level instructions.",
        "2. Heading and speed assignments.",
        "3. Runway in use.",
        "4. Altimeter settings (QNH / QFE).",
        "5. SSR Transponder codes (Squawk).",
        "6. Taxi, hold short, enter, land, takeoff, and runway crossing clearances.",
        "7. Transition levels and frequency changes."
      ],
      "ICAO Doc 4444, Chapter 12; DGCA CAR Section 7",
      [
        { speaker: "atc", text: "SpiceJet 401, squawk 4512, turn left heading 240, climb FL 280." },
        { speaker: "pilot", text: "Squawk 4512, turn left heading 240, climb FL 280, SpiceJet 401." }
      ]
    ),
    createTopic(
      "silence-procedures",
      "SILENCE MAYDAY & SILENCE FINI",
      "Controlling radio silence during ongoing distress emergencies.",
      "STOP TRANSMITTING — MAYDAY / SILENCE MAYDAY / SILENCE FINI",
      "Imposed by station in distress or controlling ATC authority",
      [
        "'STOP TRANSMITTING — MAYDAY': Imposed on a specific interfering station.",
        "'SILENCE MAYDAY': Imposed to all stations to clear frequency for distress traffic.",
        "'SILENCE FINI': Pronounced 'See-lahns Fee-nee', indicates distress traffic has ended and normal communication may resume."
      ],
      "ICAO Annex 10, Vol II, 5.3.3.5",
      [
        { speaker: "atc", text: "All stations on 125.7, SILENCE MAYDAY." },
        { speaker: "atc", text: "All stations on 125.7, SILENCE FINI, resume normal communications." }
      ]
    ),
    createTopic(
      "standard-words",
      "Standard Aviation Terminology & Meanings",
      "The precise operational definitions of standard ICAO radiotelephony phraseology.",
      "Standard aeronautical words with precise legal meanings",
      "Never substitute informal slang (e.g. 'Yeah', 'Okay', 'Roger that', 'Will do')",
      [
        "ACKNOWLEDGE: Let me know that you have received and understood this message.",
        "AFFIRM: Yes.",
        "NEGATIVE: No / Permission not granted / That is not correct.",
        "ROGER: I have received all of your last transmission (does NOT mean yes or consent).",
        "WILCO: Will Comply (I understand and will carry out instruction).",
        "READ BACK: Repeat all or specified part back to me.",
        "SAY AGAIN: Repeat your transmission.",
        "STANDBY: Wait and I will call you.",
        "EXPEDITE: Comply with this instruction immediately without delay.",
        "UNABLE: Cannot comply with your request or instruction."
      ],
      "ICAO Doc 9432 (Manual of Radiotelephony); DGCA CAR Section 7",
      [
        { speaker: "atc", text: "Air India 302, can you expedite descent to FL 140?" },
        { speaker: "pilot", text: "Unable expedite due turbulence, Air India 302." }
      ]
    ),
    createTopic(
      "callsign-abbreviation",
      "Aircraft Callsign Abbreviation Rules",
      "When and how civil aircraft callsigns may be legally abbreviated over radio channels.",
      "Abbreviation permitted ONLY after ATC initiates abbreviation first",
      "Full callsign must always be used on initial contact with any new frequency",
      [
        "Registration VT-AER: Abbreviates to V-ER (First character and at least last two characters).",
        "Callsign with flight number (e.g. Air India 101, IndiGo 402): CANNOT be abbreviated.",
        "If confusion arises with similar callsign on frequency, ATC will instruct full callsign usage.",
        "Heavy aircraft suffix: Append 'HEAVY' (MTOW 136,000 kg or greater) or 'SUPER' (Airbus A380)."
      ],
      "ICAO Annex 10, Vol II, 5.2.1.7; DGCA CAR Section 7",
      [
        { speaker: "pilot", text: "Delhi Tower, Victor Tango Alpha Echo Romeo, holding short runway 28." },
        { speaker: "atc", text: "V-ER, line up and wait runway 28." },
        { speaker: "pilot", text: "Line up and wait runway 28, V-ER." }
      ]
    )
  ]
};

// All 11 Categories
const RTR_CATEGORIES = [
  generalProcedures,
  preDeparture,
  departure,
  enRoute,
  arrivalApproach,
  meteorological,
  emergencyAbnormal,
  communicationFailure,
  diversion,
  airportCodes,
  phraseologyQuestions
];

// Write file
const outputPath = path.resolve(__dirname, 'rtrData.js');
const fileHeader = `// DGCA RTR Part 2 — Comprehensive Phraseology Data Library
// Complete ICAO & DGCA Aviation Curriculum with 11 Categories and 100+ Topics
// Generated for Aerius Pilot Academy

export const RTR_CATEGORIES = ${JSON.stringify(RTR_CATEGORIES, null, 2)};
`;

fs.writeFileSync(outputPath, fileHeader, 'utf8');
console.log(`Successfully generated rtrData.js with ${RTR_CATEGORIES.length} categories!`);

let totalTopics = 0;
RTR_CATEGORIES.forEach(c => {
  console.log(` - ${c.label}: ${c.topics.length} topics`);
  totalTopics += c.topics.length;
});
console.log(`Total topics compiled: ${totalTopics}`);
