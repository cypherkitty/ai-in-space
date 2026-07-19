export type CopyPack = {
  kicker: string;
  title: string;
  titleLine2: string;
  summary: string;
  action: string;
};

const originalCopyPacks: CopyPack[] = [
  { kicker: 'Observation begins with attention', title: 'Make distance', titleLine2: 'observable', summary: 'Patient systems reveal structure in signals that arrive faint, late, and incomplete.', action: 'See the field' },
  { kicker: 'A machine can learn to look', title: 'Teach machines', titleLine2: 'to wonder', summary: 'Useful intelligence starts by knowing the difference between an answer and a better question.', action: 'Open the inquiry' },
  { kicker: 'Field note / the work continues', title: 'The sky', titleLine2: 'is unfinished', summary: 'Every observation changes the map and gives the next mission somewhere new to begin.', action: 'Read the notes' },
  { kicker: 'Quiet evidence / live', title: 'Notice', titleLine2: 'what waits', summary: 'We build instruments for the patterns that only appear when nothing is rushed.', action: 'Begin observing' },
  { kicker: 'Autonomy across distance', title: 'Farther out.', titleLine2: 'Clearer in.', summary: 'Reasoning at the edge makes each transmission smaller, sharper, and more useful.', action: 'Follow the signal' },
  { kicker: 'Listening is a technical discipline', title: 'Let silence', titleLine2: 'become evidence', summary: 'Absence has structure. The right model can tell quiet from empty.', action: 'Inspect the signal' },
  { kicker: 'A living index of elsewhere', title: 'A map', titleLine2: 'that keeps learning', summary: 'Observations remain connected as instruments, missions, and hypotheses evolve.', action: 'Enter the atlas' },
  { kicker: 'Mission systems / delay tolerant', title: 'Build for', titleLine2: 'the long delay', summary: 'When Earth cannot answer in time, bounded intelligence keeps the work moving.', action: 'View the system' },
  { kicker: 'Detection threshold / 0.04', title: 'Find the', titleLine2: 'almost invisible', summary: 'The most important discovery may begin as a difference too small to trust at first glance.', action: 'Examine the trace' },
  { kicker: 'Signals are only the beginning', title: 'Turn signals', titleLine2: 'into questions', summary: 'A good observatory does more than collect. It helps a team decide what deserves another look.', action: 'Ask what follows' },
  { kicker: 'Shared context / one observable world', title: 'One sky.', titleLine2: 'More context.', summary: 'A common intelligence layer lets distant missions contribute to the same evolving picture.', action: 'Connect the field' },
  { kicker: 'Local inference / orbital time', title: 'Reason at', titleLine2: 'orbital speed', summary: 'Models close to the instrument can protect the moments that matter before they pass.', action: 'See the runtime' },
  { kicker: 'Continuous survey / night side', title: 'Keep watch', titleLine2: 'beyond daylight', summary: 'Autonomous observation carries the research forward through every communications window.', action: 'Track the survey' },
  { kicker: 'From observation to intent', title: 'Where data', titleLine2: 'becomes direction', summary: 'Evidence becomes useful when scientists can trace how it changed the next decision.', action: 'Follow the path' },
  { kicker: 'Decision support / deep field', title: 'See earlier.', titleLine2: 'Decide better.', summary: 'Faster recognition leaves more time for the careful human judgment that follows.', action: 'Review the model' },
  { kicker: 'Tools for unhurried discovery', title: 'Machines for', titleLine2: 'patient science', summary: 'The goal is not instant certainty. It is disciplined attention at impossible scale.', action: 'Meet the instruments' },
  { kicker: 'Carrier analysis / adaptive', title: 'Listen past', titleLine2: 'the noise', summary: 'Separate the unusual from the accidental without pretending uncertainty has disappeared.', action: 'Tune the relay' },
  { kicker: 'Protocol / uncertainty remains', title: 'Leave room', titleLine2: 'for the unknown', summary: 'A trustworthy system preserves ambiguity instead of smoothing it into a convenient answer.', action: 'Read the protocol' },
  { kicker: 'Research principle / 01', title: 'Observe first.', titleLine2: 'Assume less.', summary: 'Better models begin with evidence that remains inspectable, contestable, and alive.', action: 'Explore the method' },
  { kicker: 'Progress measured in clarity', title: 'A quieter', titleLine2: 'kind of progress', summary: 'Not louder predictions. Better context, clearer limits, and decisions a team can understand.', action: 'See the approach' },
  { kicker: 'Photon archive / faint source', title: 'Learn from', titleLine2: 'the faintest light', summary: 'Very old light still carries new information when every trace can be compared in context.', action: 'Open the archive' },
  { kicker: 'Intelligence belongs in context', title: 'Intelligence', titleLine2: 'with a horizon', summary: 'Models should know where their view ends and where another instrument must take over.', action: 'Find the boundary' },
  { kicker: 'Inquiry survives the distance', title: 'Keep asking', titleLine2: 'from farther away', summary: 'Exploration advances when missions can form useful next questions before Earth replies.', action: 'Continue outward' },
  { kicker: 'The useful output is curiosity', title: 'Not answers.', titleLine2: 'Better questions.', summary: 'We design intelligence to expand scientific judgment, not to perform certainty.', action: 'Start a question' }
];

