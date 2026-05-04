for (let i = 0; i < 50; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = Math.random() * 100 + 'vw';
      star.style.top = Math.random() * 100 + 'vh';
      star.style.animationDelay = Math.random() * 3 + 's';
      star.style.opacity = Math.random() * 0.7 + 0.3;
      document.body.appendChild(star);
    }

  window.addEventListener('load', function() {
    setTimeout(function() {
      const loader = document.getElementById('loader');
      loader.classList.add('loader-hidden');
      setTimeout(function() {
        loader.style.display = 'none';
      }, 500);
    }, 3000);
  });

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingElement = document.getElementById('typing-text');

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 80 : 120;

    if (!isDeleting && charIndex === currentText.length) {
      speed = 1500;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      speed = 400;
    }

    setTimeout(type, speed);
  }

  const jarvisForm = document.getElementById('jarvis-form');
  const jarvisInput = document.getElementById('jarvis-input');
  const jarvisChat = document.getElementById('jarvis-chat');
  const jarvisVoiceButton = document.getElementById('jarvis-voice');
  const jarvisQuickButtons = document.querySelectorAll('[data-jarvis-question]');
  const jarvisLanguageButtons = document.querySelectorAll('[data-jarvis-language]');
 let jarvisVoiceEnabled = true;
 let jarvisVoiceUnlocked = false;
 let jarvisVoices = [];
 let jarvisLanguage = 'en';
 let jarvisWikipediaLanguage = 'en';

  const jarvisLanguageSettings = {
    en: {
      name: 'English',
      wikipedia: 'en',
      locale: 'en-US',
      voices: ['en-US', 'en-IN', 'en-GB', 'en'],
      greeting: "English selected. Hello! Welcome to Abdur's AI Assistant. How can I assist you today?",
      thinking: 'Searching smart sources...',
      fallback: 'The answer is undefined.',
      wikiEmpty: 'Sir, I found the topic on Wikipedia, but there is no short summary available.',
      wikiError: 'Sir, I cannot connect to Wikipedia right now. Please check your internet connection and try again.',
      identifyError: 'Sir, I could not identify that country clearly.',
      leaderMissing: function(roleName, countryName) {
        return 'Sir, I could not find the current ' + roleName + ' of ' + countryName + '.';
      },
      identity: 'I am JARVIS, today your personal AI assistant. Created by Abdur, He is a developer, AI enthusiast, and programmer. How can I assist you today sir?',
      morning: "Good morning! Welcome to Abdur's AI Assistant. How can I assist you today?",
      afternoon: "Good afternoon! Welcome to Abdur's AI Assistant. How can I assist you today?",
      evening: "Good evening! Welcome to Abdur's AI Assistant. How can I assist you today?",
      night: 'Good night sir! Bye, see you tomorrow.',
      hello: "Hello! Welcome to Abdur's AI Assistant. How can I assist you today?",
      ready: "Yes Boss, I'm here. How can I assist you today?",
      datePrefix: 'The current date is ',
      timePrefix: 'The current time is ',
      answerPrefix: 'The answer is ',
      divideByZero: 'The answer is undefined (division by zero).',
      abdur: 'Abdur is a student, beginner web developer, AI enthusiast, and programmer-who builds real-world projects. And he created me, too.',
      leaderReply: function(roleName, countryName, personName, details) {
        return 'The current ' + roleName + ' of ' + countryName + ' is ' + personName + '. ' + details;
      }
    },
    bn: {
      name: 'Bengali',
      wikipedia: 'bn',
      locale: 'bn-IN',
      voices: ['bn-IN', 'bn-BD', 'bn'],
      greeting: '\u09ac\u09be\u0982\u09b2\u09be \u09a8\u09bf\u09b0\u09cd\u09ac\u09be\u099a\u09a8 \u0995\u09b0\u09be \u09b9\u09df\u09c7\u099b\u09c7\u0964 \u09b9\u09cd\u09af\u09be\u09b2\u09cb! \u0986\u09ae\u09bf JARVIS\u0964 \u0986\u09ae\u09bf \u0995\u09c0\u09ad\u09be\u09ac\u09c7 \u0986\u09aa\u09a8\u09be\u0995\u09c7 \u09b8\u09be\u09b9\u09be\u09af\u09cd\u09af \u0995\u09b0\u09a4\u09c7 \u09aa\u09be\u09b0\u09bf?',
      thinking: '\u09b8\u09cd\u09ae\u09be\u09b0\u09cd\u099f \u09b8\u09cb\u09b0\u09cd\u09b8\u09c7 \u0996\u09cb\u0981\u099c\u09be \u09b9\u099a\u09cd\u099b\u09c7...',
      fallback: '\u0989\u09a4\u09cd\u09a4\u09b0\u099f\u09bf \u09aa\u09be\u0993\u09df\u09be \u09af\u09be\u09df\u09a8\u09bf\u0964',
      wikiEmpty: '\u09b8\u09cd\u09af\u09be\u09b0, \u09ac\u09bf\u09b7\u09df\u099f\u09bf Wikipedia-\u09a4\u09c7 \u09aa\u09c7\u09df\u09c7\u099b\u09bf, \u0995\u09bf\u09a8\u09cd\u09a4\u09c1 \u099b\u09cb\u099f \u09b8\u09be\u09b0\u09be\u0982\u09b6 \u09aa\u09be\u0993\u09df\u09be \u09af\u09be\u09df\u09a8\u09bf\u0964',
      wikiError: '\u09b8\u09cd\u09af\u09be\u09b0, \u0986\u09ae\u09bf \u098f\u0996\u09a8 Wikipedia-\u09a4\u09c7 \u09b8\u0982\u09af\u09cb\u0997 \u0995\u09b0\u09a4\u09c7 \u09aa\u09be\u09b0\u099b\u09bf \u09a8\u09be\u0964 \u09a6\u09df\u09be \u0995\u09b0\u09c7 \u0987\u09a8\u09cd\u099f\u09be\u09b0\u09a8\u09c7\u099f \u099a\u09c7\u0995 \u0995\u09b0\u09c7 \u0986\u09ac\u09be\u09b0 \u099a\u09c7\u09b7\u09cd\u099f\u09be \u0995\u09b0\u09c1\u09a8\u0964',
      identifyError: '\u09b8\u09cd\u09af\u09be\u09b0, \u09a6\u09c7\u09b6 \u09ac\u09be \u09b0\u09be\u099c\u09cd\u09af\u099f\u09bf \u09aa\u09b0\u09bf\u09b7\u09cd\u0995\u09be\u09b0\u09ad\u09be\u09ac\u09c7 \u09ac\u09c1\u099d\u09a4\u09c7 \u09aa\u09be\u09b0\u09bf\u09a8\u09bf\u0964',
      leaderMissing: function(roleName, countryName) {
        return '\u09b8\u09cd\u09af\u09be\u09b0, ' + countryName + '-\u098f\u09b0 \u09ac\u09b0\u09cd\u09a4\u09ae\u09be\u09a8 ' + roleName + ' \u0996\u09c1\u0981\u099c\u09c7 \u09aa\u09be\u0987\u09a8\u09bf\u0964';
      },
      identity: '\u0986\u09ae\u09bf JARVIS, \u0986\u099c\u0995\u09c7 \u0986\u09aa\u09a8\u09be\u09b0 \u09ac\u09cd\u09af\u0995\u09cd\u09a4\u09bf\u0997\u09a4 AI assistant\u0964 \u0986\u09ae\u09be\u0995\u09c7 Abdur \u09a4\u09c8\u09b0\u09bf \u0995\u09b0\u09c7\u099b\u09c7\u0964 \u0986\u09ae\u09bf \u0995\u09c0\u09ad\u09be\u09ac\u09c7 \u0986\u09aa\u09a8\u09be\u0995\u09c7 \u09b8\u09be\u09b9\u09be\u09af\u09cd\u09af \u0995\u09b0\u09a4\u09c7 \u09aa\u09be\u09b0\u09bf \u09b8\u09cd\u09af\u09be\u09b0?',
      morning: '\u09b8\u09c1\u09aa\u09cd\u09b0\u09ad\u09be\u09a4! \u0986\u09ae\u09bf \u0995\u09c0\u09ad\u09be\u09ac\u09c7 \u0986\u09aa\u09a8\u09be\u0995\u09c7 \u09b8\u09be\u09b9\u09be\u09af\u09cd\u09af \u0995\u09b0\u09a4\u09c7 \u09aa\u09be\u09b0\u09bf?',
      afternoon: '\u09b6\u09c1\u09ad \u09a6\u09c1\u09aa\u09c1\u09b0! \u0986\u09ae\u09bf \u0995\u09c0\u09ad\u09be\u09ac\u09c7 \u0986\u09aa\u09a8\u09be\u0995\u09c7 \u09b8\u09be\u09b9\u09be\u09af\u09cd\u09af \u0995\u09b0\u09a4\u09c7 \u09aa\u09be\u09b0\u09bf?',
      evening: '\u09b6\u09c1\u09ad \u09b8\u09a8\u09cd\u09a7\u09cd\u09af\u09be! \u0986\u09ae\u09bf \u0995\u09c0\u09ad\u09be\u09ac\u09c7 \u0986\u09aa\u09a8\u09be\u0995\u09c7 \u09b8\u09be\u09b9\u09be\u09af\u09cd\u09af \u0995\u09b0\u09a4\u09c7 \u09aa\u09be\u09b0\u09bf?',
      night: '\u09b6\u09c1\u09ad \u09b0\u09be\u09a4\u09cd\u09b0\u09bf \u09b8\u09cd\u09af\u09be\u09b0! \u09ac\u09be\u0987, \u0995\u09be\u09b2 \u0986\u09ac\u09be\u09b0 \u09a6\u09c7\u0996\u09be \u09b9\u09ac\u09c7\u0964',
      hello: '\u09b9\u09cd\u09af\u09be\u09b2\u09cb! Abdur-\u098f\u09b0 AI Assistant-\u098f \u09b8\u09cd\u09ac\u09be\u0997\u09a4\u09ae\u0964 \u0986\u09ae\u09bf \u0995\u09c0\u09ad\u09be\u09ac\u09c7 \u0986\u09aa\u09a8\u09be\u0995\u09c7 \u09b8\u09be\u09b9\u09be\u09af\u09cd\u09af \u0995\u09b0\u09a4\u09c7 \u09aa\u09be\u09b0\u09bf?',
      ready: '\u099c\u09bf Boss, \u0986\u09ae\u09bf \u0986\u099b\u09bf\u0964 \u0995\u09c0\u09ad\u09be\u09ac\u09c7 \u09b8\u09be\u09b9\u09be\u09af\u09cd\u09af \u0995\u09b0\u09ac?',
      datePrefix: '\u0986\u099c\u0995\u09c7\u09b0 \u09a4\u09be\u09b0\u09bf\u0996 ',
      timePrefix: '\u098f\u0996\u09a8 \u09b8\u09ae\u09df ',
      answerPrefix: '\u0989\u09a4\u09cd\u09a4\u09b0 \u09b9\u09b2\u09cb ',
      divideByZero: '\u0989\u09a4\u09cd\u09a4\u09b0\u099f\u09bf \u0985\u09a8\u09bf\u09b0\u09cd\u09a7\u09be\u09b0\u09bf\u09a4, \u0995\u09be\u09b0\u09a3 \u09b6\u09c2\u09a8\u09cd\u09af \u09a6\u09bf\u09df\u09c7 \u09ad\u09be\u0997 \u0995\u09b0\u09be \u09af\u09be\u09df \u09a8\u09be\u0964',
      abdur: 'Abdur \u098f\u0995\u099c\u09a8 student, beginner web developer, AI enthusiast \u098f\u09ac\u0982 programmer\u0964 \u09b8\u09c7 real-world projects \u09ac\u09be\u09a8\u09be\u09df, \u0986\u09b0 \u09b8\u09c7-\u0987 \u0986\u09ae\u09be\u0995\u09c7 \u09a4\u09c8\u09b0\u09bf \u0995\u09b0\u09c7\u099b\u09c7\u0964',
      leaderReply: function(roleName, countryName, personName, details) {
        return countryName + '-\u098f\u09b0 \u09ac\u09b0\u09cd\u09a4\u09ae\u09be\u09a8 ' + roleName + ' \u09b9\u09b2\u09c7\u09a8 ' + personName + '\u0964 ' + details;
      }
    },
    hi: {
      name: 'Hindi',
      wikipedia: 'hi',
      locale: 'hi-IN',
      voices: ['hi-IN', 'hi'],
      greeting: '\u0939\u093f\u0902\u0926\u0940 \u091a\u0941\u0928\u0940 \u0917\u0908 \u0939\u0948\u0964 \u0928\u092e\u0938\u094d\u0924\u0947! \u092e\u0948\u0902 JARVIS \u0939\u0942\u0902\u0964 \u092e\u0948\u0902 \u0906\u092a\u0915\u0940 \u0915\u0948\u0938\u0947 \u092e\u0926\u0926 \u0915\u0930 \u0938\u0915\u0924\u093e \u0939\u0942\u0902?',
      thinking: '\u0938\u094d\u092e\u093e\u0930\u094d\u091f \u0938\u094d\u0930\u094b\u0924\u094b\u0902 \u092e\u0947\u0902 \u0916\u094b\u091c \u0930\u0939\u093e \u0939\u0942\u0902...',
      fallback: '\u0909\u0924\u094d\u0924\u0930 \u0928\u0939\u0940\u0902 \u092e\u093f\u0932\u093e\u0964',
      wikiEmpty: '\u0938\u0930, \u092e\u0941\u091d\u0947 \u092f\u0939 \u0935\u093f\u0937\u092f Wikipedia \u092a\u0930 \u092e\u093f\u0932\u093e, \u0932\u0947\u0915\u093f\u0928 \u091b\u094b\u091f\u093e \u0938\u093e\u0930\u093e\u0902\u0936 \u0909\u092a\u0932\u092c\u094d\u0927 \u0928\u0939\u0940\u0902 \u0939\u0948\u0964',
      wikiError: '\u0938\u0930, \u092e\u0948\u0902 \u0905\u092d\u0940 Wikipedia \u0938\u0947 \u0915\u0928\u0947\u0915\u094d\u091f \u0928\u0939\u0940\u0902 \u0915\u0930 \u092a\u093e \u0930\u0939\u093e \u0939\u0942\u0902\u0964 \u0915\u0943\u092a\u092f\u093e \u0907\u0902\u091f\u0930\u0928\u0947\u091f \u091a\u0947\u0915 \u0915\u0930\u0915\u0947 \u092b\u093f\u0930 \u0915\u094b\u0936\u093f\u0936 \u0915\u0930\u0947\u0902\u0964',
      identifyError: '\u0938\u0930, \u092e\u0948\u0902 \u0909\u0938 \u0926\u0947\u0936 \u092f\u093e \u0930\u093e\u091c\u094d\u092f \u0915\u094b \u0938\u093e\u092b-\u0938\u093e\u092b \u092a\u0939\u091a\u093e\u0928 \u0928\u0939\u0940\u0902 \u092a\u093e\u092f\u093e\u0964',
      leaderMissing: function(roleName, countryName) {
        return '\u0938\u0930, \u092e\u0941\u091d\u0947 ' + countryName + ' \u0915\u0947 \u0935\u0930\u094d\u0924\u092e\u093e\u0928 ' + roleName + ' \u0928\u0939\u0940\u0902 \u092e\u093f\u0932\u0947\u0964';
      },
      identity: '\u0906\u091c \u092e\u0948\u0902 JARVIS \u0939\u0942\u0902, \u0906\u092a\u0915\u093e personal AI assistant\u0964 \u092e\u0941\u091d\u0947 Abdur \u0928\u0947 \u092c\u0928\u093e\u092f\u093e \u0939\u0948\u0964 \u092e\u0948\u0902 \u0906\u092a\u0915\u0940 \u0915\u0948\u0938\u0947 \u092e\u0926\u0926 \u0915\u0930 \u0938\u0915\u0924\u093e \u0939\u0942\u0902 \u0938\u0930?',
      morning: '\u0938\u0941\u092a\u094d\u0930\u092d\u093e\u0924! \u092e\u0948\u0902 \u0906\u092a\u0915\u0940 \u0915\u0948\u0938\u0947 \u092e\u0926\u0926 \u0915\u0930 \u0938\u0915\u0924\u093e \u0939\u0942\u0902?',
      afternoon: '\u0928\u092e\u0938\u094d\u0915\u093e\u0930! \u092e\u0948\u0902 \u0906\u092a\u0915\u0940 \u0915\u0948\u0938\u0947 \u092e\u0926\u0926 \u0915\u0930 \u0938\u0915\u0924\u093e \u0939\u0942\u0902?',
      evening: '\u0936\u0941\u092d \u0938\u0902\u0927\u094d\u092f\u093e! \u092e\u0948\u0902 \u0906\u092a\u0915\u0940 \u0915\u0948\u0938\u0947 \u092e\u0926\u0926 \u0915\u0930 \u0938\u0915\u0924\u093e \u0939\u0942\u0902?',
      night: '\u0936\u0941\u092d \u0930\u093e\u0924\u094d\u0930\u093f \u0938\u0930! \u092c\u093e\u092f, \u0915\u0932 \u092e\u093f\u0932\u0924\u0947 \u0939\u0948\u0902\u0964',
      hello: '\u0928\u092e\u0938\u094d\u0924\u0947! Abdur \u0915\u0947 AI Assistant \u092e\u0947\u0902 \u0906\u092a\u0915\u093e \u0938\u094d\u0935\u093e\u0917\u0924 \u0939\u0948\u0964 \u092e\u0948\u0902 \u0906\u092a\u0915\u0940 \u0915\u0948\u0938\u0947 \u092e\u0926\u0926 \u0915\u0930 \u0938\u0915\u0924\u093e \u0939\u0942\u0902?',
      ready: '\u091c\u0940 Boss, \u092e\u0948\u0902 \u092f\u0939\u093e\u0902 \u0939\u0942\u0902\u0964 \u0915\u0948\u0938\u0947 \u092e\u0926\u0926 \u0915\u0930\u0942\u0902?',
      datePrefix: '\u0906\u091c \u0915\u0940 \u0924\u093e\u0930\u0940\u0916 \u0939\u0948 ',
      timePrefix: '\u0905\u092d\u0940 \u0938\u092e\u092f \u0939\u0948 ',
      answerPrefix: '\u0909\u0924\u094d\u0924\u0930 \u0939\u0948 ',
      divideByZero: '\u0909\u0924\u094d\u0924\u0930 undefined \u0939\u0948, \u0915\u094d\u092f\u094b\u0902\u0915\u093f \u0936\u0942\u0928\u094d\u092f \u0938\u0947 \u092d\u093e\u0917 \u0928\u0939\u0940\u0902 \u0915\u093f\u092f\u093e \u091c\u093e \u0938\u0915\u0924\u093e\u0964',
      abdur: 'Abdur \u090f\u0915 student, beginner web developer, AI enthusiast \u0914\u0930 programmer \u0939\u0948\u0964 \u0935\u0939 real-world projects \u092c\u0928\u093e\u0924\u093e \u0939\u0948, \u0914\u0930 \u0909\u0938\u0940 \u0928\u0947 \u092e\u0941\u091d\u0947 \u092c\u0928\u093e\u092f\u093e \u0939\u0948\u0964',
      leaderReply: function(roleName, countryName, personName, details) {
        return countryName + ' \u0915\u0947 \u0935\u0930\u094d\u0924\u092e\u093e\u0928 ' + roleName + ' ' + personName + ' \u0939\u0948\u0902\u0964 ' + details;
      }
    }
  };

  const jarvisRoleNames = {
    en: {
      primeMinister: 'prime minister',
      chiefMinister: 'chief minister',
      president: 'president'
    },
    bn: {
      primeMinister: '\u09aa\u09cd\u09b0\u09a7\u09be\u09a8\u09ae\u09a8\u09cd\u09a4\u09cd\u09b0\u09c0',
      chiefMinister: '\u09ae\u09c1\u0996\u09cd\u09af\u09ae\u09a8\u09cd\u09a4\u09cd\u09b0\u09c0',
      president: '\u09b0\u09be\u09b7\u09cd\u099f\u09cd\u09b0\u09aa\u09a4\u09bf'
    },
    hi: {
      primeMinister: '\u092a\u094d\u0930\u0927\u093e\u0928 \u092e\u0902\u0924\u094d\u0930\u0940',
      chiefMinister: '\u092e\u0941\u0916\u094d\u092f\u092e\u0902\u0924\u094d\u0930\u0940',
      president: '\u0930\u093e\u0937\u094d\u091f\u094d\u0930\u092a\u0924\u093f'
    }
  };
  function loadJarvisVoices() {
    if (!('speechSynthesis' in window)) return;
    jarvisVoices = window.speechSynthesis.getVoices();
  }

  loadJarvisVoices();

  if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = loadJarvisVoices;
  }

  function getJarvisLanguageConfig() {
    return jarvisLanguageSettings[jarvisLanguage] || jarvisLanguageSettings.en;
  }

  function findJarvisVoice(languageCode) {
    const config = jarvisLanguageSettings[languageCode] || jarvisLanguageSettings.en;

    loadJarvisVoices();

    return jarvisVoices.find(function(voice) {
      return config.voices.some(function(languageTag) {
        return voice.lang === languageTag;
      });
    }) || jarvisVoices.find(function(voice) {
      return config.voices.some(function(languageTag) {
        return voice.lang && voice.lang.toLowerCase().startsWith(languageTag.toLowerCase().split('-')[0]);
      });
    });
  }

  function browserCanSpeakJarvisLanguage(languageCode) {
    if (!('speechSynthesis' in window)) return languageCode === 'en';
    return Boolean(findJarvisVoice(languageCode));
  }

  function setJarvisLanguageButtons() {
    jarvisLanguageButtons.forEach(function(button) {
      button.classList.toggle('active', button.getAttribute('data-jarvis-language') === jarvisLanguage);
    });
  }

  function getJarvisDayPeriod(hour) {
    if (jarvisLanguage === 'bn') {
      if (hour < 12) return '\u09b8\u0995\u09be\u09b2';
      if (hour < 16) return '\u09a6\u09c1\u09aa\u09c1\u09b0';
      if (hour < 20) return '\u09b8\u09a8\u09cd\u09a7\u09cd\u09af\u09be';
      return '\u09b0\u09be\u09a4';
    }

    if (jarvisLanguage === 'hi') {
      if (hour < 12) return '\u0938\u0941\u092c\u0939';
      if (hour < 16) return '\u0926\u094b\u092a\u0939\u0930';
      if (hour < 20) return '\u0936\u093e\u092e';
      return '\u0930\u093e\u0924';
    }

    return '';
  }

  function localizeJarvisDigits(text) {
    const digitMaps = {
      bn: ['\u09e6', '\u09e7', '\u09e8', '\u09e9', '\u09ea', '\u09eb', '\u09ec', '\u09ed', '\u09ee', '\u09ef'],
      hi: ['\u0966', '\u0967', '\u0968', '\u0969', '\u096a', '\u096b', '\u096c', '\u096d', '\u096e', '\u096f']
    };
    const digits = digitMaps[jarvisLanguage];

    if (!digits) return text;

    return String(text).replace(/\d/g, function(digit) {
      return digits[Number(digit)];
    });
  }
  function formatJarvisTime(now, config) {
    if (jarvisLanguage === 'en') {
      return config.timePrefix + now.toLocaleTimeString(config.locale, {
        hour: 'numeric',
        minute: '2-digit'
      }) + '.';
    }

    const hour = now.getHours();
    const displayHour = hour % 12 || 12;
    const minute = String(now.getMinutes()).padStart(2, '0');
    const timeText = localizeJarvisDigits(displayHour + ':' + minute);

    return config.timePrefix + getJarvisDayPeriod(hour) + ' ' + timeText + '.';
  }

  function getJarvisSpeakText(text) {
    const difficultNumberWords = {
      bn: {
        19: '\u0989\u09a8\u09bf\u09b6',
        29: '\u098a\u09a8\u09a4\u09cd\u09b0\u09bf\u09b6',
        39: '\u098a\u09a8\u099a\u09b2\u09cd\u09b2\u09bf\u09b6',
        49: '\u098a\u09a8\u09aa\u099e\u09cd\u099a\u09be\u09b6',
        59: '\u098a\u09a8\u09b7\u09be\u099f',
        69: '\u098a\u09a8\u09b8\u09a4\u09cd\u09a4\u09b0',
        79: '\u098a\u09a8\u0986\u09b6\u09bf',
        89: '\u098a\u09a8\u09a8\u09ac\u09cd\u09ac\u0987'
      },
      hi: {
        19: '\u0909\u0928\u094d\u0928\u0940\u0938',
        29: '\u0909\u0928\u0924\u0940\u0938',
        39: '\u0909\u0928\u0924\u093e\u0932\u0940\u0938',
        49: '\u0909\u0928\u091a\u093e\u0938',
        59: '\u0909\u0928\u0938\u0920',
        69: '\u0909\u0928\u0939\u0924\u094d\u0924\u0930',
        79: '\u0909\u0928\u093e\u0938\u0940',
        89: '\u0928\u0935\u093e\u0938\u0940'
      }
    };

    function replaceDifficultNumbers(speechText) {
      const words = difficultNumberWords[jarvisLanguage];

      if (!words) return speechText;

      return speechText.replace(/\b(19|29|39|49|59|69|79|89)\b/g, function(numberText) {
        return words[numberText] || numberText;
      });
    }

    text = replaceDifficultNumbers(text);

    if (jarvisLanguage === 'bn') {
      return text.replace(/([\u09e6-\u09ef]+):([\u09e6-\u09ef]+)/g, '$1\u099f\u09be $2');
    }

    if (jarvisLanguage === 'hi') {
      return text.replace(/([\u0966-\u096f]+):([\u0966-\u096f]+)/g, '$1 \u092c\u091c\u0915\u0930 $2');
    }

    return text;
  }
  function addJarvisMessage(text, sender) {
    const message = document.createElement('div');
    message.className = 'jarvis-message ' + sender;
    message.textContent = text;
    jarvisChat.appendChild(message);
    jarvisChat.scrollTop = jarvisChat.scrollHeight;
    return message;
  }

  function speakJarvis(text) {
    if (!jarvisVoiceEnabled || !('speechSynthesis' in window)) return;

    loadJarvisVoices();
    window.speechSynthesis.cancel();
    window.speechSynthesis.resume();

    const speech = new SpeechSynthesisUtterance(getJarvisSpeakText(text));
    const config = getJarvisLanguageConfig();
    const languageVoice = findJarvisVoice(jarvisLanguage);
    speech.rate = 0.95;
    speech.pitch = 0.85;
    speech.volume = 1;
    speech.lang = config.locale;

    if (languageVoice) {
      speech.voice = languageVoice;
      speech.lang = languageVoice.lang || config.locale;
    }

    window.speechSynthesis.speak(speech);
  }

  function unlockJarvisVoice() {
    if (jarvisVoiceUnlocked || !('speechSynthesis' in window)) return;

    window.speechSynthesis.resume();

    const unlockSpeech = new SpeechSynthesisUtterance('Ready');
    unlockSpeech.lang = 'en-US';
    unlockSpeech.volume = 0.01;
    unlockSpeech.rate = 1;
    window.speechSynthesis.speak(unlockSpeech);
    jarvisVoiceUnlocked = true;
  }

  function setJarvisVoiceButton() {
    jarvisVoiceButton.textContent = jarvisVoiceEnabled ? 'VOICE ON' : 'VOICE OFF';
    jarvisVoiceButton.classList.toggle('active', jarvisVoiceEnabled);
  }

  function waitForJarvisVoices() {
    return new Promise(function(resolve) {
      loadJarvisVoices();

      if (jarvisVoices.length || !('speechSynthesis' in window)) {
        resolve();
        return;
      }

      setTimeout(function() {
        loadJarvisVoices();
        resolve();
      }, 450);
    });
  }

  async function selectJarvisLanguage(languageCode) {
    unlockJarvisVoice();
    await waitForJarvisVoices();

    if (languageCode !== 'en' && !browserCanSpeakJarvisLanguage(languageCode)) {
      jarvisLanguage = 'en';
      jarvisWikipediaLanguage = 'en';
      setJarvisLanguageButtons();

      const fallbackMessage = 'I am sorry, but I cannot speak in this language, as I could not find it in your system. So, I am speaking in English.';
      addJarvisMessage(fallbackMessage, 'bot');
      speakJarvis(fallbackMessage);
      return;
    }

    jarvisLanguage = languageCode;
    jarvisWikipediaLanguage = jarvisLanguageSettings[languageCode].wikipedia;
    setJarvisLanguageButtons();
    showJarvisReply(jarvisLanguageSettings[languageCode].greeting, 0);
  }

  function showJarvisReply(text, delay = 400) {
    if (delay === 0) {
      addJarvisMessage(text, 'bot');
      speakJarvis(text);
      return;
    }

    setTimeout(function() {
      addJarvisMessage(text, 'bot');
      speakJarvis(text);
    }, delay);
  }

  function getJarvisReply(question) {
    const cleanQuestion = question.toLowerCase().trim();
    const config = getJarvisLanguageConfig();
    const asksIdentity =
      cleanQuestion.includes('who are you') ||
      cleanQuestion.includes('what are you') ||
      cleanQuestion.includes('your name') ||
      cleanQuestion.includes('tumi ke') ||
      cleanQuestion.includes('ke tumi') ||
      cleanQuestion.includes('\u09a4\u09c1\u09ae\u09bf \u0995\u09c7') ||
      cleanQuestion.includes('\u0924\u0941\u092e \u0915\u094c\u0928') ||
      cleanQuestion.includes('\u0906\u092a \u0915\u094c\u0928');

    if (asksIdentity) {
      return config.identity;
    }

    if (cleanQuestion === 'good morning' || cleanQuestion.startsWith('good morning ')) {
      return config.morning;
    }

    if (cleanQuestion === 'good afternoon' || cleanQuestion.startsWith('good afternoon ')) {
      return config.afternoon;
    }

    if (cleanQuestion === 'good evening' || cleanQuestion.startsWith('good evening ')) {
      return config.evening;
    }

    if (cleanQuestion === 'good night' || cleanQuestion.startsWith('good night ')) {
      return config.night;
    }

    if (
      cleanQuestion === 'hello' ||
      cleanQuestion === 'hii' ||
      cleanQuestion === 'hey' ||
      cleanQuestion.startsWith('hello ') ||
      cleanQuestion.startsWith('hii ') ||
      cleanQuestion.startsWith('hey ') ||
      cleanQuestion === '\u09a8\u09ae\u09b8\u09cd\u0995\u09be\u09b0' ||
      cleanQuestion === '\u09b9\u09cd\u09af\u09be\u09b2\u09cb' ||
      cleanQuestion === '\u0928\u092e\u0938\u094d\u0924\u0947' ||
      cleanQuestion === '\u0939\u0947\u0932\u094b'
    ) {
      return config.hello;
    }

    if (cleanQuestion === 'jarvis' || cleanQuestion.startsWith('jarvis')) {
      return config.ready;
    }

    if (
      cleanQuestion.includes('date') ||
      cleanQuestion.includes('today') ||
      cleanQuestion.includes('day') ||
      cleanQuestion.includes('tarikh') ||
      cleanQuestion.includes('\u09a4\u09be\u09b0\u09bf\u0996') ||
      cleanQuestion.includes('\u0906\u091c') ||
      cleanQuestion.includes('\u0924\u093e\u0930\u0940\u0916')
    ) {
      const now = new Date();
      return config.datePrefix + now.toLocaleDateString(config.locale, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }) + '.';
    }

    if (
      cleanQuestion.includes('time') ||
      cleanQuestion.includes('somoy') ||
      cleanQuestion.includes('\u09b8\u09ae\u09df') ||
      cleanQuestion.includes('\u09b8\u09ae\u09af\u09bc') ||
      cleanQuestion.includes('\u0938\u092e\u092f') ||
      cleanQuestion.includes('\u091f\u093e\u0907\u092e')
    ) {
      const now = new Date();
      return formatJarvisTime(now, config);
    }

    if (cleanQuestion.includes('abdur')) {
      return config.abdur;
    }

    return null;
  }
  function cleanWikipediaQuestion(question) {
    return question
      .replace(/[?!.]/g, '')
      .replace(/\b(who is|what is|what are|tell me about|search|wikipedia|define|about)\b/gi, '')
      .replace(/\u0995\u09c7|\u0995\u09bf|\u0995\u09c0|\u09b8\u09ae\u09cd\u09aa\u09b0\u09cd\u0995\u09c7 \u09ac\u09b2\u09cb|\u0996\u09cb\u0981\u099c\u09cb|\u0989\u0987\u0995\u09bf\u09aa\u09bf\u09a1\u09bf\u09af\u09bc\u09be|\u0915\u094c\u0928 \u0939\u0948|\u0915\u094d\u092f\u093e \u0939\u0948|\u092c\u0924\u093e\u0913|\u0916\u094b\u091c\u094b|\u0935\u093f\u0915\u093f\u092a\u0940\u0921\u093f\u092f\u093e/g, '')
      .trim();
  }
  function calculateBasicMath(question) {
    let expression = question
      .toLowerCase()
      .replace(/what is|calculate|solve|answer|equals|equal to|please|sir|jarvis|\u0995\u09a4|\u09b9\u09bf\u09b8\u09be\u09ac|\u0917\u0923\u0928\u093e|\u0915\u093f\u0924\u0928\u093e|\u0909\u0924\u094d\u0924\u0930/gi, '')
      .replace(/plus|\u09af\u09cb\u0997|\u091c\u094b\u0921\u093c|\u092a\u094d\u0932\u0938/g, '+')
      .replace(/minus|\u09ac\u09bf\u09df\u09cb\u0997|\u09ac\u09bf\u09af\u09bc\u09cb\u0997|\u0918\u091f\u093e\u0913|\u092e\u093e\u0907\u0928\u0938/g, '-')
      .replace(/times|multiplied by|multiply by|into|x|\u00d7|\u0997\u09c1\u09a3|\u0997\u09c1\u09a8|\u0917\u0941\u0923\u093e/g, '*')
      .replace(/divided by|divide by|over|\u00f7|\u09ad\u09be\u0997|\u092d\u093e\u0917/g, '/')
      .replace(/[?=]/g, '')
      .trim();

    const percentMatch = expression.match(/(-?\d+(\.\d+)?)\s*(percent|%)\s*of\s*(-?\d+(\.\d+)?)/);

    if (percentMatch) {
      return (Number(percentMatch[1]) / 100) * Number(percentMatch[4]);
    }

    if (!/[0-9]/.test(expression) || /[^0-9+\-*/().\s]/.test(expression)) {
      return null;
    }

    const tokens = expression.match(/\d+(\.\d+)?|[+\-*/()]/g);

    if (!tokens || tokens.length === 0) return null;

    let index = 0;

    function parseExpression() {
      let value = parseTerm();

      while (tokens[index] === '+' || tokens[index] === '-') {
        const operator = tokens[index++];
        const nextValue = parseTerm();
        value = operator === '+' ? value + nextValue : value - nextValue;
      }

      return value;
    }

    function parseTerm() {
      let value = parseFactor();

      while (tokens[index] === '*' || tokens[index] === '/') {
        const operator = tokens[index++];
        const nextValue = parseFactor();

        if (operator === '/' && nextValue === 0) {
          throw new Error('divide-by-zero');
        }

        value = operator === '*' ? value * nextValue : value / nextValue;
      }

      return value;
    }

    function parseFactor() {
      if (tokens[index] === '-') {
        index++;
        return -parseFactor();
      }

      if (tokens[index] === '(') {
        index++;
        const value = parseExpression();

        if (tokens[index] !== ')') {
          throw new Error('invalid-expression');
        }

        index++;
        return value;
      }

      const value = Number(tokens[index++]);

      if (Number.isNaN(value)) {
        throw new Error('invalid-expression');
      }

      return value;
    }

    try {
      const result = parseExpression();

      if (index !== tokens.length || !Number.isFinite(result)) {
        return null;
      }

      return Math.round(result * 100000000) / 100000000;
    } catch (error) {
      return error.message === 'divide-by-zero' ? 'divide-by-zero' : null;
    }
  }
  function getMathReply(question) {
    const result = calculateBasicMath(question);
    const config = getJarvisLanguageConfig();

    if (result === null) return null;

    if (result === 'divide-by-zero') {
      return config.divideByZero;
    }

    return config.answerPrefix + result + '.';
  }

  function getLeaderQuestion(question) {
    const cleanQuestion = question.toLowerCase().replace(/[?!.]/g, ' ').trim();
    let role = '';

    if (cleanQuestion.includes('chief minister') || /\bcm\b/.test(cleanQuestion) || cleanQuestion.includes('\u09ae\u09c1\u0996\u09cd\u09af\u09ae\u09a8\u09cd\u09a4\u09cd\u09b0\u09c0') || cleanQuestion.includes('\u092e\u0941\u0916\u094d\u092f\u092e\u0902\u0924\u094d\u0930\u0940')) {
      role = 'chiefMinister';
    } else if (cleanQuestion.includes('prime minister') || /\bpm\b/.test(cleanQuestion) || cleanQuestion.includes('\u09aa\u09cd\u09b0\u09a7\u09be\u09a8\u09ae\u09a8\u09cd\u09a4\u09cd\u09b0\u09c0') || cleanQuestion.includes('\u092a\u094d\u0930\u0927\u093e\u0928 \u092e\u0902\u0924\u094d\u0930\u0940') || cleanQuestion.includes('\u092a\u094d\u0930\u0927\u093e\u0928\u092e\u0902\u0924\u094d\u0930\u0940')) {
      role = 'primeMinister';
    } else if (cleanQuestion.includes('president') || cleanQuestion.includes('\u09b0\u09be\u09b7\u09cd\u099f\u09cd\u09b0\u09aa\u09a4\u09bf') || cleanQuestion.includes('\u0930\u093e\u0937\u094d\u091f\u094d\u0930\u092a\u0924\u093f')) {
      role = 'president';
    } else {
      return null;
    }

    let countryText = cleanQuestion
      .replace(/\b(current|present|now|today|who is|who's|what is|the|of|country|state|prime minister|chief minister|president|pm|cm)\b/g, ' ')
      .replace(/\u09ac\u09b0\u09cd\u09a4\u09ae\u09be\u09a8|\u098f\u0996\u09a8|\u0986\u099c|\u0995\u09c7|\u0995\u09bf|\u09a6\u09c7\u09b6|\u09b0\u09be\u099c\u09cd\u09af|\u09aa\u09cd\u09b0\u09a7\u09be\u09a8\u09ae\u09a8\u09cd\u09a4\u09cd\u09b0\u09c0|\u09ae\u09c1\u0996\u09cd\u09af\u09ae\u09a8\u09cd\u09a4\u09cd\u09b0\u09c0|\u09b0\u09be\u09b7\u09cd\u099f\u09cd\u09b0\u09aa\u09a4\u09bf|\u0935\u0930\u094d\u0924\u092e\u093e\u0928|\u0905\u092d\u0940|\u0906\u091c|\u0915\u094c\u0928|\u0915\u094d\u092f\u093e|\u0926\u0947\u0936|\u0930\u093e\u091c\u094d\u092f|\u092a\u094d\u0930\u0927\u093e\u0928 \u092e\u0902\u0924\u094d\u0930\u0940|\u092a\u094d\u0930\u0927\u093e\u0928\u092e\u0902\u0924\u094d\u0930\u0940|\u092e\u0941\u0916\u094d\u092f\u092e\u0902\u0924\u094d\u0930\u0940|\u0930\u093e\u0937\u094d\u091f\u094d\u0930\u092a\u0924\u093f/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    const countryAliases = {
      american: 'United States',
      usa: 'United States',
      us: 'United States',
      british: 'United Kingdom',
      uk: 'United Kingdom',
      indian: 'India',
      bangladeshi: 'Bangladesh',
      pakistani: 'Pakistan',
      chinese: 'China',
      japanese: 'Japan',
      russian: 'Russia',
      french: 'France',
      german: 'Germany',
      italian: 'Italy',
      canadian: 'Canada',
      australian: 'Australia',
      brazilian: 'Brazil',
      nepali: 'Nepal',
      sri_lankan: 'Sri Lanka',
      wb: 'West Bengal',
      west_bengal: 'West Bengal',
      up: 'Uttar Pradesh',
      uttar_pradesh: 'Uttar Pradesh',
      mp: 'Madhya Pradesh',
      madhya_pradesh: 'Madhya Pradesh',
      ap: 'Andhra Pradesh',
      andhra_pradesh: 'Andhra Pradesh',
      arunachal_pradesh: 'Arunachal Pradesh',
      assam: 'Assam',
      bihar: 'Bihar',
      chhattisgarh: 'Chhattisgarh',
      goa: 'Goa',
      gujarat: 'Gujarat',
      haryana: 'Haryana',
      himachal_pradesh: 'Himachal Pradesh',
      jharkhand: 'Jharkhand',
      karnataka: 'Karnataka',
      kerala: 'Kerala',
      maharashtra: 'Maharashtra',
      manipur: 'Manipur',
      meghalaya: 'Meghalaya',
      mizoram: 'Mizoram',
      nagaland: 'Nagaland',
      odisha: 'Odisha',
      orissa: 'Odisha',
      punjab: 'Punjab',
      rajasthan: 'Rajasthan',
      sikkim: 'Sikkim',
      tamil_nadu: 'Tamil Nadu',
      telangana: 'Telangana',
      tripura: 'Tripura',
      uttarakhand: 'Uttarakhand',
      delhi: 'Delhi',
      india: 'India',
      bharat: 'India',
      bangla: 'West Bengal',
      bengal: 'West Bengal',
      puducherry: 'Puducherry',
      pondicherry: 'Puducherry',
      jammu_kashmir: 'Jammu and Kashmir'
    };

    countryText = countryAliases[countryText.replace(/\s+/g, '_')] || countryAliases[countryText] || countryText;

    if (!countryText) return null;

    return { role, countryText };
  }

  async function searchWikidataEntity(searchText) {
    const url = 'https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json&origin=*&language=en&limit=1&search=' + encodeURIComponent(searchText);
    const response = await fetch(url);
    const data = await response.json();
    return data.search && data.search[0];
  }

  async function getWikipediaSummaryByTitle(title) {
    const summaryUrl = 'https://' + jarvisWikipediaLanguage + '.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(title);
    const summaryResponse = await fetch(summaryUrl);
    const summaryData = await summaryResponse.json();
    return summaryData.extract || '';
  }

  async function getLeaderReply(question) {
    const leaderQuestion = getLeaderQuestion(question);

    if (!leaderQuestion) return null;

    const country = await searchWikidataEntity(leaderQuestion.countryText);
    const config = getJarvisLanguageConfig();

    if (!country) {
      return config.identifyError;
    }

    const property = leaderQuestion.role === 'president' ? 'wdt:P35' : 'wdt:P6';
    const roleName = (jarvisRoleNames[jarvisLanguage] || jarvisRoleNames.en)[leaderQuestion.role];
    const wikiProjectUrl = 'https://' + jarvisWikipediaLanguage + '.wikipedia.org/';
    const query = `
      SELECT ?person ?personLabel ?article WHERE {
        wd:${country.id} ${property} ?person.
        OPTIONAL {
          ?article schema:about ?person;
                   schema:isPartOf <${wikiProjectUrl}>.
        }
        SERVICE wikibase:label { bd:serviceParam wikibase:language "${jarvisWikipediaLanguage},en". }
      }
      LIMIT 1
    `;
    const url = 'https://query.wikidata.org/sparql?format=json&query=' + encodeURIComponent(query);
    const response = await fetch(url);
    const data = await response.json();
    const result = data.results && data.results.bindings && data.results.bindings[0];

    if (!result) {
      return config.leaderMissing(roleName, country.label);
    }

    const personName = result.personLabel.value;
    let details = '';

    if (result.article) {
      const title = decodeURIComponent(result.article.value.split('/wiki/')[1]).replace(/_/g, ' ');
      details = await getWikipediaSummaryByTitle(title);
    } else {
      details = await getWikipediaReply(personName);
    }

    return config.leaderReply(roleName, country.label, personName, details);
  }

  async function getWikipediaReply(question) {
    const searchText = cleanWikipediaQuestion(question);
    const config = getJarvisLanguageConfig();

    if (!searchText) {
      return config.fallback;
    }

    try {
      const searchUrl = 'https://' + jarvisWikipediaLanguage + '.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=1&srsearch=' + encodeURIComponent(searchText);
      const searchResponse = await fetch(searchUrl);
      const searchData = await searchResponse.json();
      const firstResult = searchData.query && searchData.query.search && searchData.query.search[0];

      if (!firstResult) {
        return config.fallback;
      }

      const summaryText = await getWikipediaSummaryByTitle(firstResult.title);

      if (!summaryText) {
        return config.wikiEmpty;
      }

      return summaryText;
    } catch (error) {
      return config.wikiError;
    }
  }

  async function handleJarvisQuestion(question) {
  if (!question) return;

  addJarvisMessage(question, 'user');
  jarvisInput.value = '';

  const localReply = getJarvisReply(question);

  if (localReply) {
    showJarvisReply(localReply, 0);
    return;
  }

  const mathReply = getMathReply(question);

  if (mathReply) {
    showJarvisReply(mathReply, 0);
    return;
  }
  const thinkingMessage = addJarvisMessage(getJarvisLanguageConfig().thinking, 'bot');
  let leaderReply = null;

  try {
    leaderReply = await getLeaderReply(question);
  } catch (error) {
    leaderReply = null;
  }

  const finalReply = leaderReply || await getWikipediaReply(question);
  thinkingMessage.textContent = finalReply;
  jarvisChat.scrollTop = jarvisChat.scrollHeight;
  speakJarvis(finalReply);
}

  if (jarvisForm) {
    jarvisForm.addEventListener('submit', function(e) {
      e.preventDefault();
      unlockJarvisVoice();
      handleJarvisQuestion(jarvisInput.value.trim());
    });
  }

  jarvisQuickButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      const question = button.getAttribute('data-jarvis-question');
      unlockJarvisVoice();
      jarvisInput.value = question;
      handleJarvisQuestion(question);
    });
  });

  jarvisLanguageButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      selectJarvisLanguage(button.getAttribute('data-jarvis-language'));
    });
  });

  setJarvisLanguageButtons();

  if (jarvisVoiceButton) {
    setJarvisVoiceButton();

    jarvisVoiceButton.addEventListener('click', function() {
      unlockJarvisVoice();
      jarvisVoiceEnabled = !jarvisVoiceEnabled;

      if (!jarvisVoiceEnabled && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }

      setJarvisVoiceButton();

      if (jarvisVoiceEnabled) {
        speakJarvis('Voice activate.');
      }
    });
  }