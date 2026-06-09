export type Locale = 'zh-TW' | 'en' | 'ja' | 'ko';
export type ScreenState = 'landing' | 'register-demo' | 'home-demo' | 'fan-club-demo' | 'chat-demo';
export type MessageLanguage = Locale;

export type LocalizedText = Record<Locale, string>;

export type DemoPost = {
  id: string;
  author: string;
  clubName: string;
  timeLabel: LocalizedText;
  title: LocalizedText;
  body: LocalizedText;
  reactions: Array<{ id: string; emoji: string; count: number }>;
};

export type ChatMessage = {
  id: string;
  senderId: string;
  senderName: string;
  language: MessageLanguage;
  originalText: string;
  translatedTextByLocale: LocalizedText;
  sentAt: string;
};

export const supportedLocales: Locale[] = ['zh-TW', 'en', 'ja', 'ko'];

export const uiText = {
  appTitle: {
    'zh-TW': 'LunarFan',
    en: 'LunarFan',
    ja: 'LunarFan',
    ko: 'LunarFan'
  },
  heroSubtitle: {
    'zh-TW': '遇見你最想追隨的創作者。',
    en: 'Meet the creators you truly want to follow.',
    ja: '本当に応援したいクリエイターに出会おう。',
    ko: '정말 응원하고 싶은 크리에이터를 만나보세요.'
  },
  tryNow: {
    'zh-TW': '搶先體驗',
    en: 'Try the demo',
    ja: '先行体験',
    ko: '미리 체험하기'
  },
  register: {
    'zh-TW': '註冊',
    en: 'Register',
    ja: '登録',
    ko: '회원가입'
  },
  login: {
    'zh-TW': '登入',
    en: 'Log in',
    ja: 'ログイン',
    ko: '로그인'
  },
  completeRegister: {
    'zh-TW': '完成註冊',
    en: 'Finish registration',
    ja: '登録を完了',
    ko: '가입 완료'
  },
  myFanClubs: {
    'zh-TW': '我的後援會',
    en: 'My fan clubs',
    ja: '参加中のファンクラブ',
    ko: '내 팬클럽'
  },
  posts: {
    'zh-TW': '貼文',
    en: 'Posts',
    ja: '投稿',
    ko: '게시물'
  },
  autoTranslate: {
    'zh-TW': '自動翻譯',
    en: 'Auto translate',
    ja: '自動翻訳',
    ko: '자동 번역'
  },
  send: {
    'zh-TW': '送出',
    en: 'Send',
    ja: '送信',
    ko: '보내기'
  },
  alreadyJoined: {
    'zh-TW': '已加入',
    en: 'Joined',
    ja: '参加中',
    ko: '가입됨'
  },
  chat: {
    'zh-TW': '聊天室',
    en: 'Chat',
    ja: 'チャット',
    ko: '채팅'
  },
  next: {
    'zh-TW': '下一步',
    en: 'Next',
    ja: '次へ',
    ko: '다음'
  },
  backHome: {
    'zh-TW': '回到首頁',
    en: 'Back to home',
    ja: 'ホームへ戻る',
    ko: '홈으로 돌아가기'
  },
  openForm: {
    'zh-TW': '填寫表單',
    en: 'Open form',
    ja: 'フォームに記入',
    ko: '폼 작성하기'
  },
  fanClubHint: {
    'zh-TW': 'Luna 的粉絲都在這裡。',
    en: 'Luna fans gather here.',
    ja: 'Luna のファンがここに集まります。',
    ko: 'Luna 팬들이 여기 모여 있어요.'
  },
  localeLabel: {
    'zh-TW': '語言',
    en: 'Language',
    ja: '言語',
    ko: '언어'
  },
  postModalReactionTitle: {
    'zh-TW': '留下你的心情',
    en: 'Leave a reaction',
    ja: 'リアクションを残そう',
    ko: '마음을 남겨 보세요'
  },
  chatInputPlaceholder: {
    'zh-TW': '輸入訊息...',
    en: 'Type a message...',
    ja: 'メッセージを入力...',
    ko: '메시지를 입력하세요...'
  },
  viewPost: {
    'zh-TW': '查看貼文',
    en: 'Open post',
    ja: '投稿を見る',
    ko: '게시물 보기'
  },
  registrationTitle: {
    'zh-TW': '建立你的 LunarFan 帳號',
    en: 'Create your LunarFan account',
    ja: 'LunarFan アカウントを作成',
    ko: 'LunarFan 계정 만들기'
  },
  registrationDesc: {
    'zh-TW': '這個 demo 畫面會省略驗證流程，快速帶你進入產品體驗。',
    en: 'This demo skips verification to get you into the product experience faster.',
    ja: 'このデモでは認証手順を省略して、すぐに体験へ進めます。',
    ko: '이 데모는 인증 과정을 생략하고 바로 체험 화면으로 안내합니다.'
  }
} satisfies Record<string, LocalizedText>;