type SloganRow = readonly [title: string, titleLine2: string, kicker: string, summary: string];

const newSloganRows: SloganRow[] = [
  // Perception / signals
  ['Catch the light', 'before it fades', 'Transient survey / capture open', 'Fast phenomena deserve instruments that can recognize a fleeting event before it becomes history.'],
  ['Let the orbit', 'finish the thought', 'Repeat pass / context retained', 'Each return adds another angle, another condition, and a stronger reason to believe the pattern.'],
  ['Give uncertainty', 'a visible shape', 'Confidence field / limits shown', 'We make doubt legible so a team can see where evidence ends and interpretation begins.'],
  ['Find order', 'in the afterglow', 'Residual light / structure search', 'What remains after the bright event can reveal more than the event itself.'],
  ['Watch the dark', 'change its mind', 'Night field / continuous comparison', 'Long observation turns an apparently empty frame into a record of subtle change.'],
  ['Read the silence', 'between pulses', 'Interval study / receiver steady', 'The spacing around a signal may carry the structure the signal alone cannot explain.'],
  ['Make room', 'for the strange', 'Anomaly channel / unfiltered', 'Discovery needs a place where unusual evidence can survive long enough to be examined.'],
  ['Follow the trace', 'past certainty', 'Evidence path / inquiry active', 'A useful system keeps looking after the first explanation begins to feel comfortable.'],
  ['Keep the evidence', 'in motion', 'Live comparison / archive linked', 'New observations should keep testing old conclusions instead of merely joining a pile.'],
  ['Ask the horizon', 'what moved', 'Edge scan / parallax detected', 'Change becomes visible when the boundary of one observation is compared with the next.'],

  // Distance / autonomy
  ['Let distant worlds', 'speak locally', 'Edge inference / world side', 'Models near the instrument can translate raw conditions into useful evidence before contact returns.'],
  ['Build judgment', 'near the sensor', 'Local reasoning / bounded mode', 'The shortest path from observation to a careful decision begins beside the data.'],
  ['Think before', 'the signal returns', 'Round trip / autonomy active', 'A mission can protect its best opportunities while Earth is still waiting for the first transmission.'],
  ['Put the model', 'aboard', 'Flight compute / science loaded', 'Bring enough intelligence with the instrument to recognize when the plan should change.'],
  ['Send insight', 'not the noise', 'Downlink scarce / meaning first', 'Distill immense local data into the evidence and context a distant team can actually use.'],
  ['Leave Earth', 'a clearer question', 'Return channel / inquiry refined', 'Good autonomy does not replace the team; it returns a more precise reason for the next command.'],
  ['Make latency', 'part of the plan', 'Delay model / operations ready', 'Communication time becomes a design material when the mission knows how to work through it.'],
  ['Decide where', 'the data begins', 'Instrument boundary / logic placed', 'Put the first careful judgment close enough to the event that nothing important is discarded.'],
  ['Carry context', 'across the void', 'Transmission frame / provenance intact', 'A conclusion travels better when the observations, assumptions, and limits travel with it.'],
  ['Work while', 'the answer travels', 'Contact window / science continues', 'Exploration should keep moving during the long interval between a question and its reply.'],

  // Uncertainty / trust
  ['Doubt is', 'useful telemetry', 'Uncertainty channel / nominal', 'Confidence belongs beside every result, visible enough to influence the next move.'],
  ['Certainty can', 'wait outside', 'Review room / evidence first', 'The system presents what happened before asking the data to support a finished story.'],
  ['Mark the limit', 'then look beyond', 'Model edge / boundary mapped', 'Knowing exactly where an instrument becomes unreliable is the beginning of a better experiment.'],
  ['Let the unknown', 'stay honest', 'Open classification / no forced label', 'Not every signal needs an immediate name; some need a protected place to remain unresolved.'],
  ['Keep ambiguity', 'on the screen', 'Multiple hypotheses / still active', 'Competing explanations remain visible until the evidence earns a narrower view.'],
  ['Trust the trace', 'not the shortcut', 'Audit path / full provenance', 'Every inference should lead back to the measurement that made it possible.'],
  ['Name what', 'we cannot know', 'Knowledge boundary / reported', 'Explicit limits make the useful part of a result stronger, not weaker.'],
  ['Give every answer', 'an edge', 'Confidence contour / rendered', 'A conclusion becomes safer when its valid range is as clear as its center.'],
  ['Hold the question', 'open longer', 'Inquiry state / unresolved by design', 'Patient systems preserve promising uncertainty instead of closing it for convenience.'],
  ['Measure twice', 'infer once', 'Verification pass / logic restrained', 'A second independent look is cheaper than building a mission around a persuasive mistake.'],

  // Navigation / orientation
  ['Navigate by', 'living maps', 'Route model / field updating', 'The path changes as new observations redraw what the mission knows about its surroundings.'],
  ['Chart what', 'refuses coordinates', 'Unplaced source / search expanding', 'Some phenomena become useful only after the map admits that their location is still uncertain.'],
  ['Let the route', 'learn forward', 'Trajectory study / evidence coupled', 'A mission can revise where it goes without losing why the earlier path made sense.'],
  ['Cross the gap', 'with context', 'Navigation frame / history attached', 'Every correction becomes more reliable when it remembers the conditions that produced it.'],
  ['A compass', 'for changing skies', 'Dynamic field / orientation stable', 'Intelligence helps a mission stay oriented when the environment will not hold still.'],
  ['Map the motion', 'not the moment', 'Time series / orbit resolved', 'A single frame suggests; a connected sequence reveals what the system is becoming.'],
  ['Draw the path', 'as it happens', 'Live ephemeris / trace writing', 'The mission records its changing route as evidence, not merely as a line between destinations.'],
  ['Orient around', 'the anomaly', 'Reference shift / object centered', 'When something unexpected appears, the surrounding plan can become a new instrument for studying it.'],
  ['Route attention', 'where it matters', 'Observation queue / value weighted', 'Limited time is spent on the measurements most capable of changing the picture.'],
  ['Make the unknown', 'navigable', 'Exploration field / next step visible', 'We do not need a complete map to identify one careful direction forward.'],

  // Time / continuity
  ["Yesterday's light", 'arrives today', 'Photon age / receiver present', 'Every observation joins distant history to the instrument reading it now.'],
  ['Time is', 'part of the sensor', 'Duration channel / integrated', 'How long we watch can matter as much as the wavelength or resolution we choose.'],
  ['Let slow signals', 'become clear', 'Long baseline / patience active', 'Processes too gradual for a moment become legible when the system knows how to wait.'],
  ['Keep science', 'between contacts', 'Comms dark / research uninterrupted', 'The mission continues testing and observing even when no conversation with Earth is possible.'],
  ['Wait well', 'then move precisely', 'Timing model / action deferred', 'Restraint can preserve energy, attention, and the one observation that matters most.'],
  ['Remember the', 'missing hours', 'Contact gap / state reconstructed', 'A resilient record makes the unseen interval part of the scientific story.'],
  ['Observe across', 'impossible durations', 'Deep time / comparison online', 'Machines can hold attention across spans no individual observer could continuously inhabit.'],
  ['Make each pass', 'count twice', 'Return orbit / comparison planned', 'Every revisit both measures the present and tests what the previous orbit seemed to show.'],
  ['The next orbit', 'knows more', 'Cumulative survey / context growing', 'A returning instrument should arrive with every useful lesson from the last encounter.'],
  ['Save the moment', 'Earth will miss', 'Local event / capture protected', 'Onboard recognition preserves short-lived evidence that cannot wait for permission.'],

  // Memory / context
  ['Memory makes', 'distance useful', 'Mission archive / context warm', 'Stored observations turn separation in space and time into material for comparison.'],
  ['Give the archive', 'a pulse', 'Historical data / live query', 'Past measurements become active participants whenever a new signal resembles an old mystery.'],
  ['Connect events', 'across the quiet', 'Sparse sequence / relation found', 'Long silence does not break the story when the system can preserve and compare its edges.'],
  ['Keep every', 'useful contradiction', 'Conflict log / evidence retained', 'Disagreement between instruments can be the clue that reveals a hidden condition.'],
  ['Let history', 'sharpen the now', 'Prior observations / present focus', 'What happened before helps the mission choose which detail deserves resolution today.'],
  ['Build a record', 'that can disagree', 'Versioned evidence / conclusions open', 'A trustworthy archive keeps the observations that challenge its current interpretation.'],
  ['Store the why', 'beside the what', 'Decision log / intent attached', 'Data remains useful longer when future teams can recover the question behind it.'],
  ['Make context', 'survive the mission', 'Knowledge relay / handoff ready', 'The next instrument should inherit more than files; it should inherit the reasoning around them.'],
  ['Return with', 'the whole story', 'Science packet / limits included', 'Results arrive with their provenance, uncertainty, and the alternatives still under review.'],
  ['Nothing observed', 'stands alone', 'Shared field / relations visible', 'Every signal gains meaning from the instruments, environments, and histories around it.'],

  // Anomalies / discovery
  ['Anomalies deserve', 'better questions', 'Outlier review / inquiry expanded', 'The unusual becomes valuable when the next observation is designed to challenge it.'],
  ['Follow what', 'should not be there', 'Unexpected source / trace locked', 'A disciplined pursuit of the impossible-looking result can separate discovery from error.'],
  ['Let the outlier', 'earn a mission', 'Candidate object / priority rising', 'Repeated evidence can turn a statistical exception into a destination worth visiting.'],
  ['Chase the difference', 'gently', 'Delta search / assumptions protected', 'Careful follow-up keeps a fragile anomaly from being erased by the method used to study it.'],
  ['The strange result', 'gets another orbit', 'Review pass / observation renewed', 'A second encounter tests whether surprise belongs to the universe or the instrument.'],
  ['Start where', 'the model hesitates', 'Low confidence / inquiry target', 'Uncertainty can point directly toward the observation with the highest scientific value.'],
  ['Find the pattern', 'without forcing it', 'Structure search / bias constrained', 'The system compares possibilities while leaving enough room for a shape nobody predicted.'],
  ['Keep the impossible', 'under review', 'Candidate queue / status unresolved', 'Rare explanations stay available until stronger evidence removes the need for them.'],
  ['Look where', 'predictions break', 'Residual field / next target', 'The gap between expectation and measurement is often the most productive place to aim.'],
  ['Turn surprise', 'into method', 'Anomaly protocol / repeatable', 'A strange observation becomes science when another instrument can test the same question.'],

  // Human and machine collaboration
  ['Humans choose', 'machines keep watch', 'Shared mission / roles clear', 'Automation carries the long attention while people decide what the evidence should mean.'],
  ['Extend judgment', 'not authority', 'Decision support / human bound', 'AI should widen the field a team can consider without pretending to own the decision.'],
  ['Let tools', 'show their limits', 'Model card / boundary live', 'A useful instrument makes its uncertainty obvious at the moment it matters.'],
  ['Put curiosity', 'in the loop', 'Research cycle / question driven', 'The system is designed to produce inspectable next questions, not merely faster outputs.'],
  ['Build systems', 'scientists can question', 'Inspectable logic / review open', 'Every recommendation should withstand the person who asks how the evidence led there.'],
  ['Share the view', 'keep the doubt', 'Team display / uncertainty common', 'Collaboration improves when everyone sees both the signal and the reasons it may be misleading.'],
  ['Make autonomy', 'answerable', 'Flight logic / audit ready', 'Independent action remains traceable to its evidence, constraints, and intended scientific goal.'],
  ['Keep people', 'inside the reasoning', 'Human context / model connected', 'The interface reveals choices and tradeoffs instead of hiding them behind a score.'],
  ['Let every decision', 'leave a trail', 'Provenance stream / action recorded', 'Future teams can improve the mission because each move preserves the reasoning that shaped it.'],
  ['Intelligence should', 'explain its horizon', 'Model range / boundary declared', 'The system states where its view stops before anyone mistakes a limit for a fact.'],

  // Worlds / physical science
  ['Oceans hide', 'beneath quiet worlds', 'Ice shell / resonance study', 'Subtle motion and chemistry can reveal a living system far below an apparently still surface.'],
  ['Read weather', 'on another sun', 'Stellar climate / pattern forming', 'Changing light carries a record of storms, fields, and cycles on a star we cannot touch.'],
  ['Listen under', 'alien ice', 'Subsurface array / echo return', 'Acoustic structure can turn a sealed ocean into a landscape of testable questions.'],
  ['Trace gravity', 'without seeing mass', 'Lensing field / hidden structure', 'Light bending around darkness can map what no telescope can observe directly.'],
  ['Learn the night', 'around a star', 'Occultation watch / atmosphere hinted', 'A brief dimming can expose rings, dust, weather, or a world passing through the beam.'],
  ['Follow dust', 'into a new world', 'Formation disk / particle path', 'Small grains preserve the route from a cold cloud to a planetary system.'],
  ['Find climate', 'in a spectrum', 'Atmosphere scan / seasons inferred', 'Repeated color shifts reveal how a distant world moves heat, clouds, and chemistry.'],
  ['Watch moons', 'write on rings', 'Orbital signatures / gravity visible', 'Fine structures in a ring system record the pull of bodies too small or dark to see.'],
  ['Read chemistry', 'at a distance', 'Molecular bands / source resolved', 'A narrow line of light can reveal the materials shaping an environment far beyond reach.'],
  ['Let starlight', 'reveal an atmosphere', 'Transit window / gases detected', 'Filtered light turns a passing world into a remote laboratory for climate and composition.'],

  // Future / design principles
  ['Design for', 'the unanswered century', 'Long mission / future reader', 'Build tools whose evidence remains legible to teams and questions that do not yet exist.'],
  ['Build the instrument', 'after next', 'Capability study / horizon two', 'Prepare the architecture for discoveries that will demand a sensor nobody planned to carry.'],
  ['Give discovery', 'a longer future', 'Research memory / reuse designed', 'Data should remain ready for methods and hypotheses that arrive decades after collection.'],
  ['Make exploration', 'hard to fool', 'Resilient inference / adversarial sky', 'Robust systems test the convenient explanation before spending a mission on it.'],
  ['Prepare for', 'evidence without precedent', 'Unknown class / protocol open', 'The next important signal may not resemble anything the training archive already understands.'],
  ['Let tomorrow', 'revise the map', 'Living atlas / future compatible', 'A useful model welcomes new evidence without erasing the path that led to the older view.'],
  ['Create tools', 'for first contact', 'Novel signal / response restrained', 'Extraordinary evidence deserves interfaces built for patience, verification, and shared judgment.'],
  ['Build softly', 'for hard unknowns', 'Adaptive system / assumptions light', 'Flexible instruments survive contact with environments that refuse our original categories.'],
  ['Keep wonder', 'operational', 'Mission state / curiosity nominal', 'Ambition becomes useful when it is translated into precise observations a spacecraft can perform.'],
  ['The future', 'needs better instruments', 'Next capability / design active', 'New questions become reachable when sensing, context, and judgment are designed as one system.']
];

