// The 7 ABA services. Each drives a nav dropdown item, a card (with its own image),
// and a /services/:slug detail page with unique, service-specific content.
// TODO(client): replace /images/services/<slug>.svg placeholders with real photography.
export const services = [
  {
    slug: 'applied-behavior-analysis',
    title: 'Applied Behavior Analysis',
    category: 'Core ABA Therapy',
    icon: 'Brain',
    image: '/images/services/applied-behavior-analysis.jpeg',
    imageAlt: 'A therapist working one-on-one with a child in a structured learning environment.',
    short: 'Individualized, data-driven therapy that builds communication, social, and daily-living skills.',
    overview:
      'Applied Behavior Analysis is the clinical foundation of everything we do. It is a well-established, research-backed approach to understanding how children learn and how meaningful behavior change happens. Rather than applying a one-size-fits-all program, a Board Certified Behavior Analyst begins by getting to know your child — their strengths, their interests, and the specific skills that will make the biggest difference in daily life.\n\nFrom there, we design an individualized plan with clear, measurable goals across areas like communication, social interaction, play, self-help, and reducing behaviors that interfere with learning. Our team teaches new skills in small, achievable steps, using positive reinforcement to encourage progress and celebrate every win. Because ABA is data-driven, we track how your child responds and adjust the plan as they grow, so therapy always reflects where your child is today.\n\nJust as importantly, the skills we build are designed to carry over beyond the therapy room — into your home, their classroom, and the community. We partner closely with you throughout, sharing progress in plain language and coaching you on strategies that keep momentum going between sessions.',
    whoFor:
      'Children with an autism diagnosis or developmental delays who are working toward communication, behavior, independence, or social goals — from early learners to school-age children.',
    whatWeProvide: [
      'A comprehensive initial assessment by a BCBA',
      'An individualized treatment plan with measurable goals',
      'One-on-one therapy using positive reinforcement',
      'Ongoing data collection and progress reviews',
      'Regular collaboration and coaching for your family',
    ],
    whatToExpect:
      'Care begins with an assessment and a plan built specifically for your child. Sessions are consistent and structured but warm and play-based, and you’ll receive regular updates on progress with clear next steps.',
    faqs: [
      { q: 'Is ABA therapy evidence-based?', a: 'Yes. ABA is one of the most extensively researched approaches for supporting children with autism, and our programs are designed and supervised by Board Certified Behavior Analysts.' },
      { q: 'How many hours of therapy will my child need?', a: 'It varies by child and goals. After the initial assessment, your BCBA will recommend a schedule and explain the reasoning behind it.' },
      { q: 'Will I be involved in my child’s therapy?', a: 'Absolutely. Family involvement is central to lasting progress — we share goals and coach you on strategies you can use at home.' },
    ],
  },
  {
    slug: 'early-intervention',
    title: 'Early Intervention',
    category: 'Early Childhood',
    icon: 'Sprout',
    image: '/images/services/early-intervention.webp',
    imageAlt: 'A young child engaged in play-based early learning with a caregiver.',
    short: 'Focused support in the earliest years, when progress often comes fastest.',
    overview:
      'The years before kindergarten are a remarkable window of development. During this time, young children’s brains are especially adaptable, which means focused, high-quality support can have an outsized impact. Early intervention concentrates on the building blocks that shape everything to come: communication, imitation, joint attention, play, and early social connection.\n\nOur early intervention services are gentle, play-based, and developmentally appropriate. We follow the child’s lead and turn everyday moments — snack time, a favorite toy, a game of peek-a-boo — into natural opportunities to learn. A Board Certified Behavior Analyst designs the plan and our team delivers it with the warmth and patience young children need to stay engaged and confident.\n\nBecause parents and caregivers are a young child’s most important teachers, coaching families is a core part of this service. We show you how to weave learning opportunities into your daily routine, so progress continues long after each session. Our aim is not only to build early skills, but to set the stage for a smoother transition into preschool and the years that follow.',
    whoFor:
      'Toddlers and preschool-age children (typically under 6) who show signs of developmental delay or have an early autism diagnosis.',
    whatWeProvide: [
      'Play-based, developmentally appropriate sessions',
      'A focus on early communication and social foundations',
      'Naturalistic teaching woven into daily routines',
      'Hands-on coaching for parents and caregivers',
      'Support preparing for preschool transitions',
    ],
    whatToExpect:
      'Sessions feel like guided play, not drills. You’ll see your child’s early communication and social skills grow, and you’ll gain practical strategies to use every day.',
    faqs: [
      { q: 'Is my child too young to start?', a: 'It’s rarely too early. Research consistently shows that starting support in the early years can make a meaningful difference.' },
      { q: 'What does an early intervention session look like?', a: 'Sessions are play-based and follow your child’s interests, turning natural moments into learning opportunities.' },
      { q: 'How are parents involved?', a: 'Closely. We coach you to embed learning into everyday routines so progress continues between sessions.' },
    ],
  },
  {
    slug: 'functional-behavior-assessment',
    title: 'Functional Behavior Assessment',
    category: 'Assessment',
    icon: 'ClipboardList',
    image: '/images/services/functional-behavior-assessment.jpg',
    imageAlt: 'A professional observing and taking notes during a behavior assessment.',
    short: 'Understanding the "why" behind a behavior before shaping a plan.',
    overview:
      'Challenging behavior is almost always a form of communication. A Functional Behavior Assessment, or FBA, is a careful, structured process for understanding what a behavior is communicating and what keeps it happening. Instead of simply reacting to a behavior, we take the time to understand its purpose — whether a child is seeking attention, trying to escape a difficult task, communicating a need, or responding to their environment.\n\nDuring an FBA, our Board Certified Behavior Analyst gathers information from multiple sources: direct observation across settings, interviews with the people who know your child best, and objective data. We look for patterns — what tends to happen before a behavior, and what happens right after — to identify the function the behavior serves.\n\nThat understanding is what makes real change possible. With a clear picture of the “why,” we can teach a more effective, functional alternative that meets the same need in a positive way, and we can shape the environment to set your child up for success. The result is an individualized behavior plan that everyone in your child’s life can follow consistently — at home, at school, and in the community.',
    whoFor:
      'Children whose behaviors interfere with learning, safety, relationships, or daily routines at home or school.',
    whatWeProvide: [
      'Direct observation across relevant settings',
      'Interviews with caregivers and key adults',
      'Objective, data-based analysis of behavior patterns',
      'Identification of the function behind the behavior',
      'A clear, individualized behavior support plan',
    ],
    whatToExpect:
      'The assessment involves observation and conversation rather than testing. You’ll receive findings in plain language and a practical plan your whole team can use consistently.',
    faqs: [
      { q: 'What is the goal of an FBA?', a: 'To understand why a behavior is happening so we can teach a positive, functional alternative rather than simply suppressing it.' },
      { q: 'How long does an FBA take?', a: 'It depends on the behavior and settings involved. Your BCBA will explain the timeline after an initial conversation.' },
      { q: 'What happens after the assessment?', a: 'You receive a clear behavior support plan and, if appropriate, we help implement it across home and school.' },
    ],
  },
  {
    slug: 'parent-training',
    title: 'Parent Training',
    category: 'Family Support',
    icon: 'HeartHandshake',
    image: '/images/services/parent-training.webp',
    imageAlt: 'A parent and a professional discussing care strategies together.',
    short: 'Practical strategies that turn everyday moments into progress.',
    overview:
      'You are with your child far more than any therapist ever will be — which makes you their most powerful teacher. Parent training gives families the same evidence-based tools our clinical team uses, translated into practical strategies that fit your real life and your real routines.\n\nRather than handing you a manual, we coach. Together we identify the goals that matter most to your family, then practice concrete techniques for encouraging communication, building positive routines, and responding calmly and consistently to challenging moments. We problem-solve the situations you actually face — mealtimes, transitions, bedtime, community outings — and adjust strategies until they feel natural.\n\nThe payoff is twofold. First, progress accelerates, because the skills your child builds in therapy are reinforced consistently at home. Second, you gain confidence. Many parents tell us the greatest relief is simply knowing what to do in the moment. Our goal is a genuine partnership: you understand the “why” behind each strategy, feel equipped to use it, and see the difference it makes in your everyday life together.',
    whoFor:
      'Parents and caregivers who want to reinforce skills, encourage communication, and respond to behaviors consistently at home.',
    whatWeProvide: [
      'Coaching in evidence-based, practical strategies',
      'Guidance tailored to your family’s routines',
      'Techniques for communication and positive routines',
      'Support for challenging moments and transitions',
      'A true partnership in your child’s progress',
    ],
    whatToExpect:
      'Sessions are collaborative and hands-on. You’ll leave with specific strategies to try, and we’ll refine them together based on what happens at home.',
    faqs: [
      { q: 'Do I need experience to benefit?', a: 'Not at all. We meet you where you are and build practical skills step by step.' },
      { q: 'How is parent training scheduled?', a: 'Sessions are arranged around your availability and can complement your child’s therapy.' },
      { q: 'Will this really change things at home?', a: 'Consistent strategies at home are one of the strongest drivers of lasting progress.' },
    ],
  },
   
  {
    slug: 'social-skills-training',
    title: 'Social Skills Training',
    category: 'Social Development',
    icon: 'Users',
    image: '/images/services/social-skills-training.jpg',
    imageAlt: 'Children engaged in a guided social interaction and learning activity.',
    short: 'Building friendship, play, and connection with peers.',
    overview:
      'Friendships, play, and a sense of belonging are some of the most meaningful parts of childhood — and they rest on social skills that can be taught. Social skills training helps children learn to connect with others through structured, supportive practice, so social situations feel less overwhelming and more rewarding.\n\nWe break social interaction into learnable pieces: taking turns, sharing, starting and maintaining a conversation, reading facial expressions and body language, understanding personal space, and navigating the give-and-take of play. Children practice these skills in a safe, encouraging setting — often alongside peers — where they can try, make mistakes, and try again without pressure. We use each child’s natural interests to keep motivation high and make practice genuinely fun.\n\nProgress is guided and gradual. As children gain confidence in one-on-one and small-group settings, we help them generalize those skills to the real-world situations that matter to them — the playground, a birthday party, a classroom group project. The goal isn’t to change who a child is, but to give them the tools to build the friendships and connections they want.',
    whoFor:
      'Children working on peer interaction, play skills, conversation, and building friendships.',
    whatWeProvide: [
      'Structured practice in social skills',
      'Guided peer interaction in supportive settings',
      'Work on conversation, cues, and cooperative play',
      'Interest-based activities that keep motivation high',
      'Support generalizing skills to real-world settings',
    ],
    whatToExpect:
      'Sessions are engaging and low-pressure, often involving guided peer practice. Skills are built gradually and carried over to everyday social situations.',
    faqs: [
      { q: 'Are sessions individual or in groups?', a: 'Both can be used. We often build skills one-on-one first, then practice with peers as confidence grows.' },
      { q: 'What social skills are covered?', a: 'Turn-taking, sharing, conversation, reading social cues, cooperative play, and more — tailored to your child.' },
      { q: 'Will skills carry over outside sessions?', a: 'Helping children generalize skills to real settings is a core goal of the program.' },
    ],
  },
  {
    slug: 'behavior-consultation',
    title: 'Behavior Consultation',
    category: 'Expert Guidance',
    icon: 'MessageSquareHeart',
    image: '/images/services/behavior-consultation.jpeg',
    imageAlt: 'A professional consultation and collaborative planning session.',
    short: 'Expert guidance for families and teams navigating behavior challenges.',
    overview:
      'Sometimes a family or care team doesn’t need a full therapy program — they need focused, expert guidance on a specific challenge. Behavior consultation provides exactly that: the expertise of a Board Certified Behavior Analyst directed at the goal or situation that matters most to you right now.\n\nConsultation begins with understanding. We take time to learn about the concern, gather relevant information, and identify what’s really driving the situation. From there, we provide clear, actionable strategies — grounded in the same evidence-based principles as our therapy programs — and we stay involved to help you put them into practice, troubleshoot, and adjust as things evolve.\n\nThis service is flexible by design. It can support a family navigating a particular behavior, a school team seeking a fresh perspective, or a care provider coordinating around a shared goal. Whether you need a focused plan for one specific challenge or ongoing guidance across several, we tailor the level of support to fit. The aim is always the same: practical solutions you can actually use, and a knowledgeable partner in your corner.',
    whoFor:
      'Families, caregivers, or care teams seeking targeted expertise for a particular behavior or goal.',
    whatWeProvide: [
      'Expert assessment of a specific challenge',
      'Clear, actionable strategies you can use',
      'Grounding in evidence-based ABA principles',
      'Ongoing guidance, troubleshooting, and adjustment',
      'Flexible support for families and care teams',
    ],
    whatToExpect:
      'We start by understanding your specific concern, then provide practical strategies and stay involved to help you apply and refine them.',
    faqs: [
      { q: 'Is this the same as full ABA therapy?', a: 'No — consultation offers focused expert guidance on a specific goal rather than a full therapy program.' },
      { q: 'Who is behavior consultation for?', a: 'Families, caregivers, and care teams who want targeted expertise for a particular challenge.' },
      { q: 'Can consultation lead to other services?', a: 'If a fuller program would help, we’ll talk it through together — but there’s no obligation.' },
    ],
  },
];

export const getService = (slug) => services.find((s) => s.slug === slug);
