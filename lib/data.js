export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export const PHASES = [
  { name: 'Phase 1 · Base building', weeks: [1,2,3,4,5,6] },
  { name: 'Phase 2 · Build & tempo', weeks: [7,8,9,10,11,12,13,14] },
  { name: 'Phase 3 · Peak & consolidate', weeks: [15,16,17,18,19] },
  { name: 'Phase 4 · Taper', weeks: [20,21,22] },
]

const gym_a   = { type: 'gym',      km: 0,    label: 'Gym',       note: 'Glutes · hips · core · single-leg · 40 min' }
const gym_b   = { type: 'gym',      km: 0,    label: 'Gym',       note: 'Upper body + core only · 40 min' }
const gym_lt  = { type: 'gym',      km: 0,    label: 'Gym',       note: 'Light full body · no heavy legs · 40 min' }
const rest    = { type: 'rest',     km: 0,    label: 'Rest',      note: 'Rest day' }
const easy = (km, note) => ({ type: 'easy', km, label: 'Easy', note: note || 'Easy pace 6:20–6:40/km · conversational' })
const long = (km, note) => ({ type: 'long', km, label: 'Long run', note: note || 'Easy pace 6:20–6:40/km' })
const recov = (km, note) => ({ type: 'recovery', km, label: 'Long run', note: note || 'Recovery long — keep it easy' })
const tempo = (km, t)   => ({ type: 'tempo', km, label: 'Tempo', note: `2 km warm-up · ${t} km @ 5:41/km · 2 km cool-down` })
const shake = (km, note) => ({ type: 'shakeout', km, label: 'Shakeout', note })
const RACE  = { type: 'race', km: 21.1, label: 'Race!', note: 'Sub 2:00 · Pace first 5 km @ 5:50/km, then settle to 5:41/km' }

// Mon Tue Wed Thu Fri Sat Sun
export const WEEKS = [
  // Phase 1
  [gym_a, easy(6), easy(6), easy(6), gym_b, long(9), rest],
  [gym_a, easy(6), easy(6), easy(6), gym_b, long(10), rest],
  [gym_a, easy(5), easy(5), easy(5), gym_b, recov(8, 'Recovery week — keep it easy'), rest],
  [gym_a, easy(6), easy(6), easy(6), gym_b, long(11), rest],
  [gym_a, easy(6), easy(6), easy(6), gym_b, long(12), rest],
  [gym_a, easy(5), easy(5), easy(5), gym_b, recov(10, 'Recovery week — keep it easy'), rest],
  // Phase 2
  [gym_a, easy(6), tempo(8,4),  easy(6), gym_b, long(13,  'Easy pace 6:10–6:30/km'), rest],
  [gym_a, easy(6), tempo(9,5),  easy(6), gym_b, long(14,  'Easy pace 6:10–6:30/km'), rest],
  [gym_a, easy(5), easy(5),     easy(5), gym_b, recov(11, 'Recovery week — short & easy'), rest],
  [gym_a, easy(6), tempo(9,5),  easy(6), gym_b, long(15,  'Easy pace 6:10–6:30/km'), rest],
  [gym_a, easy(6), tempo(10,6), easy(6), gym_b, long(16,  'Easy pace 6:10–6:30/km'), rest],
  [gym_a, easy(5), easy(5),     easy(5), gym_b, recov(13, 'Recovery week — short & easy'), rest],
  [gym_a, easy(6), tempo(10,6), easy(6), gym_b, long(17,  'Easy pace 6:10–6:30/km'), rest],
  [gym_a, easy(6), tempo(11,7), easy(6), gym_b, long(18,  'Easy pace 6:10–6:30/km'), rest],
  // Phase 3
  [gym_a, easy(5), easy(5),     easy(5), gym_b, recov(14, 'Recovery week — keep it easy'), rest],
  [gym_a, easy(6), tempo(12,8), easy(6), gym_b, long(19,  'Easy pace 6:10/km'), rest],
  [gym_a, easy(6), easy(6),     easy(6), gym_b, long(20,  'Goal pace 5:41/km — your peak run!'), rest],
  [gym_a, easy(5), easy(5),     easy(5), gym_b, recov(15, 'Recovery week — keep it easy'), rest],
  [gym_a, easy(6), tempo(12,8), easy(6), gym_b, long(18,  'Confidence run — easy & relaxed'), rest],
  // Phase 4
  [gym_lt, easy(6), easy(5), easy(5), rest, long(14, 'Easy pace — enjoy the run'), rest],
  [gym_b,  easy(5), shake(4, '4 km easy + 4×100 m strides'), easy(4), rest, recov(10, 'Relaxed — feel your legs'), rest],
  [rest, shake(3, 'Very easy shakeout'), rest, shake(2, '2 km easy + light strides'), rest, RACE, rest],
]
