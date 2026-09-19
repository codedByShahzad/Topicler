import blog1 from "@/src/images/blog-1.png";
import type { StaticImageData } from "next/image";

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export type BlogSection = {
  id: string;
  title: string;
  content: BlogBlock[];
};

export type BlogPost = {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string | StaticImageData;
  category: string;
  publishDate: string;
  readingTime: string;
  guideLabel: string;
  guideValue: string;
  sections: BlogSection[];
  relatedSlugs: string[];

  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  ogImage?: string | StaticImageData;
  publishISO?: string;
  canonicalPath?: string;
};

export const BLOGS: BlogPost[] = [
  // =========================================================
  // 1) AI IN HEALTHCARE
  // =========================================================
{
  slug: "how-to-come-up-with-blog-topics",
  title: "How to Come Up With Blog Topics When You Have No Ideas",
  subtitle:
    "Practical ways to find fresh blog topics, overcome writer's block, and turn one idea into a finished article.",
  heroImage:blog1,
  category: "Topic Ideas",
  publishDate: "September 18, 2026",
  publishISO: "2026-09-18T00:00:00.000Z",
  readingTime: "8 min",
  guideLabel: "This guide",
  guideValue: "Practical strategies + real examples",
  canonicalPath: "/blog/how-to-come-up-with-blog-topics",
  seoTitle: "How to Come Up With Blog Topics When You Have No Ideas",
  seoDescription:
    "Stuck for blog post ideas? Here are eight practical ways to come up with blog topics, a five-question test for picking one, and a fast outline process.",
  keywords: [
    "how to come up with blog topics",
    "blog topic ideas",
    "blog post ideas",
    "what to write about",
    "writer's block",
    "content ideas",
    "brainstorming blog topics",
    "keyword research for blog topics",
    "audience questions",
    "trending topics",
    "competitor research",
    "random topic generator",
  ],
  ogImage: blog1,
  sections: [
    {
      id: "introduction",
      title: "Introduction",
      content: [
        {
          type: "p",
          text: "Plenty of writers spend more time picking a topic than writing the post itself. The document sits open, the cursor blinks, and nothing on the list feels worth two hours of work.",
        },
        {
          type: "p",
          text: "That problem has less to do with creativity than most people assume. Ideas rarely arrive because you sat still and waited for them. They show up when you go looking in the right places. Reader questions, search data, old posts, and this week's conversations all hold them.",
        },
        {
          type: "p",
          text: "Below are eight ways to find blog topics, a quick test for deciding which ones deserve your time, and a process for turning the winner into a finished outline.",
        },
      ],
    },
    {
      id: "why-your-brain-goes-blank",
      title: "Why your brain goes blank when you sit down to write",
      content: [
        {
          type: "p",
          text: "Your brain handles two jobs badly at the same time. Choosing an idea and judging it are separate tasks, and doing both at once stalls you. You think of \"productivity tips,\" then reject it before the thought finishes forming.",
        },
        {
          type: "p",
          text: "A blank page makes this worse by offering too much freedom. Anything is possible, so nothing feels obviously right. Writers who work from a prompt or a question move faster, because the choice is already narrowed for them.",
        },
        {
          type: "p",
          text: "Repetition fear plays a part too. You assume every good angle has been taken, so you dismiss ideas that are actually fine. Somebody has written about morning routines before. Nobody has written about yours, with your numbers and your mistakes.",
        },
      ],
    },
    {
      id: "start-with-reader-questions",
      title: "Start with the questions your readers already ask",
      content: [
        {
          type: "p",
          text: "Your inbox already holds a month of blog topics. Every question a reader sends you is a post that somebody wanted badly enough to type out.",
        },
        {
          type: "p",
          text: "Go through comments, DMs, replies to your newsletter, and messages from clients. Reader threads in subreddits and Facebook groups hold the same kind of material. Under any Google search in your niche, the \"People also ask\" box lists real phrasings people use. Students can pull from whatever their classmates keep asking before an exam.",
        },
        {
          type: "p",
          text: "Keep the question in the reader's own words when you turn it into a title. Somebody asking \"how long until I see results from lifting\" has handed you the exact phrasing. \"Realistic Timeline for Strength Results\" sounds more polished and gets far fewer clicks.",
        },
        {
          type: "p",
          text: "One question, one post. Splitting a question into two posts usually means you had two questions.",
        },
      ],
    },
    {
      id: "turn-one-topic-into-ten",
      title: "Turn one big topic into ten smaller ones",
      content: [
        {
          type: "p",
          text: "Most writers treat a subject as one post when it holds ten. Take meal prep as an example. On its own it's too big to write well, and too broad to rank for.",
        },
        {
          type: "p",
          text: "Slice it by reader, budget, time, mistake, and format instead. Here is the same subject turned into separate posts.",
        },
        {
          type: "ul",
          items: [
            "Meal prep for people who hate cooking",
            "A week of lunches under $30",
            "Meal prep in 45 minutes on a Sunday",
            "Five containers that stopped my food going soggy",
            "Why your meal prep tastes worse by Wednesday",
            "Meal prep for people working night shifts",
            "Freezer prep versus fridge prep",
            "What I got wrong in my first month of meal prep",
          ],
        },
        {
          type: "p",
          text: "Each one speaks to somebody specific and answers a question the broad version couldn't. The narrow version is easier to write as well, since you already know who's reading.",
        },
      ],
    },
    {
      id: "let-search-data-show-you",
      title: "Let search data show you what people want",
      content: [
        {
          type: "p",
          text: "Search data tells you what people type when nobody is watching. That makes it a better source of blog post ideas than your own guesses.",
        },
        {
          type: "p",
          text: "Start with one seed word from your niche and type it into Google. Autocomplete finishes the phrase the way people commonly search it. Related searches at the bottom of the results page usually add another handful.",
        },
        {
          type: "p",
          text: "Longer phrases beat short ones for newer blogs. \"Email newsletter\" is a wall of competition. \"How often should you send an email newsletter\" is a question you can answer in 1,200 words and genuinely rank for.",
        },
        {
          type: "p",
          text: "Google Search Console is worth checking if your site has some traffic already. Sort by impressions and find the queries where you sit on page two. Those pages already match a search, so a dedicated post on the exact question often climbs quickly.",
        },
      ],
    },
    {
      id: "read-competitors",
      title: "Read what competitors wrote, then write what they missed",
      content: [
        {
          type: "p",
          text: "Open the top five results for a topic you're considering and read them properly. List the H2s from each one on a single page. Gaps show up fast once the headings sit side by side.",
        },
        {
          type: "p",
          text: "Comments under those posts are the better find. Readers say what the article missed, and they say it in plain language you can lift straight into a heading.",
        },
        {
          type: "p",
          text: "Change one variable instead of copying the angle. If every ranking post covers budgeting for families, write the version for freelancers with irregular income. If they all stop at setup, cover what breaks in month three.",
        },
        {
          type: "p",
          text: "A post that repeats the top result has no reason to exist. A post that answers the question those results left open does.",
        },
      ],
    },
    {
      id: "follow-industry-trends",
      title: "Follow what your industry is talking about this week",
      content: [
        {
          type: "p",
          text: "Timely posts pick up traffic before competitors have written anything. A pricing change at a popular tool, a platform update, or an argument running through your field all work as prompts.",
        },
        {
          type: "p",
          text: "Check Google Trends for rising searches in your subject. Skim the top posts of the week in your main subreddit. Industry newsletters usually flag a story before it spreads widely.",
        },
        {
          type: "p",
          text: "Tie the news to something lasting so the post keeps earning after the moment passes. \"What the new pricing means for small teams\" ages better as \"How to budget for tools when prices keep changing,\" with the news as your opening example.",
        },
        {
          type: "p",
          text: "Trending topics work as a portion of your calendar, not the whole thing. Chasing every story leaves you with an archive nobody reads six months later.",
        },
      ],
    },
    {
      id: "random-topic-generator",
      title: "Use a random topic generator when nothing is moving",
      content: [
        {
          type: "p",
          text: "Sometimes all of that still leaves you staring at a blank document. Reacting to an idea is easier than producing one from nothing, and a random topic generator gives you something to react to.",
        },
        {
          type: "p",
          text: "The tool does one job well. It hands you a topic you didn't think of, which breaks the loop of rejecting your own half-formed ideas. You'll know within a second or two whether a suggestion is worth keeping.",
        },
        {
          type: "p",
          text: "Generate around ten and keep the three that make you feel something, even mild irritation. Reshape each one for your readers after that. A broad suggestion like \"productivity habits\" becomes \"The two productivity habits that survived my first year of freelancing.\"",
        },
        {
          type: "p",
          text: "Be clear about what the generator won't do. It doesn't know your audience, your search data, or what you published last month. The judgment stays yours and the research still has to happen. What it removes is the hardest part, which is starting from nothing.",
        },
      ],
    },
    {
      id: "five-questions",
      title: "Five questions that tell you if a topic is worth writing",
      content: [
        {
          type: "p",
          text: "A topic that feels exciting on Monday can waste your whole Tuesday. Run each idea through five quick questions before you open a document ?",
        },
        {
          type: "p",
          text: "1. Can you name the one person reading it? \"Bloggers\" is not a person. \"A blogger with 40 posts and no traffic\" is ?",
        },
        {
          type: "p",
          text: "2. Can you say the answer in a single sentence? If the answer needs a paragraph, the topic is really three topics wearing one title ?",
        },
        {
          type: "p",
          text: "3. Do you have something specific to add, like a number, a screenshot, a mistake, or a client story? Without that, you're rewriting what already ranks ?",
        },
        {
          type: "p",
          text: "4. Is anyone actually searching for this or asking about it? A clever angle nobody wants is still a clever angle nobody wants ?",
        },
        {
          type: "p",
          text: "5. Does it connect to what you sell, teach, or want to be known for? Traffic that never turns into anything gets tiring to produce ?",
        },
        {
          type: "p",
          text: "Three yeses and the topic is worth writing. Fewer than three and it goes back on the list for later.",
        },
      ],
    },
    {
      id: "turn-topic-into-outline",
      title: "Turn the topic into an outline before you write a word",
      content: [
        {
          type: "p",
          text: "An outline turns a topic into a post you can actually finish. Ten minutes here saves an hour of rewriting later.",
        },
        {
          type: "p",
          text: "Write the promise first, in one sentence, as a reader would hear it. Something like \"By the end, you'll have ten topics and a way to choose between them.\"",
        },
        {
          type: "p",
          text: "List every question a reader will ask on the way to that promise. Put them in the order somebody would naturally ask them. Those questions become your H2s with almost no editing.",
        },
        {
          type: "p",
          text: "Under each heading, note one specific thing you'll include. An example, a number, a step, or a short story all count. A heading with nothing underneath it is where drafts stall.",
        },
        {
          type: "p",
          text: "Save the introduction for last. Once the body exists, you know exactly what you're introducing, and the opening takes five minutes instead of forty.",
        },
      ],
    },
    {
      id: "keep-running-list",
      title: "Keep a running list so you never start from zero",
      content: [
        {
          type: "p",
          text: "Ideas arrive when you're driving, not when you're sitting at your desk. Catch them in one place on your phone so they survive the afternoon.",
        },
        {
          type: "p",
          text: "Spend fifteen minutes each week topping the list up. Pull from your inbox, your comments, a quick search, and a few generated suggestions. Mark each idea as raw, outlined, or written so you can see what's ready to go.",
        },
        {
          type: "p",
          text: "Aim to keep at least ten ideas in reserve. Writing the last idea on your list puts you back at the blank page next week.",
        },
      ],
    },
    {
      id: "what-to-do-next",
      title: "What to do next",
      content: [
        {
          type: "p",
          text: "Blog topics come from places, not from waiting. Reader questions, search data, competitor gaps, this week's news, and a generator when you're stuck all point somewhere real.",
        },
        {
          type: "p",
          text: "Here's a next step you can take in the next twenty minutes. Open a blank document and write down ten questions your readers have asked you recently. Generate five more topics to push past your usual thinking. Run all fifteen through the five questions above, keep the ones that score three or higher, and outline the strongest one today.",
        },
        {
          type: "p",
          text: "You'll have a post to write tomorrow and a list waiting for the week after.",
        },
      ],
    },
  ],
  relatedSlugs: [
    "how-to-build-a-blog-content-calendar",
    "turn-one-blog-post-into-five-pieces-of-content",
    "how-to-find-long-tail-keywords",
  ],
},



];

export function getBlogBySlug(slug: string) {
  return BLOGS.find((b) => b.slug === slug) || null;
}

export function getRelatedBlogs(slugs: string[]) {
  const set = new Set(slugs);
  return BLOGS.filter((b) => set.has(b.slug));
}