export const tutorialText = {
  welcome: {
    'zh-TW': '歡迎來到 Lunarfan，你可以在這裡建立你推的後援會、也可以加入其他人的後援會來參與討論。',
    en: 'Welcome to LunarFan. Here you can create a fan club for your favorite creator or join other communities to chat with fellow fans.',
    ja: 'LunarFan へようこそ。ここでは推しのファンクラブを作ったり、ほかのファンクラブに参加して仲間と交流したりできます。',
    ko: 'LunarFan에 오신 것을 환영해요. 여기서는 좋아하는 크리에이터의 팬클럽을 만들거나 다른 팬클럽에 참여해 함께 이야기할 수 있어요.'
  },
  clickRegister: {
    'zh-TW': '首先，點擊註冊按鈕來新增一個帳號。',
    en: 'First, click the register button to create your account.',
    ja: 'まずは登録ボタンを押してアカウントを作成しましょう。',
    ko: '먼저 회원가입 버튼을 눌러 계정을 만들어 볼게요.'
  },
  registerEmail: {
    'zh-TW': '輸入你的常用信箱。',
    en: 'Enter the email you use most often.',
    ja: '普段使っているメールアドレスを入力してください。',
    ko: '자주 사용하는 이메일 주소를 입력해 주세요.'
  },
  registerPassword: {
    'zh-TW': '設定一個密碼。',
    en: 'Set a password for your account.',
    ja: 'アカウントのパスワードを設定します。',
    ko: '계정에 사용할 비밀번호를 설정해 주세요.'
  },
  registerRetype: {
    'zh-TW': '再輸入一次密碼。',
    en: 'Type the password one more time.',
    ja: '確認のため、もう一度パスワードを入力してください。',
    ko: '확인을 위해 비밀번호를 한 번 더 입력해 주세요.'
  },
  completeRegister: {
    'zh-TW': '按下註冊按鈕就完成註冊了。',
    en: 'Press the button and your registration is complete.',
    ja: 'このボタンを押せば登録完了です。',
    ko: '이 버튼을 누르면 가입이 완료돼요.'
  },
  myFanClubs: {
    'zh-TW': '這裡會顯示你加入的所有後援會，右上角 + 號可以自己建立後援會。',
    en: 'All the fan clubs you have joined appear here. Use the plus button to create one of your own.',
    ja: 'ここには参加しているファンクラブが表示されます。右上のプラスから自分で作ることもできます。',
    ko: '여기에는 내가 가입한 모든 팬클럽이 표시돼요. 오른쪽 위 플러스 버튼으로 직접 만들 수도 있어요.'
  },
  openFirstPost: {
    'zh-TW': 'Luna 發布了一則貼文，點開來看看。',
    en: 'Luna just posted something. Open it and take a look.',
    ja: 'Luna が投稿しました。開いて見てみましょう。',
    ko: 'Luna가 새 글을 올렸어요. 열어서 확인해 볼까요?' 
  },
  reactConcertPost: {
    'zh-TW': '創作者們會發布近況貼文，這是個 Luna 即將舉辦演唱會的貼文，按個讚讓她知道你很期待。',
    en: 'Creators can share updates like this one about Luna’s upcoming concert. Leave a reaction and show how excited you are.',
    ja: 'クリエイターは近況を投稿できます。これは Luna のコンサート告知です。リアクションして期待を伝えましょう。',
    ko: '크리에이터는 이런 근황 글을 올릴 수 있어요. Luna의 콘서트 소식에 반응을 남겨 기대감을 전해 보세요.'
  },
  openFanClub: {
    'zh-TW': '好期待演唱會喔，到 Luna 的後援會看看有沒有其他消息，點擊頭像就可以進入後援會囉。',
    en: 'The concert sounds exciting. Click Luna’s avatar to enter the fan club and see if there are more updates.',
    ja: 'コンサートが待ち遠しいですね。Luna のアイコンを押して、ファンクラブの最新情報を見に行きましょう。',
    ko: '콘서트가 정말 기대되죠. Luna의 아바타를 눌러 팬클럽에 들어가 더 많은 소식을 확인해 보세요.'
  },
  reactDinnerPost: {
    'zh-TW': 'Luna 剛剛吃了一頓好吃的晚餐，傳達你的心情。',
    en: 'Luna just had a great dinner. Pick a reaction and share how you feel.',
    ja: 'Luna が美味しい夕食を食べたみたいです。気持ちをリアクションで伝えましょう。',
    ko: 'Luna가 맛있는 저녁을 먹었대요. 지금 기분을 반응으로 남겨 보세요.'
  },
  openChat: {
    'zh-TW': '到聊天室與其他粉絲分享心情吧。',
    en: 'Head to the chat room and share the excitement with other fans.',
    ja: 'チャットルームで他のファンと気持ちを共有しましょう。',
    ko: '채팅방에서 다른 팬들과 설레는 마음을 나눠 보세요.'
  },
  chatOverview: {
    'zh-TW': '大家都在談論演唱會呢。',
    en: 'Everyone is already talking about the concert.',
    ja: 'みんなコンサートの話で盛り上がっています。',
    ko: '모두 콘서트 이야기를 하고 있네요.'
  },
  toggleAutoTranslate: {
    'zh-TW': 'Luna 的粉絲來自世界各地，開啟自動翻譯吧。',
    en: 'Luna has fans from all over the world. Turn on auto translate.',
    ja: 'Luna のファンは世界中にいます。自動翻訳をオンにしてみましょう。',
    ko: 'Luna의 팬은 전 세계에 있어요. 자동 번역을 켜 볼까요?' 
  },
  chatTranslated: {
    'zh-TW': '現在能看懂所有訊息了，我們也加入討論吧。',
    en: 'Now you can understand every message. Let’s join the conversation too.',
    ja: 'これですべてのメッセージが読めます。私たちも会話に参加しましょう。',
    ko: '이제 모든 메시지를 이해할 수 있어요. 우리도 대화에 참여해 봅시다.'
  },
  sendMessage: {
    'zh-TW': '輸入「好期待喔」並送出。',
    en: 'Type “I can’t wait” and send it.',
    ja: '「すごく楽しみ」と入力して送信してみましょう。',
    ko: '“정말 기대돼”라고 입력하고 보내 보세요.'
  },
  finalCta: {
    'zh-TW': '太棒了！Lunarfan 即將推出，填寫表單就能得到第一手消息喔。',
    en: 'Amazing. LunarFan is launching soon. Fill in the form to get the latest news first.',
    ja: 'すばらしいです。LunarFan はまもなく公開予定です。フォームに記入して最新情報を受け取りましょう。',
    ko: '좋아요. LunarFan은 곧 출시될 예정이에요. 폼을 작성하면 가장 먼저 소식을 받을 수 있어요.'
  }
} satisfies Record<string, LocalizedText>;