const additionalSloganRows: SloganRow[] = [
  // Cosmic cognition
  ['Give the cosmos', 'a second reader', 'Parallel interpretation / sky open', 'Machine perception can revisit familiar observations and notice relationships that escaped the first reading.'],
  ['Turn wonder', 'into coordinates', 'Curiosity vector / destination forming', 'A compelling mystery becomes actionable when its shape can guide the next precise observation.'],
  ['Train attention', 'on the infinite', 'Perception engine / scale unbounded', 'Intelligence helps finite teams remain attentive across a universe of simultaneous events.'],
  ['Let the sky', 'challenge the model', 'Reality check / forecast exposed', 'Every observation is an opportunity for the universe to correct what the system expected.'],
  ['Grow insight', 'between the stars', 'Distributed cognition / nodes awake', 'Distant instruments become more capable when their separate perspectives contribute to one inquiry.'],
  ['Teach the telescope', 'to reconsider', 'Second-look protocol / active', 'A thoughtful instrument can return to evidence when a new context changes its meaning.'],
  ['Make perception', 'travel farther', 'Remote intelligence / aperture extended', 'The reach of an observatory grows when interpretation can operate wherever the photons arrive.'],
  ['Give deep space', 'a working memory', 'Long-range context / state preserved', 'Persistent reasoning allows distant missions to build knowledge instead of repeatedly beginning again.'],
  ['Ask more', 'of every photon', 'Information yield / spectrum unlocked', 'Careful inference draws several testable clues from light that once supported only one measurement.'],
  ['Let intelligence', 'meet the sublime', 'Cognitive frontier / awe retained', 'Powerful analysis can deepen wonder by revealing how much structure remains beyond explanation.'],

  // Instruments and interfaces
  ['Build an instrument', 'that notices back', 'Responsive optics / attention returned', 'The observatory adapts its focus when the field presents something more valuable than the plan anticipated.'],
  ['Make the dashboard', 'part of discovery', 'Interface science / hypotheses visible', 'A good display helps researchers form connections rather than merely monitor machinery.'],
  ['Turn calibration', 'into confidence', 'Reference cycle / trust renewed', 'Continuous self-checks make every ambitious conclusion easier to examine and defend.'],
  ['Design controls', 'for the unexpected', 'Adaptive console / options ready', 'Interfaces should remain useful when the event on screen has no familiar operating procedure.'],
  ['Let sensors', 'compare notes', 'Instrument dialogue / agreement tested', 'Independent measurements strengthen one another by exposing both consensus and productive disagreement.'],
  ['Put context', 'inside the lens', 'Observation frame / history embedded', 'Each image becomes richer when the circumstances of its capture remain inseparable from it.'],
  ['Make every pixel', 'accountable', 'Imaging chain / origin traceable', 'Researchers can follow a visual claim through processing and back to the detector that received it.'],
  ['Tune the system', 'to possibility', 'Search posture / discovery weighted', 'The instrument balances known targets with enough flexibility to recognize an unplanned opportunity.'],
  ['Shape data', 'for human eyes', 'Legibility layer / meaning surfaced', 'Complex evidence becomes actionable when its structure is presented without hiding its uncertainty.'],
  ['Let the console', 'invite dissent', 'Review interface / alternatives present', 'The strongest interpretation shares the screen with credible reasons it might still be wrong.'],

  // Collective science
  ['Many instruments', 'one conversation', 'Federated science / channel shared', 'Observatories with different strengths can contribute evidence without surrendering their individual perspective.'],
  ['Connect the experts', 'to the edge', 'Research link / distance collapsed', 'Specialist judgment can shape onboard priorities even when direct control is impossible.'],
  ['Give every mission', 'a common language', 'Semantic relay / concepts aligned', 'Shared descriptions allow discoveries from unlike instruments to become comparable.'],
  ['Let teams', 'inherit momentum', 'Knowledge handoff / inquiry continuous', 'New researchers can continue the reasoning behind a mission instead of reconstructing it from fragments.'],
  ['Make discovery', 'a shared orbit', 'Collaborative cycle / evidence circulating', 'Ideas improve as observations move repeatedly between instruments, models, and people.'],
  ['Bring distant labs', 'to one table', 'Joint analysis / viewpoints synchronized', 'Distributed researchers can examine the same evidence while preserving the detail each discipline needs.'],
  ['Turn disagreement', 'into resolution', 'Scientific debate / test designed', 'Conflicting interpretations become a blueprint for the measurement that can separate them.'],
  ['Let expertise', 'cross the vacuum', 'Operational knowledge / uplink durable', 'Human insight becomes a reusable capability that travels with the mission.'],
  ['Build consensus', 'from independent views', 'Multi-array result / overlap measured', 'Agreement means more when separate methods arrive there without sharing the same blind spots.'],
  ['Keep collaboration', 'in the telemetry', 'Team context / decisions attached', 'The record preserves who questioned, revised, and strengthened each important conclusion.'],

  // Positive futures
  ['Open a brighter', 'age of inquiry', 'Discovery horizon / access expanding', 'Better tools can place ambitious scientific questions within reach of many more people.'],
  ['Prepare tomorrow', 'for sharper sight', 'Future aperture / systems ready', 'We build today so the next generation can measure phenomena we can only imagine.'],
  ['Let knowledge', 'travel outward', 'Learning mission / frontier growing', 'Every expedition carries the accumulated care of earlier research into a new environment.'],
  ['Build optimism', 'from evidence', 'Progress signal / claims grounded', 'Hope becomes durable when it is supported by discoveries people can inspect together.'],
  ['Give curiosity', 'more sky', 'Open science / reach extended', 'Accessible intelligence can widen participation in the work of understanding the universe.'],
  ['Turn discovery', 'into stewardship', 'Knowledge to care / planet connected', 'What we learn beyond Earth can sharpen how thoughtfully we understand and protect home.'],
  ['Make exploration', 'a renewable idea', 'Mission cycle / insight reinvested', 'Each answer should create capabilities and questions that make the next expedition possible.'],
  ['Carry hope', 'with the hardware', 'Purpose payload / future aboard', 'A spacecraft is also a promise that patient cooperation can reach beyond present limits.'],
  ['Build the future', 'with open eyes', 'Forward design / consequences visible', 'Ambition becomes trustworthy when progress includes reflection, evidence, and responsibility.'],
  ['Let the frontier', 'belong to everyone', 'Shared universe / access widening', 'The value of exploration grows when its tools and discoveries invite broad participation.'],

  // Life and living systems
  ['Look for life', 'without assuming Earth', 'Biology search / definitions flexible', 'The widest search recognizes organization and adaptation before demanding familiar chemistry.'],
  ['Let chemistry', 'tell its own story', 'Molecular ecology / pathways traced', 'Networks of reactions can reveal whether an environment is merely active or persistently alive.'],
  ['Find habitats', 'inside extremes', 'Survival envelope / niches mapped', 'Conditions that appear hostile at one scale may shelter possibility at another.'],
  ['Read a biosphere', 'in reflected light', 'Living spectrum / seasonal pulse', 'Subtle recurring changes can expose a planet whose surface and atmosphere evolve together.'],
  ['Ask the ocean', 'what it remembers', 'Subsurface chemistry / cycles retained', 'Dissolved materials may preserve a long record of energy, geology, and possible biology.'],
  ['Listen for', 'metabolic weather', 'Atmosphere balance / life considered', 'Persistent chemical imbalance can hint at processes continually reshaping a distant world.'],
  ['Map the places', 'where life could begin', 'Habitability atlas / pathways ranked', 'Evidence from stars, rocks, water, and time can focus the search without narrowing imagination.'],
  ['Let alien nature', 'stay alien', 'Novel biology / assumptions suspended', 'Discovery starts by respecting forms of organization that do not fit terrestrial categories.'],
  ['Follow energy', 'toward possibility', 'Habitability flow / gradients measured', 'Where usable energy persists, complex chemistry gains room to organize and endure.'],
  ['Search gently', 'for living worlds', 'Planetary care / contact restrained', 'Exploration can pursue transformative knowledge while protecting the environments it hopes to understand.'],

  // Fundamental physics
  ['Let gravity', 'draw the hidden', 'Curved light / mass revealed', 'Distorted backgrounds turn invisible structure into a measurable architecture.'],
  ['Measure the universe', 'between ticks', 'Precision clock / spacetime sampled', 'Tiny differences in time can expose motion, gravity, and physics across enormous distances.'],
  ['Read the vacuum', 'for fingerprints', 'Quantum field / fluctuation study', 'Apparent emptiness may carry subtle signatures of the laws shaping everything within it.'],
  ['Find the rule', 'inside the exception', 'Physics anomaly / theory under test', 'A stubborn mismatch can point toward a more complete description of nature.'],
  ['Use light', 'as a ruler', 'Interferometric span / distance resolved', 'Phase and timing transform photons into measurements of extraordinary precision.'],
  ['Watch spacetime', 'carry a message', 'Gravity wave / event arriving', 'Ripples in geometry preserve the final motion of objects that emit almost no light.'],
  ['Turn symmetry', 'toward experiment', 'Invariant search / prediction sharpened', 'Elegant mathematical patterns become science when they specify what an instrument should observe.'],
  ['Let precision', 'open new worlds', 'Measurement frontier / errors shrinking', 'Reducing uncertainty can reveal entire classes of phenomena hidden inside yesterday’s noise.'],
  ['Ask matter', 'how it began', 'Origin study / particles compared', 'The composition of distant environments retains clues from the earliest transformations of the cosmos.'],
  ['Make the invisible', 'leave evidence', 'Indirect detection / effects collected', 'What cannot be seen directly can still be known through the changes it produces around it.'],

  // Computation and learning
  ['Let models', 'learn in public', 'Inspectable training / revisions shown', 'Scientific intelligence earns trust when its changing assumptions remain open to examination.'],
  ['Compute less', 'understand more', 'Efficient inference / relevance first', 'Focused reasoning can reduce energy and complexity while preserving what matters scientifically.'],
  ['Make every update', 'earn its place', 'Learning gate / evidence required', 'The system changes its beliefs only when new observations provide a traceable reason.'],
  ['Teach models', 'to design the next test', 'Inquiry corpus / reasoning expanded', 'Models become better research partners when they learn how uncertainty creates the next experiment.'],
  ['Let algorithms', 'practice restraint', 'Bounded action / thresholds explicit', 'Knowing when not to classify or intervene is a core capability, not a failure.'],
  ['Turn raw streams', 'into quiet insight', 'Edge pipeline / relevance distilled', 'Continuous computation can surface rare meaningful changes without demanding continuous human attention.'],
  ['Make learning', 'survive deployment', 'Adaptive flight / safeguards intact', 'Models can improve in operation while preserving tested boundaries and a recoverable history.'],
  ['Give inference', 'a memory of causes', 'Causal context / correlations challenged', 'Reasoning becomes more useful when it distinguishes association from mechanisms a mission can test.'],
  ['Let small models', 'reach big questions', 'Compact intelligence / purpose tuned', 'Efficient systems designed around a mission can outperform general complexity where resources are scarce.'],
  ['Build intelligence', 'that stays curious', 'Learning posture / closure delayed', 'A capable model keeps searching for disconfirming evidence after finding a plausible explanation.'],

  // Exploration modes
  ['Sail on', 'the pressure of light', 'Photon drive / trajectory opening', 'A nearly weightless push can carry patient instruments toward destinations beyond conventional fuel.'],
  ['Meet the comet', 'before sunrise', 'Intercept course / volatile history', 'Early arrival can observe ancient material as warmth begins to transform it.'],
  ['Send a swarm', 'instead of a monument', 'Distributed probes / resilience gained', 'Many modest explorers can cover more possibilities and continue when individual units fail.'],
  ['Land where', 'the map is incomplete', 'Terrain inference / descent adaptive', 'Onboard perception can choose a safe scientific destination from conditions revealed during arrival.'],
  ['Explore the shadow', 'as a resource', 'Cold region / pristine record', 'Places untouched by sunlight may preserve materials and histories lost elsewhere.'],
  ['Turn flybys', 'into encounters', 'Rapid passage / attention compressed', 'Fast local reasoning helps a brief crossing produce a deliberate sequence of discoveries.'],
  ['Let orbit', 'become a laboratory', 'Microgravity platform / experiments linked', 'Repeated access to changing conditions makes the path itself an instrument.'],
  ['Build routes', 'through changing worlds', 'Dynamic navigation / terrain alive', 'Explorers can revise motion as weather, ice, dust, and light reshape the environment.'],
  ['Send patience', 'past the heliopause', 'Interstellar precursor / decades embraced', 'Long-lived systems can transform time from an obstacle into the foundation of a new scale of science.'],
  ['Let robots', 'prepare the welcome', 'Remote construction / habitat forming', 'Autonomous builders can create safe, useful infrastructure before people make the journey.'],

  // Responsibility and trust
  ['Make power', 'easy to question', 'Governance layer / review built in', 'Capability remains accountable when people can inspect, challenge, and redirect its use.'],
  ['Let safety', 'shape the ambition', 'Mission ethics / constraints creative', 'Thoughtful boundaries can inspire designs that are both more responsible and more resilient.'],
  ['Protect the worlds', 'we hope to know', 'Planetary protocol / contamination blocked', 'Scientific care begins by preserving the integrity of places before interpreting them.'],
  ['Keep agency', 'with the explorers', 'Human direction / automation aligned', 'Technology expands what teams can accomplish while leaving purpose and judgment in human hands.'],
  ['Make transparency', 'mission critical', 'Operational logic / inspection ready', 'Clear reasoning paths help teams respond safely when systems and environments surprise one another.'],
  ['Design for', 'a graceful refusal', 'Safety boundary / no-go legible', 'A trustworthy machine can decline an unsafe action and explain the constraint that stopped it.'],
  ['Let values', 'reach the frontier', 'Ethical payload / choices encoded', 'Distance should not separate autonomous action from the principles guiding the mission.'],
  ['Preserve choice', 'under automation', 'Decision space / options maintained', 'Good assistance clarifies alternatives instead of quietly collapsing them into one path.'],
  ['Keep discovery', 'worthy of trust', 'Scientific integrity / methods visible', 'Extraordinary results gain strength through reproducibility, candor, and patient verification.'],
  ['Build systems', 'that welcome oversight', 'Review channel / authority shared', 'Accountability works best when it is an ordinary operating feature rather than an emergency addition.'],

  // Poetic field notes
  ['There is more', 'inside the quiet', 'Low signal / attention deepening', 'Careful observation finds texture where hurried instruments report only absence.'],
  ['Let distance', 'change the question', 'Far field / perspective transformed', 'A remote viewpoint can reveal relationships that disappear when everything feels close.'],
  ['Follow the glow', 'around the answer', 'Peripheral evidence / context bright', 'The surrounding traces often explain more than the obvious center of an event.'],
  ['Listen until', 'the pattern breathes', 'Rhythm search / cadence emerging', 'Long attention allows irregular events to reveal the timing that connects them.'],
  ['Make a home', 'for unfinished ideas', 'Research habitat / drafts alive', 'Early interpretations deserve space to evolve before they are judged as conclusions.'],
  ['Let the stars', 'remain surprising', 'Open forecast / novelty protected', 'Prediction should sharpen observation without deciding in advance what the universe may contain.'],
  ['Carry a question', 'into the dark', 'Inquiry beacon / course steady', 'A precise unknown can guide exploration more faithfully than a premature answer.'],
  ['Find tomorrow', 'in ancient light', 'Deep archive / future insight', 'Old photons can unlock new science when examined with instruments their sources never imagined.'],
  ['Give the night', 'another meaning', 'Interpretation shift / field renewed', 'Each new way of seeing transforms darkness from a limit into a source of information.'],
  ['Leave the universe', 'more interesting', 'Discovery ethic / wonder multiplied', 'The best intelligence does not shrink mystery; it reveals richer questions within it.']
];

