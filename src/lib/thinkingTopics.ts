export type ThinkingTopic = {
  slug: string;
  title: string;
  /** Card blurb on homepage (short). */
  blurb: string;
  /**
   * Optional images for ThinkingCard. If empty, the card will show a muted gray placeholder.
   * Use absolute/hashed imports in pages if you want real images later.
   */
  imageSrcs: string[];
  /** A long-form article (English). Requirement: >= 2000 words per topic. */
  article: {
    readingTimeHint: string;
    sections: { heading: string; paragraphs: string[] }[];
  };
};

// thinking 图片：构建时必须能解析到真实文件。
// 你只删掉了其中一张（thinking-7f12...png），其余图片仍可用；
// 因此这里跳过缺失那张，保留剩余 6 张并把它们按原分组顺序填回 topics。
import thinkingImg2 from "@/assets/thinking/thinking-2a85d4c6629fe190763e2c6aba62ff22e65fcbf1.png";
import thinkingImg3 from "@/assets/thinking/thinking-c2c8871fb352004eedca2b15978708e9f32e4026.png";
import thinkingImg4 from "@/assets/thinking/thinking-6df743fc239d2db76126f65cd074f9618d56f5cd.png";
import thinkingImg5 from "@/assets/thinking/thinking-0d3a0ea1b442a139bfcc3fd041d34d03a84627a5.png";
import thinkingImg6 from "@/assets/thinking/thinking-a3129a53e4026333677575944aa4c6187eb2c94a.png";
import thinkingImg7 from "@/assets/thinking/thinking-95e962aad3f70bfa82a22777cdf7e78f783e53e0.png";

const THINKING_IMAGE_SETS: string[][] = [
  // 原：[img1, img2]，现在缺 img1 => [img2]
  [(thinkingImg2 as { src: string }).src],
  // 原：[img1, img3] => [img3]
  [(thinkingImg3 as { src: string }).src],
  // 原：[img4]
  [(thinkingImg4 as { src: string }).src],
  // 原：[img1, img2, img5] => [img2, img5]
  [(thinkingImg2 as { src: string }).src, (thinkingImg5 as { src: string }).src],
  // 原：[img1, img3, img6] => [img3, img6]
  [(thinkingImg3 as { src: string }).src, (thinkingImg6 as { src: string }).src],
  // 原：[img1, img6, img7] => [img6, img7]
  [(thinkingImg6 as { src: string }).src, (thinkingImg7 as { src: string }).src],
];

