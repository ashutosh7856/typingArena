// Comprehensive lesson data organized by type and difficulty

export const LESSONS = {
  // Basic letter practice
  letters: {
    beginner: {
      name: "Home Row - Basic",
      level: 1,
      content: "aaa sss ddd fff jjj kkk lll ;;; asdf jkl; asdf jkl; fdsa ;lkj"
    },
    easy: {
      name: "Home Row - Words",
      level: 2,
      content: "add sad lad dad fad gal hall fall lads falls flask glass jars"
    },
    medium: {
      name: "All Letters",
      level: 3,
      content: "the quick brown fox jumps over lazy dogs with extra speed and agility"
    }
  },

  // Word practice by difficulty
  words: {
    beginner: {
      name: "Common Words - Level 1",
      level: 1,
      content: "the and for are but not you all can her was one our out day get has him his how man new now old see two way who boy did its let put say she too use"
    },
    easy: {
      name: "Common Words - Level 2",
      level: 2,
      content: "about after again also always around because become before between both come could every first found give good great hand help here just know last little long make many more most much must never only other over place right should since small still such take than that their them then there these they thing think those through time under very well what when where which while would write years"
    },
    medium: {
      name: "Common Words - Level 3",
      level: 3,
      content: "ability according achieve actually address administration affect afternoon agreement although American analysis animal another anyone anything appear application approach area argue article artist attention available beautiful believe benefit billion budget building business campaign candidate capital career central century certain clearly college common community company computer concern conference Congress consider consumer continue control court create culture current customer daughter decision democratic determine development difference different director discussion economy education effect election environmental especially everything evidence exactly example executive experience explain family federal figure financial foreign former forward friend further general government growth happen health history however identify important improve include increase indeed individual industry information instead international investment involve itself knowledge language lawyer leader learn legal less level likely machine maintain major management material matter maybe measure medical meeting member memory mention message method middle military million minute modern moment money month morning mother movement national nature necessary network never nothing notice number occur offer office official often operation opportunity option organization others outside particular patient pattern people percent performance period person physical picture piece place plan player policy political population position possible power practice prepare present president pressure pretty prevent private probably problem process produce product production professional program property protect provide public purpose quality question quickly rather reach ready reality realize really reason receive recent recognize record reduce reflect region relate relationship religious remain remember report represent require research resource respond response result return reveal right role science second section security sell senior sense series serious serve service several significant similar simply since single social society soldier someone something sometimes source southern speak special specific spend standard state statement station stock stop story strategy strong student study stuff subject success successful suddenly suffer suggest support system table technology television term themselves theory these thing those thought thousand threat throughout today together tonight total toward trade traditional training travel treatment trial true truth turn under understand unit until usually value various victim view violence vote wait wall weapon wear week weight western whether white whole wide wife window without woman wonder word work worker world worry worth would write wrong yard yeah year yes yet young your yourself"
    },
    hard: {
      name: "Advanced Vocabulary",
      level: 4,
      content: "comprehensive development extraordinary infrastructure magnificent neighborhood philosophical psychology questionnaire revolutionary sophisticated technological understanding unprecedented approximately collaboration contemporary determination environmental extraordinary fundamental investigation literature manufacturing mathematical phenomenon possibility pronunciation revolutionary significant systematic temperature theoretical understanding vocabulary"
    }
  },

  // Sentence practice
  sentences: {
    beginner: {
      name: "Simple Sentences",
      level: 1,
      content: "I like to code. She runs fast. They play games. We eat food. You are smart. He writes well. It works fine. Dogs bark loud."
    },
    easy: {
      name: "Basic Sentences",
      level: 2,
      content: "The quick brown fox jumps over the lazy dog. Programming is the art of telling another human what one wants the computer to do. Practice makes perfect and consistency is the key to improvement. Every keystroke brings you closer to mastery."
    },
    medium: {
      name: "Complex Sentences",
      level: 3,
      content: "Learning to type faster not only improves your productivity but also enhances your overall computing experience significantly. Developers who master touch typing find themselves more focused on solving problems rather than looking at their keyboards constantly. The journey to become a proficient typist requires dedication, regular practice, and patience throughout the learning process."
    },
    hard: {
      name: "Professional Text",
      level: 4,
      content: "Asynchronous JavaScript and XML is a sophisticated technique for creating better, faster, and more interactive web applications with seamless user experiences. Modern software development practices emphasize the importance of clean code, comprehensive testing, continuous integration, and collaborative workflows. Understanding algorithmic complexity and data structures is fundamental to writing efficient, scalable, and maintainable code in production environments."
    }
  },

  // Paragraph practice
  paragraphs:{
    easy: {
      name: "Short Paragraph",
      level: 2,
      content: "Typing is an essential skill in our digital age. Whether you are writing emails, coding programs, or chatting with friends, the ability to type quickly and accurately makes everything easier. With regular practice, anyone can improve their typing speed and become more productive in their daily computer tasks."
    },
    medium: {
      name: "Technical Paragraph",
      level: 3,
      content: "Software development is a complex and rewarding field that combines creativity with logical thinking. Developers must understand programming languages, design patterns, and software architecture to build robust applications. The modern development landscape includes tools like version control systems, continuous integration pipelines, and cloud deployment platforms that streamline the development process and enable teams to collaborate effectively."
    },
    hard: {
      name: "Advanced Paragraph",
      level: 4,
      content: "The evolution of computer science has fundamentally transformed how we interact with technology and process information in contemporary society. From the inception of basic computational machines to the sophisticated artificial intelligence systems we see today, the journey represents countless innovations and breakthrough discoveries. Modern computing encompasses diverse domains including machine learning, distributed systems, cybersecurity, and quantum computing, each presenting unique challenges and opportunities for advancement. Understanding these concepts requires dedication, continuous learning, and practical application of theoretical knowledge in real-world scenarios."
    }
  },

  // Programming practice
  code: {
    easy: {
      name: "Basic Code Syntax",
      level: 2,
      content: "function add(a, b) { return a + b; } const result = add(5, 3); console.log(result);"
    },
    medium: {
      name: "Code Patterns",
      level: 3,
      content: "const fetchData = async () => { try { const response = await fetch(url); const data = await response.json(); return data; } catch (error) { console.error(error); } };"
    },
    hard: {
      name: "Complex Code",
      level: 4,
      content: "class DataProcessor { constructor(config) { this.config = config; this.cache = new Map(); } async process(input) { if (this.cache.has(input)) return this.cache.get(input); const result = await this.transform(input); this.cache.set(input, result); return result; } transform(data) { return data.map(item => ({ ...item, processed: true })); } }"
    }
  },

  // Numbers and symbols
  numbers: {
    easy: {
      name: "Basic Numbers",
      level: 2,
      content: "123 456 789 012 345 678 901 234 567 890 111 222 333 444 555 666 777 888 999 000"
    },
    medium: {
      name: "Numbers with Symbols",
      level: 3,
      content: "Price: $19.99, Discount: 25%, Total: $14.99 | Items: 3 + 2 = 5 | Time: 10:30 AM | Email: user@domain.com"
    },
    hard: {
      name: "Mixed Symbols",
      level: 4,
      content: "let value = (10 * 5) + (20 / 4) - 3; if (value >= 50 && value <= 100) { return true; } const regex = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;"
    }
  }
};

// Get all lessons as a flat array with metadata
export const getAllLessons = () => {
  const lessons = [];
  Object.entries(LESSONS).forEach(([category, levels]) => {
    Object.entries(levels).forEach(([difficulty, lesson]) => {
      lessons.push({
        id: `${category}-${difficulty}`,
        category,
        difficulty,
        ...lesson
      });
    });
  });
  return lessons;
};

// Get lessons by category
export const getLessonsByCategory = (category) => {
  return LESSONS[category] || {};
};

// Get lesson by ID
export const getLessonById = (id) => {
  const [category, difficulty] = id.split('-');
  return LESSONS[category]?.[difficulty];
};