const actions = ['Explore the field', 'Open the inquiry', 'Follow the evidence', 'Enter the system', 'Read the mission'];

const toCopyPacks = (rows: SloganRow[], actionOffset = 0): CopyPack[] => rows.map(([title, titleLine2, kicker, summary], index) => ({
  kicker,
  title,
  titleLine2,
  summary,
  action: actions[(index + actionOffset) % actions.length]!
}));

export const additionalCopyPacks: CopyPack[] = toCopyPacks(additionalSloganRows, newSloganRows.length);
export const newCopyPacks: CopyPack[] = [...toCopyPacks(newSloganRows), ...additionalCopyPacks];

export const copyPacks: CopyPack[] = [...originalCopyPacks, ...newCopyPacks];

const stopWords = new Set(['a', 'an', 'and', 'as', 'at', 'before', 'for', 'from', 'in', 'into', 'is', 'it', 'not', 'of', 'on', 'the', 'to', 'what', 'where', 'with']);

const normalizeSlogan = (value: string): string => value
  .toLowerCase()
  .replace(/[^a-z0-9\s]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const setSimilarity = (left: Set<string>, right: Set<string>): number => {
  if (left.size === 0 && right.size === 0) return 1;
  let intersection = 0;
  for (const value of left) if (right.has(value)) intersection += 1;
  return intersection / (left.size + right.size - intersection);
};

const meaningfulTokens = (value: string): Set<string> => new Set(
  normalizeSlogan(value).split(' ').filter((token) => token && !stopWords.has(token))
);

const characterTrigrams = (value: string): Set<string> => {
  const normalized = `  ${normalizeSlogan(value)}  `;
  const grams = new Set<string>();
  for (let index = 0; index <= normalized.length - 3; index += 1) grams.add(normalized.slice(index, index + 3));
  return grams;
};

const fnvFingerprint = (value: string): string => {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
};

export const sloganText = (pack: Pick<CopyPack, 'title' | 'titleLine2'>): string => `${pack.title} ${pack.titleLine2}`;

export type SloganComparison = {
  left: string;
  right: string;
  leftFingerprint: string;
  rightFingerprint: string;
  tokenSimilarity: number;
  trigramSimilarity: number;
  similarity: number;
  distance: number;
};

export const compareSlogans = (leftPack: CopyPack, rightPack: CopyPack): SloganComparison => {
  const left = sloganText(leftPack);
  const right = sloganText(rightPack);
  const tokenSimilarity = setSimilarity(meaningfulTokens(left), meaningfulTokens(right));
  const trigramSimilarity = setSimilarity(characterTrigrams(left), characterTrigrams(right));
  const similarity = Math.max(tokenSimilarity, trigramSimilarity * 0.9);
  return {
    left,
    right,
    leftFingerprint: fnvFingerprint(normalizeSlogan(left)),
    rightFingerprint: fnvFingerprint(normalizeSlogan(right)),
    tokenSimilarity,
    trigramSimilarity,
    similarity,
    distance: 1 - similarity
  };
};

export type SloganAudit = {
  count: number;
  minimumDistance: number;
  closest: SloganComparison[];
  collisions: SloganComparison[];
};

export const auditSlogans = (packs: CopyPack[] = copyPacks, minimumDistance = 0.55): SloganAudit => {
  const comparisons: SloganComparison[] = [];
  for (let left = 0; left < packs.length; left += 1) {
    for (let right = left + 1; right < packs.length; right += 1) {
      comparisons.push(compareSlogans(packs[left]!, packs[right]!));
    }
  }
  comparisons.sort((a, b) => a.distance - b.distance);
  return {
    count: packs.length,
    minimumDistance,
    closest: comparisons.slice(0, 12),
    collisions: comparisons.filter((comparison) => comparison.distance < minimumDistance)
  };
};