export const clubNames = [
  'Luna',
  '周杰倫台北後援會',
  '木村拓哉東京ファンクラブ',
  'BLACKPINK 서울 팬클럽',
  'Taylor Swift New York Fan Club'
];

export const roomNames = [
  'Luna 的午夜閒聊',
  '周杰倫台北後援會聊天室',
  '木村拓哉東京ファンクラブのチャット',
  'BLACKPINK 서울 팬클럽 채팅방',
  'Taylor Swift New York Fan Club Chat'
];

export function getDemoDateVariants(monthsFromNow = 3): LocalizedText {
  const date = new Date();
  date.setMonth(date.getMonth() + monthsFromNow);
  return {
    'zh-TW': new Intl.DateTimeFormat('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' }).format(date),
    en: new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(date),
    ja: new Intl.DateTimeFormat('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' }).format(date),
    ko: new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }).format(date)
  };
}

export function buildPosts(): { concertPost: DemoPost; dinnerPost: DemoPost } {
  const dates = getDemoDateVariants(3);
  return {
    concertPost: {
      id: 'post-concert',
      author: 'Luna',
      clubName: 'Luna',
      timeLabel: {
        'zh-TW': '剛剛',
        en: 'Just now',
        ja: 'たった今',
        ko: '방금 전'
      },
      title: {
        'zh-TW': `我的第一場演唱會將在 ${dates['zh-TW']} 舉辦`,
        en: `My first concert is happening on ${dates.en}`,
        ja: `私の初めてのコンサートは ${dates.ja} に開催されます`,
        ko: `제 첫 콘서트는 ${dates.ko} 에 열려요`
      },
      body: {
        'zh-TW': '從今天開始我會慢慢公開舞台概念、周邊小驚喜，還有最近最常循環播放的歌單。這次真的想把一直以來收到的支持，全都變成能和你們一起記住的夜晚。如果你也在期待，記得先幫我留一個位置。',
        en: 'Starting today, I will slowly reveal the stage concept, merch surprises, and the songs that have been on repeat lately. I want to turn all the support you have given me into a night we can remember together, so save a spot if you are excited too.',
        ja: 'これから少しずつステージのコンセプトやグッズのサプライズ、最近よく聴いている曲を公開していきます。みなさんからの応援を、いっしょに記憶に残る夜へ変えたいです。楽しみにしてくれているなら、ぜひその日を空けておいてください。',
        ko: '오늘부터 무대 콘셉트와 굿즈 힌트, 그리고 요즘 자주 듣는 노래들을 하나씩 공개할게요. 여러분의 응원을 함께 기억할 수 있는 밤으로 만들고 싶어요. 기대하고 있다면 꼭 함께해 주세요.'
      },
      reactions: [
        { id: 'heart', emoji: '❤️', count: 128 },
        { id: 'spark', emoji: '✨', count: 84 },
        { id: 'cry', emoji: '😭', count: 61 }
      ]
    },
    dinnerPost: {
      id: 'post-dinner',
      author: 'Luna',
      clubName: 'Luna',
      timeLabel: {
        'zh-TW': '剛更新',
        en: 'Just updated',
        ja: '更新したばかり',
        ko: '방금 업데이트'
      },
      title: {
        'zh-TW': 'Luna 的晚餐大餐',
        en: 'Luna’s big dinner feast',
        ja: 'Luna のごちそうディナー',
        ko: 'Luna의 푸짐한 저녁'
      },
      body: {
        'zh-TW': '今天排練結束後，終於吃到期待很久的晚餐大餐了。熱騰騰的焗烤、剛出爐的麵包，還有一杯甜甜的氣泡飲，讓我瞬間覺得今天的辛苦都值得。你們今天晚餐吃了什麼？',
        en: 'After rehearsal today, I finally had the big dinner I had been craving. A hot baked dish, fresh bread, and a sweet sparkling drink made the whole day feel worth it. What did you have for dinner today?',
        ja: '今日のリハーサルが終わったあと、ずっと楽しみにしていた豪華な晩ごはんをやっと食べられました。熱々のグラタンに焼きたてのパン、甘い炭酸ドリンクまであって最高でした。みなさんは今日、何を食べましたか？',
        ko: '오늘 리허설이 끝나고 정말 기다리던 푸짐한 저녁을 먹었어요. 따끈한 오븐 요리와 갓 구운 빵, 달콤한 탄산음료까지 있어서 하루의 피로가 다 풀렸어요. 여러분은 오늘 저녁으로 무엇을 먹었나요?'
      },
      reactions: [
        { id: 'yum', emoji: '🤤', count: 97 },
        { id: 'clap', emoji: '👏', count: 48 },
        { id: 'chef', emoji: '🍽️', count: 36 }
      ]
    }
  };
}