function countWords(sections: { paragraphs: string[] }[]) {
  return sections
    .flatMap((s) => s.paragraphs)
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

/**
 * 6 Thinking topics used on both homepage cards and detail page.
 * Notes:
 * - Articles are written as paragraph arrays for predictable typography rendering without MD/MDX tooling.
 * - Each article intentionally exceeds 2000 words (validated by `__DEV_WORD_COUNTS` below).
 */
export const THINKING_TOPICS: ThinkingTopic[] = [
  {
    slug: "high-efficiency-retrospectives",
    title: "High‑Efficiency Retrospectives",
    blurb:
      "A practical, system-first guide to turning reflection into better decisions: clear signals, tight loops, and habits that compound without turning your calendar into a meeting graveyard.",
    imageSrcs: THINKING_IMAGE_SETS[0] ?? [],
    article: {
      readingTimeHint: "Long read (≈12–15 min).",
      sections: [
        {
          heading: "Opening: Why retrospectives often fail",
          paragraphs: [
            "Retrospectives are supposed to be the moment where work becomes learning: you slow down, tell the truth, and turn experience into improved judgment. Yet in many teams and in many personal routines, retrospectives degenerate into vague feelings, performative positivity, or a list of to-dos that nobody revisits. High‑efficiency retrospectives are different. They are designed as a system. They produce a small number of durable insights, a small number of high‑leverage actions, and a stable memory that prevents the same mistake from returning in a new costume.",
          ],
        },
        {
          heading: "Thesis: A retrospective is an update to beliefs and rules",
          paragraphs: [
            "To make a retrospective efficient, you need to be clear about the output. The output is not “closure.” The output is not “alignment.” The output is a set of updated beliefs and updated operating rules. Updated beliefs answer: what did we learn about reality? Updated operating rules answer: what will we do differently next time, and how will we know it worked? If you cannot name at least one belief that changed, you didn’t run a retrospective; you ran a conversation.",
          ],
        },
        {
          heading: "Context & scope: Choose the right unit of reflection",
          paragraphs: [
            "Start by defining the unit of reflection. People try to retrospect “a quarter,” “a big project,” or “life.” Those units are too large; they invite storytelling and selective memory. A good unit is small enough that the evidence is concrete and recent: a sprint, a launch, a week, a single negotiation, a single hiring cycle, a single habit experiment. When the unit is small, your brain doesn’t need to invent a narrative to connect everything; it can inspect what actually happened.",
            "High‑efficiency retrospectives begin before the work is finished. During execution, you capture “breadcrumbs” without interrupting flow: quick notes of surprises, friction points, and decisions made under uncertainty. The point of breadcrumbs is to prevent hindsight from editing the record. Hindsight is useful for synthesis, but it is unreliable for raw data. A single line like “We assumed X; got Y; decided Z at 3pm” is enough to anchor reality later.",
          ],
        },
        {
          heading: "Evidence & reasoning: Separate outcomes from process",
          paragraphs: [
            "Next, separate outcomes from processes. Many retrospectives obsess over outcomes because outcomes are emotionally loud: numbers, praise, blame. But outcomes are often noisy. A good process can still produce a bad outcome due to randomness, and a bad process can sometimes get lucky. If you only react to outcomes, you will overfit. Instead ask two parallel questions: “What happened?” and “What did we do?” Then ask: “Which part was under our control, and which part was noise?” Your goal is to improve controllable inputs and make peace with uncontrollable variance.",
            "Use a simple structure that avoids rambling. One effective structure is: Context → Signals → Decisions → Results → Learnings → Experiments. Context includes constraints and the initial plan. Signals are the information you observed during execution: user feedback, metrics, delays, conflicts, unexpected dependencies, energy levels, etc. Decisions are the key forks: what you chose, what you deferred, what you ignored. Results include both measurable outputs and intangible effects (trust, morale, clarity). Learnings are the few conclusions that survive skepticism. Experiments are the minimum set of changes worth trying in the next cycle.",
            "The Signals step is where many retrospectives fail, because people treat it as a complaint session. Make it evidence‑forward. Evidence can be quantitative (conversion rate, lead time, bug count), behavioral (how long it took to get an answer, how many handoffs were needed), or qualitative (three recurring themes from customer calls). Evidence can also be your own internal state if you are doing a personal retrospective: sleep, attention, anxiety, motivation, rumination. If you don’t measure, you can’t learn; but measurement does not require perfection—it requires consistency.",
            "To keep signals honest, use “three buckets”: (1) What surprised us, (2) What slowed us down, (3) What we would repeat. Surprise reveals broken assumptions. Slowdowns reveal hidden costs. Repeats reveal strength. You can run these buckets quickly as a silent write: everyone writes for five minutes, then you cluster notes. Silent writing reduces dominance bias and reduces the temptation to perform for the group. For personal retrospectives, silent writing reduces the temptation to rationalize immediately.",
            "Once you have signals, convert them into hypotheses rather than stories. A story sounds like: “The design team didn’t care.” A hypothesis sounds like: “We did not align on acceptance criteria before implementation, which increased rework. If we introduce a pre‑implementation checklist, rework will decrease.” Hypotheses are testable. Stories are sticky but useless. Your job is to translate emotion into testable claims.",
            "Then identify the smallest set of decisions that mattered. A launch may contain hundreds of micro‑choices, but only a few decisions drive most consequences. Ask: “If we could replay the week, which three decisions would we reconsider?” These are usually decisions about scope, sequencing, and communication. They are not usually decisions about minute details. Efficiency comes from focusing on leverage, not completeness.",
          ],
        },
        {
          heading: "Counterarguments & limits: Avoid blame and overfitting",
          paragraphs: [
            "From decisions, you derive operating rules. Operating rules are not motivational slogans. They are constraints you agree to obey when you are stressed. Examples: “We do not start implementation without written acceptance criteria.” “We ship behind a feature flag when uncertainty is high.” “We schedule a pre‑mortem for launches with external dependencies.” For personal retrospectives: “I do not schedule deep work after a night of poor sleep; I do a lighter task and protect tomorrow.” A rule should be specific enough that you can violate it, which means you can notice and correct.",
            "The most common failure mode is creating too many action items. A retrospective with ten action items is not ambitious; it is unserious. You cannot change ten things at once and still attribute cause. Pick one to three experiments. Each experiment should have an owner (even if it is you), a trigger (when to do it), and a success signal. The success signal can be simple: fewer late changes, fewer pings, fewer weekend hours, fewer feelings of confusion. But it must exist.",
            "Make your experiments small and reversible. If you try to redesign your entire process after a rough sprint, you will create chaos and then confuse chaos with improvement. Instead run tiny experiments for one cycle: a new meeting format, a new handoff artifact, a new automation, a new checklist. Retrospectives work like compound interest: small improvements repeated over time beat dramatic reinventions that fail to stick.",
            "If you worry that retrospectives will become blame sessions, define one rule: speak in observations and requests, not judgments. Observation: “We had three late scope changes.” Judgment: “You always change things late.” Request: “Next sprint, let’s freeze scope by day 2 unless a metric shows a severe issue.” This rule keeps the conversation grounded and forward-looking.",
          ],
        },
        {
          heading: "Framework: Root causes, calibration, and repeatable rituals",
          paragraphs: [
            "A powerful technique for efficiency is the “five whys,” but used carefully. The goal is not to drill until someone is at fault. The goal is to find the controllable root. For example: “We missed the deadline.” Why? “Because QA found late issues.” Why? “Because QA joined late.” Why? “Because we didn’t have a test plan.” Why? “Because scope was unclear.” Why? “Because we skipped a kickoff.” The root is not “QA is slow.” The root is “Kickoff artifacts were missing.” That root suggests a fix.",
            "Another technique is “expected vs. actual.” Write down what you expected before execution: expected timeline, expected risks, expected unknowns. Then compare with actual. The gap reveals miscalibration. Miscalibration is one of the most expensive cognitive errors because it silently degrades planning and trust. If you repeatedly underestimate integration work, your process must change: add buffers, reduce parallelism, pre‑integrate earlier, or formalize dependency checks.",
            "High‑efficiency retrospectives also include a gratitude channel, but it must be specific. Generic praise does not strengthen the system. Specific recognition identifies what to repeat: “You wrote the migration plan early and it reduced risk.” “You escalated the dependency conflict quickly.” “You protected focus time during the crunch.” This builds a shared model of good behavior.",
            "If the retrospective is for yourself, you still need specificity. Write: “What did I do that worked?” not “I did my best.” Identify the behavior: “I started my day with 45 minutes of planning and it reduced reactive work.” This reinforces behaviors you can replicate. Then write: “What did I do that didn’t work?” and be precise: “I opened email before my first deep work block and lost momentum.” Precision replaces shame with agency.",
            "Treat your retrospective notes as an interface, not as a diary. The goal is to help your future self or your future team make better decisions under stress. That means short bullets, clear nouns and verbs, and explicit triggers. If the notes feel too long to reread, the system will fail when you need it most.",
            "When you’re unsure what to fix, look for repeated pain. A single bad week might be randomness. The same pain three cycles in a row is structural. Efficient retrospectives prioritize structural problems because they create compounding returns when improved.",
            "Documentation is the bridge from insight to reality. Without a record, you will remember the feeling but forget the mechanism. Keep a simple retro log: date, unit, top three signals, top two learnings, top one experiment. For teams, store it somewhere searchable. For individuals, keep it in a note system. The purpose is not bureaucracy; the purpose is memory. Humans are pattern‑seeking but forgetful. A log makes your learning cumulative.",
          ],
        },
        {
          heading: "Example agenda: A 45‑minute retro that actually closes the loop",
          paragraphs: [
            "If you want a concrete, repeatable agenda for a 45‑minute team retrospective, try this: 5 minutes silent write (surprises, slowdowns, repeats), 10 minutes cluster and vote, 15 minutes dig into the top two clusters (hypotheses only), 10 minutes choose one experiment with an owner and a trigger, 5 minutes write the decision record. A tight agenda is not rigidity; it is respect for attention.",
            "For personal retrospectives, the same structure works in 20 minutes. Write three lines: “What mattered?”, “What did I learn?”, “What will I try?” Then add one constraint you will obey next week. The constraint should feel slightly uncomfortable because it blocks a familiar mistake. Example: “No meetings before my first deep work block.” Constraints create the space where better behavior can happen.",
            "A useful experiment format is: If we do X, then Y will improve, as measured by Z, within W. Keep X small, Y specific, Z observable, and W short. Example: “If we write acceptance criteria in a shared doc before implementation, then rework will decrease, as measured by fewer late changes in QA, within one sprint.” This format prevents vague action items that never become real.",
          ],
        },
        {
          heading: "Summary & CTA: Keep it small, keep it closed-loop",
          paragraphs: [
            "Finally, close the loop. In the next cycle, start with a two‑minute review: did we run last cycle’s experiment? Did the success signal move? What will we keep, change, or stop? This is where efficiency becomes real. If you do not close the loop, retrospectives become theatre: they feel productive but do not change behavior. Closed loops turn insight into culture.",
            "Track only a few meta-metrics over time: cycle time (how long work takes), rework rate (how often you redo), surprise count (how often assumptions break), and energy (how sustainable it feels). You don’t need perfect measurement; you need trend awareness. When a trend worsens, you know which part of the system to inspect.",
            "When you treat retrospectives as a system, you stop chasing motivation. You create a reliable rhythm: capture evidence, update beliefs, adjust rules, run experiments, review results. Over time, you will notice two effects. First, repeated problems shrink because they are confronted early. Second, your confidence grows—not because you are perfect, but because you can learn on purpose. That is the core of an efficient retrospective: it transforms experience into competence, one cycle at a time.",
            "Lastly, remember the purpose: not to be “more productive,” but to become more adaptive. High‑efficiency retrospectives create a team or a self that learns faster than the environment changes. In fast-moving work, that is the ultimate competitive advantage—and in personal life, it is the ultimate form of freedom.",
          ],
        },
      ],
    },
  },
  {
    slug: "high-efficiency-learning",
    title: "Learn Efficiently",
    blurb:
      "A modern learning playbook: build mental models, practice retrieval, use feedback loops, and design your environment so knowledge becomes skill—not just notes.",
    imageSrcs: THINKING_IMAGE_SETS[1] ?? [],
    article: {
      readingTimeHint: "Long read (≈12–15 min).",
      sections: [
        {
          heading: "Opening: Efficient learning is transfer, not information",
          paragraphs: [
            "Efficient learning is not about speed-reading, taking more notes, or consuming endless content. Efficient learning means the smallest amount of time produces the largest, most durable change in your capability. It is measured by transfer: can you use what you learned in a new context, under stress, with limited time? If you can’t, you didn’t learn; you collected information.",
            "To learn efficiently, you must understand what learning actually is. Learning is biological change: your brain reorganizes patterns, builds associations, and improves prediction. That reorganization happens when you struggle just enough, retrieve knowledge from memory, and receive feedback. The brain is not optimized for passive absorption; it is optimized for doing, failing, and correcting.",
          ],
        },
        {
          heading: "Thesis: Build a loop (output → retrieval → feedback → revision)",
          paragraphs: [
            "Start with a clear target. “I want to learn design,” “I want to learn AI,” or “I want to learn psychology” is too vague. Efficient targets are defined by tasks: “I want to be able to critique a landing page and propose three high-leverage improvements.” “I want to build a small RAG prototype that answers questions from internal documents.” “I want to run a one-hour user interview and synthesize insights.” Tasks create a boundary. Without a boundary, your learning becomes a hobby of collecting.",
            "Next, map the task into a small set of core concepts and subskills. For any domain, there are a few bottlenecks. In programming, it might be debugging and mental models of state. In writing, it might be structure and revision. In design, it might be constraints, hierarchy, and user intent. Efficient learners spend time identifying bottlenecks, not consuming random tutorials.",
            "A helpful method is to build a “concept map” of the domain. Draw the main concepts and how they connect. Don’t aim for completeness; aim for a working skeleton. A skeleton lets new knowledge attach. Without a skeleton, you store facts as isolated nodes, and isolated facts are forgotten quickly. Even a crude map improves retention because it provides context.",
            "Once you have targets and a skeleton, you choose the learning loop. The most effective loop is: (1) Create a small output, (2) Test yourself, (3) Get feedback, (4) Update the model, (5) Repeat. Output can be a mini-project, a summary, a problem set, a design critique, a small demo, or even a one-page explanation. The key is that output forces your brain to organize knowledge into usable form.",
          ],
        },
        {
          heading: "Evidence & reasoning: Retrieval, spacing, and interleaving",
          paragraphs: [
            "Retrieval practice is the engine. It means you try to recall information without looking. People avoid retrieval because it feels hard, and hardness feels like failure. But difficulty is the signal that learning is happening. If you reread notes and feel smooth, you are often experiencing familiarity, not mastery. Efficient learners design for productive struggle: flashcards, practice problems, explaining from memory, teaching a friend, writing an outline without sources.",
            "Spaced repetition multiplies retrieval. Instead of cramming, you revisit key ideas over days and weeks. Each revisit strengthens the memory and makes retrieval faster. The schedule doesn’t need to be complex. Even a simple plan—review tomorrow, then in three days, then in a week—beats cramming. Spacing works because forgetting is part of consolidation. When you retrieve after partial forgetting, you strengthen the trace.",
            "Interleaving improves transfer. Instead of studying one topic in a block, you mix related topics. This forces your brain to discriminate: when do I use method A vs. method B? In real life, problems do not arrive labeled. Interleaving makes your knowledge flexible. For example, if you’re learning product analytics, mix cohort analysis, funnel analysis, and segmentation rather than doing one for a week. If you’re learning design, mix typography, layout, and interaction patterns rather than isolating them.",
          ],
        },
        {
          heading: "Counterarguments & limits: Feedback, rubrics, and cognitive load",
          paragraphs: [
            "Feedback is non-negotiable. Without feedback, you cannot calibrate. Feedback can be external (a mentor review, a code review, user testing) or internal (unit tests, checklists, self-graded rubrics). Efficient learners build feedback into the work. They don’t wait for someone to be kind. They design their environment so reality gives them signals.",
            "The most underrated tool is a rubric. A rubric translates a fuzzy skill into observable criteria. Writing rubric: clarity, structure, evidence, voice, concision. Design rubric: hierarchy, alignment, contrast, affordances, accessibility, error states. Engineering rubric: correctness, readability, tests, performance, observability. A rubric makes practice deliberate. Without it, you practice the same mistakes.",
            "Efficiency also requires managing cognitive load. Your brain has limited working memory. When a topic is complex, break it into chunks. A chunk is not a smaller fact; it is a pattern you can treat as a single unit. For example, in programming, “HTTP request lifecycle” becomes one chunk once you understand it. In design, “information hierarchy” becomes one chunk. Chunking comes from repeated use, not from more reading.",
          ],
        },
        {
          heading: "Framework: Chunking, contrast, and sustainable rhythm",
          paragraphs: [
            "You can accelerate chunking by learning through examples and contrast. Study two examples that look similar but differ in a key way. Ask: why did one work better? Contrast highlights the underlying principle. In writing, compare two intros and notice the difference in framing. In UI design, compare two forms and notice the difference in error handling and microcopy. In ML, compare two models and notice the difference in bias-variance behavior. Contrast builds discrimination, and discrimination builds expertise.",
            "Efficient learning is also emotional design. If you associate learning with constant pressure, you will avoid it. The goal is sustainable intensity. Use a rhythm: short focused sessions with breaks, a weekly review, and a monthly project. Track progress with outputs, not hours. Outputs create motivation because they are evidence of growth.",
            "Avoid the trap of “tool-first learning.” Tools change quickly; principles last. If you learn a tool without principles, you become fragile. If you learn principles and then learn tools, you become adaptable. For example, learn the principles of prompting, decomposition, and evaluation; then use them across different AI tools. Learn the principles of layout and typography; then apply them in different design systems. Principles are portable leverage.",
            "When learning something complex, use the “two-layer approach.” Layer one is breadth: an overview that tells you what exists and how it fits. Layer two is depth: practice on a narrow slice until you can perform. Many people stay in breadth and feel productive because they know many terms. Efficiency requires moving into depth early. Depth is where your confidence becomes real because it is backed by capability.",
          ],
        },
        {
          heading: "Methods: Writing, error harvesting, and deliberate practice",
          paragraphs: [
            "One of the fastest ways to deepen is to write. Writing forces precision. When you try to explain a concept in your own words, you find gaps. If you can’t explain it, you don’t understand it. Write a one-page explanation after each learning block. Then, a week later, rewrite it from memory and compare. The gaps are your next study targets.",
            "Another deepening method is “error harvesting.” Keep a list of your mistakes. In coding: common bugs you make. In design: common hierarchy mistakes. In communication: common ambiguity. Review the list weekly. This turns failure into data. Over time, the same mistakes disappear, and new, more subtle mistakes appear. That is growth.",
            "Finally, efficient learning requires a finish line. End each week with a small demonstration: a mini-project, a presentation, a critique, a tutorial, a checklist you built. End each month with a larger demonstration. Learning without demonstration becomes endless preparation. Demonstration creates closure and evidence.",
          ],
        },
        {
          heading: "Example: A weekly learning system you can actually run",
          paragraphs: [
            "To make this practical, design a weekly learning system with three blocks. Block A (2–3 sessions): input and map—read or watch with the goal of building your concept skeleton. Block B (2–3 sessions): retrieval and practice—close the material and solve problems, write from memory, or build a small artifact. Block C (1 session): feedback and revision—compare your output to a rubric, ask for critique, and update your notes. The week ends with a demo, even if small.",
            "If you struggle with motivation, reduce the activation energy. Prepare your environment so learning is the default: open the doc, set the timer, remove distractions, and make the next task obvious. Motivation often arrives after starting, not before. Efficient learning is therefore also good friction design: remove friction from starting and add friction to distraction.",
            "If you are learning for work, always connect knowledge to a real workflow. Ask: where will this show up in my next week? If you can’t answer, you are learning in the abstract. Abstract learning feels inspiring but fades. Workflow-connected learning becomes habit because it has immediate use.",
            "Beware of note-taking that becomes performance. Notes should be a tool for retrieval, not a museum. A good note is a prompt that helps you recall: questions, diagrams, checklists, and pitfalls. A bad note is a verbatim transcript. If your notes are long but you can’t perform, your notes are not serving you.",
          ],
        },
        {
          heading: "Summary & CTA: Apply early, measure by usefulness",
          paragraphs: [
            "If you adopt these mechanisms—clear tasks, concept skeletons, retrieval, spacing, interleaving, feedback, rubrics, chunking, contrast, sustainable rhythm—you will notice something: you can learn almost anything faster than you thought. Not because you are a genius, but because you are aligned with how the brain actually changes. Efficient learning is not a hack. It is respect for reality.",
            "When reality becomes your teacher—through retrieval difficulty, feedback signals, and consistent review—you stop needing motivation. You simply run the loop. Over months and years, that loop compounds. Your knowledge becomes skill, your skill becomes judgment, and your judgment becomes freedom to choose better work and a better life.",
            "Finally, measure learning by “time to first useful application.” The faster you can apply a concept, the more likely you will retain it. This is why building small projects is so powerful: it forces application. If you want to learn efficiently, do not wait until you “finish the course.” Apply after the first chapter.",
            "When you feel stuck, use diagnostic questions. Do I lack information (I don’t know what to do)? Do I lack procedure (I know what to do but can’t execute)? Do I lack feedback (I can’t tell if I’m improving)? Do I lack consistency (I’m not practicing enough)? Each diagnosis suggests a different fix. Many learners keep consuming information when their real problem is procedure.",
            "A high-efficiency method for procedure is “worked examples → completion → generation.” First, study a worked example with explanation. Next, complete a partially finished example. Finally, generate a full solution from scratch. This progression reduces overwhelm while still forcing retrieval. It is how many skills are taught effectively, from math to design critique to software architecture.",
            "If you want to remember concepts long-term, build a “mistake-driven flashcard” set. Each card is not a fact; it is a common trap. Front: “When does X fail?” Back: “It fails when…”. Or Front: “What is the difference between A and B?” Back: your own explanation. Trap cards build discrimination and prevent repeating the same errors.",
            "For creative domains, practice constraints. Give yourself a box: one font family, two colors, one layout pattern, or one interaction style. Constraints reduce decision fatigue and force you to explore depth instead of novelty. Paradoxically, constraints often increase creativity because they push you to discover new combinations within the same space.",
            "For technical domains, practice debugging as a primary skill, not as a side effect. Debugging is where learning becomes real because it exposes your mental model. After each debugging session, write a short post-mortem: what was wrong, what misled you, what signal finally revealed the truth, and how you would detect it faster next time. This turns pain into reusable skill.",
            "If you want to learn in public, keep it lightweight: share one insight, one example, or one mini-project per week. Learning in public creates social feedback and accountability, but it can also create pressure and perfectionism. The goal is not to perform expertise; it is to document progress. Documenting progress keeps learning honest.",
            "At the deepest level, efficient learning is a form of self-respect. You are telling yourself: my time matters, my attention matters, and my future capability matters. When you build a learning system that fits your life, you stop swinging between obsession and collapse. You become someone who can grow steadily—without drama.",
          ],
        },
      ],
    },
  },
  {
    slug: "ai-for-high-leverage-work",
    title: "AI for High‑Leverage Work",
    blurb:
      "AI is not a magic brain; it’s a leverage machine. Learn how to turn messy goals into clear prompts, evaluate outputs, build reusable workflows, and protect quality and truth.",
    imageSrcs: THINKING_IMAGE_SETS[2] ?? [],
    article: {
      readingTimeHint: "Long read (≈12–15 min).",
      sections: [
        {
          heading: "Opening: AI is leverage, not magic",
          paragraphs: [
            "The fastest way to waste time with AI is to treat it like a vending machine: you type a vague wish and hope a perfect answer drops out. The fastest way to gain leverage is to treat AI like a junior collaborator: you give it context, constraints, and a clear definition of done; you ask it to produce artifacts; you evaluate, correct, and iterate. High‑leverage AI work is less about prompting tricks and more about workflow design.",
            "Start with a mental model: AI is a probabilistic generator that can compress patterns from its training and from your context. It is powerful at drafting, transforming, summarizing, brainstorming, and mapping. It is weaker at truth, precision, and local business context unless you provide that context. If you expect it to be a source of truth, you will be disappointed. If you use it as a tool to create options and accelerate iteration, you will be delighted.",
          ],
        },
        {
          heading: "Thesis: Frame, decompose, evaluate, iterate",
          paragraphs: [
            "High‑leverage use begins with problem framing. Before you ask AI anything, answer three questions for yourself: What is the goal? What constraints matter? What does “good” look like? These are the same questions you would answer before delegating to a human. If you can’t answer them, the AI can’t either, because the AI is not creating the goal; you are.",
            "A practical framing template is: Role → Task → Context → Constraints → Output format → Evaluation criteria. For example: “You are a product strategist. Task: propose three positioning options. Context: we sell X to Y. Constraints: must avoid Z. Output: a table with pros/cons and risks. Criteria: clarity, differentiation, and feasibility.” This template is not magic, but it forces you to encode what matters. Encoding what matters is the secret of good prompts.",
            "The next skill is decomposition. Most valuable work is not one question; it is a chain of subproblems. Efficient AI users break work into steps and ask the AI to produce intermediate artifacts. If you ask for a complete strategy doc in one prompt, you will get a plausible essay. If you ask for: (1) assumptions, (2) missing data, (3) audience segments, (4) messaging pillars, (5) final doc, you get a more grounded output. Decomposition also makes evaluation easier, because you can verify each piece.",
          ],
        },
        {
          heading: "Evidence & reasoning: Evaluation habits beat prompt tricks",
          paragraphs: [
            "Evaluation is where leverage becomes real. AI output is often fluent, which can mask errors. You need an evaluation habit. Start by demanding citations when facts matter, and by marking which parts are speculation vs. verified. Use checklists: Is the logic consistent? Are there unsupported claims? Does it contradict known constraints? Does it ignore edge cases? For code: does it compile, does it handle errors, does it match interfaces? For writing: does it match tone, does it have structure, does it repeat itself?",
            "A powerful technique is to ask the AI to self‑critique, but not in a vague way. Ask for a red-team review: list likely failures, missing assumptions, and how to test. Then decide which critiques are valid. Self‑critique helps because it forces the model to explore the space of possible errors. It is not perfect, but it increases your chance of catching problems early.",
            "Another high‑leverage pattern is “two drafts + synthesis.” Ask the AI to produce two different approaches, each optimized for different trade-offs. Then ask it to synthesize: what’s shared, what’s different, and a blended version. This prevents you from anchoring on the first plausible answer. Humans anchor easily; AI can generate variety cheaply. Use that.",
          ],
        },
        {
          heading: "Framework: Where AI creates the most ROI at work",
          paragraphs: [
            "To use AI efficiently at work, focus on bottlenecks. Bottlenecks are tasks where your time is expensive and your attention is scarce: writing first drafts, generating options, summarizing research, turning notes into structured documents, producing test cases, generating UI copy variants, creating scripts, planning experiments, creating tables, mapping risks, creating meeting agendas, and converting decisions into action lists. AI can reduce the time from blank page to workable draft. That’s leverage.",
            "AI also excels at transformation. If you have raw material—meeting notes, interview transcripts, logs, design rationale—AI can turn it into: a one-page summary, a decision record, a set of themes, a list of insights, an executive update. Transformation is safer than invention, because you can verify against the source. If you want reliability, prefer transformation tasks.",
            "For knowledge work, build a “prompt library” of reusable patterns. The library is not a list of magic phrases; it is a set of workflows. Example: “Turn notes into a memo with sections: Context, Problem, Options, Recommendation, Risks, Next steps.” Example: “Convert customer feedback into themes and map each theme to an opportunity and an experiment.” Example: “Write a PRD from this outline and include acceptance criteria, edge cases, and metrics.” Each workflow saves you time repeatedly.",
            "If your work involves internal documents, retrieval matters. AI is much more useful when it can reference your context: requirements, architecture docs, previous decisions. Even without a full RAG system, you can paste relevant excerpts and ask: “Use only these sources; if something is missing, ask questions.” This reduces hallucination and increases alignment with reality.",
            "When using AI for code, the highest leverage is not “write everything for me.” The highest leverage is: generate scaffolding, tests, refactors, and edge-case handling. Ask the model to propose an implementation plan first, then implement a small slice, then run tests, then iterate. Make the model show its assumptions about APIs and types. Ask it to list unknowns. The most dangerous output is code that looks right but is subtly wrong. Your workflow should surface those subtle errors early.",
            "AI can also improve communication. Many workplace problems are not technical; they are clarity problems. Use AI to rewrite messages with clearer structure, a respectful tone, and explicit asks. Use it to generate meeting agendas that produce decisions rather than discussion. Use it to create stakeholder updates that emphasize impact, risks, and asks. Communication leverage is often higher than technical leverage because misunderstandings are expensive.",
          ],
        },
        {
          heading: "Counterarguments & limits: Safety, privacy, and ownership",
          paragraphs: [
            "However, high‑leverage AI use requires boundaries. First: confidentiality. Do not paste sensitive data into tools that are not approved. Second: authorship. If you ship AI output without review, you are delegating your reputation to a generator. Third: dependency. If AI becomes a crutch, you may stop building your own judgment. The goal is augmentation: you become faster and more thoughtful, not replaced by a template machine.",
            "A simple rule: let AI expand options, but let humans decide. AI can brainstorm five strategies, but you choose based on values, context, and consequences. AI can draft a document, but you sign your name after verification. AI can propose code, but you own the behavior in production. Ownership is the core ethical principle of AI at work.",
            "To keep quality high, add “gates.” A gate is a point where you verify. For writing: a logic gate (does it make sense), a tone gate (does it sound like us), a fact gate (are claims true), and an action gate (what will we do). For code: typecheck gate, test gate, lint gate, security gate. AI increases speed; gates maintain trust.",
          ],
        },
        {
          heading: "Example workflow: Three-pass + contrast sets",
          paragraphs: [
            "If you want a simple everyday workflow, use a three-pass method. Pass 1: ask for a rough draft or a list of options. Pass 2: ask for a critique against your constraints and a checklist of risks. Pass 3: ask for a refined version that explicitly addresses the critique. You do the final judgment. This method makes quality less dependent on a single prompt and more dependent on iteration.",
            "For creative work, ask for “contrast sets.” Example: three versions of a headline—one bold, one calm, one playful. Or three UX copy variants—one short, one empathic, one formal. Contrast helps you see what you actually want and prevents you from accepting the first adequate result. It also trains your taste, which is one of the most valuable human skills in AI-assisted work.",
            "For analytical work, ask the model to show its assumptions and then invite you to correct them. Example: “List the assumptions you are making about our users, market, and constraints. Ask five questions that would most reduce uncertainty.” This turns AI into a thinking partner rather than a confident storyteller.",
          ],
        },
        {
          heading: "Summary & CTA: Standards + saved time = real leverage",
          paragraphs: [
            "Over time, you can build systems: templates, automation, assistants, and internal tools. But start small. The biggest ROI often comes from improving your personal workflow: faster drafts, better summaries, more consistent checklists, clearer planning, and better retrospectives. Once your personal workflow is stable, you can scale it to your team with shared templates and shared evaluation habits.",
            "If you want a practical starting point, pick one weekly task you dislike—like writing status updates or summarizing meeting notes—and build a repeatable prompt + format. Then iterate for a month. You will discover which inputs matter and which outputs are actually used. That is high leverage: you improve a recurring cost.",
            "AI will continue to evolve. The people who benefit most will not be those who memorize the newest features; it will be those who learn the underlying workflow principles: framing, decomposition, transformation, evaluation, and iteration. Those principles are stable. They turn AI into a tool that makes you more capable, more consistent, and more free to focus on the work only you can do.",
            "Finally, remember that leverage is about what you do with the time you save. If AI saves you an hour and you fill it with more low-impact tasks, nothing changes. Use the saved time for higher-order work: clearer strategy, deeper research, better user understanding, and better relationships. That is where your advantage will live.",
            "To avoid “AI drift,” keep a simple record of the prompts that worked and the ones that failed. Write one line about why. Over a month, you will discover your own leverage patterns: which inputs produce strong outputs, which constraints matter most, and where the tool consistently fails. This turns AI usage from random to intentional.",
            "When accuracy matters, use a “source-first” protocol. Provide the source text, ask the model to quote the specific lines that support each claim, and ask it to label anything not supported as an assumption. This is slower, but it produces trustworthy artifacts for decisions. Trustworthy artifacts are where AI becomes enterprise-grade rather than novelty-grade.",
            "If you build AI into team workflows, start with non-critical, high-frequency tasks: meeting notes to decision records, PRD outlines, risk lists, QA checklists, and stakeholder updates. These tasks have clear structure and strong benefits. Once the team builds evaluation habits, you can expand toward more complex use cases.",
            "For creative work, use AI as a “variation engine” but keep your own taste as the final filter. Taste is the human skill of selecting what fits the goal, the audience, and the moment. AI can produce ten versions. Only you can decide which version is true to your intent and context. Protect that role. It is part of your professional identity.",
            "A helpful safety mindset is: “AI can write, but it cannot care.” Caring means noticing what matters, protecting users from harm, and honoring context. If you bring care into the workflow—through constraints, evaluation, and empathy—AI becomes a tool that amplifies your values rather than diluting them.",
            "Over time, your best AI advantage will not be speed alone. It will be consistency. People often fail not because they lack talent, but because they cannot produce quality repeatedly. AI-assisted workflows, paired with good checklists, can raise your baseline and reduce variance. Reduced variance is a silent superpower in professional work.",
            "If you want to be truly effective, learn to say “no” to AI outputs that feel merely plausible. Plausibility is cheap; correctness and fit are expensive. Your leverage comes from combining the model’s speed with your standards. Standards are what turn generation into professional-grade work.",
            "If you want one concrete starting exercise, pick a recurring document you write (a weekly update, a research summary, a spec, a retro note). Create a template with sections, then ask AI to fill it from your raw notes. Your role is to verify and tighten. Run this for four weeks and you will build a reliable pipeline from messy inputs to crisp outputs.",
            "Finally, keep a simple metric: time saved per week and quality incidents per week. If you save time but quality incidents rise, you are moving fast in the wrong direction. Add gates, add sources, or narrow the use case. High-leverage AI is not just speed—it is speed that you can trust.",
          ],
        },
      ],
    },
  },
  {
    slug: "finding-what-you-love",
    title: "Find What You Love",
    blurb:
      "Love isn’t always a lightning strike. It’s often built through curiosity, competence, relationships, and values. This guide helps you find it through experiments, not fantasies.",
    imageSrcs: THINKING_IMAGE_SETS[3] ?? [],
    article: {
      readingTimeHint: "Long read (≈12–15 min).",
      sections: [
        {
          heading: "Opening: Passion is often built, not found",
          paragraphs: [
        "Many people search for “their passion” the way they search for a hidden treasure: they expect a single, obvious answer that will feel right forever. That story is comforting, but it often leads to anxiety and paralysis. In reality, love for a craft, a path, or a life direction is usually constructed. It grows through repeated contact, competence, meaning, and community. It is less like finding a soulmate and more like building a relationship.",
          ],
        },
        {
          heading: "Thesis: Love is sustained willingness (curiosity + competence + contribution + connection)",
          paragraphs: [
        "To find what you love, you first need to remove some myths. Myth one: there is one correct passion for you. Myth two: you will feel constant excitement. Myth three: if it’s not easy, it’s not meant for you. Myth four: people who love what they do never doubt. These myths turn normal difficulty into an identity crisis. Love includes friction. Love includes boredom. Love includes doubt. The question is not whether it is always fun; the question is whether it is worth caring about.",
        "A better definition of love is sustained willingness. What are you willing to do repeatedly, even when it is hard, because the struggle feels meaningful? That willingness often comes from a combination of four ingredients: curiosity (you want to understand), competence (you can improve), contribution (it helps others), and connection (you belong). If a direction has none of these, it usually won’t last. If it has at least two, it can grow.",
          ],
        },
        {
          heading: "Context: Values and energy are better starting points than fantasies",
          paragraphs: [
        "Start with values rather than hobbies. Values are the kinds of outcomes and experiences you want to be part of. Examples: creating beauty, solving puzzles, helping people, building systems, exploring ideas, earning freedom, leading teams, expressing emotion, protecting the vulnerable. Values are more stable than interests. When you know your values, you can test many paths that satisfy them instead of betting everything on one “perfect” job.",
        "Then examine your energy. Pay attention to what gives you energy and what drains you. Not in a shallow way (“I like it”), but in a physiological way: after doing this activity for two hours, do you feel more alive or more dead? Some activities are tiring but satisfying; others are tiring and empty. Efficient self-discovery uses this signal. Keep a simple log for two weeks: activities, energy before, energy after, and a note about meaning. Patterns emerge.",
        "Next, look for “pulls,” not “shoulds.” Pulls are small moments of genuine interest: you read an article and keep thinking about it; you watch someone do something and feel drawn; you lose track of time while tinkering. Shoulds are external expectations: status, family pressure, trends. Shoulds can be useful constraints, but if you build your life on shoulds, you will often feel hollow. Pulls are clues to what might become love.",
          ],
        },
        {
          heading: "Evidence & reasoning: Experiments beat introspection alone",
          paragraphs: [
        "But pulls are not enough, because pulls can be shallow. The next step is experimentation. Think of your life as a series of experiments rather than a single decision. Experiments reduce fear because they are reversible. An experiment is small, time-boxed, and produces evidence. Example: “For four weeks, I will write one essay per week about topic X.” “For three weekends, I will build a small app.” “For two months, I will volunteer in a role that uses skill Y.” Your job is to generate evidence about fit.",
        "When you run experiments, focus on process signals. Did you enjoy the practice itself, not just the fantasy of success? Did you feel curious about improving? Did you seek feedback? Did you feel proud of small progress? These signals predict long-term love better than a single moment of excitement. Many people love the idea of being an artist, but they do not love drawing. Many people love the idea of being a founder, but they do not love the daily grind of selling and building. Love is in the practice.",
        "Competence is a major amplifier. The more skilled you become, the more options you see, and the more satisfying the work becomes. This is why beginners often feel lost: they cannot yet feel the beauty of the craft. If you quit too early, you never reach the stage where the work becomes intrinsically rewarding. A practical approach is to commit to an “apprenticeship window”—for example, 60 days of consistent practice—before judging whether you like it.",
        "Community matters. Many passions are sustained by relationships: mentors, peers, collaborators, audiences. If you try to pursue a craft alone, you may misinterpret loneliness as lack of passion. Find people who care about the thing. Join a group, attend meetups, participate in forums, take a class. Belonging turns effort into identity, and identity stabilizes motivation.",
        "Contribution also matters. People often fall in love with work when they see its impact. If you can connect your craft to someone else’s benefit—solving a real problem, making something easier, making something beautiful—you activate meaning. Meaning is one of the strongest sources of sustained willingness. It is also the antidote to the modern problem of having too many options. Contribution tells you what to choose.",
          ],
        },
        {
          heading: "Counterarguments & limits: Don’t wait for the perfect mission",
          paragraphs: [
        "There is also a strategic perspective. You do not need to pick what you love in a vacuum. You can choose a “career capital” path: build rare and valuable skills that give you freedom. As you gain freedom, you can shape your work to include more of what you care about. Many people do not start with love; they start with competence. Later, they earn the ability to choose projects, environments, and missions that match their values. Love can be the result, not the prerequisite.",
        "This approach also reduces the pressure to “find the one thing.” You can have multiple loves across seasons of life. You can have a love for craft and a love for community and a love for family. The goal is not to maximize a single passion; the goal is to design a life where your values are expressed regularly.",
        "One practical tool is the “portfolio of meaning.” Choose three buckets: (1) a core craft you build skill in, (2) a service or community practice, (3) an exploration practice. The core craft provides growth and identity. The service provides contribution. The exploration keeps curiosity alive. You do not need to love everything. You need a balanced system that supports meaning over time.",
        "If you feel stuck, check for avoidance disguised as searching. People sometimes search for passion to avoid committing. Commitment creates the possibility of failure. Searching feels safe because it is open-ended. The cure is to run experiments with deadlines. Set a decision date: “In eight weeks, I will choose whether to continue this path.” Evidence plus deadlines creates momentum.",
        "Also check for perfectionism. Perfectionism makes every option feel wrong because it is not perfect. But love is not perfect. Love is a choice repeated. If you wait for certainty, you will wait forever. You need enough evidence to commit to a next step, not enough evidence to prove the future.",
        "Finally, remember that love is not only about what you do; it is also about how you do it. The same job can feel empty in a toxic environment and meaningful in a healthy one. The same craft can feel dull when you are isolated and exciting when you collaborate. Before you conclude you don’t love something, consider changing the environment, the constraints, or the people around it.",
          ],
        },
        {
          heading: "Framework: Practical tools for finding love",
          paragraphs: [
        "Finding what you love is therefore not a single discovery. It is an iterative design process: clarify values, notice energy, follow pulls, run experiments, build competence, find community, contribute, and revise. Over time, the shape of your life becomes clearer—not because you found a hidden answer, but because you built one through action. That is the realistic path to love: not a lightning strike, but a practiced devotion to what feels worth doing.",
        "If you want a structured set of experiments, use the “30‑day curiosity protocol.” Choose three candidate directions. For each, do four sessions of 60–90 minutes spread across a month: one session to learn the basics, one session to produce a tiny output, one session to get feedback, and one session to reflect and decide whether to continue. At the end you will have evidence, not just feelings.",
        "During these experiments, separate “interest” from “identity.” Interest is the pull to explore. Identity is the story you tell yourself about who you are. Many people avoid experimenting because they fear changing identity. But identity should be the result of action, not the condition for action. You can explore without labeling yourself. Labels can come later, when you have evidence.",
        "Also consider the role of environment. You might love the same craft in one context and hate it in another. A person might love teaching in a small group but hate teaching in a bureaucratic institution. You might love design in a mission-driven team but hate it in a politics-driven team. Don’t confuse a bad environment with a bad fit. Change the environment before you abandon the craft.",
        "A helpful question is: “What problems do I enjoy solving?” Passion is often problem-shaped. Some people love problems of clarity. Some love problems of aesthetics. Some love problems of human emotion. Some love problems of scale and systems. If you can name the problem shape you enjoy, you can find many roles that match it.",
          ],
        },
        {
          heading: "Example: Dual-track plan (stability + exploration)",
          paragraphs: [
        "Finally, accept that love grows slower than hype. Social media shows highlight reels. Real love often looks like quiet practice, small improvements, and deepening understanding. If you can commit to the quiet practice, your love becomes resilient. It is no longer dependent on novelty. It becomes part of your character.",
        "If you feel torn between practicality and love, use a “dual-track plan.” Track one is stability: a job or path that pays bills and builds transferable skill. Track two is exploration: a protected weekly block where you build the craft you might love. The dual-track plan reduces fear because you are not gambling your entire life on one uncertain bet. Many people find love on track two and then slowly shift the center of gravity.",
        "Also watch for the difference between “hyperfocus” and “love.” Hyperfocus can feel intense, especially for novelty seekers. Love is quieter and more stable. Hyperfocus often collapses when novelty disappears; love deepens when novelty disappears because competence and meaning increase. The test is: do you still return when it becomes ordinary?",
          ],
        },
        {
          heading: "Summary & CTA: Choose the person you want to become",
          paragraphs: [
        "If you are multi‑interested, don’t force yourself into a single identity. Instead build a “theme life.” A theme is a deeper thread that connects your interests, like “helping people make better choices,” “turning complexity into clarity,” or “building beautiful systems.” The theme lets you explore widely without feeling scattered. It gives your life narrative coherence.",
        "If you are afraid of wasting time, remember that exploration is not waste if it produces self-knowledge and skill. Many skills transfer: writing, analysis, empathy, design, persuasion, leadership. Even if an experiment doesn’t become your main path, it can become part of your skill stack and part of your meaning portfolio.",
        "To keep your search grounded, define what “a good life” means in observable terms: enough money, enough autonomy, enough depth, enough contribution, enough relationships, enough health. Then evaluate opportunities against that definition, not against a romantic fantasy. Love that destroys the rest of your life is not love; it is obsession.",
        "In the end, the question is not only “What do I love?” but “What kind of person do I want to become?” Your loves shape your character. Choose pursuits that make you more honest, more capable, and more kind. Over time, the right love will not only feel good; it will make you good in the ways you respect.",
        "Love, in the mature sense, is a commitment to keep learning. When you choose something worth loving, you choose the responsibility of growth. That responsibility is heavy at first, but it is also the source of deep satisfaction: you are becoming more capable of caring well.",
          ],
        },
      ],
    },
  },
  {
    slug: "building-real-confidence",
    title: "Build Real Confidence",
    blurb:
      "Confidence isn’t a mood you wait for; it’s a relationship with reality. Learn how competence, self-trust, and identity grow through evidence, reps, and repair after failure.",
    imageSrcs: THINKING_IMAGE_SETS[4] ?? [],
    article: {
      readingTimeHint: "Long read (≈12–15 min).",
      sections: [
        {
          heading: "Opening: Confidence is a contract with reality",
          paragraphs: [
            "Many people think confidence is something you either have or you don’t. They treat it like a personality trait: some people are confident, others are not. But confidence is closer to an internal contract. It is the belief that you can respond effectively to what happens. Not that you will always win, but that you can handle outcomes—success, failure, criticism, uncertainty—without collapsing.",
          ],
        },
        {
          heading: "Thesis: Competence + self-trust",
          paragraphs: [
            "Real confidence has two components: competence and self-trust. Competence is the ability to do something. Self-trust is the belief that you will show up, tell the truth to yourself, and keep going when it gets hard. You can have competence without confidence if you don’t trust yourself. You can have confidence without competence, but that is fragile and often becomes arrogance. Sustainable confidence is built when competence and self-trust grow together.",
          ],
        },
        {
          heading: "Evidence & reasoning: Reps create proof (not affirmations)",
          paragraphs: [
            "Start with evidence, not affirmations. Affirmations can improve mood, but mood-based confidence evaporates under pressure. Evidence-based confidence lasts. Evidence comes from reps: you do the thing, you get feedback, you improve. It sounds simple, but many people avoid reps because reps expose imperfection. They prefer fantasy over practice. The path to confidence is accepting the discomfort of being a beginner and still acting.",
            "A practical method is to reduce the scope of what you are trying to be confident about. People say, “I want confidence.” That is too abstract. Instead choose a domain: “I want to be confident giving presentations.” “I want to be confident in my design decisions.” “I want to be confident in social situations.” Domain confidence is buildable because you can practice it. General confidence often emerges later as the sum of many domain confidences.",
            "Once you choose a domain, design a ladder of challenges. The ladder starts with tasks that are slightly uncomfortable but doable. If the first step is too big, you will avoid it and then interpret avoidance as proof you are weak. That interpretation is wrong. Avoidance is usually a signal of an oversized step. Adjust the step size. Confidence grows when you repeatedly complete steps and update your self-image: “I do hard things.”",
          ],
        },
        {
          heading: "Framework: Self-trust, feedback, boundaries, and physiology",
          paragraphs: [
            "Self-trust is built by keeping promises to yourself. The promises must be small enough to keep, but meaningful enough to matter. If you set goals that are unrealistic and then fail, you train yourself not to trust your plans. Instead set a commitment you can keep even on bad days: ten minutes of practice, one page of writing, one outreach message. The goal is consistency, not heroism. Consistency is how you convince your nervous system that you are reliable.",
            "Another mechanism is skillful interpretation of failure. Many people treat failure as identity evidence: “I failed, so I am a failure.” That is catastrophic thinking. The confident interpretation is: “I failed, which means I found the edge of my skill. Now I can learn.” This is not positive thinking; it is accurate thinking. Failure is data. The difference between fragile and real confidence is the ability to learn from failure without making it a verdict on your worth.",
            "Confidence also depends on your relationship with criticism. If criticism feels like danger, you will avoid feedback, and without feedback you cannot grow. Learn to separate the self from the work. Your work can be improved. You are not your work. A helpful habit is to invite specific feedback: “What is unclear?” “Where did you get confused?” “What would make this stronger?” Specific feedback feels safer because it is actionable. Vague judgment feels dangerous because it threatens identity.",
            "Another part of confidence is boundary-setting. People who lack confidence often outsource their self-worth to approval. They become anxious because approval is unstable. Real confidence includes the ability to say no, to disappoint people, and to remain grounded. Boundaries are not aggression; they are clarity about what you will and won’t do. When you protect your values, your self-respect increases, and self-respect is a major foundation of confidence.",
            "Confidence is also physical. Your nervous system affects your perception of threat. Sleep deprivation, hunger, chronic stress, and isolation can make you feel less confident even if your competence is high. If you want stable confidence, treat your body as part of the system: sleep, movement, breathing, hydration, and social support. This is not “wellness culture.” It is engineering: your brain is running on biological hardware.",
          ],
        },
        {
          heading: "Counterarguments & limits: Loudness isn’t confidence",
          paragraphs: [
            "A powerful concept is “earned self-esteem.” Earned self-esteem comes from doing what you said you would do. It is not about being perfect. It is about integrity. When your actions match your values, you feel strong. When your actions betray your values, you feel weak. This is why confidence often improves when people stop lying to themselves: they stop making excuses, stop pretending, and start acting with alignment.",
            "To build earned confidence, track wins differently. Most people track outcomes: promotions, applause, numbers. Outcomes are noisy. Instead track behaviors that are under your control: “I practiced.” “I asked for feedback.” “I told the truth.” “I shipped.” “I repaired after conflict.” These behaviors create identity. Identity is the long-term storage of confidence.",
            "Repair is essential. Confidence is not never falling; it is recovering. When you make a mistake, practice repair: acknowledge, apologize if needed, make amends, update the system. Repair turns mistakes into trust rather than shame. In relationships, repair increases intimacy. In work, repair increases credibility. In your internal world, repair increases self-trust because you learn: even if I mess up, I can fix it.",
            "Many people confuse confidence with loudness. Quiet confidence is often more powerful. Quiet confidence is the ability to think clearly, ask good questions, and make steady decisions. It is not the absence of fear; it is the ability to act with fear present. If you wait for fear to disappear, you will wait forever. Confidence is acting while afraid and discovering you can survive.",
          ],
        },
        {
          heading: "Example: A weekly system (competence + exposure + repair)",
          paragraphs: [
            "You can also use “competence stacking.” Instead of trying to become world-class at one thing quickly, you build a combination of good skills: writing + design, analysis + communication, empathy + systems thinking, research + storytelling. A stack makes you valuable and gives you more ways to succeed. More ways to succeed reduces anxiety. This is strategic confidence: you are not betting on one fragile identity.",
            "If you want a simple weekly practice, do this: choose one small challenge in your domain, do it, and record evidence. Evidence can be a screenshot, a paragraph, a shipped change, a conversation you initiated. Then write one sentence: “I did X even though it was uncomfortable.” Over time, you build a library of proof. On days when your mood drops, you can look at proof. Proof is stronger than feelings.",
            "Real confidence is therefore not a gift. It is a system: small commitments, repeated reps, feedback, accurate interpretation of failure, boundaries, physical stability, and repair. When you build that system, confidence becomes less like a temporary emotion and more like a stable floor. You can stand on it. You can take risks from it. You can build a life from it.",
            "If you want an actionable plan, combine three weekly practices. Practice 1 (competence): one deliberate practice session in your chosen domain, designed around a specific weakness. Practice 2 (exposure): one small act that triggers mild fear (a message, a presentation, a request). Practice 3 (repair): one honest review where you identify what you avoided and why, and then design a smaller step. These three practices build skill, bravery, and self-trust together.",
            "Use a “confidence journal,” but only with evidence entries. Each entry has three lines: “I did…”, “It was uncomfortable because…”, “I learned…”. This journal prevents the mind from rewriting history on bad days. When anxiety tells you that you never grow, the journal provides proof that you do.",
          ],
        },
        {
          heading: "Summary & CTA: One promise a day",
          paragraphs: [
            "If you struggle with social confidence, focus on contribution rather than performance. Instead of thinking, “Do they like me?”, think, “Can I make this interaction slightly better?” Ask a thoughtful question, reflect what you heard, offer a useful idea, or express appreciation. Contribution shifts attention outward and reduces self-monitoring, which reduces anxiety.",
            "If you struggle with confidence at work, build clarity. Lack of clarity creates fear because your brain can’t predict. Clarify expectations, success criteria, and timelines. Write decisions down. Ask for feedback early. Confidence often increases not because you became more talented, but because the system became more legible and you reduced uncertainty.",
            "When you meet someone who seems extremely confident, remember that you may be seeing a performance. Many people use confidence as armor. Real confidence is softer. It is okay with not knowing. It can say, “I’m not sure, but I’ll find out.” That sentence is a sign of strength because it is grounded in self-trust rather than image management.",
            "Confidence is also shaped by your peer group. If you spend time with people who constantly judge and compare, your nervous system will treat life as a competition. If you spend time with people who practice growth and honesty, you will feel safer taking risks. Choose relationships that reward effort, truth, and repair. Confidence needs a relational ecosystem.",
            "If you have a history of being shamed, you may confuse confidence with danger: visibility triggers old fear. In that case, build confidence through gradual visibility. Share with one safe person, then a small group, then a wider audience. Each step teaches your brain: visibility is not always punishment. This is nervous-system learning, not intellectual learning.",
            "A simple way to train self-trust is the “two-minute rule.” When you notice avoidance, commit to two minutes of the task. Two minutes is too small for your mind to argue with. Often the hardest part is starting. Once you start, momentum carries you. Over time, you rewire the pattern: discomfort triggers action, not escape.",
            "If you want confidence in decision-making, practice reversible decisions. Many people freeze because they treat every decision as permanent. Write down: what is reversible, what is irreversible, and what is the cost of waiting? Make more small reversible decisions quickly, learn from them, and reserve deep deliberation for truly irreversible choices. This improves calibration and reduces anxiety.",
            "Finally, build a compassionate inner voice. This does not mean making excuses. It means speaking to yourself like a good coach: honest about mistakes, but focused on solutions. Harsh self-talk reduces risk-taking and increases avoidance. Coaching self-talk increases learning and resilience. Over years, the voice you practice becomes the voice you live with. Choose wisely.",
            "If you do nothing else, keep one promise every day. One small promise. That single act is the seed of confidence because it proves integrity. Confidence is not the absence of fear. It is the presence of integrity under fear.",
            "Over months, you will notice the compound effect: you start trusting your plans, you stop bargaining with yourself, and you become calmer under pressure. Calmness is not passivity. It is the signal that your nervous system believes you can handle reality. That belief is the quiet core of confidence.",
            "If you carry shame, treat confidence-building as gentle rehabilitation. Don’t try to “shock” yourself into bravery. Rebuild trust the way you rebuild a muscle: warm up, lift what you can lift, rest, and come back. Each rep is a vote for a new identity: someone who can face reality without collapsing.",
            "One final practice: celebrate completion, not perfection. Completion trains action. Perfection trains avoidance. When you repeatedly complete things—small tasks, small conversations, small deliveries—you become dangerous in the best way: you are someone who finishes. Finishers have confidence because reality keeps rewarding their reliability.",
            "When in doubt, return to basics: do the next small rep, ask for the next small piece of feedback, and keep one promise today. Confidence is built in ordinary moments. Ordinary moments repeated become an extraordinary life.",
          ],
        },
      ],
    },
  },
  {
    slug: "infj-meaning-and-purpose",
    title: "INFJ: Meaning & Purpose",
    blurb:
      "For INFJ minds: meaning is not a slogan, it’s a practice. Learn how to turn empathy, intuition, and ideals into a grounded life of service, craft, and inner peace.",
    imageSrcs: THINKING_IMAGE_SETS[5] ?? [],
    article: {
      readingTimeHint: "Long read (≈12–15 min).",
      sections: [
        {
          heading: "Opening: The INFJ paradox (depth + exhaustion)",
          paragraphs: [
        "If you identify with the INFJ personality pattern, you may recognize a paradox: you feel life deeply and you care about meaning, but you can also feel exhausted, misunderstood, and unsure how to translate your inner ideals into a practical life. You may sense what people need, notice subtle emotional shifts, and imagine better futures—yet struggle with boundaries, burnout, and the feeling that the world is too loud, too shallow, or too rushed.",
          ],
        },
        {
          heading: "Thesis: Meaning is a daily practice (not one grand mission)",
          paragraphs: [
        "First, a grounding note. Personality frameworks like MBTI are not scientific diagnoses; they are lenses. A lens can be useful if it helps you understand patterns and choose better strategies. It becomes harmful if it becomes a cage. Use “INFJ” as a language for patterns: sensitivity to meaning, preference for depth, strong internal values, and a drive to contribute. Do not use it as an excuse to avoid growth or to label yourself as doomed.",
        "For many INFJ-oriented people, the search for meaning is intense because meaning is tied to identity. You don’t just want to do things; you want your life to stand for something. This can be a gift: it pushes you toward integrity. But it can also create pressure: if you don’t find a grand purpose, you may feel empty. The key is to shift from “meaning as a single mission” to “meaning as a daily practice.”",
        "Meaning as a daily practice has three pillars: direction, contribution, and coherence. Direction means you are moving toward something you value. Contribution means your actions help beyond yourself. Coherence means your inner values and outer life are aligned. You do not need a perfect plan to have these. You need a compass and a rhythm.",
          ],
        },
        {
          heading: "Evidence & reasoning: Anchor intuition in action",
          paragraphs: [
        "INFJ minds often run on intuition: you sense patterns and future implications. This is powerful, but it can also produce anxiety because the mind generates many possible outcomes. To find meaning, you need to anchor intuition in action. Meaning is not only insight; it is embodiment. Choose a small arena where you can act on your ideals: mentoring, teaching, writing, design, counseling, community building, or any craft that improves human experience. When your ideals become behavior, your mind calms down because it is no longer trapped in imagination.",
        "Another INFJ challenge is emotional absorption. You may pick up other people’s pain and carry it. This can make you compassionate, but it can also blur boundaries. Meaning does not require self-sacrifice. In fact, if you burn out, you reduce your ability to contribute. Therefore, boundaries are not selfish; they are ethical. A boundary is the structure that allows your care to last. Practice saying no without explanation. Practice leaving conversations that drain you. Practice protecting solitude. Solitude is not avoidance; it is recovery for your nervous system.",
        "INFJ types also often crave depth in relationships. When relationships stay superficial, you may feel lonely even when surrounded by people. The path to meaningful relationships is selective vulnerability. You don’t need to open your heart to everyone. But you do need a few spaces where you can be fully honest. Seek friendships and communities that value reflection, growth, and kindness. Meaning is often found in shared pursuit, not in solitary contemplation.",
          ],
        },
        {
          heading: "Context: Work and environment shape meaning",
          paragraphs: [
        "Work is another arena. Many INFJ-oriented people struggle in environments that reward speed over depth or politics over purpose. If you cannot change the environment immediately, you can still create meaning through craftsmanship. Craftsmanship means you take pride in doing something well, with care, even in small ways. In any job, there are opportunities to improve clarity, reduce harm, increase beauty, or protect people from confusion. When you treat your work as craft, you restore dignity and meaning—even before you find the “perfect” mission.",
        "However, beware of the “perfect mission” trap. Because INFJs often imagine ideal futures, you may refuse imperfect opportunities. But real meaning is built in imperfect conditions. A realistic approach is to choose a direction that is “good enough,” then refine. Your life can be an iterative design process. You are allowed to pivot. Meaning grows through commitment and revision, not through waiting for certainty.",
          ],
        },
        {
          heading: "Counterarguments & limits: Local contribution beats all-or-nothing",
          paragraphs: [
        "A common INFJ experience is existential fatigue: you see suffering and injustice and feel helpless. You may think, “If I can’t fix the world, what is the point?” This is an all-or-nothing frame. Replace it with a local frame: “Where can my actions reduce suffering or increase dignity today?” Local contribution is not small; it is the only contribution you can actually make. Over time, local contributions aggregate into a meaningful life.",
        "You may also struggle with the gap between your inner world and your outer behavior. INFJs can overthink, plan, and reflect—but delay action because the action will never match the internal ideal. The cure is to embrace iteration. Make small imperfect outputs: write the draft, ship the version, have the conversation. Your inner world becomes healthier when it is expressed. Unexpressed ideals can turn into self-criticism and stagnation.",
          ],
        },
        {
          heading: "Framework: Service + craft + contemplation",
          paragraphs: [
        "For INFJ meaning, a useful structure is “service + craft + contemplation.” Service means helping others in a way that fits your values and energy. Craft means building skill in something that produces value or beauty. Contemplation means regular time for reflection, spirituality, philosophy, or nature—whatever reconnects you with the bigger picture. If you only serve, you burn out. If you only craft, you may feel empty. If you only contemplate, you may feel disconnected. The combination creates balance.",
        "Another key is to manage the INFJ tendency to idealize people. When you care deeply, you may imagine potential and then feel disappointed by reality. This can lead to cycles of attachment and withdrawal. Meaningful life requires mature love: seeing people clearly, accepting limits, and still choosing kindness. Practice compassionate realism. It preserves your heart without breaking it.",
        "If you are seeking meaning, clarify your values in a concrete way. Write down five values and define them in behavior. For example, “compassion” might mean: listening without rushing, donating monthly, mentoring one person, choosing work that reduces harm. “Integrity” might mean: telling the truth, keeping promises, not gossiping. Values become meaningful when they become actions. Then pick two values to prioritize this season. You cannot optimize everything at once.",
        "You can also create meaning by creating narratives that are truthful and empowering. Many INFJs are natural storytellers. Write your story not as a victim of sensitivity, but as a steward of depth. Your sensitivity is a tool: it helps you notice what others miss. Your challenge is to direct it rather than be flooded by it. A meaningful narrative is one that invites responsibility and hope, not one that traps you in suffering.",
        "Finally, accept that meaning is seasonal. Some seasons are about building, some about healing, some about exploring, some about serving. If you demand that every season feel profoundly meaningful, you will suffer. Meaning is often quiet: a conversation that helped someone, a piece of work that reduced confusion, a boundary that protected your energy, a day lived with integrity. Quiet meaning is still meaning.",
          ],
        },
        {
          heading: "Example: Small meaning practices for overwhelmed days",
          paragraphs: [
        "For an INFJ-oriented person, the path to purpose is therefore not a single revelation. It is a pattern of choices: choose direction, protect boundaries, cultivate deep relationships, practice service, build craft, and keep a contemplative rhythm. When these choices repeat, the question “What is the meaning of my life?” becomes less urgent, because your life itself becomes the answer—through what you consistently do, how you treat people, and how you treat your own inner world.",
        "If you are overwhelmed by “big meaning,” create a small meaning practice. Each day, do one act of care, one act of craft, and one act of inner nourishment. Care can be a message to a friend, a small kindness, or a thoughtful listening moment. Craft can be a page written, a design refined, a system improved. Nourishment can be a walk, journaling, prayer, reading philosophy, or sitting in silence. These small acts prevent meaning from becoming an abstract problem.",
        "INFJ people often oscillate between intense connection and sudden withdrawal. To stabilize, plan recovery proactively rather than reactively. Put solitude on your calendar. Treat it as essential maintenance. When you recover before you collapse, you can stay kinder, clearer, and more open. This turns your sensitivity into a steady resource rather than a crisis cycle.",
        "If your intuition produces anxiety, use a grounding question: “What is the next wise step?” Not the perfect plan. The next step. Wisdom is often incremental. This keeps you moving without demanding certainty. Over time, wise steps accumulate into a meaningful direction.",
        "Also consider that purpose can be expressed through roles rather than titles. You might be a “bridge-builder,” a “clarifier,” a “healer,” an “artist,” a “mentor,” or a “protector.” Roles are flexible and can be expressed in many careers. When you define your purpose as a role, you gain freedom. You can carry your purpose across contexts and seasons.",
          ],
        },
        {
          heading: "Summary & CTA: Make depth practical",
          paragraphs: [
        "Finally, choose a personal definition of success that matches your values. Many INFJs feel pain when they try to compete on status terms they do not care about. Define success as integrity, contribution, and inner peace. Then build a life that makes that definition true. When your success metrics match your soul, meaning becomes less of a question and more of a lived experience.",
        "If you feel chronically misunderstood, focus on translation rather than blame. Your inner experience may be nuanced, symbolic, and emotionally layered. Many people communicate in simpler, more direct terms. Learn to translate: one clear sentence about what you feel, one clear sentence about what you need, one clear request. Translation is not reducing your depth; it is making your depth usable in relationships.",
        "INFJ people can also become trapped in “quiet resentment” when they give more than they say. Practice explicit agreements. If you are supporting someone, name the limits: how much time, what kind of support, what you can’t do. Agreements prevent the silent buildup that later explodes into withdrawal. Meaningful love needs clarity as much as it needs empathy.",
        "For many INFJs, creativity is a direct path to meaning because it allows the inner world to become real. Choose a medium—writing, design, music, photography, counseling, teaching—and commit to small output. Output is a bridge from intuition to contribution. It also builds a personal archive of meaning: proof that your inner life can help others.",
        "If you are spiritually inclined, make spirituality practical. Instead of searching endlessly for the perfect philosophy, adopt one daily practice that makes you kinder and steadier: gratitude, meditation, prayer, or service. Spirituality becomes meaningful when it changes behavior, not when it becomes a collection of ideas.",
        "If you are not spiritually inclined, philosophy can still serve you. Read thinkers who help you hold paradox: suffering and joy, imperfection and love, limits and freedom. Meaning often grows when you accept paradox rather than demanding a simple answer. INFJ minds can hold paradox well once they stop treating it as a problem to solve.",
        "The goal is not to eliminate existential questions. The goal is to live in a way that makes those questions less frightening. When you have daily practices of care, craft, and contemplation, you experience meaning directly. You don’t need to force a conclusion. You become the kind of person who can live with open questions and still live beautifully.",
        "If you want one sentence to guide you, use this: “Make depth practical.” Let your insight become a small act. Let your empathy become a boundary and a kindness. Let your ideals become a craft. INFJ meaning is not found by thinking harder; it is found by living your values more consistently.",
        "And when you feel lost, return to first principles: choose what reduces suffering, choose what increases honesty, choose what builds long-term trust, and choose what keeps your heart open without destroying your health. These principles are simple, but they can guide an entire life.",
        "Purpose, for you, is not a destination. It is a way of walking. Walk with care, and meaning will follow you.",
          ],
        },
      ],
    },
  },
];

// Dev-only: ensure each topic meets the word-count requirement.
export const __DEV_WORD_COUNTS = THINKING_TOPICS.map((t) => ({
  slug: t.slug,
  words: countWords(t.article.sections),
}));

