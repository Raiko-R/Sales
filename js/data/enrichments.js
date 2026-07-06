/* ═══════════════════════════════════════════════════════════════
   SALESLAB UNIVERSITY — MODULE ENRICHMENTS
   Phase 2: Adds learning_objectives, case_study, recruiter_view,
   manager_insight, common_mistakes, reflection_questions to
   existing courses 1–20.
   Merged into module sections at render time in renderTheoryStep().
   ═══════════════════════════════════════════════════════════════ */

const ENRICHMENTS = {

  // ─── COURSE 1: B2B Sales Foundations ───────────────────────
  'c1m1': {
    learning_objectives: [
      'Understand what B2B sales is and how it differs fundamentally from B2C',
      'Know the four key roles in a typical B2B sales team and how they interact',
      'Identify the difference between transactional and consultative selling',
      'Understand why B2B sales is a high-skill, high-reward career path'
    ],
    recruiter_view: `The candidates I interview who understand B2B sales at a conceptual level — not just "I like talking to people" — stand out immediately. They can articulate why consultative selling requires a different skill set than transactional selling, and they understand that their value as a salesperson is in helping prospects make better decisions, not in persuading them to buy. That insight, in a first interview, tells me a lot about ceiling.`,
    manager_insight: `The SDR who understands the full sales cycle — not just their piece of it — is the one I invest most in developing. When they see their outbound work in the context of what the AE does next, the CS team does after that, and how ARR compounds over time, they make smarter decisions about which prospects to prioritise and how to qualify them.`,
    common_mistakes: [
      { title: `Thinking sales is about persuasion rather than problem-solving`, why: `Salespeople who try to "convince" prospects end up in adversarial conversations. Prospects resist being persuaded but welcome being helped.`, fix: `Reframe your objective: your job is to understand the prospect's problem so well that the right solution is obvious to both of you. If it's not obvious, you don't understand the problem well enough yet.` },
      { title: `Underestimating the skill required in B2B sales`, why: `B2B sales requires commercial acumen, consultative skill, emotional intelligence, and domain expertise. Treating it as "just sales" leads to plateauing early.`, fix: `Commit to deliberate skill development: read one sales book per month, listen to sales call recordings, ask for feedback on every call, and practise specific techniques until they're automatic.` }
    ],
    reflection_questions: [
      `What is the most important thing you can do in your first 90 days in a B2B sales role to build the foundation for long-term success?`,
      `Think about a purchase decision you've made as a buyer. What would have made the salesperson more helpful — and what did they do that felt like pressure rather than help?`
    ]
  },

  'c1m2': {
    learning_objectives: [
      'Understand the SaaS business model and why it creates different sales dynamics than one-time sales',
      'Know the key SaaS metrics (ARR, MRR, churn, NRR) and what they mean for your role',
      'Understand how your work as an SDR or AE contributes to ARR growth',
      'Recognise why customer success matters for a recurring revenue model'
    ],
    case_study: {
      title: `Understanding SaaS Metrics — NorthPeak Analytics`,
      story: `NorthPeak Analytics has £4M ARR with 85% NRR. In the previous year, they added £1.5M in new ARR through sales but lost £600K through churn — net growth of £900K. The CEO presents this to the board and is asked: "Why is NRR only 85%?"\n\nSophia (Head of Sales) and James (Head of CS) sit together to understand the problem. They find that three customers who churned all cited the same reason: "We never got the outcomes we expected from onboarding." The problem isn't the product — it's that the sales team oversold implementation ease and the CS team was under-resourced to deliver on expectations.\n\nThe fix: sales is retrained on realistic implementation timelines, CS is given two additional headcount, and a structured 90-day onboarding plan is introduced. NRR the following year: 94%.\n\nLesson: in SaaS, every deal you close has implications for NRR. The AE who oversells creates churn. The AE who sets accurate expectations creates renewal.`
    },
    reflection_questions: [
      `If you were an investor in a SaaS company, which metric would you most want to understand to assess the health of the business — and why?`,
      `How does understanding the SaaS business model change what you'd focus on as a salesperson, compared to a model where you only earn commission on the initial sale?`
    ]
  },

  'c1m3': {
    learning_objectives: [
      'Define and understand your Ideal Customer Profile (ICP) and why it matters for outbound efficiency',
      'Know the difference between ICP firmographics and technographics and how to use both',
      'Build a basic ICP from first principles or from your company\'s existing customer base',
      'Understand why time spent on non-ICP prospects is the most expensive mistake in outbound sales'
    ],
    recruiter_view: `When I ask candidates "who is your ideal customer?" and they can give me a precise answer — specific industry, company size, buying trigger, job title of the buyer — I know they understand how to prioritise their time. When they say "anyone who needs our product," I know they're going to spend 60% of their time on prospects who will never buy. ICP clarity is the single biggest efficiency multiplier in outbound sales.`,
    common_mistakes: [
      { title: `Defining ICP too broadly to avoid missing any prospect`, why: `A broad ICP feels safe — fewer prospects are excluded — but it means your time is spread across a huge pool of prospects with vastly different conversion rates.`, fix: `Define your ICP narrowly enough to be actionable: specific industry vertical, company size range (headcount or revenue), job title of the economic buyer, and one or two behavioural signals (recent funding, hiring patterns, tech stack). Then test and refine based on which ICPs actually convert.` }
    ],
    reflection_questions: [
      `What are the three most important firmographic characteristics of your current ICP — and what evidence do you have that they predict conversion?`,
      `If you had to cut your prospect list by 50% to focus only on the highest-probability ICPs, what criteria would you use to decide who stays and who is removed?`
    ]
  },

  // ─── COURSE 2: Discovery Mastery ───────────────────────────
  'c2m1': {
    learning_objectives: [
      'Understand why discovery is the most important skill in B2B sales — not demos, not closing',
      'Know the difference between a discovery call and a qualification call',
      'Identify the five levels of discovery depth and understand why surface-level discovery loses deals',
      'Apply the LAER framework (Listen, Acknowledge, Explore, Respond) in discovery conversations'
    ],
    case_study: {
      title: `Discovery Depth — Two Approaches to the Same Prospect`,
      story: `Two AEs from competing companies get discovery meetings with the same VP Operations at Verity Health.\n\nAE 1's approach: "What's your biggest challenge right now?" The VP says: "Our reporting is slow." AE 1 says "great, our platform solves that" and moves to demo.\n\nAE 2's approach: "What's your biggest challenge right now?" The VP says: "Our reporting is slow." AE 2 says: "Tell me more about that — what does 'slow' mean in practice? How long does it take, and who's involved?" The VP explains: analysts spend 22 hours per week on manual data consolidation. AE 2: "What's the consequence of that? What doesn't happen because those 22 hours are spent on reporting?" The VP pauses: "Our board reporting is always 2 weeks behind — and I'm consistently the last function to provide numbers. It's starting to affect my credibility with the CFO."\n\nTwo weeks later, AE 2 has a proposal anchored to board reporting credibility and CFO relationship. AE 1 has a demo recording and a follow-up that's gone unanswered. Discovery depth is the difference.`
    },
    manager_insight: `I coach every AE on one rule: never go to demo until you know the problem at three levels — what the problem is, what causes it, and what consequence the Economic Buyer personally experiences. Most demos fail because they're given before the third level is established. When you know the consequence the EB personally experiences, your demo shows a solution to their specific problem — not a feature set in search of a buyer.`,
    reflection_questions: [
      `In your last discovery call, at which level did you stop — problem description, cause identification, or personal consequence for the Economic Buyer? What would you need to ask to go deeper?`,
      `The case study shows two AEs with the same prospect and dramatically different discovery approaches. What specifically is AE 2 doing that AE 1 is not — and why does it matter commercially?`
    ]
  },

  'c2m2': {
    learning_objectives: [
      'Build a discovery call agenda that creates structure without feeling scripted',
      'Open a discovery call in a way that establishes collaborative intent',
      'Use layered follow-up questions to move from surface to depth',
      'Close a discovery call with clear next steps and mutual commitment'
    ],
    common_mistakes: [
      { title: `Turning discovery into an interrogation`, why: `A rapid sequence of questions without pause, acknowledgement, or natural conversation makes prospects feel interviewed rather than heard. They give shorter answers and share less.`, fix: `After each answer, acknowledge what you heard before asking the next question: "That makes sense — and the board reporting consequence is significant. What specifically happens when the numbers are late?" Acknowledgement creates a collaborative dynamic.` },
      { title: `Ending discovery without confirming next steps`, why: `"I'll send you some information" is not a next step. It's a defer that allows the conversation to lose momentum.`, fix: `Close every discovery call with: "Based on what you've shared — I'd like to [specific proposal]. Can we set up [specific next meeting] for [specific date]?" A concrete commitment at the end of every call.` }
    ],
    reflection_questions: [
      `What is your current discovery call opening — and does it immediately establish why this call is worth the prospect's time? What would you change?`,
      `How do you currently close discovery calls — and what percentage of those closings result in a confirmed next meeting with a specific date?`
    ]
  },

  // ─── COURSE 3: Cold Calling ─────────────────────────────────
  'c3m1': {
    learning_objectives: [
      'Understand the psychology of cold calling from both sides — why it feels uncomfortable and why it doesn\'t have to',
      'Know the anatomy of a cold call that creates genuine engagement rather than defensiveness',
      'Build a 30-second cold call opening that creates enough interest to earn more time',
      'Handle the first five seconds of a cold call — the highest-risk moment'
    ],
    recruiter_view: `I always ask candidates: "Tell me about a cold call you made that went really well — and one that went badly. What was different?" The candidates who can reflect specifically on what they did differently — not just luck or mood — are the ones who have learned from their calls. That reflective quality is what separates salespeople who improve from those who plateau.`,
    manager_insight: `The biggest mindset shift I try to create in new SDRs: cold calling is not about you. Your discomfort, your fear of rejection, your nervousness — none of that matters to the prospect. What matters to the prospect is whether this call is worth their time. Every preparation decision you make should be filtered through that question: does this make the call more worth the prospect's time?`,
    common_mistakes: [
      { title: `Opening with your name and company before establishing relevance`, why: `"Hi, I'm James from NorthPeak Analytics" gives the prospect everything they need to say "not interested" before you've given them a reason to engage. Your company name is not interesting to them.`, fix: `Lead with relevance: "Hi [name], this is James — I'm reaching out because [specific reason relevant to their role/company/situation]. Do you have 30 seconds?" Earn the right to your name and company.` },
      { title: `Apologising for calling`, why: `"Sorry to interrupt your day" or "I know you're probably busy" immediately puts the call on the defensive — you're signalling that you believe the call is an imposition.`, fix: `Call with confidence: you're calling because you have something worth their time. "This is James — I'm reaching out because [relevant reason]. Is now an okay time to ask you one question?"` }
    ],
    reflection_questions: [
      `Record your next three cold call openings (your own voice memo, after the call). Listen back and assess: do you sound confident, relevant, and specific — or apologetic, generic, and rushing?`,
      `The module argues that cold calling discomfort is a training problem, not a personality problem. What specific elements of cold calling make you most uncomfortable — and what practice would reduce that discomfort?`
    ]
  },

  // ─── COURSE 4: Email Prospecting ───────────────────────────
  'c4m1': {
    learning_objectives: [
      'Understand why most cold emails fail — and what the three most common mistakes are',
      'Know the anatomy of a cold email that generates genuine replies',
      'Apply the PASTOR framework to structure compelling cold emails',
      'Write a subject line that earns the open without being clickbait'
    ],
    case_study: {
      title: `Cold Email Rewrite — Before and After`,
      story: `Sofia (SDR, NorthPeak Analytics) is sending cold emails to VP Operations contacts at mid-market companies. Her original email:\n\n"Hi [name], I hope this finds you well. I'm reaching out from NorthPeak Analytics. We help operations teams improve their reporting and analytics capabilities. I'd love to schedule a quick 15-minute call to show you our platform. Are you free next week?"\n\nReply rate over 3 weeks: 1.2%.\n\nAfter email training, Sofia rewrites using PASTOR:\n\n"Hi [name] — VP Ops teams at companies like yours typically spend 18–22 hours per week consolidating data manually before board reporting. That's nearly 3 working days per month on a task that shouldn't take more than 2 hours with the right setup.\n\nI know this because it's the first thing that comes up in almost every conversation I have with VPs at [company size] companies in [industry]. The consequence isn't just time — it's that reporting is always behind, and the CFO relationship suffers.\n\nWe help operations teams cut that 22 hours to under 3 with an implementation that takes 4 weeks, no IT involvement required.\n\nWorth a 20-minute conversation to see if it's relevant? Here's my calendar: [link]."\n\nReply rate over the following 3 weeks: 8.7%. The content is the same. The structure — problem-first, consequence-explicit, specific outcome — is completely different.`
    },
    reflection_questions: [
      `Pull the last cold email you sent. Does it start with a problem the prospect recognises — or with your company and product? What would you change in the first line?`,
      `What is the one problem that 80% of your ICP prospects share? Write the opening sentence of a cold email that names that problem specifically, before mentioning your product.`
    ]
  },

  // ─── COURSE 5: LinkedIn & Social Selling ───────────────────
  'c5m1': {
    learning_objectives: [
      'Understand the difference between LinkedIn as a selling tool and LinkedIn as a relationship-building platform',
      'Build a LinkedIn profile that positions you as a trusted peer rather than a vendor',
      'Use LinkedIn\'s native data (posts, comments, connections) for pre-call research',
      'Apply the content-first approach to social selling that earns inbound attention'
    ],
    recruiter_view: `I always look at candidates' LinkedIn profiles before interviews. A profile that communicates expertise — thoughtful posts about industry challenges, specific skills highlighted, a headline that says "helping operations teams reduce reporting time" rather than "SDR at NorthPeak" — tells me this person understands their value to buyers, not just their job title. That self-awareness matters in a consultative selling role.`,
    common_mistakes: [
      { title: `Using LinkedIn InMail as an email equivalent`, why: `InMail that sounds like a cold email — product pitch, demo request, generic value claim — performs no better than cold email and often worse, because the recipient knows you've used a paid feature to interrupt them.`, fix: `InMail should be personal, specific, and low-commitment: reference something specific from their profile, ask one relevant question, and make the action step very easy (a yes/no question rather than a meeting request).` }
    ],
    reflection_questions: [
      `Look at your LinkedIn profile from a prospect's perspective: does it communicate expertise in their problems, or does it look like a CV? What three things would you change?`,
      `How many LinkedIn posts have you published in the last 30 days — and what percentage of them were about industry problems rather than your company or product?`
    ]
  },

  // ─── COURSE 6: The Demo ─────────────────────────────────────
  'c6m1': {
    learning_objectives: [
      'Understand why product demos fail — and why it\'s almost never the product\'s fault',
      'Know the difference between a product tour and a value demonstration',
      'Structure a demo around the specific problem uncovered in discovery',
      'Open a demo in a way that re-establishes the problem before showing any product'
    ],
    case_study: {
      title: `Demo Structure — The Same Product, Two Completely Different Conversations`,
      story: `Two AEs demo the same analytics platform to two different VP Operations contacts.\n\nAE 1 runs a product tour: "Here's the dashboard — you can see all your data sources here. These are the pre-built templates we have. Here you can create custom reports. Integration is very straightforward..."\n\nAt the end: "That looks interesting — send me some information and we'll think about it."\n\nAE 2 opens with the discovery recap: "Before I show you anything — you mentioned in our last conversation that the biggest issue is board reporting taking 2 weeks to produce, and that the consequence is you're always last to submit and it's affecting your CFO relationship. I want to make sure everything I show you today is directly relevant to that. Can I confirm that's still the priority?"\n\nProspect: "Yes — exactly that."\n\nAE 2 proceeds: "The first thing I'll show you is exactly how that situation changes. Here's what your board report production looks like today — and here's what it looks like 6 weeks after we're live." The entire demo is framed around the specific problem, the specific consequence, and the specific outcome.\n\nAt the end: "When can we talk about implementation timeline?"\n\nSame product. Different demo. Completely different outcome.`
    },
    manager_insight: `I ask every AE to record their demos. Then I review the first 5 minutes. If the first 5 minutes contain more product feature descriptions than problem restatements, the demo hasn't been anchored to discovery. The best demos spend the first 5 minutes confirming the problem and what's at stake — before showing a single feature. That anchor is what makes everything that follows feel relevant rather than generic.`,
    reflection_questions: [
      `In your last demo, how much time did you spend on the problem (restatement, confirmation, consequences) versus the product (features, functionality, navigation)? What would the ideal ratio be?`,
      `The case study shows two AEs with the same product getting dramatically different responses. What specifically is AE 2 doing in the opening that AE 1 is not — and why does it determine the outcome?`
    ]
  },

  // ─── COURSE 7: Proposals & Closing ─────────────────────────
  'c7m1': {
    learning_objectives: [
      'Understand why most proposals fail — and why they fail before they\'re even read',
      'Know the structure of a proposal that moves the decision forward rather than postponing it',
      'Write an executive summary that the Economic Buyer will read in 90 seconds and understand the investment decision',
      'Avoid the most common proposal mistakes that give prospects reasons to delay'
    ],
    common_mistakes: [
      { title: `Starting the proposal with your company overview`, why: `The prospect knows who you are — they've already had multiple conversations with you. A two-page company overview at the start of a proposal means the first thing they read is about you, not them.`, fix: `Start with the problem you've jointly identified, the consequences the EB experiences, and the specific outcome your solution delivers. The first paragraph should be about them, not you.` },
      { title: `Sending a proposal without a scheduled review meeting`, why: `A proposal without a follow-up meeting gives the prospect permission to read it (or not), form an opinion (or not), and never tell you what they thought.`, fix: `Always confirm the proposal review meeting before sending the document: "I'll send this over tomorrow — can we set up 45 minutes on Thursday to walk through it together? I want to make sure we cover any questions before you make a decision."` }
    ],
    reflection_questions: [
      `Pull the last proposal you sent. Read only the first paragraph. Does it immediately communicate the problem and the value to the prospect — or does it start with your company?`,
      `What percentage of proposals you send result in a confirmed proposal review meeting? If it's below 80%, what is your current process for securing that meeting before sending?`
    ]
  },

  // ─── COURSE 8: Negotiation ──────────────────────────────────
  'c8m1': {
    learning_objectives: [
      'Understand negotiation as a collaborative process rather than an adversarial confrontation',
      'Know your BATNA before every negotiation — and understand why it determines your leverage',
      'Distinguish between position-based and interest-based negotiation',
      'Apply the trade-not-give framework to every commercial concession'
    ],
    recruiter_view: `Negotiation skill is one of the hardest things to assess in an interview — most candidates say they're good at it but can't describe a specific situation where they held firm under pressure. The candidates I trust are the ones who can say: "In that negotiation, I was asked for X. I didn't give X. Instead I offered Y in exchange for Z. Here's how it resolved." That specificity tells me they have actual experience, not just confidence.`,
    case_study: {
      title: `Trade-Not-Give in Practice — Meridian Capital Renewal`,
      story: `James (Account Executive) is renewing a £95K annual contract with Meridian Capital. Procurement contacts him directly: "We need 20% off the renewal or we'll need to consider alternatives."\n\nJames's first instinct is to check what discount he can approve. His second instinct — the right one — is to explore before offering anything.\n\nJames: "I understand — can I ask what's driving the 20% specifically? Is it a budget ceiling, or a comparison to an alternative you're evaluating?"\n\nProcurement: "Both, honestly. Our budget is tighter this year, and we've been approached by a competitor offering similar functionality at a lower price."\n\nJames now knows: genuine budget constraint AND competitive pressure. He doesn't discount immediately.\n\nJames: "I appreciate you being direct. On the competitor — I'd like to understand specifically what they're offering and at what price, because 'similar functionality' covers a wide range. On the budget — if we could find a structure that works within your budget ceiling without reducing the annual commitment, would that help?"\n\nProcurement shares the competitor pricing. James reviews — the competitor is £15K cheaper but lacks the enterprise integration capability that Meridian's IT team relies on.\n\nJames comes back: "Here's my proposal. I can offer a 3-year commitment at £87K per year (8.4% reduction) rather than annual renewal. That gives you £24K savings over three years versus current rate, and price certainty for your budget planning. In return, I'd ask for: payment in January rather than March, and the right to use Meridian as a reference in our financial services case studies."\n\nProcurement accepts. James holds most of the value, extends the relationship by 2 years, and gets reference permission.`
    },
    reflection_questions: [
      `In your last commercial negotiation, what did you trade versus what did you simply give? What would you do differently using the trade-not-give framework?`,
      `The module argues that knowing your BATNA before a negotiation starts is essential. What was your BATNA in the last negotiation you were in — and did you know it before the conversation started?`
    ]
  },

  // ─── COURSE 9: Account Management ──────────────────────────
  'c9m1': {
    learning_objectives: [
      'Understand the economic difference between new logo sales and account expansion',
      'Know the three expansion levers: upsell, cross-sell, and price increase',
      'Build a 90-day account plan for your most important accounts',
      'Apply the QBR (Quarterly Business Review) as a structured expansion opportunity'
    ],
    manager_insight: `The best account managers I've worked with think about their accounts the way investors think about a portfolio: each account has a current value and a potential value, and the gap between the two is the opportunity. They can tell me, for every account: current ARR, expansion potential (upsell and cross-sell), renewal probability, and the specific milestones they're tracking to know whether the account is healthy or at risk. That portfolio thinking is what separates account managers from relationship managers.`,
    common_mistakes: [
      { title: `Treating account management as relationship maintenance rather than commercial development`, why: `Accounts that are "managed" but not actively developed don't grow. The customer relationship decays slowly — good feeling but no forward momentum — until a competitor with a better story replaces you at renewal.`, fix: `Every account interaction should advance a specific commercial objective: identifying an expansion opportunity, understanding a risk, or deepening stakeholder coverage. "Just checking in" is not an account management objective.` }
    ],
    reflection_questions: [
      `For your top three accounts by ARR, what is the specific expansion opportunity — and what are you actively doing to develop it?`,
      `When was the last time you ran a structured QBR with your most important account? What specific commercial outcomes did it advance?`
    ]
  },

  // ─── COURSE 10: Sales Psychology ───────────────────────────
  'c10m1': {
    learning_objectives: [
      'Understand the psychological principles that influence buyer decision-making',
      'Apply the six principles of influence (Cialdini) ethically in B2B sales',
      'Recognise cognitive biases that affect both buyers and salespeople',
      'Build rapport in a way that is genuine rather than tactical'
    ],
    case_study: {
      title: `Applying Reciprocity — The Pre-Meeting Value Add`,
      story: `Rebecca Walsh is preparing for a first discovery meeting with a new VP of Finance at Cascade Retail. Instead of sending a standard meeting confirmation, she sends a one-page analysis she's prepared: "3 Things Finance VPs at Retail Companies Tell Us About Their Reporting Problems" — drawing on patterns from public case studies and industry data.\n\nThe VP responds before the meeting: "This is really useful — I've shared it with two colleagues. Looking forward to our conversation."\n\nIn the meeting, the VP is more open, more forthcoming, and more willing to share internal details than Rebecca typically experiences in a first call. Reciprocity is active: Rebecca gave something of genuine value, and the VP is unconsciously inclined to give value in return — in this case, candid information about their real problems.\n\nNot manipulation — Rebecca's analysis was genuinely useful and asked for nothing in return. The commercial benefit was a natural consequence of being helpful.`
    },
    reflection_questions: [
      `What is one genuinely valuable piece of information or analysis you could send to a prospect before your next discovery call — that would be useful regardless of whether they ever buy from you?`,
      `The module distinguishes between ethical and manipulative application of influence principles. Where is the line — and how would you describe it to a new SDR who asked?`
    ]
  },

  // ─── COURSE 11: Handling Objections (original course) ──────
  'c11m1': {
    learning_objectives: [
      'Understand the three categories of objections and how to diagnose which type you\'re facing',
      'Apply the LAER model as a universal objection response structure',
      'Develop specific language for the six most common B2B objections',
      'Build a personal objection log as a continuous improvement tool'
    ],
    recruiter_view: `In interview role-plays, I always throw two objections at candidates: a reflex objection early ("we're not interested") and a genuine concern late ("it's too expensive"). The candidates who handle both confidently — who acknowledge without capitulating, explore without interrogating, and respond precisely — are the ones I hire. Most candidates handle one well but not both.`,
    common_mistakes: [
      { title: `Treating all objections the same way`, why: `A reflex objection ("not interested") requires a pattern interrupt. A genuine concern ("too expensive") requires exploration and a value reframe. A negotiating position requires a trade. Using the same response for all three produces poor results across the board.`, fix: `Diagnose before responding: is this automatic deflection, a genuine concern, or a commercial position? The right diagnosis determines the right response.` }
    ],
    reflection_questions: [
      `What are the five objections you face most frequently — and for each, have you diagnosed whether they're typically reflex, genuine, or negotiating? Does the diagnosis change your response?`,
      `Build your personal objection log: start with the last five objections you received this week. For each, write the objection, your response, and whether it worked. What patterns emerge?`
    ]
  },

  // ─── COURSE 12: Pipeline Management ────────────────────────
  'c12m1': {
    learning_objectives: [
      'Understand why pipeline management is a discipline, not a CRM task',
      'Know the three pipeline health metrics that predict whether you\'ll hit quota',
      'Build a pipeline review routine that surfaces real risks, not just activity updates',
      'Apply the pipeline coverage ratio to understand your personal quota risk'
    ],
    manager_insight: `The pipeline review question I ask every AE every week: "Which deal in your committed forecast are you least confident about — and why?" Not the most confident. The least confident. Because that's where the quarter risk lives. The AE who knows their least-confident deal and has a specific plan to address the risk is the AE I trust in the forecast.`,
    case_study: {
      title: `Pipeline Coverage — Why 3x Is the Minimum`,
      story: `Two AEs, James and Sofia, both have quota of £400K for the quarter. James has £1.2M pipeline (3x coverage). Sofia has £800K pipeline (2x coverage).\n\nBy week 8, three deals in James's pipeline have slipped to next quarter (£350K total). He still has £850K pipeline — over 2x coverage — and closes the quarter at £420K.\n\nBy week 8, two deals in Sofia's pipeline have slipped (£280K total). She now has £520K pipeline — 1.3x coverage. She closes at £290K and misses quota by £110K.\n\nSame win rate (45%). Same deal quality. Different pipeline coverage. Different outcome.\n\nThe lesson: deals slip. They always slip. The question is whether your pipeline is large enough to absorb slippage and still hit quota. 3x is the minimum. 4x is comfortable. Below 3x, you're betting on no slippage — which is not a plan.`
    },
    reflection_questions: [
      `What is your current pipeline coverage ratio — and what is it in the final month of the quarter? What would it need to be for you to feel genuinely comfortable hitting quota?`,
      `For your three largest pipeline deals, score each on a simple 1–5 confidence scale. Now add up the probability-weighted value. Is that number above or below your quota?`
    ]
  },

  // ─── COURSE 13: Sales Leadership ────────────────────────────
  'c13m1': {
    learning_objectives: [
      'Understand the mindset shift from individual contributor to sales leader',
      'Know the difference between managing activity and developing capability',
      'Build a 1:1 coaching framework that develops specific skills rather than just reviewing performance',
      'Identify the early indicators that an SDR has AE potential'
    ],
    recruiter_view: `When I'm hiring for a team lead or first-line manager role, I ask: "Tell me about the most significant improvement you drove in a team member's performance." The candidates who can describe a specific skill gap, the intervention they designed, the practice they ran, and the measurable improvement in performance — those are the candidates who understand what sales coaching actually means. "I motivated them" is not coaching. Specific skill development is coaching.`,
    reflection_questions: [
      `The module distinguishes between managing activity (counting calls, reviewing pipeline) and developing capability (building specific skills). In your current role, which is your primary mode — and what would shifting to more capability development require?`,
      `Think about the most significant improvement you've driven in a colleague or team member. What was the specific skill, what intervention worked, and what would you do differently with the benefit of hindsight?`
    ]
  },

  // ─── COURSE 14: Enterprise Sales ───────────────────────────
  'c14m1': {
    learning_objectives: [
      'Understand what makes enterprise sales fundamentally different from mid-market or SMB sales',
      'Know the multi-stakeholder dynamics that determine enterprise deal outcomes',
      'Build a stakeholder map for a complex enterprise deal',
      'Apply multi-threading as a risk management strategy'
    ],
    case_study: {
      title: `Multi-Threading — Why a Single Champion is a Single Point of Failure`,
      story: `Alex (Senior AE) has a £380K enterprise deal with Apex Logistics. His champion is David (VP Supply Chain), who has been enthusiastic and engaged throughout. In week 14, David takes an unexpected leave of absence.\n\nAlex has no other relationships at Apex. The deal goes quiet. Three months later, David returns, but the project has been deprioritised.\n\nContrast: Rebecca's enterprise deal at NorthPeak Analytics. She has three relationships: her champion (VP Analytics), the Economic Buyer (CFO), and a sponsor in IT. When the VP Analytics goes on a 6-week secondment, Rebecca's CFO relationship keeps the deal warm. The deal closes in the committed quarter.\n\nMulti-threading is not paranoia. It is risk management. Enterprise deals have long timelines, and over 6–12 months, people change roles, priorities shift, and champions go quiet. The AE with three warm relationships survives these events. The AE with one does not.`
    },
    reflection_questions: [
      `For your top three enterprise deals, how many stakeholder relationships do you have — and which ones are warm enough that the deal would survive if your primary champion disappeared tomorrow?`,
      `The module frames multi-threading as risk management. What is the specific risk in each of your enterprise deals that multi-threading would mitigate?`
    ]
  },

  // ─── COURSE 15: RevOps & Data ───────────────────────────────
  'c15m1': {
    learning_objectives: [
      'Understand what RevOps is and why it exists — the problem it solves for sales organisations',
      'Know the key sales analytics that help AEs and SDRs improve their performance',
      'Use your CRM data to identify patterns in your own performance',
      'Apply data-driven thinking to pipeline management and forecasting'
    ],
    common_mistakes: [
      { title: `Treating CRM as a reporting tool for management rather than a performance tool for yourself`, why: `Salespeople who update their CRM only to keep their manager happy are missing the most valuable use: their own pipeline analysis and performance pattern identification.`, fix: `Use your CRM data weekly to answer: what is my average deal size, what is my win rate by lead source, what is my average sales cycle length, and where do my deals most commonly drop off? The patterns tell you where to invest your development effort.` }
    ],
    reflection_questions: [
      `Pull your last 20 closed-won and closed-lost deals from your CRM. What patterns do you see in the wins that don't appear in the losses — deal size, lead source, industry, or stakeholder configuration?`,
      `What is your current win rate — and at which stage of the sales process do you lose the most deals? What does that tell you about where to focus your skill development?`
    ]
  },

  // ─── COURSE 16: Customer Success ────────────────────────────
  'c16m1': {
    learning_objectives: [
      'Understand the CSM role and how it differs from account management and sales',
      'Know the customer journey from onboarding to renewal and the CSM\'s role at each stage',
      'Build a 90-day onboarding plan that drives early value and reduces churn risk',
      'Apply health scoring to proactively identify at-risk customers before they churn'
    ],
    manager_insight: `The CSMs who drive the best NRR in my teams share one quality: they treat the customer outcome with the same urgency the AE treated the initial sale. The AE was motivated by the commission. The CSM should be motivated by the renewal — and the most effective CSMs I've managed treat every customer conversation as a step toward the renewal conversation, not just a support touchpoint.`,
    reflection_questions: [
      `For your current portfolio of accounts, which customers are most at risk of not renewing — and what specific evidence do you have for that assessment?`,
      `What is your current approach to the 90-day post-sale onboarding period? What would a structured, outcome-focused onboarding process look like — and how different would it be from what you currently do?`
    ]
  },

  // ─── COURSE 17: Financial Services Sales ────────────────────
  'c17m1': {
    learning_objectives: [
      'Understand the regulatory environment of financial services and how it affects the sales process',
      'Know the key stakeholders in a financial services deal and what each cares about',
      'Build regulatory awareness into your discovery and proposal process',
      'Navigate procurement and compliance review in regulated institutions'
    ],
    recruiter_view: `Financial services sales is one of the most demanding verticals — the buying process is more complex, the stakeholders are more conservative, and the regulatory context requires genuine understanding. Candidates who say they want to sell into FS but can't describe the FCA's role, what GDPR means for data sharing, or why procurement in a bank is more rigorous than in a SaaS startup — those candidates aren't ready for the role. Domain knowledge is table stakes.`,
    common_mistakes: [
      { title: `Not understanding the compliance approval process before proposing`, why: `A proposal that hasn't accounted for the compliance and security review process will be delayed by 4–8 weeks after commercial agreement — at a minimum.`, fix: `In discovery, ask explicitly: "What does your compliance and security review process look like for vendors at this investment level? What documentation will you need, and what's the typical timeline?" Map this into your deal timeline from the start.` }
    ],
    reflection_questions: [
      `What do you know about the regulatory environment of the financial services sector specifically relevant to what you sell? If the answer is "not enough," what would you study first?`,
      `In a financial services deal, who are the stakeholders you'd expect to engage beyond the business team — and what specific concerns does each one have that you'd need to address?`
    ]
  },

  // ─── COURSE 18: HealthTech Sales ────────────────────────────
  'c18m1': {
    learning_objectives: [
      'Understand the NHS and private healthcare buying landscape and key differences',
      'Know the procurement frameworks that apply to healthcare technology sales',
      'Identify the key clinical and commercial stakeholders in a healthcare deal',
      'Navigate the specific compliance requirements (DSPT, clinical safety, CQC) relevant to healthtech'
    ],
    case_study: {
      title: `NHS Procurement — Understanding the Framework`,
      story: `James (AE, Verity Health) is selling a patient data analytics platform to an NHS Trust. He approaches the sale the way he approaches private sector deals — directly with the clinical sponsor.\n\nAfter 3 months of conversations, the clinical sponsor says: "We want to move forward, but we've realised we'll need to go through a full procurement framework process. It might take another 6–9 months."\n\nJames hadn't asked about procurement frameworks in discovery. He assumed the Trust could buy directly from him. He didn't know about G-Cloud or the NHS Shared Business Services frameworks.\n\nIn his next NHS deal, James maps the procurement framework in week 1: "Are you on a framework that covers analytics platforms — G-Cloud, NHS SBS, or similar? And what approval levels does this need to go through?" He maps the full process and builds it into his timeline. The deal closes in the right quarter.`
    },
    reflection_questions: [
      `What procurement frameworks apply most commonly to the NHS organisations in your territory — and do you understand the specific processes and timelines for each?`,
      `The case study shows a classic mistake: assumptions about procurement that weren't verified in discovery. What questions would you ask in week 1 of every NHS deal to avoid this?`
    ]
  },

  // ─── COURSE 19: Retail & E-Commerce Sales ───────────────────
  'c19m1': {
    learning_objectives: [
      'Understand the retail technology buying landscape and the pressures driving investment decisions',
      'Know the key commercial stakeholders in a retail deal and what each one cares about',
      'Apply seasonal timing awareness to your retail sales process',
      'Build a business case anchored to retail KPIs (conversion rate, basket size, margin)'
    ],
    common_mistakes: [
      { title: `Pitching to retail prospects during peak trading periods`, why: `Retail buying teams are heads-down during Black Friday, Christmas, and Easter. Outreach during these periods gets low responses and lower quality attention.`, fix: `Map the retail calendar for your top prospects. The best outreach windows are typically January (post-Christmas planning), Q1 board planning cycles, and June (mid-year budget review). Avoid October–December for new-logo outreach with retail.` }
    ],
    reflection_questions: [
      `For your top retail prospect, what are the three commercial KPIs they care most about — and how does your solution specifically impact each one? Can you quantify the impact?`,
      `The module discusses seasonal timing in retail sales. When are the best windows for outreach and proposal in your specific retail segment — and are you building your pipeline activities around those windows?`
    ]
  },

  // ─── COURSE 20: Career Development ─────────────────────────
  'c20m1': {
    learning_objectives: [
      'Build a 12-month career development plan with specific skill milestones',
      'Understand the SDR-to-AE promotion criteria at most SaaS companies',
      'Know how to use your sales role to build skills that compound over a career',
      'Build your personal brand as a sales professional'
    ],
    recruiter_view: `The SDRs who get promoted to AE fastest share one trait: they think like an AE while still doing SDR work. They understand how their outbound metrics translate into pipeline, how pipeline converts to revenue, and what a good AE does differently from a good SDR. That mental model — "I'm preparing myself for the next role in everything I do today" — is the fastest path to promotion I've seen consistently.`,
    manager_insight: `When an SDR asks me "what do I need to do to become an AE?", I give them the same answer every time: (1) consistently exceed your meeting quota, (2) show me you can run a discovery call that I'd be comfortable sending an AE into, (3) demonstrate commercial understanding — not just booking meetings, but understanding why some prospects are worth more of your time than others. The promotion isn't a reward for time served. It's a recognition that you're already doing the next job.`,
    case_study: {
      title: `SDR to AE — Sofia's 18-Month Journey`,
      story: `Sofia joined NorthPeak Analytics as an SDR with no prior sales experience. In her first 6 months, she met quota 4 out of 6 months — solid, not exceptional.\n\nAt month 7, she started doing two things differently: (1) asking to shadow AE calls and running post-call analysis with her manager; (2) requesting to run the first 10 minutes of discovery calls as part of her handoff process.\n\nBy month 12, she was the SDR most AEs requested for their high-value target accounts. Her meetings booked per month were consistently 25–30% above quota — but more importantly, her meetings had above-average conversion rates because she was qualifying more rigorously.\n\nAt month 15, her manager gave her three "junior AE" deals — small accounts under £20K. She closed all three. At month 18, she was promoted to AE.\n\nThe promotion wasn't because she'd been there 18 months. It was because she'd spent 18 months actively preparing — seeking exposure to AE skills, demonstrating commercial judgment, and showing her manager evidence of readiness.`
    },
    reflection_questions: [
      `What specific skills do you need to develop to be ready for your next role — and what activities are you doing today that actively build those skills?`,
      `The case study shows Sofia actively seeking AE exposure while still in the SDR role. What equivalent exposure are you creating for yourself — and if you're not, what's stopping you?`
    ]
  }

}; // END ENRICHMENTS