const senderPool = [
  { id: 'luna', name: 'Luna', locale: 'zh-TW' as Locale },
  { id: 'mika', name: 'Mika', locale: 'ja' as Locale },
  { id: 'sofia', name: 'Sofia', locale: 'en' as Locale },
  { id: 'jiho', name: '지호', locale: 'ko' as Locale },
  { id: 'kai', name: '凱', locale: 'zh-TW' as Locale },
  { id: 'emma', name: 'Emma', locale: 'en' as Locale },
  { id: 'rin', name: '凛', locale: 'ja' as Locale },
  { id: 'haeun', name: '하은', locale: 'ko' as Locale }
];

const messageVariants: LocalizedText[] = [
  {
    'zh-TW': '我已經開始存錢買演唱會周邊了。',
    en: 'I already started saving up for the concert merch.',
    ja: 'もうコンサートのグッズ代を貯め始めています。',
    ko: '벌써 콘서트 굿즈 살 돈을 모으기 시작했어요.'
  },
  {
    'zh-TW': '好想知道第一首歌會是什麼。',
    en: 'I really want to know what the opening song will be.',
    ja: '一曲目が何になるのか気になります。',
    ko: '첫 곡이 무엇일지 너무 궁금해요.'
  },
  {
    'zh-TW': '如果有星空舞台一定超美。',
    en: 'A starlit stage would be absolutely beautiful.',
    ja: '星空みたいなステージだったら絶対きれいです。',
    ko: '별빛 같은 무대가 나오면 정말 예쁠 것 같아요.'
  },
  {
    'zh-TW': 'Luna 晚餐看起來也太好吃了吧。',
    en: 'Luna’s dinner looked way too good.',
    ja: 'Luna の晩ごはん、本当に美味しそうでした。',
    ko: 'Luna가 먹은 저녁이 정말 맛있어 보였어요.'
  },
  {
    'zh-TW': '希望演唱會有中文版應援口號。',
    en: 'I hope there will be an English fan chant guide too.',
    ja: '応援コールのガイドがあったら嬉しいです。',
    ko: '응원 구호 가이드가 있으면 좋겠어요.'
  },
  {
    'zh-TW': '我想跟朋友一起穿同色系去。',
    en: 'My friends and I want to dress in the same color palette.',
    ja: '友だちと同じ色味の服で行きたいです。',
    ko: '친구들과 같은 계열 색 옷을 입고 가고 싶어요.'
  },
  {
    'zh-TW': '如果現場有小卡交換區就好了。',
    en: 'A photo card trading corner would be amazing.',
    ja: '会場にトレカ交換コーナーがあったら最高です。',
    ko: '현장에 포토카드 교환 구역이 있으면 좋겠어요.'
  },
  {
    'zh-TW': '自從看到預告後我每天都在倒數。',
    en: 'I have been counting down every day since the teaser dropped.',
    ja: '予告を見てから毎日カウントダウンしています。',
    ko: '티저를 본 뒤로 매일 손꼽아 기다리고 있어요.'
  },
  {
    'zh-TW': '好期待最後的安可曲。',
    en: 'I am especially excited for the encore song.',
    ja: 'アンコール曲が特に楽しみです。',
    ko: '앙코르 곡이 특히 기대돼요.'
  },
  {
    'zh-TW': '今天這則晚餐貼文讓我也餓了。',
    en: 'Today’s dinner post made me hungry too.',
    ja: '今日のディナー投稿を見て私もお腹が空きました。',
    ko: '오늘 저녁 게시물 보니까 저도 배고파졌어요.'
  }
];

export function buildChatMessages(): ChatMessage[] {
  const now = Date.now();
  return Array.from({ length: 50 }, (_, index) => {
    const sender = senderPool[index % senderPool.length];
    const text = messageVariants[index % messageVariants.length];
    return {
      id: `message-${index + 1}`,
      senderId: sender.id,
      senderName: sender.name,
      language: sender.locale,
      originalText: text[sender.locale],
      translatedTextByLocale: text,
      sentAt: new Date(now - (50 - index) * 1000 * 60 * 6).toISOString()
    };
  });
}

export const tutorialSteps = [
  'welcome',
  'click-register',
  'register-email',
  'register-password',
  'register-retype-password',
  'register-submit',
  'my-fan-clubs',
  'open-first-post',
  'react-concert-post',
  'open-fan-club',
  'react-dinner-post',
  'open-chat',
  'chat-overview',
  'toggle-auto-translate',
  'chat-translated',
  'send-message',
  'final-cta'
] as const;

export type TutorialStepId = (typeof tutorialSteps)[number];
