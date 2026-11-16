// DGCA RTR Part 2 — Comprehensive Phraseology Data Library
// Complete ICAO & DGCA Aviation Curriculum with 11 Categories and 100+ Topics
// Generated for Aerius Pilot Academy

export const RTR_CATEGORIES = [
  {
    "id": "general-procedures",
    "label": "General Procedures",
    "icon": "Radio",
    "topics": [
      {
        "id": "initial-contact",
        "title": "Initial Contact",
        "whenToUse": "Used when establishing first communication with any ATC unit. The initial call must include the station being called, your full callsign, and your request or message type. Subsequent calls on the same frequency may use abbreviated callsigns once two-way communication is established.",
        "pilotTemplate": "[STATION], [FULL_CALLSIGN], [TYPE_OF_AIRCRAFT], [POSITION], [LEVEL], [REQUEST]",
        "atcTemplate": "[CALLSIGN], [STATION], pass your message / go ahead",
        "notes": [
          "Always use full callsign on initial contact — abbreviation is permitted only after ATC abbreviates first.",
          "Include aircraft type on first contact for sequencing purposes.",
          "If no response within 10 seconds, repeat the call; after two attempts try alternative frequency.",
          "Monitor the frequency before transmitting to avoid blocking ongoing communication.",
          "DGCA exams frequently test whether full or abbreviated callsign should be used on initial contact."
        ],
        "reference": "ICAO Annex 10, Vol II, Chapter 5; DGCA CAR Section 7, Series F, Part I",
        "example": [
          {
            "speaker": "pilot",
            "text": "Delhi Control, Air India 101, Boeing 787, position ALRAM, FL 340, estimating Delhi at 1145, request descent."
          },
          {
            "speaker": "atc",
            "text": "Air India 101, Delhi Control, maintain FL 340, expect descent clearance at time 1130."
          },
          {
            "speaker": "pilot",
            "text": "Maintain FL 340, expecting descent at 1130, Air India 101."
          }
        ]
      },
      {
        "id": "read-back",
        "title": "Read Back Procedure",
        "whenToUse": "Mandatory procedure where the pilot repeats back safety-critical ATC instructions to confirm mutual understanding and prevent runway incursions or altitude busts.",
        "pilotTemplate": "[REPEATED ATC INSTRUCTION EXACTLY], [CALLSIGN]",
        "atcTemplate": "[CALLSIGN], read-back correct / negative, read-back [CORRECTION]",
        "notes": [
          "Mandatory readback items include: runway in use, altimeter settings (QNH/QFE), taxi clearances, hold short instructions, level/altitude instructions, headings, speed instructions, transponder codes.",
          "Always append your callsign to the end of the read-back.",
          "Never use 'Roger' or 'Wilco' as a substitute for a mandatory read-back.",
          "If unsure, ask ATC to 'SAY AGAIN' rather than guessing."
        ],
        "reference": "ICAO Doc 4444, Chapter 12; DGCA Advisory Circular AC-04",
        "example": [
          {
            "speaker": "atc",
            "text": "SpiceJet 432, climb FL 280, turn left heading 260."
          },
          {
            "speaker": "pilot",
            "text": "Climb FL 280, turn left heading 260, SpiceJet 432."
          },
          {
            "speaker": "atc",
            "text": "SpiceJet 432, readback correct."
          }
        ]
      },
      {
        "id": "correction",
        "title": "Correction Transmission",
        "whenToUse": "Used when an error has been made during transmission. The speaker states 'CORRECTION', followed by the last correct item or phrase, and then transmits the correct version.",
        "pilotTemplate": "... [INCORRECT_PART] CORRECTION [CORRECT_PART] ...",
        "atcTemplate": "[CALLSIGN], acknowledge / confirm [CORRECTED_ITEM]",
        "notes": [
          "Use 'CORRECTION' immediately upon realizing a verbal slip.",
          "State the last correct item before repeating the revised instruction.",
          "If an entire sentence is wrong, say 'CORRECTION, I SAY AGAIN' and restart.",
          "Common exam question: Explain how to correct a spoken FL 320 to FL 340."
        ],
        "reference": "ICAO Annex 10, Vol II, 5.2.1.5",
        "example": [
          {
            "speaker": "pilot",
            "text": "Mumbai Radar, IndiGo 521, descending to FL 220 — CORRECTION — descending to FL 240, passing FL 290."
          },
          {
            "speaker": "atc",
            "text": "IndiGo 521, Roger, descend to FL 240, QNH 1012."
          },
          {
            "speaker": "pilot",
            "text": "Descend to FL 240, QNH 1012, IndiGo 521."
          }
        ]
      },
      {
        "id": "how-do-you-read",
        "title": "Signal Readability & Radio Check",
        "whenToUse": "Used to assess the clarity and strength of radio transmission using the standard 1 to 5 readability scale.",
        "pilotTemplate": "[STATION], [CALLSIGN], how do you read?",
        "atcTemplate": "[CALLSIGN], [STATION], read you [SCALE_1_TO_5] (e.g., readability 5 / 3 with background hum)",
        "notes": [
          "1 = Unreadable, 2 = Readable now and then, 3 = Readable with difficulty, 4 = Readable, 5 = Perfectly readable.",
          "Do NOT use arbitrary non-standard terms like 'loud and clear' or 'five by five' in DGCA Part 2 exams.",
          "If readability is 1 or 2, switch to alternate VHF box or standby frequency.",
          "Radio checks should not exceed 10 seconds."
        ],
        "reference": "ICAO Annex 10, Vol II, 5.2.1.8",
        "example": [
          {
            "speaker": "pilot",
            "text": "Kolkata Radio, VT-AER, on 125.7, how do you read?"
          },
          {
            "speaker": "atc",
            "text": "VT-AER, Kolkata Radio, read you 4, slight background noise."
          },
          {
            "speaker": "pilot",
            "text": "Read you 5, Kolkata, VT-AER."
          }
        ]
      },
      {
        "id": "words-twice",
        "title": "Words Twice Procedure",
        "whenToUse": "Used when communication is difficult due to atmospheric interference, weak signal, or high background noise. Each word or phrase is spoken twice.",
        "pilotTemplate": "[STATION], [CALLSIGN], request WORDS TWICE / [PHRASE] [PHRASE]",
        "atcTemplate": "[CALLSIGN], [STATION], WORDS TWICE, [MESSAGE_SPOKEN_TWICE]",
        "notes": [
          "As a request: 'WORDS TWICE' means please send every phrase twice.",
          "As information: 'COMMUNICATION IS DIFFICULT, WORDS TWICE'.",
          "Used extensively on long-range HF channels or degraded VHF.",
          "Frequently tested in DGCA oral Part 2 tests."
        ],
        "reference": "ICAO Annex 10, Vol II, 5.2.1.5.3",
        "example": [
          {
            "speaker": "pilot",
            "text": "Chennai Radio, VT-SHR, readability 2, request WORDS TWICE."
          },
          {
            "speaker": "atc",
            "text": "VT-SHR, VT-SHR, Chennai Radio, Chennai Radio, CLIMB FL 310, CLIMB FL 310."
          },
          {
            "speaker": "pilot",
            "text": "CLIMB FL 310, CLIMB FL 310, VT-SHR, VT-SHR."
          }
        ]
      },
      {
        "id": "relay",
        "title": "Relay of Messages",
        "whenToUse": "Used when an aircraft or ATC unit cannot communicate directly with the intended recipient and requests another aircraft or station to relay transmissions.",
        "pilotTemplate": "[RELAY_STATION], [CALLSIGN], request you relay to [TARGET_STATION] [MESSAGE]",
        "atcTemplate": "[TARGET_STATION], this is [RELAY_STATION] relaying for [CALLSIGN]: [MESSAGE]",
        "notes": [
          "Always specify that you are relaying on behalf of another aircraft.",
          "Include the transmitting aircraft's original callsign and timestamp.",
          "Aircraft on 121.5 MHz guard frequency frequently relay emergency messages."
        ],
        "reference": "ICAO Annex 10, Vol II, 5.2.1.7",
        "example": [
          {
            "speaker": "pilot",
            "text": "Air India 456, VT-AER on 121.5, unable contact Ahmedabad, request relay our position report."
          },
          {
            "speaker": "pilot",
            "text": "Ahmedabad Control, Air India 456 relaying for VT-AER: VT-AER over RAJAT at 0412, FL 180, estimating APANO 0438."
          },
          {
            "speaker": "atc",
            "text": "Air India 456, Ahmedabad Control, Roger, tell VT-AER to squawk 3341 and contact Ahmedabad 124.75."
          }
        ]
      },
      {
        "id": "test-transmission",
        "title": "Test Transmission (Radio Check)",
        "whenToUse": "Conducted prior to departure or after radio maintenance to verify operational integrity of radio equipment without interfering with normal ATC traffic.",
        "pilotTemplate": "[STATION], [CALLSIGN], test transmission on [FREQUENCY] 1, 2, 3, 4, 5, how do you read?",
        "atcTemplate": "[CALLSIGN], [STATION], read you 5 / test transmission readable",
        "notes": [
          "Never perform a test transmission without including your callsign.",
          "Transmission must not exceed 10 seconds; counting 1 through 5 is standard.",
          "Conduct on designated ground or flight service frequency, never on active tower or emergency guard."
        ],
        "reference": "ICAO Doc 9432, Chapter 2",
        "example": [
          {
            "speaker": "pilot",
            "text": "Delhi Ground, Akasa 1102, radio check on 121.9, 1, 2, 3, 4, 5."
          },
          {
            "speaker": "atc",
            "text": "Akasa 1102, Delhi Ground, read you 5."
          },
          {
            "speaker": "pilot",
            "text": "Read you 5 also, Akasa 1102."
          }
        ]
      },
      {
        "id": "broadcast",
        "title": "Broadcast Transmission (TIBA)",
        "whenToUse": "Transmissions made when operating in uncontrolled airspace (Class G) or when ATC ground facilities are temporarily unavailable, informing other traffic in the vicinity.",
        "pilotTemplate": "ALL STATIONS, [CALLSIGN], [TYPE], [POSITION], [LEVEL], [TRACK/INTENTIONS]",
        "atcTemplate": "No ATC response expected; other aircraft in vicinity reply if conflicting",
        "notes": [
          "Used for Traffic Information Broadcasts by Aircraft (TIBA).",
          "Broadcast on designated VHF en-route advisory frequency or 126.9 MHz.",
          "Broadcast 10 minutes prior to entering airspace and at each reporting point."
        ],
        "reference": "ICAO Annex 11, Attachment B; DGCA CAR Section 9",
        "example": [
          {
            "speaker": "pilot",
            "text": "ALL STATIONS, VT-AER, Cessna 172, 15 miles south of Aligarh, altitude 3,500 feet, tracking 340 towards Meerut, estimating Meerut at 0925."
          }
        ]
      },
      {
        "id": "position-report",
        "title": "Standard Position Report",
        "whenToUse": "Mandatory verbal report given when crossing compulsory reporting points in non-radar environments or when requested by ATC.",
        "pilotTemplate": "[STATION], [CALLSIGN], POSITION [REPORTING_POINT] AT [TIME], [LEVEL], ESTIMATING [NEXT_POINT] AT [TIME], [SUCCEEDING_POINT]",
        "atcTemplate": "[CALLSIGN], [STATION], Roger, report over [NEXT_POINT]",
        "notes": [
          "Standard order: Identification, Position, Time, Flight Level, Next Position and ETA, Succeeding reporting point.",
          "In radar environment, ATC may state 'OMIT POSITION REPORTS'.",
          "Times are always expressed in UTC (Universal Time Coordinated)."
        ],
        "reference": "ICAO Doc 4444, Section 4.11; DGCA AIP India ENR 1.2",
        "example": [
          {
            "speaker": "pilot",
            "text": "Mumbai Control, Air India 302, position BUTOP at 0725, FL 360, estimating TEBRO at 0755, next BADOT."
          },
          {
            "speaker": "atc",
            "text": "Air India 302, Mumbai Control, Roger, maintain FL 360, report TEBRO."
          },
          {
            "speaker": "pilot",
            "text": "Maintain FL 360, report TEBRO, Air India 302."
          }
        ]
      },
      {
        "id": "time-check",
        "title": "Aeronautical Time Check",
        "whenToUse": "Used to synchronize onboard clocks with the official ATC master chronometer (UTC) for navigation and reporting accuracy.",
        "pilotTemplate": "[STATION], [CALLSIGN], request time check",
        "atcTemplate": "[CALLSIGN], [STATION], TIME [HOURS] [MINUTES] [SECONDS] / TIME [MINUTES] AND A HALF",
        "notes": [
          "Time is checked to the nearest half-minute or second.",
          "Always recorded in UTC / Zulu time.",
          "Critical in procedural airspace where longitudinal separation is based on exact time estimates."
        ],
        "reference": "ICAO Annex 10, Vol II, 5.2.1.4",
        "example": [
          {
            "speaker": "pilot",
            "text": "Kolkata Tower, VT-SHR, request time check."
          },
          {
            "speaker": "atc",
            "text": "VT-SHR, Kolkata Tower, time is 06 hours 24 minutes and 20 seconds."
          },
          {
            "speaker": "pilot",
            "text": "0624 and 20 seconds, VT-SHR."
          }
        ]
      },
      {
        "id": "cancel-ifr",
        "title": "Cancelling IFR Flight Plan",
        "whenToUse": "Used when an IFR flight wishes to change to VFR in flight, transferring traffic separation responsibility to the pilot.",
        "pilotTemplate": "[STATION], [CALLSIGN], CANCEL IFR, REQUEST VFR TO [DESTINATION]",
        "atcTemplate": "[CALLSIGN], IFR CANCELLED AT [TIME], SQUAWK [VFR_CODE], CONTACT [INFORMATION_STATION] [FREQUENCY]",
        "notes": [
          "ATC cannot solicit IFR cancellation; it must be voluntarily initiated by PIC.",
          "After cancellation, IFR separation is no longer provided.",
          "Squawk changes from assigned IFR squawk to VFR code (typically 2000 in India)."
        ],
        "reference": "ICAO Doc 4444, Chapter 6; DGCA CAR Section 7",
        "example": [
          {
            "speaker": "pilot",
            "text": "Jaipur Approach, VT-SHR, cancel IFR, request VFR to Udaipur."
          },
          {
            "speaker": "atc",
            "text": "VT-SHR, IFR cancelled at 0830, squawk 2000, no further IFR separation provided. QNH 1013, contact Jaipur Information 124.3."
          },
          {
            "speaker": "pilot",
            "text": "IFR cancelled, squawk 2000, QNH 1013, contact Jaipur Information 124.3, VT-SHR."
          }
        ]
      },
      {
        "id": "transfer-of-communication",
        "title": "Transfer of Communication / Frequency Change",
        "whenToUse": "Used when ATC transfers an aircraft to a different frequency or ATC unit. The pilot reads back the new frequency and callsign, then contacts the new station.",
        "pilotTemplate": "CONTACT [STATION] [FREQUENCY], [CALLSIGN] — (read-back of ATC instruction)",
        "atcTemplate": "[CALLSIGN], CONTACT [STATION] [FREQUENCY]",
        "notes": [
          "Frequency must always be read back by the pilot.",
          "If unable to establish contact on new frequency, return to previous frequency immediately.",
          "'MONITOR' means listen on frequency without transmitting; 'CONTACT' means initiate transmission.",
          "ATC instruction 'STANDBY [frequency]' means switch and wait for ATC to call you."
        ],
        "reference": "ICAO Annex 10, Vol II, 5.2.1.6; ICAO Doc 4444, Chapter 8",
        "example": [
          {
            "speaker": "atc",
            "text": "VT-AER, contact Mumbai Control on 132.35."
          },
          {
            "speaker": "pilot",
            "text": "Contact Mumbai Control 132.35, VT-AER."
          },
          {
            "speaker": "pilot",
            "text": "Mumbai Control, VT-AER, FL 370, maintaining Mach 0.78."
          },
          {
            "speaker": "atc",
            "text": "VT-AER, Mumbai Control, radar contact, maintain FL 370."
          }
        ]
      }
    ]
  },
  {
    "id": "pre-departure",
    "label": "Pre-Departure & Ground",
    "icon": "ClipboardList",
    "topics": [
      {
        "id": "request-atis",
        "title": "Request / Acknowledge ATIS",
        "whenToUse": "Used to obtain or acknowledge receipt of Automatic Terminal Information Service broadcast regarding aerodrome weather and operational status.",
        "pilotTemplate": "[STATION], [CALLSIGN], INFORMATION [ALPHABET_CODE] RECEIVED, QNH [PRESSURE], [REQUEST]",
        "atcTemplate": "[CALLSIGN], [STATION], INFORMATION [ALPHABET_CODE] CURRENT, QNH [PRESSURE], [CLEARANCE/INSTRUCTION]",
        "notes": [
          "ATIS broadcasts are identified sequentially by ICAO phonetic letters (Alpha, Bravo, Charlie...).",
          "Must confirm current ATIS letter and QNH on initial call to Delivery or Ground.",
          "If ATIS is unserviceable, request weather directly from ATC."
        ],
        "reference": "ICAO Annex 11, Chapter 4; DGCA CAR Section 9",
        "example": [
          {
            "speaker": "pilot",
            "text": "Delhi Delivery, IndiGo 204, Stand 32, with Information Delta, QNH 1014, request IFR clearance to Mumbai."
          },
          {
            "speaker": "atc",
            "text": "IndiGo 204, Delhi Delivery, Information Delta current, QNH 1014, standby for clearance."
          }
        ]
      },
      {
        "id": "request-departure-clearance",
        "title": "Request Departure Clearance (IFR)",
        "whenToUse": "Requesting the initial route, SID, initial altitude, and squawk code from ATC clearance delivery before engine start.",
        "pilotTemplate": "[STATION_DELIVERY], [CALLSIGN], [STAND_NUMBER], INFORMATION [CODE], REQUEST IFR CLEARANCE TO [DESTINATION]",
        "atcTemplate": "[CALLSIGN], CLEARED TO [DESTINATION], [SID] DEPARTURE, RUNWAY [RWY], CLIMB TO [ALTITUDE], SQUAWK [CODE]",
        "notes": [
          "Use CRAFT format to organize: Clearance limit, Route, Altitude, Frequency, Transponder.",
          "Full read-back of all clearance components is mandatory.",
          "Do not commence pushback until ATC clearance is fully acknowledged."
        ],
        "reference": "ICAO Doc 4444, Chapter 6; DGCA CAR Section 7",
        "example": [
          {
            "speaker": "pilot",
            "text": "Mumbai Delivery, Air India 805, Stand 45, Information Charlie, request clearance to Delhi."
          },
          {
            "speaker": "atc",
            "text": "Air India 805, cleared to Delhi via EXOLU 1A departure, RWY 27, initial climb FL 080, squawk 4321."
          },
          {
            "speaker": "pilot",
            "text": "Cleared to Delhi via EXOLU 1A departure, RWY 27, initial climb FL 080, squawk 4321, Air India 805."
          },
          {
            "speaker": "atc",
            "text": "Air India 805, readback correct, contact Ground 121.9 when ready for push and start."
          }
        ]
      },
      {
        "id": "obtain-startup",
        "title": "Obtain Startup & Pushback Clearance",
        "whenToUse": "Requesting approval to start engines and push back from the parking bay into the taxiway.",
        "pilotTemplate": "[STATION_GROUND], [CALLSIGN], STAND [NUMBER], REQUEST PUSH AND START, [AIRCRAFT_HEADING/INTENTION]",
        "atcTemplate": "[CALLSIGN], [STATION_GROUND], PUSH AND START APPROVED, FACING [DIRECTION], QNH [VALUE]",
        "notes": [
          "Ensure ground crew is in intercom contact before requesting pushback.",
          "Report any towbar or tug disconnects immediately.",
          "Altimeter QNH should be verified during start approval."
        ],
        "reference": "ICAO Doc 4444, Chapter 7",
        "example": [
          {
            "speaker": "pilot",
            "text": "Delhi Ground, SpiceJet 712, Stand 24, request push and start, facing west."
          },
          {
            "speaker": "atc",
            "text": "SpiceJet 712, Delhi Ground, push and start approved facing west, QNH 1013."
          },
          {
            "speaker": "pilot",
            "text": "Push and start approved facing west, QNH 1013, SpiceJet 712."
          }
        ]
      },
      {
        "id": "taxi-instructions",
        "title": "Taxi Instructions & Holding Points",
        "whenToUse": "Requesting taxi clearance from apron to the active runway holding point, including taxi routes and intermediate stops.",
        "pilotTemplate": "[STATION_GROUND], [CALLSIGN], REQUEST TAXI",
        "atcTemplate": "[CALLSIGN], TAXI TO HOLDING POINT RUNWAY [RWY] VIA [TAXIWAYS], HOLD SHORT OF [RUNWAY/POINT]",
        "notes": [
          "All runway crossing instructions and holding point assignments MUST be read back verbatim.",
          "Never cross a solid red stop bar or enter an active runway without explicit clearance.",
          "If taxiway signage is unclear, halt aircraft and request progressive taxi instructions."
        ],
        "reference": "ICAO Doc 9870 (Runway Incursion Prevention); DGCA CAR Section 4",
        "example": [
          {
            "speaker": "pilot",
            "text": "Bengaluru Ground, Akasa 1421, on Apron 2, ready to taxi."
          },
          {
            "speaker": "atc",
            "text": "Akasa 1421, taxi to holding point RWY 09L via Taxiway Mike, Bravo, hold short of RWY 09R."
          },
          {
            "speaker": "pilot",
            "text": "Taxi to holding point RWY 09L via Mike, Bravo, hold short of RWY 09R, Akasa 1421."
          }
        ]
      },
      {
        "id": "cross-runway",
        "title": "Cross Runway During Taxi",
        "whenToUse": "Clearance to cross an active or inactive runway during surface transit to or from the gate.",
        "pilotTemplate": "[STATION_GROUND/TOWER], [CALLSIGN], HOLDING SHORT RUNWAY [RWY], REQUEST CROSS",
        "atcTemplate": "[CALLSIGN], CROSS RUNWAY [RWY] AT TAXIWAY [NAME], REPORT VACATED",
        "notes": [
          "Mandatory read-back: 'CROSS RUNWAY [number]'.",
          "Aircraft must turn on strobe lights when crossing any runway.",
          "Report immediately when aircraft and tail have completely cleared the runway holding boundary."
        ],
        "reference": "ICAO Doc 4444, 7.5.3; DGCA AC on Aerodrome Operations",
        "example": [
          {
            "speaker": "atc",
            "text": "Air India 512, cross runway 28 at Taxiway November, report vacated."
          },
          {
            "speaker": "pilot",
            "text": "Cross runway 28 at Taxiway November, report vacated, Air India 512."
          },
          {
            "speaker": "pilot",
            "text": "Air India 512, runway 28 vacated, on taxiway Alpha."
          },
          {
            "speaker": "atc",
            "text": "Air India 512, Roger, continue taxi to Stand 18 via Alpha."
          }
        ]
      },
      {
        "id": "runway-line-up",
        "title": "Line Up and Wait Clearance",
        "whenToUse": "Instruction to taxi onto the departure runway and align with the centerline, holding position until takeoff clearance.",
        "pilotTemplate": "LINE UP AND WAIT RUNWAY [RWY], [CALLSIGN]",
        "atcTemplate": "[CALLSIGN], RUNWAY [RWY], LINE UP AND WAIT, [TRAFFIC_ADVISORY]",
        "notes": [
          "Line up and wait is NOT a takeoff clearance.",
          "Verify final approach path is clear of landing aircraft before entering runway.",
          "If held on runway for more than 90 seconds without takeoff clearance, call tower to confirm status."
        ],
        "reference": "ICAO Doc 4444, 12.3.4.2",
        "example": [
          {
            "speaker": "atc",
            "text": "IndiGo 884, runway 27, line up and wait, traffic landing on parallel runway."
          },
          {
            "speaker": "pilot",
            "text": "Runway 27, line up and wait, IndiGo 884."
          }
        ]
      },
      {
        "id": "takeoff-clearance",
        "title": "Takeoff Clearance",
        "whenToUse": "Authorization from Tower controller to apply takeoff thrust and depart the runway.",
        "pilotTemplate": "RUNWAY [RWY], CLEARED FOR TAKEOFF, [CALLSIGN]",
        "atcTemplate": "[CALLSIGN], WIND [DIRECTION] DEGREES [SPEED] KNOTS, RUNWAY [RWY], CLEARED FOR TAKEOFF",
        "notes": [
          "Takeoff clearance must include runway designation and surface wind.",
          "Mandatory read-back includes 'CLEARED FOR TAKEOFF' and the runway identifier.",
          "Never abbreviate takeoff clearance with 'Roger' or 'Taking off'."
        ],
        "reference": "ICAO Doc 4444, 12.3.4.3; DGCA CAR Section 7",
        "example": [
          {
            "speaker": "atc",
            "text": "SpiceJet 301, wind 280 degrees 12 knots, runway 28, cleared for takeoff."
          },
          {
            "speaker": "pilot",
            "text": "Runway 28, cleared for takeoff, SpiceJet 301."
          }
        ]
      },
      {
        "id": "revised-departure",
        "title": "Revised / Amended Departure Clearance",
        "whenToUse": "Issued by ATC when traffic flow, slot times, or meteorological factors require modifying the original departure clearance.",
        "pilotTemplate": "[STATION], [CALLSIGN], [READBACK_REVISED_CLEARANCE]",
        "atcTemplate": "[CALLSIGN], CANCEL PREVIOUS CLEARANCE, CLEARED TO [DESTINATION] VIA [REVISED_SID], SQUAWK [NEW_CODE]",
        "notes": [
          "Acknowledge cancellation of previous clearance explicitly.",
          "Reprogram Flight Management System (FMS) and cross-check both pilots.",
          "Ensure new transponder squawk is set and cross-verified."
        ],
        "reference": "ICAO Doc 4444, Chapter 6",
        "example": [
          {
            "speaker": "atc",
            "text": "Air India 118, cancel previous clearance. Recleared to Chennai via KARIK 2B departure, initial climb FL 090."
          },
          {
            "speaker": "pilot",
            "text": "Cancel previous clearance, recleared to Chennai via KARIK 2B departure, initial climb FL 090, Air India 118."
          }
        ]
      },
      {
        "id": "pushback-request",
        "title": "Pushback Disconnect & Hand Signals",
        "whenToUse": "Coordination between cockpit and tug crew after completion of pushback and engine stabilization.",
        "pilotTemplate": "TUG DISCONNECTED, STEERING PIN REMOVED, REPORTING CLEAR FOR TAXI",
        "atcTemplate": "[GROUND CREW]: Towbar disconnected, bypass pin removed, see you on left side with pin and streamer.",
        "notes": [
          "Pilot checks left/right side to sight ground handler showing bypass pin with red streamer before taxiing.",
          "Do not turn on taxi light until ground crew is in safe visual zone.",
          "Confirm parking brake set before ground crew disconnects towbar."
        ],
        "reference": "IATA Airport Handling Manual (AHM 910)",
        "example": [
          {
            "speaker": "pilot",
            "text": "Cockpit to ground: engines stabilized, brakes set, ready to disconnect."
          },
          {
            "speaker": "atc",
            "text": "Ground to cockpit: chocks in, towbar disconnecting, bypass pin removed, wait for visual wave on left side."
          },
          {
            "speaker": "pilot",
            "text": "Holding position, looking for pin on left side."
          }
        ]
      },
      {
        "id": "holding-short-clearance",
        "title": "Holding Short of Runway / Stop Bar",
        "whenToUse": "Standard phraseology when reaching designated holding positions before entering active surfaces.",
        "pilotTemplate": "[CALLSIGN], HOLDING SHORT RUNWAY [RWY] AT TAXIWAY [NAME]",
        "atcTemplate": "[CALLSIGN], [STATION], HOLD POSITION, EXPECT DEPARTURE IN [TIME] MINUTES",
        "notes": [
          "Always state current exact location and holding point.",
          "Never cross lit red stop bars under any circumstance.",
          "Essential question in DGCA Part 2 oral examinations."
        ],
        "reference": "ICAO Annex 14, Aerodromes; DGCA CAR Section 4",
        "example": [
          {
            "speaker": "pilot",
            "text": "Delhi Tower, Vistara 705, holding short of runway 11 at Taxiway Echo."
          },
          {
            "speaker": "atc",
            "text": "Vistara 705, Delhi Tower, hold short runway 11, traffic landing Airbus A350."
          },
          {
            "speaker": "pilot",
            "text": "Holding short runway 11, Vistara 705."
          }
        ]
      }
    ]
  },
  {
    "id": "departure",
    "label": "Departure",
    "icon": "PlaneTakeoff",
    "topics": [
      {
        "id": "initial-climb",
        "title": "Initial Climb & Radar Contact",
        "whenToUse": "First call to Departure Radar after becoming airborne, reporting current passing altitude and assigned flight level.",
        "pilotTemplate": "[STATION_DEPARTURE], [CALLSIGN], AIRBORNE RUNWAY [RWY], PASSING [ALTITUDE] CLIMBING TO [ASSIGNED_LEVEL], FOLLOWING [SID]",
        "atcTemplate": "[CALLSIGN], [STATION_DEPARTURE], RADAR CONTACT, CLIMB TO [LEVEL], [FURTHER_INSTRUCTION]",
        "notes": [
          "State both passing altitude and cleared altitude on initial contact.",
          "Verify transponder Mode C altitude matches cockpit altimeter within 200 feet.",
          "Confirm SID name on initial departure call."
        ],
        "reference": "ICAO Doc 4444, 12.3.5",
        "example": [
          {
            "speaker": "pilot",
            "text": "Delhi Departure, IndiGo 603, airborne runway 28, passing 1,800 feet climbing to FL 080, following BUTOP 1A departure."
          },
          {
            "speaker": "atc",
            "text": "IndiGo 603, Delhi Departure, radar contact, climb to FL 140, cancel speed restriction."
          },
          {
            "speaker": "pilot",
            "text": "Climb to FL 140, speed restriction cancelled, IndiGo 603."
          }
        ]
      },
      {
        "id": "noise-abatement",
        "title": "Noise Abatement Departure Procedures (NADP)",
        "whenToUse": "Procedures flown during initial climb to minimize aircraft engine noise over populated residential zones surrounding the aerodrome.",
        "pilotTemplate": "[STATION], [CALLSIGN], REQUEST [NADP1 / NADP2] DEPARTURE PROFILE",
        "atcTemplate": "[CALLSIGN], [STATION], APPROVED / MAINTAIN HEADING UNTIL PASSING [ALTITUDE]",
        "notes": [
          "NADP 1: Noise alleviation close to aerodrome (thrust reduction at 800ft, accelerate at 3000ft).",
          "NADP 2: Noise alleviation distant from aerodrome (thrust reduction and acceleration at 800ft).",
          "Comply strictly with published SID turn and altitude restrictions."
        ],
        "reference": "ICAO PANS-OPS Doc 8168, Vol I; DGCA CAR Section 8",
        "example": [
          {
            "speaker": "atc",
            "text": "Air India 310, noise abatement in effect, maintain runway heading until 4,000 feet."
          },
          {
            "speaker": "pilot",
            "text": "Maintain runway heading until 4,000 feet, Air India 310."
          }
        ]
      },
      {
        "id": "sid-departure",
        "title": "Standard Instrument Departure (SID) Compliance",
        "whenToUse": "Flying and conforming to published navigational SID routes, waypoint constraints, and climb gradients.",
        "pilotTemplate": "[CALLSIGN], MAINTAINING [SID_NAME], PASSING [WAYPOINT] AT [ALTITUDE]",
        "atcTemplate": "[CALLSIGN], CLIMB VIA SID TO [LEVEL] / OPEN CLIMB [LEVEL]",
        "notes": [
          "'Climb via SID': Comply with all published altitude and speed constraints.",
          "'Climb unrestricted': Cancel all intermediate level constraints and climb directly.",
          "DGCA examiner favorite: Difference between 'CLIMB VIA SID' and 'CLIMB TO FLxxx'."
        ],
        "reference": "ICAO Doc 4444, Chapter 6; DGCA AIP Supplement",
        "example": [
          {
            "speaker": "atc",
            "text": "Akasa 114, climb via SID to FL 180."
          },
          {
            "speaker": "pilot",
            "text": "Climb via SID to FL 180, Akasa 114."
          },
          {
            "speaker": "pilot",
            "text": "Akasa 114, passing waypoint REXOD at 9,000 feet."
          }
        ]
      },
      {
        "id": "turn-after-takeoff",
        "title": "Turn Instructions After Takeoff",
        "whenToUse": "ATC radar vectoring instructions given shortly after takeoff for sequencing or obstacle clearance.",
        "pilotTemplate": "[CALLSIGN], TURN [LEFT/RIGHT] HEADING [HEADING_DEG]",
        "atcTemplate": "[CALLSIGN], PASSING [ALTITUDE], TURN [LEFT/RIGHT] HEADING [HEADING_DEG], REPORT ESTABLISHED",
        "notes": [
          "Do not initiate turns below 400 feet AGL unless published in departure procedure.",
          "Maintain standard rate one turn (3 degrees per second) or 25 degree bank angle.",
          "Read back direction and degrees of heading precisely."
        ],
        "reference": "ICAO Doc 8168, PANS-OPS; DGCA CAR Section 7",
        "example": [
          {
            "speaker": "atc",
            "text": "SpiceJet 891, passing 2,500 feet, turn right heading 040."
          },
          {
            "speaker": "pilot",
            "text": "Passing 2,500 feet, turn right heading 040, SpiceJet 891."
          }
        ]
      },
      {
        "id": "acceleration-altitude",
        "title": "Acceleration & Flap Retraction",
        "whenToUse": "Procedure following reaching engine-out or standard acceleration altitude where flaps are retracted and en-route climb thrust set.",
        "pilotTemplate": "[CALLSIGN], PASSING ACCELERATION ALTITUDE, CLEAN AIRCRAFT",
        "atcTemplate": "[CALLSIGN], ROGER, RESUME NORMAL SPEED / NO SPEED RESTRICTIONS",
        "notes": [
          "Standard acceleration altitude is typically 1,000 ft or 1,500 ft AGL.",
          "Below 10,000 ft, standard maximum speed is 250 KIAS unless waived by ATC.",
          "Pilots must inform ATC if unable to meet published climb gradient (e.g. 5.2%)."
        ],
        "reference": "ICAO Annex 6, Operation of Aircraft",
        "example": [
          {
            "speaker": "pilot",
            "text": "Mumbai Departure, Air India 902, passing acceleration altitude, clean aircraft, request cancel 250 knot speed limit."
          },
          {
            "speaker": "atc",
            "text": "Air India 902, no speed restriction, climb FL 240."
          },
          {
            "speaker": "pilot",
            "text": "No speed restriction, climb FL 240, Air India 902."
          }
        ]
      },
      {
        "id": "radar-vectors-departure",
        "title": "Radar Vectors on Departure",
        "whenToUse": "When ATC terminates standard navigational routing and assumes heading guidance through radar vectors.",
        "pilotTemplate": "[CALLSIGN], LEAVING [SID_NAME], FLY HEADING [HEADING]",
        "atcTemplate": "[CALLSIGN], FLY HEADING [DEG], RADAR VECTORS FOR [SEQUENCING/SEPARATION/WEATHER]",
        "notes": [
          "Terrain clearance remains ATC responsibility when vectoring below minimum sector altitude.",
          "Pilot monitors minimum vectoring altitude (MVA) on charts.",
          "Read back heading and direction."
        ],
        "reference": "ICAO Doc 4444, Chapter 8",
        "example": [
          {
            "speaker": "atc",
            "text": "IndiGo 211, fly heading 180, radar vectors for traffic spacing, climb FL 210."
          },
          {
            "speaker": "pilot",
            "text": "Heading 180, vectors for spacing, climb FL 210, IndiGo 211."
          }
        ]
      },
      {
        "id": "contact-approach-departure",
        "title": "Transfer to En Route Control",
        "whenToUse": "Handoff from terminal area departure frequency to the ACC area control center.",
        "pilotTemplate": "CONTACT [ACC_STATION] [FREQUENCY], [CALLSIGN]",
        "atcTemplate": "[CALLSIGN], CONTACT [ACC_STATION] ON [FREQUENCY]",
        "notes": [
          "Ensure all pending departure climb clearances are read back before changing frequency.",
          "Check standby box has the new en route frequency active.",
          "State current level and cleared level on initial check-in with ACC."
        ],
        "reference": "ICAO Doc 4444, Chapter 12",
        "example": [
          {
            "speaker": "atc",
            "text": "Vistara 412, contact Delhi Control on 133.65."
          },
          {
            "speaker": "pilot",
            "text": "Contact Delhi Control on 133.65, Vistara 412."
          }
        ]
      },
      {
        "id": "cancel-sid",
        "title": "Cancel SID & Direct Routing",
        "whenToUse": "When ATC clears the departure aircraft directly to an en-route waypoint, bypassing remaining SID waypoints.",
        "pilotTemplate": "DIRECT [WAYPOINT], [CALLSIGN]",
        "atcTemplate": "[CALLSIGN], CANCEL SID, PROCEED DIRECT [WAYPOINT], CLIMB FL [LEVEL]",
        "notes": [
          "Verify terrain clearance between current position and direct waypoint.",
          "SID altitude constraints are superseded unless ATC explicitly repeats them.",
          "Reprogram route in GPS/FMS and cross-check CDI track."
        ],
        "reference": "ICAO Doc 4444, Section 8.6; DGCA CAR Section 7",
        "example": [
          {
            "speaker": "atc",
            "text": "Air India 651, cancel SID, proceed direct to EKURI, climb FL 280."
          },
          {
            "speaker": "pilot",
            "text": "Cancel SID, direct EKURI, climb FL 280, Air India 651."
          }
        ]
      }
    ]
  },
  {
    "id": "en-route",
    "label": "En Route",
    "icon": "Route",
    "topics": [
      {
        "id": "level-change",
        "title": "Cruising Level Change Request",
        "whenToUse": "Requesting a change in cruising flight level due to meteorological factors, clear air turbulence, or fuel economy.",
        "pilotTemplate": "[STATION], [CALLSIGN], REQUEST CLIMB / DESCENT TO FL [LEVEL] DUE [REASON]",
        "atcTemplate": "[CALLSIGN], CLIMB / DESCEND TO FL [LEVEL], REPORT REACHING",
        "notes": [
          "Levels follow semicircular rule in India: Eastbound (000°-179°) ODD FL, Westbound (180°-359°) EVEN FL.",
          "Standard rate of climb/descent should be maintained (at least 500 ft/min unless ATC informed).",
          "Report 'LEAVING' and 'REACHING' flight levels."
        ],
        "reference": "ICAO Annex 2, Appendix 3; DGCA CAR Section 9",
        "example": [
          {
            "speaker": "pilot",
            "text": "Mumbai Control, IndiGo 401, request climb to FL 370 due turbulence at FL 350."
          },
          {
            "speaker": "atc",
            "text": "IndiGo 401, climb to FL 370, report reaching."
          },
          {
            "speaker": "pilot",
            "text": "Climb to FL 370, report reaching, IndiGo 401."
          },
          {
            "speaker": "pilot",
            "text": "Mumbai Control, IndiGo 401, reaching FL 370."
          }
        ]
      },
      {
        "id": "position-reporting",
        "title": "En Route Compulsory Position Report",
        "whenToUse": "Periodic progress reports transmitted when crossing designated ATS navigational waypoints.",
        "pilotTemplate": "[STATION], [CALLSIGN], POSITION [WAYPOINT] AT [TIME], FL [LEVEL], ESTIMATING [NEXT_WAYPOINT] AT [TIME], [SUCCEEDING_WAYPOINT]",
        "atcTemplate": "[CALLSIGN], [STATION], ROGER, NEXT REPORT OVER [NEXT_WAYPOINT]",
        "notes": [
          "Mandatory in procedural (non-radar) airspace.",
          "If estimated time over next point changes by more than 2 minutes (or 3 min in certain FIRs), notify ATC immediately.",
          "Always give times in 4-digit UTC format."
        ],
        "reference": "ICAO Doc 4444, 4.11; DGCA AIP India ENR 1.2",
        "example": [
          {
            "speaker": "pilot",
            "text": "Kolkata Control, Air India 122, position SAGAR at 0345, FL 330, estimating TEPAL at 0418, next BILIK."
          },
          {
            "speaker": "atc",
            "text": "Air India 122, Kolkata Control, Roger, maintain FL 330, report TEPAL."
          }
        ]
      },
      {
        "id": "speed-control",
        "title": "En Route Speed Control Instructions",
        "whenToUse": "Speed adjustments assigned by ATC to establish or maintain longitudinal radar separation between aircraft on the same track.",
        "pilotTemplate": "[CALLSIGN], MAINTAIN [SPEED_IN_KNOTS / MACH_NUMBER]",
        "atcTemplate": "[CALLSIGN], MAINTAIN MACH [NUMBER] / REDUCE SPEED TO [KNOTS] KNOTS INDICATED",
        "notes": [
          "Above FL 250, speeds are assigned in Mach numbers (e.g. Mach decimal 78).",
          "Speed tolerance is +/- 10 knots or +/- Mach 0.01.",
          "Inform ATC immediately if unable to comply with speed assignment due to aircraft performance."
        ],
        "reference": "ICAO Doc 4444, 8.6.9",
        "example": [
          {
            "speaker": "atc",
            "text": "Vistara 802, for traffic separation, maintain Mach 0.76 or greater."
          },
          {
            "speaker": "pilot",
            "text": "Maintain Mach 0.76 or greater, Vistara 802."
          }
        ]
      },
      {
        "id": "heading-assignment",
        "title": "Radar Vectoring & Heading Clearances",
        "whenToUse": "Directions assigned by ATC to divert aircraft temporarily off airways for separation or traffic flow.",
        "pilotTemplate": "[CALLSIGN], TURN [LEFT/RIGHT] [DEGREES] HEADING [HEADING_DEG]",
        "atcTemplate": "[CALLSIGN], TURN [LEFT/RIGHT] HEADING [DEG], VECTOR FOR [REASON]",
        "notes": [
          "When given a heading, track adherence is suspended until cleared 'RESUME OWN NAVIGATION'.",
          "State current heading if asked by ATC: 'HEADING [degrees]'.",
          "Wind drift compensation is NOT applied when flying an ATC assigned heading."
        ],
        "reference": "ICAO Doc 4444, Chapter 8",
        "example": [
          {
            "speaker": "atc",
            "text": "SpiceJet 614, turn left 20 degrees heading 070."
          },
          {
            "speaker": "pilot",
            "text": "Turn left 20 degrees heading 070, SpiceJet 614."
          }
        ]
      },
      {
        "id": "direct-routing",
        "title": "Direct Routing Clearance",
        "whenToUse": "Clearance to proceed directly from present position to an en-route waypoint, bypassing intermediate route segments.",
        "pilotTemplate": "PROCEED DIRECT TO [WAYPOINT], [CALLSIGN]",
        "atcTemplate": "[CALLSIGN], CLEARED DIRECT TO [WAYPOINT], RESUME OWN NAVIGATION",
        "notes": [
          "Verify terrain clearance along the direct leg.",
          "Update navigational computer and inform copilot.",
          "Advise ATC of revised estimates for downstream reporting points."
        ],
        "reference": "ICAO Doc 4444, Chapter 8",
        "example": [
          {
            "speaker": "atc",
            "text": "Air India 202, cleared direct to APANO, resume own navigation."
          },
          {
            "speaker": "pilot",
            "text": "Cleared direct to APANO, resume own navigation, Air India 202."
          }
        ]
      },
      {
        "id": "traffic-information",
        "title": "Traffic Advisory & Avoidance",
        "whenToUse": "ATC radar advisories warning of proximity to other airborne aircraft, and pilot response upon sighting.",
        "pilotTemplate": "[CALLSIGN], TRAFFIC IN SIGHT / LOOKING OUT / NEGATIVE CONTACT",
        "atcTemplate": "[CALLSIGN], TRAFFIC [CLOCK_POSITION] [DISTANCE] MILES, [DIRECTION]-BOUND, [TYPE], AT FL [LEVEL]",
        "notes": [
          "Clock reference is based on aircraft ground track, not heading.",
          "Response options: 'TRAFFIC IN SIGHT', 'LOOKING OUT', or 'NEGATIVE CONTACT'.",
          "If visual contact lost, advise ATC."
        ],
        "reference": "ICAO Doc 4444, Chapter 8; DGCA CAR Section 7",
        "example": [
          {
            "speaker": "atc",
            "text": "Akasa 304, traffic 11 o'clock, 8 miles, eastbound, Boeing 777, FL 360."
          },
          {
            "speaker": "pilot",
            "text": "Looking out, Akasa 304."
          },
          {
            "speaker": "pilot",
            "text": "Akasa 304, traffic in sight."
          }
        ]
      },
      {
        "id": "offset-track",
        "title": "Strategic Lateral Offset Procedures (SLOP)",
        "whenToUse": "Procedures to fly 1 or 2 nautical miles right of airway centerline to mitigate wake turbulence and reduce risk of head-on collisions.",
        "pilotTemplate": "[CALLSIGN], ADVISING OFFSET [1/2] MILES RIGHT OF TRACK",
        "atcTemplate": "[CALLSIGN], ROGER, REPORT REJOINING CENTERLINE",
        "notes": [
          "Authorized in oceanic and designated continental airspace.",
          "Offsets are always to the RIGHT of centerline, never to the left.",
          "Must return to centerline prior to entering terminal control airspace."
        ],
        "reference": "ICAO Doc 4444, Section 16.5; DGCA AIP India ENR 2.2",
        "example": [
          {
            "speaker": "pilot",
            "text": "Mumbai Oceanic, Air India 131, offsetting 2 miles right of track due wake turbulence."
          },
          {
            "speaker": "atc",
            "text": "Air India 131, Mumbai Oceanic, Roger, report rejoining track."
          }
        ]
      },
      {
        "id": "selcal-check",
        "title": "Selective Calling (SELCAL) Check",
        "whenToUse": "Testing the onboard SELCAL radio tone decoder on HF or VHF frequencies to relieve pilots of continuous radio listening watch.",
        "pilotTemplate": "[STATION], [CALLSIGN], REQUEST SELCAL CHECK [4-LETTER_CODE]",
        "atcTemplate": "[CALLSIGN], [STATION], TRANSMITTING SELCAL [CODE]",
        "notes": [
          "SELCAL code consists of four letters from A through S (excluding certain characters).",
          "Letters in each pair are in alphabetical order (e.g. AH-CK).",
          "When chime sounds, press PTT and state 'SELCAL OK'."
        ],
        "reference": "ICAO Annex 10, Vol II, Chapter 5",
        "example": [
          {
            "speaker": "pilot",
            "text": "Mumbai Radio on 5601, Air India 191, request SELCAL check code DJ-HM."
          },
          {
            "speaker": "atc",
            "text": "Air India 191, Mumbai Radio, sending SELCAL DJ-HM."
          },
          {
            "speaker": "pilot",
            "text": "SELCAL OK, Air India 191."
          }
        ]
      },
      {
        "id": "oceanic-entry",
        "title": "FIR Boundary Crossing / Oceanic Entry",
        "whenToUse": "Checking in with adjacent Flight Information Region (FIR) upon crossing territorial or oceanic airspace boundaries.",
        "pilotTemplate": "[NEW_FIR_CONTROL], [CALLSIGN], ESTIMATING BOUNDARY [WAYPOINT] AT [TIME], FL [LEVEL], MACH [NUMBER]",
        "atcTemplate": "[CALLSIGN], [NEW_FIR_CONTROL], RADAR CONTACT / PROCEDURAL IDENTIFICATION, SQUAWK [CODE]",
        "notes": [
          "Contact receiving FIR 10-15 minutes prior to boundary waypoint.",
          "Verify HF primary and secondary frequencies before entering oceanic zones.",
          "Ensure Mach number technique clearance is confirmed."
        ],
        "reference": "ICAO Doc 7030 (Regional Supplementary Procedures)",
        "example": [
          {
            "speaker": "pilot",
            "text": "Chennai Control, Emirates 502, entering FIR over NOBAT at 0812, FL 380, Mach 0.82."
          },
          {
            "speaker": "atc",
            "text": "Emirates 502, Chennai Control, radar contact, maintain FL 380."
          }
        ]
      },
      {
        "id": "frequency-change-enroute",
        "title": "En Route Sector Handover",
        "whenToUse": "Transferring communication between radar sectors within the same or adjoining air traffic control centers.",
        "pilotTemplate": "CONTACT [STATION] ON [FREQUENCY], [CALLSIGN]",
        "atcTemplate": "[CALLSIGN], CONTACT [CONTROL_NAME] ON [FREQUENCY]",
        "notes": [
          "Promptly read back the assigned frequency.",
          "State current flight level and assigned constraints on check-in.",
          "Check radio failure backup procedures if silence persists for over 15 minutes."
        ],
        "reference": "ICAO Doc 4444, Chapter 12",
        "example": [
          {
            "speaker": "atc",
            "text": "IndiGo 515, contact Nagpur Control on 123.9."
          },
          {
            "speaker": "pilot",
            "text": "Contact Nagpur Control on 123.9, IndiGo 515."
          }
        ]
      }
    ]
  },
  {
    "id": "arrival-approach",
    "label": "Arrival & Approach",
    "icon": "PlaneLanding",
    "topics": [
      {
        "id": "request-descent",
        "title": "Descent Clearance Request & Top of Descent (TOD)",
        "whenToUse": "Requesting descent clearance from cruising altitude prior to reaching calculated Top of Descent.",
        "pilotTemplate": "[STATION], [CALLSIGN], READY FOR DESCENT / REQUEST DESCENT TO FL [LEVEL]",
        "atcTemplate": "[CALLSIGN], WHEN READY, DESCEND TO FL [LEVEL], QNH [VALUE] / CROSS [WAYPOINT] AT FL [LEVEL]",
        "notes": [
          "'When ready descend': Pilot determines exact Top of Descent point.",
          "'Descend now': Commences descent immediately at minimum 500 fpm.",
          "Set and cross-check altimeter sub-scale when descending through Transition Level."
        ],
        "reference": "ICAO Doc 4444, Chapter 6; DGCA CAR Section 7",
        "example": [
          {
            "speaker": "pilot",
            "text": "Delhi Control, Air India 812, ready for descent."
          },
          {
            "speaker": "atc",
            "text": "Air India 812, when ready descend to FL 150, cross DPN at or above FL 180."
          },
          {
            "speaker": "pilot",
            "text": "When ready descend to FL 150, cross DPN at or above FL 180, Air India 812."
          }
        ]
      },
      {
        "id": "star-arrival",
        "title": "Standard Terminal Arrival Route (STAR) Clearance",
        "whenToUse": "Clearance to follow published standard arrival routing into the terminal maneuvering area.",
        "pilotTemplate": "CLEARED VIA [STAR_NAME] ARRIVAL, [CALLSIGN]",
        "atcTemplate": "[CALLSIGN], CLEARED VIA [STAR_NAME] ARRIVAL, RUNWAY [RWY], DESCEND VIA STAR TO [LEVEL]",
        "notes": [
          "'Descend via STAR': Comply with all lateral waypoints and vertical altitude/speed restrictions.",
          "Cross-check active STAR in navigational display against published approach plate.",
          "Notify ATC immediately if unable to make any speed or level restriction."
        ],
        "reference": "ICAO PANS-OPS Doc 8168; DGCA AIP India",
        "example": [
          {
            "speaker": "atc",
            "text": "Vistara 910, cleared via RINVI 1A arrival, runway 28, descend via STAR to FL 080."
          },
          {
            "speaker": "pilot",
            "text": "Cleared via RINVI 1A arrival, runway 28, descend via STAR to FL 080, Vistara 910."
          }
        ]
      },
      {
        "id": "expect-approach",
        "title": "Approach Type Expectation",
        "whenToUse": "Advisory from ATC on the specific instrument approach type and runway to be anticipated.",
        "pilotTemplate": "[CALLSIGN], EXPECT [ILS / VOR / RNP] APPROACH RUNWAY [RWY]",
        "atcTemplate": "[CALLSIGN], EXPECT ILS Z APPROACH RUNWAY [RWY], INFORMATION [CODE] CURRENT",
        "notes": [
          "Begin approach briefing and set navigational aids (ILS localizer frequency, inbound course).",
          "Verify minimum decision altitude (DA) or minimum descent altitude (MDA).",
          "DGCA exam question: What is the difference between ILS CAT I, CAT II, and CAT IIIA minima?"
        ],
        "reference": "ICAO Doc 4444, 12.3.6",
        "example": [
          {
            "speaker": "atc",
            "text": "SpiceJet 410, expect ILS runway 27, QNH 1011, transition at FL 060."
          },
          {
            "speaker": "pilot",
            "text": "Expect ILS runway 27, QNH 1011, transition at FL 060, SpiceJet 410."
          }
        ]
      },
      {
        "id": "holding-instructions",
        "title": "Holding Pattern Clearance",
        "whenToUse": "Instructions to enter a published or non-published holding pattern when arrival delays or sequencing is required.",
        "pilotTemplate": "[CALLSIGN], HOLD AT [WAYPOINT/VOR], INBOUND TRACK [DEG], [LEFT/RIGHT] HAND PATTERN, MAINTAIN FL [LEVEL], EXPECT FURTHER CLEARANCE AT [TIME]",
        "atcTemplate": "[CALLSIGN], HOLD AT [FIX], FL [LEVEL], INBOUND [DEG], [TURN_DIR] TURNS, EFC [TIME]",
        "notes": [
          "Standard holding pattern turns are RIGHT; left turns must be explicitly specified.",
          "Standard leg length: 1 minute below 14,000 ft, 1.5 minutes above 14,000 ft.",
          "EFC (Expect Further Clearance) time is vital: if communications fail, pilot departs hold at EFC."
        ],
        "reference": "ICAO Doc 8168, PANS-OPS Vol I; DGCA CAR Section 7",
        "example": [
          {
            "speaker": "atc",
            "text": "IndiGo 284, hold at DPN VOR, maintain FL 100, standard right turns, expect further clearance at time 1420."
          },
          {
            "speaker": "pilot",
            "text": "Hold at DPN VOR, maintain FL 100, right turns, expect further clearance at 1420, IndiGo 284."
          }
        ]
      },
      {
        "id": "ils-approach",
        "title": "ILS Approach Clearance",
        "whenToUse": "Clearance to intercept localizer and glidepath and execute the full Instrument Landing System approach.",
        "pilotTemplate": "CLEARED ILS APPROACH RUNWAY [RWY], [CALLSIGN]",
        "atcTemplate": "[CALLSIGN], TURN [LEFT/RIGHT] HEADING [DEG], INTERCEPT LOCALIZER, CLEARED ILS RUNWAY [RWY], REPORT ESTABLISHED",
        "notes": [
          "Do not descend on glidepath until established on the localizer centerline.",
          "Report 'LOCALIZER ESTABLISHED' or 'ILS ESTABLISHED RUNWAY [number]'.",
          "Set decision altitude (DA) on both barometric altimeters."
        ],
        "reference": "ICAO Doc 4444, Chapter 12; DGCA Advisory Circular",
        "example": [
          {
            "speaker": "atc",
            "text": "Air India 314, turn left heading 310, intercept localizer runway 28, cleared ILS runway 28."
          },
          {
            "speaker": "pilot",
            "text": "Turn left heading 310, intercept localizer, cleared ILS runway 28, Air India 314."
          },
          {
            "speaker": "pilot",
            "text": "Air India 314, established localizer runway 28."
          },
          {
            "speaker": "atc",
            "text": "Air India 314, contact Delhi Tower on 118.1."
          }
        ]
      },
      {
        "id": "vor-approach",
        "title": "Non-Precision / VOR Approach Clearance",
        "whenToUse": "Clearance to execute a non-precision approach using ground VOR/DME navigation without vertical electronic glideslope guidance.",
        "pilotTemplate": "CLEARED VOR APPROACH RUNWAY [RWY], [CALLSIGN]",
        "atcTemplate": "[CALLSIGN], CLEARED VOR RUNWAY [RWY] APPROACH, DESCEND TO MDA [ALTITUDE], REPORT COMMENCING PROCEDURE TURN",
        "notes": [
          "Non-precision approaches have a Minimum Descent Altitude (MDA), not a Decision Altitude (DA).",
          "Aircraft cannot descend below MDA unless visual references are established.",
          "Use step-down fixes and DME distances accurately."
        ],
        "reference": "ICAO Doc 8168, PANS-OPS; DGCA CAR Section 7",
        "example": [
          {
            "speaker": "atc",
            "text": "VT-SHR, cleared VOR runway 09 approach, report outbound."
          },
          {
            "speaker": "pilot",
            "text": "Cleared VOR runway 09 approach, report outbound, VT-SHR."
          }
        ]
      },
      {
        "id": "visual-approach",
        "title": "Visual Approach Request & Clearance",
        "whenToUse": "An approach by an IFR flight when either part or all of an instrument approach is not completed and the approach is executed with visual reference to terrain.",
        "pilotTemplate": "[STATION], [CALLSIGN], RUNWAY / AERODROME IN SIGHT, REQUEST VISUAL APPROACH RUNWAY [RWY]",
        "atcTemplate": "[CALLSIGN], CLEARED VISUAL APPROACH RUNWAY [RWY], MAINTAIN OWN SEPARATION FROM TERRAIN",
        "notes": [
          "Pilot assumes responsibility for terrain avoidance and separation from preceding aircraft in sight.",
          "Ceiling must be at or above initial approach level and visibility at least 5 km.",
          "Can be requested by pilot or offered by ATC."
        ],
        "reference": "ICAO Doc 4444, 6.5.3; DGCA CAR Section 9",
        "example": [
          {
            "speaker": "pilot",
            "text": "Mumbai Approach, Akasa 455, aerodrome in sight, request visual approach runway 27."
          },
          {
            "speaker": "atc",
            "text": "Akasa 455, cleared visual approach runway 27, maintain visual separation, contact Tower 118.1."
          },
          {
            "speaker": "pilot",
            "text": "Cleared visual approach runway 27, contact Tower 118.1, Akasa 455."
          }
        ]
      },
      {
        "id": "circling-approach",
        "title": "Circling Approach Procedure",
        "whenToUse": "An extension of an instrument approach procedure which provides for visual circling of the aerodrome prior to landing on a runway not aligned with the approach aid.",
        "pilotTemplate": "CLEARED [APPROACH_TYPE] CIRCLING TO RUNWAY [RWY], [CALLSIGN]",
        "atcTemplate": "[CALLSIGN], CLEARED [APPROACH_NAME], CIRCLE TO RUNWAY [RWY], REPORT [LEFT/RIGHT] BASE",
        "notes": [
          "Maintain visual reference with runway environment throughout the circle.",
          "Do not descend below circling MDA until aligned with final landing runway.",
          "If visual reference lost during circling, initiate missed approach for the original instrument runway."
        ],
        "reference": "ICAO Doc 8168, PANS-OPS Vol I",
        "example": [
          {
            "speaker": "atc",
            "text": "SpiceJet 109, cleared ILS runway 10, circle to land runway 28, wind 270 at 14 knots."
          },
          {
            "speaker": "pilot",
            "text": "Cleared ILS runway 10, circle to land runway 28, SpiceJet 109."
          }
        ]
      },
      {
        "id": "missed-approach",
        "title": "Missed Approach Execution",
        "whenToUse": "Executed when visual references are not acquired at Decision Altitude / MDA, or runway is obstructed.",
        "pilotTemplate": "[CALLSIGN], GOING AROUND / EXECUTING MISSED APPROACH RUNWAY [RWY]",
        "atcTemplate": "[CALLSIGN], [STATION], ROGER, FOLLOW PUBLISHED MISSED APPROACH / CLIMB TO [ALTITUDE], FLY HEADING [DEG]",
        "notes": [
          "Apply full go-around thrust, establish positive rate of climb, retract gear and flaps according to profile.",
          "Comply with published missed approach procedure unless ATC gives immediate radar vectors.",
          "Mandatory DGCA test item: Initial radio call is simply '[CALLSIGN], GOING AROUND'."
        ],
        "reference": "ICAO Doc 4444, 12.3.6; DGCA CAR Section 7",
        "example": [
          {
            "speaker": "pilot",
            "text": "Delhi Tower, Air India 408, going around."
          },
          {
            "speaker": "atc",
            "text": "Air India 408, Delhi Tower, climb to 4,000 feet on runway heading, contact Approach 127.9."
          },
          {
            "speaker": "pilot",
            "text": "Climb to 4,000 feet on runway heading, contact Approach 127.9, Air India 408."
          }
        ]
      },
      {
        "id": "landing-clearance",
        "title": "Landing Clearance",
        "whenToUse": "Final authorization issued by aerodrome control tower to touch down on the active runway.",
        "pilotTemplate": "CLEARED TO LAND RUNWAY [RWY], [CALLSIGN]",
        "atcTemplate": "[CALLSIGN], RUNWAY [RWY], WIND [DEG] AT [SPEED] KNOTS, CLEARED TO LAND",
        "notes": [
          "Mandatory read-back includes 'CLEARED TO LAND' and runway designator.",
          "Verify wind components (crosswind, tailwind limits).",
          "If runway not clear by 200 feet AGL and no clearance received, prepare for go-around."
        ],
        "reference": "ICAO Doc 4444, 12.3.7; DGCA CAR Section 4",
        "example": [
          {
            "speaker": "atc",
            "text": "IndiGo 351, runway 28, wind 260 degrees 10 knots, cleared to land."
          },
          {
            "speaker": "pilot",
            "text": "Runway 28, cleared to land, IndiGo 351."
          }
        ]
      }
    ]
  },
  {
    "id": "meteorological",
    "label": "Meteorological",
    "icon": "CloudSun",
    "topics": [
      {
        "id": "atis-decode",
        "title": "ATIS / METAR & SPECI Decoding",
        "whenToUse": "Decoding standard terminal aerodrome meteorological reports and weather elements.",
        "pilotTemplate": "[CALLSIGN], REQUEST MET REPORT FOR [AERODROME]",
        "atcTemplate": "[CALLSIGN], [AERODROME] WEATHER: WIND [DEG/KT], VISIBILITY [METERS], CLOUD [OCTAS/FEET], TEMP/DP [T/DP], QNH [HPA]",
        "notes": [
          "CAVOK means: Visibility 10km+, no cloud below 5,000ft or MSA, no CB/TCU, no significant weather.",
          "QNH gives altitude above mean sea level; QFE gives height above aerodrome datum.",
          "Temperature and Dewpoint spread indicates fog/mist risk (close spread = high relative humidity)."
        ],
        "reference": "ICAO Annex 3, Meteorological Service for International Air Navigation",
        "example": [
          {
            "speaker": "pilot",
            "text": "Mumbai Radio, VT-AER, request latest METAR for Ahmedabad."
          },
          {
            "speaker": "atc",
            "text": "VT-AER, Ahmedabad time 0830: wind 240/08kt, visibility 4000m in haze, few 2500ft, temperature 32, dewpoint 24, QNH 1010, NOSIG."
          },
          {
            "speaker": "pilot",
            "text": "QNH 1010, Ahmedabad weather copied, VT-AER."
          }
        ]
      },
      {
        "id": "sigmet",
        "title": "SIGMET Information Transmission",
        "whenToUse": "Significant Meteorological Information broadcast regarding en-route weather phenomena which may affect aircraft safety.",
        "pilotTemplate": "[CALLSIGN], ACKNOWLEDGE SIGMET [NUMBER]",
        "atcTemplate": "[CALLSIGN], SIGMET [NUMBER] VALID UNTIL [TIME]: SEVERE TURBULENCE FORECAST OVER [FIR/AREA] BETWEEN FL [LEVEL] AND FL [LEVEL]",
        "notes": [
          "SIGMETs cover: Severe turbulence, severe icing, severe mountain waves, heavy thunderstorm (TS), volcanic ash, tropical cyclone.",
          "Valid typically for 4 hours (6 hours for volcanic ash and tropical cyclones).",
          "Pilots must plan diversions around SIGMET areas."
        ],
        "reference": "ICAO Annex 3, Chapter 7; DGCA CAR Section 9",
        "example": [
          {
            "speaker": "atc",
            "text": "All stations, Kolkata Control, SIGMET Echo 2 valid until 1200: severe thunderstorm observed over Ranchi FIR moving east, tops FL 450."
          },
          {
            "speaker": "pilot",
            "text": "Air India 701, copied SIGMET Echo 2, request 25 miles right deviation."
          }
        ]
      },
      {
        "id": "windshear-report",
        "title": "Windshear Pilot Report & Warning",
        "whenToUse": "Reporting or receiving alerts of sudden wind velocity/direction changes on takeoff or approach paths.",
        "pilotTemplate": "[STATION], [CALLSIGN], REPORT WINDSHEAR ON [FINAL/DEPARTURE] RUNWAY [RWY], [SPEED_LOSS/GAIN] KNOTS AT [ALTITUDE] FEET",
        "atcTemplate": "[CALLSIGN], [STATION], ROGER, WINDSHEAR WARNING IN EFFECT RUNWAY [RWY]",
        "notes": [
          "Windshear: sudden microburst causing sharp change in airspeed and vertical lift.",
          "Immediate full thrust go-around following windshear escape guidance.",
          "Report altitude, loss/gain of airspeed, and location to ATC."
        ],
        "reference": "ICAO Doc 9817 (Manual on Low-Level Wind Shear); DGCA CAR Section 8",
        "example": [
          {
            "speaker": "pilot",
            "text": "Delhi Tower, IndiGo 554, experienced severe windshear on final runway 28 at 400 feet, 20 knots airspeed loss, going around."
          },
          {
            "speaker": "atc",
            "text": "IndiGo 554, Roger, windshear warning broadcast to following traffic, climb straight ahead 4,000 feet."
          }
        ]
      },
      {
        "id": "turbulence-report",
        "title": "Turbulence Pilot Report (PIREP)",
        "whenToUse": "Standard pilot reporting of Clear Air Turbulence (CAT) or convective turbulence intensity.",
        "pilotTemplate": "[STATION], [CALLSIGN], PIREP: [LIGHT/MODERATE/SEVERE] TURBULENCE AT FL [LEVEL], BETWEEN [POINTS]",
        "atcTemplate": "[CALLSIGN], [STATION], ROGER, PIREP COPIED, [CLEARANCE_FOR_LEVEL_CHANGE]",
        "notes": [
          "Light: slight erratic changes in attitude/altitude.",
          "Moderate: changes in attitude, aircraft remains in control, airspeed fluctuations.",
          "Severe: large abrupt variations, aircraft temporarily out of control, unsecured objects tossed."
        ],
        "reference": "ICAO Annex 3, Appendix 4",
        "example": [
          {
            "speaker": "pilot",
            "text": "Delhi Control, Vistara 818, PIREP: moderate clear air turbulence at FL 360 between SAMAR and DPN, request descend FL 320."
          },
          {
            "speaker": "atc",
            "text": "Vistara 818, descend to FL 320, report ride conditions."
          }
        ]
      },
      {
        "id": "runway-conditions",
        "title": "Runway Surface Conditions (RCR / SNOWTAM)",
        "whenToUse": "Information on contaminated runways (water, standing water, rubber deposit) and braking action.",
        "pilotTemplate": "[CALLSIGN], REQUEST RUNWAY CONDITION REPORT RUNWAY [RWY]",
        "atcTemplate": "[CALLSIGN], RUNWAY [RWY] [DRY/WET/WATER_PATCHES], BRAKING ACTION [GOOD/MEDIUM/POOR], WATER DEPTH [MM]",
        "notes": [
          "Global Reporting Format (GRF) Runway Condition Assessment Matrix (RCAM) uses RWY Condition Code (RWYCC) 0 to 6.",
          "6 = Dry, 5 = Wet, 3 = Standing water >3mm, 1 = Poor, 0 = Less than poor.",
          "Braking action 'POOR' requires immediate pilot assessment of crosswind landing limits."
        ],
        "reference": "ICAO Doc 9981 (PANS-Aerodromes); DGCA CAR Section 4",
        "example": [
          {
            "speaker": "pilot",
            "text": "Kochi Tower, Air India Express 412, request braking action runway 27."
          },
          {
            "speaker": "atc",
            "text": "Air India Express 412, runway 27 wet, standing water 4mm, braking action medium to poor reported by Boeing 737."
          }
        ]
      },
      {
        "id": "visibility-report",
        "title": "Runway Visual Range (RVR) & Low Visibility Ops",
        "whenToUse": "Transmission of RVR values at touchdown, mid-point, and stop-end during CAT II and CAT III ILS operations.",
        "pilotTemplate": "[CALLSIGN], REQUEST RVR RUNWAY [RWY]",
        "atcTemplate": "[CALLSIGN], RUNWAY [RWY] RVR: TOUCHDOWN [VAL] METERS, MID-POINT [VAL] METERS, STOP-END [VAL] METERS",
        "notes": [
          "RVR reported when visibility drops below 1,500 meters.",
          "CAT I minima: RVR 550m, DH 200ft. CAT II: RVR 300m, DH 100ft. CAT IIIA: RVR 175m, DH 50ft.",
          "Touchdown RVR is always mandatory before commencing approach past outer marker / 1000 ft."
        ],
        "reference": "ICAO Doc 9365 (All-Weather Operations Manual); DGCA CAR Section 8",
        "example": [
          {
            "speaker": "pilot",
            "text": "Delhi Approach, SpiceJet 208, request RVR runway 28."
          },
          {
            "speaker": "atc",
            "text": "SpiceJet 208, runway 28 RVR: touchdown 350 meters, mid-point 300 meters, stop-end 250 meters, CAT II operations in progress."
          },
          {
            "speaker": "pilot",
            "text": "Copied CAT II in progress, RVR 350, SpiceJet 208."
          }
        ]
      },
      {
        "id": "weather-deviation",
        "title": "Weather Deviation Around Thunderstorms (CB)",
        "whenToUse": "Requesting lateral deviations off assigned airway route to bypass Cumulonimbus (CB) storm cells.",
        "pilotTemplate": "[STATION], [CALLSIGN], REQUEST [DISTANCE] NM [LEFT/RIGHT] DEVIATION OF TRACK DUE WEATHER",
        "atcTemplate": "[CALLSIGN], DEVIATION [DISTANCE] NM [LEFT/RIGHT] OF TRACK APPROVED, REPORT REJOINING TRACK",
        "notes": [
          "State deviation direction and distance in nautical miles.",
          "If unable to contact ATC due to frequency congestion, pilot deviates up to 5 NM right/left maintaining standard offset altitude rules.",
          "Report when clear of weather and rejoining cleared flight path."
        ],
        "reference": "ICAO Doc 4444, Chapter 15; DGCA CAR Section 7",
        "example": [
          {
            "speaker": "pilot",
            "text": "Nagpur Control, IndiGo 671, request 20 miles left of track due heavy weather."
          },
          {
            "speaker": "atc",
            "text": "IndiGo 671, deviation up to 20 miles left of track approved, report clear of weather."
          },
          {
            "speaker": "pilot",
            "text": "Left deviation approved, will report clear, IndiGo 671."
          }
        ]
      },
      {
        "id": "volcanic-ash",
        "title": "Volcanic Ash Advisory (VAA)",
        "whenToUse": "Procedures and phraseology regarding airspace closures and flight avoidance of volcanic ash clouds.",
        "pilotTemplate": "[CALLSIGN], VOLCANIC ASH CLOUD OBSERVED / ADVISORY IN EFFECT",
        "atcTemplate": "[CALLSIGN], VOLCANIC ASH ADVISORY: CLOUD OBSERVED OVER [LOCATION], EXTENDING FROM SURFACE TO FL [LEVEL], MOVING [DIRECTION]",
        "notes": [
          "Volcanic ash causes rapid jet engine flameout, cockpit abrasion, and pitot-static clogging.",
          "Standard procedure: 180-degree turn out of ash cloud, disconnect auto-throttles, start APU, maximum continuous ignition.",
          "Never attempt to penetrate volcanic ash cloud."
        ],
        "reference": "ICAO Doc 9691 (Manual on Volcanic Ash); DGCA Advisory Circular",
        "example": [
          {
            "speaker": "atc",
            "text": "All stations, Chennai Control, volcanic ash cloud reported between FL 250 and FL 400 west of airway P574, avoid area."
          },
          {
            "speaker": "pilot",
            "text": "Singapore 412, copied volcanic ash advisory, request revised routing via airway N571."
          }
        ]
      }
    ]
  },
  {
    "id": "emergency-abnormal",
    "label": "Emergency & Abnormal",
    "icon": "AlertTriangle",
    "topics": [
      {
        "id": "mayday",
        "title": "MAYDAY (Distress Signal)",
        "whenToUse": "Grave and imminent danger threatening the aircraft, requiring immediate assistance from all stations.",
        "pilotTemplate": "MAYDAY, MAYDAY, MAYDAY, [STATION], [CALLSIGN], [NATURE_OF_EMERGENCY], [INTENTIONS], [POSITION], [LEVEL], [POB], [ENDURANCE]",
        "atcTemplate": "[CALLSIGN], [STATION], MAYDAY ACKNOWLEDGED, [RADAR_ASSISTANCE / SQUAWK 7700 / EMERGENCY_SERVICES_STANDING_BY]",
        "notes": [
          "Spoken three times at start of transmission.",
          "Format: Station, Callsign, Nature of emergency, Intentions of PIC, Position/Level/Heading, POB (Persons On Board), Endurance (fuel remaining).",
          "Distress traffic has absolute priority over all other communications.",
          "Squawk Mode A/C 7700."
        ],
        "reference": "ICAO Annex 10, Vol II, Chapter 5; DGCA CAR Section 7",
        "example": [
          {
            "speaker": "pilot",
            "text": "MAYDAY, MAYDAY, MAYDAY, Delhi Control, Air India 102, engine fire number two, shutting down engine, forced descent, present position 40 miles south of Delhi, passing FL 220 descending to 7,000 feet, heading 360, POB 164, endurance 2 hours 30 minutes."
          },
          {
            "speaker": "atc",
            "text": "Air India 102, Delhi Control, MAYDAY acknowledged, squawk 7700, cleared descent to 7,000 feet, QNH 1012, radar vectors for ILS runway 28, emergency services notified."
          },
          {
            "speaker": "pilot",
            "text": "Squawk 7700, descend 7,000 feet, QNH 1012, Air India 102."
          }
        ]
      },
      {
        "id": "pan-pan",
        "title": "PAN-PAN (Urgency Signal)",
        "whenToUse": "Condition concerning the safety of an aircraft or person on board, but NOT requiring immediate distress assistance.",
        "pilotTemplate": "PAN-PAN, PAN-PAN, PAN-PAN, [STATION], [CALLSIGN], [NATURE_OF_URGENCY], [INTENTIONS], [POSITION], [LEVEL]",
        "atcTemplate": "[CALLSIGN], [STATION], PAN-PAN ACKNOWLEDGED, [INSTRUCTIONS/CLEARANCE]",
        "notes": [
          "Spoken three times at start of transmission.",
          "Used for: medical emergencies, single generator failure, minor fuel leak, precautionary engine shutdown.",
          "Has priority over all transmissions except MAYDAY.",
          "Can be upgraded to MAYDAY if condition deteriorates."
        ],
        "reference": "ICAO Annex 10, Vol II, Chapter 5",
        "example": [
          {
            "speaker": "pilot",
            "text": "PAN-PAN, PAN-PAN, PAN-PAN, Mumbai Control, IndiGo 533, passenger having suspected cardiac arrest, request direct routing to Mumbai, medical assistance upon landing."
          },
          {
            "speaker": "atc",
            "text": "IndiGo 533, Mumbai Control, PAN-PAN acknowledged, cleared direct Mumbai, descend to FL 140, medical services will meet aircraft at Stand 12."
          }
        ]
      },
      {
        "id": "engine-failure",
        "title": "Engine Failure After Takeoff / In-Flight",
        "whenToUse": "Phraseology used following single or dual engine failure during departure or cruising flight.",
        "pilotTemplate": "MAYDAY / PAN-PAN, [STATION], [CALLSIGN], ENGINE FAILURE NUMBER [1/2], [INTENTION]",
        "atcTemplate": "[CALLSIGN], [STATION], ACKNOWLEDGED, FLY HEADING [DEG], CLIMB/DESCEND [LEVEL], SQUAWK 7700",
        "notes": [
          "Aviate, Navigate, Communicate — fly the aircraft first before transmitting.",
          "Declare MAYDAY or PAN-PAN based on single vs multi-engine aircraft type.",
          "State immediate intentions: return to aerodrome, holding to dump fuel, or forced landing."
        ],
        "reference": "ICAO Doc 4444; DGCA CAR Section 8",
        "example": [
          {
            "speaker": "pilot",
            "text": "Delhi Tower, SpiceJet 212, PAN-PAN PAN-PAN PAN-PAN, engine number one flameout, stopping climb at 3,000 feet, request radar vectors to return runway 28."
          },
          {
            "speaker": "atc",
            "text": "SpiceJet 212, Delhi Tower, turn right heading 090, maintain 3,000 feet, runway 28 ready, wind 270 at 10."
          }
        ]
      },
      {
        "id": "hydraulic-failure",
        "title": "Hydraulic System Failure",
        "whenToUse": "Loss of hydraulic pressure affecting landing gear extension, flaps, spoilers, or steering.",
        "pilotTemplate": "PAN-PAN PAN-PAN PAN-PAN, [CALLSIGN], HYDRAULIC SYSTEM FAILURE, REQUIRE RUNWAY LENGTH [METERS], NO NOSE-WHEEL STEERING",
        "atcTemplate": "[CALLSIGN], [STATION], ACKNOWLEDGED, RUNWAY [RWY] AVAILABLE, TOW TUG STANDING BY",
        "notes": [
          "Advise ATC if alternate gear extension required.",
          "Advise if flaps inoperative (results in higher approach speed and longer landing roll).",
          "State if aircraft will be unable to vacate runway under own power due to loss of nosewheel steering."
        ],
        "reference": "ICAO Doc 9432",
        "example": [
          {
            "speaker": "pilot",
            "text": "Mumbai Approach, Air India 441, PAN-PAN PAN-PAN PAN-PAN, dual hydraulic failure, flapless landing, will require full runway 27 and tow tug on runway."
          },
          {
            "speaker": "atc",
            "text": "Air India 441, Mumbai Approach, Roger, runway 27 cleared for your arrival, length 3,445 meters, tug and fire services standing by."
          }
        ]
      },
      {
        "id": "lost-communications",
        "title": "Two-Way Radio Communication Failure",
        "whenToUse": "Procedures when unable to establish contact on any published ATC or guard frequency.",
        "pilotTemplate": "[CALLSIGN], TRANSMITTING BLIND DUE TO RECEIVER FAILURE, [POSITION], [LEVEL], [INTENTIONS]",
        "atcTemplate": "ATC clears route and monitors Mode A/C 7600 squawk",
        "notes": [
          "Squawk Code 7600 immediately.",
          "In VMC: continue in VMC, land at nearest suitable aerodrome, report arrival to ATC.",
          "In IMC: maintain assigned speed/level for 20 minutes (or 7 min per regional rules), then continue according to filed flight plan.",
          "Transmit reports blind twice on designated frequency."
        ],
        "reference": "ICAO Annex 2, Section 3.6.5; DGCA CAR Section 7",
        "example": [
          {
            "speaker": "pilot",
            "text": "Delhi Control, VT-AER, transmitting blind due to receiver failure, position 25 miles south, descending FL 080, proceeding via published STAR to runway 28, squawking 7600."
          }
        ]
      },
      {
        "id": "transponder-codes",
        "title": "Emergency Transponder Squawk Codes",
        "whenToUse": "Special transponder Mode 3/A codes used internationally to signal specific emergency conditions.",
        "pilotTemplate": "[CALLSIGN], SQUAWKING [7500 / 7600 / 7700]",
        "atcTemplate": "[CALLSIGN], CONFIRM SQUAWKING [CODE]",
        "notes": [
          "7500 = Unlawful Interference (Hijack).",
          "7600 = Radio Communication Failure.",
          "7700 = General Emergency / Distress.",
          "DGCA exam rule: ATC will ask 'CONFIRM SQUAWKING 7500' if accidental code selection suspected."
        ],
        "reference": "ICAO Doc 4444, Section 8.5; DGCA AIP ENR 1.6",
        "example": [
          {
            "speaker": "atc",
            "text": "IndiGo 219, confirm squawking 7500?"
          },
          {
            "speaker": "pilot",
            "text": "IndiGo 219, affirm, squawking 7500."
          }
        ]
      },
      {
        "id": "tcas-ra",
        "title": "TCAS Resolution Advisory (RA)",
        "whenToUse": "Maneuver executed in response to Airborne Collision Avoidance System vertical guidance command.",
        "pilotTemplate": "[CALLSIGN], TCAS CLIMB / TCAS DESCENT",
        "atcTemplate": "[CALLSIGN], [STATION], ROGER",
        "notes": [
          "Pilot MUST follow TCAS RA immediately, overriding contradictory ATC instructions.",
          "ATC radar separation responsibility is suspended during the RA maneuver.",
          "Report 'TCAS CLEAR OF CONFLICT, RETURNING TO [LEVEL]' once resolution complete."
        ],
        "reference": "ICAO Doc 4444, 15.7.3; DGCA CAR Section 8",
        "example": [
          {
            "speaker": "pilot",
            "text": "Delhi Control, Air India 108, TCAS climb!"
          },
          {
            "speaker": "atc",
            "text": "Air India 108, Roger."
          },
          {
            "speaker": "pilot",
            "text": "Air India 108, clear of conflict, returning to FL 340."
          },
          {
            "speaker": "atc",
            "text": "Air India 108, Roger, resume own navigation."
          }
        ]
      },
      {
        "id": "unlawful-interference",
        "title": "Unlawful Interference (Hijack)",
        "whenToUse": "Procedures and phraseology when aircraft is subject to hijack or unlawful control by hostile persons.",
        "pilotTemplate": "SQUAWK 7500 / [COVERT PHRASEOLOGY]",
        "atcTemplate": "ATC avoids unnecessary transmissions, clears path, alerts defense authorities",
        "notes": [
          "Squawk 7500 silently on transponder.",
          "If forced to speak by hijackers, use natural phrasing or confirm squawk.",
          "ATC will provide maximum radar priority and avoid asking leading questions."
        ],
        "reference": "ICAO Annex 17 (Security); DGCA CAR Section 8",
        "example": [
          {
            "speaker": "atc",
            "text": "Air India 815, Delhi Control, confirm squawk 7500?"
          },
          {
            "speaker": "pilot",
            "text": "Delhi Control, Air India 815, affirm."
          }
        ]
      },
      {
        "id": "emergency-descent",
        "title": "Emergency Descent (Rapid Depressurization)",
        "whenToUse": "Rapid vertical descent initiated following structural damage, cabin window failure, or rapid decompression.",
        "pilotTemplate": "MAYDAY MAYDAY MAYDAY, [STATION], [CALLSIGN], EMERGENCY DESCENT TO FL 100 / 10,000 FEET",
        "atcTemplate": "[CALLSIGN], [STATION], EMERGENCY DESCENT APPROVED, FLY HEADING [DEG], QNH [VALUE]",
        "notes": [
          "Don oxygen masks immediately (100% oxygen).",
          "Descend to 10,000 feet or Minimum Sector Altitude (MSA), whichever is higher.",
          "ATC clears all traffic below on the descent corridor."
        ],
        "reference": "ICAO Doc 4444, 15.1.1; DGCA CAR Section 8",
        "example": [
          {
            "speaker": "pilot",
            "text": "MAYDAY, MAYDAY, MAYDAY, Kolkata Control, SpiceJet 119, rapid decompression, emergency descent to FL 100, turning right heading 120."
          },
          {
            "speaker": "atc",
            "text": "SpiceJet 119, Kolkata Control, emergency descent approved, heading 120, QNH 1011, all stations below clear the corridor."
          }
        ]
      },
      {
        "id": "minimum-fuel",
        "title": "MINIMUM FUEL vs MAYDAY FUEL",
        "whenToUse": "Distinction between declaring fuel priority concern and an actual fuel distress emergency.",
        "pilotTemplate": "[CALLSIGN], MINIMUM FUEL / MAYDAY, MAYDAY, MAYDAY, MAYDAY FUEL",
        "atcTemplate": "[CALLSIGN], [STATION], ROGER, EXPECT NO DELAY / CLEARED STRAIGHT-IN APPROACH",
        "notes": [
          "'MINIMUM FUEL': Informs ATC that any unexpected delay may result in landing with less than planned final reserve fuel. It is NOT an emergency.",
          "'MAYDAY FUEL': Declares a distress emergency when usable fuel on landing is calculated to be less than the planned final reserve fuel (30 or 45 mins).",
          "ATC MUST give absolute landing priority to 'MAYDAY FUEL'."
        ],
        "reference": "ICAO Doc 4444, 15.5.5; DGCA CAR Section 7",
        "example": [
          {
            "speaker": "pilot",
            "text": "Delhi Approach, IndiGo 822, MINIMUM FUEL, unable to accept holding."
          },
          {
            "speaker": "atc",
            "text": "IndiGo 822, Roger, no holding expected, vectoring for straight-in runway 28."
          },
          {
            "speaker": "pilot",
            "text": "MAYDAY, MAYDAY, MAYDAY, Delhi Approach, IndiGo 822, MAYDAY FUEL, 15 minutes fuel remaining, request immediate landing runway 28."
          }
        ]
      },
      {
        "id": "diversion-emergency",
        "title": "Emergency Diversion to Nearest Aerodrome",
        "whenToUse": "Initiating an urgent en-route course change to land at the closest suitable airport due to emergency conditions.",
        "pilotTemplate": "[CALLSIGN], DIVERTING TO [AERODROME_NAME], DUE [REASON], REQUEST [VECTORS/CLEARANCE]",
        "atcTemplate": "[CALLSIGN], CLEARED DIRECT [AERODROME], DESCEND FL [LEVEL], WIND [VALUE], RUNWAY IN USE [RWY]",
        "notes": [
          "State preferred alternate aerodrome, remaining endurance, and POB.",
          "ATC coordinates emergency services at receiving aerodrome.",
          "DGCA exam tip: Difference between en-route alternate and takeoff alternate requirements."
        ],
        "reference": "ICAO Annex 6, Chapter 4",
        "example": [
          {
            "speaker": "pilot",
            "text": "Ahmedabad Control, Air India 301, MAYDAY MAYDAY MAYDAY, cargo smoke indication, diverting to Ahmedabad, request straight-in approach runway 23."
          },
          {
            "speaker": "atc",
            "text": "Air India 301, cleared direct Ahmedabad, descend FL 070, runway 23 ready, QNH 1012, fire trucks standing by."
          }
        ]
      },
      {
        "id": "fire-smoke",
        "title": "Cockpit / Cabin / Cargo Fire",
        "whenToUse": "Distress transmission when onboard smoke or fire is detected.",
        "pilotTemplate": "MAYDAY MAYDAY MAYDAY, [CALLSIGN], FIRE ON BOARD [LOCATION], COMMENCING IMMEDIATE DESCENT",
        "atcTemplate": "[CALLSIGN], CLEARED IMMEDIATE DESCENT, RUNWAY [RWY] PREPARED, FOAM TENDERS STANDING BY",
        "notes": [
          "Land at nearest suitable airport without delay; in-flight fires can compromise aircraft structure in under 15 minutes.",
          "Advise ATC if evacuation will take place on the runway.",
          "Request airport rescue and firefighting (ARFF) services."
        ],
        "reference": "ICAO Doc 9432",
        "example": [
          {
            "speaker": "pilot",
            "text": "MAYDAY MAYDAY MAYDAY, Mumbai Tower, Vistara 214, cockpit electrical fire, smoke in cockpit, landing immediately runway 27, will evacuate on runway."
          },
          {
            "speaker": "atc",
            "text": "Vistara 214, cleared to land runway 27, wind calm, fire tenders rolling."
          }
        ]
      },
      {
        "id": "medical-priority",
        "title": "Critical Medical Emergency on Board",
        "whenToUse": "Urgency/distress transmission requesting expedited handling and ground ambulance for a passenger or crew member.",
        "pilotTemplate": "PAN-PAN PAN-PAN PAN-PAN, [CALLSIGN], MEDICAL PRIORITY, PASSENGER UNCONSCIOUS, REQUIRE DOCTOR AND AMBULANCE",
        "atcTemplate": "[CALLSIGN], [STATION], CLEARED DIRECT [DESTINATION], EXPEDITE DESCENT, AMBULANCE STANDING BY",
        "notes": [
          "Specify nature of medical situation (e.g. CPR in progress, stroke, severe trauma).",
          "Advise if passenger is a crew member (pilot incapacitation).",
          "Request gate or apron medical team upon shutdown."
        ],
        "reference": "ICAO Doc 4444; DGCA CAR Section 7",
        "example": [
          {
            "speaker": "pilot",
            "text": "Kolkata Approach, Air India 711, PAN-PAN PAN-PAN PAN-PAN, passenger suffering suspected cardiac arrest, doctor on board performing CPR, request priority approach and ambulance at gate."
          },
          {
            "speaker": "atc",
            "text": "Air India 711, number one for approach, cleared direct to runway 01R, ambulance confirmed at Stand 7."
          }
        ]
      },
      {
        "id": "brakes-hot",
        "title": "Hot Brakes / Gear Assembly Fire Risk",
        "whenToUse": "Advising tower after high-energy rejected takeoff or overweight landing that brake temperatures are critical.",
        "pilotTemplate": "[CALLSIGN], BRAKES OVERHEAT / HOT BRAKES, STOPPING ON TAXIWAY, REQUEST FIRE SERVICES INSPECTION",
        "atcTemplate": "[CALLSIGN], [STATION], HOLD POSITION, FIRE SERVICES DISPATCHED",
        "notes": [
          "Do not set parking brake (can weld pads to discs); use wheel chocks.",
          "Vacate runway if able, or hold position if tires at risk of deflation/fuse plug melt.",
          "Keep aircraft facing into wind to assist brake cooling."
        ],
        "reference": "IATA Airport Operations; Boeing/Airbus FCOM",
        "example": [
          {
            "speaker": "pilot",
            "text": "Delhi Ground, Akasa 312, rejected takeoff, hot brakes indication, holding on Taxiway Echo, request fire service thermal inspection."
          },
          {
            "speaker": "atc",
            "text": "Akasa 312, hold position on Echo, fire tender 2 is proceeding to your position."
          }
        ]
      },
      {
        "id": "copilot-incapacitated",
        "title": "Pilot Incapacitation",
        "whenToUse": "Urgent transmission when one operating flight crew member becomes medically incapacitated in flight.",
        "pilotTemplate": "PAN-PAN PAN-PAN PAN-PAN, [CALLSIGN], CO-PILOT INCAPACITATED, SINGLE PILOT OPERATION, REQUEST RADAR VECTORS",
        "atcTemplate": "[CALLSIGN], [STATION], PAN-PAN ACKNOWLEDGED, CLEARED DIRECT [AIRPORT], MAINTAIN [LEVEL], ADVISE INTENTIONS",
        "notes": [
          "Cabin crew member briefed to assist in flight deck (locking seat, monitor radios).",
          "Request vectors with minimal workload (long straight-in ILS approach).",
          "Medical crew to meet aircraft upon arrival."
        ],
        "reference": "ICAO Doc 8984 (Manual of Civil Aviation Medicine); DGCA CAR Section 8",
        "example": [
          {
            "speaker": "pilot",
            "text": "Chennai Control, IndiGo 492, PAN-PAN PAN-PAN PAN-PAN, First Officer has fainted and is unresponsive, single pilot operation, request radar vectors for immediate landing Chennai."
          },
          {
            "speaker": "atc",
            "text": "IndiGo 492, Chennai Control, Roger, cleared direct Chennai, descend to 3,000 feet, runway 07 ready, straight-in ILS."
          }
        ]
      },
      {
        "id": "flaps-stuck",
        "title": "Flap Asymmetry / Flapless Overweight Landing",
        "whenToUse": "Handling mechanical trailing edge flap or slat failure requiring high approach speed and extended runway length.",
        "pilotTemplate": "PAN-PAN PAN-PAN PAN-PAN, [CALLSIGN], FLAP ASYMMETRY / FLAPS INOPERATIVE, REQUEST HOLDING TO COMPLETE CHECKLIST",
        "atcTemplate": "[CALLSIGN], [STATION], HOLD AT [FIX] / CLEARED ILS [RWY], REPORT READY",
        "notes": [
          "Approach speed (VREF) significantly increased (+20 to +30 knots).",
          "Landing distance required increases by 50% to 70%.",
          "Advise ATC of inability to meet standard approach speed restrictions."
        ],
        "reference": "Boeing/Airbus QRH; DGCA CAR Section 8",
        "example": [
          {
            "speaker": "pilot",
            "text": "Mumbai Approach, SpiceJet 516, PAN-PAN PAN-PAN PAN-PAN, flaps locked at position 1, flapless approach speed 165 knots, unable to comply with 140 knot speed restriction on final."
          },
          {
            "speaker": "atc",
            "text": "SpiceJet 516, 165 knots approved, runway 27 cleared to land, wind 260 at 08."
          }
        ]
      },
      {
        "id": "red-flares",
        "title": "Series of Red Flares Observed",
        "whenToUse": "Visual pyrotechnic distress signal sighting reported by aircraft, or pyrotechnics fired from ground control.",
        "pilotTemplate": "[STATION], [CALLSIGN], OBSERVED SERIES OF RED FLARES AT [POSITION/COORDINATES]",
        "atcTemplate": "[CALLSIGN], [STATION], ROGER, SEARCH AND RESCUE (SAR) NOTIFIED",
        "notes": [
          "Red flares fired by another vessel or person signify grave distress.",
          "Red pyrotechnic fired from control tower towards aircraft on final approach means: 'UNSAFE, DO NOT LAND, GO AROUND IMMEDIATELY'.",
          "Record exact GPS coordinates, heading, and time of observation."
        ],
        "reference": "ICAO Annex 2 (Rules of the Air), Appendix 1; DGCA CAR Section 9",
        "example": [
          {
            "speaker": "pilot",
            "text": "Mumbai Radio, Air India 144, observed series of red flares at sea, position 18 degrees 42 minutes North, 72 degrees 15 minutes East."
          },
          {
            "speaker": "atc",
            "text": "Air India 144, Roger, Mumbai Coast Guard and MRCC alerted, report any vessel sightings."
          }
        ]
      },
      {
        "id": "bird-strike",
        "title": "Bird Strike Reporting",
        "whenToUse": "Reporting a collision with birds during takeoff, approach, or landing, and runway inspection request.",
        "pilotTemplate": "[STATION], [CALLSIGN], EXPERIENCED BIRD STRIKE ON [RUNWAY/FINAL], [ENGINE/WINDSHIELD/AIRFRAME], [INTENTIONS]",
        "atcTemplate": "[CALLSIGN], [STATION], ROGER, [RUNWAY_INSPECTION_ORDERED / EMERGENCY_SERVICES_ADVISED]",
        "notes": [
          "Advise ATC of location, altitude, and number/size of birds.",
          "Check engine parameters for vibration or temperature rise.",
          "ATC immediately halts departures and inspects runway for bird carcasses."
        ],
        "reference": "ICAO Doc 9137 (Airport Services Manual, Part 3); DGCA CAR Section 4",
        "example": [
          {
            "speaker": "pilot",
            "text": "Delhi Tower, Vistara 805, bird strike on departure runway 28 at 800 feet, flock of pigeons, engine parameters normal, continuing to destination."
          },
          {
            "speaker": "atc",
            "text": "Vistara 805, Roger, runway 28 closed temporarily for wildlife inspection."
          }
        ]
      },
      {
        "id": "airprox",
        "title": "AIRPROX (Air Proximity / Near Miss Report)",
        "whenToUse": "Reporting an incident where the distance between aircraft and their relative positions and speed compromised safety.",
        "pilotTemplate": "[STATION], [CALLSIGN], REPORTING AIRPROX AT [TIME], FL [LEVEL], [POSITION], OTHER AIRCRAFT [DESCRIPTION/DISTANCE]",
        "atcTemplate": "[CALLSIGN], [STATION], AIRPROX LOGGED, ADVISE DETAILS WHEN ABLE",
        "notes": [
          "Four ICAO risk categories: Risk of collision, Safety not assured, No risk of collision, Risk not determined.",
          "File written AIRPROX report with DGCA within 24 hours of landing.",
          "Note transponder squawk and TCAS audio warnings."
        ],
        "reference": "ICAO Doc 4444, Chapter 16; DGCA CAR Section 5, Series F",
        "example": [
          {
            "speaker": "pilot",
            "text": "Delhi Control, IndiGo 115, filing AIRPROX: near miss with unknown military fighter at FL 240, 20 miles north of Delhi, missed by less than 500 feet vertically."
          },
          {
            "speaker": "atc",
            "text": "IndiGo 115, Delhi Control, AIRPROX logged, report filed with Directorate General of Civil Aviation."
          }
        ]
      },
      {
        "id": "aircraft-crashed",
        "title": "Downed Aircraft Sighting / ELT Signal Heard",
        "whenToUse": "Reporting an aircraft accident observed from the air or an Emergency Locator Transmitter (ELT) distress beacon heard on 121.5 MHz.",
        "pilotTemplate": "[STATION], [CALLSIGN], SIGHTING OF DOWNED AIRCRAFT / ELT DISTRESS BEACON HEARD ON 121.5 MHZ AT [POSITION]",
        "atcTemplate": "[CALLSIGN], [STATION], ROGER, SEARCH AND RESCUE RESCUE COORDINATION CENTRE (RCC) ACTIVATED",
        "notes": [
          "Standard ELT beacon frequencies: 121.5 MHz (analog civilian) and 406 MHz (satellite Cospas-Sarsat).",
          "Report signal strength, position, and whether visual smoke/wreckage is spotted.",
          "Standby to act as on-scene airborne communications relay if requested."
        ],
        "reference": "ICAO Annex 12 (Search and Rescue); DGCA CAR Section 9",
        "example": [
          {
            "speaker": "pilot",
            "text": "Nagpur Control, Air India 419, hearing strong oscillating ELT distress beacon on guard 121.5 MHz, position 45 miles west of Nagpur."
          },
          {
            "speaker": "atc",
            "text": "Air India 419, Roger, Nagpur RCC notified, monitor 121.5 and report any visual signs."
          }
        ]
      },
      {
        "id": "transponder-mode-c-fail",
        "title": "Transponder Mode C (Altitude Reporting) Failure",
        "whenToUse": "Transponder operates in Mode A but fails to transmit pressure altitude, or altitude readout is corrupted.",
        "pilotTemplate": "[CALLSIGN], [STATION], NO MODE C READOUT / ALTITUDE DIFFERS BY [FEET] FEET",
        "atcTemplate": "[CALLSIGN], RESET SQUAWK [CODE] / STOP SQUAWK ALTITUDE / SQUAWK CHARLIE",
        "notes": [
          "'SQUAWK CHARLIE': Activate pressure altitude reporting.",
          "'STOP SQUAWK ALTITUDE': Deactivate pressure altitude transmission due to faulty encoder.",
          "Max allowable difference between Mode C readout and barometric altimeter is 200 feet."
        ],
        "reference": "ICAO Doc 4444, 8.5.2",
        "example": [
          {
            "speaker": "atc",
            "text": "VT-AER, Delhi Radar, your altitude readout shows FL 120, confirm level."
          },
          {
            "speaker": "pilot",
            "text": "Delhi Radar, VT-AER is maintaining FL 140, altimeter 1013."
          },
          {
            "speaker": "atc",
            "text": "VT-AER, stop squawk altitude, altitude reporting defective."
          },
          {
            "speaker": "pilot",
            "text": "Stop squawk altitude, VT-AER."
          }
        ]
      },
      {
        "id": "altimeter-unreliable",
        "title": "Unreliable Airspeed & Altimeter (Pitot-Static Failure)",
        "whenToUse": "Loss of reliable airspeed or barometric altitude indications due to pitot-static icing or blockage.",
        "pilotTemplate": "MAYDAY / PAN-PAN, [CALLSIGN], UNRELIABLE AIRSPEED AND ALTIMETER, FLYING PITCH AND POWER, REQUIRE RADAR ALTITUDE AND GROUND SPEED",
        "atcTemplate": "[CALLSIGN], [STATION], RADAR CONTACT, YOUR GROUND SPEED [KNOTS], ESTIMATED FLIGHT LEVEL [LEVEL]",
        "notes": [
          "Disengage autopilot and autothrottle.",
          "Fly memorized pitch and thrust settings from Unreliable Airspeed checklist (e.g. 5° pitch, 85% N1).",
          "Request ATC provide radar ground speed and GPS/radar altitude updates."
        ],
        "reference": "Boeing/Airbus QRH; DGCA Safety Bulletin",
        "example": [
          {
            "speaker": "pilot",
            "text": "Mumbai Control, Air India 211, PAN-PAN PAN-PAN PAN-PAN, unreliable airspeed indication, flying pitch and power, request radar ground speed and avoid all clouds."
          },
          {
            "speaker": "atc",
            "text": "Air India 211, your ground speed is 380 knots, maintain heading 240, airspace clear of weather."
          }
        ]
      },
      {
        "id": "sinking-ship",
        "title": "Vessel in Distress / Ditching at Sea",
        "whenToUse": "Reporting an ocean-going vessel or ship observed sinking, or aircraft preparing for forced landing on water (ditching).",
        "pilotTemplate": "MAYDAY MAYDAY MAYDAY, [CALLSIGN], DITCHING / VESSEL IN DISTRESS OBSERVED AT [COORDINATES]",
        "atcTemplate": "[CALLSIGN], [STATION], ROGER, COAST GUARD AND RCC ALERTED",
        "notes": [
          "Transmit: Position, heading, swell direction, wind velocity.",
          "Ditching aircraft: Touch down parallel to sea swells, upwind if swell not significant.",
          "Life vests donned prior to ditching, inflated ONLY after exiting the aircraft."
        ],
        "reference": "ICAO Annex 12 (SAR); DGCA CAR Section 8",
        "example": [
          {
            "speaker": "pilot",
            "text": "Chennai Radio, SpiceJet 781, sighting fishing trawler capsized at position 13°12'N 080°45'E, persons in water, deploying emergency rafts."
          },
          {
            "speaker": "atc",
            "text": "SpiceJet 781, Roger, Chennai Naval Command and Coast Guard dispatched."
          }
        ]
      },
      {
        "id": "fuel-dumping",
        "title": "Fuel Jettisoning / Fuel Dumping",
        "whenToUse": "Intentional overboard jettison of aviation fuel to reduce aircraft gross weight down to Maximum Landing Weight (MLW).",
        "pilotTemplate": "[CALLSIGN], REQUEST FUEL DUMPING, [AMOUNT] TONS, AT FL [LEVEL]",
        "atcTemplate": "[CALLSIGN], [STATION], FUEL JETTISON APPROVED BETWEEN FL [LEVEL] AND FL [LEVEL], IN AREA [DESCRIPTION]",
        "notes": [
          "Fuel dumping conducted at minimum 6,000 feet AGL above terrain (to allow fuel to vaporize before reaching ground).",
          "Conducted clear of thunderstorms, cities, and other aircraft (minimum 10 NM lateral separation from other traffic).",
          "All stations broadcast advisory: 'ATTENTION ALL AIRCRAFT, FUEL JETTISON IN PROGRESS'."
        ],
        "reference": "ICAO Doc 4444, 15.6; DGCA CAR Section 8",
        "example": [
          {
            "speaker": "pilot",
            "text": "Delhi Approach, Air India 101, Boeing 787, technical return, gross weight 210 tons, request fuel dumping to maximum landing weight 172 tons, 38 tons to dump."
          },
          {
            "speaker": "atc",
            "text": "Air India 101, proceed to fuel dump area Romeo 12, maintain FL 120, fuel dumping approved."
          },
          {
            "speaker": "pilot",
            "text": "Proceed to area Romeo 12, maintain FL 120, dumping 38 tons, Air India 101."
          }
        ]
      },
      {
        "id": "bomb-threat",
        "title": "Bomb Threat / Security Alert",
        "whenToUse": "Procedures following a sabotage or bomb warning received for an airborne aircraft.",
        "pilotTemplate": "MAYDAY / PAN-PAN, [CALLSIGN], BOMB THREAT ON BOARD, REQUEST IMMEDIATE LANDING AND ISOLATED PARKING POSITION",
        "atcTemplate": "[CALLSIGN], [STATION], CLEARED DIRECT [AERODROME], RUNWAY [RWY], ISOLATED BAY [BAY_NUMBER] ALLOCATED, EVACUATION CONTINGENCY READY",
        "notes": [
          "Squawk 7700 (or 7500 if instructed by security authorities).",
          "Descend to cabin equalization altitude if differential pressure poses risk.",
          "Airport directs aircraft to designated isolated aircraft parking position (minimum 100 meters from other aircraft and buildings)."
        ],
        "reference": "ICAO Security Manual Doc 8973; DGCA CAR Section 8",
        "example": [
          {
            "speaker": "pilot",
            "text": "MAYDAY MAYDAY MAYDAY, Mumbai Control, IndiGo 610, bomb threat note found on board, descending immediately, request landing Mumbai, isolated parking stand."
          },
          {
            "speaker": "atc",
            "text": "IndiGo 610, Mumbai Control, cleared straight-in approach runway 27, descend to 3,000 feet, taxi to isolated Bay 88 upon landing, security forces mobilized."
          }
        ]
      }
    ]
  },
  {
    "id": "communication-failure",
    "label": "Communication Failure",
    "icon": "WifiOff",
    "topics": [
      {
        "id": "total-comm-failure",
        "title": "Total Two-Way Communication Failure",
        "whenToUse": "Loss of both transmitting and receiving capability under Instrument Flight Rules.",
        "pilotTemplate": "SQUAWK 7600, MAINTAIN FLIGHT PLAN ROUTE AND LEVEL PER ICAO ANNEX 2 RULES",
        "atcTemplate": "ATC clears surrounding traffic and reserves airspace along flight planned route",
        "notes": [
          "Squawk 7600 immediately.",
          "In VMC: continue in visual meteorological conditions, land at nearest suitable aerodrome.",
          "In IMC: maintain last assigned speed and level for 20 minutes following failure to report, then conform to flight plan.",
          "Commence descent at destination holding fix at the latest of EFC time or ETA."
        ],
        "reference": "ICAO Annex 2, Section 3.6.5; DGCA CAR Section 7",
        "example": [
          {
            "speaker": "pilot",
            "text": "[Cockpit action]: Transponder code set to 7600, attempting contact on 121.5 MHz and standby VHF sets."
          }
        ]
      },
      {
        "id": "partial-comm-failure",
        "title": "Transmitter Failure (Receiver Only Working)",
        "whenToUse": "Aircraft can receive ATC instructions but cannot transmit verbally.",
        "pilotTemplate": "[CALLSIGN], IF YOU READ, SQUAWK IDENT / TURN HEADING [DEG]",
        "atcTemplate": "[CALLSIGN], [STATION], SQUAWK IDENT OBSERVED, RADAR TRANSMISSION ACKNOWLEDGED",
        "notes": [
          "ATC instructs pilot to acknowledge transmissions by squawking 'IDENT' or operating transponder mode.",
          "ATC asks pilot to make a turn (e.g. 'Turn left 20 degrees to acknowledge').",
          "Listen carefully to assigned frequencies and watch for radar vectors."
        ],
        "reference": "ICAO Doc 4444, Chapter 15",
        "example": [
          {
            "speaker": "atc",
            "text": "IndiGo 418, Delhi Radar, if you read, squawk IDENT."
          },
          {
            "speaker": "atc",
            "text": "IndiGo 418, squawk IDENT observed, continue on current heading 280, descend to FL 080."
          }
        ]
      },
      {
        "id": "receiver-only",
        "title": "Receiver Failure (Transmitting Blind)",
        "whenToUse": "Aircraft cannot hear ATC, but can transmit blind to broadcast intentions.",
        "pilotTemplate": "[STATION], [CALLSIGN], TRANSMITTING BLIND DUE TO RECEIVER FAILURE, [POSITION], [LEVEL], [INTENTIONS]",
        "atcTemplate": "ATC clears path based on pilot's transmitted blind report",
        "notes": [
          "Prefix all calls with: 'TRANSMITTING BLIND DUE TO RECEIVER FAILURE'.",
          "Transmit the entire message twice, including next reporting point and ETA.",
          "State intentions clearly: cruising level, approach aid to be used, and landing time."
        ],
        "reference": "ICAO Annex 10, Vol II, 5.2.1.7.3",
        "example": [
          {
            "speaker": "pilot",
            "text": "Mumbai Control, VT-AER, transmitting blind due to receiver failure, transmitting blind due to receiver failure: position 30 miles north, FL 090, proceeding direct to runway 27 ILS, landing at 1045."
          }
        ]
      },
      {
        "id": "relay-through-aircraft",
        "title": "Relaying Communication via Airborne Aircraft",
        "whenToUse": "When terrain or atmospheric propagation blocks direct VHF line-of-sight communication with ground ATC.",
        "pilotTemplate": "[AIRCRAFT], [CALLSIGN], UNABLE TO REACH [ATC], REQUEST YOU RELAY OUR [POSITION/ESTIMATE]",
        "atcTemplate": "[RELAYING_AIRCRAFT]: [ATC_NAME], [CALLSIGN] ON GUARD REQUESTS RELAY: [MESSAGE]",
        "notes": [
          "Use 121.5 MHz guard frequency if other air-to-air frequencies fail.",
          "Relaying pilot notes callsign and exact timestamp.",
          "Common in hilly terrain or oceanic entry gaps."
        ],
        "reference": "ICAO Annex 10, Vol II",
        "example": [
          {
            "speaker": "pilot",
            "text": "Air India 102, this is VT-SHR on 121.5, unable contact Jaipur Tower, request relay we are 15 miles south inbound."
          },
          {
            "speaker": "pilot",
            "text": "Jaipur Tower, Air India 102 relaying for VT-SHR: VT-SHR 15 miles south inbound, requesting runway in use."
          }
        ]
      },
      {
        "id": "light-signals",
        "title": "Aerodrome Light Gun Signals",
        "whenToUse": "Optical light gun signals directed by control tower to aircraft with inoperative radio communication.",
        "pilotTemplate": "PILOT ACKNOWLEDGES BY ROCKING WINGS (DAY) OR FLASHING LANDING LIGHTS (NIGHT)",
        "atcTemplate": "TOWER DIRECTS DIRECTED LIGHT BEAM: GREEN / RED / WHITE",
        "notes": [
          "Steady Green: Cleared to land (in flight) / Cleared for takeoff (on ground).",
          "Flashing Green: Return for landing (in flight) / Cleared to taxi (on ground).",
          "Steady Red: Give way to other aircraft and continue circling (in flight) / Stop (on ground).",
          "Flashing Red: Aerodrome unsafe, do not land (in flight) / Taxi clear of runway (on ground).",
          "Flashing White: Land at this aerodrome and proceed to apron (in flight) / Return to starting point on aerodrome (on ground)."
        ],
        "reference": "ICAO Annex 2, Appendix 1; DGCA CAR Section 7 (Crucial Exam Table)",
        "example": [
          {
            "speaker": "atc",
            "text": "[Tower points steady green beam at aircraft on final approach]."
          },
          {
            "speaker": "pilot",
            "text": "[Pilot flashes landing lights twice, acknowledging clearance to land]."
          }
        ]
      },
      {
        "id": "squelch-break",
        "title": "Squelch & Stuck Microphone Procedures",
        "whenToUse": "Procedures when an open microphone or squelch lock blocks an ATC frequency.",
        "pilotTemplate": "[ALL STATIONS], TRANSMISSION BLOCKED / OPEN CARRIER ON [FREQUENCY]",
        "atcTemplate": "[CALLSIGN], CHECK YOUR TRANSMITTER, STUCK MIC ON FREQUENCY",
        "notes": [
          "Listen for high-pitched squeal or background cockpit noises.",
          "Check audio control panel push-to-talk (PTT) switch.",
          "ATC switches non-affected aircraft to secondary frequency: 'ALL STATIONS EXCEPT [CALLSIGN] SWITCH TO 124.8'."
        ],
        "reference": "ICAO Doc 9432",
        "example": [
          {
            "speaker": "atc",
            "text": "All stations on 118.1, we have a stuck microphone, all traffic switch to frequency 125.7 immediately."
          }
        ]
      }
    ]
  },
  {
    "id": "diversion",
    "label": "Diversion",
    "icon": "GitBranch",
    "topics": [
      {
        "id": "weather-diversion",
        "title": "En Route Weather Diversion to Alternate",
        "whenToUse": "Diverting to an alternate aerodrome due to weather below landing minima at destination.",
        "pilotTemplate": "[STATION], [CALLSIGN], DESTINATION WEATHER BELOW MINIMA, DIVERTING TO [ALTERNATE_NAME], REQUEST CLEARANCE",
        "atcTemplate": "[CALLSIGN], [STATION], CLEARED TO [ALTERNATE] VIA [ROUTE], CLIMB FL [LEVEL], SQUAWK [CODE]",
        "notes": [
          "Verify fuel remaining exceeds: trip fuel to alternate + 30/45 min final reserve fuel.",
          "Obtain latest weather and runway in use at alternate before initiating diversion.",
          "Notify company dispatch via ACARS or operational frequency."
        ],
        "reference": "ICAO Annex 6, Operation of Aircraft; DGCA CAR Section 8",
        "example": [
          {
            "speaker": "pilot",
            "text": "Delhi Approach, Air India 312, visibility at Delhi below CAT I minima, diverting to Jaipur, request climb FL 160 routing direct DPN VOR."
          },
          {
            "speaker": "atc",
            "text": "Air India 312, cleared to Jaipur direct DPN VOR, climb FL 160, contact Delhi Control 133.65."
          }
        ]
      },
      {
        "id": "technical-diversion",
        "title": "Technical / Mechanical Diversion",
        "whenToUse": "Diverting to a maintenance base or nearest capable airport due to non-critical system failure.",
        "pilotTemplate": "[CALLSIGN], DIVERTING TO [AERODROME], DUE [SYSTEM_MALFUNCTION], REQUEST [LEVEL/ROUTE]",
        "atcTemplate": "[CALLSIGN], CLEARED TO [AERODROME], DESCEND FL [LEVEL], RADAR VECTORS AVAILABLE",
        "notes": [
          "Assess runway length requirements for degraded flap/brake performance.",
          "Verify emergency ground equipment availability at alternate.",
          "Coordinate with airline maintenance operations center (MOC)."
        ],
        "reference": "ICAO Doc 4444; DGCA CAR Section 8",
        "example": [
          {
            "speaker": "pilot",
            "text": "Mumbai Control, IndiGo 521, single generator failure, precautionary diversion to Ahmedabad, request direct to APANO."
          },
          {
            "speaker": "atc",
            "text": "IndiGo 521, cleared direct APANO, maintain FL 260, Ahmedabad informed."
          }
        ]
      },
      {
        "id": "fuel-diversion",
        "title": "Fuel-Critical Diversion",
        "whenToUse": "Diverting when headwinds, holding, or routing changes erode fuel reserves towards minimum landing limits.",
        "pilotTemplate": "[CALLSIGN], DIVERTING TO [ALTERNATE], FUEL ENDURANCE [HOURS/MINUTES], POB [NUMBER]",
        "atcTemplate": "[CALLSIGN], CLEARED UNRESTRICTED CLIMB TO FL [LEVEL], DIRECT TO [ALTERNATE], EXPEDITE",
        "notes": [
          "Declare MINIMUM FUEL if further delay will breach reserve.",
          "Declare MAYDAY FUEL if expected landing will occur with less than final reserve.",
          "Request shortest possible radar vectors and continuous descent approach."
        ],
        "reference": "ICAO Doc 4444, 15.5.5",
        "example": [
          {
            "speaker": "pilot",
            "text": "Kolkata Control, SpiceJet 704, extended holding at Kolkata, diverting to Bhubaneswar, endurance 1 hour 10 minutes, POB 178."
          },
          {
            "speaker": "atc",
            "text": "SpiceJet 704, cleared direct Bhubaneswar, climb FL 280, straight-in approach runway 14."
          }
        ]
      },
      {
        "id": "medical-diversion",
        "title": "Medical Diversion Execution",
        "whenToUse": "Immediate diversion to closest aerodrome equipped with specialized trauma or medical facilities.",
        "pilotTemplate": "PAN-PAN PAN-PAN PAN-PAN, [CALLSIGN], MEDICAL DIVERSION TO [AERODROME], CRITICAL PASSENGER",
        "atcTemplate": "[CALLSIGN], [STATION], CLEARED DIRECT [AERODROME], EMERGENCY DESCENT AUTHORIZED, AMBULANCE STANDING BY",
        "notes": [
          "Provide pilot estimate of landing time to enable ambulance prepositioning.",
          "Request priority landing and direct routing.",
          "Advise ground handling of emergency gate requirements."
        ],
        "reference": "ICAO Annex 9 (Facilitation)",
        "example": [
          {
            "speaker": "pilot",
            "text": "Nagpur Control, Vistara 982, PAN-PAN PAN-PAN PAN-PAN, passenger having stroke, diverting to Nagpur, request priority descent."
          },
          {
            "speaker": "atc",
            "text": "Vistara 982, cleared direct Nagpur, descend FL 100 unrestricted, medical priority assigned."
          }
        ]
      },
      {
        "id": "alternate-aerodrome",
        "title": "En Route Alternate Selection & Briefing",
        "whenToUse": "Procedures and regulatory criteria for selecting takeoff, en-route, and destination alternates.",
        "pilotTemplate": "[CALLSIGN], REQUEST WEATHER AND RUNWAY STATUS FOR ALTERNATE [AERODROME]",
        "atcTemplate": "[CALLSIGN], [ALTERNATE] WEATHER [METAR_DETAILS], RUNWAY [RWY] IN USE",
        "notes": [
          "Takeoff alternate required if weather at departure aerodrome is below landing minima.",
          "Destination alternate requirements: at least 1 alternate always required for IFR flights unless isolated destination criteria met.",
          "Weather at alternate must be at or above alternate planning minima at estimated time of arrival."
        ],
        "reference": "ICAO Annex 6, Chapter 4; DGCA CAR Section 8",
        "example": [
          {
            "speaker": "pilot",
            "text": "Delhi Control, Air India 410, request latest weather for Lucknow and Jaipur alternates."
          },
          {
            "speaker": "atc",
            "text": "Air India 410, Lucknow CAVOK, Jaipur visibility 3000m in haze, both runways open."
          }
        ]
      }
    ]
  },
  {
    "id": "airport-codes",
    "label": "Airport Codes & Airspace",
    "icon": "MapPin",
    "topics": [
      {
        "id": "icao-codes-india",
        "title": "Indian ICAO Aerodrome Codes",
        "whenToUse": "The 4-letter ICAO location indicators for Indian airports starting with prefix 'VI' (North), 'VA' (West/Central), 'VE' (East), 'VO' (South).",
        "pilotTemplate": "[AIRPORT_NAME] = [4-LETTER_ICAO_CODE]",
        "atcTemplate": "Used in all IFR flight plans, NOTAMs, METARs, and ATC clearances",
        "notes": [
          "Delhi (Indira Gandhi): VIDP (Northern region).",
          "Mumbai (Chhatrapati Shivaji Maharaj): VABB (Western region).",
          "Bengaluru (Kempegowda): VOBL (Southern region).",
          "Chennai (Meenambakkam): VOMM (Southern region).",
          "Kolkata (Netaji Subhash Chandra Bose): VECC (Eastern region).",
          "Hyderabad (Rajiv Gandhi): VOHS; Ahmedabad: VAAH; Cochin: VOCI; Goa (Dabolim): VAGO / Mopa: VOGA."
        ],
        "reference": "ICAO Doc 7910 (Location Indicators); DGCA AIP India GEN 2.4",
        "example": [
          {
            "speaker": "pilot",
            "text": "Flight plan filed: Route VIDP to VABB via airway W13, alternate VAAH."
          },
          {
            "speaker": "atc",
            "text": "Cleared flight plan VIDP to VABB via EXOLU."
          }
        ]
      },
      {
        "id": "icao-codes-international",
        "title": "Major International ICAO Codes",
        "whenToUse": "Key international hub aerodrome identifiers frequently tested in DGCA RTR examinations.",
        "pilotTemplate": "[CITY] = [ICAO_CODE] (e.g. Dubai = OMDB, London Heathrow = EGLL, Singapore = WSSS)",
        "atcTemplate": "Standard international ICAO 4-letter format",
        "notes": [
          "Gulf: Dubai (OMDB), Doha (OTHH), Abu Dhabi (OMAA), Muscat (OOMS).",
          "Europe: London Heathrow (EGLL), Frankfurt (EDDF), Paris Charles de Gaulle (LFPG), Amsterdam (EHAM).",
          "Asia-Pacific: Singapore Changi (WSSS), Bangkok Suvarnabhumi (VTBS), Hong Kong (VHHH), Kuala Lumpur (WMKK).",
          "USA: New York JFK (KJFK), Los Angeles (KLAX), Chicago O'Hare (KORD)."
        ],
        "reference": "ICAO Doc 7910",
        "example": [
          {
            "speaker": "pilot",
            "text": "Filed route: VABB direct OMDB via oceanic airway G450."
          }
        ]
      },
      {
        "id": "iata-vs-icao",
        "title": "IATA vs ICAO Codes Comparison",
        "whenToUse": "Differences between commercial 3-letter IATA codes and technical 4-letter ICAO operational indicators.",
        "pilotTemplate": "IATA (Commercial/Ticketing) vs ICAO (Navigation/ATC/Meteorology)",
        "atcTemplate": "Air traffic control and radiotelephony exclusively utilize ICAO 4-letter codes",
        "notes": [
          "IATA codes (e.g. DEL, BOM, BLR) are used for passenger baggage tags, tickets, and schedules.",
          "ICAO codes (e.g. VIDP, VABB, VOBL) are used for air traffic services, flight plans, NOTAMs, and METARs.",
          "DGCA Part 2 rule: In radio telephony examinations, always refer to airports using ICAO identifiers or full spoken names."
        ],
        "reference": "ICAO Annex 10; IATA Airline Coding Directory",
        "example": [
          {
            "speaker": "pilot",
            "text": "DEL is IATA for Delhi; VIDP is the official ICAO identifier for navigation."
          }
        ]
      },
      {
        "id": "fir-boundaries",
        "title": "Indian Flight Information Regions (FIRs)",
        "whenToUse": "The five territorial FIR divisions of Indian airspace responsible for flight information and alerting services.",
        "pilotTemplate": "[FIR_NAME] ACC: Delhi, Mumbai, Kolkata, Chennai, and Guwahati Sub-FIR",
        "atcTemplate": "Each FIR provides Area Control (ACC) and Flight Information Services",
        "notes": [
          "Delhi FIR (VIDF): Covers Northern India.",
          "Mumbai FIR (VABF): Covers Western and Central India plus Arabian Sea oceanic airspace.",
          "Kolkata FIR (VECF): Covers Eastern and North-Eastern India plus northern Bay of Bengal.",
          "Chennai FIR (VOMF): Covers Southern peninsular India and southern Bay of Bengal / Indian Ocean.",
          "Guwahati Sub-FIR: Subordinate to Kolkata FIR for mountainous north-east borders."
        ],
        "reference": "DGCA AIP India ENR 2.1 (FIR Boundaries)",
        "example": [
          {
            "speaker": "pilot",
            "text": "Air India 101, crossing from Delhi FIR to Mumbai FIR over waypoint APANO at FL 360."
          },
          {
            "speaker": "atc",
            "text": "Air India 101, contact Mumbai Control on 132.35."
          }
        ]
      },
      {
        "id": "runway-designators",
        "title": "Runway Designators & Magnetic Orientation",
        "whenToUse": "How runway numbering is determined from magnetic orientation rounded to nearest 10 degrees.",
        "pilotTemplate": "RUNWAY [TWO_DIGITS] [L/C/R] (e.g. Runway 28, Runway 09 Left)",
        "atcTemplate": "Designated based on magnetic heading rounded to nearest tenth degree (e.g. 278° = Runway 28)",
        "notes": [
          "Parallel runways are labeled L (Left), R (Right), and C (Center).",
          "If magnetic variation shifts significantly, runway numbers are repainted (e.g. 28 becoming 29).",
          "Reciprocal runway is exactly 180° opposite (e.g. RWY 09 and RWY 27)."
        ],
        "reference": "ICAO Annex 14, Volume I (Aerodromes)",
        "example": [
          {
            "speaker": "atc",
            "text": "Cleared to land runway 09 Left, wind 090 at 12 knots."
          },
          {
            "speaker": "pilot",
            "text": "Cleared to land runway 09 Left, VT-AER."
          }
        ]
      },
      {
        "id": "ats-frequencies",
        "title": "Aeronautical Frequency Bands & ATC Units",
        "whenToUse": "VHF and HF spectrum allocations for civil aviation air traffic control units.",
        "pilotTemplate": "VHF Spectrum: 118.000 MHz to 136.975 MHz with 8.33 kHz or 25 kHz channel spacing",
        "atcTemplate": "Units: Delivery -> Ground -> Tower -> Departure -> Approach -> Area Control (ACC)",
        "notes": [
          "Emergency Guard: 121.500 MHz (civilian VHF) and 243.000 MHz (military UHF).",
          "ATIS: Continuous recorded broadcast on dedicated VHF channel.",
          "HF (High Frequency) 2.8 MHz to 22 MHz used for long-range oceanic communication beyond VHF line-of-sight."
        ],
        "reference": "ICAO Annex 10, Volume V; DGCA CAR Section 7",
        "example": [
          {
            "speaker": "pilot",
            "text": "Tuning VHF COM 1 to 118.1 (Tower), COM 2 monitoring 121.5 (Guard)."
          }
        ]
      }
    ]
  },
  {
    "id": "phraseology-questions",
    "label": "Phraseology Questions & Exam Rules",
    "icon": "HelpCircle",
    "topics": [
      {
        "id": "readability-scale",
        "title": "Readability Scale 1 to 5 (Radio Checks)",
        "whenToUse": "The exact numerical grading used for assessing voice transmission quality in radiotelephony.",
        "pilotTemplate": "[CALLSIGN], HOW DO YOU READ?",
        "atcTemplate": "[STATION], READ YOU [1 to 5]",
        "notes": [
          "1 = Unreadable.",
          "2 = Readable now and then.",
          "3 = Readable with difficulty.",
          "4 = Readable.",
          "5 = Perfectly readable.",
          "Exam Trap: Never answer 'Loud and clear' or 'Five by five'. In DGCA oral examinations, strictly state 'Read you 5' or 'Readability 3'."
        ],
        "reference": "ICAO Annex 10, Vol II, 5.2.1.8.4",
        "example": [
          {
            "speaker": "pilot",
            "text": "Delhi Tower, VT-AER, how do you read?"
          },
          {
            "speaker": "atc",
            "text": "VT-AER, read you 5."
          }
        ]
      },
      {
        "id": "numbers-pronunciation",
        "title": "Aviation Number Pronunciation Rules",
        "whenToUse": "Standard phonetic pronunciation of digits to prevent phonetic confusion over radio channels.",
        "pilotTemplate": "0=ZE-RO, 1=WUN, 2=TOO, 3=TREE, 4=FOW-ER, 5=FIFE, 6=SIX, 7=SEV-EN, 8=AIT, 9=NIN-ER",
        "atcTemplate": "Decimal point is spoken as 'DECIMAL'; 100 as 'HUNDRED'; 1,000 as 'TOUSAND'",
        "notes": [
          "Number 9 is pronounced 'NINER' to avoid confusion with German 'nein' (no).",
          "Number 3 is pronounced 'TREE' (no 'th' sound).",
          "Number 4 is pronounced 'FOW-ER' (two syllables).",
          "Altitude 10,000 ft is spoken as: 'WUN TOUSAND' or 'WUN ZERO TOUSAND'."
        ],
        "reference": "ICAO Annex 10, Vol II, 5.2.1.4.3",
        "example": [
          {
            "speaker": "atc",
            "text": "Squawk 3549 (TREE FIFE FOW-ER NIN-ER)."
          },
          {
            "speaker": "pilot",
            "text": "Squawk 3549 (TREE FIFE FOW-ER NIN-ER), VT-AER."
          }
        ]
      },
      {
        "id": "time-format",
        "title": "Time Representation in Radiotelephony",
        "whenToUse": "How time is spoken in aviation using Coordinated Universal Time (UTC / Zulu).",
        "pilotTemplate": "Normally only minutes are transmitted if hour is clear (e.g. 0924 spoken as 'TOO FOW-ER')",
        "atcTemplate": "Full four digits spoken when confusion is possible: 'ZE-RO NIN-ER TOO FOW-ER'",
        "notes": [
          "Always referenced to Greenwich Mean Time (UTC / Zulu), never local time (IST).",
          "India Standard Time (IST) is UTC + 5 hours 30 minutes.",
          "Example: 1430 IST is 0900 UTC."
        ],
        "reference": "ICAO Annex 10, Vol II, 5.2.1.4.2",
        "example": [
          {
            "speaker": "atc",
            "text": "Estimate BUTOP at time 45 (FOW-ER FIFE)."
          },
          {
            "speaker": "pilot",
            "text": "Estimating BUTOP at 45, Air India 101."
          }
        ]
      },
      {
        "id": "flight-levels-vs-altitude",
        "title": "Flight Level vs Altitude vs Height",
        "whenToUse": "Understanding vertical distance references and altimeter sub-scale settings.",
        "pilotTemplate": "Flight Level (Standard 1013.25 hPa) vs Altitude (QNH - Sea Level) vs Height (QFE - Aerodrome)",
        "atcTemplate": "Transition Altitude (climbing): switch from QNH to Standard 1013. Transition Level (descending): switch to QNH",
        "notes": [
          "Altitude: Measured above Mean Sea Level using local QNH.",
          "Flight Level: Measured above standard isobaric surface (1013.25 hPa / 29.92 inHg).",
          "Height: Measured above aerodrome reference point using QFE.",
          "Transition Layer is the airspace between Transition Altitude and Transition Level."
        ],
        "reference": "ICAO Doc 8168, PANS-OPS Vol I; DGCA CAR Section 9",
        "example": [
          {
            "speaker": "atc",
            "text": "Climb to FL 140, passing transition altitude 4,000 feet, set standard 1013."
          },
          {
            "speaker": "pilot",
            "text": "Climb FL 140, standard set, cross-checked, Air India 202."
          }
        ]
      },
      {
        "id": "qnh-qfe-qne",
        "title": "Q Codes: QNH, QFE, and QNE",
        "whenToUse": "The classic aeronautical Q-signals used for barometric altimeter calibration.",
        "pilotTemplate": "QNH = Altimeter reads airfield elevation on ground. QFE = Altimeter reads zero on ground. QNE = Standard 1013.25",
        "atcTemplate": "Mandatory readback required for all QNH altimeter setting values",
        "notes": [
          "QNH (Question Normal Height): Barometric pressure adjusted to sea level according to standard atmosphere.",
          "QFE (Question Field Elevation): Barometric pressure at aerodrome elevation. Altimeter reads zero at runway touchdown.",
          "QNE: The altitude indicated on landing when standard 1013.25 hPa is set on subscale (used at high elevation airfields)."
        ],
        "reference": "ICAO Annex 10; DGCA CAR Section 7 (Frequent Oral Question)",
        "example": [
          {
            "speaker": "atc",
            "text": "IndiGo 302, QNH 1015, descend to 3,000 feet."
          },
          {
            "speaker": "pilot",
            "text": "QNH 1015, descend to 3,000 feet, IndiGo 302."
          }
        ]
      },
      {
        "id": "priority-of-messages",
        "title": "Order of Priority for Radio Messages",
        "whenToUse": "The international hierarchy governing which transmissions take precedence over radio channels.",
        "pilotTemplate": "Order 1 to 6: Distress -> Urgency -> Direction Finding -> Flight Safety -> Meteorological -> Flight Regularity",
        "atcTemplate": "Distress messages (MAYDAY) have absolute paramount priority",
        "notes": [
          "1. Distress calls, messages, and traffic (MAYDAY).",
          "2. Urgency messages (PAN-PAN).",
          "3. Communications relating to Direction Finding.",
          "4. Flight Safety messages (ATC clearances, position reports).",
          "5. Meteorological messages (SIGMET, AIRMET, weather reports).",
          "6. Flight Regularity messages (company operations, arrival times, passenger connections)."
        ],
        "reference": "ICAO Annex 10, Vol II, Section 5.1.8 (Core DGCA Exam Question)",
        "example": [
          {
            "speaker": "atc",
            "text": "All stations, cease transmission, MAYDAY in progress on frequency."
          }
        ]
      },
      {
        "id": "compulsory-readback",
        "title": "Mandatory Read-Back Items (The Golden Rule)",
        "whenToUse": "List of safety-critical instructions that MUST always be read back verbatim to prevent misunderstandings.",
        "pilotTemplate": "Pilot must repeat back all safety-critical parameters with callsign appended",
        "atcTemplate": "ATC must listen to verify accuracy of read-back",
        "notes": [
          "1. Level / Altitude / Flight Level instructions.",
          "2. Heading and speed assignments.",
          "3. Runway in use.",
          "4. Altimeter settings (QNH / QFE).",
          "5. SSR Transponder codes (Squawk).",
          "6. Taxi, hold short, enter, land, takeoff, and runway crossing clearances.",
          "7. Transition levels and frequency changes."
        ],
        "reference": "ICAO Doc 4444, Chapter 12; DGCA CAR Section 7",
        "example": [
          {
            "speaker": "atc",
            "text": "SpiceJet 401, squawk 4512, turn left heading 240, climb FL 280."
          },
          {
            "speaker": "pilot",
            "text": "Squawk 4512, turn left heading 240, climb FL 280, SpiceJet 401."
          }
        ]
      },
      {
        "id": "silence-procedures",
        "title": "SILENCE MAYDAY & SILENCE FINI",
        "whenToUse": "Controlling radio silence during ongoing distress emergencies.",
        "pilotTemplate": "STOP TRANSMITTING — MAYDAY / SILENCE MAYDAY / SILENCE FINI",
        "atcTemplate": "Imposed by station in distress or controlling ATC authority",
        "notes": [
          "'STOP TRANSMITTING — MAYDAY': Imposed on a specific interfering station.",
          "'SILENCE MAYDAY': Imposed to all stations to clear frequency for distress traffic.",
          "'SILENCE FINI': Pronounced 'See-lahns Fee-nee', indicates distress traffic has ended and normal communication may resume."
        ],
        "reference": "ICAO Annex 10, Vol II, 5.3.3.5",
        "example": [
          {
            "speaker": "atc",
            "text": "All stations on 125.7, SILENCE MAYDAY."
          },
          {
            "speaker": "atc",
            "text": "All stations on 125.7, SILENCE FINI, resume normal communications."
          }
        ]
      },
      {
        "id": "standard-words",
        "title": "Standard Aviation Terminology & Meanings",
        "whenToUse": "The precise operational definitions of standard ICAO radiotelephony phraseology.",
        "pilotTemplate": "Standard aeronautical words with precise legal meanings",
        "atcTemplate": "Never substitute informal slang (e.g. 'Yeah', 'Okay', 'Roger that', 'Will do')",
        "notes": [
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
        "reference": "ICAO Doc 9432 (Manual of Radiotelephony); DGCA CAR Section 7",
        "example": [
          {
            "speaker": "atc",
            "text": "Air India 302, can you expedite descent to FL 140?"
          },
          {
            "speaker": "pilot",
            "text": "Unable expedite due turbulence, Air India 302."
          }
        ]
      },
      {
        "id": "callsign-abbreviation",
        "title": "Aircraft Callsign Abbreviation Rules",
        "whenToUse": "When and how civil aircraft callsigns may be legally abbreviated over radio channels.",
        "pilotTemplate": "Abbreviation permitted ONLY after ATC initiates abbreviation first",
        "atcTemplate": "Full callsign must always be used on initial contact with any new frequency",
        "notes": [
          "Registration VT-AER: Abbreviates to V-ER (First character and at least last two characters).",
          "Callsign with flight number (e.g. Air India 101, IndiGo 402): CANNOT be abbreviated.",
          "If confusion arises with similar callsign on frequency, ATC will instruct full callsign usage.",
          "Heavy aircraft suffix: Append 'HEAVY' (MTOW 136,000 kg or greater) or 'SUPER' (Airbus A380)."
        ],
        "reference": "ICAO Annex 10, Vol II, 5.2.1.7; DGCA CAR Section 7",
        "example": [
          {
            "speaker": "pilot",
            "text": "Delhi Tower, Victor Tango Alpha Echo Romeo, holding short runway 28."
          },
          {
            "speaker": "atc",
            "text": "V-ER, line up and wait runway 28."
          },
          {
            "speaker": "pilot",
            "text": "Line up and wait runway 28, V-ER."
          }
        ]
      }
    ]
  }
];
